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

const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const themeColor = '#123865';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Services data (all 8 services)
  const services = [
    {
      id: 'cool',
      name: 'CoolFix',
      desc: 'Air-con & HVAC Specialists',
      icon: <AcUnit fontSize="large" />,
      subs: ['AC Cleaning', 'Gas Recharge', 'Installation', 'Emergency Repair'],
    },
    {
      id: 'sani',
      name: 'SaniFix',
      desc: 'Plumbing & Sanitation Experts',
      icon: <CleanHands fontSize="large" />,
      subs: ['Leak Repair', 'Pipe Work', 'Drain Cleaning', 'Waterproofing'],
    },
    {
      id: 'home',
      name: 'HomeFix',
      desc: 'General Home Repairs',
      icon: <HomeRepairService fontSize="large" />,
      subs: ['Carpentry', 'Electrical', 'Painting', 'Tiling'],
    },
    {
      id: 'tech',
      name: 'TechFix',
      desc: 'IT & Electronics Support',
      icon: <Computer fontSize="large" />,
      subs: ['CCTV Setup', 'PC Repair', 'Network/WiFi', 'Smart Home'],
    },
    {
      id: 'move',
      name: 'MoveFix',
      desc: 'Moving & Storage Services',
      icon: <LocalShipping fontSize="large" />,
      subs: ['Local Moving', 'Storage', 'Packing', 'Organization'],
    },
    {
      id: 'health',
      name: 'HealthFix',
      desc: 'Medical & Home Care',
      icon: <MonitorHeart fontSize="large" />,
      subs: ['Consultation', 'Wellness', 'Home Care', 'Senior Care'],
    },
    {
      id: 'green',
      name: 'GreenFix',
      desc: 'Eco & Sustainability',
      icon: <Grass fontSize="large" />,
      subs: ['Waste Audit', 'Recycling Guide', 'Composting Setup', 'Eco Consulting'],
    },
    {
      id: 'space',
      name: 'SpaceFix',
      desc: 'Space Planning & Organization',
      icon: <SquareFoot fontSize="large" />,
      subs: ['Planning', 'Declutter', 'Layout Optimization'],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ bgcolor: themeColor }}>
        <Toolbar sx={{ justifyContent: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: 'white', mb: 0.3 }}>
              AllFix.ph
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'white', letterSpacing: 1, fontSize: '0.7rem', textTransform: 'uppercase' }}
            >
              Property Care Experts
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dashboard Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar Dashboard */}
        <Box
          sx={{
            width: 500,
            bgcolor: 'white',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: themeColor, mb: 2 }}>
              Dashboard Menu
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: themeColor }}><Build /></ListItemIcon>
                  <ListItemText primary="Services" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: themeColor }}><BookOnline /></ListItemIcon>
                  <ListItemText primary="Current Booking" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: themeColor }}><History /></ListItemIcon>
                  <ListItemText primary="History" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: themeColor }}><Chat /></ListItemIcon>
                  <ListItemText primary="Chat with Vendor" primaryTypographyProps={{ sx: { color: themeColor } }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          <Box>
            <Divider sx={{ mb: 2 }} />
            <Button
              fullWidth
              variant="contained"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ bgcolor: themeColor, color: 'white', fontWeight: 600 }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: themeColor }}>
            Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item key={service.id}>
                <Card
                  sx={{
                    width: 350,
                    height: 470,
                    borderRadius: 5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {/* Photo Placeholder */}
                  <Box sx={{ height: 180, bgcolor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <ul style={{ margin: 0, paddingLeft: '50px' }}>
                      {service.subs.map((sub, i) => (
                        <li key={i} style={{ fontSize: '0.85rem', color: '#333' }}>{sub}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: themeColor, fontWeight: 600 }}
                      onClick={() => navigate(`/book/${service.id}`)} // backend-friendly route
                    >
                      Book {service.name} →
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
