import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// Import icons for the new section
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import { signUpUser, confirmUserSignUp } from '../../api/authService';

const steps = ['Account Details', 'Business Info', 'Verify Email'];

// Data for the "Why Partner with AllFix?" section
const partnerFeatures = [
  {
    title: 'Access to Thousands of Customers',
    description: 'Get connected with homeowners and businesses actively looking for your services across Metro Manila.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Grow Your Business',
    description: 'Increase your revenue with consistent job bookings and expand your customer base effortlessly.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Flexible Scheduling',
    description: 'Accept jobs that fit your schedule. You decide when and where you want to work.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: '24/7 Partner Support',
    description: 'Our dedicated partner support team is always ready to help you succeed.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: 'Build Your Reputation',
    description: 'Earn verified badges and customer reviews to stand out from the competition.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 3.09L19.5 5.5l-1.41 4.29L22 12l-3.91 2.21 1.41 4.29-4.41-.41L12 22l-3.09-3.09L4.5 18.5l1.41-4.29L2 12l3.91-2.21-1.41-4.29 4.41.41L12 2z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Competitive Earnings',
    description: 'Keep more of what you earn with our fair commission structure and fast payouts.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10355f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    ),
  },
];

// Data for the Hero Stat Cards
const statCards = [
  { stat: '500+', title: 'Active Partners', sub: 'across Metro Manila' },
  { stat: '50K+', title: 'Jobs Completed', sub: 'and counting' },
  { stat: '4.8', title: 'Average Rating', sub: 'partner satisfaction' },
  { stat: '7 Days', title: 'Avg. Payout', sub: 'fast & reliable' },
];

