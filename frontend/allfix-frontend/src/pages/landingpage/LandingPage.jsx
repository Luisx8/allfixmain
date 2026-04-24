import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, TextField, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';

// --- Testimonial Data ---
const testimonials = [
  {
    initials: 'MS',
    name: 'Maria Santos',
    role: 'Homeowner, Makati City',
    highlight: 'CoolFix – AC Cleaning',
    highlightColor: '#eaf2fc',
    highlightText: '#23406e',
    avatarBg: '#eaf2fc',
    avatarText: '#23406e',
    text: '"Napakaayos ng trabaho! The CoolFix technician arrived exactly on time, wore PPE, and cleaned our 3 aircon units thoroughly. The apartment feels so much cooler now. Highly recommend!"',
    mini: 'Napakaayos ng trabaho! The CoolFix technician arrived exactly on time, wore PPE...'
  },
  {
    initials: 'RC',
    name: 'Engr. Roberto Cruz',
    role: 'Property Manager, Pasig',
    highlight: 'SaniFix – Deep Cleaning',
    highlightColor: '#eaf2fc',
    highlightText: '#23406e',
    avatarBg: '#eaf2fc',
    avatarText: '#23406e',
    text: '"We\'ve been managing commercial properties for 10 years, and AllFix SaniFix is the most reliable, professional team we\'ve worked with. Highly recommended for offices!"',
    mini: "We've been managing commercial properties for 10 years, and AllFix SaniFix is the most..."
  },
  {
    initials: 'AR',
    name: 'Anna Reyes',
    role: 'IT Manager, Mandaluyong',
    highlight: 'TechFix – IT Support',
    highlightColor: '#e1d5fa',
    highlightText: '#6c3fcf',
    avatarBg: '#e1d5fa',
    avatarText: '#6c3fcf',
    text: '"TechFix set up our entire CCTV and network infrastructure in one day. The technician was knowledgeable and courteous. Will book again!"',
    mini: 'TechFix set up our entire CCTV and network infrastructure in one day. The technicia...'
  },
  {
    initials: 'MG',
    name: 'Mark Gonzales',
    role: 'Homeowner, Quezon City',
    highlight: 'HomeFix – Renovation',
    highlightColor: '#ffe082',
    highlightText: '#23406e',
    avatarBg: '#ffe082',
    avatarText: '#23406e',
    text: '"HomeFix transformed our bathroom in just 4 days. The tiling was perfect, no leaks, and the team cleaned up after. Excellent work!"',
    mini: 'HomeFix transformed our bathroom in just 4 days. The tiling was perfect, no leaks, and...'
  },
];
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';


const services = [
  {
    icon: SecurityIcon,
    brand: 'CoolFix',
    tagline: 'Air-con & HVAC Specialists',
    description: 'Cleaning, installation, repair, and preventive maintenance for all aircon brands and HVAC systems.',
    image: 'https://via.placeholder.com/350x200?text=CoolFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['AC Cleaning', 'Installation', 'Gas Recharge', 'Emergency Repair'],
  },
  {
    icon: SecurityIcon,
    brand: 'ElectroFix',
    tagline: 'Electrical & Lighting Experts',
    description: 'Safe and reliable electrical services including repairs, installations, and emergency electrical support.',
    image: 'https://via.placeholder.com/350x200?text=ElectroFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Wiring', 'Installation', 'Troubleshooting', 'Safety Inspection'],
  },
  {
    icon: SecurityIcon,
    brand: 'CleanFix',
    tagline: 'Deep Cleaning & Sanitization',
    description: 'Comprehensive cleaning solutions for homes and offices with eco-friendly products and professional techniques.',
    image: 'https://via.placeholder.com/350x200?text=CleanFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Deep Cleaning', 'Sanitization', 'Carpet Care', 'Regular Maintenance'],
  },
  {
    icon: SecurityIcon,
    brand: 'PlumbFix',
    tagline: 'Professional Plumbing Solutions',
    description: 'Expert plumbing services including repairs, installations, and maintenance for residential and commercial properties.',
    image: 'https://via.placeholder.com/350x200?text=PlumbFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Pipe Repair', 'Installation', 'Leak Detection', 'Drain Cleaning'],
  },
  {
    icon: SecurityIcon,
    brand: 'LaundryFix',
    tagline: 'Professional Laundry Services',
    description: 'Complete laundry and dry cleaning solutions with premium care for all fabric types and special garments.',
    image: 'https://via.placeholder.com/350x200?text=LaundryFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Dry Cleaning', 'Laundry Service', 'Stain Removal', 'Alterations'],
  },
  {
    icon: SecurityIcon,
    brand: 'CareFix',
    tagline: 'Home Care & Maintenance',
    description: 'Comprehensive home care services including renovations, maintenance, and handyman solutions for comfort.',
    image: 'https://via.placeholder.com/350x200?text=CareFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Repairs', 'Maintenance', 'Renovations', 'Inspections'],
  },
  {
    icon: SecurityIcon,
    brand: 'MoveFix',
    tagline: 'Professional Moving Solutions',
    description: 'Safe and reliable moving services with professional packing, transport, and setup for residential and office relocations.',
    image: 'https://via.placeholder.com/350x200?text=MoveFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Packing', 'Loading', 'Transport', 'Unpacking'],
  },
  {
    icon: SecurityIcon,
    brand: 'PetFix',
    tagline: 'Pet Care & Grooming',
    description: 'Professional pet grooming, boarding, and veterinary care services for your beloved pets with love and expertise.',
    image: 'https://via.placeholder.com/350x200?text=PetFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Grooming', 'Boarding', 'Bathing', 'Nail Trimming'],
  },
  {
    icon: DescriptionIcon,
    brand: 'TechFix',
    tagline: 'IT & Gadget Support',
    description: 'On-demand IT support for computers, WiFi, smart home devices, and gadget troubleshooting for home and office.',
    image: 'https://via.placeholder.com/350x200?text=TechFix',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['PC Setup', 'WiFi Help', 'Smart Home', 'Device Repair'],
  },
];

