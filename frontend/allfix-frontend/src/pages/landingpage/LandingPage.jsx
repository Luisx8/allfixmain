import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Allfix
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/login" variant="outlined">
            Customer Login
          </Button>
          <Button component={Link} to="/signup" variant="contained">
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Book Home Services with Ease
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={4}>
            Connect with trusted professionals for aircon cleaning, plumbing, repairs, and more.
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/vendor-apply"
            variant="outlined"
            size="large"
            color="success"
          >
            Become a Vendor
          </Button>
        </Box>

        {/* Portal Links */}
        <Typography variant="h5" textAlign="center" mb={3} color="text.secondary">
          Login Portals
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box
              component={Link}
              to="/login"
              sx={{
                display: 'block',
                p: 3,
                textAlign: 'center',
                bgcolor: '#1976d2',
                color: 'white',
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              <Typography variant="h6">Customer</Typography>
              <Typography variant="body2">Book services</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              component={Link}
              to="/vendor-login"
              sx={{
                display: 'block',
                p: 3,
                textAlign: 'center',
                bgcolor: '#2e7d32',
                color: 'white',
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': { bgcolor: '#1b5e20' },
              }}
            >
              <Typography variant="h6">Vendor</Typography>
              <Typography variant="body2">Manage services</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              component={Link}
              to="/personnel-login"
              sx={{
                display: 'block',
                p: 3,
                textAlign: 'center',
                bgcolor: '#ed6c02',
                color: 'white',
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': { bgcolor: '#e65100' },
              }}
            >
              <Typography variant="h6">Personnel</Typography>
              <Typography variant="body2">View tasks</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              component={Link}
              to="/admin-login"
              sx={{
                display: 'block',
                p: 3,
                textAlign: 'center',
                bgcolor: '#9c27b0',
                color: 'white',
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': { bgcolor: '#7b1fa2' },
              }}
            >
              <Typography variant="h6">Admin</Typography>
              <Typography variant="body2">Platform management</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;