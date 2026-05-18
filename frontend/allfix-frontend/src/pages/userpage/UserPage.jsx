import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Box, AppBar, Toolbar, Button, List, ListItem,
  Divider, Grid, TextField, Paper, Stack,
  Rating, Snackbar, Alert, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Badge, Step, StepLabel, Stepper,
  MenuItem, MenuList, Grow, ClickAwayListener, Popper,
  Avatar, InputAdornment, Tooltip
} from '@mui/material';
import {
  Build, BookOnline, History, Chat, Logout,
  CheckCircle, ArrowForward, ConfirmationNumber, Event, Place,
  Person, PhotoCamera, Edit as EditIcon, Check as CheckIcon,
  Notifications as NotificationsIcon, KeyboardArrowDown, Menu as MenuIcon,
  Close as CloseIcon, Search as SearchIcon, Send as SendIcon,
  AttachMoney, AccessTime, LocationOn, Cancel as CancelIcon,
  Receipt as ReceiptIcon, Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// --- Static Constants ---
const steps = ['Service', 'Booking Details', 'Schedule & Location', 'Billing', 'Confirmed'];

const themeColor = '#123865';
const uniformAccent = '#2563eb';
const uniformAccentDark = '#1e40af';
const navbarDefault = '#0d2a4d';

const services = [
  {
    id: 'cool', brand: 'CoolFix', tagline: 'Air-con & HVAC Specialists',
    description: 'Cleaning, installation, repair, and preventive maintenance for all aircon brands and HVAC systems.',
    image: '/images/coolfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['AC Cleaning', 'Gas Recharge', 'Installation', 'Emergency Repair'],
    works: [{ task: 'AC Cleaning', rate: 1500 }, { task: 'Gas Recharge', rate: 2000 }, { task: 'Installation', rate: 5000 }, { task: 'Emergency Repair', rate: 3000 }]
  },
  {
    id: 'electro', brand: 'ElectroFix', tagline: 'Electrical & Lighting Experts',
    description: 'Safe and reliable electrical services including repairs, installations, and emergency electrical support.',
    image: '/images/electrofix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Wiring', 'Troubleshooting', 'Installation', 'Safety Inspection'],
    works: [{ task: 'Wiring', rate: 1800 }, { task: 'Troubleshooting', rate: 1200 }, { task: 'Installation', rate: 4000 }, { task: 'Safety Inspection', rate: 900 }]
  },
  {
    id: 'clean', brand: 'CleanFix', tagline: 'Deep Cleaning & Sanitization',
    description: 'Comprehensive cleaning solutions for homes and offices with eco-friendly products and professionals.',
    image: '/images/cleanfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Deep Cleaning', 'Carpet Care', 'Sanitization', 'Maintenance'],
    works: [{ task: 'Deep Cleaning', rate: 2500 }, { task: 'Carpet Care', rate: 1500 }, { task: 'Sanitization', rate: 1800 }, { task: 'Regular Maintenance', rate: 1000 }]
  },
  {
    id: 'home', brand: 'HomeFix', tagline: 'General Home Repairs',
    description: 'Reliable carpentry, electrical, painting, and plumbing services for all household needs.',
    image: '/images/homefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Carpentry', 'Electrical', 'Painting', 'Plumbing'],
    works: [{ task: 'Carpentry', rate: 2000 }, { task: 'Electrical', rate: 1800 }, { task: 'Painting', rate: 2200 }, { task: 'Plumbing', rate: 1600 }]
  },
  {
    id: 'move', brand: 'MoveFix', tagline: 'Moving & Storage Services',
    description: 'Professional moving and storage solutions for local and long-distance needs.',
    image: '/images/movefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Local Move', 'Storage Service'],
    works: [{ task: 'Local Move', rate: 4500 }, { task: 'Storage Service', rate: 2000 }]
  },
  {
    id: 'health', brand: 'HealthFix', tagline: 'Medical & Home Care',
    description: 'Trusted medical and home care services for families and individuals.',
    image: '/images/healthfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Home Care Visit', 'Medical Consultation'],
    works: [{ task: 'Home Care Visit', rate: 1500 }, { task: 'Medical Consultation', rate: 2500 }]
  },
  {
    id: 'green', brand: 'GreenFix', tagline: 'Eco & Sustainability',
    description: 'Eco-friendly solutions including garden maintenance and solar panel cleaning.',
    image: '/images/greenfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Garden Maintenance', 'Solar Panel Cleaning'],
    works: [{ task: 'Garden Maintenance', rate: 1200 }, { task: 'Solar Panel Cleaning', rate: 1800 }]
  },
  {
    id: 'space', brand: 'SpaceFix', tagline: 'Space Planning & Organization',
    description: 'Smart space planning and organization for homes and offices.',
    image: '/images/spacefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, pillText: '#333',
    services: ['Room Organization', 'Office Layout Planning'],
    works: [{ task: 'Room Organization', rate: 1500 }, { task: 'Office Layout Planning', rate: 2500 }]
  }
];

// Task #13: Standardized Booking ID format "B-0000" across all sections
const bookingsData = [
  { id: 'B-0001', serviceId: 'cool', serviceName: 'AC Cleaning', title: 'AC Cleaning', status: 'In Progress', scheduledAt: '2026-04-30', date: '2026-04-30', location: 'Quezon City', vendor: 'CoolFix Team', address: '123 Main St, Quezon City', price: '₱1,500' },
  { id: 'B-0002', serviceId: 'electro', serviceName: 'Wiring', title: 'Wiring', status: 'Confirmed', scheduledAt: '2026-04-25', date: '2026-04-25', location: 'Makati', vendor: 'ElectroFix Team', address: '456 Ayala Ave, Makati', price: '₱2,000' },
];

// Task #13: History IDs match bookingsData IDs for consistent cross-reference
const historyData = [
  { id: 'B-0001', date: '2026-04-20', serviceName: 'AC Cleaning', paidAmount: 1500, status: 'Completed' },
  { id: 'B-0002', date: '2026-04-25', serviceName: 'Wiring', paidAmount: 2000, status: 'Completed' },
];

const vendorList = [
  { id: 'v1', name: 'CoolFix Team', service: 'AC Cleaning', avatar: 'C', online: true },
  { id: 'v2', name: 'ElectroFix Team', service: 'Wiring', avatar: 'E', online: false },
  { id: 'v3', name: 'HomeFix Team', service: 'Carpentry', avatar: 'H', online: true },
];