const ServiceCard = ({ service, onServiceClick }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e5e5e5',
        boxShadow: hovered ? '0 25px 50px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'pointer',
        backgroundColor: '#fff',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onServiceClick(service)}
    >
      {/* Image showcase */}
      <div style={{ position: 'relative', height: '150px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
        <img
          src={service.image}
          alt={service.brand}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 0.3 : 1,
            transition: 'opacity 0.5s ease',
          }}
        />
        {/* Color overlay on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: service.accent,
            opacity: hovered ? 0.6 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Logo pops in middle on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1)' : 'scale(0)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: service.accent,
              boxShadow: `0 0 30px ${service.accent}80, 0 0 60px ${service.accent}40, 0 12px 24px rgba(0,0,0,0.4)`,
            }}
          >
            <Icon style={{ width: '40px', height: '40px', color: '#fff' }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          position: 'relative',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${service.headerBg} 0%, ${service.headerBgLight} 100%)`,
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 900,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '6px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: '#fff',
          }}
        >
          {service.brand}
        </div>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backgroundColor: service.accent,
          }}
        >
          <Icon style={{ width: '24px', height: '24px', color: '#fff' }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontWeight: 900, fontSize: '1rem', color: '#000', marginBottom: '4px' }}>
          {service.brand}
        </h3>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: service.accent, marginBottom: '16px' }}>
          {service.tagline}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
          {service.description}
        </p>

        {/* Checklist */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginBottom: '24px' }}>
          {service.services.map((tag) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircleIcon style={{ width: '14px', height: '14px', color: service.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: service.pillText }}>
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: hovered ? service.accentDark : service.accent,
            transition: 'color 0.2s ease',
          }}
        >
          Book {service.brand}
          <ArrowForwardIcon style={{ width: '16px', height: '16px', transition: 'transform 0.2s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: service.accent,
          width: hovered ? '100%' : '0%',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};

const LandingPage = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const handlePrev = () => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () => setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
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
          py: 4,
          px: { xs: 2, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#eaf2fc',
                color: '#23406e',
                borderRadius: '999px',
                px: 4,
                py: 1.2,
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                boxShadow: 1,
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              OUR SERVICES
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

          {/* Services Grid - 3 columns on desktop, horizontal scroll on mobile */}
          <Box
            sx={{
              width: '100%',
              mt: 2,
              overflowX: { xs: 'auto', md: 'visible' },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                gap: 2,
                minWidth: 0,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                px: 1,
              }}
            >
              {services.map((service, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: '320px',
                    maxWidth: '90vw',
                    flex: '0 0 auto',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <ServiceCard
                    service={service}
                    onServiceClick={(svc) => console.log('Service clicked:', svc)}
                  />
                </Box>
              ))}
            </Box>
            <Grid container spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {services.map((service, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: '360px' }}>
                    <ServiceCard
                      service={service}
                      onServiceClick={(svc) => console.log('Service clicked:', svc)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
        {/* How It Works Section - Redesigned */}
        <Box
          id="how-it-works"
          sx={{
            position: 'relative',
            zIndex: 10,
            bgcolor: '#eef4fd',
            py: 8,
            px: { xs: 2, md: 5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  color: '#10355f',
                  borderRadius: '9999px',
                  px: 3,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  mb: 2,
                  boxShadow: '0 2px 8px rgba(16,53,95,0.07)',
                }}
              >
                Simple Process
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 900,
                  mb: 2,
                  lineHeight: 1.2,
                  color: 'black',
                }}
              >
                Fixed in <span style={{ color: '#10355f' }}>3 Easy Steps</span>
              </Typography>
              <Typography
                sx={{
                  color: '#42526e',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                We designed the booking process to be as frictionless as possible so you can get back to what matters.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: { xs: 6, md: 2 },
                position: 'relative',
                mb: 4,
              }}
            >
              {/* Connecting line for desktop */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  top: 56,
                  left: '12%',
                  width: '76%',
                  height: 0,
                  borderTop: '2px solid #c7d2fe',
                  zIndex: 1,
                }}
              />

              {/* Step 1 */}
              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      boxShadow: '0 2px 12px rgba(16,53,95,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 44,
                      color: '#10355f',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 44 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: -10,
                      bgcolor: '#10355f',
                      color: 'white',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      border: '3px solid #eef4fd',
                    }}
                  >
                    1
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', mb: 1, color: '#10355f' }}>
                  Choose a Service
                </Typography>
                <Typography sx={{ color: '#42526e', fontSize: '1rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>
                  Select the type of work you need from our 9 specialized brands. Browse by category or search directly.
                </Typography>
              </Box>

              {/* Step 2 */}
              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      boxShadow: '0 2px 12px rgba(16,53,95,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 44,
                      color: '#10355f',
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: 44 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: -10,
                      bgcolor: '#10355f',
                      color: 'white',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      border: '3px solid #eef4fd',
                    }}
                  >
                    2
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', mb: 1, color: '#10355f' }}>
                  Book a Service
                </Typography>
                <Typography sx={{ color: '#42526e', fontSize: '1rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>
                  Schedule your service instantly with just a few clicks. Fast, easy, and convenient.
                </Typography>
              </Box>

              {/* Step 3 */}
              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      boxShadow: '0 2px 12px rgba(16,53,95,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 44,
                      color: '#10355f',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 44 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: -10,
                      bgcolor: '#10355f',
                      color: 'white',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      border: '3px solid #eef4fd',
                    }}
                  >
                    3
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', mb: 1, color: '#10355f' }}>
                  Sit Back, It's Done
                </Typography>
                <Typography sx={{ color: '#42526e', fontSize: '1rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>
                  A background-checked AllFix pro arrives on schedule, completes the job, and you pay only when satisfied.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#10355f',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: '0 4px 16px rgba(16,53,95,0.10)',
                  '&:hover': {
                    bgcolor: '#0d264a',
                  },
                }}
                href="#services"
                endIcon={<ArrowForwardIcon />}
              >
                Start Booking Now
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Why AllFix Section - Fullscreen, white background to match Services section */}
        <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', bgcolor: '#fff', py: { xs: 8, md: 10 }, px: 0, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 6 } }}>
            <Box id="why-allfix">
              {/* Section Badge */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ bgcolor: '#eaf2fc', color: '#23406e', fontWeight: 700, fontSize: '1.1rem', px: 4, py: 1.2, borderRadius: '999px', letterSpacing: '0.08em', boxShadow: 1 }}>
                  WHY ALLFIX
                </Box>
              </Box>
              {/* Main Heading */}
              <Typography sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.4rem' }, textAlign: 'center', mb: 2, color: '#111', lineHeight: 1.1 }}>
                The Safest Choice for <span style={{ color: '#23406e' }}>Your Home & Office</span>
              </Typography>
              <Typography sx={{ color: '#42526e', textAlign: 'center', fontSize: { xs: '1rem', md: '1.08rem' }, mb: 6, maxWidth: '700px', mx: 'auto', lineHeight: 1.6, fontWeight: 500 }}>
                We set the standard for professional service delivery in the Philippines — built on trust, safety, and genuine expertise.
              </Typography>

              {/* Stats Row - Card style, compact */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', flex: 1, minWidth: 290, maxWidth: 1150, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 4px 14px rgba(16,53,95,0.10)', overflow: 'hidden', mx: 'auto' }}>
                  <Box sx={{ flex: 1, p: { xs: 1.8, md: 2.5 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.32rem', md: '1.8rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>50K+</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>JOBS COMPLETED</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.8, md: 2.5 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.32rem', md: '1.8rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>5,200+</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>VERIFIED PROS</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.8, md: 2.5 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.32rem', md: '1.8rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>4.9★</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>AVERAGE RATING</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.8, md: 2.5 }, textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.32rem', md: '1.8rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>98%</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>CLIENT SATISFACTION</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Features Grid - Only Verified & Background-Checked */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 2 }, justifyContent: 'center', maxWidth: 1200, mx: 'auto' }}>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">Verified & Background-Checked</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">Every professional undergoes NBI clearance, skills assessment, and identity verification before joining the AllFix network.</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">Insured for Your Protection</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">All AllFix jobs carry third-party liability insurance. If anything goes wrong, you're fully covered — no questions asked.</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">On-Time Guarantee</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">Our pros respect your schedule. If they're late by more than 15 minutes, you get a service discount — automatically.</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">Transparent, Fixed Pricing</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">No surprise charges. Receive a detailed quote upfront. You only pay what was agreed — with GCash, card, or cash options.</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">Satisfaction Warranty</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">Not happy with the work? We'll send another pro to fix it at no extra cost. Your satisfaction is our commitment.</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 1 340px', minWidth: 260, maxWidth: 400, minHeight: { xs: 110, md: 130 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 2, md: 2 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                  <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 26, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight={700} color="#23406e" fontSize="1rem">24/7 Customer Support</Typography>
                    <Typography color="#42526e" fontSize="0.93rem">Our Manila-based support team is available around the clock via chat, call, or email to resolve any concern instantly.</Typography>
                  </Box>
                </Box>
              </Box>
              {/* DICT & DTI Accredited Platform Banner */}
              <Box sx={{
                mt: 4,
                mb: 2,
                width: '100%',
                bgcolor: '#123865',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, md: 4 },
                py: { xs: 2.5, md: 3 },
                boxShadow: '0 2px 12px rgba(16,53,95,0.10)',
                gap: 2,
                minHeight: 110,
                maxHeight: 140,
              }}>
                {/* Left Icon - Star Badge */}
                <Box sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none" />
                    <path d="M12 16.5L8.5 18.5L9.25 14.5L6.5 12L10.25 11.5L12 8L13.75 11.5L17.5 12L14.75 14.5L15.5 18.5L12 16.5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  </svg>
                </Box>
                {/* Text Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '1rem', md: '1.18rem' }, mb: 0.2 }}>
                    DICT & DTI Accredited Platform
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.92rem', md: '1rem' }, fontWeight: 400, lineHeight: 1.3 }}>
                    AllFix.ph is officially registered with the Philippine Department of Trade & Industry and compliant with all local labor laws.
                  </Typography>
                </Box>
                {/* Button */}
                <Box sx={{ ml: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#123865',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      borderRadius: '18px',
                      px: 2.2,
                      py: 0.7,
                      boxShadow: 'none',
                      minWidth: 120,
                      '&:hover': {
                        bgcolor: '#eaf2fc',
                        color: '#123865',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    VIEW CREDENTIALS
                  </Button>
                </Box>
              </Box>
              {/* Testimonials Section */}
              <Box id="testimonials" sx={{
                position: 'relative',
                left: '50%',
                right: '50%',
                ml: '-50vw',
                mr: '-50vw',
                width: '100vw',
                bgcolor: '#10355f',
                py: { xs: 10, md: 14 },
                mt: { xs: 8, md: 10 },
                mb: { xs: 8, md: 10 },
                px: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '480px',
                overflow: 'hidden',
              }}>
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#23406e',
                      color: 'white',
                      borderRadius: '999px',
                      px: 3,
                      py: 1.2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      boxShadow: 1,
                      textTransform: 'uppercase',
                      mb: 2,
                    }}>
                      CLIENT STORIES
                    </Box>
                    <Typography sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 900,
                      color: 'white',
                      mb: 1,
                      lineHeight: 1.2,
                    }}>
                      Trusted by Thousands of Filipino Homeowners
                    </Typography>
                    <Typography sx={{
                      color: 'rgba(191, 219, 254, 1)',
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      maxWidth: '700px',
                      mx: 'auto',
                      lineHeight: 1.6,
                    }}>
                      Real reviews from verified clients across Metro Manila. We let our work do the talking.
                    </Typography>
                  </Box>

                  {/* Carousel-like testimonial card */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 5,
                  }}>
                    <Box sx={{
                      bgcolor: 'white',
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(16,53,95,0.18)',
                      p: { xs: 3, md: 5 },
                      width: { xs: '90vw', md: '800px' },
                      maxWidth: '800px',
                      minWidth: { xs: '90vw', md: '800px' },
                      minHeight: { xs: 260, md: 220 },
                      height: { xs: 'auto', md: '220px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      mb: 2,
                      position: 'relative',
                      transition: 'none',
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: testimonials[testimonialIdx].avatarBg,
                          color: testimonials[testimonialIdx].avatarText,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: '1.3rem',
                        }}>
                          {testimonials[testimonialIdx].initials}
                        </Box>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ fontWeight: 900, color: '#10355f', fontSize: '1.1rem', mb: 0 }}>
                            {testimonials[testimonialIdx].name}
                          </Typography>
                          <Typography sx={{ color: '#42526e', fontSize: '0.95rem', fontWeight: 400 }}>
                            {testimonials[testimonialIdx].role}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Box sx={{
                          bgcolor: testimonials[testimonialIdx].highlightColor,
                          color: testimonials[testimonialIdx].highlightText,
                          borderRadius: '999px',
                          px: 2,
                          py: 0.5,
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          ml: 2,
                        }}>
                          {testimonials[testimonialIdx].highlight}
                        </Box>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ position: 'absolute', top: 18, right: 24 }} xmlns="http://www.w3.org/2000/svg">
                          <text x="0" y="24" fontSize="32" fill="#eaf2fc">“</text>
                        </svg>
                      </Box>
                      <Typography sx={{ color: '#222', fontSize: '1.18rem', fontWeight: 500, mt: 2, mb: 1.5, lineHeight: 1.7 }}>
                        {testimonials[testimonialIdx].text}
                      </Typography>
                    </Box>

                    {/* Carousel dots and arrows */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Button onClick={handlePrev} sx={{ minWidth: 0, p: 1, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                      </Button>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {testimonials.map((_, idx) => (
                          <Box key={idx} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'white', opacity: testimonialIdx === idx ? 0.8 : 0.4 }} />
                        ))}
                      </Box>
                      <Button onClick={handleNext} sx={{ minWidth: 0, p: 1, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                      </Button>
                    </Box>
                  </Box>

                  {/* Mini testimonial cards row - 4 in a row, centered, compact, highlight active */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 4,
                    width: '100%',
                    maxWidth: '1200px',
                    mx: 'auto',
                  }}>
                    {testimonials.map((t, idx) => (
                      <Box key={t.initials}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.10)',
                          borderRadius: 3,
                          p: 2.2,
                          minWidth: 260,
                          maxWidth: 280,
                          color: 'white',
                          fontWeight: 700,
                          boxShadow: '0 2px 8px rgba(16,53,95,0.10)',
                          border: testimonialIdx === idx ? '2px solid #eaf2fc' : '2px solid transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          opacity: testimonialIdx === idx ? 1 : 0.7,
                          transition: 'border 0.2s, opacity 0.2s',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: t.avatarBg, color: t.avatarText, fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.initials}</Box>
                          <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{t.name}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.93rem', mt: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {t.mini}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Call to Action Section (below mini widgets) */}
                  <Box sx={{
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    ml: '-50vw',
                    mr: '-50vw',
                    width: '100vw',
                    bgcolor: 'white',
                    py: { xs: 2, md: 2.5 }, 
                    px: { xs: 2, md: 6 },
                    mt: { xs: 4, md: 5 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 16px rgba(16,53,95,0.05)',
                    borderRadius: 0,
                  }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#10355f', mb: 1 }}>
                        Ready to Fix Something?
                      </Typography>
                      <Typography sx={{ color: '#23406e', fontSize: { xs: '0.85rem', md: '0.95rem' }, mb: { xs: 3, md: 0 } }}>
                        Get a free quote in 30 minutes. Available across Metro Manila.
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 1, md: 0 } }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: '#10355f',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          px: 5,
                          py: 2,
                          borderRadius: '18px',
                          boxShadow: 'none',
                          '&:hover': { bgcolor: '#0d264a' },
                        }}
                      >
                        Book a Fix Now
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: '#123865',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          px: 3,
                          py: 1,
                          borderRadius: '18px',
                          boxShadow: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.2,
                          '&:hover': { bgcolor: '#23406e' },
                        }}
                        startIcon={
                          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.71 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.34 2.01.58 3.06.71A2 2 0 0 1 22 16.92z"/></svg>
                        }
                      >
                        Call Us
                        
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Box>
          </Box>
        </Box>
      {/* Removed excess white space below the call-to-action section */}
    </Box>
  );
};

export default LandingPage;