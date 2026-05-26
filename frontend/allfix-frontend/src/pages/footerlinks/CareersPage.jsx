import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
  TextField,
  Grid,
  MenuItem,
  Card,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BuildIcon from '@mui/icons-material/Build';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SpaIcon from '@mui/icons-material/Spa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import MemoryIcon from '@mui/icons-material/Memory';

// --- FOOTER PILLS DATA ---
const footerPills = [
  { name: 'CoolFix', icon: AirIcon },
  { name: 'SaniFix', icon: WaterDropIcon },
  { name: 'HomeFix', icon: BuildIcon },
  { name: 'MoveFix', icon: Inventory2Icon },
  { name: 'GreenFix', icon: SpaIcon },
  { name: 'HealthFix', icon: FavoriteBorderIcon },
  { name: 'SpaceFix', icon: HomeOutlinedIcon },
  { name: 'TechFix', icon: MemoryIcon },
];

// --- SERVICES WITH POSITIONS DATA ---
const servicesWithPositions = [
  {
    icon: AirIcon,
    name: 'CoolFix',
    positions: ['AC Technician Specialist', 'HVAC Installation Expert', 'Emergency Response Technician'],
  },
  {
    icon: WaterDropIcon,
    name: 'SaniFix',
    positions: ['Deep Cleaning Technician', 'Sanitization Expert', 'Quality Assurance Inspector'],
  },
  {
    icon: BuildIcon,
    name: 'HomeFix',
    positions: ['Handyman/Repair Specialist', 'Renovation Project Manager', 'Electrician/Plumber'],
  },
  {
    icon: Inventory2Icon,
    name: 'MoveFix',
    positions: ['Moving & Logistics Specialist', 'Team Lead/Supervisor', 'Packing & Loading Expert'],
  },
  {
    icon: SpaIcon,
    name: 'GreenFix',
    positions: ['Eco Consultant', 'Waste Management Specialist', 'Sustainability Coordinator'],
  },
  {
    icon: FavoriteBorderIcon,
    name: 'HealthFix',
    positions: ['Health Consultant', 'Safety Inspector', 'Wellness Coordinator'],
  },
  {
    icon: HomeOutlinedIcon,
    name: 'SpaceFix',
    positions: ['Space Designer', 'Interior Specialist', 'Project Coordinator'],
  },
  {
    icon: MemoryIcon,
    name: 'TechFix',
    positions: ['IT Support Technician', 'Network Specialist', 'Systems Administrator'],
  },
];

