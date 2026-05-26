import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BRAND = '#10355f';
const BRAND_MID = '#1a4a7a';

interface FooterPill {
  name: string;
  icon: React.ReactNode;
}

const footerPills: FooterPill[] = [
  { name: 'CoolFix', icon: <path d="M19.5 12h-15M17.5 16h-11M21.5 8h-15" strokeWidth="2" strokeLinecap="round"/> },
  { name: 'SaniFix', icon: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'HomeFix', icon: <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 9.36l-7.1 7.1a1 1 0 01-1.42 0l-1.4-1.4a1 1 0 010-1.42l7.1-7.1a6 6 0 019.36-7.94l-3.77 3.77z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'MoveFix', icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'GreenFix', icon: <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM11 20v-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'HealthFix', icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'SpaceFix', icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  { name: 'PetFix', icon: <><circle cx="5.5" cy="8.5" r="1.5" strokeWidth="2"/><circle cx="10" cy="5" r="1.5" strokeWidth="2"/><circle cx="14" cy="5" r="1.5" strokeWidth="2"/><circle cx="18.5" cy="8.5" r="1.5" strokeWidth="2"/><path d="M12 18c-3 0-5-1.5-5-4 0-1.5 2-4 5-4s5 2.5 5 4c0 2.5-2 4-5 4z" strokeWidth="2"/></> },
  { name: 'TechFix', icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeWidth="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
];

const faqData = [
  {
    question: 'What qualifications do I need to join as personnel?',
    answer: 'We welcome service professionals with experience in various fields. You\'ll need to pass our verification process to ensure quality service delivery to our customers.',
  },
  {
    question: 'How do I get paid for my work?',
    answer: 'All earnings are processed securely through the AllFix platform. Your compensation is deposited directly into your registered bank account or preferred payment method on a weekly basis.',
  },
  {
    question: 'Can I set my own schedule?',
    answer: 'Yes! AllFix offers flexible scheduling. You can accept jobs that fit your availability and manage your workload according to your preferences.',
  },
  {
    question: 'What support will I receive from AllFix?',
    answer: 'We provide comprehensive support including training resources, customer support handling, technical assistance, and a dedicated partner hotline to help you succeed.',
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Create Your Profile',
    description: 'Sign up with your basic information and verify your email to get started.',
  },
  {
    step: 2,
    title: 'Complete Verification',
    description: 'Undergo our verification process to ensure quality and trustworthiness.',
  },
  {
    step: 3,
    title: 'Set Your Availability',
    description: 'Choose your working hours and service areas based on your preferences.',
  },
  {
    step: 4,
    title: 'Start Earning',
    description: 'Accept bookings from verified customers and start building your income.',
  },
];

const PersonnelLandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | false>(false);
  
  // Step State for 'How it Works'
  const [selectedStep, setSelectedStep] = useState<number>(0);
  
  // Swipe Handlers for Mobile Step Slider
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration
    navigate('/personnel-login');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && selectedStep < howItWorksSteps.length - 1) {
      setSelectedStep(prev => prev + 1);
    }
    if (isRightSwipe && selectedStep > 0) {
      setSelectedStep(prev => prev - 1);
    }
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* ===================== NAVBAR ===================== */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1100,
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 4, md: 5 }, minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: { xs: 0, lg: 8, xl: 16 }, flex: { xs: '1 1 auto', lg: 'none' } }}>
            <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix.ph Logo" sx={{ width: { xs: 35, lg: 45 }, height: { xs: 35, lg: 45 }, objectFit: 'contain' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1, mb: 0.3, transition: 'color 0.3s ease', fontSize: { xs: '1.1rem', lg: '1.3rem' }, color: isScrolled ? BRAND : 'white' }}>
                All<span style={{ color: '#017550' }}>F</span><span style={{ color: '#fcbc26' }}>i</span><span style={{ color: '#d8242b' }}>x</span>.ph
              </Typography>
              <Typography variant="overline" sx={{ lineHeight: 1, fontSize: '0.6rem', letterSpacing: 0.5, transition: 'color 0.3s ease', color: isScrolled ? 'rgba(16, 53, 95, 0.7)' : 'rgba(255,255,255,0.7)' }}>
                YOUR ALL-IN-ONE SERVICE
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={() => { navigate('/vendor-apply'); window.scrollTo(0, 0); }}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none',
              color: isScrolled ? BRAND : 'rgba(255,255,255,0.9)',
              mr: { xl: 4, lg: 2 },
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===================== HERO SECTION ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 10, sm: 12, md: 0 },
          pb: { xs: 6, md: 0 },
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1552879890-3a06dd3a06c2?q=80&w=1254&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Personnel Background"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(8,20,45,0.72) 0%, rgba(8,20,45,0.35) 100%)',
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            px: { xs: 3, sm: 4, md: 6, lg: 10, xl: 16 },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: { xs: 4, md: 6, lg: 8 },
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Left: Text Content */}
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, maxWidth: '700px', mx: { xs: 'auto', lg: 0 } }}>
              <Typography
                variant="h1"
                fontWeight="800"
                color="white"
                sx={{
                  lineHeight: 1.1,
                  mb: 2,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem', lg: '4rem', xl: '4.5rem' },
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}
              >
                Earn Extra Income Working Flexibly On Your Terms
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem' },
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textShadow: '0 1px 6px rgba(0,0,0,0.3)',
                }}
              >
                Turn your skills into steady earnings with flexible work opportunities.
              </Typography>
            </Box>

            {/* Right: Registration Widget */}
            <Box
              sx={{
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                p: { xs: 2.5, sm: 3, md: 3.5 },
                maxWidth: '420px',
                width: '100%',
                mx: 'auto',
                position: 'sticky',
                top: { xs: 'auto', lg: '100px' },
                zIndex: 10,
                maxHeight: '80vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(255,255,255,0.5)',
                  borderRadius: '3px',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.7)',
                  },
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="800"
                color="white"
                sx={{ mb: 3, fontSize: '1.4rem' }}
              >
                Register as Personnel
              </Typography>

              <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  size="small"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+63 Mobile number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'white',
                    color: BRAND,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1rem',
                    py: 1.2,
                    borderRadius: '8px',
                    mt: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                >
                  Get Started
                </Button>

                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    mt: 1,
                  }}
                >
                  We'll verify your information to proceed.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ===================== WHITE SECTION ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          bgcolor: '#ffffff',
          py: { xs: 6, sm: 6, md: 8, lg: 8 },
          px: { xs: 2, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: 'center',
            }}
          >
            {/* Left: Image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: '250px', sm: '300px', md: '350px', lg: '400px' },
                borderRadius: { xs: '12px', md: '20px' },
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Personnel Career"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Box>

            {/* Right: Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem', lg: '3.2rem' },
                  fontWeight: 900,
                  color: BRAND,
                  lineHeight: 1.2,
                }}
              >
                Where careers thrive and growth begins
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem', lg: '1.1rem' },
                  color: '#555',
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                At AllFix, we're committed to supporting talented service professionals as they grow into the next generation of business innovators. Our platform combines real-world experience, flexible scheduling, and competitive earnings—ensuring every participant feels empowered, included, and set up for success from day one. With a presence across Metro Manila and key hubs nationwide, our professionals collaborate with businesses across industries, gaining exposure to diverse practices and opportunities that shape their careers.
              </Typography>

              <Button
                onClick={() => { navigate('/personnel-login'); window.scrollTo(0, 0); }}
                variant="contained"
                sx={{
                  bgcolor: BRAND,
                  color: 'white',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  px: 4,
                  py: 1.8,
                  borderRadius: '50px',
                  width: 'fit-content',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#0d264a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(16, 53, 95, 0.3)',
                  },
                }}
              >
                Join Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ===================== BLUE SECTION ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          bgcolor: BRAND,
          py: { xs: 6, sm: 6, md: 8, lg: 8 },
          px: { xs: 2, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            {/* Left: Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1.2,
                }}
              >
                Professional Development Program
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Our professional development program is designed to launch talented individuals into meaningful service careers. You'll complete rotations across different departments and functions—gaining comprehensive exposure and real-world experience. The program fosters growth through hands-on training, expert mentorship, and structured skill development, supported by coaching, peer collaboration, and inclusive learning environments that set you up for success from day one.
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                You'll work alongside experienced professionals, participate in industry events, and contribute to real projects that matter. Your achievements are recognized through competitive compensation, performance incentives, and clear career advancement pathways. With presence across major service hubs and a commitment to your growth, you'll build valuable skills and network while earning meaningful income and gaining experience that will shape your future.
              </Typography>

              <Button
                onClick={() => { navigate('/personnel-login'); window.scrollTo(0, 0); }}
                variant="contained"
                sx={{
                  bgcolor: '#22c55e',
                  color: 'white',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  px: 4,
                  py: 1.6,
                  borderRadius: '50px',
                  width: 'fit-content',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#16a34a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                  },
                  mt: 1,
                }}
              >
                Apply Now
              </Button>
            </Box>

            {/* Right: Image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: '250px', sm: '300px', md: '350px' },
                borderRadius: { xs: '12px', md: '20px' },
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Professional Development"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ===================== HOW IT WORKS SECTION ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          bgcolor: '#f8f9fa',
          py: { xs: 6, sm: 6, md: 8, lg: 8 },
          px: { xs: 2, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          {/* Title */}
          <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 900,
                color: BRAND,
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              How It Works
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                color: '#666',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Get started with AllFix in just a few simple steps
            </Typography>
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="center">
            {/* Left: Phone Mockup */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, md: 0 } }}
                // On mobile, the entire left section can capture swipe gestures
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Phone Frame */}
                <Box
                  sx={{
                    width: '240px',
                    height: '420px',
                    border: '10px solid #000',
                    borderRadius: '35px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    position: 'relative',
                    backgroundColor: '#fff',
                  }}
                >
                  {/* Notch */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#000',
                      borderRadius: '0 0 15px 15px',
                      zIndex: 10,
                    }}
                  />

                  {/* Screen Content */}
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '20px 15px 15px',
                      background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_MID} 100%)`,
                      color: 'white',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Step Headers */}
                    {selectedStep === 0 && (
                      <>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, mb: 1 }}>Create Profile</Typography>
                        <Typography sx={{ fontSize: '0.7rem', lineHeight: 1.4, opacity: 0.9, mb: 2 }}>Enter your details and verify email.</Typography>
                        <Box sx={{ fontSize: '2.5rem', textAlign: 'center', mt: 'auto', mb: 'auto' }}>📝</Box>
                      </>
                    )}
                    {selectedStep === 1 && (
                      <>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, mb: 1 }}>Verification</Typography>
                        <Typography sx={{ fontSize: '0.7rem', lineHeight: 1.4, opacity: 0.9, mb: 2 }}>Complete verification process.</Typography>
                        <Box sx={{ fontSize: '2.5rem', textAlign: 'center', mt: 'auto', mb: 'auto' }}>✓</Box>
                      </>
                    )}
                    {selectedStep === 2 && (
                      <>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, mb: 1 }}>Set Schedule</Typography>
                        <Typography sx={{ fontSize: '0.7rem', lineHeight: 1.4, opacity: 0.9, mb: 2 }}>Choose availability and areas.</Typography>
                        <Box sx={{ fontSize: '2.5rem', textAlign: 'center', mt: 'auto', mb: 'auto' }}>📅</Box>
                      </>
                    )}
                    {selectedStep === 3 && (
                      <>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, mb: 1 }}>Start Earning</Typography>
                        <Typography sx={{ fontSize: '0.7rem', lineHeight: 1.4, opacity: 0.9, mb: 2 }}>Accept bookings and earn.</Typography>
                        <Box sx={{ fontSize: '2.5rem', textAlign: 'center', mt: 'auto', mb: 'auto' }}>💰</Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right: Steps (Desktop & Mobile Conditional) */}
            <Grid size={{ xs: 12, md: 5 }}>
              
              {/* DESKTOP VIEW: Vertical List */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 1.8 }}>
                {howItWorksSteps.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedStep(index)}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: selectedStep === index ? BRAND : 'white',
                      cursor: 'pointer',
                      boxShadow: selectedStep === index ? `0 8px 32px rgba(16, 53, 95, 0.3)` : '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      border: selectedStep === index ? 'none' : '2px solid transparent',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(16, 53, 95, 0.15)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    {/* Step Number */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '55px',
                        height: '55px',
                        minWidth: '55px',
                        borderRadius: '50%',
                        bgcolor: selectedStep === index ? 'rgba(255,255,255,0.3)' : BRAND,
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 800,
                      }}
                    >
                      {item.step}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, py: 0.2 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: selectedStep === index ? 'white' : BRAND,
                          mb: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          color: selectedStep === index ? 'rgba(255,255,255,0.85)' : '#666',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* MOBILE VIEW: Swipeable Carousel */}
              <Box 
                sx={{ display: { xs: 'block', md: 'none' }, width: '100%', mt: 1 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Slider Container */}
                <Box sx={{ overflow: 'hidden', width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: `translateX(-${selectedStep * 100}%)`,
                    }}
                  >
                    {howItWorksSteps.map((item, index) => (
                      <Box key={index} sx={{ minWidth: '100%', px: 1, boxSizing: 'border-box' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            p: 2,
                            borderRadius: '16px',
                            bgcolor: BRAND,
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(16, 53, 95, 0.2)',
                            alignItems: 'center',
                            minHeight: '110px'
                          }}
                        >
                          {/* Step Number */}
                          <Box
                            sx={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: '55px', height: '55px', minWidth: '55px',
                              borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)',
                              color: 'white', fontSize: '2rem', fontWeight: 800,
                            }}
                          >
                            {item.step}
                          </Box>
                          
                          {/* Content */}
                          <Box sx={{ flex: 1, py: 0.2 }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Indicators */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3, mb: 2 }}>
                  {howItWorksSteps.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedStep(idx)}
                      sx={{
                        width: selectedStep === idx ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        bgcolor: selectedStep === idx ? BRAND : 'rgba(16, 53, 95, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* CTA Button */}
              <Box sx={{ mt: { xs: 1, md: 2 }, textAlign: { xs: 'center', md: 'left' } }}>
                <Button
                  onClick={() => { navigate('/personnel-login'); window.scrollTo(0, 0); }}
                  variant="contained"
                  sx={{
                    bgcolor: BRAND,
                    color: 'white',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    px: 3,
                    py: 1.3,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#0d264a',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(16, 53, 95, 0.3)',
                    },
                  }}
                >
                  Register Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===================== BLUE CTA SECTION ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          bgcolor: BRAND,
          py: { xs: 3, sm: 3, md: 4, lg: 4 },
          px: { xs: 2, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem', lg: '2.8rem' },
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Apply now and help us innovate services together!
            </Typography>

            <Button
              onClick={() => { navigate('/personnel-login'); window.scrollTo(0, 0); }}
              variant="contained"
              sx={{
                bgcolor: '#22c55e',
                color: 'white',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '0.95rem' },
                px: 3.5,
                py: 1.2,
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#16a34a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                },
              }}
            >
              Apply now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ===================== WHITE SECTION 2 ===================== */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          bgcolor: '#ffffff',
          py: { xs: 6, sm: 6, md: 8, lg: 8 },
          px: { xs: 2, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          {/* FAQ Title */}
          <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.1rem', md: '2.8rem' },
                fontWeight: 900,
                color: BRAND,
                lineHeight: 1.2,
              }}
            >
              Any Questions?
            </Typography>
          </Box>

          {/* FAQ Items */}
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            <Grid size={{ xs: 12, md: 10, lg: 8 }}>
              {faqData.map((faq: typeof faqData[0], index: number) => (
                <Accordion
                  key={index}
                  expanded={expandedFAQ === index}
                  onChange={() => setExpandedFAQ(expandedFAQ === index ? false : index)}
                  sx={{
                    mb: 2,
                    backgroundColor: 'white',
                    border: `1px solid #e0e0e0`,
                    borderRadius: '12px',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': {
                      border: `1px solid ${BRAND}`,
                      boxShadow: `0 4px 12px rgba(16, 53, 95, 0.1)`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      py: 2,
                      px: { xs: 2, md: 3 },
                      '& .MuiAccordionSummary-content': {
                        my: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        fontWeight: 700,
                        color: BRAND,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      py: 2,
                      px: { xs: 2, md: 3 },
                      pt: 0,
                      backgroundColor: 'rgba(16, 53, 95, 0.02)',
                      borderTop: `1px solid #e0e0e0`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        color: '#555',
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── FOOTER ── */}
      <Box component="footer" sx={{
        width: '100%',
        background: `linear-gradient(135deg, ${BRAND} 0%, #0d264a 55%, ${BRAND_MID} 100%)`,
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        color: 'white',
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Grid container spacing={{ xs: 4, sm: 5, md: 6, lg: 10 }} justifyContent="space-between">

            {/* Brand column */}
            <Grid size={{ xs: 12, sm: 12, md: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, cursor: 'pointer' }}
                onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
                <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix Logo"
                  sx={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                <Typography variant="h5" fontWeight="900" color="white" sx={{ letterSpacing: '-0.02em', fontSize: '1.4rem' }}>
                  All<span style={{ color: '#017550' }}>F</span><span style={{ color: '#fcbc26' }}>i</span><span style={{ color: '#d8242b' }}>x</span>.ph
                </Typography>
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.6, mb: 4, maxWidth: '380px' }}>
                The Philippines' most trusted property care platform. Connecting homes and offices with verified professionals since 2021.
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 1.5, mb: 4,
                maxWidth: { xs: '100%', sm: '400px' },
              }}>
                {footerPills.map(pill => (
                  <Box key={pill.name}
                    onClick={() => { navigate(`/${pill.name.toLowerCase()}`); window.scrollTo(0, 0); }}
                    sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8,
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
                      px: 1, py: 0.8, cursor: 'pointer',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor">{pill.icon}</svg>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap' }}>{pill.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Links columns */}
            <Grid size={{ xs: 4, sm: 4, md: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>COMPANY</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'About AllFix', action: () => navigate('/about') },
                  { label: 'Careers', action: () => navigate('/careers') },
                  { label: 'FPD Asia', action: () => window.open('https://www.fpdasia.net/', '_blank') },
                ].map(({ label, action }) => (
                  <Typography key={label} onClick={() => { action(); window.scrollTo(0, 0); }}
                    sx={{ color: 'rgba(255,255,255,0.65)', fontSize: { xs: '0.88rem', md: '1rem' }, cursor: 'pointer', '&:hover': { color: 'white' } }}>
                    {label}
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 4, sm: 4, md: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SUPPORT</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Help Center', path: '/help-center' },
                  { label: 'Book a Service', path: '/signup' },
                  { label: 'Partner With Us', path: '/vendor-apply' },
                ].map(({ label, path }) => (
                  <Typography key={label} onClick={() => { navigate(path); window.scrollTo(0, 0); }}
                    sx={{ color: 'rgba(255,255,255,0.65)', fontSize: { xs: '0.88rem', md: '1rem' }, cursor: 'pointer', '&:hover': { color: 'white' } }}>
                    {label}
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 4, sm: 4, md: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>LEGAL</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Privacy Policy', path: '/privacy' },
                  { label: 'Terms of Service', path: '/terms-of-use' },
                  { label: 'Service Guarantee', path: '/service-guarantee' },
                ].map(({ label, path }) => (
                  <Typography key={label} onClick={() => { navigate(path); window.scrollTo(0, 0); }}
                    sx={{ color: 'rgba(255,255,255,0.65)', fontSize: { xs: '0.88rem', md: '1rem' }, cursor: 'pointer', '&:hover': { color: 'white' } }}>
                    {label}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 4 }} />

          {/* Contact row */}
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="space-between" alignItems="flex-start">
            {[
              {
                icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
                label: 'CALL US', value: '+63 920 9631 217 | +63 975 8336 289',
              },
              {
                icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
                label: 'EMAIL US', value: 'inquiry@allfix.ph',
              },
            ].map(({ icon, label, value }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', mb: 0.3, letterSpacing: '0.05em' }}>{label}</Typography>
                    <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>{value}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ mt: 0.5, color: 'white', flexShrink: 0 }}><LocationOnIcon sx={{ fontSize: 22 }} /></Box>
                <Box>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', mb: 0.3, letterSpacing: '0.05em' }}>HEAD OFFICE</Typography>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>9824 Kamagong Street, Makati City 1203 Philippines</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 3 }} />

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            color: 'rgba(255,255,255,0.5)',
          }}>
            <Typography variant="caption" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
              © 2026 AllFix Philippines Inc. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { href: 'https://www.facebook.com/allfixph', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { href: 'https://www.instagram.com/allfixph', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { href: '#', icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/> },
              ].map(({ href, icon }, i) => (
                <IconButton key={i} component="a" href={href} target="_blank" rel="noopener noreferrer" size="small"
                  sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white' } }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </IconButton>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PersonnelLandingPage;