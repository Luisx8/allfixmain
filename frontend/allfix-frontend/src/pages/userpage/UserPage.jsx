import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Box, AppBar, Toolbar, Button, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, Grid, TextField, RadioGroup,
  FormControlLabel, Radio, Stepper, Step, StepLabel, Paper
} from '@mui/material';
import {
  Build, BookOnline, History, Chat, Logout, Security
} from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../contexts/AuthContext';

// --- Static Constants & Data ---
const steps = ['Service', 'Booking Details', 'Schedule & Location', 'Billing', 'Completed', 'Canceled'];

const themeColor = '#123865';
const uniformAccent = '#2563eb';
const uniformAccentDark = '#1e40af';
const uniformHeaderBg = '#2563eb';
const uniformHeaderBgLight = '#3b82f6';

const services = [
  {
    id: 'cool', brand: 'CoolFix', tagline: 'Air-con & HVAC Specialists',
    description: 'Cleaning, installation, repair, and preventive maintenance for all aircon brands and HVAC systems.',
    image: '/images/coolfix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['AC Cleaning', 'Gas Recharge', 'Installation', 'Emergency Repair'],
    works: [{ task: 'AC Cleaning', rate: 0 }, { task: 'Gas Recharge', rate: 0 }, { task: 'Installation', rate: 0 }, { task: 'Emergency Repair', rate: 0 }]
  },
  {
    id: 'electro', brand: 'ElectroFix', tagline: 'Electrical & Lighting Experts',
    description: 'Safe and reliable electrical services including repairs, installations, and emergency electrical support.',
    image: '/images/electrofix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Wiring', 'Troubleshooting', 'Installation', 'Safety Inspection'],
    works: [{ task: 'Wiring', rate: 0 }, { task: 'Troubleshooting', rate: 0 }, { task: 'Installation', rate: 0 }, { task: 'Safety Inspection', rate: 0 }]
  },
  {
    id: 'clean', brand: 'CleanFix', tagline: 'Deep Cleaning & Sanitization',
    description: 'Comprehensive cleaning solutions for homes and offices with eco-friendly products and prof.',
    image: '/images/cleanfix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Deep Cleaning', 'Carpet Care', 'Sanitization', 'Maintenance'],
    works: [{ task: 'Deep Cleaning', rate: 0 }, { task: 'Carpet Care', rate: 0 }, { task: 'Sanitization', rate: 0 }, { task: 'Regular Maintenance', rate: 0 }]
  },
  {
    id: 'home', brand: 'HomeFix', tagline: 'General Home Repairs',
    description: 'Reliable carpentry, electrical, painting, and plumbing services for all household needs.',
    image: '/images/homefix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Carpentry', 'Electrical', 'Painting', 'Plumbing'],
    works: [{ task: 'Carpentry', rate: 0 }, { task: 'Electrical', rate: 0 }, { task: 'Painting', rate: 0 }, { task: 'Plumbing', rate: 0 }]
  },
  {
    id: 'move', brand: 'MoveFix', tagline: 'Moving & Storage Services',
    description: 'Professional moving and storage solutions for local and long-distance needs.',
    image: '/images/movefix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Local Move', 'Storage Service'],
    works: [{ task: 'Local Move', rate: 0 }, { task: 'Storage Service', rate: 0 }]
  },
  {
    id: 'health', brand: 'HealthFix', tagline: 'Medical & Home Care',
    description: 'Trusted medical and home care services for families and individuals.',
    image: '/images/healthfix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Home Care Visit', 'Medical Consultation'],
    works: [{ task: 'Home Care Visit', rate: 0 }, { task: 'Medical Consultation', rate: 0 }]
  },
  {
    id: 'green', brand: 'GreenFix', tagline: 'Eco & Sustainability',
    description: 'Eco-friendly solutions including garden maintenance and solar panel cleaning.',
    image: '/images/greenfix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Garden Maintenance', 'Solar Panel Cleaning'],
    works: [{ task: 'Garden Maintenance', rate: 0 }, { task: 'Solar Panel Cleaning', rate: 0 }]
  },
  {
    id: 'space', brand: 'SpaceFix', tagline: 'Space Planning & Organization',
    description: 'Smart space planning and organization for homes and offices.',
    image: '/images/spacefix.jpg', icon: Security,
    accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
    services: ['Room Organization', 'Office Layout Planning'],
    works: [{ task: 'Room Organization', rate: 0 }, { task: 'Office Layout Planning', rate: 0 }]
  }
];

