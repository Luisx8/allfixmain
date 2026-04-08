import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth, ROLES } from '../contexts/AuthContext';

/**
 * LandingRedirect - Wrapper for the landing page that redirects authenticated users
 * to their role-specific dashboard. Only unauthenticated users can see the landing page.
 * 
 * Priority order for role-based redirects:
 * 1. Admin -> /admin
 * 2. Personnel -> /personnel
 * 3. Vendor -> /vendor
 * 4. Customer -> /user
 */
const LandingRedirect = ({ children }) => {
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

  // If authenticated, redirect to the appropriate dashboard based on role
  if (isAuthenticated) {
    if (hasRole(ROLES.ADMIN)) {
      return <Navigate to="/admin" replace />;
    }
    if (hasRole(ROLES.PERSONNEL)) {
      return <Navigate to="/personnel" replace />;
    }
    if (hasRole(ROLES.VENDOR)) {
      return <Navigate to="/vendor" replace />;
    }
    if (hasRole(ROLES.CUSTOMER)) {
      return <Navigate to="/user" replace />;
    }
    // Fallback: authenticated but no recognized role - show landing page
    // (could also redirect to a default dashboard or show an error)
  }

  // Not authenticated - show the landing page
  return children;
};

export default LandingRedirect;