const CareersPage = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    city: '',
    resume: null,
  });

  const [resumeName, setResumeName] = useState('No file chosen');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setResumeName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here to submit the application
    alert('Application submitted! We will review your resume shortly.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      city: '',
      resume: null,
    });
    setResumeName('No file chosen');
  };

  return (
    <>
      <CssBaseline />

      {/* Blue Navbar with gradient background */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)',
          backgroundImage: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 5 }, minHeight: '80px' }}>
          {/* Left Side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', ml: { xs: 0, md: 8, lg: 16 } }} onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
            <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix Logo" sx={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="white"
                sx={{ lineHeight: 1, mb: 0.3, transition: 'color 0.3s ease', fontSize: { xs: '1.2rem', md: '1.4rem' } }}
              >
                AllFix.ph
              </Typography>
              <Typography 
                variant="overline" 
                color="rgba(255,255,255,0.7)"
                sx={{ lineHeight: 1, fontSize: { xs: '0.65rem', md: '0.65rem' }, transition: 'color 0.3s ease', letterSpacing: 0.5 }}
              >
                PROPERTY CARE EXPERTS
              </Typography>
            </Box>
          </Box>

          {/* Right Side: Back to Home Link & Services Menu */}
          <Box sx={{ mr: { xs: 0, md: 8, lg: 16 }, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
              sx={{ 
                color: 'white',
                fontWeight: 600, 
                textTransform: 'none', 
                fontSize: '0.95rem',
                '&:hover': { color: '#eaf2fc', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                px: 2,
                py: 1,
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              Back to Home
            </Button>

            {/* Services Menu Button */}
            <Box
              sx={{ position: 'relative' }}
            >
              <IconButton
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={() => setMenuOpen(true)}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              {/* Services Dropdown Menu - Right Side */}
              {menuOpen && (
                <Box
                  onMouseLeave={() => setMenuOpen(false)}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'rgba(16, 53, 95, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    mt: 1,
                    zIndex: 999,
                    p: 3,
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)' },
                    gap: 2,
                    minWidth: '400px',
                    maxWidth: '600px',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {footerPills.map(pill => {
                    const IconComponent = pill.icon;
                    return (
                      <Box
                        key={pill.name}
                        onClick={() => {
                          const serviceData = servicesWithPositions.find(s => s.name === pill.name);
                          if (serviceData) {
                            setSelectedService(servicesWithPositions.indexOf(serviceData));
                          }
                          setMenuOpen(false);
                        }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 3,
                          py: 2.5,
                          bgcolor: 'rgba(255, 255, 255, 0.08)',
                          color: 'white',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            transform: 'translateY(-4px)',
                          }
                        }}
                      >
                        <IconComponent sx={{ fontSize: '2.5rem' }} />
                        <Typography sx={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap', textAlign: 'center' }}>
                          {pill.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', pt: 12, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="xl">
          {/* Main Content Grid */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', py: 2, flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
            {/* LEFT SIDE: Application Widget */}
            <Box sx={{ width: { xs: '100%', lg: '45%' }, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  p: { xs: 2.5, sm: 4, lg: 3 },
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  width: '100%',
                  maxWidth: { xs: '92%', sm: '540px', lg: '480px' },
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  position: 'sticky',
                  top: 120,
                }}
              >
                <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', lg: '1.3rem' }, fontWeight: 900, color: '#10355f', mb: 0.5, lineHeight: 1.2, textAlign: 'center' }}>
                  Apply Now
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.85rem', sm: '1rem', lg: '0.85rem' }, color: '#23406e', mb: 2.5, lineHeight: 1.3, textAlign: 'center', fontWeight: 600 }}>
                  Submit your application and resume for our team to review.
                </Typography>

                {/* First Name & Last Name */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                      First Name <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                      Last Name <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                    />
                  </Box>
                </Box>

                {/* Email */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                    Email Address <span style={{ color: '#e74c3c' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    required
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                  />
                </Box>

                {/* Phone & Position */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                      Phone <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+63 XXX XXXX XXX"
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                      Position <span style={{ color: '#e74c3c' }}>*</span>
                    </Typography>
                    <TextField
                      size="small"
                      select
                      fullWidth
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                    >
                      <MenuItem value="">Select Position</MenuItem>
                      {servicesWithPositions.map((service) =>
                        service.positions.map((pos) => (
                          <MenuItem key={pos} value={pos}>
                            {pos}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Box>
                </Box>

                {/* City */}
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 0.5 }}>
                    City <span style={{ color: '#e74c3c' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    select
                    fullWidth
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem', bgcolor: 'white', color: '#10355f' } }}
                  >
                    <MenuItem value="">Select City</MenuItem>
                    <MenuItem value="manila">Manila</MenuItem>
                    <MenuItem value="makati">Makati</MenuItem>
                    <MenuItem value="bgc">BGC</MenuItem>
                    <MenuItem value="quezon">Quezon City</MenuItem>
                    <MenuItem value="pasig">Pasig</MenuItem>
                    <MenuItem value="manila">Mandaluyong</MenuItem>
                  </TextField>
                </Box>

                {/* Resume Upload */}
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10355f', mb: 1 }}>
                    Upload Resume <span style={{ color: '#e74c3c' }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed #2E5BA8',
                      borderRadius: '12px',
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      bgcolor: formData.resume ? 'rgba(46, 91, 168, 0.08)' : 'rgba(46, 91, 168, 0.02)',
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(46, 91, 168, 0.12)',
                        borderColor: '#10355f',
                      }
                    }}
                    component="label"
                  >
                    <input
                      hidden
                      accept=".pdf,.doc,.docx"
                      name="resume"
                      type="file"
                      onChange={handleFileUpload}
                      required
                    />
                    <CloudUploadIcon sx={{ fontSize: '3rem', color: '#2E5BA8', mb: 1.5 }} />
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#10355f', mb: 0.75 }}>
                      {formData.resume ? resumeName : 'Click to upload or drag and drop'}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#666' }}>
                      PDF, DOC, or DOCX (Max 5MB)
                    </Typography>
                  </Box>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#10355f',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    py: 1.2,
                    borderRadius: '50px',
                    textTransform: 'none',
                    mb: 1.5,
                    mt: 1,
                    boxShadow: '0 4px 12px rgba(16,53,95,0.20)',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#0d264a', transform: 'translateY(-2px)' }
                  }}
                >
                  Submit Application
                </Button>

                <Typography sx={{ fontSize: '0.75rem', color: '#666', textAlign: 'center', mt: 2 }}>
                  Our team will review your application and get back to you within 3-5 business days.
                </Typography>
              </Box>
            </Box>

            {/* RIGHT SIDE: Services & Positions */}
            <Box sx={{ width: { xs: '100%', lg: '55%' }, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ width: '100%' }}>
                {/* Title */}
                <Typography sx={{ fontSize: { xs: '1.2rem', lg: '1.5rem' }, fontWeight: 900, color: '#10355f', mb: 1, textAlign: 'center' }}>
                  Available Positions
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.85rem', lg: '0.95rem' }, color: '#666', mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
                  for <span style={{ fontWeight: 700, color: '#10355f' }}>{servicesWithPositions[selectedService].name}</span>
                </Typography>

                {/* Positions Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {servicesWithPositions[selectedService].positions.map((position, idx) => (
                    <Card
                      key={idx}
                      sx={{
                        p: 3,
                        borderRadius: '14px',
                        border: '1px solid #eaf2fc',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0 8px 20px rgba(46,91,168,0.15)',
                          transform: 'translateY(-2px)',
                          borderColor: '#2E5BA8',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#10355f', mb: 0.5 }}>
                            {position}
                          </Typography>
                          <Typography sx={{ fontSize: '0.85rem', color: '#666', mb: 1.5, lineHeight: 1.5 }}>
                            Full-time • Metro Manila • Competitive benefits & training
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#eaf2fc', borderRadius: '50px', color: '#2E5BA8', fontSize: '0.75rem', fontWeight: 700 }}>
                              Full-time
                            </Box>
                            <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#ffe082', borderRadius: '50px', color: '#856404', fontSize: '0.75rem', fontWeight: 700 }}>
                              {servicesWithPositions[selectedService].name}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CareersPage;
