import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
  resendSignUpCode,
  fetchUserAttributes,
} from 'aws-amplify/auth';

/**
 * Sign up a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} Sign up result
 */
export async function signUpUser(email, password) {
  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirm user signup with verification code
 * @param {string} email - User's email address
 * @param {string} code - Verification code from email
 * @returns {Promise} Confirmation result
 */
export async function confirmUserSignUp(email, code) {
  try {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Resend signup verification code
 * @param {string} email - User's email address
 * @returns {Promise} Resend result
 */
export async function resendVerificationCode(email) {
  try {
    const result = await resendSignUpCode({ username: email });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Sign in user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} Sign in result with user data and groups
 */
export async function signInUser(email, password) {
  try {
    const result = await signIn({
      username: email,
      password,
    });
    
    // Fetch groups immediately after sign in
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
    
    return { success: true, data: { ...result, groups } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Sign out the current user
 * @returns {Promise} Sign out result
 */
export async function signOutUser() {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get the currently authenticated user
 * @returns {Promise} Current user or null
 */
export async function getAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get the current auth session (includes tokens and groups)
 * @returns {Promise} Session data with tokens and user groups
 */
export async function getAuthSession() {
  try {
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
    return {
      success: true,
      data: {
        tokens: session.tokens,
        groups,
        isAuthenticated: !!session.tokens,
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get user attributes (email, etc.)
 * @returns {Promise} User attributes
 */
export async function getUserAttributes() {
  try {
    const attributes = await fetchUserAttributes();
    return { success: true, data: attributes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Initiate password reset flow
 * @param {string} email - User's email address
 * @returns {Promise} Reset password result
 */
export async function initiatePasswordReset(email) {
  try {
    const result = await resetPassword({ username: email });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirm password reset with code and new password
 * @param {string} email - User's email address
 * @param {string} code - Verification code from email
 * @param {string} newPassword - New password
 * @returns {Promise} Confirm reset result
 */
export async function confirmPasswordReset(email, code, newPassword) {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if user belongs to a specific Cognito group
 * @param {string} groupName - Name of the group to check
 * @returns {Promise<boolean>} True if user is in the group
 */
export async function isUserInGroup(groupName) {
  const session = await getAuthSession();
  if (!session.success) return false;
  return session.data.groups.includes(groupName);
}

/**
 * Get all groups the current user belongs to
 * @returns {Promise<string[]>} Array of group names
 */
export async function getUserGroups() {
  const session = await getAuthSession();
  if (!session.success) return [];
  return session.data.groups;
}

/**
 * Persist bridge-issued Cognito tokens in localStorage using Cognito JS key format.
 * This lets Amplify pick up the authenticated session without interactive login.
 */
export function persistBridgeTokens({ accessToken, idToken, refreshToken }) {
  if (!accessToken || !idToken) {
    throw new Error('Missing Cognito bridge tokens');
  }

  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID || '61106lhm2fgpp3aqo2ighth8hd';
  const accessPayload = decodeJwtPayload(accessToken);
  const idPayload = decodeJwtPayload(idToken);
  const usernameCandidates = uniqueNonBlank([
    accessPayload.username,
    accessPayload['cognito:username'],
    accessPayload.sub,
    idPayload['cognito:username'],
    idPayload.username,
    idPayload.email,
    idPayload.sub,
  ]);
  const username = usernameCandidates[0];

  if (!username) {
    throw new Error('Unable to resolve username from Cognito tokens');
  }

  const prefix = `CognitoIdentityServiceProvider.${clientId}`;
  const iat = Number(accessPayload.iat || 0);
  const clockDrift = iat > 0 ? String(iat * 1000 - Date.now()) : '0';

  localStorage.setItem(`${prefix}.LastAuthUser`, username);
  usernameCandidates.forEach((candidate) => {
    const userPrefix = `${prefix}.${candidate}`;
    localStorage.setItem(`${userPrefix}.accessToken`, accessToken);
    localStorage.setItem(`${userPrefix}.idToken`, idToken);
    localStorage.setItem(`${userPrefix}.clockDrift`, clockDrift);
    if (refreshToken) {
      localStorage.setItem(`${userPrefix}.refreshToken`, refreshToken);
    }
  });

  return {
    username,
    groups: Array.isArray(idPayload['cognito:groups']) ? idPayload['cognito:groups'] : [],
  };
}

function uniqueNonBlank(values) {
  const seen = new Set();
  const result = [];

  values.forEach((value) => {
    const normalized = String(value || '').trim();
    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    result.push(normalized);
  });

  return result;
}

function decodeJwtPayload(token) {
  const parts = String(token || '').split('.');
  if (parts.length < 2) {
    throw new Error('Invalid JWT token format');
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = '='.repeat((4 - (base64.length % 4)) % 4);
  const json = atob(base64 + pad);
  return JSON.parse(json);
}
