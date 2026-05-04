import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';

// --- FOOTER PILL DATA ---
const footerPills = [
  { name: 'CoolFix', icon: <path d="M19.5 12h-15M17.5 16h-11M21.5 8h-15" strokeWidth="2" strokeLinecap="round"/> },
  { name: 'SaniFix', icon: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'HomeFix', icon: <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 9.36l-7.1 7.1a1 1 0 01-1.42 0l-1.4-1.4a1 1 0 010-1.42l7.1-7.1a6 6 0 019.36-7.94l-3.77 3.77z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'MoveFix', icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'GreenFix', icon: <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM11 20v-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'HealthFix', icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'SpaceFix', icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'PetFix', icon: <><circle cx="5.5" cy="8.5" r="1.5" strokeWidth="2"/><circle cx="10" cy="5" r="1.5" strokeWidth="2"/><circle cx="14" cy="5" r="1.5" strokeWidth="2"/><circle cx="18.5" cy="8.5" r="1.5" strokeWidth="2"/><path d="M12 18c-3 0-5-1.5-5-4 0-1.5 2-4 5-4s5 2.5 5 4c0 2.5-2 4-5 4z" strokeWidth="2"/></> },
  { name: 'TechFix', icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
];

const coreValues = [
  {
    icon: <StarIcon sx={{ fontSize: 40, color: '#2E5BA8' }} />,
    title: 'Excellence',
    description: 'We deliver exceptional quality in every service, ensuring customer satisfaction with certified professionals and verified expertise.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: '#2E5BA8' }} />,
    title: 'Integrity',
    description: 'We operate with transparency and honesty, building trust through reliable service delivery and genuine customer relationships.',
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 40, color: '#2E5BA8' }} />,
    title: 'Innovation',
    description: 'We embrace technology and modern solutions to make property care accessible, efficient, and hassle-free for every Filipino.',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 40, color: '#2E5BA8' }} />,
    title: 'Accountability',
    description: 'We stand behind our work with service guarantees and are committed to making things right every single time.',
  },
];

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CssBaseline />

      {/* Seamless Navbar blending into the background */}
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 5 }, minHeight: '80px' }}>
          {/* Left Side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', ml: { xs: 0, md: 8, lg: 16 } }} onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
            <Box sx={{ width: 44, height: 44, bgcolor: isScrolled ? '#10355f' : 'grey.400', borderRadius: '50%', transition: 'background-color 0.3s ease' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color={isScrolled ? '#10355f' : 'white'} 
                sx={{ lineHeight: 1, mb: 0.3, transition: 'color 0.3s ease', fontSize: { xs: '1.2rem', md: '1.4rem' } }}
              >
                AllFix.ph
              </Typography>
              <Typography 
                variant="overline" 
                color={isScrolled ? '#2E5BA8' : 'rgba(255,255,255,0.7)'} 
                sx={{ lineHeight: 1, fontSize: { xs: '0.65rem', md: '0.65rem' }, transition: 'color 0.3s ease', letterSpacing: 0.5 }}
              >
                PROPERTY CARE EXPERTS
              </Typography>
            </Box>
          </Box>

          {/* Right Side: Back to Home Link */}
          <Box sx={{ mr: { xs: 0, md: 8, lg: 16 } }}>
            <Button 
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
              sx={{ 
                color: isScrolled ? '#10355f' : 'white', 
                fontWeight: 600, 
                textTransform: 'none', 
                fontSize: '0.95rem',
                '&:hover': { 
                  color: isScrolled ? '#2E5BA8' : '#eaf2fc', 
                  backgroundColor: isScrolled ? 'rgba(46, 91, 168, 0.08)' : 'rgba(255, 255, 255, 0.1)' 
                },
                px: 2,
                py: 1,
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', width: '100%' }}>
        
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative',
          minHeight: '50vh',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          pt: { xs: 12, md: 10 }, 
          pb: { xs: 4, md: 8 }, 
          px: 3, 
          background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)',
          color: 'white',
          overflow: 'hidden'
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <Typography variant="h1" fontWeight="900" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.2, mb: 3, letterSpacing: '-0.02em' }}>
              About AllFix.ph
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6, maxWidth: '700px', mx: 'auto', color: 'rgba(255,255,255,0.9)' }}>
              The Philippines' most trusted property care platform, connecting homes and offices with verified professionals since 2021.
            </Typography>
          </Container>
        </Box>

        {/* About Content - White Section */}
        <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 12 }, bgcolor: 'white', width: '100%' }}>
          <Container maxWidth="md">
            
            {/* Our Story Section */}
            <Section title="Our Story">
              <Typography sx={{ mb: 2, color: '#555', lineHeight: 1.8 }}>
                AllFix.ph was born from a simple observation: Filipinos deserve access to reliable, professional property care services without the stress and uncertainty. What started as a vision to solve this problem has grown into the Philippines' most trusted platform for home and office maintenance.
              </Typography>
              <Typography sx={{ mb: 2, color: '#555', lineHeight: 1.8 }}>
                Today, AllFix.ph connects thousands of property owners and managers with verified, skilled professionals across all major services—from air-conditioning to IT support, plumbing to sustainability solutions. We've built a community of experts dedicated to making property care simple, affordable, and accessible to every Filipino.
              </Typography>
            </Section>

            {/* Mission Section */}
            <Section title="Our Mission">
              <Box sx={{ 
                p: 3, 
                bgcolor: '#f0f7ff', 
                borderLeft: '4px solid #2E5BA8', 
                borderRadius: '8px',
                mb: 4
              }}>
                <Typography sx={{ fontSize: '1.1rem', color: '#10355f', fontWeight: 600, lineHeight: 1.8 }}>
                  To empower every Filipino home and business by providing access to trusted, professional property care services that enhance quality of life and operational efficiency.
                </Typography>
              </Box>
            </Section>

            {/* Vision Section */}
            <Section title="Our Vision">
              <Box sx={{ 
                p: 3, 
                bgcolor: '#f0f7ff', 
                borderLeft: '4px solid #2E5BA8', 
                borderRadius: '8px',
                mb: 4
              }}>
                <Typography sx={{ fontSize: '1.1rem', color: '#10355f', fontWeight: 600, lineHeight: 1.8 }}>
                  To be the Philippines' most trusted and accessible platform for property care, setting industry standards for quality, reliability, and customer satisfaction.
                </Typography>
              </Box>
            </Section>

            {/* Core Values Section */}
            <Box sx={{ mb: 8, width: '100%' }}>
              <Typography variant="h2" fontWeight="900" color="#10355f" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.2, mb: 6, letterSpacing: '-0.02em', textAlign: 'center' }}>
                Our Core Values
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
                gap: 3, 
                width: '100%' 
              }}>
                {coreValues.map((value, index) => (
                  <Card key={index} sx={{ 
                    height: '100%',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(46, 91, 168, 0.1)',
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(46, 91, 168, 0.15)',
                      transform: 'translateY(-4px)',
                    }
                  }}>
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      pt: 3, 
                      pb: 3, 
                      px: 2,
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: '100%',
                      overflow: 'visible'
                    }}>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                        {value.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="800" color="#10355f" sx={{ mb: 2, wordWrap: 'break-word', overflow: 'visible' }}>
                        {value.title}
                      </Typography>
                      <Typography sx={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem', flex: 1 }}>
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* NEW STYLED SECTION: Why Choose AllFix */}
            {/* Blue Gradient Background & Flexbox Vertical Stacking */}
            <Box sx={{ 
              mb: 6, 
              p: { xs: 3, md: 5 }, 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10355f 0%, #1a3f70 100%)',
              boxShadow: '0 8px 32px rgba(16, 53, 95, 0.2)'
            }}>
              <Typography variant="h3" fontWeight="800" color="white" sx={{ mb: 4, fontSize: '1.8rem' }}>
                Why Choose AllFix
              </Typography>
              
              {/* Flex Column guarantees it stacks like 1, 2, 3, 4, 5 vertically */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {[
                  'Verified & background-checked professionals across all services',
                  'Easy online booking with transparent pricing',
                  'Real-time job tracking and customer support',
                  'Service guarantee on all bookings',
                  'Eco-friendly and sustainable solutions available',
                  'Trusted by thousands of Filipino families and businesses since 2021',
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      flexShrink: 0 
                    }}>
                      <Typography sx={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>✓</Typography>
                    </Box>
                    <Typography sx={{ color: 'white', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Typography sx={{ mt: 6, pt: 4, borderTop: '1px solid #e5eaf2', color: '#999', fontSize: '0.85rem' }}>
              Last Updated: May 4, 2026
            </Typography>

          </Container>
        </Box>

        {/* FULL CUSTOM FOOTER REPLACEMENT */}
        <Box
          component="footer"
          sx={{
            width: '100%',
            bgcolor: '#0a1e3f', 
            pt: { xs: 8, md: 10 },
            pb: { xs: 4, md: 6 },
            color: 'white',
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
            
            {/* MAIN ROW - 12 COLUMNS TOTAL DISTRIBUTED */}
            <Grid container spacing={{ xs: 4, md: 10, lg: 12 }}>
              
              {/* Left Column - Brand Info & 3x3 Grid Pills */}
              <Grid item xs={12} md={4}>
                
                {/* Logo Area */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, cursor: 'pointer' }} onClick={() => { navigate('/'); window.scrollTo(0,0); }}>
                  <Box sx={{ width: 32, height: 32, position: 'relative', display: 'flex', flexWrap: 'wrap', borderRadius: '50%', overflow: 'hidden' }}>
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#4285F4' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#EA4335' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#FBBC05' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#34A853' }} />
                  </Box>
                  <Typography variant="h5" fontWeight="900" color="white" sx={{ letterSpacing: '-0.02em', fontSize: '1.4rem' }}>
                    AllFix<span style={{ color: '#60a5fa' }}>.ph</span>
                  </Typography>
                </Box>
                
                {/* Description */}
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, mb: 4, maxWidth: '380px' }}>
                  The Philippines' most trusted property care platform. Connecting homes and offices with verified professionals since 2021.
                </Typography>

                {/* Service Pills (3x3 GRID) */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1.5, 
                  mb: 4, 
                  width: '100%', 
                  maxWidth: '400px'
                }}>
                  {footerPills.map(pill => (
                    <Box key={pill.name} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1, 
                      border: '1px solid rgba(255,255,255,0.15)', 
                      borderRadius: '8px', 
                      px: 1, 
                      py: 0.8, 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } 
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        {pill.icon}
                      </svg>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textAlign: 'center' }}>
                        {pill.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Social Icons */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </IconButton>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </IconButton>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </IconButton>
                </Box>
              </Grid>

              {/* COMPANY COLUMN */}
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>COMPANY</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['About AllFix', 'Services', 'How It Works', 'Why AllFix', 'Service Area', 'Testimonials'].map(link => (
                    <Typography 
                      key={link} 
                      onClick={() => {
                        if (link === 'About AllFix') {
                          navigate('/about');
                        }
                      }}
                      sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              {/* SERVICES COLUMN */}
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SERVICES</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Air-con (CoolFix)', 'Plumbing (SaniFix)', 'Repairs (HomeFix)', 'IT Support (TechFix)', 'Moving (MoveFix)', 'Health (HealthFix)', 'Sustainability (GreenFix)', 'Pets (PetFix)'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
                  ))}
                </Box>
              </Grid>

              {/* SUPPORT COLUMN */}
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SUPPORT</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Help Center', 'Book a Service', 'Track My Job', 'Partner With Us'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              {/* LEGAL COLUMN */}
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>LEGAL</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Service Guarantee'].map(link => (
                    <Typography 
                      key={link} 
                      onClick={() => {
                        if (link === 'Privacy Policy') {
                          navigate('/privacy');
                        } else if (link === 'Terms of Service') {
                          navigate('/terms-of-use');
                        }
                      }}
                      sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

            </Grid>

            {/* Divider 1 */}
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: { xs: 5, md: 2 } }} />

            {/* Contact Info Row */}
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>CALL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>+63 920 9631 217 | +63 975 8336 289</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>EMAIL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>inquiry@allfix.ph</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <LocationOnIcon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>HEAD OFFICE</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', lineHeight: 1.4 }}>9824 Kamagong Street, San Antonio Village,<br/>Makati City 1203 Philippines</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Divider 2 */}
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

            {/* COPYRIGHT BAR */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              gap: 2,
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '0.85rem' 
            }}>
              <Typography variant="caption" sx={{ fontSize: 'inherit' }}>
                © 2026 AllFix Philippines Inc. All rights reserved. DTI Reg. No. 2021-00001.
              </Typography>
            </Box>

          </Container>
        </Box>

      </Box>
    </>
  );
};

// Section Component for cleaner organization
const Section = ({ title, children }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h3" fontWeight="800" color="#10355f" sx={{ mb: 3, fontSize: '1.8rem' }}>
      {title}
    </Typography>
    <Box sx={{ color: '#555', lineHeight: 1.8 }}>
      {children}
    </Box>
  </Box>
);

export default AboutUsPage;