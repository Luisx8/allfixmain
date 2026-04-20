import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth, ROLES } from '../../contexts/AuthContext';
import { getAuthSession, persistBridgeTokens } from '../../api/authService';

const BRIDGE_REQUEST_TIMEOUT_MS = 12000;
const AUTH_REFRESH_TIMEOUT_MS = 12000;
const AUTH_SESSION_READY_TIMEOUT_MS = 15000;
const AUTH_SESSION_POLL_INTERVAL_MS = 300;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForBridgeAuthReady({ refreshAuth, isCancelled }) {
  const deadline = Date.now() + AUTH_SESSION_READY_TIMEOUT_MS;
  let lastError = null;

  while (!isCancelled() && Date.now() < deadline) {
    try {
      const sessionResult = await withTimeout(
        getAuthSession(),
        AUTH_REFRESH_TIMEOUT_MS,
        'Bridge auth session check timed out',
      );

      if (sessionResult.success && sessionResult.data?.isAuthenticated) {
        await withTimeout(
          refreshAuth(),
          AUTH_REFRESH_TIMEOUT_MS,
          'Bridge auth context refresh timed out',
        );
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await sleep(AUTH_SESSION_POLL_INTERVAL_MS);
  }

  if (isCancelled()) {
    return;
  }

  throw lastError || new Error('Timed out waiting for Cognito session to become authenticated');
}

function withTimeout(promise, timeoutMs, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(timeoutMessage));
      }, timeoutMs);

      // Avoid creating an unhandled rejected promise from `finally`.
      promise.then(
        () => clearTimeout(timeoutId),
        () => clearTimeout(timeoutId),
      );
    }),
  ]);
}

function routeForGroup(group) {
  switch ((group || '').toLowerCase()) {
    case ROLES.ADMIN:
      return '/admin';
    case ROLES.PERSONNEL:
      return '/personnel';
    case ROLES.VENDOR:
      return '/vendor';
    default:
      return '/user';
  }
}

function loginRouteForGroup(group) {
  switch ((group || '').toLowerCase()) {
    case ROLES.ADMIN:
      return '/admin-login';
    case ROLES.PERSONNEL:
      return '/personnel-login';
    case ROLES.VENDOR:
      return '/vendor-login';
    default:
      return '/login';
  }
}

function sanitizeDashboardRoute(nextRoute, group) {
  const fallback = routeForGroup(group);
  const candidate = String(nextRoute || '').trim();

  // Only allow in-app absolute paths to avoid open redirects.
  if (!candidate.startsWith('/') || candidate.startsWith('//')) {
    return fallback;
  }

  return candidate;
}

