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
  Tabs,
  Tab,
  CardHeader,
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

/**
 * UserPage
 * - Single component with navbar + sidebar
 * - Main content switches via `activeSection`
 * - Clicking a service card or its Book button opens an inline Booking view
 * - Booking view contains tabs: Service | Booking Details | Schedule & Location | Billing | Completed
 * - Backend-friendly: items include `id`; submit handlers show where to call APIs
 */
const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const themeColor = '#123865';

  // UI state
  const [activeSection, setActiveSection] = useState('services'); // 'services' | 'bookings' | 'history' | 'chat' | 'booking'
  const [selectedService, setSelectedService] = useState(null); // { id, name, ... } or null
  const [tabIndex, setTabIndex] = useState(0);

  // Services data (each item has an id for backend)
  const services = [
    { id: 'cool', name: 'CoolFix', desc: 'Air-con & HVAC Specialists', icon: <AcUnit fontSize="large" />, subs: ['AC Cleaning', 'Gas Recharge', 'Installation', 'Emergency Repair'] },
    { id: 'sani', name: 'SaniFix', desc: 'Plumbing & Sanitation Experts', icon: <CleanHands fontSize="large" />, subs: ['Leak Repair', 'Pipe Work', 'Drain Cleaning', 'Waterproofing'] },
    { id: 'home', name: 'HomeFix', desc: 'General Home Repairs', icon: <HomeRepairService fontSize="large" />, subs: ['Carpentry', 'Electrical', 'Painting', 'Tiling'] },
    { id: 'tech', name: 'TechFix', desc: 'IT & Electronics Support', icon: <Computer fontSize="large" />, subs: ['CCTV Setup', 'PC Repair', 'Network/WiFi', 'Smart Home'] },
    { id: 'move', name: 'MoveFix', desc: 'Moving & Storage Services', icon: <LocalShipping fontSize="large" />, subs: ['Local Moving', 'Storage', 'Packing', 'Organization'] },
    { id: 'health', name: 'HealthFix', desc: 'Medical & Home Care', icon: <MonitorHeart fontSize="large" />, subs: ['Consultation', 'Wellness', 'Home Care', 'Senior Care'] },
    { id: 'green', name: 'GreenFix', desc: 'Eco & Sustainability', icon: <Grass fontSize="large" />, subs: ['Waste Audit', 'Recycling Guide', 'Composting Setup', 'Eco Consulting'] },
    { id: 'space', name: 'SpaceFix', desc: 'Space Planning & Organization', icon: <SquareFoot fontSize="large" />, subs: ['Planning', 'Declutter', 'Layout Optimization'] },
  ];

  // Example bookings (replace with API)
  const bookings = [
    { id: 'b-123', serviceId: 'cool', title: 'AC Cleaning', status: 'In Progress', scheduledAt: '2026-04-30' },
    { id: 'b-456', serviceId: 'sani', title: 'Leak Repair', status: 'Completed', scheduledAt: '2026-04-25' },
  ];

  // Logout handler
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Open inline booking view inside UserPage
  const openInlineBooking = (service) => {
    setSelectedService(service);
    setActiveSection('booking');
    setTabIndex(0);
  };

  // Submit booking (placeholder for backend integration)
  const submitBooking = async (payload) => {
    // Example payload:
    // {
    //   serviceId: selectedService.id,
    //   customerName: payload.name,
    //   contact: payload.contact,
    //   date: payload.date,
    //   address: payload.address,
    //   billing: payload.billing
    // }
    // Replace with actual POST to your backend:
    // await fetch('/api/bookings', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    console.log('Submitting booking payload', payload);

    // After successful booking, switch to Completed tab or Current Bookings
    setTabIndex(4); // Completed tab index
  };

  // Save billing (placeholder)
  const saveBilling = async (billingData) => {
    // POST billing info to backend
    console.log('Saving billing', billingData);
    // On success, move to Completed tab
    setTabIndex(4);
  };

  // Mark booking completed (placeholder)
  const markCompleted = async (bookingId) => {
    // PATCH /api/bookings/:id to mark completed
    console.log('Mark booking completed', bookingId);
  };

  /* ---------- Tab panel helper ---------- */
  const TabPanel = ({ children, value, index }) => {
    return (
      <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`}>
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </div>
    );
  };

  /* ---------- Renderers ---------- */

  const renderServices = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Services
      </Typography>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => openInlineBooking(service)}
              sx={{
                width: 350,
                height: 460,
                borderRadius: 4,
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s, box-shadow 0.25s',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 14px 40px rgba(0,0,0,0.12)' },
                mx: 'auto',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
              role="button"
              aria-label={`Open booking for ${service.name}`}
            >
              {/* Photo placeholder */}
              <Box sx={{ height: 200, bgcolor: '#e9eef3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">Photo Placeholder</Typography>
              </Box>

              <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  {service.icon}
                  <Typography variant="h6" fontWeight={700} sx={{ color: themeColor }}>
                    {service.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {service.desc}
                </Typography>

                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {service.subs.map((sub, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: '#333' }}>{sub}</li>
                  ))}
                </ul>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    openInlineBooking(service);
                  }}
                  sx={{
                    color: themeColor,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    transition: 'color 0.25s, transform 0.25s, text-decoration 0.25s',
                    '&:hover': {
                      color: '#0d47a1',
                      transform: 'scale(1.03)',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {`Book ${service.name}`}
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
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Current Booking
      </Typography>

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

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Status: <strong>{b.status}</strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Scheduled Date: {b.scheduledAt}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" onClick={() => navigate(`/bookings/${b.id}`)}>View Details</Button>
                    <Button variant="contained" size="small" onClick={() => {/* request change handler */}}>Request Change</Button>
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
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Booking History
      </Typography>
      <Card sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Booking history will be listed here. Backend endpoint example: GET /api/user/bookings?status=completed
        </Typography>
      </Card>
    </>
  );

  const renderChat = () => (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
        Chat with Vendor
      </Typography>
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

  // Inline booking view (keeps navbar + sidebar visible)
  const renderInlineBooking = () => {
    if (!selectedService) return null;

    // Local form state for booking details and billing
    const [customerName, setCustomerName] = useState('');
    const [contact, setContact] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [address, setAddress] = useState('');
    const [billingName, setBillingName] = useState('');
    const [billingAmount, setBillingAmount] = useState('');
    const [completedNotes, setCompletedNotes] = useState('');

    const handleSubmitBooking = (e) => {
      e.preventDefault();
      const payload = {
        serviceId: selectedService.id,
        customerName,
        contact,
        date: preferredDate,
        address,
      };
      submitBooking(payload);
    };

    const handleSaveBilling = () => {
      const billingData = {
        serviceId: selectedService.id,
        billingName,
        amount: billingAmount,
      };
      saveBilling(billingData);
    };

    const handleMarkCompleted = () => {
      // In a real flow you'd pass booking id returned from backend
      markCompleted('demo-booking-id');
      setCompletedNotes('Marked as completed');
    };

    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: themeColor }}>
            {`Booking ${selectedService.name}`}
          </Typography>

          <Box>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => { setSelectedService(null); setActiveSection('services'); setTabIndex(0); }}>
              Back to Services
            </Button>
            <Button variant="contained" onClick={() => { setSelectedService(null); setActiveSection('bookings'); setTabIndex(0); }}>
              Close
            </Button>
          </Box>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={`${selectedService.name} — Booking`}
            subheader={selectedService.desc}
            sx={{ bgcolor: '#fafafa' }}
          />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} aria-label="booking tabs">
              <Tab label="Service" />
              <Tab label="Booking Details" />
              <Tab label="Schedule & Location" />
              <Tab label="Billing" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          <CardContent>
            <TabPanel value={tabIndex} index={0}>
              {/* Service tab: show service summary */}
              <Typography variant="h6" sx={{ mb: 1 }}>{selectedService.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{selectedService.desc}</Typography>
              <Typography variant="subtitle2">Included subservices</Typography>
              <ul style={{ marginTop: 8 }}>
                {selectedService.subs.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              {/* Booking Details: simple form */}
              <Box component="form" onSubmit={handleSubmitBooking} sx={{ display: 'grid', gap: 2, maxWidth: 640 }}>
                <TextField label="Full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                <TextField label="Contact number or email" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <TextField label="Preferred date" type="date" InputLabelProps={{ shrink: true }} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required />
                <TextField label="Address / Location details" value={address} onChange={(e) => setAddress(e.target.value)} multiline rows={2} required />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained">Submit Booking</Button>
                  <Button variant="outlined" onClick={() => setTabIndex(2)}>Next: Schedule & Location</Button>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabIndex} index={2}>
              {/* Schedule & Location */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Schedule & Location</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Confirm preferred date and provide any access instructions for the technician.
              </Typography>

              <TextField label="Preferred date" type="date" InputLabelProps={{ shrink: true }} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Address / Location details" value={address} onChange={(e) => setAddress(e.target.value)} multiline rows={3} fullWidth sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={() => setTabIndex(3)}>Next: Billing</Button>
                <Button variant="outlined" onClick={() => setTabIndex(1)}>Back</Button>
              </Box>
            </TabPanel>

            <TabPanel value={tabIndex} index={3}>
              {/* Billing */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Billing</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter billing details. Backend should return invoice and payment link.
              </Typography>

              <TextField label="Billing name" value={billingName} onChange={(e) => setBillingName(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Amount (PHP)" value={billingAmount} onChange={(e) => setBillingAmount(e.target.value)} sx={{ mb: 2 }} fullWidth />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleSaveBilling}>Save Billing</Button>
                <Button variant="outlined" onClick={() => setTabIndex(4)}>Mark Completed</Button>
              </Box>
            </TabPanel>

            <TabPanel value={tabIndex} index={4}>
              {/* Completed */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Completed</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Finalize and confirm completion details.
              </Typography>

              <TextField label="Completion notes" value={completedNotes} onChange={(e) => setCompletedNotes(e.target.value)} multiline rows={3} sx={{ mb: 2 }} fullWidth />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={() => handleMarkCompleted('demo-booking-id')}>Confirm Completed</Button>
                <Button variant="outlined" onClick={() => { setSelectedService(null); setActiveSection('services'); setTabIndex(0); }}>Back to Services</Button>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </>
    );
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'services': return renderServices();
      case 'bookings': return renderBookings();
      case 'history': return renderHistory();
      case 'chat': return renderChat();
      case 'booking': return renderInlineBooking();
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
            <Typography variant="caption" sx={{ color: 'white', letterSpacing: 1, fontSize: '0.7rem', textTransform: 'uppercase' }}>Property Care Experts</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar: fixed width and non-shrinking */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: themeColor, mb: 2 }}>Dashboard Menu</Typography>

            <List>
              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'services'} onClick={() => { setActiveSection('services'); setSelectedService(null); }}>
                  <ListItemIcon sx={{ color: themeColor }}><Build /></ListItemIcon>
                  <ListItemText primary="Services" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'bookings'} onClick={() => { setActiveSection('bookings'); setSelectedService(null); }}>
                  <ListItemIcon sx={{ color: themeColor }}><BookOnline /></ListItemIcon>
                  <ListItemText primary="Current Booking" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'history'} onClick={() => { setActiveSection('history'); setSelectedService(null); }}>
                  <ListItemIcon sx={{ color: themeColor }}><History /></ListItemIcon>
                  <ListItemText primary="History" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton selected={activeSection === 'chat'} onClick={() => { setActiveSection('chat'); setSelectedService(null); }}>
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

        {/* Main content area: flexible and stable */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
          {/* If a service is selected we show the inline booking view; otherwise show the activeSection content */}
          {selectedService ? renderInlineBooking() : renderMainContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
  