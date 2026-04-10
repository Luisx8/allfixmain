import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)',
        }}
      />
      
      {/* Dot Pattern Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
        }}
      />
      
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1100,
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
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 10 }}>
        {/* Content goes here */}
      </Container>
    </Box>
  );
};

export default LandingPage;