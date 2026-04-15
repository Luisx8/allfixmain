import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, TextField, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why AllFix', href: '#why-allfix' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Become Our Partner', href: '#become-partner' },
  ];

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

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
      
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: { xs: 12, md: 16 } }}>
            <Box sx={{ width: 48, height: 48, bgcolor: 'grey.400', borderRadius: '50%' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" color={isScrolled ? '#10355f' : 'white'} sx={{ lineHeight: 1, mb: 0.5, transition: 'color 0.3s ease' }}>
                AllFix.ph
              </Typography>
              <Typography variant="overline" color={isScrolled ? '#10355f' : 'white'} sx={{ lineHeight: 1, fontSize: '0.65rem', letterSpacing: 0.5, transition: 'color 0.3s ease' }}>
                PROPERTY CARE EXPERTS
              </Typography>
            </Box>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: { lg: 4, md: 2 } }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  color: isScrolled ? '#10355f' : 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255,255,255,0.1)',
                    color: isScrolled ? '#10355f' : 'white',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: isScrolled ? '#10355f' : 'white',
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {/* Mobile Menu */}
        {mobileOpen && (
          <Box
            sx={{
              bgcolor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(16, 53, 95, 0.5)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: isScrolled ? '#10355f' : 'white',
                    '&:hover': {
                      backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ position: 'relative', zIndex: 10, minHeight: '100vh', mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Animated Gradient Blobs */}
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            left: 40,
            width: 288,
            height: 288,
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(96px)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            right: 40,
            width: 288,
            height: 288,
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(96px)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, pb: 8 }}>
          <Grid container spacing={6} alignItems="flex-start" sx={{ width: '100%', minHeight: '100vh' }}>
            {/* Left Column - Hero Content */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 3, pt: { xs: -20, md: -32 } }}>
              {/* Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  px: 3,
                  py: 1.5,
                  mb: 4,
                  backdropFilter: 'blur(10px)',
                  width: 'fit-content',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: '#4ade80',
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'white',
                  }}
                >
                  Manila's #1 Home Services Platform
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography
                sx={{
                  fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 900,
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Hassle-Free <br /> Property Care, <br /> Done Right.
              </Typography>

              {/* Subheading */}
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'rgba(191, 219, 254, 1)',
                  mb: 6,
                  lineHeight: 1.6,
                  maxWidth: { xs: '90%', md: '550px' },
                }}
              >
                From aircon cleaning to plumbing, repairs to IT support — AllFix connects you with trusted, verified professionals across Metro Manila.
              </Typography>

              {/* Stats */}
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: 4, md: 6 }, flexWrap: 'wrap', mt: -4 }}>
                {/* Stat 1 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon
                    sx={{
                      width: 24,
                      height: 24,
                      color: '#4ade80',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>
                      5,000+
                    </Typography>
                    <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.875rem' }}>
                      Verified Pros
                    </Typography>
                  </Box>
                </Box>

                {/* Stat 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StarIcon
                    sx={{
                      width: 24,
                      height: 24,
                      color: '#facc15',
                      flexShrink: 0,
                      fill: '#facc15',
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>
                      4.9★
                    </Typography>
                    <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.875rem' }}>
                      Average Rating
                    </Typography>
                  </Box>
                </Box>

                {/* Stat 3 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon
                    sx={{
                      width: 24,
                      height: 24,
                      color: '#60a5fa',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>
                      Insured &
                    </Typography>
                    <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.875rem' }}>
                      Accredited
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Registration Widget */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pt: { xs: 8, md: 4 }, transform: { xs: 'translateX(0)', md: 'translateX(80px)' } }}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '20px',
                  p: { xs: 1.5, md: 2 },
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                  width: '100%',
                  maxWidth: '550px',
                }}
              >
                {/* Badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: '#E8F1FF',
                    color: '#10355f',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.5,
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    mb: 2,
                  }}
                >
                  ✓ ACCOUNT REGISTRATION
                </Box>

                {/* Heading */}
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#10355f',
                    mb: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  Create Your Account
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: '#666',
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  Fill in the details below to create your AllFix account.
                </Typography>

                {/* Name Row - First & Last Name */}
                <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>
                      Firstname <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your first name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#bbb',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>
                      Lastname <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your last name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#bbb',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Email Row - Full Width */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>
                    Email address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="name@example.com"
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1, color: '#999', fontSize: '1.2rem' }}>✉</Typography>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: '#bbb',
                        },
                      },
                    }}
                  />
                </Box>

                {/* City & Birthdate Row */}
                <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>
                      City of residence <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      defaultValue=""
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#bbb',
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Select an NCR city</MenuItem>
                      <MenuItem value="manila">Manila</MenuItem>
                      <MenuItem value="makati">Makati</MenuItem>
                      <MenuItem value="bgc">BGC</MenuItem>
                      <MenuItem value="quezon">Quezon City</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>
                      Birthdate <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="dd/mm/yyyy"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#bbb',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#10355f',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    py: 1,
                    borderRadius: '50px',
                    textTransform: 'none',
                    mb: 1.5,
                    '&:hover': {
                      bgcolor: '#0d264a',
                    },
                  }}
                >
                  Create Account
                </Button>

                {/* Security Message */}
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: '#999',
                    textAlign: 'center',
                  }}
                >
                  Your credentials are securely protected.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Explore Services Section */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            py: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -28,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(148, 163, 184, 1)',
              mb: 3,
            }}
          >
            Explore Services
          </Typography>
          <Box
            sx={{
              width: 6,
              height: 32,
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
              },
              transition: 'border-color 0.3s ease',
            }}
          >
            <Box
              sx={{
                width: '2px',
                height: '8px',
                bgcolor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '1px',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(8px)' },
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Services Section */}
      <Box
        id="services"
        sx={{
          position: 'relative',
          zIndex: 10,
          bgcolor: '#ffffff',
          minHeight: '100vh',
          py: 12,
          px: { xs: 2, md: 5 },
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: 8, ml: -6 }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#E0EFFE',
                color: '#10355f',
                borderRadius: '9999px',
                px: 3,
                py: 1,
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Our Services
            </Box>

            {/* Heading */}
            <Typography
              sx={{
                fontSize: { xs: '1.875rem', md: '2.25rem' },
                fontWeight: 900,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Eight Expert Brands,{' '}
              <span style={{ color: '#10355f' }}>One Trusted Platform</span>
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                color: '#666',
                fontSize: { xs: '0.95rem', md: '1rem' },
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Each AllFix brand specializes in a distinct service area, staffed by trained, background-checked professionals with industry certifications.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;