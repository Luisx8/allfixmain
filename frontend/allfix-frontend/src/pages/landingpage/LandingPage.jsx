import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#0f2744',
          py: 2,
          px: { xs: 2, md: 5 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 3,
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 45, height: 45, bgcolor: 'grey.500', borderRadius: '50%', mr: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight="bold" color="white" sx={{ lineHeight: 1, mb: 0.5 }}>
              AllFix.ph
            </Typography>
            <Typography variant="overline" color="white" sx={{ lineHeight: 1, fontSize: '0.65rem', letterSpacing: 0.5 }}>
              PROPERTY CARE EXPERTS
            </Typography>
          </Box>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4.5, alignItems: 'center' }}>
          {['Services', 'How It Works', 'Why AllFix', 'Testimonials', 'Become Our Partner'].map((text) => (
            <Typography
              key={text}
              component={Link}
              to="#"
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                '&:hover': { color: 'grey.300' }
              }}
            >
              {text}
            </Typography>
          ))}
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