const mockMessages = {
  v1: [
    { id: 1, from: 'vendor', text: 'Hello! How can I help you today?', time: '11:44 AM' },
    { id: 2, from: 'user', text: "I'd like to schedule an AC cleaning.", time: '11:45 AM' },
    { id: 3, from: 'vendor', text: 'Sure! What date works best for you?', time: '11:46 AM' },
  ],
  v2: [{ id: 1, from: 'vendor', text: 'Hi! Ready to assist with your electrical needs.', time: '10:00 AM' }],
  v3: [{ id: 1, from: 'vendor', text: 'Good day! How can we help with your home repairs?', time: '9:30 AM' }],
};

const navItems = [
  { id: 'services', label: 'Services', icon: Build },
  { id: 'bookings', label: 'Bookings', icon: BookOnline },
  { id: 'history', label: 'History', icon: History },
  { id: 'chat', label: 'Chat', icon: Chat },
];

const generateRefNumber = () => `REF00-${Math.floor(1000 + Math.random() * 9000)}`;

// --- Sub Component: ServiceCard ---
const ServiceCard = ({ service, onServiceClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e5e5e5',
        boxShadow: hovered
          ? '0 12px 24px rgba(0,0,0,0.15)'
          : '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // ✅ Maintain equal aspect ratio for consistency
        aspectRatio: '3 / 4',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onServiceClick(service)}
    >
      <Box sx={{ position: 'relative', height: 100, overflow: 'hidden', backgroundColor: '#f5f5f5', flexShrink: 0 }}>
        <Box component="img" src={service.image} alt={service.brand}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0.3 : 1, transition: 'opacity 0.5s ease' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: service.accent, opacity: hovered ? 0.6 : 0, transition: 'opacity 0.3s ease' }} />
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', transform: hovered ? 'scale(1)' : 'scale(0)', opacity: hovered ? 1 : 0 }}>
          <Box sx={{ width: 60, height: 60, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: service.accent, boxShadow: `0 0 20px ${service.accent}80, 0 8px 16px rgba(0,0,0,0.3)` }}>
            <Build sx={{ width: 28, height: 28, color: '#fff' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: 'relative', padding: '12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', background: service.headerBg, flexShrink: 0 }}>
        <Box sx={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
          {service.brand}
        </Box>
        <Box sx={{ width: 36, height: 36, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.15)', backgroundColor: service.accent }}>
          <Build sx={{ width: 18, height: 18, color: '#fff' }} />
        </Box>
      </Box>
      <Box sx={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: '0.95rem', color: '#000', mb: '4px' }}>{service.brand}</Typography>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: service.accent, mb: '8px' }}>{service.tagline}</Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.4, mb: '12px' }}>{service.description}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 8px', mb: '12px' }}>
            {service.services.map((tag) => (
              <Box key={tag} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle sx={{ width: 12, height: 12, color: service.accent, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: service.pillText }}>{tag}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: hovered ? service.accentDark : service.accent, transition: 'color 0.2s ease' }}>
          Book {service.brand}
          <ArrowForward sx={{ width: 14, height: 14, transition: 'transform 0.2s ease', transform: hovered ? 'translateX(3px)' : 'translateX(0)' }} />
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, height: '2px', backgroundColor: service.accent, width: hovered ? '100%' : '0%', transition: 'width 0.3s ease' }} />
    </Box>
  );
};

