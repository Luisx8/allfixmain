import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Build,
  BookOnline,
  History,
  Chat,
  Logout,
  AcUnit,
  CleanHands,
  HomeRepairService,
  Computer,
  LocalShipping,
  MonitorHeart,
  Grass,
  SquareFoot,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const steps = [
  'Service',
  'Booking Details',
  'Schedule & Location',
  'Billing',
  'Completed',
  'Canceled',
];

const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const themeColor = '#123865';

  const [activeSection, setActiveSection] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWork, setSelectedWork] = useState('');

  const services = [
    { id: 'cool', name: 'CoolFix', desc: 'Air-con & HVAC Specialists', icon: <AcUnit fontSize="large" />, subs: ['AC Cleaning', 'Emergency Repair'], works: [
      { task: 'AC Cleaning', rate: 1500 },
      { task: 'Emergency Repair', rate: 2500 }
    ] },
    { id: 'sani', name: 'SaniFix', desc: 'Plumbing & Sanitation Experts', icon: <CleanHands fontSize="large" />, subs: ['Deep Cleaning', 'Car Sanitation'], works: [
      { task: 'Deep Cleaning', rate: 1200 },
      { task: 'Car Sanitation', rate: 800 }
    ] },
    { id: 'home', name: 'HomeFix', desc: 'General Home Repairs', icon: <HomeRepairService fontSize="large" />, subs: ['Carpentry', 'Electrical', 'Painting', 'Plumbing'], works: [
      { task: 'Carpentry', rate: 2000 },
      { task: 'Electrical', rate: 1800 },
      { task: 'Painting', rate: 1500 },
      { task: 'Plumbing', rate: 1700 }
    ] },
    { id: 'tech', name: 'TechFix', desc: 'IT & Electronics Support', icon: <Computer fontSize="large" />, subs: ['Printer/Scanner Repair', 'Computer Repair', 'Software Installation'], works: [
      { task: 'Printer/Scanner Repair', rate: 1000 },
      { task: 'Computer Repair', rate: 2000 },
      { task: 'Software Installation', rate: 500 }
    ] },
    { id: 'move', name: 'MoveFix', desc: 'Moving & Storage Services', icon: <LocalShipping fontSize="large" />, subs: ['Local Move', 'Storage Service'], works: [
      { task: 'Local Move', rate: 3000 },
      { task: 'Storage Service', rate: 2500 }
    ] },
    { id: 'health', name: 'HealthFix', desc: 'Medical & Home Care', icon: <MonitorHeart fontSize="large" />, subs: ['Home Care Visit', 'Medical Consultation'], works: [
      { task: 'Home Care Visit', rate: 2000 },
      { task: 'Medical Consultation', rate: 1500 }
    ] },
    { id: 'green', name: 'GreenFix', desc: 'Eco & Sustainability', icon: <Grass fontSize="large" />, subs: ['Garden Maintenance', 'Solar Panel Cleaning'], works: [
      { task: 'Garden Maintenance', rate: 1200 },
      { task: 'Solar Panel Cleaning', rate: 1000 }
    ] },
    { id: 'space', name: 'SpaceFix', desc: 'Space Planning & Organization', icon: <SquareFoot fontSize="large" />, subs: ['Room Organization', 'Office Layout Planning'], works: [
      { task: 'Room Organization', rate: 800 },
      { task: 'Office Layout Planning', rate: 2500 }
    ] },
  ];

  const bookings = [
    { id: 'b-123', serviceId: 'cool', title: 'AC Cleaning', status: 'In Progress', scheduledAt: '2026-04-30' },
    { id: 'b-456', serviceId: 'sani', title: 'Leak Repair', status: 'Completed', scheduledAt: '2026-04-25' },
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
  };

  const openBookingDetails = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };

  const renderServices = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: 350,
                height: 460,
                borderRadius: 4,
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                mx: 'auto',
                transition: 'transform 0.25s, box-shadow 0.25s',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 14px 40px rgba(0,0,0,0.12)',
                },
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: themeColor,
                  borderRadius: '0 0 4px 4px',
                },
                '&:hover .serviceNameBox': {
                  backgroundColor: themeColor,
                },
                '&:hover .serviceNameText': {
                  color: 'white',
                },
              }}
            >
              {/* Photo container restored */}
              <Box sx={{ height: 200, bgcolor: '#e9eef3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">Photo Placeholder</Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  className="serviceNameBox"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    transition: 'background-color 0.25s',
                  }}
                >
                  {service.icon}
                  <Typography
                    className="serviceNameText"
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: themeColor,
                      transition: 'color 0.25s',
                    }}
                  >
                    {service.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{service.desc}</Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {service.subs.map((sub, i) => (<li key={i} style={{ fontSize: '0.95rem', color: '#333' }}>{sub}</li>))}
                </ul>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" sx={{ color: themeColor, fontWeight: 700 }} onClick={() => handleBookService(service)}>
                  Book {service.name} →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderBookings = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Current Booking</Typography>
      <Grid container spacing={3}>
        {bookings.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="body1" color="text.secondary">You have no current bookings.</Typography>
            </Card>
          </Grid>
        ) : (
          bookings.map((b) => (
            <Grid item xs={12} md={6} key={b.id}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ color: themeColor }}>
                    {b.title} — <Typography component="span" variant="subtitle2" color="text.secondary">#{b.id}</Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Status: <strong>{b.status}</strong></Typography>
                  <Typography variant="body2" color="text.secondary">Scheduled Date: {b.scheduledAt}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" onClick={() => openBookingDetails(b.id)}>View Details</Button>
                    <Button variant="contained" size="small">Request Change</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );

  const renderHistory = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Booking History</Typography>
      <Card sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Booking history will be listed here. Backend endpoint example: GET /api/user/bookings?status=completed
        </Typography>
      </Card>
    </>
  );

  const renderChat = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>Chat with Vendor</Typography>
      <Card sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Chat area (replace with real chat component). Backend: WebSocket or REST endpoints for messages.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField fullWidth placeholder="Type a message..." />
          <Button variant="contained">Send</Button>
        </Box>
      </Card>
    </>
  );

  const renderBookingFlow = () => {
    if (!selectedService) return null;

    return (
      <>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
          {`Booking ${selectedService.name}`}
        </Typography>

        {/* Stepper with sequential steps */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Service selection with rates */}
        {activeStep === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Select the work you need:</Typography>
            <RadioGroup value={selectedWork} onChange={(e) => setSelectedWork(e.target.value)}>
              {selectedService.works.map((work, i) => (
                <Card key={i} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
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
                </Card>
              ))}
            </RadioGroup>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" disabled={!selectedWork} onClick={() => setActiveStep(1)}>Continue</Button>
            </Box>
          </Box>
        )}
        {/* Step 2: Booking Details */}
        {activeStep === 1 && (
          <Box sx={{ mt: 3 }}>
            <TextField fullWidth label="Upload Image (Work to fix)" type="file" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Description of Work" multiline rows={4} sx={{ mb: 2 }} />
            <Button variant="contained" onClick={() => setActiveStep(2)}>Next</Button>
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
              Summary of booking: {selectedWork} for {selectedService.name}.
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

  /* ---------- Component layout ---------- */
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
        <Box sx={{ width: 300, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
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