// Data for the Partner Requirements section
const partnerRequirements = [
  { icon: <ShieldOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Valid government-issued ID' },
  { icon: <DescriptionOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Business registration or NBI clearance' },
  { icon: <VerifiedUserOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Relevant certifications for your trade' },
  { icon: <AccessTimeOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Minimum 2 years professional experience' },
  { icon: <FlashOnOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Own tools and equipment' },
  { icon: <SmartphoneOutlinedIcon sx={{ color: '#10355f', fontSize: '1.4rem' }} />, text: 'Smartphone with internet access' },
];

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

const VendorApplication = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Step 1: Account details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Business info
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  // Step 3: Verification
  const [verificationCode, setVerificationCode] = useState('');

  const handleNext = async () => {
    setError('');

    if (activeStep === 0) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (!businessName || !contactNumber) {
        setError('Please fill in all required fields');
        return;
      }
      setIsLoading(true);
      const result = await signUpUser(email, password);

      if (result.success) {
        setActiveStep(2);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    } else if (activeStep === 2) {
      setIsLoading(true);
      const result = await confirmUserSignUp(email, verificationCode);

      if (result.success) {
        navigate('/vendor-application-submitted', {
          state: { businessName, email },
        });
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    if (formSection) {
      const offset = formSection.getBoundingClientRect().top + window.scrollY - 64; 
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  // Adjusted text fields to "small" size and reduced margins for compactness
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField size="small" label="Email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} />
            <TextField size="small" label="Password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} helperText="Minimum 8 characters" />
            <TextField size="small" label="Confirm Password" type="password" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} />
          </>
        );
      case 1:
        return (
          <>
            <TextField size="small" label="Business Name" fullWidth required value={businessName} onChange={(e) => setBusinessName(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} />
            <TextField size="small" label="Business Address" fullWidth value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} />
            <TextField size="small" label="Contact Number" fullWidth required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} />
            <TextField size="small" label="Services Description" fullWidth multiline rows={2} value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} helperText="Briefly describe your services" />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              A verification code has been sent to <strong>{email}</strong>
            </Typography>
            <TextField size="small" label="Verification Code" fullWidth required value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} sx={{ mb: 1.5 }} disabled={isLoading} placeholder="Enter 6-digit code" />
          </>
        );
      default:
        return null;
    }
  };

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
            <Box sx={{ width: 44, height: 44, bgcolor: 'grey.400', borderRadius: '50%' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" color={isScrolled ? '#10355f' : 'white'} sx={{ lineHeight: 1, mb: 0.3, transition: 'color 0.3s ease', fontSize: { xs: '1.2rem', md: '1.4rem' } }}>AllFix.ph</Typography>
              <Typography variant="overline" color={isScrolled ? '#10355f' : 'rgba(255,255,255,0.7)'} sx={{ lineHeight: 1, fontSize: { xs: '0.65rem', md: '0.65rem' }, transition: 'color 0.3s ease', letterSpacing: 0.5 }}>PROPERTY CARE EXPERTS</Typography>
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
                '&:hover': { color: isScrolled ? '#10355f' : '#eaf2fc', backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255, 255, 255, 0.1)' },
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
        
        {/* Exact Hero Section from LandingPage */}
        <Box sx={{ 
          position: 'relative',
          minHeight: '100vh',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          pt: { xs: 12, md: 10 }, 
          pb: { xs: 8, md: 0 }, 
          px: 3, 
          background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)', 
          color: 'white',
          overflow: 'hidden'
        }}>
          {/* LandingPage '+' Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* LandingPage Animated Gradient Blobs */}
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
              zIndex: 0,
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
              zIndex: 0,
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
            
            <Grid container spacing={{ xs: 6, md: 4, lg: 8 }} alignItems="center">
              
              {/* Left Column: Text & Buttons */}
              <Grid item xs={12} md={6}>
                {/* Partner Badge */}
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  bgcolor: 'rgba(255, 255, 255, 0.1)', 
                  color: 'white', 
                  px: 2.5, 
                  py: 1, 
                  borderRadius: '999px', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  mb: 3, 
                  border: '1px solid rgba(255, 255, 255, 0.2)' 
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                  </svg>
                  Partner Program
                </Box>

                {/* Headings */}
                <Typography variant="h1" fontWeight="900" sx={{ fontSize: { xs: '3rem', md: '4rem', lg: '4.8rem' }, lineHeight: 1.1, mb: 3, letterSpacing: '-0.02em' }}>
                  Grow Your Business<br/>with AllFix
                </Typography>
                <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.6, mb: 5, maxWidth: '90%' }}>
                  Join our network of trusted service providers and connect with thousands of customers looking for quality home services across Metro Manila.
                </Typography>

                {/* Buttons Row */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={scrollToForm} 
                    endIcon={<ArrowForwardIcon />} 
                    sx={{ bgcolor: 'white', color: '#10355f', fontWeight: 800, fontSize: '0.95rem', px: 3.5, py: 1.2, borderRadius: '8px', textTransform: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', '&:hover': { bgcolor: '#eaf2fc' } }}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => { document.getElementById('why-partner').scrollIntoView({ behavior: 'smooth' }); }} 
                    sx={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: 'white', fontWeight: 700, fontSize: '0.95rem', px: 3.5, py: 1.2, borderRadius: '8px', textTransform: 'none', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>

              {/* Right Column: 2x2 Grid of Stat Cards */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {statCards.map((card, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Card elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', bgcolor: 'white' }}>
                        <Typography sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 900, color: '#10355f', lineHeight: 1, mb: 1.5, letterSpacing: '-0.03em' }}>
                          {card.stat}
                        </Typography>
                        <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: '#10355f', mb: 0.5 }}>
                          {card.title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                          {card.sub}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

            </Grid>
          </Container>
        </Box>

        {/* Why Partner Section */}
        <Box id="why-partner" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white', width: '100%' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight="900" color="#10355f" align="center" mb={1} sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Why Partner with AllFix?
            </Typography>
            <Typography variant="body1" color="#666" align="center" mb={6} sx={{ fontSize: '1.1rem' }}>
              We provide everything you need to succeed and grow your service business.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3, width: '100%' }}>
              {partnerFeatures.map((feature, idx) => (
                <Card 
                  key={idx}
                  elevation={0}
                  sx={{ 
                    p: { xs: 3, md: 4 }, 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #e5eaf2', 
                    borderRadius: '16px',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(16, 53, 95, 0.08)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="800" color="#10355f" mb={1.5} sx={{ fontSize: '1.15rem' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="#666" sx={{ lineHeight: 1.6, fontSize: '0.95rem', flexGrow: 1 }}>
                    {feature.description}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* COMPACT COMBINED SECTION: Requirements (Left) & Vendor Form (Right) */}
        <Box id="application-form" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa', pt: { xs: 12, md: 10 }, pb: { xs: 6, md: 6 }, width: '100%' }}>
          <Container maxWidth="xl"> {/* Wider to easily fit side-by-side elements compactly */}
            <Grid container spacing={{ xs: 6, md: 4, lg: 6 }} alignItems="center" justifyContent="center">
              
              {/* Left Column: Requirements List */}
              <Grid item xs={12} md={6}>
                <Box sx={{ pr: { md: 2, lg: 4 }, maxWidth: 550, mx: { xs: 'auto', md: '0 0 0 auto' } }}>
                  <Typography variant="h3" fontWeight="900" color="#10355f" mb={1} sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1.2 }}>
                    Partner Requirements
                  </Typography>
                  <Typography variant="body1" color="#666" mb={3} sx={{ fontSize: '0.95rem' }}>
                    To ensure quality service for our customers, partners must meet these criteria before joining our network.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {partnerRequirements.map((req, idx) => (
                      <Card key={idx} elevation={0} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        p: 1.5, 
                        borderRadius: '12px', 
                        border: '1px solid #e5eaf2',
                        bgcolor: 'white'
                      }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '10px', 
                          bgcolor: '#f5f7fa', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0 
                        }}>
                          {req.icon}
                        </Box>
                        <Typography variant="body1" fontWeight="700" color="#10355f" sx={{ fontSize: '0.9rem' }}>
                          {req.text}
                        </Typography>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: The Application Form */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Card sx={{ width: '100%', maxWidth: 450, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', borderRadius: '20px' }}>
                  <CardContent sx={{ p: { xs: 3, sm: 3, md: 4 } }}>
                    <Typography variant="h5" component="h1" fontWeight="900" color="#10355f" gutterBottom textAlign="center">
                      Vendor Application
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                      Create your professional account below.
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {renderStepContent()}

                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                      {activeStep > 0 && (
                        <Button variant="outlined" onClick={handleBack} disabled={isLoading} sx={{ flex: 1, borderColor: '#10355f', color: '#10355f', fontWeight: 700, borderRadius: '8px' }}>
                          Back
                        </Button>
                      )}
                      <Button variant="contained" onClick={handleNext} disabled={isLoading} sx={{ flex: 1, bgcolor: '#10355f', fontWeight: 700, borderRadius: '8px', '&:hover': { bgcolor: '#0a1e3f' } }}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : activeStep === 2 ? 'Submit Application' : 'Next'}
                      </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Already a vendor?{' '}
                        <Link to="/vendor-login" style={{ color: '#10355f', fontWeight: '800', textDecoration: 'none' }}>
                          Sign in here
                        </Link>
                      </Typography>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Container>
        </Box>

        {/* FULL CUSTOM FOOTER REPLACEMENT - EXACTLY AS IMAGE */}
        <Box
          component="footer"
          sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            ml: '-50vw',
            mr: '-50vw',
            bgcolor: '#0a1e3f', 
            pt: { xs: 8, md: 10 },
            pb: { xs: 4, md: 6 },
            color: 'white',
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
            
            {/* MAIN ROW - 12 COLUMNS TOTAL DISTRIBUTED EXACTLY AS IMAGE */}
            <Grid container spacing={{ xs: 4, md: 10, lg: 12 }}>
              
              {/* Left Column - Brand Info & 3x3 Grid Pills (Takes up 4 columns) */}
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

                {/* Service Pills (FORCED 3x3 GRID) */}
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
                  {['About AllFix', 'Careers', 'Press & Media', 'Investor Relations'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
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
                    <Typography 
                      key={link} 
                      onClick={() => {
                        if (link === 'Partner With Us') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}
                    >
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
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
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
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}> inquiry@allfix.ph</Typography>
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

            {/* INTEGRATED BOTTOM COPYRIGHT BAR */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              gap: 2,
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '0.85rem' 
            }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 3 }, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Typography variant="caption" sx={{ fontSize: 'inherit' }}>
                  © 2026 AllFix Philippines Inc. All rights reserved. DTI Reg. No. 2021-00001.
                </Typography>
              </Box>
            </Box>

          </Container>
        </Box>

      </Box>
    </>
  );
};

export default VendorApplication;