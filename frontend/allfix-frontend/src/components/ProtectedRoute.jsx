import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoute - Guards routes based on authentication and role
 * @param {ReactNode} children - The component to render if authorized
 * @param {string|string[]} allowedRoles - Role(s) allowed to access this route
 * @param {string} redirectTo - Where to redirect if not authorized
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = '/login' }) => {
  const { isAuthenticated, isLoading, groups, hasRole } = useAuth();
  const location = useLocation();

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

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role if specified
  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const hasAllowedRole = roles.some((role) => hasRole(role));

    if (!hasAllowedRole) {
      // User is authenticated but doesn't have the required role
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            p: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Access Denied
          </Typography>
          <Typography color="text.secondary">
            You don't have permission to access this page.
          </Typography>
        </Box>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