const bookings = [
  { id: 'b-123', serviceId: 'cool', title: 'AC Cleaning', status: 'In Progress', scheduledAt: '2026-04-30' },
  { id: 'b-456', serviceId: 'electro', title: 'Wiring', status: 'Completed', scheduledAt: '2026-04-25' },
];

const navItems = [
  { id: 'services', label: 'Services', icon: Build },
  { id: 'bookings', label: 'Current Booking', icon: BookOnline },
  { id: 'history', label: 'History', icon: History },
  { id: 'chat', label: 'Chat with Vendor', icon: Chat },
];

// --- Sub Component: ServiceCard ---
const ServiceCard = ({ service, onServiceClick }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e5e5',
        boxShadow: hovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
        backgroundColor: '#fff',
        width: 260,
        height: 360,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onServiceClick(service)}
    >
      {/* Image showcase */}
      <div style={{ position: 'relative', height: '100px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
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
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: service.accent,
            opacity: hovered ? 0.6 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Logo pop-in */}
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
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: service.accent,
              boxShadow: `0 0 20px ${service.accent}80, 0 0 40px ${service.accent}40, 0 8px 16px rgba(0,0,0,0.3)`,
            }}
          >
            <Icon style={{ width: '28px', height: '28px', color: '#fff' }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          position: 'relative',
          padding: '12px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${service.headerBg} 0%, ${service.headerBgLight} 100%)`,
        }}
      >
        <div
          style={{
            fontSize: '0.65rem',
            fontWeight: 900,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '4px 8px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: '#fff',
          }}
        >
          {service.brand}
        </div>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
            backgroundColor: service.accent,
          }}
        >
          <Icon style={{ width: '18px', height: '18px', color: '#fff' }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontWeight: 900, fontSize: '0.95rem', color: '#000', marginBottom: '4px' }}>
          {service.brand}
        </h3>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, color: service.accent, marginBottom: '12px' }}>
          {service.tagline}
        </p>
        <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.4, marginBottom: '12px', flex: 1 }}>
          {service.description}
        </p>

        {/* Checklist */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 8px', marginBottom: '16px' }}>
          {service.services.map((tag) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircleIcon style={{ width: '12px', height: '12px', color: service.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 500, color: service.pillText }}>
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
            gap: '4px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: hovered ? service.accentDark : service.accent,
            transition: 'color 0.2s ease',
          }}
        >
          Book {service.brand}
          <ArrowForwardIcon
            style={{
              width: '14px',
              height: '14px',
              transition: 'transform 0.2s ease',
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            }}
          />
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

// --- Main Component: UserPage ---
const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [activeSection, setActiveSection] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWork, setSelectedWork] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setActiveSection('booking');
    setActiveStep(0);
    setSelectedWork('');
    setJobDescription('');
    setUploadedFile(null);
  };

  const renderServices = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Services
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
            <ServiceCard service={service} onServiceClick={handleBookService} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderBookings = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Current Booking</Typography>
      <Grid container spacing={2}>
        {bookings.map((b) => (
          <Grid item xs={12} md={6} key={b.id}>
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: themeColor }}>
                {b.title} — <Typography component="span" variant="subtitle2" color="text.secondary">#{b.id}</Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Status: <strong>{b.status}</strong></Typography>
              <Typography variant="body2" color="text.secondary">Scheduled Date: {b.scheduledAt}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderHistory = () => {
    // Premium Color Palette
    const statusStyles = {
      Completed: { color: '#065f46', bg: '#d1fae5', border: '#a7f3d0' },
      Canceled: { color: '#991b1b', bg: '#fee2e2', border: '#fecaca' },
      Pending: { color: '#92400e', bg: '#fef3c7', border: '#fde68a' },
    };
  
    return (
      <Box sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        animation: 'fadeIn 0.8s ease-out',
        p: { xs: 1, md: 2 } 
      }}>
        {/* HEADER SECTION */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', mb: 1 }}>
              Booking History
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
              A detailed log of your property maintenance records.
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
               Total Bookings: 03
             </Typography>
          </Box>
        </Box>
  
        {/* THE PREMIUM TABLE */}
        <Paper elevation={0} sx={{ 
          borderRadius: '24px', 
          overflow: 'hidden', 
          border: '1px solid rgba(226, 232, 240, 0.8)',
          background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
        }}>
          
          {/* TABLE HEADER - Slate Styling */}
          <Box sx={{ 
            display: { xs: 'none', md: 'grid' }, 
            gridTemplateColumns: '1.2fr 1fr 2fr 1.5fr 1.2fr', 
            p: '20px 32px', 
            bgcolor: 'rgba(241, 245, 249, 0.5)', 
            borderBottom: '1px solid #e2e8f0' 
          }}>
            {['Booking ID', 'Status', 'Service', 'Payment', 'Date'].map((label) => (
              <Typography key={label} variant="caption" sx={{ fontWeight: 800, color: '#475569', letterSpacing: '0.05em' }}>
                {label}
              </Typography>
            ))}
          </Box>
  
          {/* DATA ROW 0 */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 2fr 1.5fr 1.2fr' }, 
            alignItems: 'center', 
            p: '24px 32px', 
            borderBottom: '1px solid #f1f5f9', 
            transition: 'all 0.3s ease',
            '&:hover': { bgcolor: '#ffffff', transform: 'scale(1.005)', boxShadow: 'inset 4px 0 0 #123865' } 
          }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontFamily: 'monospace', fontSize: '1rem' }}>#BK-000</Typography>
            <Box>
              <Box sx={{ 
                display: 'inline-flex', px: 1.5, py: 0.5, borderRadius: '8px', 
                bgcolor: statusStyles.Completed.bg, color: statusStyles.Completed.color,
                border: `1px solid ${statusStyles.Completed.border}`, fontSize: '0.7rem', fontWeight: 900
              }}>
                COMPLETED
              </Box>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#334155' }}>AC Deep Cleaning</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>GCash • ₱1,500</Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>May 01, 2026</Typography>
          </Box>
  
          {/* DATA ROW 1 */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 2fr 1.5fr 1.2fr' }, 
            alignItems: 'center', 
            p: '24px 32px', 
            borderBottom: '1px solid #f1f5f9', 
            transition: 'all 0.3s ease',
            '&:hover': { bgcolor: '#ffffff', transform: 'scale(1.005)', boxShadow: 'inset 4px 0 0 #123865' } 
          }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontFamily: 'monospace', fontSize: '1rem' }}>#BK-001</Typography>
            <Box>
              <Box sx={{ 
                display: 'inline-flex', px: 1.5, py: 0.5, borderRadius: '8px', 
                bgcolor: statusStyles.Canceled.bg, color: statusStyles.Canceled.color,
                border: `1px solid ${statusStyles.Canceled.border}`, fontSize: '0.7rem', fontWeight: 900
              }}>
                CANCELED
              </Box>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#334155' }}>Wiring Repair</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Cash • ₱850</Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>May 03, 2026</Typography>
          </Box>
  
          {/* DATA ROW 2 */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 2fr 1.5fr 1.2fr' }, 
            alignItems: 'center', 
            p: '24px 32px', 
            transition: 'all 0.3s ease',
            '&:hover': { bgcolor: '#ffffff', transform: 'scale(1.005)', boxShadow: 'inset 4px 0 0 #123865' } 
          }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontFamily: 'monospace', fontSize: '1rem' }}>#BK-002</Typography>
            <Box>
              <Box sx={{ 
                display: 'inline-flex', px: 1.5, py: 0.5, borderRadius: '8px', 
                bgcolor: statusStyles.Pending.bg, color: statusStyles.Pending.color,
                border: `1px solid ${statusStyles.Pending.border}`, fontSize: '0.7rem', fontWeight: 900
              }}>
                PENDING
              </Box>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#334155' }}>Light Installation</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Bank Transfer</Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>May 04, 2026</Typography>
          </Box>
  
        </Paper>
      </Box>
    );
  };

  const renderChat = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Chat with Vendor</Typography>
      <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <TextField fullWidth placeholder="Type a message..." sx={{ mb: 2 }} />
        <Button variant="contained">Send</Button>
      </Box>
    </>
  );

  const renderBookingFlow = () => {
    if (!selectedService) return null;

    return (
      <>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
          {`Booking ${selectedService.brand}`}
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: themeColor }}>
              Select the work you need:
            </Typography>

            {selectedService.works.map((work, i) => (
              <Box
                key={i}
                sx={{
                  mb: 2,
                  p: 3,
                  border: selectedWork === work.task ? `2px solid ${themeColor}` : '1px solid #ddd',
                  borderRadius: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedWork === work.task
                    ? '0 6px 12px rgba(0,0,0,0.2)'
                    : '0 2px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                  }
                }}
                onClick={() => setSelectedWork(work.task)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>{work.task}</Typography>
                  {selectedWork === work.task && (
                    <CheckCircleIcon sx={{ color: themeColor, fontSize: 20 }} />
                  )}
                </Box>
                <Typography variant="body1" fontWeight={600} color="text.secondary">
                  ₱{work.rate.toLocaleString()}
                </Typography>
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedService(null);
                  setSelectedWork('');
                  setJobDescription('');
                  setUploadedFile(null);
                  setActiveStep(0);
                  setActiveSection('services');
                }}
                sx={{
                  px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                  borderColor: themeColor, color: themeColor,
                  '&:hover': { bgcolor: themeColor, color: 'white' }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!selectedWork}
                onClick={() => setActiveStep(1)}
                sx={{
                  px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                  background: `linear-gradient(90deg, ${themeColor} 0%, #345b8c 100%)`,
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                  '&:hover': { background: `linear-gradient(90deg, #345b8c 0%, ${themeColor} 100%)` }
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 2: Booking Details */}
        {activeStep === 1 && (
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 5, borderRadius: 5 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: themeColor }}>
                  Booking Details
                </Typography>

                {/* Upload area */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Upload File / Image</Typography>
                  <Box
                    sx={{
                      border: '2px dashed #cbd5e1', borderRadius: 3, bgcolor: '#f9fafb', p: 4,
                      textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f1f5f9' }
                    }}
                  >
                    <TextField
                      fullWidth type="file" InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                      sx={{ display: 'none' }} id="upload-file"
                    />
                    <label htmlFor="upload-file" style={{ cursor: 'pointer' }}>
                      <Typography variant="body1" fontWeight={600} color={themeColor}>
                        Click to upload or drag & drop
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Supported formats: JPG, PNG, PDF
                      </Typography>
                    </label>
                  </Box>
                </Box>

                {/* Description box */}
                <Box sx={{ mb: 5 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Work Description</Typography>
                  <TextField
                    fullWidth rows={6} multiline
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Describe the work needed in detail..."
                    sx={{
                      bgcolor: '#f9fafb', borderRadius: 3,
                      '& .MuiOutlinedInput-root': { p: 2, fontSize: '0.95rem' }
                    }}
                  />
                </Box>

                {/* Premium buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedService(null);
                      setSelectedWork('');
                      setJobDescription('');
                      setUploadedFile(null);
                      setActiveStep(0);
                      setActiveSection('Selectedwork');
                    }}
                    sx={{
                      px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                      borderColor: themeColor, color: themeColor,
                      '&:hover': { bgcolor: themeColor, color: 'white' }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!jobDescription}
                    onClick={() => setActiveStep(2)}
                    sx={{
                      px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                      background: `linear-gradient(90deg, ${themeColor} 0%, #345b8c 100%)`,
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                      '&:hover': { background: `linear-gradient(90deg, #345b8c 0%, ${themeColor} 100%)` }
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Right side: Job Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: '#f9fafb', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: themeColor }}>
                  Job Order Summary
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                      <Typography variant="subtitle2" fontWeight={700}>Service</Typography>
                      <Typography variant="body2">{selectedService?.brand || 'Not selected'}</Typography>
                    </Box>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                      <Typography variant="subtitle2" fontWeight={700}>Task</Typography>
                      <Typography variant="body2">{selectedWork || 'Not selected'}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                      <Typography variant="subtitle2" fontWeight={700}>Date</Typography>
                      <Typography variant="body2">{/* bind to date state */}</Typography>
                    </Box>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                      <Typography variant="subtitle2" fontWeight={700}>Time</Typography>
                      <Typography variant="body2">{/* bind to time state */}</Typography>
                    </Box>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                      <Typography variant="subtitle2" fontWeight={700}>Location</Typography>
                      <Typography variant="body2">{/* bind to location state */}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 2, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                    <Typography variant="subtitle2" fontWeight={700}>Bill</Typography>
                    <Typography variant="body2">
                      {selectedService?.works.find(w => w.task === selectedWork)?.rate
                        ? `₱${selectedService.works.find(w => w.task === selectedWork).rate.toLocaleString()}`
                        : 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
                    <Typography variant="subtitle2" fontWeight={700}>Subtotal</Typography>
                    <Typography variant="body2">{/* backend calculation placeholder */}</Typography>
                  </Box>
                  <Box sx={{ p: 2, border: '2px solid', borderColor: themeColor, borderRadius: 2, bgcolor: 'white' }}>
                    <Typography variant="subtitle1" fontWeight={800} color={themeColor}>Total Amount</Typography>
                    <Typography variant="h6" fontWeight={800} color={themeColor}>
                      {/* backend calculation placeholder */}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Step 3: Schedule & Location */}
        {activeStep === 2 && (
          <Grid container spacing={4} sx={{ mt: 3 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 5, borderRadius: 5 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: themeColor }}>
                  Schedule & Location
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Service Location</Typography>
                  <TextField fullWidth placeholder="Enter full address or location details..." sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Preferred Date</Typography>
                  <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Preferred Time</Typography>
                  <TextField fullWidth type="time" InputLabelProps={{ shrink: true }} sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedService(null);
                      setSelectedWork('');
                      setJobDescription('');
                      setUploadedFile(null);
                      setActiveStep(0);
                      setActiveSection('services');
                    }}
                    sx={{
                      px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                      borderColor: themeColor, color: themeColor,
                      '&:hover': { bgcolor: themeColor, color: 'white' }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(3)}
                    sx={{
                      px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                      backgroundColor: themeColor,
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                      '&:hover': { backgroundColor: '#345b8c' }
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Job Summary right column */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={10}
                sx={{
                  p: 4, borderRadius: 3, color: 'white', boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                  background: `linear-gradient(135deg, ${themeColor} 0%, #345b8c 100%)`
                }}
              >
                <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
                  Job Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight={600}>Service:</Typography>
                  <Typography variant="body2">{selectedService.brand}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight={600}>Task:</Typography>
                  <Typography variant="body2">{selectedWork || 'Not selected'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight={600}>Rate:</Typography>
                  <Typography variant="body2">
                    {selectedService.works.find(w => w.task === selectedWork)?.rate
                      ? `₱${selectedService.works.find(w => w.task === selectedWork).rate.toLocaleString()}`
                      : 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight={600}>Description:</Typography>
                  <Typography variant="body2">{jobDescription || 'No description yet'}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={600}>File:</Typography>
                  <Typography variant="body2">{uploadedFile ? uploadedFile.name : 'No file uploaded'}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Step 4: Billing */}
        {activeStep === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>Select Payment Method:</Typography>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setActiveStep(4)}>Bank Transfer</Button>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setActiveStep(4)}>EWallet</Button>
            <Button variant="outlined" onClick={() => setActiveStep(4)}>Cash</Button>
          </Box>
        )}

        {/* Step 5: Completed */}
        {activeStep === 4 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="success.main">Booking Completed!</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Summary of booking: {selectedWork} for {selectedService.brand}.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setActiveSection('bookings')}>
              Go to Current Bookings
            </Button>
          </Box>
        )}

        {/* Step 6: Canceled */}
        {activeStep === 5 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="error.main">Booking Canceled</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Summary of cancellation will be displayed here.</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setActiveSection('history')}>
              Go to Booking History
            </Button>
          </Box>
        )}
      </>
    );
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'services': return renderServices();
      case 'bookings': return renderBookings();
      case 'history': return renderHistory();
      case 'chat': return renderChat();
      case 'booking': return renderBookingFlow();
      default: return renderServices();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: themeColor }}>
        <Toolbar sx={{ justifyContent: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: 'white', mb: 0.3 }}>AllFix.ph</Typography>
            <Typography variant="caption" sx={{ color: 'white', letterSpacing: 1, fontSize: '0.7rem', textTransform: 'uppercase' }}>
              Property Care Experts
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Container Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar Navigation */}
        <Box
          sx={{
            width: 260, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid #e2e8f0',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            p: 2, borderRadius: 3, boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: themeColor, mb: 3 }}>
              Dashboard Menu
            </Typography>

            <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <ListItem key={id} disablePadding>
                    <Button
                      fullWidth
                      startIcon={<Icon sx={{ fontSize: 22, color: isActive ? 'white' : themeColor }} />}
                      onClick={() => setActiveSection(id)}
                      sx={{
                        justifyContent: 'flex-start', px: 3, py: 1.5, borderRadius: 3,
                        fontWeight: 600, textTransform: 'none',
                        background: isActive
                          ? `linear-gradient(90deg, ${themeColor} 0%, #345b8c 100%)`
                          : 'rgba(18,56,101,0.05)',
                        color: isActive ? 'white' : themeColor,
                        boxShadow: isActive ? '0 6px 12px rgba(0,0,0,0.2)' : 'none'
                      }}
                    >
                      {label}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/*Bottom buttons/ Logout */}
          <Box>
            <Divider sx={{ mb: 2 }} />
            <Button
              fullWidth variant="contained" startIcon={<Logout />} onClick={handleLogout}
              sx={{
                px: 3, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none',
                background: `linear-gradient(90deg, ${themeColor} 0%, #345b8c 100%)`,
                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                '&:hover': { background: `linear-gradient(90deg, #345b8c 0%, ${themeColor} 100%)` }
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Dynamic Main Body Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
          {renderMainContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;