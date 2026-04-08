import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

/**
 * LoginRedirect - Wrapper for login pages that auto-redirects authenticated users
 * If user is logged in AND has the required role, redirect to the dashboard
 * If user is logged in but doesn't have the role, show the login form
 * If user is not logged in, show the login form
 * 
 * @param {ReactNode} children - The login component to render
 * @param {string} requiredRole - The role needed to auto-redirect
 * @param {string} redirectTo - Where to redirect if user has the role
 */
const LoginRedirect = ({ children, requiredRole, redirectTo }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
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
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  // User is authenticated and has the required role - auto-redirect
  if (isAuthenticated && hasRole(requiredRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated OR doesn't have the role - show login form
  return children;
};

export default LoginRedirect;