const PmsTrustedBridge = () => {
  const { isAuthenticated, isLoading, groups, refreshAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const [bridgeStatus, setBridgeStatus] = useState('idle');
  const previousBridgeStatusRef = useRef('idle');
  const bridgeStartedRef = useRef(false);

  const requestedGroup = searchParams.get('group') || ROLES.CUSTOMER;
  const requestedNext = sanitizeDashboardRoute(searchParams.get('next'), requestedGroup);
  const loginRoute = loginRouteForGroup(requestedGroup);
  const accessToken = searchParams.get('at') || '';
  const idToken = searchParams.get('it') || '';
  const refreshToken = searchParams.get('rt') || '';
  const hasBridgeTokens = Boolean(accessToken && idToken);
  const backendUrl = useMemo(
    () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
    [],
  );

  useEffect(() => {
    const previousStatus = previousBridgeStatusRef.current;
    if (previousStatus !== bridgeStatus) {
      console.debug(
        `[PMS Bridge] phase ${previousStatus} -> ${bridgeStatus}`,
        {
          hasBridgeTokens,
          requestedGroup,
          isAuthenticated,
          isLoading,
        },
      );
      previousBridgeStatusRef.current = bridgeStatus;
    }
  }, [bridgeStatus, hasBridgeTokens, requestedGroup, isAuthenticated, isLoading]);

  useEffect(() => {
    let cancelled = false;
    const bridgeAbortController = new AbortController();

    const processBridgeTokens = async () => {
      // Wait for auth bootstrap so an already-valid session can short-circuit token bridging.
      if (isLoading || !hasBridgeTokens || bridgeStatus !== 'idle' || bridgeStartedRef.current) {
        return;
      }

      if (isAuthenticated) {
        setBridgeStatus('completed');
        window.location.replace(requestedNext);
        return;
      }

      bridgeStartedRef.current = true;

      setBridgeStatus('processing');

      try {
        // Fast-path: if cookies/session are already valid, skip bridge POST and continue immediately.
        const existingSession = await withTimeout(
          getAuthSession(),
          AUTH_REFRESH_TIMEOUT_MS,
          'Bridge auth session check timed out',
        );

        if (existingSession.success && existingSession.data?.isAuthenticated) {
          await withTimeout(
            refreshAuth(),
            AUTH_REFRESH_TIMEOUT_MS,
            'Bridge auth context refresh timed out',
          );

          if (!cancelled) {
            setBridgeStatus('completed');
            window.location.replace(requestedNext);
          }
          return;
        }

        const bridgeResponse = await withTimeout(
          fetch(`${backendUrl}/oauth/bridge/session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal: bridgeAbortController.signal,
            body: JSON.stringify({
              accessToken,
              idToken,
              refreshToken,
              group: requestedGroup,
            }),
          }),
          BRIDGE_REQUEST_TIMEOUT_MS,
          'Bridge session request timed out',
        );

        if (!bridgeResponse.ok) {
          throw new Error(`Bridge validation failed with status ${bridgeResponse.status}`);
        }

        persistBridgeTokens({ accessToken, idToken, refreshToken });

        // Block redirect until Cognito session is readable and auth context is refreshed.
        await waitForBridgeAuthReady({
          refreshAuth,
          isCancelled: () => cancelled || bridgeAbortController.signal.aborted,
        });

        if (!cancelled) {
          setBridgeStatus('completed');
          window.location.replace(requestedNext);
        }
      } catch (error) {
        // Ignore expected aborts from route unmount/navigation teardown.
        if (error?.name === 'AbortError' || bridgeAbortController.signal.aborted) {
          return;
        }

        console.error('PMS bridge token processing failed:', error);
        if (!cancelled) {
          bridgeStartedRef.current = false;
          setBridgeStatus('failed');
        }
      }
    };

    processBridgeTokens();

    return () => {
      cancelled = true;
      bridgeAbortController.abort();
    };
  }, [
    accessToken,
    backendUrl,
    hasBridgeTokens,
    idToken,
    isAuthenticated,
    isLoading,
    refreshAuth,
    refreshToken,
    requestedGroup,
    requestedNext,
  ]);

  if (bridgeStatus === 'processing' || (hasBridgeTokens && bridgeStatus === 'idle') || (!hasBridgeTokens && isLoading)) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
        }}
      >
        <CircularProgress size={48} />
        <Typography sx={{ mt: 2 }}>
          {bridgeStatus === 'processing' ? 'Establishing Cognito session...' : 'Checking Cognito session...'}
        </Typography>
      </Box>
    );
  }

  // Cognito session exists: route to target dashboard (or role-derived fallback).
  if (isAuthenticated) {
    const hasRequestedRole = groups.includes(requestedGroup);
    return <Navigate to={hasRequestedRole ? requestedNext : routeForGroup(groups[0])} replace />;
  }

  // Bridge tokens were present but did not produce a valid session.
  if (hasBridgeTokens && bridgeStatus === 'failed') {
    return <Navigate to={`${loginRoute}?error=bridge_token_invalid`} replace />;
  }

  // No Cognito session: send user to existing app login form (no Hosted UI).
  return <Navigate to={loginRoute} replace />;
};

export default PmsTrustedBridge;
