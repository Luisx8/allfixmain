import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  Divider
} from '@mui/material';
import {
  Person,
  BookOnline,
  SupportAgent,
  History,
  AccessTime,
  CheckCircle,
  Cancel,
  Menu,
  AcUnit,
  Grass,
  HomeRepairService,
  Computer,
  LocalShipping,
  MonitorHeart,
  CleanHands,
  SquareFoot,
  ArrowForward
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const UserPage = () => {
  const navigate = useNavigate();
  const { logout, userAttributes } = useAuth();
  const displayName = userAttributes?.name || userAttributes?.preferred_username || 'User';
  const email = userAttributes?.email || 'No email';
  const themeColor = '#123865';

  const [activeTab, setActiveTab] = useState(0);

  // Define the specific services provided
  const services = [
    { id: 'cool', name: 'CoolFix', icon: <AcUnit />, desc: 'Aircon repair & cleaning', color: '#0ea5e9' },
    { id: 'green', name: 'GreenFix', icon: <Grass />, desc: 'Gardening & landscaping', color: '#22c55e' },
    { id: 'home', name: 'HomeFix', icon: <HomeRepairService />, desc: 'General home repairs', color: '#f59e0b' },
    { id: 'tech', name: 'TechFix', icon: <Computer />, desc: 'Gadget & IT support', color: '#6366f1' },
    { id: 'move', name: 'MoveFix', icon: <LocalShipping />, desc: 'Relocation & transport', color: '#64748b' },
    { id: 'health', name: 'HealthFix', icon: <MonitorHeart />, desc: 'Wellness & home care', color: '#ef4444' },
    { id: 'sani', name: 'SaniFix', icon: <CleanHands />, desc: 'Disinfection services', color: '#06b6d4' },
    { id: 'space', name: 'SpaceFix', icon: <SquareFoot />, desc: 'Interior & organizing', color: '#8b5cf6' },
  ];

  const tabs = [
    { label: 'All', icon: <History />, count: 0 },
    { label: 'In Progress', icon: <AccessTime />, count: 0 },
    { label: 'Completed', icon: <CheckCircle />, count: 0 },
    { label: 'Canceled', icon: <Cancel />, count: 0 }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/book/${serviceId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Navigation Header */}
      <AppBar position="sticky" sx={{ bgcolor: themeColor, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: 'white' }}><Menu /></IconButton>
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>AllFix.ph</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Service Booking Platform</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600}>{displayName}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>{email}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'white', color: themeColor }}><Person /></Avatar>
            </Box>
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{ bgcolor: 'white', color: themeColor, fontWeight: 700, '&:hover': { bgcolor: '#f1f5f9' } }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Welcome Banner */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
          <Typography variant="h2" fontWeight={800} sx={{ color: themeColor, mb: 1 }}>
            Welcome back, {displayName}!
          </Typography>
          <Typography variant="h3" color="text.secondary" fontWeight={400}>
            What can we fix for you today?
          </Typography>
        </Box>

        {/* Services Grid Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: '#334155', display: 'flex', alignItems: 'center', gap: 1 }}>
            Available Services <Chip label="Book Now" size="small" color="primary" sx={{ fontWeight: 700, height: 20 }} />
          </Typography>
          <Grid container spacing={2}>
            {services.map((service) => (
              <Grid item xs={6} sm={4} md={3} key={service.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 4, 
                    border: '1px solid #e2e8f0', 
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: service.color, boxShadow: `0 10px 20px ${service.color}15` }
                  }}
                >
                  <CardActionArea onClick={() => handleServiceClick(service.id)} sx={{ p: 3 }}>
                    <Box sx={{ color: service.color, mb: 2, display: 'flex', bgcolor: `${service.color}10`, p: 1.5, borderRadius: 2, width: 'fit-content' }}>
                      {service.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700}>{service.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, height: 35 }}>
                      {service.desc}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5, color: service.color }}>
                      <Typography variant="caption" fontWeight={700}>SELECT</Typography>
                      <ArrowForward sx={{ fontSize: 14 }} />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Action Shortcuts */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: themeColor, color: 'white' }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Need help immediately?</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Our customer service is available 24/7.</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<SupportAgent />}
                onClick={() => window.open('mailto:support@allfix.ph')}
                sx={{ bgcolor: 'white', color: themeColor, fontWeight: 700 }}
              >
                Contact Support
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${themeColor}20` }}>
              <Box>
                <Typography variant="h6" fontWeight={700} color={themeColor}>Track Bookings</Typography>
                <Typography variant="body2" color="text.secondary">View your active and past service requests.</Typography>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<BookOnline />}
                onClick={() => navigate('/my-bookings')}
                sx={{ borderColor: themeColor, color: themeColor, fontWeight: 700 }}
              >
                My Bookings
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Activity Section */}
        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: '#f1f5f9' }}>
            <Typography variant="h6" fontWeight={700} color={themeColor}>Recent Bookings</Typography>
          </Box>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)}
            sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab, i) => (
              <Tab 
                key={i} 
                icon={tab.icon} 
                iconPosition="start" 
                label={`${tab.label} (${tab.count})`} 
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            ))}
          </Tabs>
          <Box sx={{ p: 8, textAlign: 'center' }}>
            <Box sx={{ mb: 2, opacity: 0.2 }}><History sx={{ fontSize: 60 }} /></Box>
            <Typography variant="h6" color="text.secondary">No bookings to display yet.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>When you book a service, it will appear here.</Typography>
            <Button variant="contained" sx={{ bgcolor: themeColor, px: 4 }} onClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}>
              Start Booking
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserPage;