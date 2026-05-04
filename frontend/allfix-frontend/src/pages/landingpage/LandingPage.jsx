import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar, IconButton, TextField, MenuItem, CssBaseline } from '@mui/material';
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

// --- CORE ICONS ---
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import ShieldIcon from '@mui/icons-material/Shield';

// --- SPECIFIC SERVICE ICONS ---
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BuildIcon from '@mui/icons-material/Build';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SpaIcon from '@mui/icons-material/Spa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import MemoryIcon from '@mui/icons-material/Memory';

const services = [
  {
    icon: AirIcon,
    brand: 'CoolFix',
    tagline: 'Air-con & HVAC Specialists',
    description: 'Cleaning, installation, repair, and preventive maintenance for all aircon brands and HVAC systems.',
    image: '/images/coolfix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['AC Cleaning', 'Installation', 'Gas Recharge', 'Emergency Repair'],
  },
  {
    icon: WaterDropIcon,
    brand: 'SaniFix',
    tagline: 'Deep Cleaning & Sanitization',
    description: 'Professional deep cleaning and sanitization for homes, offices, and facilities. Disinfection, anti-bacterial, and eco-friendly solutions.',
    image: '/images/sanifix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Deep Cleaning', 'Sanitization', 'Disinfection', 'Odor Removal'],
  },
  {
    icon: BuildIcon,
    brand: 'HomeFix',
    tagline: 'Home Repairs & Renovation',
    description: 'Renovation, repairs, and handyman services for all areas of your home. Quality work for comfort and safety.',
    image: '/images/homefix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Renovation', 'Repairs', 'Handyman', 'Maintenance'],
  },
  {
    icon: Inventory2Icon,
    brand: 'MoveFix',
    tagline: 'Professional Moving Solutions',
    description: 'Safe and reliable moving services with professional packing, transport, and setup for residential and office relocations.',
    image: '/images/movefix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Packing', 'Loading', 'Transport', 'Unpacking'],
  },
  {
    icon: SpaIcon,
    brand: 'GreenFix',
    tagline: 'Eco & Sustainability',
    description: 'Eco-friendly solutions for reducing waste and promoting sustainable practices at home and business.',
    image: '/images/greenfix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Waste Audit', 'Recycling', 'Composting', 'Eco Consultation'],
  },
  {
    icon: FavoriteBorderIcon,
    brand: 'HealthFix',
    tagline: 'Health & Wellness Services',
    description: 'Home and office health services: air quality, water testing, pest control, and more for a safer environment.',
    image: '/images/healthfix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Air Quality', 'Water Testing', 'Pest Control', 'Wellness Checks'],
  },
  {
    icon: HomeOutlinedIcon,
    brand: 'SpaceFix',
    tagline: 'Space Planning & Interiors',
    description: 'Interior design, space planning, and organization for homes and offices. Make your space work for you.',
    image: '/images/spacefix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Interior Design', 'Space Planning', 'Organization', 'Furniture Setup'],
  },
  {
    icon: PetsIcon,
    brand: 'PetFix',
    tagline: 'Pet Care & Grooming',
    description: 'Professional pet grooming, boarding, and veterinary care services for your beloved pets with love and expertise.',
    image: '/images/petfix.jpg',
    accent: '#2E5BA8',
    accentDark: '#10355f',
    headerBg: '#10355f',
    headerBgLight: '#2E5BA8',
    pillText: '#2E5BA8',
    services: ['Grooming', 'Boarding', 'Bathing', 'Nail Trimming'],
  },
  {
    icon: MemoryIcon,
    brand: 'TechFix',
    tagline: 'IT & Gadget Support',
    description: 'On-demand IT support for computers, WiFi, smart home devices, and gadget troubleshooting for home and office.',
    image: '/images/techfix.jpg',
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onServiceClick(service)}
    >
      {/* Image showcase */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={service.image}
            alt={service.brand}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 10%',
              opacity: hovered ? 0.3 : 1,
              transition: 'opacity 0.5s ease',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: service.accent, opacity: hovered ? 0.6 : 0, transition: 'opacity 0.3s ease' }} />
          {hovered && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                pointerEvents: 'none',
                transition: 'opacity 0.3s, transform 0.3s',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: service.accent,
                  boxShadow: `0 0 20px ${service.accent}80, 0 0 40px ${service.accent}40, 0 8px 16px rgba(0,0,0,0.4)`,
                }}
              >
                <Icon style={{ width: '32px', height: '32px', color: '#fff' }} />
              </div>
            </div>
          )}
        </div>

      {/* Header */}
      <div
        style={{
          position: 'relative',
          padding: '32px 24px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${service.headerBg} 0%, ${service.headerBgLight} 100%)`, 
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
          {service.brand}
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative', zIndex: 2 }}>
          <Icon style={{ width: '22px', height: '22px', color: '#fff' }} />
        </div>
      </div>
      
      {/* Body */}
      <div style={{ padding: '12px 24px 20px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontWeight: 900, fontSize: '1.25rem', color: '#000', marginBottom: '2px' }}>{service.brand}</h3>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: service.accent, marginBottom: '12px' }}>{service.tagline}</p>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>{service.description}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginBottom: '16px' }}>
          {service.services.map((tag) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircleIcon style={{ width: '14px', height: '14px', color: service.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: service.pillText }}>{tag}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: hovered ? service.accentDark : service.accent, transition: 'color 0.2s ease', marginTop: 'auto' }}>
          About {service.brand}
          <ArrowForwardIcon style={{ width: '16px', height: '16px', transition: 'transform 0.2s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', backgroundColor: service.accent, width: hovered ? '100%' : '0%', transition: 'width 0.3s ease' }} />
    </div>
  );
};

// Map Topology Data
const mapCities = [
  { id: 'Valenzuela', points: '80,60 150,50 180,100 130,130 90,110', lx: 125, ly: 85 },
  { id: 'Caloocan', points: '150,50 240,30 280,80 250,130 180,100', lx: 220, ly: 75 },
  { id: 'Navotas', points: '60,90 90,110 80,150 100,190 70,220 40,160', lx: 55, ly: 155 },
  { id: 'Malabon', points: '90,110 130,130 120,160 100,190 80,150', lx: 105, ly: 145 },
  { id: 'Caloocan', points: '130,130 180,100 200,140 170,180 120,160', lx: 160, ly: 145 },
  { id: 'Quezon City', points: '180,100 250,130 280,80 360,110 370,180 330,280 250,310 240,270 240,240 210,240 180,180 200,140', lx: 260, ly: 190 },
  { id: 'Marikina', points: '360,110 420,120 390,200 350,190 370,180', lx: 380, ly: 155 },
  { id: 'Manila', points: '100,190 120,160 170,180 180,180 210,240 190,270 190,310 150,330 130,320 70,220', lx: 135, ly: 245 },
  { id: 'San Juan', points: '210,240 240,240 240,270 190,270', lx: 215, ly: 255 },
  { id: 'Mandaluyong', points: '190,270 240,270 250,310 190,310', lx: 220, ly: 290 },
  { id: 'Pasig', points: '240,240 330,280 350,260 340,340 290,330 270,330 250,310 240,270', lx: 300, ly: 300 },
  { id: 'Makati', points: '150,330 190,310 250,310 270,330 260,350 260,360 210,390 140,370', lx: 200, ly: 340 },
  { id: 'Pasay', points: '60,300 130,320 150,330 140,370 120,410 50,390', lx: 95, ly: 355 },
  { id: 'Taguig', points: '270,330 340,340 320,430 240,460 210,390 260,360', lx: 275, ly: 390 },
  { id: 'Parañaque', points: '120,410 140,370 210,390 240,460 220,510 110,480', lx: 175, ly: 440 },
  { id: 'Las Piñas', points: '110,480 220,510 180,570 80,540', lx: 145, ly: 520 },
  { id: 'Muntinlupa', points: '180,570 220,510 240,460 260,480 250,560 210,680 150,650', lx: 205, ly: 590 },
];

const LandingPage = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const handlePrev = () => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () => setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why AllFix', href: '#why-allfix' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Become Our Partner', href: '/vendor-apply' },
  ];

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/')) {
      window.scrollTo(0, 0);
      window.location.pathname = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

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

  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
        
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1100,
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 5 }, minHeight: '64px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: { xs: 0, md: 8, lg: 16 }, flex: { xs: '1 1 auto', md: 'none' } }}>
              <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix.ph Logo" sx={{ width: { xs: 35, md: 45 }, height: { xs: 35, md: 45 }, objectFit: 'contain' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" fontWeight="bold" color={isScrolled ? '#10355f' : 'white'} sx={{ lineHeight: 1, mb: 0.3, transition: 'color 0.3s ease', fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                  AllFix.ph
                </Typography>
                <Typography variant="overline" color={isScrolled ? '#10355f' : 'white'} sx={{ lineHeight: 1, fontSize: '0.6rem', letterSpacing: 0.5, transition: 'color 0.3s ease' }}>
                  PROPERTY CARE EXPERTS
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: { lg: 4, md: 2 } }}>
              {navLinks.map((link) => (
                <Button key={link.label} onClick={() => handleNavClick(link.href)} sx={{ px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 600, textTransform: 'none', color: isScrolled ? '#10355f' : 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255,255,255,0.1)', color: isScrolled ? '#10355f' : 'white' } }}>
                  {link.label}
                </Button>
              ))}
            </Box>

            <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { xs: 'flex', md: 'none' }, color: isScrolled ? '#10355f' : 'white' }}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>

          {mobileOpen && (
            <Box sx={{ bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(16, 53, 95, 0.5)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.2)', display: { xs: 'block', md: 'none' } }}>
              <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {navLinks.map((link) => (
                  <Button key={link.label} onClick={() => handleNavClick(link.href)} fullWidth sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, borderRadius: 1, fontSize: '0.875rem', fontWeight: 500, textTransform: 'none', color: isScrolled ? '#10355f' : 'white', '&:hover': { backgroundColor: isScrolled ? 'rgba(16, 53, 95, 0.1)' : 'rgba(255,255,255,0.2)' } }}>
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </AppBar>

        {/* HERO SECTION */}
        <Box sx={{ position: 'relative', pt: { xs: 10, md: 16 }, pb: { xs: 6, md: 10 }, minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)' }}>
          <Box sx={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none', zIndex: 0 }} />
          <Box sx={{ position: 'absolute', top: 80, left: 40, width: 288, height: 288, background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(96px)', opacity: 0.4, pointerEvents: 'none', zIndex: 0 }} />
          <Box sx={{ position: 'absolute', bottom: 80, right: 40, width: 288, height: 288, background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(96px)', opacity: 0.4, pointerEvents: 'none', zIndex: 0 }} />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Grid item xs={12} md={6} lg={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '9999px', px: 3, py: 1.2, mb: 0.5, backdropFilter: 'blur(10px)', width: 'fit-content' }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: '#4ade80', borderRadius: '50%' }} />
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'white' }}>
                    Manila's #1 Home Services Platform
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '3.8rem', lg: '4.5rem' }, fontWeight: 900, color: 'white', mb: 1, lineHeight: 1.1 }}>
                  Hassle-Free <br /> Property Care, <br /> Done Right.
                </Typography>
                <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'rgba(191, 219, 254, 1)', mb: 4, lineHeight: 1.6, maxWidth: { xs: '90%', md: '580px' } }}>
                  From aircon cleaning to plumbing, repairs to IT support — AllFix connects you with trusted, verified professionals across Metro Manila.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: 3, md: 5 }, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ width: 28, height: 28, color: '#4ade80', flexShrink: 0 }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.25rem' }}>5,000+</Typography>
                      <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.95rem' }}>Verified Pros</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StarIcon sx={{ width: 28, height: 28, color: '#facc15', flexShrink: 0, fill: '#facc15' }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.25rem' }}>4.9★</Typography>
                      <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.95rem' }}>Average Rating</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ShieldIcon style={{ width: 28, height: 28, color: '#60a5fa', flexShrink: 0 }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.25rem' }}>Insured &</Typography>
                      <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: '0.95rem' }}>Accredited</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Box sx={{ bgcolor: 'white', borderRadius: '16px', p: { xs: 2.5, md: 3 }, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)', width: '100%', maxWidth: { xs: '98vw', sm: '480px', md: '480px' }, mx: { xs: 'auto', md: 0 }, ml: { md: 'auto' }, mt: { xs: 2, md: -4 } }}>
                  <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.25rem' }, fontWeight: 900, color: '#10355f', mb: 0.5, lineHeight: 1.2, textAlign: 'center' }}>
                    Create Your Account
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#666', mb: 2, lineHeight: 1.3, textAlign: 'center' }}>
                    Fill in the details below to create your AllFix account.
                  </Typography>
                  
                  {/* Firstname and Lastname */}
                  <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>Firstname <span style={{ color: '#e74c3c' }}>*</span></Typography>
                      <TextField size="small" fullWidth placeholder="Enter your first name" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#ddd' }, '&:hover fieldset': { borderColor: '#bbb' } } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>Lastname <span style={{ color: '#e74c3c' }}>*</span></Typography>
                      <TextField size="small" fullWidth placeholder="Enter your last name" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#ddd' }, '&:hover fieldset': { borderColor: '#bbb' } } }} />
                    </Grid>
                  </Grid>
                  
                  {/* Email */}
                  <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>Email address</Typography>
                    <TextField size="small" fullWidth placeholder="name@example.com" InputProps={{ startAdornment: <Typography sx={{ mr: 1, color: '#999', fontSize: '1rem' }}>✉</Typography> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#ddd' }, '&:hover fieldset': { borderColor: '#bbb' } } }} />
                  </Box>
                  
                  {/* City and Birthdate (Fixed Alignment) */}
                  <Grid container spacing={1.5} sx={{ mb: 2 }}>
                    <Grid item xs={6} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>City <span style={{ color: '#e74c3c' }}>*</span></Typography>
                      <TextField size="small" select fullWidth defaultValue="default" SelectProps={{ displayEmpty: true }} sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%' }, '& .MuiOutlinedInput-root': { width: '100%', borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#ddd' }, '&:hover fieldset': { borderColor: '#bbb' } } }}>
                        <MenuItem value="default" disabled>Select city</MenuItem>
                        <MenuItem value="manila">Manila</MenuItem>
                        <MenuItem value="makati">Makati</MenuItem>
                        <MenuItem value="bgc">BGC</MenuItem>
                        <MenuItem value="quezon">Quezon City</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#10355f', mb: 0.5 }}>Birthdate <span style={{ color: '#e74c3c' }}>*</span></Typography>
                      <TextField size="small" fullWidth type="date" InputLabelProps={{ shrink: true }} sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%' }, '& .MuiOutlinedInput-root': { width: '100%', borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#ddd' }, '&:hover fieldset': { borderColor: '#bbb' } } }} />
                    </Grid>
                  </Grid>
                  
                  {/* Buttons */}
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#10355f', color: 'white', fontWeight: 900, fontSize: '0.9rem', py: 1, borderRadius: '50px', textTransform: 'none', mb: 1.5, mt: 1, boxShadow: '0 2px 8px rgba(16,53,95,0.10)', '&:hover': { bgcolor: '#0d264a' } }}>
                    Create Account
                  </Button>
                  <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.85rem', color: '#10355f', mb: 1, fontWeight: 700 }}>Already have an account?</Typography>
                    <Button variant="contained" fullWidth sx={{ bgcolor: '#fff', color: '#10355f', border: '2px solid #10355f', borderRadius: '50px', fontWeight: 900, fontSize: '0.9rem', py: 0.8, mt: 0.5, mb: 0.5, boxShadow: '0 2px 8px rgba(16,53,95,0.10)', textTransform: 'none', '&:hover': { bgcolor: '#10355f', color: '#fff', borderColor: '#0d264a' } }} href="/login">
                      Login
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box id="services" sx={{ position: 'relative', zIndex: 10, bgcolor: '#ffffff', py: 4, px: { xs: 2, md: 5 }, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#eaf2fc', color: '#23406e', borderRadius: '999px', px: 3, py: 1, fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', boxShadow: 1, textTransform: 'uppercase', mb: 2 }}>OUR SERVICES</Box>
              <Typography sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 900, mb: 2, lineHeight: 1.2 }}>
                Nine Expert Brands, <span style={{ color: '#10355f' }}>One Trusted Platform</span>
              </Typography>
              <Typography sx={{ color: '#666', fontSize: { xs: '0.85rem', md: '0.9rem' }, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
                Each AllFix brand specializes in a distinct service area, staffed by trained, background-checked professionals with industry certifications.
              </Typography>
            </Box>

            <Box sx={{ width: '100%', mt: 2, overflowX: { xs: 'auto', md: 'visible' }, pb: { xs: 2, md: 0 } }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Button aria-label="Scroll left" sx={{ minWidth: 0, px: 1, py: 3, borderRadius: '50%', bgcolor: '#f5f7fa', color: '#10355f', mr: 1, boxShadow: 1, '&:hover': { bgcolor: '#eaf2fc' } }} onClick={() => { document.getElementById('services-scroll-row')?.scrollBy({ left: -340, behavior: 'smooth' }); }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                  </Button>
                  <Box id="services-scroll-row" sx={{ display: 'flex', gap: 2, minWidth: 0, overflowX: 'auto', scrollSnapType: 'x mandatory', px: 1, flex: 1, scrollBehavior: 'smooth', '&::-webkit-scrollbar': { display: 'none' } }}>
                    {services.map((service, index) => (
                      <Box key={index} sx={{ minWidth: '340px', maxWidth: '90vw', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                        <ServiceCard service={service} onServiceClick={(svc) => console.log('Service clicked:', svc)} />
                      </Box>
                    ))}
                  </Box>
                  <Button aria-label="Scroll right" sx={{ minWidth: 0, px: 1, py: 3, borderRadius: '50%', bgcolor: '#f5f7fa', color: '#10355f', ml: 1, boxShadow: 1, '&:hover': { bgcolor: '#eaf2fc' } }} onClick={() => { document.getElementById('services-scroll-row')?.scrollBy({ left: 340, behavior: 'smooth' }); }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                  </Button>
                </Box>
                <Box id="services-scroll-navbar" sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, width: '100%', mt: 1, mb: 1, px: 1 }}>
                  {services.map((svc, idx) => (
                    <Button key={svc.brand} size="small" sx={{ minWidth: 0, px: 0.5, py: 0.8, fontSize: '0.75rem', fontWeight: 700, borderRadius: '10px', color: '#23406e', bgcolor: '#eaf2fc', whiteSpace: 'nowrap', boxShadow: 'none', border: '1.5px solid transparent', transition: 'all 0.2s', '&.active': { bgcolor: '#23406e', color: '#fff', borderColor: '#23406e' }, '&:hover': { bgcolor: '#dbeafe', color: '#23406e' } }} onClick={() => document.getElementById('services-scroll-row')?.scrollTo({ left: idx * 340, behavior: 'smooth' })}>
                      {svc.brand}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Grid container spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mt: { md: 2 } }}>
                {services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '420px', display: 'flex' }}>
                      <ServiceCard service={service} onServiceClick={(svc) => console.log('Service clicked:', svc)} />
                    </Box>
                  </Grid>
                ))}
              </Grid>

            </Box>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box id="how-it-works" sx={{ position: 'relative', zIndex: 10, bgcolor: '#eef4fd', py: { xs: 6, md: 16 }, px: { xs: 2, md: 10 }, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'white', color: '#10355f', borderRadius: '9999px', px: 3, py: 1, fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', mb: 2, boxShadow: '0 2px 8px rgba(16,53,95,0.07)' }}>Simple Process</Box>
              <Typography sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 900, mb: 2, lineHeight: 1.2, color: 'black' }}>Fixed in <span style={{ color: '#10355f' }}>3 Easy Steps</span></Typography>
              <Typography sx={{ color: '#42526e', fontSize: { xs: '0.85rem', md: '0.9rem' }, maxWidth: '600px', mx: 'auto', lineHeight: 1.6, mb: 4 }}>We designed the booking process to be as frictionless as possible so you can get back to what matters.</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'center', gap: { xs: 6, md: 2 }, position: 'relative', mb: 4 }}>
              <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 40, left: '12%', width: '76%', height: 0, borderTop: '2px solid #c7d2fe', zIndex: 1 }} />
              
              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: 'white', boxShadow: '0 2px 12px rgba(16,53,95,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#10355f' }}><CheckCircleIcon sx={{ fontSize: 32 }} /></Box>
                  <Box sx={{ position: 'absolute', top: 0, right: -10, bgcolor: '#10355f', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', border: '3px solid #eef4fd' }}>1</Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', mb: 1, color: '#10355f' }}>Choose a Service</Typography>
                <Typography sx={{ color: '#42526e', fontSize: '0.85rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>Select the type of work you need from our 9 specialized brands. Browse by category or search directly.</Typography>
              </Box>

              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: 'white', boxShadow: '0 2px 12px rgba(16,53,95,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#10355f' }}><DescriptionIcon sx={{ fontSize: 32 }} /></Box>
                  <Box sx={{ position: 'absolute', top: 0, right: -10, bgcolor: '#10355f', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', border: '3px solid #eef4fd' }}>2</Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', mb: 1, color: '#10355f' }}>Book a Service</Typography>
                <Typography sx={{ color: '#42526e', fontSize: '0.85rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>Schedule your service instantly with just a few clicks. Fast, easy, and convenient.</Typography>
              </Box>

              <Box sx={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: 'white', boxShadow: '0 2px 12px rgba(16,53,95,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#10355f' }}><CheckCircleIcon sx={{ fontSize: 32 }} /></Box>
                  <Box sx={{ position: 'absolute', top: 0, right: -10, bgcolor: '#10355f', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', border: '3px solid #eef4fd' }}>3</Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', mb: 1, color: '#10355f' }}>Sit Back, It's Done</Typography>
                <Typography sx={{ color: '#42526e', fontSize: '0.85rem', mb: 0, textAlign: 'center', maxWidth: 280 }}>A background-checked AllFix pro arrives on schedule, completes the job, and you pay only when satisfied.</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" sx={{ bgcolor: '#10355f', color: 'white', fontWeight: 900, fontSize: '0.95rem', px: 3, py: 1, borderRadius: '12px', textTransform: 'none', boxShadow: '0 4px 16px rgba(16,53,95,0.10)', '&:hover': { bgcolor: '#0d264a' } }} href="#services" endIcon={<ArrowForwardIcon />}>
                Start Booking Now
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Why AllFix */}
        <Box id="why-allfix" sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', bgcolor: '#fff', pt: { xs: 6, md: 8 }, pb: 0, px: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 6 } }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ bgcolor: '#eaf2fc', color: '#23406e', fontWeight: 700, fontSize: '0.9rem', px: 3, py: 1, borderRadius: '999px', letterSpacing: '0.08em', boxShadow: 1 }}>WHY ALLFIX</Box>
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, textAlign: 'center', mb: 2, color: '#111', lineHeight: 1.1 }}>
                The Safest Choice for <span style={{ color: '#23406e' }}>Your Home & Office</span>
              </Typography>
              <Typography sx={{ color: '#42526e', textAlign: 'center', fontSize: { xs: '0.85rem', md: '0.9rem' }, mb: 5, maxWidth: '600px', mx: 'auto', lineHeight: 1.6, fontWeight: 500 }}>
                We set the standard for professional service delivery in the Philippines — built on trust, safety, and genuine expertise.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', flex: 1, minWidth: 290, maxWidth: 1000, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 4px 14px rgba(16,53,95,0.10)', overflow: 'hidden', mx: 'auto' }}>
                  <Box sx={{ flex: 1, p: { xs: 1.5, md: 2 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>50K+</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>JOBS COMPLETED</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.5, md: 2 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>5,200+</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>VERIFIED PROS</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.5, md: 2 }, textAlign: 'center', borderRight: { xs: 'none', md: '1px solid #e5eaf2' } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>4.9★</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>AVERAGE RATING</Typography>
                  </Box>
                  <Box sx={{ flex: 1, p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#23406e', mb: 0.4, letterSpacing: '-0.03em' }}>98%</Typography>
                    <Typography sx={{ color: '#42526e', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>CLIENT SATISFACTION</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 2 }, justifyContent: 'center', maxWidth: 1000, mx: 'auto' }}>
                {[
                  { t: 'Verified & Background-Checked', d: 'Every professional undergoes NBI clearance, skills assessment, and identity verification before joining the AllFix network.' },
                  { t: 'Insured for Your Protection', d: 'All AllFix jobs carry third-party liability insurance. If anything goes wrong, you\'re fully covered — no questions asked.' },
                  { t: 'On-Time Guarantee', d: 'Our pros respect your schedule. If they\'re late by more than 15 minutes, you get a service discount — automatically.' },
                  { t: 'Transparent, Fixed Pricing', d: 'No surprise charges. Receive a detailed quote upfront. You only pay what was agreed — with GCash, card, or cash options.' },
                  { t: 'Satisfaction Warranty', d: 'Not happy with the work? We\'ll send another pro to fix it at no extra cost. Your satisfaction is our commitment.' },
                  { t: '24/7 Customer Support', d: 'Our Manila-based support team is available around the clock via chat, call, or email to resolve any concern instantly.' }
                ].map((item, idx) => (
                  <Box key={idx} sx={{ flex: '1 1 280px', minWidth: 260, maxWidth: 320, minHeight: { xs: 100, md: 110 }, bgcolor: '#fff', borderRadius: 2, p: 2, mb: { xs: 1.5, md: 1.5 }, boxShadow: '0 1px 6px rgba(16,53,95,0.07)', display: 'flex', gap: 1.5, alignItems: 'flex-start', border: '1px solid #e5eaf2' }}>
                    <CheckCircleIcon sx={{ color: '#b6d2f7', fontSize: 22, mt: 0.2 }} />
                    <Box>
                      <Typography fontWeight={700} color="#23406e" fontSize="0.9rem">{item.t}</Typography>
                      <Typography color="#42526e" fontSize="0.8rem">{item.d}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, mb: { xs: 6, md: 8 }, width: '100%', bgcolor: '#123865', borderRadius: '20px', display: 'flex', alignItems: 'center', px: { xs: 2, md: 4 }, py: { xs: 2, md: 2.5 }, boxShadow: '0 2px 12px rgba(16,53,95,0.10)', gap: 2, minHeight: 90, maxHeight: 120 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none" />
                    <path d="M12 16.5L8.5 18.5L9.25 14.5L6.5 12L10.25 11.5L12 8L13.75 11.5L17.5 12L14.75 14.5L15.5 18.5L12 16.5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  </svg>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '0.9rem', md: '1rem' }, mb: 0.2 }}>DICT & DTI Accredited Platform</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.8rem', md: '0.85rem' }, fontWeight: 400, lineHeight: 1.3 }}>AllFix.ph is officially registered with the Philippine Department of Trade & Industry and compliant with all local labor laws.</Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Button variant="contained" sx={{ bgcolor: 'white', color: '#123865', fontWeight: 700, fontSize: '0.8rem', borderRadius: '14px', px: 2, py: 0.6, boxShadow: 'none', minWidth: 100, '&:hover': { bgcolor: '#eaf2fc', color: '#123865', boxShadow: 'none' } }}>VIEW CREDENTIALS</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* CUSTOM METRO MANILA TOPOLOGY MAP SECTION (All-Blue & White Theme) */}
        <Box 
          id="service-area" 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            bgcolor: '#f0f4f8', 
            py: { xs: 8, md: 10 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography variant="h2" fontWeight="900" color="#10355f" mb={1} sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
              Available in Metro Manila!
            </Typography>
            <Typography color="#666" sx={{ fontSize: '1.1rem', mb: 2 }}>
              Enjoy fast, reliable home services with AllFix wherever you are in the Metro.
            </Typography>

            {/* Custom Map Container */}
            <Box 
              sx={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: { xs: '100%', sm: '550px', md: '650px' }, 
                mx: 'auto', 
                mt: 4,
                aspectRatio: '5/7', 
              }}
            >
              {/* Layer 1: SVG Polygons Base - Unified Blue Map */}
              <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <svg viewBox="0 0 500 700" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 10px 20px rgba(16, 53, 95, 0.15))' }}>
                  {mapCities.map((city, idx) => (
                    <polygon 
                      key={idx}
                      points={city.points} 
                      fill="#10355f" // The unified primary blue brand color
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      strokeLinejoin="round" 
                      style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.fill = '#10355f'; // Darkens to navy on hover
                        e.currentTarget.style.transform = 'scale(1.01)';
                        e.currentTarget.style.transformOrigin = `${city.lx}px ${city.ly}px`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.fill = '#10355f';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  ))}
                </svg>
              </Box>

              {/* Layer 2: Interactive HTML Location Pins (Clean White Style) */}
              <Box sx={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                {mapCities.map((loc, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      position: 'absolute', 
                      top: `${(loc.ly / 700) * 100}%`, 
                      left: `${(loc.lx / 500) * 100}%`, 
                      transform: 'translate(-50%, -50%)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translate(-50%, -55%) scale(1.1)', zIndex: 10 }
                    }}
                  >
                    {/* Outer Transparent White Glow Ring */}
                    <Box sx={{ width: { xs: 44, md: 54 }, height: { xs: 44, md: 54 }, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {/* Inner Solid White Circle + Blue Icon */}
                      <Box sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, borderRadius: '50%', bgcolor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10355f', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
                        <LocationOnIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                      </Box>
                    </Box>
                    
                    {/* Clean White Text Pill underneath the Pin */}
                    <Typography 
                      fontWeight="900" 
                      color="#10355f" 
                      sx={{ 
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        mt: 0.5,
                        bgcolor: '#ffffff',
                        px: 1.2,
                        py: 0.3,
                        borderRadius: '999px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {loc.id}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#e2e8f0', color: '#1e293b', px: 2.5, py: 0.8, borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, mt: 6 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#10b981', borderRadius: '50%' }} />
              More areas coming soon!
            </Box>
          </Container>
        </Box>

        {/* Testimonials */}
        <Box id="testimonials" sx={{ position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', width: '100vw', bgcolor: '#0d264a', pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 10 }, mt: 0, mb: 0, px: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#23406e', color: 'white', borderRadius: '999px', px: 2.5, py: 0.8, fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', boxShadow: 1, textTransform: 'uppercase', mb: 1.5 }}>CLIENT STORIES</Box>
              <Typography sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 900, color: 'white', mb: 1, lineHeight: 1.2 }}>Trusted by Thousands of Filipino Homeowners</Typography>
              <Typography sx={{ color: 'rgba(191, 219, 254, 1)', fontSize: { xs: '0.85rem', md: '0.9rem' }, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>Real reviews from verified clients across Metro Manila. We let our work do the talking.</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <Box sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: '0 8px 32px rgba(16,53,95,0.18)', p: { xs: 2.5, md: 4 }, width: { xs: '90vw', md: '700px' }, maxWidth: '700px', minWidth: { xs: '90vw', md: '700px' }, minHeight: { xs: 240, md: 180 }, height: { xs: 'auto', md: '180px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1.5, position: 'relative', transition: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: testimonials[testimonialIdx].avatarBg, color: testimonials[testimonialIdx].avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>{testimonials[testimonialIdx].initials}</Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontWeight: 900, color: '#10355f', fontSize: '1rem', mb: 0 }}>{testimonials[testimonialIdx].name}</Typography>
                    <Typography sx={{ color: '#42526e', fontSize: '0.85rem', fontWeight: 400 }}>{testimonials[testimonialIdx].role}</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }} />
                  <Box sx={{ bgcolor: testimonials[testimonialIdx].highlightColor, color: testimonials[testimonialIdx].highlightText, borderRadius: '999px', px: 1.5, py: 0.4, fontWeight: 700, fontSize: '0.85rem', ml: 1.5 }}>{testimonials[testimonialIdx].highlight}</Box>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" style={{ position: 'absolute', top: 16, right: 20 }} xmlns="http://www.w3.org/2000/svg"><text x="0" y="24" fontSize="32" fill="#eaf2fc">“</text></svg>
                </Box>
                <Typography sx={{ color: '#222', fontSize: '1rem', fontWeight: 500, mt: 1.5, mb: 1, lineHeight: 1.6 }}>{testimonials[testimonialIdx].text}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                <Button onClick={handlePrev} sx={{ minWidth: 0, p: 0.8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></Button>
                <Box sx={{ display: 'flex', gap: 0.8 }}>{testimonials.map((_, idx) => (<Box key={idx} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'white', opacity: testimonialIdx === idx ? 0.8 : 0.4 }} />))}</Box>
                <Button onClick={handleNext} sx={{ minWidth: 0, p: 0.8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center', mt: 3, width: '100%', maxWidth: '1000px', mx: 'auto' }}>
              {testimonials.map((t, idx) => (
                <Box key={t.initials} sx={{ bgcolor: 'rgba(255,255,255,0.10)', borderRadius: 2, p: 1.5, minWidth: 200, maxWidth: 240, color: 'white', fontWeight: 700, boxShadow: '0 2px 8px rgba(16,53,95,0.10)', border: testimonialIdx === idx ? '2px solid #eaf2fc' : '2px solid transparent', display: 'flex', flexDirection: 'column', gap: 0.8, opacity: testimonialIdx === idx ? 1 : 0.7, transition: 'border 0.2s, opacity 0.2s' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: t.avatarBg, color: t.avatarText, fontWeight: 900, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.initials}</Box>
                    <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>{t.name}</Typography>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', mt: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.mini}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

       {/* NEW CONTACT SECTION */}
        <Box id="contact-us" sx={{ position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', width: '100vw', bgcolor: '#f8fafc', py: { xs: 8, md: 0 }, minHeight: { md: '100vh' }, display: 'flex', alignItems: 'center', borderTop: '1px solid #e2e8f0', overflow: 'hidden' }}>
          
          {/* Subtle Decorative Background */}
          <Box sx={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'linear-gradient(135deg, rgba(46,91,168,0.04) 0%, rgba(16,53,95,0.06) 100%)', borderBottomLeftRadius: '100%', zIndex: 0 }} />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            
            {/* 
              By using standard Flexbox here instead of Grid, we FORCE it to stay side-by-side 
              on desktop (md: 'row') and prevent it from ever dropping below the text.
            */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: { xs: 6, md: 4, lg: 8 }, width: '100%' }}>
              
              {/* Left Side: Text & Info (Locked to 45% width on desktop) */}
              <Box sx={{ width: { xs: '100%', md: '45%' } }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#eaf2fc', color: '#23406e', borderRadius: '8px', px: 1.5, py: 0.5, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
                  Reach Out
                </Box>
                
                <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem', lg: '3.2rem' }, fontWeight: 900, color: '#10355f', mb: 2, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  Let's get in <br/><span style={{ color: '#2e5ba8' }}>touch.</span>
                </Typography>
                
                <Typography sx={{ color: '#64748b', fontSize: '0.9rem', mb: 4, lineHeight: 1.6 }}>
                  Whether you need help booking a pro, have questions about our services, or want to partner with AllFix, our team is ready to assist you.
                </Typography>
                
                {/* Contact Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* Email Card */}
                  <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 12px rgba(16,53,95,0.04)', border: '1px solid #e2e8f0', width: '100%', maxWidth: '340px' }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#eaf2fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2e5ba8', flexShrink: 0 }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </Box>
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>EMAIL US</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#10355f', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>inquiry@allfix.ph</Typography>
                    </Box>
                  </Box>

                  {/* Phone Card */}
                  <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 12px rgba(16,53,95,0.04)', border: '1px solid #e2e8f0', width: '100%', maxWidth: '340px' }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#eaf2fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2e5ba8', flexShrink: 0 }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>CALL US</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#10355f' }}>+63 920 9631 217</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right Side: Form Card (Locked to 50% width on desktop) */}
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <Box sx={{ bgcolor: '#ffffff', borderRadius: '20px', p: { xs: 3, md: 4 }, boxShadow: '0 20px 40px rgba(16,53,95,0.08)', border: '1px solid #eaf2fc' }}>
                  <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, fontWeight: 900, color: '#10355f', mb: 0.5, letterSpacing: '-0.01em' }}>
                    Send a direct message
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b', mb: 3 }}>
                    Fill out the form below and our support team will respond shortly.
                  </Typography>

                  <Grid container spacing={2.5}>
                    
                    {/* Full Name (Left Half) */}
                    <Grid item xs={12} sm={6} sx={{ width: '48%' }}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.8 }}>Full Name</Typography>
                      <TextField size="small" fullWidth placeholder="e.g. Juan Dela Cruz" sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%' }, '& .MuiOutlinedInput-root': { width: '100%', bgcolor: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: '#cbd5e1' }, '&.Mui-focused fieldset': { borderColor: '#2e5ba8', borderWidth: '2px' } } }} />
                    </Grid>
                    
                    {/* Email Address (Right Half) */}
                    <Grid item xs={12} sm={6} sx={{ width: '48%' }}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.8 }}>Email Address</Typography>
                      <TextField size="small" fullWidth placeholder="juan@email.com" sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%' }, '& .MuiOutlinedInput-root': { width: '100%', bgcolor: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: '#cbd5e1' }, '&.Mui-focused fieldset': { borderColor: '#2e5ba8', borderWidth: '2px' } } }} />
                    </Grid>
                    
      
                    {/* ROW 2: Message Box (Full Width) */}
                  <Grid item xs={12} sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.8 }}>
                      How can we help?
                    </Typography>
                    <TextField 
                      fullWidth 
                      multiline 
                      rows={4} 
                      placeholder="Tell us about your concern..." 
                      sx={{ 
                        width: '100%', /* <-- FORCES outer wrapper to 100% */
                        '& .MuiFormControl-root': { width: '100%' }, /* <-- FORCES inner control to 100% */
                        '& .MuiOutlinedInput-root': { 
                          width: '100%', /* <-- FORCES the actual visible box to 100% */
                          bgcolor: '#f8fafc', 
                          borderRadius: '8px', 
                          fontSize: '0.85rem', 
                          '& fieldset': { borderColor: '#e2e8f0' }, 
                          '&:hover fieldset': { borderColor: '#cbd5e1' }, 
                          '&.Mui-focused fieldset': { borderColor: '#2e5ba8', borderWidth: '2px' } 
                        } 
                      }} 
                    />
                  </Grid>

                  </Grid>

                  <Button fullWidth variant="contained" endIcon={<ArrowForwardIcon sx={{ ml: 0.5, fontSize: '1.1rem' }} />} sx={{ mt: 3.5, py: 1.2, bgcolor: '#10355f', color: 'white', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', textTransform: 'none', boxShadow: '0 4px 12px rgba(16,53,95,0.2)', transition: 'all 0.2s ease', '&:hover': { bgcolor: '#0d264a', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(16,53,95,0.3)' } }}>
                    Submit Message
                  </Button>
                </Box>
              </Box>

            </Box>
          </Container>
        </Box>


        {/* CUSTOM FOOTER */}
        <Box component="footer" sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', bgcolor: '#0a1e3f', pt: { xs: 8, md: 10 }, pb: { xs: 4, md: 6 }, color: 'white' }}>
          <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
            <Grid container spacing={{ xs: 4, md: 10, lg: 12 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  
                  <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix.ph Logo" sx={{ width: 40, height: 40, objectFit: 'contain' }} />

                  {/* ALLFIX TEXT */}
                  <Typography variant="h5" fontWeight="900" color="white" sx={{ letterSpacing: '-0.02em', fontSize: '1.4rem' }}>
                    All<span style={{ color: '#4ade80' }}>F</span><span style={{ color: '#facc15' }}>i</span><span style={{ color: '#ef4444' }}>x</span>.ph
                  </Typography>

                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, mb: 4, maxWidth: '380px' }}>The Philippines' most trusted property care platform. Connecting homes and offices with verified professionals since 2021.</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 4, width: '100%', maxWidth: '400px' }}>
                  {footerPills.map(pill => (
                    <Box key={pill.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', px: 1, py: 0.8, cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'rgba(255,255,255,0.02)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">{pill.icon}</svg>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textAlign: 'center' }}>{pill.name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></IconButton>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></IconButton>
                  <IconButton sx={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></IconButton>
                </Box>
              </Grid>

              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>COMPANY</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['About AllFix', 'Careers', 'Press & Media', 'Investor Relations'].map(link => (<Typography key={link} onClick={() => {
                    if (link === 'About AllFix') {
                      navigate('/about');
                    }
                  }} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>))}
                </Box>
              </Grid>

              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SERVICES</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Air-con (CoolFix)', 'Plumbing (SaniFix)', 'Repairs (HomeFix)', 'IT Support (TechFix)', 'Moving (MoveFix)', 'Health (HealthFix)', 'Sustainability (GreenFix)', 'Pets (PetFix)'].map(link => (<Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>))}
                </Box>
              </Grid>

              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SUPPORT</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Help Center', 'Book a Service', 'Track My Job', 'Partner With Us'].map(link => (<Typography key={link} onClick={() => { if (link === 'Partner With Us') { navigate('/vendor-apply'); window.scrollTo(0,0); } }} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>))}
                </Box>
              </Grid>

              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>LEGAL</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Service Guarantee'].map(link => (
                    <Typography 
                      key={link}
                      onClick={() => { 
                        if (link === 'Privacy Policy') { 
                          navigate('/privacy'); 
                          window.scrollTo(0, 0); 
                        } else if (link === 'Terms of Service') {
                          navigate('/terms-of-use');
                          window.scrollTo(0, 0);
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

            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: { xs: 5, md: 2 } }} />

            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>CALL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>+63 920 9631 217 | +63 975 8336 289</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>EMAIL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}> inquiry@allfix.ph</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}><LocationOnIcon sx={{ fontSize: 26 }} /></Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>HEAD OFFICE</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', lineHeight: 1.4 }}>9824 Kamagong Street, San Antonio Village,<br/>Makati City 1203 Philippines</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 3 }, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Typography variant="caption" sx={{ fontSize: 'inherit' }}>© 2026 AllFix Philippines Inc. All rights reserved. DTI Reg. No. 2021-00001.</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;