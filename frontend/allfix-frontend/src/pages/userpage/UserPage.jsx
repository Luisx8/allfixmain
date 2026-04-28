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

const steps = ['Service','Booking Details','Schedule & Location','Billing','Completed','Canceled'];

const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const themeColor = '#123865';

  const [activeSection, setActiveSection] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWork, setSelectedWork] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Uniform CoolFix colors
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
      services: ['AC Cleaning','Gas Recharge','Installation','Emergency Repair'],
      works: [{task:'AC Cleaning',rate:1500},{task:'Gas Recharge',rate:1200},{task:'Installation',rate:3500},{task:'Emergency Repair',rate:2500}]
    },
    {
      id: 'electro', brand: 'ElectroFix', tagline: 'Electrical & Lighting Experts',
      description: 'Safe and reliable electrical services including repairs, installations, and emergency electrical support.',
      image: '/images/electrofix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Wiring','Troubleshooting','Installation','Safety Inspection'],
      works: [{task:'Wiring',rate:2000},{task:'Troubleshooting',rate:1800},{task:'Installation',rate:2500},{task:'Safety Inspection',rate:1500}]
    },
    {
      id: 'clean', brand: 'CleanFix', tagline: 'Deep Cleaning & Sanitization',
      description: 'Comprehensive cleaning solutions for homes and offices with eco-friendly products and prof.',
      image: '/images/cleanfix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Deep Cleaning','Carpet Care','Sanitization','Maintenance'],
      works: [{task:'Deep Cleaning',rate:1200},{task:'Carpet Care',rate:1000},{task:'Sanitization',rate:1500},{task:'Regular Maintenance',rate:800}]
    },
    {
      id: 'home', brand: 'HomeFix', tagline: 'General Home Repairs',
      description: 'Reliable carpentry, electrical, painting, and plumbing services for all household needs.',
      image: '/images/homefix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Carpentry','Electrical','Painting','Plumbing'],
      works: [{task:'Carpentry',rate:2000},{task:'Electrical',rate:1800},{task:'Painting',rate:1500},{task:'Plumbing',rate:1700}]
    },
    {
      id: 'move', brand: 'MoveFix', tagline: 'Moving & Storage Services',
      description: 'Professional moving and storage solutions for local and long-distance needs.',
      image: '/images/movefix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Local Move','Storage Service'],
      works: [{task:'Local Move',rate:3000},{task:'Storage Service',rate:2500}]
    },
    {
      id: 'health', brand: 'HealthFix', tagline: 'Medical & Home Care',
      description: 'Trusted medical and home care services for families and individuals.',
      image: '/images/healthfix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Home Care Visit','Medical Consultation'],
      works: [{task:'Home Care Visit',rate:2000},{task:'Medical Consultation',rate:1500}]
    },
    {
      id: 'green', brand: 'GreenFix', tagline: 'Eco & Sustainability',
      description: 'Eco-friendly solutions including garden maintenance and solar panel cleaning.',
      image: '/images/greenfix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Garden Maintenance','Solar Panel Cleaning'],
      works: [{task:'Garden Maintenance',rate:1200},{task:'Solar Panel Cleaning',rate:1000}]
    },
    {
      id: 'space', brand: 'SpaceFix', tagline: 'Space Planning & Organization',
      description: 'Smart space planning and organization for homes and offices.',
      image: '/images/spacefix.jpg', icon: Security,
      accent: themeColor, accentDark: '#0d2a4d',
      headerBg: themeColor, headerBgLight: uniformHeaderBg, pillText: '#333',
      services: ['Room Organization','Office Layout Planning'],
      works: [{task:'Room Organization',rate:800},{task:'Office Layout Planning',rate:2500}]
    }
  ];
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

const bookings = [
  { id: 'b-123', serviceId: 'cool', title: 'AC Cleaning', status: 'In Progress', scheduledAt: '2026-04-30' },
  { id: 'b-456', serviceId: 'electro', title: 'Wiring', status: 'Completed', scheduledAt: '2026-04-25' },
];

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

const renderHistory = () => (
  <>
    <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Booking History</Typography>
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="body1" color="text.secondary">
        Booking history will be listed here. Backend endpoint example: GET /api/user/bookings?status=completed
      </Typography>
    </Box>
  </>
);

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
          <Typography variant="h6" sx={{ mb: 2 }}>Select the work you need:</Typography>
          <RadioGroup value={selectedWork} onChange={(e) => setSelectedWork(e.target.value)}>
            {selectedService.works.map((work, i) => (
              <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <FormControlLabel
                  value={work.task}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>{work.task}</Typography>
                      <Typography variant="body2" color="text.secondary">{`₱${work.rate.toLocaleString()}`}</Typography>
                    </Box>
                  }
                />
              </Box>
            ))}
          </RadioGroup>
          <Button variant="contained" disabled={!selectedWork} onClick={() => setActiveStep(1)}>Continue</Button>
        </Box>
      )}

                {/* Step 2: Booking Details */}
                {activeStep === 1 && (
          <Box sx={{ mt: 3 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: themeColor }}>
                Booking Details
              </Typography>

              {/* Upload area */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Upload File / Image</Typography>
                <TextField
                  fullWidth
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </Box>

              {/* Description box */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Work Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the work needed in detail..."
                />
              </Box>

              {/* Job Order Summary */}
              <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, bgcolor: '#f9fafb' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: themeColor }}>
                  Job Order Summary
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Service: {selectedService.brand}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Task: {selectedWork || 'Not selected'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Rate: {selectedService.works.find(w => w.task === selectedWork)?.rate
                    ? `₱${selectedService.works.find(w => w.task === selectedWork).rate.toLocaleString()}`
                    : 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Description: {jobDescription || 'No description yet'}
                </Typography>
                <Typography variant="body2">
                  File: {uploadedFile ? uploadedFile.name : 'No file uploaded'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                disabled={!jobDescription}
                onClick={() => setActiveStep(2)}
              >
                Next
              </Button>
            </Paper>
          </Box>
        )}

        {/* Step 3: Schedule & Location */}
        {activeStep === 2 && (
          <Box sx={{ mt: 3 }}>
            <TextField fullWidth label="Service Location" sx={{ mb: 2 }} />
            <TextField fullWidth label="Date" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Time" type="time" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
            <Button variant="contained" onClick={() => setActiveStep(3)}>Next</Button>
          </Box>
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

      {/* Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 260, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: themeColor, mb: 2 }}>Dashboard Menu</Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'services'} onClick={() => setActiveSection('services')}>
                  <ListItemIcon sx={{ color: themeColor }}><Build /></ListItemIcon>
                  <ListItemText primary="Services" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'bookings'} onClick={() => setActiveSection('bookings')}>
                  <ListItemIcon sx={{ color: themeColor }}><BookOnline /></ListItemIcon>
                  <ListItemText primary="Current Booking" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'history'} onClick={() => setActiveSection('history')}>
                  <ListItemIcon sx={{ color: themeColor }}><History /></ListItemIcon>
                  <ListItemText primary="History" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'chat'} onClick={() => setActiveSection('chat')}>
                  <ListItemIcon sx={{ color: themeColor }}><Chat /></ListItemIcon>
                  <ListItemText primary="Chat with Vendor" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box>
            <Divider sx={{ mb: 2 }} />
            <Button fullWidth variant="contained" startIcon={<Logout />} onClick={handleLogout} sx={{ bgcolor: themeColor, color: 'white', fontWeight: 600 }}>
              Logout
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
          {renderMainContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;