// --- Main Component: UserPage ---
const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesAnchorRef = useRef(null);
  const profileAnchorRef = useRef(null);
  const mobileProfileAnchorRef = useRef(null);

  const [activeSection, setActiveSection] = useState('services');
  const [notificationCount] = useState(3);

  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hasCompletedService] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const [selectedWork, setSelectedWork] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [paymentMethod, setPaymentMethod] = useState('e-wallet');
  const [bookingId] = useState('1092');
  const [serviceName] = useState('General Maintenance');
  const [taskDescription] = useState('Aircon Cleaning');
  const [totalAmount] = useState('0.00');

  const [confirmedRefNumber] = useState(generateRefNumber());

  const [profileName, setProfileName] = useState('Shan');
  const [profileEmail] = useState('Shanti.dawg@example.com');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSnackbar, setProfileSnackbar] = useState(false);
  const [profileSnackbarMessage, setProfileSnackbarMessage] = useState('');

  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  const [selectedVendor, setSelectedVendor] = useState(vendorList[0]);
  const [chatMessages, setChatMessages] = useState(mockMessages);
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [selectedVendor, chatMessages]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const handleBookService = (service) => {
    setSelectedService(service);
    setActiveSection('booking');
    setActiveStep(0);
    setSelectedWork('');
    setJobDescription('');
    setUploadedFile(null);
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const openCancelDialog = (id, e) => {
    if (e) e.stopPropagation();
    setBookingToCancel(id);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    console.log('Cancelling booking:', bookingToCancel);
    setCancelDialogOpen(false);
    setBookingToCancel(null);
    if (selectedBooking && selectedBooking.id === bookingToCancel) setSelectedBooking(null);
  };

  const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) setUploadedFile(file); };

  const handlePaymentProceed = () => {
    console.log('Payment processed:', { bookingId, amount: totalAmount, method: paymentMethod });
    setActiveStep(4);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setProfilePicture(reader.result); setProfileSnackbarMessage('Profile picture updated'); setProfileSnackbar(true); };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => { setIsEditingProfile(false); setProfileSnackbarMessage('Profile updated successfully'); setProfileSnackbar(true); };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) { alert('Passwords do not match'); return; }
    if (newPassword.length < 6) { alert('Password must be at least 6 characters'); return; }
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    setOpenPasswordDialog(false); setProfileSnackbarMessage('Password changed successfully'); setProfileSnackbar(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), from: 'user', text: messageInput.trim(), time: now };
    setChatMessages((prev) => ({ ...prev, [selectedVendor.id]: [...(prev[selectedVendor.id] || []), newMsg] }));
    setMessageInput('');
  };

  const filterBookings = (bookings) => {
    const q = bookingSearchQuery.toLowerCase();
    return bookings.filter(({ id = '', serviceName: sn = '', location = '', status = '' }) =>
      !q || id.toLowerCase().includes(q) || sn.toLowerCase().includes(q) || location.toLowerCase().includes(q) || status.toLowerCase().includes(q)
    );
  };

  const filterHistory = (history) => {
    const q = historySearchQuery.toLowerCase();
    return history.filter(({ id = '', serviceName: sn = '', status = '' }) =>
      !q || id.toLowerCase().includes(q) || sn.toLowerCase().includes(q) || status.toLowerCase().includes(q)
    );
  };

  const getSelectedRate = () => {
    if (!selectedService || !selectedWork) return null;
    return selectedService.works.find(w => w.task === selectedWork)?.rate ?? null;
  };
  const formatRate = (rate) => rate != null ? `₱${rate.toLocaleString()}` : '₱0.00';

  // ======================== SECTION RENDERERS ========================

  // Task #11: 2 rows × 4 cols on desktop (md=3 in 12-col = 4 cards/row), 2 cols tablet, 1 col mobile
  const renderServices = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}
      >
        Services
      </Typography>
    </Box>
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        px: { xs: 1.5, sm: 2, md: 3 },
        pb: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          // ✅ Ensure equal card sizing and stable alignment
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, minmax(0, 1fr))', // 1 col mobile
            sm: 'repeat(2, minmax(0, 1fr))', // 2 cols tablet
            md: 'repeat(4, minmax(0, 1fr))', // 4 cols desktop
          },
          gridAutoRows: '1fr', // ✅ Equal row heights
        }}
      >
        {services.map((service) => (
          <Box
            key={service.id}
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
            }}
          >
            <ServiceCard service={service} onServiceClick={handleBookService} />
          </Box>
        ))}
      </Grid>
    </Box>
  </Box>
);

  // Task #13: Booking Summary — Back button removed, standardized Booking ID "B-0000"
  const renderBookingSummary = (booking) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>
          Booking Summary
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 680, mx: 'auto' }}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20` }}>
            <Box sx={{ backgroundColor: themeColor, color: 'white', px: 4, py: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
                <ReceiptIcon sx={{ fontSize: 22 }} />
                <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 1 }}>BOOKING RECEIPT</Typography>
              </Box>
              <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: 1, textTransform: 'uppercase' }}>AllFix.ph — Property Care Experts</Typography>
            </Box>
            <Box sx={{ height: 16, background: `radial-gradient(circle at 50% 0%, white 5px, ${themeColor} 5px)`, backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
            <Box sx={{ px: { xs: 2, sm: 4 }, pt: 1, pb: 2, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ px: 3, py: 0.8, borderRadius: 99, fontWeight: 700, fontSize: '0.85rem', color: '#fff', backgroundColor: booking.status === 'Confirmed' || booking.status === 'Completed' ? '#16a34a' : '#f59e0b' }}>
                {booking.status}
              </Box>
            </Box>
            <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
              {[
                { label: 'Reference Number', value: `REF00-${booking.id.replace(/\D/g, '').padStart(4, '0')}` },
                { label: 'Booking ID', value: `Booking ID: ${booking.id}` },
                { label: 'Service', value: booking.serviceName },
                { label: 'Location', value: booking.address || booking.location },
                { label: 'Date & Time', value: booking.scheduledAt },
                { label: 'Payment Method', value: 'E-Wallet' },
                { label: 'Amount Paid', value: booking.price || '₱0.00', highlight: true },
              ].map((row, idx, arr) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>{row.label}</Typography>
                  <Typography variant="body2" fontWeight={row.highlight ? 800 : 600} sx={{ color: row.highlight ? themeColor : '#1e293b', fontSize: row.highlight ? '1rem' : undefined }}>
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ mx: 3, borderTop: '2px dashed #e2e8f0' }} />
            <Box sx={{ px: { xs: 2, sm: 4 }, py: 2.5, textAlign: 'center', backgroundColor: `${themeColor}04` }}>
              <Typography variant="caption" color="text.secondary">Thank you for choosing AllFix.ph! For concerns, contact support.</Typography>
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button variant="contained" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedBooking(null); }}
              sx={{ backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, borderRadius: 3, textTransform: 'none', fontWeight: 600, py: 1.2 }}>
              View Bookings
            </Button>
            <Button variant="outlined" fullWidth startIcon={<CancelIcon />} onClick={(e) => openCancelDialog(booking.id, e)}
              sx={{ borderColor: '#dc2626', color: '#dc2626', borderRadius: 3, fontWeight: 600, textTransform: 'none', py: 1.2, '&:hover': { backgroundColor: '#dc2626', color: 'white' } }}>
              Cancel Booking
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderBookings = () => {
    if (selectedBooking) return renderBookingSummary(selectedBooking);
    const filteredBookings = filterBookings(bookingsData);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>Current Bookings</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2, backgroundColor: `${themeColor}10`, flex: 1 }}>
              <Typography variant="body1" fontWeight={600} sx={{ color: themeColor }}>You have {bookingsData.length} active booking{bookingsData.length > 1 ? 's' : ''}</Typography>
              <Typography variant="body2" color="text.secondary">Last updated: {new Date().toLocaleDateString()}</Typography>
            </Box>
            <TextField variant="outlined" size="small" placeholder="Search bookings..." value={bookingSearchQuery} onChange={(e) => setBookingSearchQuery(e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 20 }} /></InputAdornment> }}
            />
          </Box>
          {filteredBookings.length > 0 ? (
            <Stack spacing={2}>
              {filteredBookings.map((booking) => (
                <Paper key={booking.id} onClick={() => setSelectedBooking(booking)}
                  sx={{ p: 0, borderRadius: 3, border: `1px solid ${themeColor}30`, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' } }}>
                  <Box sx={{ height: 8, background: themeColor }} />
                  <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
                    <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                      {/* Task #13: Booking ID in standardized format */}
                      <Typography variant="h6" fontWeight={700} sx={{ color: themeColor, display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                        <ConfirmationNumber fontSize="small" /> Booking ID: {booking.id}
                      </Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Build fontSize="small" /> Service: {booking.serviceName}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <Event fontSize="small" /> Date: {booking.date}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <Place fontSize="small" /> Location: {booking.location}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 1, width: { xs: '100%', md: 'auto' } }}>
                      <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minWidth: 100, px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem', fontWeight: 600, color: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', backgroundColor: booking.status === 'Confirmed' || booking.status === 'Completed' ? '#16a34a' : booking.status === 'In Progress' ? '#6b7280' : '#f59e0b' }}>
                        {booking.status}
                      </Box>
                      <Button variant="contained" size="small" onClick={(e) => openCancelDialog(booking.id, e)}
                        sx={{ width: { xs: '100%', md: 100 }, backgroundColor: '#dc2626', color: '#fff', textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2, '&:hover': { backgroundColor: '#b71c1c' }, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 3 }}>No bookings found.</Typography>
          )}
        </Box>
      </Box>
    );
  };

  const renderHistory = () => {
    const filteredHistory = filterHistory(historyData);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>Booking History</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2, backgroundColor: `${themeColor}10`, flex: 1 }}>
              <Typography variant="body1" fontWeight={600} sx={{ color: themeColor }}>You have {historyData.length} past booking{historyData.length > 1 ? 's' : ''}</Typography>
            </Box>
            <TextField variant="outlined" size="small" placeholder="Search history..." value={historySearchQuery} onChange={(e) => setHistorySearchQuery(e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 20 }} /></InputAdornment> }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 6px 12px rgba(0,0,0,0.15)', overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: `${themeColor}15` }}>
                  <TableCell sx={{ fontWeight: 700 }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Paid Amount</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => (
                    <TableRow key={item.id} sx={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#f9fafb', '&:hover': { backgroundColor: `${themeColor}10`, cursor: 'pointer' } }}>
                      {/* Task #13: History displays same standardized Booking ID */}
                      <TableCell sx={{ fontWeight: 600 }}>Booking ID: {item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.serviceName}</TableCell>
                      <TableCell>{item.paidAmount ? `₱${item.paidAmount.toLocaleString()}` : 'N/A'}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minWidth: 100, px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem', fontWeight: 600, color: '#fff', backgroundColor: item.status === 'Completed' ? '#16a34a' : '#6b7280' }}>
                          {item.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>No records found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  // Task #14: Three-column layout — Calendar | Messages | Vendor List (right)
  // "Select Vendor" label removed; vendor list is a dedicated right-side column
  const renderChat = () => {
    const currentMessages = chatMessages[selectedVendor.id] || [];
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>
            Chat with Vendor
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'hidden', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2, height: '100%' }}>

            {/* Column 1: Booking Calendar */}
            <Paper sx={{
              flex: '0 0 auto', width: { xs: '100%', lg: 272 },
              p: 2.5, borderRadius: 3, display: 'flex', flexDirection: 'column',
              boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15`,
              minHeight: { xs: 280, lg: 'unset' },
            }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: themeColor }}>Booking Calendar</Typography>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateCalendar value={selectedDate} onChange={(d) => setSelectedDate(d)}
                    sx={{ width: '100%', maxWidth: 272, '& .MuiPickersDay-root': { fontSize: '0.78rem' }, '& .MuiPickersDay-root.Mui-selected': { backgroundColor: themeColor } }}
                  />
                </LocalizationProvider>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Current Time</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: themeColor }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Paper>

            {/* Column 2: Active Chat / Messages */}
            <Paper sx={{
              flex: 1, borderRadius: 3, display: 'flex', flexDirection: 'column',
              overflow: 'hidden', boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15`,
              minHeight: { xs: 380, lg: 'unset' },
            }}>
              {/* Active vendor header */}
              <Box sx={{ px: 2.5, py: 1.8, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${themeColor}10`, backgroundColor: `${themeColor}04` }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, backgroundColor: themeColor, fontSize: '0.9rem', fontWeight: 700 }}>
                    {selectedVendor.avatar}
                  </Avatar>
                  <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: selectedVendor.online ? '#16a34a' : '#9ca3af', border: '2px solid white' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ color: themeColor }}>{selectedVendor.name}</Typography>
                  <Typography variant="caption" sx={{ color: selectedVendor.online ? '#16a34a' : 'text.secondary', fontWeight: 600 }}>
                    {selectedVendor.online ? '● Online' : '○ Offline'} · {selectedVendor.service}
                  </Typography>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5, backgroundColor: '#f8fafc' }}>
                {currentMessages.map((msg) => (
                  <Box key={msg.id} sx={{ display: 'flex', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 1 }}>
                    {msg.from === 'vendor' && (
                      <Avatar sx={{ width: 28, height: 28, backgroundColor: themeColor, fontSize: '0.7rem', flexShrink: 0 }}>{selectedVendor.avatar}</Avatar>
                    )}
                    <Box sx={{ maxWidth: '72%' }}>
                      <Box sx={{
                        px: 2, py: 1.2,
                        borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        backgroundColor: msg.from === 'user' ? themeColor : 'white',
                        color: msg.from === 'user' ? 'white' : '#1e293b',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{msg.text}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary', textAlign: msg.from === 'user' ? 'right' : 'left', px: 0.5 }}>
                        {msg.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <div ref={chatEndRef} />
              </Box>

              {/* Input */}
              <Box sx={{ px: 2, py: 1.5, borderTop: `1px solid ${themeColor}10`, backgroundColor: 'white', display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField variant="outlined" size="small" placeholder="Type a message..." fullWidth value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, backgroundColor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: themeColor } } }}
                />
                <IconButton onClick={handleSendMessage} disabled={!messageInput.trim()}
                  sx={{ backgroundColor: themeColor, color: 'white', width: 40, height: 40, flexShrink: 0, '&:hover': { backgroundColor: '#0f2a4d' }, '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8' } }}>
                  <SendIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Paper>

            {/* Task #14: Column 3 — Vendor conversations list (right side), no "Select Vendor" label */}
            <Paper sx={{
              flex: '0 0 auto', width: { xs: '100%', lg: 210 },
              borderRadius: 3, display: 'flex', flexDirection: 'column',
              overflow: 'hidden', boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15`,
              minHeight: { xs: 160, lg: 'unset' },
            }}>
              <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${themeColor}10`, backgroundColor: `${themeColor}04` }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: themeColor }}>Conversations</Typography>
              </Box>
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {vendorList.map((vendor, idx) => {
                  const isSelected = selectedVendor.id === vendor.id;
                  const lastMsg = (chatMessages[vendor.id] || []).slice(-1)[0];
                  return (
                    <Box key={vendor.id} onClick={() => setSelectedVendor(vendor)}
                      sx={{
                        px: 1.5, py: 1.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                        borderBottom: idx < vendorList.length - 1 ? `1px solid ${themeColor}08` : 'none',
                        backgroundColor: isSelected ? `${themeColor}10` : 'transparent',
                        borderLeft: isSelected ? `3px solid ${themeColor}` : '3px solid transparent',
                        transition: 'all 0.15s ease',
                        '&:hover': { backgroundColor: `${themeColor}08` }
                      }}
                    >
                      <Box sx={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar sx={{ width: 34, height: 34, backgroundColor: isSelected ? themeColor : `${themeColor}25`, color: isSelected ? 'white' : themeColor, fontSize: '0.82rem', fontWeight: 700 }}>
                          {vendor.avatar}
                        </Avatar>
                        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', backgroundColor: vendor.online ? '#16a34a' : '#9ca3af', border: '1.5px solid white' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="caption" fontWeight={isSelected ? 700 : 600} sx={{ color: isSelected ? themeColor : '#334155', display: 'block', lineHeight: 1.3 }} noWrap>
                          {vendor.name}
                        </Typography>
                        {lastMsg && (
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.64rem', lineHeight: 1.2 }} noWrap>
                            {lastMsg.from === 'user' ? 'You: ' : ''}{lastMsg.text}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

          </Box>
        </Box>
      </Box>
    );
  };

  const renderProfile = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>User Profile</Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center', flex: { xs: '1', md: '0 0 auto' }, width: { md: 260 }, backgroundColor: '#f9fafb', height: 'fit-content' }}>
            <Box sx={{ position: 'relative', width: 120, height: 120, margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${themeColor}` }}>
              {profilePicture ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Person sx={{ fontSize: 60, color: themeColor }} />}
              <input accept="image/*" type="file" onChange={handleProfilePictureChange} style={{ display: 'none' }} id="profile-pic-input" />
              <Box component="label" htmlFor="profile-pic-input" sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Box sx={{ backgroundColor: themeColor, color: 'white', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', '&:hover': { backgroundColor: '#0f2a4d' } }}>
                  <PhotoCamera sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">Click to change profile picture</Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: themeColor }}>Profile Information</Typography>
              {!isEditingProfile && <IconButton onClick={() => setIsEditingProfile(true)} sx={{ color: themeColor }}><EditIcon /></IconButton>}
            </Box>
            {isEditingProfile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField fullWidth label="Full Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} variant="outlined" />
                <TextField fullWidth label="Email" value={profileEmail} disabled variant="outlined" helperText="Email cannot be changed" />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={() => setIsEditingProfile(false)} sx={{ borderColor: themeColor, color: themeColor, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Cancel</Button>
                  <Button variant="contained" onClick={handleSaveProfile} sx={{ backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' } }}>Save Changes</Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, border: `1px solid ${themeColor}30`, borderRadius: 2, backgroundColor: `${themeColor}05` }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Full Name</Typography>
                  <Typography variant="body1" fontWeight={600}>{profileName}</Typography>
                </Box>
                <Box sx={{ p: 2, border: `1px solid ${themeColor}30`, borderRadius: 2, backgroundColor: `${themeColor}05` }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Email Address (Verified)</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" fontWeight={600}>{profileEmail}</Typography>
                    <CheckIcon sx={{ color: '#16a34a', fontSize: 18 }} />
                  </Box>
                </Box>
                <Button variant="outlined" onClick={() => setOpenPasswordDialog(true)}
                  sx={{ borderColor: themeColor, color: themeColor, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: themeColor, color: 'white' } }}>
                  Change Password
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: themeColor, color: 'white', fontWeight: 700 }}>Change Password</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField fullWidth type="password" label="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} margin="normal" variant="outlined" />
          <TextField fullWidth type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} margin="normal" variant="outlined" />
          <TextField fullWidth type="password" label="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" variant="outlined" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPasswordDialog(false)} sx={{ color: themeColor }}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained" sx={{ backgroundColor: themeColor }}>Update Password</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={profileSnackbar} autoHideDuration={3000} onClose={() => setProfileSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>{profileSnackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );

  const renderReport = () => {
    if (!hasCompletedService) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: themeColor, mb: 2, textAlign: 'center' }}>No Completed Services Yet</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>You can submit feedback after completing a service.</Typography>
        </Box>
      );
    }
    const handleReportSubmit = () => {
      if (rating === 0 && recommendation.trim() === '') { alert('Please provide a rating or a recommendation before submitting.'); return; }
      console.log('Report submitted:', { rating, recommendation });
      setRating(0); setRecommendation(''); setSnackbarOpen(true);
    };
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>Service Report</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <Paper elevation={8} sx={{ mb: 4, p: 3, borderRadius: 4, textAlign: 'center', backgroundColor: uniformAccent, color: 'white' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Rate your service experience</Typography>
              <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} size="large" sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' }, '& .MuiRating-iconHover': { color: '#ffb400' } }} />
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                {rating === 0 && 'No rating yet'}{rating === 1 && 'Very Poor'}{rating === 2 && 'Poor'}{rating === 3 && 'Average'}{rating === 4 && 'Good'}{rating === 5 && 'Excellent'}
              </Typography>
            </Paper>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: themeColor }}>Share your recommendation</Typography>
              <TextField multiline rows={5} fullWidth value={recommendation} onChange={(e) => setRecommendation(e.target.value)} placeholder="Write your feedback or suggestions here..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f9fafb', p: 2 } }} />
            </Paper>
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={handleReportSubmit} sx={{ px: 5, py: 1.5, borderRadius: 3, fontWeight: 700, backgroundColor: uniformAccent, '&:hover': { backgroundColor: uniformAccentDark } }}>Submit Report</Button>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert severity="success" sx={{ width: '100%', textAlign: 'center' }}>Thank you for your feedback!</Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderJobOrderSummary = () => {
    const rate = getSelectedRate();
    return (
      <Box sx={{ flex: { xs: 1, lg: '0 0 320px' }, p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: 'fit-content', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.15)', transform: 'translateY(-2px)' } }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: themeColor }}>Job Order Summary</Typography>
        {[
          { label: 'Service', value: selectedService?.brand || 'Not selected' },
          { label: 'Task', value: selectedWork || 'Not selected' },
          { label: 'Time', value: selectedTime || 'Not set' },
          { label: 'Location', value: selectedLocation || 'Not set' },
          { label: 'Rate', value: rate != null ? formatRate(rate) : 'N/A' },
        ].map((item, idx) => (
          <Box key={idx} sx={{ p: 1.75, border: '1px solid #e2e8f0', borderRadius: 2, mb: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>{item.label}</Typography>
            <Typography variant="body2">{item.value}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderBookingFlow = () => {
    if (!selectedService) return null;
    const rate = getSelectedRate();
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white' }}>
            {`Booking ${selectedService.brand}`}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3, overflowX: 'auto' }}>
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: themeColor }}>Select the work you need:</Typography>
              {selectedService.works.map((work, i) => (
                <Box key={i} sx={{ mb: 2, p: 3, border: selectedWork === work.task ? `2px solid ${themeColor}` : '1px solid #ddd', borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: selectedWork === work.task ? '0 6px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#f5f5f5', transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' } }} onClick={() => setSelectedWork(work.task)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>{work.task}</Typography>
                    {selectedWork === work.task && <CheckCircle sx={{ color: themeColor, fontSize: 20 }} />}
                  </Box>
                  <Typography variant="body1" fontWeight={600} color="text.secondary">{work.rate > 0 ? `₱${work.rate.toLocaleString()}` : 'Request Quote'}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
                <Button variant="outlined" onClick={() => { setSelectedService(null); setSelectedWork(''); setJobDescription(''); setUploadedFile(null); setActiveStep(0); setActiveSection('services'); }} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: themeColor, color: themeColor, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Back</Button>
                <Button variant="contained" disabled={!selectedWork} onClick={() => setActiveStep(1)} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' } }}>Continue</Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: themeColor }}>Booking Details</Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Upload File / Image</Typography>
                  <Box component="label" sx={{ border: '2px dashed #cbd5e1', borderRadius: 3, bgcolor: '#f9fafb', p: 4, textAlign: 'center', cursor: 'pointer', display: 'block', '&:hover': { bgcolor: '#f1f5f9' } }}>
                    <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-file" accept="image/*,.pdf" />
                    <Typography variant="body1" fontWeight={600} color={themeColor}>Click to upload or drag & drop</Typography>
                    <Typography variant="caption" color="text.secondary">Supported formats: JPG, PNG, PDF</Typography>
                  </Box>
                  {uploadedFile && <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'success.main' }}>✓ File selected: {uploadedFile.name}</Typography>}
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Work Description</Typography>
                  <TextField fullWidth rows={6} multiline value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Describe the work needed in detail..." sx={{ bgcolor: '#f9fafb', borderRadius: 3, '& .MuiOutlinedInput-root': { p: 2, fontSize: '0.95rem' } }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
                  <Button variant="outlined" onClick={() => setActiveStep(0)} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: themeColor, color: themeColor, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Back</Button>
                  <Button variant="contained" disabled={!jobDescription} onClick={() => setActiveStep(2)} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' } }}>Continue</Button>
                </Box>
              </Box>
              {renderJobOrderSummary()}
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
              <Box sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: themeColor }}>Schedule & Location</Typography>
                <Box sx={{ p: 1.75, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Preferred Date, Time & Location</Typography>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 2 }}>
                    <Box sx={{ flex: 1, overflowX: 'auto' }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} sx={{ maxWidth: '100%', border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f9fafb', '& .MuiPickersDay-root': { fontSize: '0.875rem' } }} />
                      </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Preferred Time</Typography>
                        <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Preferred Location</Typography>
                        <TextField fullWidth value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} placeholder="Enter full address or location details..." sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
                  <Button variant="outlined" onClick={() => setActiveStep(1)} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: themeColor, color: themeColor, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Back</Button>
                  <Button variant="contained" onClick={() => setActiveStep(3)} sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' } }}>Continue</Button>
                </Box>
              </Box>
              {renderJobOrderSummary()}
            </Box>
          )}

          {activeStep === 3 && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3, alignItems: 'stretch' }}>
                <Box sx={{ flex: 1, p: 3, borderRadius: 4, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef2f6' }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: '#10355f' }}>Payment Method</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                    {['E-Wallet', 'Bank Transfer'].map((label, idx) => {
                      const id = idx === 0 ? 'e-wallet' : 'bank';
                      const isSelected = paymentMethod === id;
                      return (
                        <Box key={label} onClick={() => setPaymentMethod(id)} sx={{ flex: 1, py: 1.5, cursor: 'pointer', borderRadius: 3, textAlign: 'center', border: '2px solid', transition: '0.2s all', borderColor: isSelected ? '#10355f' : '#f1f5f9', bgcolor: isSelected ? 'rgba(16,53,95,0.04)' : '#f8fafc', color: isSelected ? '#10355f' : '#94a3b8' }}>
                          <Typography variant="caption" fontWeight={800}>{label}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3, mb: 3, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
                    <Box sx={{ textAlign: 'center', flex: { xs: '1', sm: 'auto' } }}>
                      <Box sx={{ width: { xs: '100%', sm: 120 }, height: 120, bgcolor: '#f8fafc', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', mb: 1.5, p: 1 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700}>QR CODE</Typography>
                      </Box>
                      <Typography variant="caption" fontWeight={800} sx={{ color: '#94a3b8', display: 'block' }}>{confirmedRefNumber}</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1, color: '#1e293b' }}>How to pay:</Typography>
                      {[`Scan the ${paymentMethod === 'bank' ? 'Bank' : 'E-Wallet'} QR`, `Pay exactly ${formatRate(rate)}`, 'Upload your payment receipt'].map((s, idx) => (
                        <Typography key={idx} variant="body2" sx={{ color: '#475569', mb: 0.5, fontSize: '0.85rem' }}>• {s}</Typography>
                      ))}
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="caption" fontWeight={800} color="#94a3b8" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase' }}>Proof of Payment</Typography>
                  <Button variant="outlined" component="label" fullWidth sx={{ py: 1.2, borderRadius: 3, borderStyle: 'dashed', textTransform: 'none', fontWeight: 700, color: '#64748b', fontSize: '0.8rem' }}>
                    Upload Screenshot<input type="file" hidden accept="image/*" />
                  </Button>
                </Box>
                <Box sx={{ flex: 1, p: 3, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #eef2f6', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: '#10355f' }}>Job Order Summary</Typography>
                  {[
                    { label: 'Reference Number', value: confirmedRefNumber },
                    { label: 'Booking ID', value: `Booking ID: B-${bookingId}` },
                    { label: 'Service', value: selectedService?.brand || serviceName },
                    { label: 'Task', value: selectedWork || taskDescription },
                    { label: 'Rate', value: formatRate(rate) },
                  ].map((item, i, arr) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.8, borderBottom: i < arr.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b' }}>{item.label}</Typography>
                      <Typography variant="body2" fontWeight={800} sx={{ color: '#1e293b', textAlign: 'right' }}>{item.value}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ mt: 2, p: 2.5, bgcolor: '#10355f', borderRadius: 3, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={700}>Total Payable</Typography>
                    <Typography variant="h6" fontWeight={900}>{formatRate(rate)}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" onClick={handlePaymentProceed}
                  sx={{ px: { xs: 4, sm: 10 }, py: 2, borderRadius: 99, bgcolor: '#10355f', fontWeight: 900, textTransform: 'none', fontSize: '1rem', boxShadow: '0 10px 25px rgba(16,53,95,0.2)', '&:hover': { bgcolor: '#0a264a' } }}>
                  I've Already Paid
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 4 && (
            <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20` }}>
                <Box sx={{ backgroundColor: '#16a34a', color: 'white', px: 4, py: 3, textAlign: 'center' }}>
                  <CheckCircle sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 0.5 }}>Booking Confirmed!</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>Your booking has been successfully submitted.</Typography>
                </Box>
                <Box sx={{ height: 16, background: `radial-gradient(circle at 50% 0%, white 5px, #16a34a 5px)`, backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
                <Box sx={{ px: { xs: 2, sm: 4 }, pt: 2, pb: 3 }}>
                  <Typography variant="overline" fontWeight={700} sx={{ color: themeColor, display: 'block', mb: 1.5, letterSpacing: 1 }}>Booking Summary</Typography>
                  {[
                    { label: 'Reference Number', value: confirmedRefNumber },
                    { label: 'Booking ID', value: `Booking ID: B-${bookingId}` },
                    { label: 'Service', value: selectedService?.brand },
                    { label: 'Task', value: selectedWork },
                    { label: 'Date', value: selectedDate ? selectedDate.toLocaleDateString() : 'Not set' },
                    { label: 'Time', value: selectedTime || 'Not set' },
                    { label: 'Location', value: selectedLocation || 'Not set' },
                    { label: 'Payment Method', value: paymentMethod === 'e-wallet' ? 'E-Wallet' : 'Bank Transfer' },
                    { label: 'Amount Paid', value: formatRate(rate), highlight: true },
                  ].map((item, idx, arr) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.4, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>{item.label}</Typography>
                      <Typography variant="body2" fontWeight={item.highlight ? 800 : 600} sx={{ color: item.highlight ? themeColor : '#1e293b', fontSize: item.highlight ? '1rem' : undefined }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mx: 3, borderTop: '2px dashed #e2e8f0' }} />
                <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, textAlign: 'center', backgroundColor: `${themeColor}04` }}>
                  <Typography variant="caption" color="text.secondary">Thank you for choosing AllFix.ph!</Typography>
                </Box>
              </Paper>
              <Box sx={{ display: 'flex', gap: 2, mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button variant="contained" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedService(null); }}
                  sx={{ backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, borderRadius: 3, textTransform: 'none', fontWeight: 600, py: 1.2 }}>
                  View Bookings
                </Button>
                <Button variant="outlined" fullWidth startIcon={<CancelIcon />} onClick={() => openCancelDialog(`B-${bookingId}`)}
                  sx={{ borderColor: '#dc2626', color: '#dc2626', borderRadius: 3, fontWeight: 600, textTransform: 'none', py: 1.2, '&:hover': { backgroundColor: '#dc2626', color: 'white' } }}>
                  Cancel Booking
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'services': return renderServices();
      case 'bookings': return renderBookings();
      case 'history': return renderHistory();
      case 'chat': return renderChat();
      case 'profile': return renderProfile();
      case 'booking': return renderBookingFlow();
      case 'report': return renderReport();
      default: return renderServices();
    }
  };

  const navBg = scrolled ? 'white' : navbarDefault;
  const navIconColor = 'white';
  const navTextColor = 'white';
  const navShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';

  const renderProfileDropdown = (onItemClick) => (
    <Box>
      <Box sx={{ px: 2, py: 1.5, backgroundColor: `${themeColor}08`, borderBottom: `1px solid ${themeColor}15` }}>
        <Typography variant="body2" fontWeight={700} sx={{ color: themeColor }}>{profileName}</Typography>
        <Typography variant="caption" color="text.secondary">{profileEmail}</Typography>
      </Box>
      <MenuList sx={{ p: 0.5 }}>
        <MenuItem onClick={() => { setActiveSection('profile'); setProfileMenuOpen(false); if (onItemClick) onItemClick(); }}
          sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, fontWeight: 600, fontSize: '0.875rem', color: themeColor, '&:hover': { backgroundColor: `${themeColor}10` } }}>
          <Person sx={{ fontSize: 18, mr: 1.5, color: themeColor }} />View Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
          sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, fontWeight: 600, fontSize: '0.875rem', color: '#dc2626', '&:hover': { backgroundColor: 'rgba(220,38,38,0.08)' } }}>
          <Logout sx={{ fontSize: 18, mr: 1.5, color: '#dc2626' }} />Logout
        </MenuItem>
      </MenuList>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ backgroundColor: '#dc2626', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon /> Cancel Booking
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ mb: 2.5, p: 2, borderRadius: 2, backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#dc2626', mb: 1 }}>Cancellation Policy</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• Cancellations made more than 24 hours before the scheduled service are fully refunded.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• Cancellations within 24 hours may incur a cancellation fee.</Typography>
            <Typography variant="body2" color="text.secondary">• No-shows are non-refundable.</Typography>
          </Box>
          <Typography variant="body1" fontWeight={600} sx={{ color: '#1e293b' }}>Are you sure you want to cancel this booking?</Typography>
          {bookingToCancel && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Booking ID: {bookingToCancel}</Typography>}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1.5 }}>
          <Button onClick={() => setCancelDialogOpen(false)} variant="outlined" sx={{ borderColor: themeColor, color: themeColor, borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 3, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Keep Booking</Button>
          <Button onClick={handleConfirmCancel} variant="contained" sx={{ backgroundColor: '#dc2626', borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 3, '&:hover': { backgroundColor: '#b71c1c' } }}>Yes, Cancel Booking</Button>
        </DialogActions>
      </Dialog>

      {/* ===================== NAVBAR ===================== */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1100, 
          background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)',
          backgroundImage: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backdropFilter: 'blur(20px)',
          boxShadow: navShadow,
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: '64px' }}>

          {/* Branding */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix.ph Logo" sx={{ width: { xs: 35, md: 45 }, height: { xs: 35, md: 45 }, objectFit: 'contain' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: navTextColor, lineHeight: 1, mb: 0.3, fontSize: { xs: '0.95rem', md: '1.2rem' }, transition: 'color 0.3s ease' }}>AllFix.ph</Typography>
              <Typography variant="overline" sx={{ color: navTextColor, lineHeight: 1, fontSize: '0.55rem', letterSpacing: 0.5, transition: 'color 0.3s ease' }}>YOUR ALL IN ONE SERVICE</Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <Button ref={servicesAnchorRef} onClick={() => setServicesMenuOpen((prev) => !prev)}
              endIcon={<KeyboardArrowDown sx={{ color: navIconColor, transform: servicesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />}
              sx={{ color: navTextColor, fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', px: 2, borderRadius: 2, transition: 'color 0.3s ease', '&:hover': { backgroundColor: scrolled ? 'rgba(18,56,101,0.08)' : 'rgba(255,255,255,0.12)' } }}>
              Services
            </Button>
            <Popper open={servicesMenuOpen} anchorEl={servicesAnchorRef.current} placement="bottom-end" transition disablePortal style={{ zIndex: 1200 }}>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
                  <Paper elevation={8} sx={{ borderRadius: 2, mt: 0.5, minWidth: 200, overflow: 'hidden', border: `1px solid ${themeColor}20` }}>
                    <ClickAwayListener onClickAway={() => setServicesMenuOpen(false)}>
                      <MenuList sx={{ p: 0.5 }}>
                        {services.map((service) => (
                          <MenuItem key={service.id} onClick={() => handleBookService(service)} sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, fontWeight: 600, fontSize: '0.875rem', color: themeColor, '&:hover': { backgroundColor: `${themeColor}10` } }}>
                            <Build sx={{ fontSize: 16, mr: 1.5, color: themeColor }} />{service.brand}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* Task #12: Notification Bell tooltip */}
            <Tooltip title="Notifications" arrow placement="bottom">
              <Badge badgeContent={notificationCount} color="error">
                <IconButton sx={{ color: navIconColor, transition: 'color 0.3s ease', '&:hover': { backgroundColor: scrolled ? 'rgba(18,56,101,0.08)' : 'rgba(255,255,255,0.12)' } }}>
                  <NotificationsIcon />
                </IconButton>
              </Badge>
            </Tooltip>

            {/* Task #12: Profile Icon tooltip */}
            <Box>
              <Tooltip title="Profile" arrow placement="bottom">
                <IconButton ref={profileAnchorRef} onClick={() => setProfileMenuOpen((prev) => !prev)}
                  sx={{ color: navIconColor, transition: 'color 0.3s ease', '&:hover': { backgroundColor: scrolled ? 'rgba(18,56,101,0.08)' : 'rgba(255,255,255,0.12)' } }}>
                  {profilePicture ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${navIconColor}` }} /> : <Person />}
                </IconButton>
              </Tooltip>
              <Popper open={profileMenuOpen} anchorEl={profileAnchorRef.current} placement="bottom-end" transition disablePortal style={{ zIndex: 1200 }}>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
                    <Paper elevation={8} sx={{ borderRadius: 2, mt: 0.5, minWidth: 200, overflow: 'hidden', border: `1px solid ${themeColor}20` }}>
                      <ClickAwayListener onClickAway={() => setProfileMenuOpen(false)}>{renderProfileDropdown()}</ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          </Box>

          {/* Mobile Nav */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
            {/* Task #12: Mobile notification tooltip */}
            <Tooltip title="Notifications" arrow placement="bottom">
              <Badge badgeContent={notificationCount} color="error">
                <IconButton sx={{ color: navIconColor, transition: 'color 0.3s ease' }}>
                  <NotificationsIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Box>
              {/* Task #12: Mobile profile tooltip */}
              <Tooltip title="Profile" arrow placement="bottom">
                <IconButton ref={mobileProfileAnchorRef} onClick={() => setProfileMenuOpen((prev) => !prev)} sx={{ color: navIconColor, transition: 'color 0.3s ease' }}>
                  {profilePicture ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${navIconColor}` }} /> : <Person />}
                </IconButton>
              </Tooltip>
              <Popper open={profileMenuOpen} anchorEl={mobileProfileAnchorRef.current} placement="bottom-end" transition disablePortal style={{ zIndex: 1200 }}>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
                    <Paper elevation={8} sx={{ borderRadius: 2, mt: 0.5, minWidth: 200, overflow: 'hidden', border: `1px solid ${themeColor}20` }}>
                      <ClickAwayListener onClickAway={() => setProfileMenuOpen(false)}>{renderProfileDropdown(() => setMobileMenuOpen(false))}</ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
            {/* Task #12: Mobile menu tooltip */}
            <Tooltip title="Menu" arrow placement="bottom">
              <IconButton onClick={() => setMobileMenuOpen((prev) => !prev)} sx={{ color: navIconColor, transition: 'color 0.3s ease' }}>
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        {/* Mobile Services Dropdown */}
        {mobileMenuOpen && (
          <Box sx={{ display: { xs: 'block', md: 'none' }, backgroundColor: scrolled ? 'white' : navbarDefault, borderTop: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)', px: 2, pb: 2, transition: 'background-color 0.3s ease' }}>
            <Typography variant="overline" sx={{ color: navTextColor, fontWeight: 700, px: 1, display: 'block', pt: 1.5 }}>Our Services</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1 }}>
              {services.map((service) => (
                <Button key={service.id} onClick={() => handleBookService(service)} startIcon={<Build sx={{ fontSize: 14 }} />}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 600, fontSize: '0.8rem', color: navTextColor, borderRadius: 2, px: 1.5, py: 1, border: scrolled ? `1px solid ${themeColor}20` : '1px solid rgba(255,255,255,0.2)', backgroundColor: scrolled ? `${themeColor}06` : 'rgba(255,255,255,0.06)', '&:hover': { backgroundColor: scrolled ? `${themeColor}12` : 'rgba(255,255,255,0.15)' } }}>
                  {service.brand}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </AppBar>

      {/* ===================== MAIN LAYOUT ===================== */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: mobileMenuOpen ? { xs: '200px', md: '64px' } : '64px', pb: { xs: '56px', md: 0 }, overflow: 'hidden', height: '100vh', transition: 'padding-top 0.2s ease' }}>

        {/* Sidebar */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, width: 260, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid #e2e8f0', flexDirection: 'column', justifyContent: 'flex-start', p: 2, overflowY: 'auto' }}>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id || (activeSection === 'booking' && id === 'services');
              return (
                <ListItem key={id} disablePadding>
                  <Button fullWidth startIcon={<Icon sx={{ fontSize: 22, color: isActive ? 'white' : themeColor }} />}
                    onClick={() => { setActiveSection(id); setSelectedBooking(null); }}
                    sx={{ justifyContent: 'flex-start', px: 3, py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', background: isActive ? themeColor : 'rgba(18,56,101,0.05)', color: isActive ? 'white' : themeColor, boxShadow: isActive ? '0 6px 12px rgba(0,0,0,0.2)' : 'none', '&:hover': { background: isActive ? themeColor : 'rgba(18,56,101,0.1)' } }}>
                    {label}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderMainContent()}
        </Box>
      </Box>

      {/* ===================== BOTTOM NAVIGATION — Mobile ===================== */}
      <BottomNavigation
        value={navItems.some(n => n.id === activeSection) ? activeSection : false}
        onChange={(event, newValue) => { setActiveSection(newValue); setSelectedBooking(null); }}
        sx={{ display: { xs: 'flex', md: 'none' }, bgcolor: 'white', borderTop: '1px solid #e2e8f0', boxShadow: '0 -2px 8px rgba(0,0,0,0.1)', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1050, height: 56 }}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <BottomNavigationAction key={id} label={label} value={id}
            icon={<Icon sx={{ color: activeSection === id ? themeColor : '#94a3b8', fontSize: 22 }} />}
            sx={{ color: activeSection === id ? themeColor : '#94a3b8', minWidth: 0, px: 0.5, '& .MuiBottomNavigationAction-label': { fontSize: '0.6rem', marginTop: '2px' } }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default UserPage;

