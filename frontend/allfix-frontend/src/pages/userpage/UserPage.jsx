import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Box, AppBar, Toolbar, Button, List, ListItem,
  Divider, TextField, Paper, Stack,
  Rating, Snackbar, Alert, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Badge, Step, StepLabel, Stepper,
  MenuItem, MenuList, Grow, ClickAwayListener, Popper,
  Avatar, InputAdornment, Tooltip, Chip, Collapse,
} from '@mui/material';
import {
  Build, BookOnline, History, Logout,
  CheckCircle, ArrowForward, ConfirmationNumber, Event, Place,
  Person, PhotoCamera, Edit as EditIcon, Check as CheckIcon,
  Notifications as NotificationsIcon, Menu as MenuIcon,
  Close as CloseIcon, Search as SearchIcon, Send as SendIcon,
  Cancel as CancelIcon, Receipt as ReceiptIcon, Warning as WarningIcon,
  Message as MessageIcon,
  Dashboard as DashboardIcon,
  Chat as ChatBubbleIcon,
  EventNote as EventNoteIcon,
  Update as UpdateIcon,
  SystemUpdate as SystemUpdateIcon,
  AcUnit, DevicesOther, CleaningServices, HomeRepairService,
  LocalShipping, LocalHospital, Yard, Inventory2,
  Download as DownloadIcon,
  NotificationsActive as NotificationsActiveIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  HelpOutline as HelpOutlineIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ReportProblem as ReportProblemIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ContactSupport as ContactSupportIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Payment as PaymentIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// ─── Theme Constants ──────────────────────────────────────────────────────────
const themeColor = '#123865';
const navbarDefault = '#0d2a4d';
const uniformAccent = '#2563eb';
const uniformAccentDark = '#1e40af';

// ─── Booking Stepper Labels ───────────────────────────────────────────────────
const BOOKING_STEPS = ['Service', 'Booking Details', 'Schedule & Location', 'Billing', 'Confirmed'];

// ─── Service Catalog ──────────────────────────────────────────────────────────
const services = [
  {
    id: 'cool', brand: 'CoolFix', tagline: 'Air-con & HVAC Specialists',
    description: 'Cleaning, installation, repair, and preventive maintenance for all aircon brands and HVAC systems.',
    image: '/images/coolfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: AcUnit,
    services: ['AC Cleaning', 'Gas Recharge', 'Installation', 'Emergency Repair'],
    works: [{ task: 'AC Cleaning', rate: 1500 }, { task: 'Gas Recharge', rate: 2000 }, { task: 'Installation', rate: 5000 }, { task: 'Emergency Repair', rate: 3000 }],
  },
  {
    id: 'techfix', brand: 'TechFix', tagline: 'Electrical & Lighting Experts',
    description: 'Safe and reliable electrical services including repairs, installations, and emergency electrical support.',
    image: '/images/techfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: DevicesOther,
    services: ['Wiring', 'Troubleshooting', 'Installation', 'Safety Inspection'],
    works: [{ task: 'Wiring', rate: 1800 }, { task: 'Troubleshooting', rate: 1200 }, { task: 'Installation', rate: 4000 }, { task: 'Safety Inspection', rate: 900 }],
  },
  {
    id: 'sanifix', brand: 'SaniFix', tagline: 'Deep Cleaning & Sanitization',
    description: 'Comprehensive cleaning solutions for homes and offices with eco-friendly products and professionals.',
    image: '/images/sanifix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: CleaningServices,
    services: ['Deep Cleaning', 'Carpet Care', 'Sanitization', 'Maintenance'],
    works: [{ task: 'Deep Cleaning', rate: 2500 }, { task: 'Carpet Care', rate: 1500 }, { task: 'Sanitization', rate: 1800 }, { task: 'Regular Maintenance', rate: 1000 }],
  },
  {
    id: 'home', brand: 'HomeFix', tagline: 'General Home Repairs',
    description: 'Reliable carpentry, electrical, painting, and plumbing services for all household needs.',
    image: '/images/homefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: HomeRepairService,
    services: ['Carpentry', 'Electrical', 'Painting', 'Plumbing'],
    works: [{ task: 'Carpentry', rate: 2000 }, { task: 'Electrical', rate: 1800 }, { task: 'Painting', rate: 2200 }, { task: 'Plumbing', rate: 1600 }],
  },
  {
    id: 'move', brand: 'MoveFix', tagline: 'Moving & Storage Services',
    description: 'Professional moving and storage solutions for local and long-distance needs.',
    image: '/images/movefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: LocalShipping,
    services: ['Local Move', 'Storage Service'],
    works: [{ task: 'Local Move', rate: 4500 }, { task: 'Storage Service', rate: 2000 }],
  },
  {
    id: 'health', brand: 'HealthFix', tagline: 'Medical & Home Care',
    description: 'Trusted medical and home care services for families and individuals.',
    image: '/images/healthfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: LocalHospital,
    services: ['Home Care Visit', 'Medical Consultation'],
    works: [{ task: 'Home Care Visit', rate: 1500 }, { task: 'Medical Consultation', rate: 2500 }],
  },
  {
    id: 'green', brand: 'GreenFix', tagline: 'Eco & Sustainability',
    description: 'Eco-friendly solutions including garden maintenance and solar panel cleaning.',
    image: '/images/greenfix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: Yard,
    services: ['Garden Maintenance', 'Solar Panel Cleaning'],
    works: [{ task: 'Garden Maintenance', rate: 1200 }, { task: 'Solar Panel Cleaning', rate: 1800 }],
  },
  {
    id: 'space', brand: 'SpaceFix', tagline: 'Space Planning & Organization',
    description: 'Smart space planning and organization for homes and offices.',
    image: '/images/spacefix.jpg', accent: themeColor, accentDark: '#0d2a4d',
    headerBg: themeColor, icon: Inventory2,
    services: ['Room Organization', 'Office Layout Planning'],
    works: [{ task: 'Room Organization', rate: 1500 }, { task: 'Office Layout Planning', rate: 2500 }],
  },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────
const bookingsData = [
  {
    id: 'B-0001', serviceId: 'cool', serviceName: 'AC Cleaning', title: 'AC Cleaning',
    status: 'In Progress', scheduledAt: '2026-04-30', date: '2026-04-30',
    location: 'Quezon City', vendor: 'CoolFix Team', address: '123 Main St, Quezon City',
    price: '₱1,500', totalAmount: 1500, paidAmount: 750, paymentType: 'half',
    paymentMethod: 'E-Wallet', isPaid: false,
  },
  {
    id: 'B-0002', serviceId: 'techfix', serviceName: 'Wiring', title: 'Wiring',
    status: 'Confirmed', scheduledAt: '2026-04-25', date: '2026-04-25',
    location: 'Makati', vendor: 'TechFix Team', address: '456 Ayala Ave, Makati',
    price: '₱2,000', totalAmount: 2000, paidAmount: 2000, paymentType: 'full',
    paymentMethod: 'Bank Transfer', isPaid: true,
  },
  // Completed booking sample data (Feature Requirement 7B)
  {
    id: 'B-0003', serviceId: 'sanifix', serviceName: 'Deep Cleaning', title: 'Deep Cleaning',
    status: 'Completed', scheduledAt: '2026-04-15', date: '2026-04-15',
    location: 'Pasig City', vendor: 'SaniFix Team', address: '789 Ortigas Ave, Pasig City',
    price: '₱2,500', totalAmount: 2500, paidAmount: 2500, paymentType: 'full',
    paymentMethod: 'E-Wallet', isPaid: true,
  },
  {
    id: 'B-0004', serviceId: 'home', serviceName: 'Plumbing', title: 'Plumbing',
    status: 'Completed', scheduledAt: '2026-04-10', date: '2026-04-10',
    location: 'Taguig', vendor: 'HomeFix Team', address: '321 BGC, Taguig',
    price: '₱1,600', totalAmount: 1600, paidAmount: 1600, paymentType: 'full',
    paymentMethod: 'Bank Transfer', isPaid: true,
  },
];

const historyData = [
  { id: 'B-0001', date: '2026-04-20', time: '10:00 AM', serviceName: 'AC Cleaning', paidAmount: 1500, status: 'Completed' },
  { id: 'B-0002', date: '2026-04-25', time: '02:30 PM', serviceName: 'Wiring', paidAmount: 2000, status: 'Completed' },
];

const vendorList = [
  { id: 'v1', name: 'CoolFix Team', service: 'AC Cleaning', avatar: 'C', online: true },
  { id: 'v2', name: 'TechFix Team', service: 'Wiring', avatar: 'T', online: false },
  { id: 'v3', name: 'HomeFix Team', service: 'Carpentry', avatar: 'H', online: true },
];

const mockMessages = {
  v1: [
    { id: 1, from: 'vendor', text: 'Hello! How can I help you today?', time: '11:44 AM', date: 'May 19, 2026' },
    { id: 2, from: 'user', text: "I'd like to schedule an AC cleaning.", time: '11:45 AM', date: 'May 19, 2026' },
    { id: 3, from: 'vendor', text: 'Sure! What date works best for you?', time: '11:46 AM', date: 'May 19, 2026' },
  ],
  v2: [{ id: 1, from: 'vendor', text: 'Hi! Ready to assist with your electrical needs.', time: '10:00 AM', date: 'May 19, 2026' }],
  v3: [{ id: 1, from: 'vendor', text: 'Good day! How can we help with your home repairs?', time: '9:30 AM', date: 'May 19, 2026' }],
};

const mockNotifications = [
  { id: 'n1', type: 'chat', icon: ChatBubbleIcon, title: 'New message', body: 'CoolFix Team: "Sure! What date works for you?"', time: '2m ago', read: false },
  { id: 'n2', type: 'booking', icon: EventNoteIcon, title: 'Booking Confirmed', body: 'Booking number: B-0002 (Wiring) has been confirmed.', time: '1h ago', read: false },
  { id: 'n3', type: 'status', icon: UpdateIcon, title: 'Service Update', body: 'AC Cleaning is now In Progress.', time: '3h ago', read: true },
  { id: 'n4', type: 'system', icon: SystemUpdateIcon, title: 'System Update', body: 'AllFix.ph has been updated to v2.1.0.', time: '1d ago', read: true },
];

const MOBILE_NAV_ITEMS = [
  { id: 'bookings', label: 'Bookings', icon: BookOnline },
  { id: 'history', label: 'History', icon: History },
  { id: 'services', label: 'Services', icon: Build, priority: true },
  { id: 'messages', label: 'Messages', icon: MessageIcon },
  { id: 'notifications', label: 'Notifications', icon: NotificationsIcon },
];

const STATUS_FILTER_LIST = ['All', 'In Progress', 'Confirmed', 'Pending', 'Completed'];

const STATUS_FILTER_COLORS = {
  All:         { active: themeColor,  bg: `${themeColor}12`, border: themeColor },
  'In Progress': { active: '#6b7280', bg: '#f3f4f6',         border: '#6b7280' },
  Confirmed:   { active: '#16a34a',  bg: '#f0fdf4',          border: '#16a34a' },
  Pending:     { active: '#d97706',  bg: '#fffbeb',          border: '#d97706' },
  Completed:   { active: '#7c3aed',  bg: '#f5f3ff',          border: '#7c3aed' },
};

// Feedback experience tags for completed bookings
const EXPERIENCE_TAGS = [
  'On time', 'Professional', 'Clean work', 'Great value',
  'Friendly staff', 'Would recommend', 'Fast service', 'Thorough job',
];

// ─── Stable QR Pattern ────────────────────────────────────────────────────────
const QR_CORNER_CELLS = new Set([0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48]);
const QR_INNER_CELLS  = new Set([8,9,10,15,16,17,22,23,24,29,30,31,36,37,38]);
const stableQrPattern = Array.from({ length: 49 }, (_, i) => {
  if (QR_CORNER_CELLS.has(i)) return true;
  if (QR_INNER_CELLS.has(i))  return false;
  return Math.random() > 0.5;
});

const generateRefNumber = () => `REF00-${Math.floor(1000 + Math.random() * 9000)}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getPendingAmount = (booking) => {
  if (!booking || booking.isPaid) return 0;
  return (booking.totalAmount || 0) - (booking.paidAmount || 0);
};

const formatRate = (rate) => (rate != null ? `₱${rate.toLocaleString()}` : '₱0.00');

const formatTimeWithAmPm = (timeStr) => {
  if (!timeStr) return '';
  const [hourStr, minStr] = timeStr.split(':');
  if (!hourStr || !minStr) return timeStr;
  const hour = parseInt(hourStr, 10);
  const min = minStr.padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${min} ${ampm}`;
};

const noScrollbar = { scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } };

// ─── Sub-Component: ServiceCard ───────────────────────────────────────────────
const ServiceCard = ({ service, onServiceClick }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon || Build;

  return (
    <Tooltip title={`Book ${service.brand}`} arrow placement="top">
      <Box
        sx={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid #e5e5e5',
          boxShadow: hovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          cursor: 'pointer', backgroundColor: '#fff',
          width: '100%', height: '100%', minHeight: 340,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onServiceClick(service)}
      >
        <Box sx={{ position: 'relative', height: 120, overflow: 'hidden', backgroundColor: '#f0f4f8', flexShrink: 0 }}>
          <Box component="img" src={service.image} alt={service.brand}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0.25 : 1, transition: 'opacity 0.5s ease' }} />
          <Box sx={{ position: 'absolute', inset: 0, background: service.accent, opacity: hovered ? 0.55 : 0, transition: 'opacity 0.3s ease' }} />
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', transform: hovered ? 'scale(1)' : 'scale(0)', opacity: hovered ? 1 : 0 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: service.accent, boxShadow: `0 0 24px ${service.accent}80, 0 8px 20px rgba(0,0,0,0.28)` }}>
              <Icon sx={{ fontSize: 30, color: '#fff' }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', px: '12px', py: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: service.headerBg, flexShrink: 0 }}>
          <Box sx={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', px: '8px', py: '4px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
            {service.brand}
          </Box>
          <Box sx={{ width: 34, height: 34, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.18)', boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }}>
            <Icon sx={{ fontSize: 17, color: '#fff' }} />
          </Box>
        </Box>
        <Box sx={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: '0.95rem', color: '#0f172a', mb: '3px' }}>{service.brand}</Typography>
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: service.accent, mb: '8px', letterSpacing: 0.2 }}>{service.tagline}</Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45, mb: '10px' }}>{service.description}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 8px', mb: '10px' }}>
              {service.services.map((tag) => (
                <Box key={tag} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle sx={{ width: 11, height: 11, color: service.accent, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.68rem', fontWeight: 500, color: '#475569' }}>{tag}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700, color: hovered ? service.accentDark : service.accent, transition: 'color 0.2s ease' }}>
            Book {service.brand}
            <ArrowForward sx={{ width: 13, height: 13, transition: 'transform 0.2s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, height: '3px', backgroundColor: service.accent, width: hovered ? '100%' : '0%', transition: 'width 0.35s ease' }} />
      </Box>
    </Tooltip>
  );
};

// ─── Sub-Component: MobileServiceCarousel ────────────────────────────────────
const MobileServiceCarousel = ({ services: serviceList, onServiceClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(serviceList.length - 1, idx));
    setActiveIndex(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: clamped * trackRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth);
    setActiveIndex(idx);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.2, mb: 0.5 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.4,
          '@keyframes swipePulseLeft': { '0%': { transform: 'translateX(6px)', opacity: 0 }, '40%': { opacity: 1 }, '100%': { transform: 'translateX(-2px)', opacity: 0 } },
          animation: 'swipePulseLeft 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}>
          {[0.15, 0.35, 0.6, 1].map((op, i) => (
            <Box key={i} sx={{ width: i === 3 ? 3 : 2, height: i === 3 ? 3 : 2, borderRadius: '50%', backgroundColor: themeColor, opacity: op }} />
          ))}
          <Box sx={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: `6px solid ${themeColor}` }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, px: 1.8, py: 0.5, borderRadius: 99, border: `1.5px solid ${themeColor}25`, backgroundColor: `${themeColor}07` }}>
          <Box sx={{
            width: 14, height: 14,
            '@keyframes fingerBounce': { '0%, 100%': { transform: 'translateX(0)' }, '30%': { transform: 'translateX(-3px)' }, '70%': { transform: 'translateX(3px)' } },
            animation: 'fingerBounce 1.8s ease-in-out infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill={themeColor}>
              <path d="M18 11V8a2 2 0 00-4 0v3h-.5V6a2 2 0 00-4 0v5h-.5V8a2 2 0 00-4 0v6c0 4 2.5 7 7 7s7-3 7-7v-3z"/>
            </svg>
          </Box>
          <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: themeColor, letterSpacing: 1.4, textTransform: 'uppercase' }}>Swipe to Explore</Typography>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.4,
          '@keyframes swipePulseRight': { '0%': { transform: 'translateX(-6px)', opacity: 0 }, '40%': { opacity: 1 }, '100%': { transform: 'translateX(2px)', opacity: 0 } },
          animation: 'swipePulseRight 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite', animationDelay: '0.15s',
        }}>
          <Box sx={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${themeColor}` }} />
          {[1, 0.6, 0.35, 0.15].map((op, i) => (
            <Box key={i} sx={{ width: i === 0 ? 3 : 2, height: i === 0 ? 3 : 2, borderRadius: '50%', backgroundColor: themeColor, opacity: op }} />
          ))}
        </Box>
      </Box>

      <Box ref={trackRef} onScroll={handleScroll}
        sx={{
          display: 'flex', overflowX: 'auto',
          scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', gap: 0,
          ...noScrollbar, mx: -1.5, px: 1.5,
        }}>
        {serviceList.map((service, idx) => {
          const Icon = service.icon || Build;
          return (
            <Box key={service.id}
              sx={{
                flex: '0 0 calc(100% - 32px)', scrollSnapAlign: 'center', mx: 1,
                borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0',
                backgroundColor: '#fff',
                boxShadow: activeIndex === idx ? '0 12px 32px rgba(18,56,101,0.22)' : '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
                transform: activeIndex === idx ? 'scale(1)' : 'scale(0.96)',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                borderColor: activeIndex === idx ? themeColor : '#e2e8f0',
              }}
              onClick={() => onServiceClick(service)}>
              <Box sx={{ position: 'relative', height: 140, backgroundColor: '#f0f4f8', overflow: 'hidden', flexShrink: 0 }}>
                <Box component="img" src={service.image} alt={service.brand} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, transparent 40%, ${service.accent}dd)` }} />
                <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: '12px', backgroundColor: service.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${service.accent}60` }}>
                    <Icon sx={{ fontSize: 22, color: '#fff' }} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: service.accent, letterSpacing: 0.2 }}>{service.brand}</Typography>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: service.accent }}>{service.tagline}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>{service.description}</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px', mt: 0.5, px: 1 }}>
                  {service.services.map((tag) => (
                    <Box key={tag} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <CheckCircle sx={{ fontSize: 11, color: service.accent, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.68rem', fontWeight: 500, color: '#475569' }}>{tag}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', mt: 'auto', pt: 1, fontSize: '0.8rem', fontWeight: 700, color: service.accent, mx: 'auto' }}>
                  Book Now <ArrowForward sx={{ fontSize: 13 }} />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', mt: 0.5 }}>
        {serviceList.map((_, idx) => (
          <Tooltip key={idx} title={`View ${serviceList[idx]?.brand}`} arrow placement="top">
            <Box onClick={() => goTo(idx)}
              sx={{
                width: activeIndex === idx ? 20 : 7, height: 7, borderRadius: 99,
                backgroundColor: activeIndex === idx ? themeColor : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: activeIndex === idx ? `0 2px 8px ${themeColor}60` : 'none',
              }} />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

// ─── Sub-Component: ServicesQuickMenu ────────────────────────────────────────
const ServicesQuickMenu = ({ onServiceClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ mt: 2.5, mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: open ? 1.5 : 0 }}>
        <Tooltip title={open ? 'Hide service list' : 'Browse all available services'} arrow placement="top">
          <Button
            onClick={() => setOpen(p => !p)}
            endIcon={open ? <ExpandLessIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18 }} />}
            sx={{
              backgroundColor: themeColor, color: 'white', borderRadius: 99,
              px: 3, py: 0.9, fontWeight: 700, fontSize: '0.82rem',
              textTransform: 'none', letterSpacing: 0.3,
              boxShadow: `0 4px 14px ${themeColor}40`,
              '&:hover': { backgroundColor: '#0f2a4d', boxShadow: `0 6px 18px ${themeColor}50` },
              transition: 'all 0.2s ease',
            }}>
            Browse All Services
          </Button>
        </Tooltip>
      </Box>
      <Collapse in={open}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 1, mt: 1,
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3, backgroundColor: `${themeColor}05`,
          border: `1px solid ${themeColor}12`,
        }}>
          {services.map((service) => {
            const Icon = service.icon || Build;
            return (
              <Tooltip key={service.id} title={`Book ${service.brand} — ${service.tagline}`} arrow placement="top">
                <Box
                  onClick={() => { onServiceClick(service); setOpen(false); }}
                  sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                    px: 1.5, py: 1.2, borderRadius: 2.5, cursor: 'pointer',
                    border: `1px solid ${themeColor}15`, backgroundColor: 'white',
                    transition: 'all 0.15s ease', textAlign: 'center',
                    '&:hover': { backgroundColor: `${themeColor}08`, borderColor: themeColor, transform: 'translateY(-2px)', boxShadow: `0 3px 10px ${themeColor}20` },
                  }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: `${themeColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon sx={{ fontSize: 18, color: themeColor }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: themeColor, lineHeight: 1.2 }}>{service.brand}</Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
};

// ─── Sub-Component: NotificationItem ─────────────────────────────────────────
const NotificationItem = ({ notif, compact = false }) => {
  const typeColors = { chat: '#2563eb', booking: '#16a34a', status: '#f59e0b', system: '#6b7280' };
  const NIcon = notif.icon;
  const color = typeColors[notif.type] || themeColor;

  return (
    <Box sx={{
      px: compact ? 1.5 : 2, py: compact ? 1.2 : 1.5, borderRadius: 2,
      backgroundColor: notif.read ? 'transparent' : `${color}0d`,
      border: notif.read ? '1px solid transparent' : `1px solid ${color}20`,
      transition: 'all 0.2s ease', cursor: 'pointer',
      '&:hover': { backgroundColor: `${themeColor}08`, transform: 'translateX(2px)' },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
        <Box sx={{ width: compact ? 28 : 36, height: compact ? 28 : 36, borderRadius: compact ? '8px' : '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${color}15` }}>
          <NIcon sx={{ fontSize: compact ? 14 : 17, color }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.5, mb: 0.3 }}>
            <Typography sx={{ fontSize: compact ? '0.72rem' : '0.82rem', fontWeight: notif.read ? 600 : 800, color: '#1e293b', lineHeight: 1.3 }} noWrap>{notif.title}</Typography>
            {!notif.read && <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />}
          </Box>
          <Typography sx={{ fontSize: compact ? '0.63rem' : '0.75rem', color: '#64748b', lineHeight: 1.4, mb: 0.3, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
            {notif.body}
          </Typography>
          <Typography sx={{ fontSize: compact ? '0.6rem' : '0.68rem', color: '#94a3b8', fontWeight: 500 }}>{notif.time}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Sub-Component: QRPaymentBlock ────────────────────────────────────────────
const QRPaymentBlock = ({ refNumber, pendingAmount, selectedMethodId, onMethodChange, onDownloadQR, proofFile, onProofUpload, showPaymentTypeInfo = null }) => (
  <Box>
    {/* Payment Method Selector */}
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
      {[{ id: 'e-wallet', label: 'E-Wallet' }, { id: 'bank', label: 'Bank Transfer' }].map(({ id, label }) => {
        const isSelected = selectedMethodId === id;
        return (
          <Tooltip key={id} title={`Pay via ${label}`} arrow placement="top">
            <Box onClick={() => onMethodChange(id)}
              sx={{
                flex: 1, py: 1.3, cursor: 'pointer', borderRadius: 2.5, textAlign: 'center',
                border: '2px solid', transition: '0.2s all',
                borderColor: isSelected ? themeColor : '#f1f5f9',
                bgcolor: isSelected ? `${themeColor}06` : '#f8fafc',
                color: isSelected ? themeColor : '#94a3b8',
              }}>
              <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.8rem' }}>{label}</Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>

    {/* QR Code + Instructions */}
    <Box sx={{ display: 'flex', gap: 2.5, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.3 }}>
        <Box sx={{ width: { xs: '100%', sm: 155 }, height: 155, bgcolor: '#f8fafc', borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px solid ${themeColor}20`, boxShadow: '0 4px 12px rgba(18,56,101,0.1)', p: 1.5, gap: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', width: 82, height: 82 }}>
            {stableQrPattern.map((filled, i) => (
              <Box key={i} sx={{ width: '100%', aspectRatio: '1', backgroundColor: filled ? themeColor : 'transparent', borderRadius: '1px' }} />
            ))}
          </Box>
          <Typography sx={{ fontSize: '0.56rem', fontWeight: 700, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.3 }}>
            {selectedMethodId === 'bank' ? 'BANK QR' : 'E-WALLET QR'}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 600, mb: 0.2 }}>Reference Number</Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: themeColor, letterSpacing: 0.5 }}>{refNumber}</Typography>
        </Box>
        {pendingAmount != null && (
          <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: themeColor }}>₱{pendingAmount.toLocaleString()}</Typography>
        )}
        <Tooltip title="Download QR code image" arrow placement="bottom">
          <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: 13 }} />} onClick={onDownloadQR} variant="outlined"
            sx={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'none', borderColor: themeColor, color: themeColor, borderRadius: 99, px: 1.4, py: 0.4, '&:hover': { backgroundColor: themeColor, color: 'white' } }}>
            Download QR
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={800} sx={{ mb: 1, color: '#1e293b', fontSize: '0.82rem' }}>How to pay:</Typography>
        {[
          `Scan the ${selectedMethodId === 'bank' ? 'Bank' : 'E-Wallet'} QR`,
          pendingAmount != null ? `Pay exactly ₱${pendingAmount.toLocaleString()}` : 'Pay the required amount',
          'Upload your payment receipt below',
        ].map((s, idx) => (
          <Typography key={idx} variant="body2" sx={{ color: '#475569', mb: 0.5, fontSize: '0.8rem' }}>• {s}</Typography>
        ))}
        {showPaymentTypeInfo}
      </Box>
    </Box>

    <Divider sx={{ mb: 2 }} />

    {/* Proof of Payment Upload */}
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" fontWeight={800} sx={{ mb: 1.2, display: 'flex', alignItems: 'center', gap: 0.5, textTransform: 'uppercase', fontSize: '0.68rem', color: proofFile ? '#16a34a' : '#94a3b8' }}>
        Proof of Payment{' '}
        <Typography component="span" sx={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>*</Typography>
        {proofFile && <CheckCircle sx={{ fontSize: 13, color: '#16a34a' }} />}
      </Typography>
      <Tooltip title={proofFile ? 'Change proof of payment image' : 'Upload your payment screenshot'} arrow placement="top">
        <Button variant="outlined" component="label" fullWidth
          sx={{ py: 1, borderRadius: 2.5, borderStyle: 'dashed', textTransform: 'none', fontWeight: 700, fontSize: '0.78rem', color: proofFile ? '#16a34a' : '#64748b', borderColor: proofFile ? '#16a34a' : '#cbd5e1', backgroundColor: proofFile ? '#f0fdf4' : 'transparent', '&:hover': { borderColor: themeColor, backgroundColor: `${themeColor}05` } }}>
          {proofFile ? `✓ ${proofFile.name}` : 'Upload Screenshot of Payment'}
          <input type="file" hidden accept="image/*" onChange={onProofUpload} />
        </Button>
      </Tooltip>
      {!proofFile && (
        <Typography sx={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 600, mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.4 }}>
          <WarningIcon sx={{ fontSize: 12 }} /> Required — please upload your proof of payment.
        </Typography>
      )}
    </Box>
  </Box>
);

// ─── Main Component: UserPage ─────────────────────────────────────────────────
const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ── Scroll state for navbar ───────────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── UI state ─────────────────────────────────────────────────────────────
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileAnchorRef = useRef(null);

  const [activeSection, setActiveSection] = useState('services');

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(mockNotifications);
  const notificationCount = notifications.filter(n => !n.read).length;
  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // ── Booking flow ──────────────────────────────────────────────────────────
  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');

  // ── Booking form fields ───────────────────────────────────────────────────
  const [selectedWork, setSelectedWork] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('e-wallet');
  const [paymentType, setPaymentType] = useState('full');

  // ── Summary payment state ─────────────────────────────────────────────────
  const [summaryPaymentMethod, setSummaryPaymentMethod] = useState('e-wallet');
  const [summaryProofOfPayment, setSummaryProofOfPayment] = useState(null);
  const [mobileHalfPayStep, setMobileHalfPayStep] = useState('receipt');

  // ── Confirmed booking ref ─────────────────────────────────────────────────
  const [bookingId] = useState('1092');
  const [confirmedRefNumber] = useState(generateRefNumber);

  // ── Profile ───────────────────────────────────────────────────────────────
  const [profileName, setProfileName] = useState('Shan');
  const [profileEmail] = useState('Shanti.dawg@test.com');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSnackbar, setProfileSnackbar] = useState(false);
  const [profileSnackbarMessage, setProfileSnackbarMessage] = useState('');
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [pendingProfilePicture, setPendingProfilePicture] = useState(null);
  const [imageConfirmOpen, setImageConfirmOpen] = useState(false);

  // ── Report / Feedback (legacy standalone section) ─────────────────────────
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ── Completed booking feedback state ─────────────────────────────────────
  const [completedFeedbackRating, setCompletedFeedbackRating] = useState(0);
  const [completedFeedbackText, setCompletedFeedbackText] = useState('');
  const [completedFeedbackTags, setCompletedFeedbackTags] = useState([]);
  const [completedFeedbackSubmitted, setCompletedFeedbackSubmitted] = useState(false);
  const [completedFeedbackSnackbar, setCompletedFeedbackSnackbar] = useState(false);

  // ── Search ────────────────────────────────────────────────────────────────
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  // ── Messages ──────────────────────────────────────────────────────────────
  const [selectedVendor, setSelectedVendor] = useState(vendorList[0]);
  const [chatMessages, setChatMessages] = useState(mockMessages);
  const [messageInput, setMessageInput] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const chatEndRef = useRef(null);

  // ── Live clock ────────────────────────────────────────────────────────────
  const [liveTime, setLiveTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to latest message on vendor/message change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedVendor, chatMessages]);

  // Reset mobile half-pay step when booking selection changes
  useEffect(() => {
    setMobileHalfPayStep('receipt');
  }, [selectedBooking]);

  // Reset completed feedback when booking changes
  useEffect(() => {
    setCompletedFeedbackRating(0);
    setCompletedFeedbackText('');
    setCompletedFeedbackTags([]);
    setCompletedFeedbackSubmitted(false);
  }, [selectedBooking]);

  // ── Derived nav colors ────────────────────────────────────────────────────
  const navBg = scrolled ? 'white' : navbarDefault;
  const navIconColor = scrolled ? themeColor : 'white';
  const navTextColor = scrolled ? themeColor : 'white';
  const navShadow = scrolled ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.2)';

  // ── Booking computed helpers ──────────────────────────────────────────────
  const getSelectedRate = () =>
    selectedService && selectedWork
      ? selectedService.works.find(w => w.task === selectedWork)?.rate ?? null
      : null;

  const getAmountToPay = (rate) => {
    if (rate == null) return null;
    return paymentType === 'half' ? Math.ceil(rate / 2) : rate;
  };

  // ── Event Handlers ────────────────────────────────────────────────────────

  const handleLogout = async () => { await logout(); navigate('/'); };

  const handleBookService = (service) => {
    setSelectedService(service);
    setActiveSection('booking');
    setActiveStep(0);
    setSelectedWork('');
    setSelectedTime('');
    setSelectedLocation('');
    setJobDescription('');
    setUploadedFile(null);
    setProofOfPayment(null);
    setSelectedDate(new Date());
    setPaymentMethod('e-wallet');
    setPaymentType('full');
    setMobileMenuOpen(false);
  };

  const openCancelDialog = (id, e) => {
    e?.stopPropagation();
    setBookingToCancel(id);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBooking?.id === bookingToCancel) setSelectedBooking(null);
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleProofOfPaymentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setProofOfPayment(file);
  };

  const handleSummaryProofOfPaymentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setSummaryProofOfPayment(file);
  };

  const handlePaymentProceed = () => setActiveStep(4);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setPendingProfilePicture(reader.result); setImageConfirmOpen(true); };
    reader.readAsDataURL(file);
  };

  const handleImageConfirm = () => {
    setProfilePicture(pendingProfilePicture);
    setPendingProfilePicture(null);
    setImageConfirmOpen(false);
    setProfileSnackbarMessage('Profile picture updated');
    setProfileSnackbar(true);
  };

  const handleImageCancel = () => { setPendingProfilePicture(null); setImageConfirmOpen(false); };

  const handleSaveProfileConfirm = () => {
    setSaveConfirmOpen(false);
    setIsEditingProfile(false);
    setProfileSnackbarMessage('Profile updated successfully');
    setProfileSnackbar(true);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) { alert('Passwords do not match'); return; }
    if (newPassword.length < 6) { alert('Password must be at least 6 characters'); return; }
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    setOpenPasswordDialog(false);
    setProfileSnackbarMessage('Password changed successfully');
    setProfileSnackbar(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const now = new Date();
    const newMsg = {
      id: Date.now(), from: 'user', text: messageInput.trim(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setChatMessages(prev => ({ ...prev, [selectedVendor.id]: [...(prev[selectedVendor.id] || []), newMsg] }));
    setMessageInput('');
  };

  const handleDownloadQR = (refNumber) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#123865'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('QR CODE', 100, 100); ctx.fillText(refNumber, 100, 120);
    const link = document.createElement('a');
    link.download = `QR-${refNumber}.png`; link.href = canvas.toDataURL(); link.click();
  };

  const handleToggleFeedbackTag = (tag) => {
    setCompletedFeedbackTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleCompletedFeedbackSubmit = () => {
    if (completedFeedbackRating === 0) { alert('Please provide a star rating before submitting.'); return; }
    setCompletedFeedbackSubmitted(true);
    setCompletedFeedbackSnackbar(true);
  };

  // ── Filters ───────────────────────────────────────────────────────────────
  const filterBookings = (bookings) => {
    const q = bookingSearchQuery.toLowerCase();
    return bookings.filter(({ id = '', serviceName = '', location = '', status = '' }) => {
      const matchSearch = !q || [id, serviceName, location, status].some(v => v.toLowerCase().includes(q));
      const matchFilter = bookingStatusFilter === 'All' || status === bookingStatusFilter;
      return matchSearch && matchFilter;
    });
  };

  const filterHistory = (history) => {
    const q = historySearchQuery.toLowerCase();
    return history.filter(({ id = '', serviceName = '', status = '' }) =>
      !q || [id, serviceName, status].some(v => v.toLowerCase().includes(q))
    );
  };

  const filteredVendors = vendorList.filter(v =>
    !messageSearchQuery || [v.name, v.service].some(s => s.toLowerCase().includes(messageSearchQuery.toLowerCase()))
  );

  // ── Shared booking action button styles ───────────────────────────────────
  const btnBase = { px: 3.5, py: 1.3, borderRadius: 3, fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', minHeight: 48, minWidth: 120 };

  const renderContinueBtn = (disabled, onClick, disabledTitle = '') => (
    <Tooltip title={disabled ? disabledTitle : 'Proceed to next step'} arrow placement="top">
      <span style={{ display: 'inline-block' }}>
        <Button variant="contained" disabled={disabled} onClick={onClick}
          sx={{ ...btnBase, backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8' } }}>
          Continue
        </Button>
      </span>
    </Tooltip>
  );

  const renderBackBtn = (onClick) => (
    <Tooltip title="Go back to previous step" arrow placement="top">
      <Button variant="outlined" onClick={onClick}
        sx={{ ...btnBase, borderColor: themeColor, color: themeColor, '&:hover': { bgcolor: themeColor, color: 'white' } }}>
        Back
      </Button>
    </Tooltip>
  );

  // ── Sidebar nav button renderer ───────────────────────────────────────────
  const renderSidebarBtn = ({ id, label, icon: Icon, badge }) => {
    const isActive = activeSection === id || (activeSection === 'booking' && id === 'services');
    return (
      <ListItem key={id} disablePadding>
        <Tooltip title={label} arrow placement="right">
          <Button fullWidth
            startIcon={
              <Box sx={{ width: 28, height: 28, borderRadius: '7px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isActive ? 'rgba(255,255,255,0.22)' : `${themeColor}0e`, transition: 'all 0.2s ease', position: 'relative' }}>
                <Icon sx={{ fontSize: 15, color: isActive ? 'white' : themeColor }} />
                {badge > 0 && (
                  <Box sx={{ position: 'absolute', top: -3, right: -3, width: 13, height: 13, borderRadius: '50%', backgroundColor: '#dc2626', color: 'white', fontSize: '0.48rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid white' }}>{badge}</Box>
                )}
              </Box>
            }
            onClick={() => { setActiveSection(id); setSelectedBooking(null); }}
            sx={{
              justifyContent: 'flex-start', px: 1.5, py: 0.9, borderRadius: 2,
              fontWeight: 700, textTransform: 'none', fontSize: '0.82rem',
              background: isActive ? themeColor : 'transparent',
              color: isActive ? 'white' : '#334155',
              boxShadow: isActive ? `0 4px 12px ${themeColor}40` : 'none',
              border: 'none', transition: 'all 0.2s ease',
              '&:hover': { background: isActive ? themeColor : `${themeColor}08`, transform: isActive ? 'none' : 'translateX(2px)' },
              gap: 1, '& .MuiButton-startIcon': { mr: 0 },
            }}>
            {label}
          </Button>
        </Tooltip>
      </ListItem>
    );
  };

  // ── Notification Bell Popup ───────────────────────────────────────────────
  const renderNotifBellPopup = () => (
    <Box sx={{ width: 320 }}>
      <Box sx={{ px: 2, py: 1.5, backgroundColor: themeColor, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsActiveIcon sx={{ fontSize: 15, color: 'white' }} />
          <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>Notifications</Typography>
          {notificationCount > 0 && (
            <Box sx={{ px: 0.8, py: 0.1, borderRadius: 99, backgroundColor: '#dc2626', color: '#fff', fontSize: '0.6rem', fontWeight: 800, lineHeight: 1.6 }}>{notificationCount}</Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {notificationCount > 0 && (
            <Typography onClick={handleMarkAllRead} sx={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'white', textDecoration: 'underline' } }}>Mark all read</Typography>
          )}
          <IconButton size="small" onClick={() => { setMobileMenuOpen(false); setActiveSection('notifications'); }}
            sx={{ color: 'rgba(255,255,255,0.8)', p: 0.5, '&:hover': { color: 'white' } }}>
            <Typography sx={{ fontSize: '0.63rem', fontWeight: 600 }}>View all</Typography>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ maxHeight: 340, overflowY: 'auto', p: 1, display: 'flex', flexDirection: 'column', gap: 0.5, ...noScrollbar }}>
        {notifications.length > 0 ? notifications.map(n => <NotificationItem key={n.id} notif={n} compact />) : (
          <Box sx={{ textAlign: 'center', py: 4 }}><Typography variant="caption" color="text.secondary">No notifications</Typography></Box>
        )}
      </Box>
    </Box>
  );

  // ── Profile Dropdown ──────────────────────────────────────────────────────
  const renderProfileDropdown = (onItemClick) => (
    <Box>
      <Box sx={{ px: 2, py: 1.5, backgroundColor: `${themeColor}08`, borderBottom: `1px solid ${themeColor}15` }}>
        <Typography variant="body2" fontWeight={700} sx={{ color: themeColor, fontSize: '0.85rem' }}>{profileName}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>{profileEmail}</Typography>
      </Box>
      <MenuList sx={{ p: 0.5 }}>
        <MenuItem onClick={() => { setActiveSection('profile'); setProfileMenuOpen(false); onItemClick?.(); }}
          sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, fontWeight: 600, fontSize: '0.82rem', color: themeColor, '&:hover': { backgroundColor: `${themeColor}10` } }}>
          <Person sx={{ fontSize: 17, mr: 1.5, color: themeColor }} />View Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
          sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, fontWeight: 600, fontSize: '0.82rem', color: '#dc2626', '&:hover': { backgroundColor: 'rgba(220,38,38,0.08)' } }}>
          <Logout sx={{ fontSize: 17, mr: 1.5, color: '#dc2626' }} />Logout
        </MenuItem>
      </MenuList>
    </Box>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION RENDERERS
  // ─────────────────────────────────────────────────────────────────────────

  const renderServices = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Services
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
        <Box sx={{ display: { xs: 'none', sm: 'grid' }, gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, gridAutoRows: '1fr' }}>
          {services.map(service => (
            <Box key={service.id} sx={{ display: 'flex' }}>
              <ServiceCard service={service} onServiceClick={handleBookService} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MobileServiceCarousel services={services} onServiceClick={handleBookService} />
        </Box>
        <ServicesQuickMenu onServiceClick={handleBookService} />
      </Box>
    </Box>
  );

  // ── Job Order Summary panel (booking flow) ────────────────────────────────
  const renderJobOrderSummary = () => {
    const rate = getSelectedRate();
    const amountToPay = getAmountToPay(rate);
    const formattedDateTime = selectedDate
      ? `${selectedDate.toLocaleDateString()} ${selectedTime ? `at ${formatTimeWithAmPm(selectedTime)}` : ''}`
      : selectedTime ? `at ${formatTimeWithAmPm(selectedTime)}` : 'Not set';

    return (
      <Box sx={{ flex: { xs: 1, lg: '0 0 300px' }, p: 2.5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: 'fit-content', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.15)', transform: 'translateY(-2px)' } }}>
        <Typography fontWeight={800} sx={{ mb: 2.5, color: themeColor, fontSize: '0.95rem' }}>Job Order Summary</Typography>
        {[
          { label: 'Service', value: selectedService?.brand || 'Not selected' },
          { label: 'Task', value: selectedWork || 'Not selected' },
          { label: 'Date & Time', value: formattedDateTime },
          { label: 'Location', value: selectedLocation || 'Not set' },
          { label: 'Service Rate', value: rate != null ? formatRate(rate) : 'N/A' },
          { label: 'Payment Type', value: paymentType === 'half' ? 'Half Payment' : 'Full Payment' },
          { label: 'Amount to Pay', value: amountToPay != null ? formatRate(amountToPay) : 'N/A', highlight: true },
        ].map((item, idx) => (
          <Box key={idx} sx={{ p: 1.5, border: `1px solid ${item.highlight ? `${themeColor}40` : '#e2e8f0'}`, borderRadius: 2, mb: 1.2, backgroundColor: item.highlight ? `${themeColor}05` : 'transparent' }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.3 }}>{item.label}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.82rem', fontWeight: item.highlight ? 800 : 600, color: item.highlight ? themeColor : 'inherit' }}>{item.value}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // ── Booking Summary: Fully Paid Receipt ───────────────────────────────────
  const renderBookingSummaryFull = (booking) => (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20` }}>
        <Box sx={{ backgroundColor: themeColor, color: 'white', px: 4, py: 2.5, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
            <ReceiptIcon sx={{ fontSize: 20 }} />
            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 1, fontSize: '1rem' }}>BOOKING RECEIPT</Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>AllFix.ph — Property Care Experts</Typography>
        </Box>
        <Box sx={{ height: 14, background: `radial-gradient(circle at 50% 0%, white 5px, ${themeColor} 5px)`, backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
        <Box sx={{ px: { xs: 2, sm: 4 }, pt: 1, pb: 1.5, display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ px: 2.5, py: 0.6, borderRadius: 99, fontWeight: 700, fontSize: '0.78rem', color: '#fff', backgroundColor: booking.status === 'Confirmed' || booking.status === 'Completed' ? '#16a34a' : '#f59e0b' }}>
            {booking.status}
          </Box>
          <Box sx={{ px: 2.5, py: 0.6, borderRadius: 99, fontWeight: 700, fontSize: '0.78rem', color: '#fff', backgroundColor: '#16a34a' }}>
            ✓ Fully Paid
          </Box>
        </Box>
        <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
          {[
            { label: 'Reference Number', value: `REF00-${booking.id.replace(/\D/g, '').padStart(4, '0')}` },
            { label: 'Booking ID', value: booking.id },
            { label: 'Service', value: booking.serviceName },
            { label: 'Location', value: booking.address || booking.location },
            { label: 'Date & Time', value: booking.scheduledAt ? `${booking.scheduledAt} at ${formatTimeWithAmPm('09:00')}` : '' },
            { label: 'Payment Method', value: booking.paymentMethod || 'E-Wallet' },
            { label: 'Payment Type', value: booking.paymentType === 'half' ? 'Half Payment' : 'Full Payment' },
            { label: 'Amount Paid', value: `₱${(booking.paidAmount || 0).toLocaleString()}`, highlight: true },
          ].map((row, idx, arr) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.3, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.8rem' }}>{row.label}</Typography>
              <Typography variant="body2" fontWeight={row.highlight ? 800 : 600} sx={{ color: row.highlight ? themeColor : '#1e293b', fontSize: row.highlight ? '0.95rem' : '0.8rem' }}>{row.value}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mx: 3, borderTop: '2px dashed #e2e8f0' }} />
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, textAlign: 'center', backgroundColor: `${themeColor}04` }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>Thank you for choosing AllFix.ph! For concerns, contact support.</Typography>
        </Box>
      </Paper>
    </Box>
  );

  // ── Completed Booking: Receipt + "How was the Service?" Feedback ──────────
  const renderCompletedBookingSummary = (booking) => {
    const ratingLabels = { 0: '', 1: 'Very Poor', 2: 'Poor', 3: 'Average', 4: 'Good', 5: 'Excellent' };
    const ratingColors = { 0: '#94a3b8', 1: '#ef4444', 2: '#f97316', 3: '#f59e0b', 4: '#22c55e', 5: '#16a34a' };

    return (
      <Box sx={{ maxWidth: 760, mx: 'auto' }}>
        {/* Receipt */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20`, mb: 3 }}>
          <Box sx={{ backgroundColor: '#7c3aed', color: 'white', px: 4, py: 2.5, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
              <CheckCircle sx={{ fontSize: 22 }} />
              <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 1, fontSize: '1rem' }}>SERVICE COMPLETED</Typography>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.85, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>AllFix.ph — Property Care Experts</Typography>
          </Box>
          <Box sx={{ height: 14, background: 'radial-gradient(circle at 50% 0%, white 5px, #7c3aed 5px)', backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
          <Box sx={{ px: { xs: 2, sm: 4 }, pt: 1, pb: 1.5, display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box sx={{ px: 2.5, py: 0.6, borderRadius: 99, fontWeight: 700, fontSize: '0.78rem', color: '#fff', backgroundColor: '#7c3aed' }}>Completed</Box>
            <Box sx={{ px: 2.5, py: 0.6, borderRadius: 99, fontWeight: 700, fontSize: '0.78rem', color: '#fff', backgroundColor: '#16a34a' }}>✓ Fully Paid</Box>
          </Box>
          <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
            {[
              { label: 'Reference Number', value: `REF00-${booking.id.replace(/\D/g, '').padStart(4, '0')}` },
              { label: 'Booking ID', value: booking.id },
              { label: 'Service', value: booking.serviceName },
              { label: 'Vendor', value: booking.vendor },
              { label: 'Location', value: booking.address || booking.location },
              { label: 'Service Date', value: booking.scheduledAt },
              { label: 'Payment Method', value: booking.paymentMethod || 'E-Wallet' },
              { label: 'Amount Paid', value: `₱${(booking.paidAmount || 0).toLocaleString()}`, highlight: true },
            ].map((row, idx, arr) => (
              <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.3, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.8rem' }}>{row.label}</Typography>
                <Typography variant="body2" fontWeight={row.highlight ? 800 : 600} sx={{ color: row.highlight ? '#7c3aed' : '#1e293b', fontSize: row.highlight ? '0.95rem' : '0.8rem' }}>{row.value}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mx: 3, borderTop: '2px dashed #e2e8f0' }} />
          <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, textAlign: 'center', backgroundColor: '#f5f3ff' }}>
            <Typography variant="caption" sx={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>Service completed successfully. Thank you for trusting AllFix.ph!</Typography>
          </Box>
        </Paper>

        {/* "How was the Service?" Feedback Section */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(124,58,237,0.12)', border: '1.5px solid #ede9fe' }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', px: { xs: 2, sm: 4 }, py: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <SentimentVerySatisfiedIcon sx={{ fontSize: 22, color: 'white' }} />
              </Box>
              <Box>
                <Typography fontWeight={800} sx={{ color: 'white', fontSize: '1rem', lineHeight: 1.3 }}>How was the Service?</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>Your feedback helps us improve. It only takes a moment!</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
            {completedFeedbackSubmitted ? (
              /* Thank-you state */
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ width: 70, height: 70, borderRadius: '50%', backgroundColor: '#f0fdf4', border: '3px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <CheckCircle sx={{ fontSize: 36, color: '#16a34a' }} />
                </Box>
                <Typography fontWeight={800} sx={{ fontSize: '1.05rem', color: '#15803d', mb: 0.8 }}>Thank You for Your Feedback!</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#64748b' }}>Your review has been submitted successfully.</Typography>
                {completedFeedbackRating > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Rating value={completedFeedbackRating} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }} />
                  </Box>
                )}
              </Box>
            ) : (
              <>
                {/* Star Rating */}
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={700} sx={{ mb: 1.5, color: '#1e293b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <StarIcon sx={{ fontSize: 18, color: '#f59e0b' }} /> Overall Rating
                    <Typography component="span" sx={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>*</Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Rating
                      value={completedFeedbackRating}
                      onChange={(_, v) => setCompletedFeedbackRating(v || 0)}
                      size="large"
                      sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' }, '& .MuiRating-iconHover': { color: '#f97316' } }}
                    />
                    {completedFeedbackRating > 0 && (
                      <Box sx={{ px: 1.5, py: 0.4, borderRadius: 99, backgroundColor: `${ratingColors[completedFeedbackRating]}18`, border: `1px solid ${ratingColors[completedFeedbackRating]}40` }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: ratingColors[completedFeedbackRating] }}>
                          {ratingLabels[completedFeedbackRating]}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {completedFeedbackRating === 0 && (
                    <Typography sx={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 600, mt: 0.8, display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <WarningIcon sx={{ fontSize: 13 }} /> Please select a star rating to continue.
                    </Typography>
                  )}
                </Box>

                {/* Experience Tags */}
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={700} sx={{ mb: 1.2, color: '#1e293b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <ThumbUpIcon sx={{ fontSize: 17, color: '#7c3aed' }} /> What went well?
                    <Typography component="span" sx={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>(Optional)</Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {EXPERIENCE_TAGS.map(tag => {
                      const selected = completedFeedbackTags.includes(tag);
                      return (
                        <Chip
                          key={tag}
                          label={tag}
                          onClick={() => handleToggleFeedbackTag(tag)}
                          size="small"
                          icon={selected ? <CheckCircle sx={{ fontSize: '14px !important', color: 'white !important' }} /> : undefined}
                          sx={{
                            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                            backgroundColor: selected ? '#7c3aed' : '#f5f3ff',
                            color: selected ? 'white' : '#7c3aed',
                            border: `1px solid ${selected ? '#7c3aed' : '#ddd6fe'}`,
                            transition: 'all 0.15s ease',
                            '&:hover': { backgroundColor: selected ? '#6d28d9' : '#ede9fe', transform: 'translateY(-1px)' },
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>

                {/* Feedback Textarea */}
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={700} sx={{ mb: 1.2, color: '#1e293b', fontSize: '0.9rem' }}>
                    Additional Comments
                    <Typography component="span" sx={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500, ml: 0.8 }}>(Optional)</Typography>
                  </Typography>
                  <TextField
                    multiline rows={4} fullWidth
                    value={completedFeedbackText}
                    onChange={e => setCompletedFeedbackText(e.target.value)}
                    placeholder="Share your experience with us — what did you love, or what could be improved?"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5, backgroundColor: '#faf8ff', fontSize: '0.85rem',
                        '& fieldset': { borderColor: '#ddd6fe' },
                        '&:hover fieldset': { borderColor: '#7c3aed' },
                        '&.Mui-focused fieldset': { borderColor: '#7c3aed' },
                      },
                    }}
                    InputProps={{
                      endAdornment: completedFeedbackText.trim() && (
                        <InputAdornment position="end" sx={{ alignSelf: 'flex-end', pb: 1 }}>
                          <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>{completedFeedbackText.length}/500</Typography>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ maxLength: 500 }}
                  />
                </Box>

                {/* Recommendation */}
                <Box sx={{ mb: 3, p: 2, borderRadius: 2.5, backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe' }}>
                  <Typography fontWeight={700} sx={{ mb: 1, color: '#7c3aed', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <ThumbUpIcon sx={{ fontSize: 16 }} /> Would you recommend us?
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                    {['Definitely', 'Maybe', 'Not sure', 'No'].map(opt => {
                      const sel = completedFeedbackTags.includes(`rec:${opt}`);
                      return (
                        <Box key={opt} onClick={() => {
                          setCompletedFeedbackTags(prev => {
                            const cleared = prev.filter(t => !t.startsWith('rec:'));
                            return sel ? cleared : [...cleared, `rec:${opt}`];
                          });
                        }}
                          sx={{
                            px: 2, py: 0.8, borderRadius: 99, cursor: 'pointer',
                            border: `1.5px solid ${sel ? '#7c3aed' : '#ddd6fe'}`,
                            backgroundColor: sel ? '#7c3aed' : 'white',
                            transition: 'all 0.15s ease',
                            '&:hover': { borderColor: '#7c3aed', backgroundColor: sel ? '#6d28d9' : '#ede9fe' },
                          }}>
                          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: sel ? 'white' : '#7c3aed' }}>{opt}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Submit button */}
                <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Tooltip title={completedFeedbackRating === 0 ? 'Please select a star rating first' : 'Submit your feedback'} arrow placement="top">
                    <span style={{ flex: 1 }}>
                      <Button
                        variant="contained" fullWidth
                        disabled={completedFeedbackRating === 0}
                        onClick={handleCompletedFeedbackSubmit}
                        startIcon={<SendIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                          borderRadius: 3, textTransform: 'none', fontWeight: 700, minHeight: 48,
                          fontSize: '0.88rem', boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                          '&:hover': { background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)' },
                          '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' },
                        }}>
                        Submit Feedback
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip title="Go back to all bookings" arrow placement="top">
                    <Button
                      variant="outlined" fullWidth
                      onClick={() => { setActiveSection('bookings'); setSelectedBooking(null); }}
                      sx={{ borderColor: themeColor, color: themeColor, borderRadius: 3, textTransform: 'none', fontWeight: 600, minHeight: 48, fontSize: '0.85rem', flex: { xs: 1, sm: '0 0 auto' }, minWidth: { sm: 160 }, '&:hover': { backgroundColor: themeColor, color: 'white' } }}>
                      View Bookings
                    </Button>
                  </Tooltip>
                </Box>
              </>
            )}
          </Box>
        </Paper>

        <Snackbar open={completedFeedbackSnackbar} autoHideDuration={3500} onClose={() => setCompletedFeedbackSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '100%', fontSize: '0.82rem' }}>Thank you! Your feedback has been submitted.</Alert>
        </Snackbar>
      </Box>
    );
  };

  // ── Booking Summary: Pending Payment (desktop) ────────────────────────────
  const renderBookingSummaryPending = (booking) => {
    const pendingAmount = getPendingAmount(booking);
    const refNumber = `REF00-${booking.id.replace(/\D/g, '').padStart(4, '0')}`;
    const isHalfPayment = booking.paymentType === 'half';

    return (
      <Box sx={{ maxWidth: 820, mx: 'auto' }}>
        {/* Mobile half-payment flow */}
        {isHalfPayment && (
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            {renderMobileHalfPaymentSummary(booking)}
          </Box>
        )}

        {/* Desktop layout */}
        <Box sx={{ display: isHalfPayment ? { xs: 'none', sm: 'block' } : 'block' }}>
          {/* Warning banner */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, mb: 2.5, borderRadius: 2.5, backgroundColor: '#fff7ed', border: '1.5px solid #fed7aa' }}>
            <Box sx={{ width: 38, height: 38, borderRadius: '10px', backgroundColor: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <WarningIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, color: '#92400e', fontSize: '0.88rem' }}>Pending Payment</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#b45309' }}>This booking has an outstanding balance. Please complete your payment.</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.68rem', color: '#b45309', fontWeight: 600 }}>Balance Due</Typography>
              <Typography sx={{ fontWeight: 900, color: '#d97706', fontSize: '1.1rem' }}>₱{pendingAmount.toLocaleString()}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2.5, alignItems: 'flex-start' }}>
            {/* Payment panel */}
            <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: 300 } }}>
              <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 4px 16px rgba(18,56,101,0.1)', border: `1px solid ${themeColor}20` }}>
                <Typography fontWeight={800} sx={{ mb: 2, color: themeColor, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <PaymentIcon sx={{ fontSize: 16 }} /> Payment Method
                </Typography>
                <QRPaymentBlock
                  refNumber={refNumber}
                  pendingAmount={pendingAmount}
                  selectedMethodId={summaryPaymentMethod}
                  onMethodChange={setSummaryPaymentMethod}
                  onDownloadQR={() => handleDownloadQR(refNumber)}
                  proofFile={summaryProofOfPayment}
                  onProofUpload={handleSummaryProofOfPaymentUpload}
                  showPaymentTypeInfo={
                    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed #e2e8f0' }}>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.5, py: 0.5, borderRadius: 99, backgroundColor: isHalfPayment ? '#fff7ed' : '#f0fdf4', border: `1px solid ${isHalfPayment ? '#fed7aa' : '#bbf7d0'}` }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isHalfPayment ? '#f59e0b' : '#16a34a' }} />
                        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: isHalfPayment ? '#d97706' : '#15803d' }}>
                          {isHalfPayment ? 'Half Payment Plan' : 'Full Payment Plan'}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </Paper>
            </Box>

            {/* Pending Receipt */}
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20` }}>
                <Box sx={{ backgroundColor: '#f59e0b', color: 'white', px: 3, py: 2, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.4 }}>
                    <WarningIcon sx={{ fontSize: 18 }} />
                    <Typography fontWeight={800} sx={{ fontSize: '0.95rem', letterSpacing: 0.5 }}>PENDING RECEIPT</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.65rem' }}>Booking ID: {booking.id}</Typography>
                </Box>
                <Box sx={{ height: 12, background: 'radial-gradient(circle at 50% 0%, white 5px, #f59e0b 5px)', backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}>
                  <Box sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: '#fff7ed', border: '1px solid #fde68a' }}>
                    {[
                      { label: 'Total Service Amount', value: `₱${(booking.totalAmount || 0).toLocaleString()}` },
                      { label: 'Amount Already Paid', value: `− ₱${(booking.paidAmount || 0).toLocaleString()}`, green: true },
                    ].map((r, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#92400e' }}>{r.label}</Typography>
                        <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: r.green ? '#16a34a' : '#1e293b' }}>{r.value}</Typography>
                      </Box>
                    ))}
                    <Divider sx={{ my: 1, borderColor: '#fde68a', borderStyle: 'dashed' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309' }}>Amount Need to Pay</Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 900, color: '#d97706' }}>₱{pendingAmount.toLocaleString()}</Typography>
                    </Box>
                  </Box>

                  {[
                    { label: 'Reference Number', value: refNumber },
                    { label: 'Service', value: booking.serviceName },
                    { label: 'Location', value: booking.address || booking.location },
                    { label: 'Scheduled Date', value: booking.scheduledAt || '' },
                    { label: 'Payment Type', value: isHalfPayment ? 'Half Payment' : 'Full Payment' },
                    { label: 'Status', value: booking.status },
                  ].map((row, idx, arr) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.78rem' }}>{row.label}</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#1e293b', fontSize: '0.78rem' }}>{row.value}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mx: 2.5, borderTop: '2px dashed #e2e8f0' }} />
                <Box sx={{ px: 3, py: 2, textAlign: 'center', backgroundColor: '#fffbeb' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Please settle your balance to proceed. Contact support for assistance.</Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  // ── Mobile Half-Payment Summary ───────────────────────────────────────────
  const renderMobileHalfPaymentSummary = (booking) => {
    const pendingAmount = getPendingAmount(booking);
    const refNumber = `REF00-${booking.id.replace(/\D/g, '').padStart(4, '0')}`;

    if (mobileHalfPayStep === 'payment') {
      return (
        <Box sx={{ px: 1.5, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Tooltip title="Back to receipt" arrow placement="top">
              <Button variant="outlined" size="small" onClick={() => setMobileHalfPayStep('receipt')}
                sx={{ borderColor: themeColor, color: themeColor, textTransform: 'none', fontWeight: 700, fontSize: '0.78rem', borderRadius: 2, minHeight: 40, px: 2, '&:hover': { bgcolor: themeColor, color: 'white' } }}>
                ← Back
              </Button>
            </Tooltip>
            <Typography sx={{ fontWeight: 800, color: themeColor, fontSize: '0.88rem' }}>Complete Payment</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, p: 1.8, mb: 2, borderRadius: 2.5, backgroundColor: '#fff7ed', border: '1.5px solid #fed7aa' }}>
            <WarningIcon sx={{ fontSize: 18, color: '#f59e0b', flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontWeight: 800, color: '#92400e', fontSize: '0.82rem' }}>Pending Balance</Typography>
              <Typography sx={{ fontWeight: 900, color: '#d97706', fontSize: '1rem' }}>₱{pendingAmount.toLocaleString()}</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1.5, mb: 2, borderRadius: 2, backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#b45309', lineHeight: 1.5 }}>
              Please settle your remaining balance before or after the service is completed to avoid any service interruption.
            </Typography>
          </Box>
          <Paper sx={{ p: 2, borderRadius: 3, border: `1px solid ${themeColor}20` }}>
            <Typography fontWeight={800} sx={{ mb: 1.5, color: themeColor, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <PaymentIcon sx={{ fontSize: 16 }} /> Payment Method
            </Typography>
            <QRPaymentBlock
              refNumber={refNumber}
              pendingAmount={pendingAmount}
              selectedMethodId={summaryPaymentMethod}
              onMethodChange={setSummaryPaymentMethod}
              onDownloadQR={() => handleDownloadQR(refNumber)}
              proofFile={summaryProofOfPayment}
              onProofUpload={handleSummaryProofOfPaymentUpload}
            />
          </Paper>
          <Tooltip title="Go back to all bookings" arrow placement="top">
            <Button variant="contained" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedBooking(null); }}
              sx={{ mt: 2, backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, borderRadius: 3, textTransform: 'none', fontWeight: 600, minHeight: 48, fontSize: '0.85rem' }}>
              View Bookings
            </Button>
          </Tooltip>
        </Box>
      );
    }

    return (
      <Box sx={{ px: 1.5, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, p: 1.8, mb: 2, borderRadius: 2.5, backgroundColor: '#fff7ed', border: '1.5px solid #fed7aa' }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <WarningIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, color: '#92400e', fontSize: '0.85rem' }}>Pending Payment</Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#b45309' }}>Outstanding balance needs to be settled.</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.65rem', color: '#b45309', fontWeight: 600 }}>Balance Due</Typography>
            <Typography sx={{ fontWeight: 900, color: '#d97706', fontSize: '1rem' }}>₱{pendingAmount.toLocaleString()}</Typography>
          </Box>
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 16px rgba(245,158,11,0.15)', border: '1.5px solid #fde68a', mb: 2 }}>
          <Box sx={{ backgroundColor: '#f59e0b', color: 'white', px: 2.5, py: 1.8, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, mb: 0.3 }}>
              <WarningIcon sx={{ fontSize: 16 }} />
              <Typography fontWeight={800} sx={{ fontSize: '0.9rem', letterSpacing: 0.5 }}>PENDING RECEIPT</Typography>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.62rem' }}>Booking ID: {booking.id}</Typography>
          </Box>
          <Box sx={{ height: 10, background: 'radial-gradient(circle at 50% 0%, white 4px, #f59e0b 4px)', backgroundSize: '18px 100%', backgroundRepeat: 'repeat-x' }} />
          <Box sx={{ px: 2, py: 2 }}>
            <Box sx={{ p: 1.8, mb: 1.5, borderRadius: 2, backgroundColor: '#fff7ed', border: '1px solid #fde68a' }}>
              {[
                { label: 'Total Service Amount', value: `₱${(booking.totalAmount || 0).toLocaleString()}` },
                { label: 'Amount Already Paid', value: `− ₱${(booking.paidAmount || 0).toLocaleString()}`, green: true },
              ].map((r, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#92400e' }}>{r.label}</Typography>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: r.green ? '#16a34a' : '#1e293b' }}>{r.value}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1, borderColor: '#fde68a', borderStyle: 'dashed' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309' }}>Amount to Pay</Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 900, color: '#d97706' }}>₱{pendingAmount.toLocaleString()}</Typography>
              </Box>
            </Box>
            <Box sx={{ p: 1.4, mb: 1.5, borderRadius: 2, backgroundColor: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaymentIcon sx={{ fontSize: 15, color: '#d97706', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.7rem', color: '#b45309', lineHeight: 1.4 }}>
                Please complete your payment before or after service completion.
              </Typography>
            </Box>
            {[
              { label: 'Payment Type', value: booking.paymentType === 'half' ? 'Half Payment' : 'Full Payment' },
              { label: 'Status', value: booking.status },
              { label: 'Scheduled', value: booking.scheduledAt || '' },
            ].map((row, idx) => (
              <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.8, borderBottom: idx < 2 ? '1px dashed #f3f4f6' : 'none' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>{row.label}</Typography>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e293b' }}>{row.value}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          <Tooltip title="Pay your pending balance now" arrow placement="top">
            <Button variant="contained" fullWidth onClick={() => setMobileHalfPayStep('payment')}
              sx={{ backgroundColor: '#f59e0b', color: 'white', '&:hover': { backgroundColor: '#d97706' }, borderRadius: 3, textTransform: 'none', fontWeight: 700, minHeight: 48, fontSize: '0.88rem' }}>
              Pay Now
            </Button>
          </Tooltip>
          <Tooltip title="Go back to all bookings" arrow placement="top">
            <Button variant="outlined" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedBooking(null); }}
              sx={{ borderColor: themeColor, color: themeColor, '&:hover': { backgroundColor: themeColor, color: 'white' }, borderRadius: 3, textTransform: 'none', fontWeight: 700, minHeight: 48, fontSize: '0.88rem' }}>
              View Bookings
            </Button>
          </Tooltip>
        </Box>
      </Box>
    );
  };

  // ── Booking Summary dispatcher ────────────────────────────────────────────
  const renderBookingSummary = (booking) => {
    const isInProgress = booking.status === 'In Progress';
    const isCompleted = booking.status === 'Completed';

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: isCompleted ? '#7c3aed' : themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {isCompleted ? 'Booking Receipt & Feedback' : 'Booking Summary'}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          {/* Completed bookings show receipt + feedback */}
          {isCompleted
            ? renderCompletedBookingSummary(booking)
            : booking.isPaid
              ? renderBookingSummaryFull(booking)
              : renderBookingSummaryPending(booking)
          }

          {/* Action buttons — hide for completed (handled inside) and mobile half-pay */}
          {!isCompleted && (
            <Box sx={{
              display: { xs: (booking.paymentType === 'half' && !booking.isPaid) ? 'none' : 'flex', sm: 'flex' },
              gap: 2, mt: 2.5,
              flexDirection: { xs: 'column', sm: 'row' },
              maxWidth: booking.isPaid ? 640 : 820, mx: 'auto',
            }}>
              <Tooltip title="View all your current bookings" arrow placement="top">
                <Button variant="contained" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedBooking(null); }}
                  sx={{ backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, borderRadius: 3, textTransform: 'none', fontWeight: 600, minHeight: 48, fontSize: '0.85rem' }}>
                  View Bookings
                </Button>
              </Tooltip>
              {!isInProgress && (
                <Tooltip title="Cancel this booking" arrow placement="top">
                  <Button variant="outlined" fullWidth startIcon={<CancelIcon />} onClick={(e) => openCancelDialog(booking.id, e)}
                    sx={{ borderColor: '#dc2626', color: '#dc2626', borderRadius: 3, fontWeight: 600, textTransform: 'none', minHeight: 48, fontSize: '0.85rem', '&:hover': { backgroundColor: '#dc2626', color: 'white' } }}>
                    Cancel Booking
                  </Button>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // ── Bookings Section ──────────────────────────────────────────────────────
  const renderBookings = () => {
    if (selectedBooking) return renderBookingSummary(selectedBooking);

    const filteredBookings = filterBookings(bookingsData);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Current Bookings
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          {/* Info + Search */}
          <Box sx={{ mb: 1.5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 1.5 }}>
            <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: `${themeColor}10`, flex: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ color: themeColor, fontSize: '0.85rem' }}>
                You have {bookingsData.length} active booking{bookingsData.length !== 1 ? 's' : ''}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <TextField variant="outlined" size="small" placeholder="Search bookings..." value={bookingSearchQuery} onChange={e => setBookingSearchQuery(e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' }, '& .MuiInputBase-input': { fontSize: '0.82rem' } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 18 }} /></InputAdornment> }}
            />
          </Box>

          {/* Filter chips */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 0.5 }}>
              <FilterListIcon sx={{ fontSize: 16, color: '#64748b' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Filter:</Typography>
            </Box>
            {STATUS_FILTER_LIST.map(filter => {
              const isActive = bookingStatusFilter === filter;
              const colors = STATUS_FILTER_COLORS[filter] || STATUS_FILTER_COLORS.All;

              return (
                <Tooltip key={filter} title={`Filter by ${filter}`} arrow placement="top">
                  <Box
                    onClick={() => setBookingStatusFilter(isActive && filter !== 'All' ? 'All' : filter)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0.5,
                      px: 1.4, py: 0.5, borderRadius: 99, cursor: 'pointer',
                      border: `1.5px solid ${isActive ? colors.border : '#e2e8f0'}`,
                      backgroundColor: isActive ? colors.bg : 'transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': { backgroundColor: colors.bg, borderColor: colors.border },
                    }}>
                    {filter === 'All' && (
                      <Box sx={{ width: 13, height: 13, borderRadius: '3px', border: `2px solid ${isActive ? colors.active : '#94a3b8'}`, backgroundColor: isActive ? colors.active : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s ease' }}>
                        {isActive && <CheckIcon sx={{ fontSize: 9, color: 'white' }} />}
                      </Box>
                    )}
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: isActive ? 800 : 600, color: isActive ? colors.active : '#64748b' }}>{filter}</Typography>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>

          {/* Bookings list */}
          {filteredBookings.length > 0 ? (
            <Stack spacing={1.5}>
              {filteredBookings.map(booking => {
                const isInProgress = booking.status === 'In Progress';
                const isCompleted = booking.status === 'Completed';
                const statusColor = isCompleted ? '#7c3aed' : booking.status === 'Confirmed' ? '#16a34a' : isInProgress ? '#6b7280' : '#f59e0b';
                const topBarBg = isCompleted
                  ? 'linear-gradient(90deg, #7c3aed, #5b21b6)'
                  : !booking.isPaid
                    ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                    : themeColor;

                return (
                  <Paper key={booking.id} onClick={() => setSelectedBooking(booking)}
                    sx={{ p: 0, borderRadius: 2.5, border: `1px solid ${isCompleted ? '#ddd6fe' : `${themeColor}30`}`, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' } }}>
                    <Box sx={{ height: 6, background: topBarBg }} />
                    <Box sx={{ p: { xs: 1.5, md: 2.5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 1.5 }}>
                      <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                        <Typography variant="body1" fontWeight={700} sx={{ color: isCompleted ? '#7c3aed' : themeColor, display: 'flex', alignItems: 'center', gap: 0.8, fontSize: '0.9rem' }}>
                          <ConfirmationNumber sx={{ fontSize: 16 }} /> Booking ID: {booking.id}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 0.8, fontSize: '0.82rem' }}>
                          <Build sx={{ fontSize: 14 }} /> Service: {booking.serviceName}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'text.secondary', fontSize: '0.78rem' }}>
                          <Event sx={{ fontSize: 14 }} /> Date: {booking.date}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'text.secondary', fontSize: '0.78rem' }}>
                          <Place sx={{ fontSize: 14 }} /> Location: {booking.location}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'text.secondary', fontSize: '0.75rem' }}>
                          <PaymentIcon sx={{ fontSize: 13 }} /> {booking.paymentType === 'half' ? 'Half Payment Plan' : 'Full Payment'} · {booking.paymentMethod}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
                        <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minWidth: 90, px: 1.5, py: 0.4, borderRadius: 2, fontSize: '0.72rem', fontWeight: 600, color: '#fff', backgroundColor: statusColor }}>
                          {booking.status}
                        </Box>
                        {!booking.isPaid && (
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.5, py: 0.4, borderRadius: 2, backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
                            <WarningIcon sx={{ fontSize: 12, color: '#f59e0b' }} />
                            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#d97706' }}>Pending Payment</Typography>
                          </Box>
                        )}
                        {booking.isPaid && (
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.5, py: 0.4, borderRadius: 2, backgroundColor: isCompleted ? '#f5f3ff' : '#f0fdf4', border: `1px solid ${isCompleted ? '#ddd6fe' : '#bbf7d0'}` }}>
                            <CheckCircle sx={{ fontSize: 12, color: isCompleted ? '#7c3aed' : '#16a34a' }} />
                            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: isCompleted ? '#7c3aed' : '#16a34a' }}>
                              {isCompleted ? 'Tap to review' : 'Fully Paid'}
                            </Typography>
                          </Box>
                        )}
                        {/* Cancel button — only for non-completed, non-in-progress */}
                        {isCompleted ? null : isInProgress ? (
                          <Tooltip title="The Service is ongoing" arrow placement="top">
                            <span>
                              <Button variant="contained" size="small" disabled
                                sx={{ width: { xs: '100%', md: 90 }, textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: '0.75rem', px: 1.5, cursor: 'not-allowed', '&.Mui-disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8' } }}>
                                Cancel
                              </Button>
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Cancel this booking" arrow placement="top">
                            <Button variant="contained" size="small" onClick={(e) => openCancelDialog(booking.id, e)}
                              sx={{ width: { xs: '100%', md: 90 }, backgroundColor: '#dc2626', color: '#fff', textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: '0.75rem', px: 1.5, '&:hover': { backgroundColor: '#b71c1c' } }}>
                              Cancel
                            </Button>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 3, fontSize: '0.82rem' }}>
              {bookingStatusFilter !== 'All' ? `No "${bookingStatusFilter}" bookings found.` : 'No bookings found.'}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // ── History Section ───────────────────────────────────────────────────────
  const renderHistory = () => {
    const filteredHistory = filterHistory(historyData);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>Booking History</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 1.5 }}>
            <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: `${themeColor}10`, flex: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ color: themeColor, fontSize: '0.85rem' }}>You have {historyData.length} past booking{historyData.length !== 1 ? 's' : ''}</Typography>
            </Box>
            <TextField variant="outlined" size="small" placeholder="Search history..." value={historySearchQuery} onChange={e => setHistorySearchQuery(e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' }, '& .MuiInputBase-input': { fontSize: '0.82rem' } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 18 }} /></InputAdornment> }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflowX: 'auto', ...noScrollbar }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: `${themeColor}15` }}>
                  {['Booking ID', 'Date & Time', 'Service', 'Paid Amount', 'Status'].map(h => (
                    <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.78rem' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.length > 0 ? filteredHistory.map((item, idx) => (
                  <TableRow key={item.id} sx={{ backgroundColor: idx % 2 === 0 ? 'transparent' : '#f9fafb', '&:hover': { backgroundColor: `${themeColor}10`, cursor: 'pointer' } }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.78rem' }}>{item.id}</TableCell>
                    <TableCell sx={{ fontSize: '0.78rem' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e293b' }}>{item.date}</Typography>
                        {item.time && <Typography sx={{ fontSize: '0.68rem', color: '#64748b' }}>{item.time}</Typography>}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.78rem' }}>{item.serviceName}</TableCell>
                    <TableCell sx={{ fontSize: '0.78rem' }}>{item.paidAmount ? `₱${item.paidAmount.toLocaleString()}` : 'N/A'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minWidth: 80, px: 1.2, py: 0.4, borderRadius: 2, fontSize: '0.7rem', fontWeight: 600, color: '#fff', backgroundColor: item.status === 'Completed' ? '#16a34a' : '#6b7280' }}>
                        {item.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary', fontSize: '0.8rem' }}>No records found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  // ── Notifications Section ─────────────────────────────────────────────────
  const renderNotifications = () => {
    const typeColors = { chat: '#2563eb', booking: '#16a34a', status: '#f59e0b', system: '#6b7280' };
    const typeLabels = { chat: 'Messages', booking: 'Bookings', status: 'Service Updates', system: 'System' };
    const grouped = notifications.reduce((acc, n) => { (acc[n.type] = acc[n.type] || []).push(n); return acc; }, {});

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' }, mb: 1.5 }}>
            Notifications
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.2, px: 2, py: 1.4, borderRadius: 2.5, backgroundColor: 'white', border: `1.5px solid ${themeColor}18`, boxShadow: `0 2px 10px ${themeColor}0a` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, px: 1.4, py: 0.55, borderRadius: 99, backgroundColor: notificationCount > 0 ? '#fef2f2' : '#f0fdf4', border: `1px solid ${notificationCount > 0 ? '#fecaca' : '#bbf7d0'}` }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: notificationCount > 0 ? '#ef4444' : '#22c55e' }} />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: notificationCount > 0 ? '#dc2626' : '#16a34a' }}>
                  {notificationCount > 0 ? `${notificationCount} unread` : 'All read'}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>{notifications.length} total</Typography>
            </Box>
            {notificationCount > 0 && (
              <Tooltip title="Mark all notifications as read" arrow placement="top">
                <Button size="small" variant="contained" onClick={handleMarkAllRead}
                  sx={{ backgroundColor: themeColor, color: 'white', textTransform: 'none', fontWeight: 700, fontSize: '0.75rem', py: 0.55, px: 1.8, borderRadius: 2, '&:hover': { backgroundColor: '#0f2a4d' } }}>
                  Mark all as read
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          {Object.entries(grouped).map(([type, notifs]) => (
            <Box key={type} sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2, px: 0.5 }}>
                <Box sx={{ width: 3, height: 14, borderRadius: 99, backgroundColor: typeColors[type] || themeColor }} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: typeColors[type] || themeColor, textTransform: 'uppercase', letterSpacing: 0.8 }}>{typeLabels[type] || type}</Typography>
                <Chip label={notifs.length} size="small" sx={{ height: 16, fontSize: '0.58rem', fontWeight: 700, backgroundColor: `${(typeColors[type] || themeColor)}15`, color: typeColors[type] || themeColor }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {notifs.map(n => <NotificationItem key={n.id} notif={n} compact={false} />)}
              </Box>
            </Box>
          ))}
          {notifications.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <NotificationsIcon sx={{ fontSize: 44, color: '#cbd5e1', mb: 1.5 }} />
              <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.9rem' }}>No notifications yet</Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // ── Messages Section ──────────────────────────────────────────────────────
  const renderMessages = () => {
    const currentMessages = chatMessages[selectedVendor?.id] || [];
    const dayName = liveTime.toLocaleDateString([], { weekday: 'long' });
    const dateStr = liveTime.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const formatMsgTimestamp = (msg) =>
      msg.date && msg.time ? `${msg.date} • ${msg.time}` : msg.time || '';

    const MessageBubble = ({ msg }) => (
      <Box sx={{ display: 'flex', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: { xs: 0.7, lg: 1 } }}>
        {msg.from === 'vendor' && (
          <Avatar sx={{ width: { xs: 22, lg: 26 }, height: { xs: 22, lg: 26 }, backgroundColor: themeColor, fontSize: { xs: '0.55rem', lg: '0.65rem' }, flexShrink: 0 }}>{selectedVendor?.avatar}</Avatar>
        )}
        <Box sx={{ maxWidth: { xs: '78%', lg: '72%' } }}>
          <Box sx={{ px: { xs: 1.4, lg: 1.8 }, py: { xs: 0.9, lg: 1 }, borderRadius: msg.from === 'user' ? { xs: '14px 14px 4px 14px', lg: '16px 16px 4px 16px' } : { xs: '14px 14px 14px 4px', lg: '16px 16px 16px 4px' }, backgroundColor: msg.from === 'user' ? themeColor : 'white', color: msg.from === 'user' ? 'white' : '#1e293b', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Typography sx={{ fontSize: { xs: '0.8rem', lg: '0.82rem' }, lineHeight: 1.45 }}>{msg.text}</Typography>
          </Box>
          <Typography sx={{ display: 'block', mt: 0.4, fontSize: { xs: '0.58rem', lg: '0.62rem' }, color: 'text.secondary', textAlign: msg.from === 'user' ? 'right' : 'left', px: 0.5 }}>
            {formatMsgTimestamp(msg)}
          </Typography>
        </Box>
      </Box>
    );

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>Messages</Typography>
        </Box>

        {/* MOBILE LAYOUT */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: 'column', flex: 1, overflow: 'hidden', px: 1.5, pb: 1.5, gap: 1.2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1.5, py: 1, borderRadius: 2, backgroundColor: `${themeColor}08`, border: `1px solid ${themeColor}15` }}>
            <Box>
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: themeColor, textTransform: 'uppercase', letterSpacing: 0.8 }}>{dayName}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600 }}>{dateStr}</Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: themeColor, fontVariantNumeric: 'tabular-nums' }}>{timeStr}</Typography>
            </Box>
          </Box>

          <TextField variant="outlined" size="small" placeholder="Search conversations..." value={messageSearchQuery}
            onChange={e => setMessageSearchQuery(e.target.value)} fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 16 }} /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, fontSize: '0.82rem', backgroundColor: 'white', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: themeColor } } }}
          />

          <Paper sx={{ borderRadius: 2, overflow: 'hidden', border: `1px solid ${themeColor}15`, flexShrink: 0 }}>
            <Box sx={{ px: 1.5, py: 0.8, backgroundColor: `${themeColor}06`, borderBottom: `1px solid ${themeColor}10` }}>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: themeColor, textTransform: 'uppercase', letterSpacing: 0.8 }}>Conversations</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: 1, p: 1.2, ...noScrollbar }}>
              {filteredVendors.map(vendor => {
                const isSelected = selectedVendor?.id === vendor.id;
                return (
                  <Tooltip key={vendor.id} title={`Chat with ${vendor.name}`} arrow placement="top">
                    <Box onClick={() => setSelectedVendor(vendor)}
                      sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4, px: 1.2, py: 0.8, borderRadius: 2, cursor: 'pointer', backgroundColor: isSelected ? `${themeColor}12` : 'transparent', border: isSelected ? `1.5px solid ${themeColor}40` : '1.5px solid transparent', transition: 'all 0.15s ease' }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ width: 34, height: 34, backgroundColor: isSelected ? themeColor : `${themeColor}25`, color: isSelected ? 'white' : themeColor, fontSize: '0.78rem', fontWeight: 800 }}>{vendor.avatar}</Avatar>
                        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', backgroundColor: vendor.online ? '#16a34a' : '#9ca3af', border: '1.5px solid white' }} />
                      </Box>
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? themeColor : '#64748b', textAlign: 'center', maxWidth: 56, lineHeight: 1.2 }} noWrap>
                        {vendor.name.split(' ')[0]}
                      </Typography>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Paper>

          <Paper sx={{ flex: 1, borderRadius: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: `1px solid ${themeColor}15`, minHeight: 0 }}>
            <Box sx={{ px: 1.5, py: 1, display: 'flex', alignItems: 'center', gap: 1.2, borderBottom: `1px solid ${themeColor}10`, backgroundColor: `${themeColor}04` }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ width: 30, height: 30, backgroundColor: themeColor, fontSize: '0.75rem', fontWeight: 700 }}>{selectedVendor?.avatar}</Avatar>
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 7, height: 7, borderRadius: '50%', backgroundColor: selectedVendor?.online ? '#16a34a' : '#9ca3af', border: '1.5px solid white' }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: themeColor }}>{selectedVendor?.name}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: selectedVendor?.online ? '#16a34a' : 'text.secondary', fontWeight: 600 }}>
                  {selectedVendor?.online ? '● Online' : '○ Offline'} · {selectedVendor?.service}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1.2, display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: '#f8fafc', minHeight: 0, ...noScrollbar }}>
              {currentMessages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              <div ref={chatEndRef} />
            </Box>
            <Box sx={{ px: 1.2, py: 0.8, borderTop: `1px solid ${themeColor}10`, backgroundColor: 'white', display: 'flex', gap: 0.8, alignItems: 'center' }}>
              <TextField variant="outlined" size="small" placeholder="Type a message..." fullWidth value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, backgroundColor: '#f8fafc', fontSize: '0.82rem', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: themeColor } } }}
              />
              <Tooltip title="Send message" arrow placement="top">
                <span>
                  <IconButton onClick={handleSendMessage} disabled={!messageInput.trim()}
                    sx={{ backgroundColor: themeColor, color: 'white', width: 34, height: 34, flexShrink: 0, '&:hover': { backgroundColor: '#0f2a4d' }, '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8' } }}>
                    <SendIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        </Box>

        {/* DESKTOP LAYOUT */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1, overflow: 'hidden', px: 3, pb: 3, gap: 2 }}>
          <Paper sx={{ flex: '0 0 220px', p: 1.8, borderRadius: 3, display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15` }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: themeColor, fontSize: '0.8rem' }}>Booking Calendar</Typography>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar value={selectedDate} onChange={d => setSelectedDate(d)}
                  sx={{ width: '100%', maxWidth: 210, '& .MuiPickersDay-root': { fontSize: '0.65rem', width: 24, height: 24 }, '& .MuiPickersDay-root.Mui-selected': { backgroundColor: themeColor }, '& .MuiDayCalendar-header span': { fontSize: '0.6rem' }, '& .MuiPickersCalendarHeader-label': { fontSize: '0.75rem' }, '& .MuiPickersCalendarHeader-root': { pl: 1, pr: 0 } }} />
              </LocalizationProvider>
            </Box>
            <Divider sx={{ my: 0.8 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Current Time</Typography>
              <Typography fontWeight={700} sx={{ color: themeColor, fontSize: '0.9rem' }}>{liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ flex: 1, borderRadius: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15` }}>
            <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${themeColor}10`, backgroundColor: `${themeColor}04` }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ width: 38, height: 38, backgroundColor: themeColor, fontSize: '0.85rem', fontWeight: 700 }}>{selectedVendor?.avatar}</Avatar>
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', backgroundColor: selectedVendor?.online ? '#16a34a' : '#9ca3af', border: '2px solid white' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={700} sx={{ color: themeColor, fontSize: '0.85rem' }}>{selectedVendor?.name}</Typography>
                <Typography variant="caption" sx={{ color: selectedVendor?.online ? '#16a34a' : 'text.secondary', fontWeight: 600, fontSize: '0.68rem' }}>
                  {selectedVendor?.online ? '● Online' : '○ Offline'} · {selectedVendor?.service}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 2, display: 'flex', flexDirection: 'column', gap: 1.2, backgroundColor: '#f8fafc', ...noScrollbar }}>
              {currentMessages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              <div ref={chatEndRef} />
            </Box>
            <Box sx={{ px: 2, py: 1.2, borderTop: `1px solid ${themeColor}10`, backgroundColor: 'white', display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField variant="outlined" size="small" placeholder="Type a message..." fullWidth value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, backgroundColor: '#f8fafc', fontSize: '0.85rem', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: themeColor } } }}
              />
              <Tooltip title="Send message" arrow placement="top">
                <span>
                  <IconButton onClick={handleSendMessage} disabled={!messageInput.trim()}
                    sx={{ backgroundColor: themeColor, color: 'white', width: 38, height: 38, flexShrink: 0, '&:hover': { backgroundColor: '#0f2a4d' }, '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8' } }}>
                    <SendIcon sx={{ fontSize: 17 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Paper>

          <Paper sx={{ flex: '0 0 200px', borderRadius: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 2px 8px rgba(18,56,101,0.08)', border: `1px solid ${themeColor}15` }}>
            <Box sx={{ px: 1.8, py: 1, borderBottom: `1px solid ${themeColor}10`, backgroundColor: `${themeColor}04` }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: themeColor, mb: 0.8, fontSize: '0.8rem' }}>Conversations</Typography>
              <TextField variant="outlined" size="small" placeholder="Search..." fullWidth value={messageSearchQuery}
                onChange={e => setMessageSearchQuery(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: themeColor, fontSize: 14 }} /></InputAdornment> }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, fontSize: '0.75rem', backgroundColor: 'white', '& fieldset': { borderColor: '#e2e8f0' }, '&:hover fieldset': { borderColor: themeColor }, '& input': { py: 0.6 } } }}
              />
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', ...noScrollbar }}>
              {filteredVendors.map((vendor, idx) => {
                const isSelected = selectedVendor?.id === vendor.id;
                return (
                  <Tooltip key={vendor.id} title={`Chat with ${vendor.name} — ${vendor.service}`} arrow placement="left">
                    <Box onClick={() => setSelectedVendor(vendor)}
                      sx={{ px: 1.5, py: 1.3, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.2, borderBottom: idx < filteredVendors.length - 1 ? `1px solid ${themeColor}08` : 'none', backgroundColor: isSelected ? `${themeColor}10` : 'transparent', borderLeft: isSelected ? `3px solid ${themeColor}` : '3px solid transparent', transition: 'all 0.15s ease', '&:hover': { backgroundColor: `${themeColor}08` } }}>
                      <Box sx={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: isSelected ? themeColor : `${themeColor}25`, color: isSelected ? 'white' : themeColor, fontSize: '0.78rem', fontWeight: 700 }}>{vendor.avatar}</Avatar>
                        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', backgroundColor: vendor.online ? '#16a34a' : '#9ca3af', border: '1.5px solid white' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? themeColor : '#334155', lineHeight: 1.3 }} noWrap>{vendor.name}</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500 }} noWrap>{vendor.service}</Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                );
              })}
              {filteredVendors.length === 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}><Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>No conversations found.</Typography></Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  };

  // ── Profile Section ───────────────────────────────────────────────────────
  const renderProfile = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>Profile</Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2.5 }}>
          {/* Avatar card */}
          <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', flex: { xs: '1', md: '0 0 auto' }, width: { md: 240 }, backgroundColor: '#f9fafb', height: 'fit-content' }}>
            <Box sx={{ position: 'relative', width: 110, height: 110, margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${themeColor}` }}>
              {profilePicture
                ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Person sx={{ fontSize: 55, color: themeColor }} />}
              <input accept="image/*" type="file" onChange={handleProfilePictureChange} style={{ display: 'none' }} id="profile-pic-input" />
              <Tooltip title="Change profile photo" arrow placement="bottom">
                <Box component="label" htmlFor="profile-pic-input" sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                  <Box sx={{ backgroundColor: themeColor, color: 'white', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { backgroundColor: '#0f2a4d' } }}>
                    <PhotoCamera sx={{ fontSize: 15 }} />
                  </Box>
                </Box>
              </Tooltip>
            </Box>
            <Typography fontWeight={700} sx={{ color: themeColor, mb: 0.4, fontSize: '0.9rem' }}>{profileName}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.72rem' }}>{profileEmail}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Click camera to change photo</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Tooltip title="Sign out of your account" arrow placement="bottom">
              <Button fullWidth variant="outlined" startIcon={<Logout />} onClick={handleLogout}
                sx={{ borderColor: '#dc2626', color: '#dc2626', borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '0.82rem', '&:hover': { backgroundColor: '#dc2626', color: 'white' } }}>
                Logout
              </Button>
            </Tooltip>
          </Paper>

          {/* Profile Info */}
          <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: themeColor, display: 'flex', alignItems: 'center', gap: 0.8, fontSize: '0.95rem' }}>
                <SettingsIcon sx={{ fontSize: 18 }} /> Profile Information
              </Typography>
              {!isEditingProfile && (
                <Tooltip title="Edit profile information" arrow placement="top">
                  <IconButton onClick={() => setIsEditingProfile(true)} sx={{ color: themeColor, p: 0.8 }}>
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {isEditingProfile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                <TextField fullWidth label="Full Name" value={profileName} onChange={e => setProfileName(e.target.value)} variant="outlined" size="small" />
                <TextField fullWidth label="Email" value={profileEmail} disabled variant="outlined" size="small" helperText="Email cannot be changed" />
                <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
                  <Tooltip title="Discard changes" arrow placement="top">
                    <Button variant="outlined" onClick={() => setIsEditingProfile(false)} sx={{ borderColor: themeColor, color: themeColor, fontSize: '0.8rem', textTransform: 'none', '&:hover': { bgcolor: themeColor, color: 'white' } }}>Cancel</Button>
                  </Tooltip>
                  <Tooltip title="Save your profile changes" arrow placement="top">
                    <Button variant="contained" onClick={() => setSaveConfirmOpen(true)} sx={{ backgroundColor: themeColor, fontSize: '0.8rem', textTransform: 'none', '&:hover': { backgroundColor: '#0f2a4d' } }}>Save Changes</Button>
                  </Tooltip>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Full Name', value: profileName },
                  { label: 'Email Address (Verified)', value: profileEmail, verified: true },
                ].map((item, i) => (
                  <Box key={i} sx={{ p: 1.8, border: `1px solid ${themeColor}30`, borderRadius: 2, backgroundColor: `${themeColor}05` }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.4, fontSize: '0.72rem' }}>{item.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Typography fontWeight={600} sx={{ fontSize: '0.85rem' }}>{item.value}</Typography>
                      {item.verified && <CheckIcon sx={{ color: '#16a34a', fontSize: 16 }} />}
                    </Box>
                  </Box>
                ))}
                <Box sx={{ p: 1.8, border: `1px solid ${themeColor}30`, borderRadius: 2, backgroundColor: `${themeColor}05` }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.4, fontSize: '0.72rem' }}>Account Status</Typography>
                  <Chip label="Active" size="small" sx={{ backgroundColor: '#dcfce7', color: '#16a34a', fontWeight: 700, fontSize: '0.7rem' }} />
                </Box>
                <Tooltip title="Update your account password" arrow placement="top">
                  <Button variant="outlined" startIcon={<SecurityIcon sx={{ fontSize: 16 }} />} onClick={() => setOpenPasswordDialog(true)}
                    sx={{ borderColor: themeColor, color: themeColor, textTransform: 'none', fontWeight: 600, fontSize: '0.82rem', alignSelf: 'flex-start', '&:hover': { bgcolor: themeColor, color: 'white' } }}>
                    Change Password
                  </Button>
                </Tooltip>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog open={imageConfirmOpen} onClose={handleImageCancel} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ backgroundColor: themeColor, color: 'white', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhotoCamera sx={{ fontSize: 18 }} /> Update Profile Photo
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.88rem', fontWeight: 500, mb: 2 }}>Do you want to use this photo for your profile?</Typography>
          {pendingProfilePicture && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
              <Box sx={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${themeColor}`, boxShadow: `0 4px 16px ${themeColor}30` }}>
                <Box component="img" src={pendingProfilePicture} alt="Preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Box>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', fontSize: '0.72rem' }}>This will replace your current profile photo.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleImageCancel} variant="outlined" sx={{ borderColor: themeColor, color: themeColor, borderRadius: 2, fontWeight: 600, textTransform: 'none', fontSize: '0.82rem', px: 2.5, flex: 1, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Cancel</Button>
          <Button onClick={handleImageConfirm} variant="contained" sx={{ backgroundColor: themeColor, borderRadius: 2, fontWeight: 700, textTransform: 'none', fontSize: '0.82rem', px: 2.5, flex: 1, '&:hover': { backgroundColor: '#0f2a4d' } }}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={saveConfirmOpen} onClose={() => setSaveConfirmOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ backgroundColor: themeColor, color: 'white', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon sx={{ fontSize: 18 }} /> Save Profile Changes
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.88rem', fontWeight: 500 }}>Do you want to save these changes?</Typography>
          <Box sx={{ mt: 1.5, p: 1.5, borderRadius: 2, backgroundColor: `${themeColor}06`, border: `1px solid ${themeColor}15` }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem', display: 'block', mb: 0.3 }}>Updated name:</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: themeColor }}>{profileName}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setSaveConfirmOpen(false)} variant="outlined" sx={{ borderColor: themeColor, color: themeColor, borderRadius: 2, fontWeight: 600, textTransform: 'none', fontSize: '0.82rem', px: 2.5, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Cancel</Button>
          <Button onClick={handleSaveProfileConfirm} variant="contained" sx={{ backgroundColor: themeColor, borderRadius: 2, fontWeight: 700, textTransform: 'none', fontSize: '0.82rem', px: 2.5, '&:hover': { backgroundColor: '#0f2a4d' } }}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: themeColor, color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Change Password</DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <TextField fullWidth type="password" label="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} margin="normal" variant="outlined" size="small" />
          <TextField fullWidth type="password" label="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} margin="normal" variant="outlined" size="small" />
          <TextField fullWidth type="password" label="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} margin="normal" variant="outlined" size="small" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPasswordDialog(false)} sx={{ color: themeColor, fontSize: '0.82rem' }}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained" sx={{ backgroundColor: themeColor, fontSize: '0.82rem' }}>Update Password</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={profileSnackbar} autoHideDuration={3000} onClose={() => setProfileSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', fontSize: '0.82rem' }}>{profileSnackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );

  // ── Help & Support Section ────────────────────────────────────────────────
  const renderHelpSupport = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' }, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HelpOutlineIcon sx={{ fontSize: 20 }} /> Help &amp; Support
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          <Paper sx={{ p: 2.5, borderRadius: 3, mb: 2.5, background: `linear-gradient(135deg, ${themeColor} 0%, #1a4d8a 100%)`, color: 'white', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ContactSupportIcon sx={{ fontSize: 26, color: 'white' }} />
            </Box>
            <Box>
              <Typography fontWeight={800} sx={{ fontSize: '1rem', mb: 0.3 }}>We're here to help!</Typography>
              <Typography sx={{ fontSize: '0.78rem', opacity: 0.85 }}>Browse the sections below or reach out directly.</Typography>
            </Box>
          </Paper>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { id: 'faqs', label: 'FAQs', icon: HelpOutlineIcon, color: '#2563eb', children: [{ id: 'quick-help', label: 'Get Quick Help', icon: QuestionAnswerIcon, desc: 'Common questions answered fast' }] },
                { id: 'report', label: 'Report Issue', icon: ReportProblemIcon, color: '#f59e0b', children: [{ id: 'booking-concern', label: 'Booking Concern', icon: BookmarkBorderIcon, desc: 'Report booking-related issues' }] },
              ].map(section => {
                const SIcon = section.icon;
                return (
                  <Paper key={section.id} sx={{ borderRadius: 2.5, overflow: 'hidden', border: `1px solid ${section.color}20`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <Box sx={{ px: 2.5, py: 1.8, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: `${section.color}08`, borderBottom: `1px solid ${section.color}15` }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: `${section.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SIcon sx={{ fontSize: 18, color: section.color }} />
                      </Box>
                      <Typography fontWeight={800} sx={{ color: section.color, fontSize: '0.88rem' }}>{section.label}</Typography>
                    </Box>
                    {section.children.map((child, ci) => {
                      const CIcon = child.icon;
                      return (
                        <Tooltip key={child.id} title={child.desc} arrow placement="right">
                          <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'flex-start', gap: 1.5, cursor: 'pointer', borderBottom: ci < section.children.length - 1 ? `1px solid ${section.color}08` : 'none', transition: 'all 0.15s ease', '&:hover': { backgroundColor: `${section.color}05`, pl: '22px' } }}>
                            <Box sx={{ width: 30, height: 30, borderRadius: '8px', backgroundColor: `${section.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3 }}>
                              <CIcon sx={{ fontSize: 15, color: section.color }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.82rem' }}>{child.label}</Typography>
                              <Typography sx={{ fontSize: '0.68rem', color: '#64748b' }}>{child.desc}</Typography>
                            </Box>
                            <ArrowForward sx={{ fontSize: 14, color: '#cbd5e1', mt: 0.3 }} />
                          </Box>
                        </Tooltip>
                      );
                    })}
                  </Paper>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Paper sx={{ borderRadius: 2.5, overflow: 'hidden', border: '1px solid #16a34a20' }}>
                <Box sx={{ px: 2.5, py: 1.8, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: '#16a34a08', borderBottom: '1px solid #16a34a15' }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: '#16a34a15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ContactSupportIcon sx={{ fontSize: 18, color: '#16a34a' }} />
                  </Box>
                  <Typography fontWeight={800} sx={{ color: '#16a34a', fontSize: '0.88rem' }}>Contact Us</Typography>
                </Box>
                {[
                  { id: 'email', label: 'Email Support', icon: EmailIcon, contact: 'support@allfix.ph' },
                  { id: 'phone', label: 'Hotline', icon: PhoneIcon, contact: '+63 (2) 8123-4567' },
                ].map((child, ci) => {
                  const CIcon = child.icon;
                  return (
                    <Tooltip key={child.id} title={`Contact via ${child.label}: ${child.contact}`} arrow placement="right">
                      <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'flex-start', gap: 1.5, cursor: 'pointer', borderBottom: ci === 0 ? '1px solid #16a34a08' : 'none', transition: 'all 0.15s ease', '&:hover': { backgroundColor: '#16a34a05', pl: '22px' } }}>
                        <Box sx={{ width: 30, height: 30, borderRadius: '8px', backgroundColor: '#16a34a10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3 }}>
                          <CIcon sx={{ fontSize: 15, color: '#16a34a' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.82rem' }}>{child.label}</Typography>
                          <Typography sx={{ fontSize: '0.68rem', color: '#64748b' }}>{child.contact}</Typography>
                        </Box>
                        <ArrowForward sx={{ fontSize: 14, color: '#cbd5e1', mt: 0.3 }} />
                      </Box>
                    </Tooltip>
                  );
                })}
              </Paper>

              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
                <Tooltip title="Send us an email at support@allfix.ph" arrow placement="top">
                  <Button fullWidth variant="outlined" startIcon={<EmailIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderColor: themeColor, color: themeColor, borderRadius: 2.5, textTransform: 'none', fontWeight: 700, fontSize: '0.82rem', py: 1.2, '&:hover': { bgcolor: themeColor, color: 'white' } }}>
                    Email Support
                  </Button>
                </Tooltip>
                <Tooltip title="Call our hotline at +63 (2) 8123-4567" arrow placement="top">
                  <Button fullWidth variant="contained" startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
                    sx={{ backgroundColor: themeColor, borderRadius: 2.5, textTransform: 'none', fontWeight: 700, fontSize: '0.82rem', py: 1.2, '&:hover': { backgroundColor: '#0f2a4d' }, boxShadow: `0 4px 12px ${themeColor}40` }}>
                    Call Hotline
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // ── Legacy Standalone Report Section ─────────────────────────────────────
  const renderReport = () => {
    const handleReportSubmit = () => {
      if (rating === 0 && recommendation.trim() === '') { alert('Please provide a rating or recommendation before submitting.'); return; }
      setRating(0); setRecommendation(''); setSnackbarOpen(true);
    };
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>Service Report</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            <Paper elevation={6} sx={{ mb: 3, p: 2.5, borderRadius: 3, textAlign: 'center', backgroundColor: uniformAccent, color: 'white' }}>
              <Typography fontWeight={700} sx={{ mb: 1.5, fontSize: '0.95rem' }}>Rate your service experience</Typography>
              <Rating value={rating} onChange={(_, v) => setRating(v || 0)} size="large" sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' }, '& .MuiRating-iconHover': { color: '#ffb400' } }} />
              <Typography variant="body2" sx={{ mt: 0.8, fontStyle: 'italic', fontSize: '0.82rem' }}>
                {['No rating yet', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][rating]}
              </Typography>
            </Paper>
            <Paper elevation={4} sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
              <Typography fontWeight={700} sx={{ mb: 1.5, color: themeColor, fontSize: '0.95rem' }}>Share your recommendation</Typography>
              <TextField multiline rows={5} fullWidth value={recommendation} onChange={e => setRecommendation(e.target.value)} placeholder="Write your feedback or suggestions here..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f9fafb', p: 1.5, fontSize: '0.85rem' } }} />
            </Paper>
            <Box sx={{ textAlign: 'center' }}>
              <Tooltip title="Submit your service feedback" arrow placement="top">
                <Button variant="contained" onClick={handleReportSubmit} sx={{ px: 5, py: 1.3, borderRadius: 3, fontWeight: 700, backgroundColor: uniformAccent, fontSize: '0.85rem', textTransform: 'none', '&:hover': { backgroundColor: uniformAccentDark } }}>Submit Report</Button>
              </Tooltip>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert severity="success" sx={{ width: '100%', fontSize: '0.82rem' }}>Thank you for your feedback!</Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    );
  };

  // ── Booking Flow (Multi-step) ─────────────────────────────────────────────
  const renderBookingFlow = () => {
    if (!selectedService) return null;
    const rate = getSelectedRate();
    const amountToPay = getAmountToPay(rate);
    const formattedDateTime = selectedDate
      ? `${selectedDate.toLocaleDateString()} ${selectedTime ? `at ${formatTimeWithAmPm(selectedTime)}` : ''}`
      : selectedTime ? `at ${formatTimeWithAmPm(selectedTime)}` : 'Not set';

    const step0Valid = Boolean(selectedWork);
    const step2Valid = Boolean(selectedDate && selectedTime && selectedLocation?.trim());
    const step3Valid = Boolean(proofOfPayment);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} sx={{ p: 1.5, borderRadius: 2, backgroundColor: themeColor, color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {`Booking ${selectedService.brand}`}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, ...noScrollbar }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2.5, overflowX: 'auto', '& .MuiStepLabel-label': { fontSize: '0.72rem' } }}>
            {BOOKING_STEPS.map((label, index) => (
              <Step key={label} completed={activeStep > index}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {/* Step 0 — Select Work */}
          {activeStep === 0 && (
            <Box>
              <Typography fontWeight={700} sx={{ mb: 2.5, color: themeColor, fontSize: '0.95rem' }}>Select the work you need:</Typography>
              {selectedService.works.map((work, i) => (
                <Tooltip key={i} title={`Select: ${work.task} — ₱${work.rate.toLocaleString()}`} arrow placement="right">
                  <Box onClick={() => setSelectedWork(work.task)}
                    sx={{ mb: 1.5, p: 2.5, border: selectedWork === work.task ? `2px solid ${themeColor}` : '1px solid #ddd', borderRadius: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: selectedWork === work.task ? '0 6px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.08)', '&:hover': { bgcolor: '#f5f5f5', transform: 'translateY(-2px)' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography fontWeight={600} sx={{ fontSize: '0.88rem' }}>{work.task}</Typography>
                      {selectedWork === work.task && <CheckCircle sx={{ color: themeColor, fontSize: 18 }} />}
                    </Box>
                    <Typography fontWeight={600} color="text.secondary" sx={{ fontSize: '0.88rem' }}>{work.rate > 0 ? `₱${work.rate.toLocaleString()}` : 'Request Quote'}</Typography>
                  </Box>
                </Tooltip>
              ))}
              {!step0Valid && (
                <Typography sx={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WarningIcon sx={{ fontSize: 14 }} /> Please select a service to continue.
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 1.5 }}>
                {renderBackBtn(() => { setSelectedService(null); setSelectedWork(''); setSelectedTime(''); setSelectedLocation(''); setJobDescription(''); setUploadedFile(null); setProofOfPayment(null); setActiveStep(0); setSelectedDate(new Date()); setActiveSection('services'); })}
                {renderContinueBtn(!step0Valid, () => setActiveStep(1), 'Please select a service first')}
              </Box>
            </Box>
          )}

          {/* Step 1 — Booking Details */}
          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1, p: 2.5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <Typography fontWeight={700} sx={{ mb: 3, color: themeColor, fontSize: '1rem' }}>Booking Details</Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={600} sx={{ mb: 1, fontSize: '0.85rem' }}>Upload File / Image <Typography component="span" sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>(Optional)</Typography></Typography>
                  <Tooltip title="Upload an image or PDF related to your service request" arrow placement="top">
                    <Box component="label" sx={{ border: '2px dashed #cbd5e1', borderRadius: 2.5, bgcolor: '#f9fafb', p: 3, textAlign: 'center', cursor: 'pointer', display: 'block', '&:hover': { bgcolor: '#f1f5f9' } }}>
                      <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-file" accept="image/*,.pdf" />
                      <Typography fontWeight={600} color={themeColor} sx={{ fontSize: '0.85rem' }}>Click to upload or drag &amp; drop</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Supported formats: JPG, PNG, PDF</Typography>
                    </Box>
                  </Tooltip>
                  {uploadedFile && <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'success.main', fontSize: '0.72rem' }}>✓ File selected: {uploadedFile.name}</Typography>}
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={600} sx={{ mb: 1, fontSize: '0.85rem' }}>Work Description <Typography component="span" sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>(Optional)</Typography></Typography>
                  <TextField fullWidth rows={5} multiline value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Describe the work needed in detail..."
                    sx={{ bgcolor: '#f9fafb', borderRadius: 2.5, '& .MuiOutlinedInput-root': { p: 1.8, fontSize: '0.85rem' } }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 1.5 }}>
                  {renderBackBtn(() => setActiveStep(0))}
                  <Tooltip title="Continue to schedule" arrow placement="top">
                    <Button variant="contained" onClick={() => setActiveStep(2)} sx={{ ...btnBase, backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' } }}>Continue</Button>
                  </Tooltip>
                </Box>
              </Box>
              {renderJobOrderSummary()}
            </Box>
          )}

          {/* Step 2 — Schedule & Location */}
          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2.5 }}>
              <Box sx={{ flex: 1, p: 2.5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <Typography fontWeight={700} sx={{ mb: 2.5, color: themeColor, fontSize: '1rem' }}>Schedule &amp; Location</Typography>
                <Box sx={{ p: 1.5, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                  <Typography fontWeight={700} sx={{ fontSize: '0.82rem', mb: 1.5 }}>Preferred Date <Typography component="span" sx={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>*</Typography></Typography>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 1 }}>
                    <Box sx={{ flex: 1, overflowX: 'auto', ...noScrollbar }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateCalendar value={selectedDate} onChange={d => setSelectedDate(d)}
                          sx={{ maxWidth: '100%', border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#f9fafb', '& .MuiPickersDay-root': { fontSize: '0.8rem' } }} />
                      </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Box>
                        <Typography fontWeight={600} sx={{ mb: 0.8, fontSize: '0.82rem' }}>Preferred Time <Typography component="span" sx={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>*</Typography></Typography>
                        <TextField fullWidth type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} InputLabelProps={{ shrink: true }} size="small" error={!selectedTime} sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                        {!selectedTime
                          ? <Typography sx={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 600, mt: 0.4, display: 'flex', alignItems: 'center', gap: 0.4 }}><WarningIcon sx={{ fontSize: 12 }} /> Required</Typography>
                          : <Typography sx={{ fontSize: '0.68rem', color: themeColor, fontWeight: 600, mt: 0.4 }}>Selected: {formatTimeWithAmPm(selectedTime)}</Typography>
                        }
                      </Box>
                      <Box>
                        <Typography fontWeight={600} sx={{ mb: 0.8, fontSize: '0.82rem' }}>Preferred Location <Typography component="span" sx={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>*</Typography></Typography>
                        <TextField fullWidth value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} placeholder="Enter full address or location details..." size="small" error={!selectedLocation.trim()} sx={{ bgcolor: '#f9fafb', borderRadius: 2 }} />
                        {!selectedLocation.trim() && <Typography sx={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 600, mt: 0.4, display: 'flex', alignItems: 'center', gap: 0.4 }}><WarningIcon sx={{ fontSize: 12 }} /> Required</Typography>}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {!step2Valid && <Typography sx={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, mt: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}><WarningIcon sx={{ fontSize: 14 }} /> Please fill in Preferred Time and Location to continue.</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
                  {renderBackBtn(() => setActiveStep(1))}
                  {renderContinueBtn(!step2Valid, () => setActiveStep(3), 'Please complete all required schedule fields')}
                </Box>
              </Box>
              {renderJobOrderSummary()}
            </Box>
          )}

          {/* Step 3 — Billing / Payment */}
          {activeStep === 3 && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2.5, alignItems: 'stretch' }}>
                <Box sx={{ flex: 1, p: 2.5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef2f6' }}>
                  <Typography fontWeight={800} sx={{ mb: 2.5, color: '#10355f', fontSize: '0.95rem' }}>Payment Method</Typography>
                  {/* Payment Type selector */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography fontWeight={700} sx={{ mb: 1, color: '#10355f', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <PaymentIcon sx={{ fontSize: 15 }} /> Payment Type
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                      {[
                        { id: 'full', label: 'Full Payment', desc: rate != null ? `Pay ₱${rate.toLocaleString()} now` : 'Pay full amount', icon: '✓' },
                        { id: 'half', label: 'Half Payment', desc: rate != null ? `Pay ₱${Math.ceil(rate / 2).toLocaleString()} now` : 'Pay 50% now', icon: '½' },
                      ].map(opt => {
                        const isSelected = paymentType === opt.id;
                        return (
                          <Tooltip key={opt.id} title={opt.desc} arrow placement="top">
                            <Box onClick={() => setPaymentType(opt.id)}
                              sx={{ flex: 1, py: 1.4, px: 1.8, cursor: 'pointer', borderRadius: 2.5, border: '2px solid', transition: '0.2s all', borderColor: isSelected ? '#10355f' : '#f1f5f9', bgcolor: isSelected ? 'rgba(16,53,95,0.04)' : '#f8fafc', display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                <Box sx={{ width: 22, height: 22, borderRadius: '6px', backgroundColor: isSelected ? '#10355f' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: isSelected ? 'white' : '#94a3b8', flexShrink: 0 }}>{opt.icon}</Box>
                                <Typography fontWeight={800} sx={{ fontSize: '0.8rem', color: isSelected ? '#10355f' : '#64748b' }}>{opt.label}</Typography>
                              </Box>
                              <Typography sx={{ fontSize: '0.7rem', color: isSelected ? '#475569' : '#94a3b8', pl: '30px' }}>{opt.desc}</Typography>
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                    {paymentType === 'half' && rate != null && (
                      <Box sx={{ mt: 1.2, px: 1.5, py: 1, borderRadius: 2, backgroundColor: '#fff7ed', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon sx={{ fontSize: 14, color: '#f59e0b', flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 600 }}>
                          You will pay ₱{Math.ceil(rate / 2).toLocaleString()} now. Remaining ₱{Math.floor(rate / 2).toLocaleString()} is due before service completion.
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <QRPaymentBlock
                    refNumber={confirmedRefNumber}
                    pendingAmount={amountToPay}
                    selectedMethodId={paymentMethod}
                    onMethodChange={setPaymentMethod}
                    onDownloadQR={() => handleDownloadQR(confirmedRefNumber)}
                    proofFile={proofOfPayment}
                    onProofUpload={handleProofOfPaymentUpload}
                  />
                </Box>
                {renderJobOrderSummary()}
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                {renderBackBtn(() => setActiveStep(2))}
                <Tooltip title={!step3Valid ? 'Please upload your proof of payment first' : 'Confirm and submit your booking'} arrow placement="top">
                  <span>
                    <Button variant="contained" disabled={!step3Valid} onClick={handlePaymentProceed}
                      sx={{ px: { xs: 4, sm: 6 }, py: 1.4, borderRadius: 99, bgcolor: '#10355f', fontWeight: 900, textTransform: 'none', fontSize: '0.92rem', boxShadow: '0 10px 25px rgba(16,53,95,0.2)', '&:hover': { bgcolor: '#0a264a' }, '&:disabled': { backgroundColor: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' } }}>
                      I've Already Paid
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          )}

          {/* Step 4 — Confirmed */}
          {activeStep === 4 && (
            <Box sx={{ maxWidth: 560, mx: 'auto', py: 3 }}>
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(18,56,101,0.15)', border: `1px solid ${themeColor}20` }}>
                <Box sx={{ backgroundColor: '#16a34a', color: 'white', px: 4, py: 2.5, textAlign: 'center' }}>
                  <CheckCircle sx={{ fontSize: 44, mb: 0.8 }} />
                  <Typography fontWeight={800} sx={{ fontSize: '1.1rem', letterSpacing: 0.5 }}>Booking Confirmed!</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85, fontSize: '0.75rem' }}>Your booking has been successfully submitted.</Typography>
                </Box>
                <Box sx={{ height: 14, background: 'radial-gradient(circle at 50% 0%, white 5px, #16a34a 5px)', backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x' }} />
                <Box sx={{ px: { xs: 2, sm: 4 }, pt: 2, pb: 2.5 }}>
                  <Typography variant="overline" fontWeight={700} sx={{ color: themeColor, display: 'block', mb: 1.2, letterSpacing: 1, fontSize: '0.65rem' }}>Booking Summary</Typography>
                  {[
                    { label: 'Reference Number', value: confirmedRefNumber },
                    { label: 'Booking ID', value: `B-${bookingId}` },
                    { label: 'Service', value: selectedService?.brand || 'Not set' },
                    { label: 'Task', value: selectedWork || 'Not set' },
                    { label: 'Date & Time', value: formattedDateTime },
                    { label: 'Location', value: selectedLocation || 'Not set' },
                    { label: 'Payment Method', value: paymentMethod === 'e-wallet' ? 'E-Wallet' : 'Bank Transfer' },
                    { label: 'Payment Type', value: paymentType === 'half' ? 'Half Payment' : 'Full Payment' },
                    { label: 'Amount Paid', value: amountToPay != null ? formatRate(amountToPay) : '₱0.00', highlight: true },
                  ].map((item, idx, arr) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.2, borderBottom: idx < arr.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.78rem' }}>{item.label}</Typography>
                      <Typography variant="body2" fontWeight={item.highlight ? 800 : 600} sx={{ color: item.highlight ? themeColor : '#1e293b', fontSize: item.highlight ? '0.92rem' : '0.78rem' }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mx: 3, borderTop: '2px dashed #e2e8f0' }} />
                <Box sx={{ px: { xs: 2, sm: 4 }, py: 1.8, textAlign: 'center', backgroundColor: `${themeColor}04` }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Thank you for choosing AllFix.ph!</Typography>
                </Box>
              </Paper>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Tooltip title="View all your current bookings" arrow placement="top">
                  <Button variant="contained" fullWidth onClick={() => { setActiveSection('bookings'); setSelectedService(null); }}
                    sx={{ backgroundColor: themeColor, '&:hover': { backgroundColor: '#0f2a4d' }, borderRadius: 3, textTransform: 'none', fontWeight: 600, minHeight: 48, fontSize: '0.85rem' }}>
                    View Bookings
                  </Button>
                </Tooltip>
                <Tooltip title="Cancel this booking" arrow placement="top">
                  <Button variant="outlined" fullWidth startIcon={<CancelIcon />} onClick={() => openCancelDialog(`B-${bookingId}`)}
                    sx={{ borderColor: '#dc2626', color: '#dc2626', borderRadius: 3, fontWeight: 600, textTransform: 'none', minHeight: 48, fontSize: '0.85rem', '&:hover': { backgroundColor: '#dc2626', color: 'white' } }}>
                    Cancel Booking
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // ── Section Router ────────────────────────────────────────────────────────
  const renderMainContent = () => {
    switch (activeSection) {
      case 'services':      return renderServices();
      case 'bookings':      return renderBookings();
      case 'history':       return renderHistory();
      case 'messages':      return renderMessages();
      case 'notifications': return renderNotifications();
      case 'profile':       return renderProfile();
      case 'help':          return renderHelpSupport();
      case 'booking':       return renderBookingFlow();
      case 'report':        return renderReport();
      default:              return renderServices();
    }
  };

  // ── Nav item arrays for sidebar ───────────────────────────────────────────
  const mainNavItems = [
    { id: 'services',   label: 'Services',   icon: Build },
    { id: 'bookings',   label: 'Bookings',   icon: BookOnline },
    { id: 'history',    label: 'History',    icon: History },
    { id: 'messages',   label: 'Messages',   icon: MessageIcon },
  ];
  const accountNavItems = [
    { id: 'notifications', label: 'Notifications', icon: NotificationsActiveIcon, badge: notificationCount },
    { id: 'profile',       label: 'Profile',        icon: AccountCircleIcon },
  ];
  const helpNavItems = [
    { id: 'help', label: 'Help & Support', icon: HelpOutlineIcon },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>

      {/* ── Cancel Booking Dialog ── */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ backgroundColor: '#dc2626', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.95rem' }}>
          <WarningIcon sx={{ fontSize: 20 }} /> Cancel Booking
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          <Box sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#dc2626', mb: 0.8, fontSize: '0.82rem' }}>Cancellation Policy</Typography>
            {[
              'Cancellations made more than 24 hours before the scheduled service are fully refunded.',
              'Cancellations within 24 hours may incur a cancellation fee.',
              'No-shows are non-refundable.',
            ].map((txt, i) => (
              <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.4, fontSize: '0.78rem' }}>• {txt}</Typography>
            ))}
          </Box>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#1e293b', fontSize: '0.85rem' }}>Are you sure you want to cancel this booking?</Typography>
          {bookingToCancel && <Typography variant="caption" color="text.secondary" sx={{ mt: 0.4, display: 'block' }}>Booking ID: {bookingToCancel}</Typography>}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1.2 }}>
          <Button onClick={() => setCancelDialogOpen(false)} variant="outlined" sx={{ borderColor: themeColor, color: themeColor, borderRadius: 2, fontWeight: 600, textTransform: 'none', fontSize: '0.82rem', px: 2.5, '&:hover': { bgcolor: themeColor, color: 'white' } }}>Keep Booking</Button>
          <Button onClick={handleConfirmCancel} variant="contained" sx={{ backgroundColor: '#dc2626', borderRadius: 2, fontWeight: 600, textTransform: 'none', fontSize: '0.82rem', px: 2.5, '&:hover': { backgroundColor: '#b71c1c' } }}>Yes, Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* ── AppBar ── */}
      <AppBar position="fixed" sx={{ zIndex: 1100, backgroundColor: navBg, boxShadow: navShadow, borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: '64px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component="img" src="/ALLFIXLOGO.png" alt="AllFix.ph Logo" sx={{ width: { xs: 34, md: 44 }, height: { xs: 34, md: 44 }, objectFit: 'contain' }} />
            <Box>
              <Typography fontWeight="bold" sx={{ color: navTextColor, lineHeight: 1, mb: 0.3, fontSize: { xs: '0.92rem', md: '1.15rem' }, transition: 'color 0.3s ease' }}>AllFix.ph</Typography>
              <Typography variant="overline" sx={{ color: navTextColor, lineHeight: 1, fontSize: '0.52rem', letterSpacing: 0.5, transition: 'color 0.3s ease' }}>PROPERTY CARE EXPERTS</Typography>
            </Box>
          </Box>

          {/* Desktop: profile pill */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="View profile or logout" arrow placement="bottom">
              <Box ref={profileAnchorRef} onClick={() => setProfileMenuOpen(p => !p)}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', px: 1.5, py: 0.75, borderRadius: 2.5, transition: 'all 0.2s ease', border: scrolled ? `1px solid ${themeColor}20` : '1px solid rgba(255,255,255,0.2)', backgroundColor: scrolled ? `${themeColor}06` : 'rgba(255,255,255,0.08)', '&:hover': { backgroundColor: scrolled ? `${themeColor}12` : 'rgba(255,255,255,0.16)', border: scrolled ? `1px solid ${themeColor}40` : '1px solid rgba(255,255,255,0.4)' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: navTextColor, lineHeight: 1.2, transition: 'color 0.3s ease', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileName}</Typography>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, color: scrolled ? `${themeColor}80` : 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.6, lineHeight: 1.3, transition: 'color 0.3s ease' }}>USER</Typography>
                </Box>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: scrolled ? `${themeColor}15` : 'rgba(255,255,255,0.2)', border: scrolled ? `2px solid ${themeColor}40` : '2px solid rgba(255,255,255,0.5)' }}>
                  {profilePicture
                    ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <Person sx={{ fontSize: 20, color: scrolled ? themeColor : 'white' }} />}
                </Box>
              </Box>
            </Tooltip>

            <Popper open={profileMenuOpen} anchorEl={profileAnchorRef.current} placement="bottom-end" transition disablePortal style={{ zIndex: 1200 }}>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
                  <Paper elevation={8} sx={{ borderRadius: 2, mt: 0.5, minWidth: 195, overflow: 'hidden', border: `1px solid ${themeColor}20` }}>
                    <ClickAwayListener onClickAway={() => setProfileMenuOpen(false)}>
                      {renderProfileDropdown()}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>

          {/* Mobile: hamburger with badge */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Tooltip title="Open menu" arrow placement="bottom">
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <IconButton onClick={() => setMobileMenuOpen(p => !p)}
                  sx={{ color: navIconColor, transition: 'color 0.3s ease', width: 42, height: 42, padding: '9px' }}>
                  {mobileMenuOpen ? <CloseIcon sx={{ fontSize: 22 }} /> : <MenuIcon sx={{ fontSize: 22 }} />}
                </IconButton>
                {!mobileMenuOpen && notificationCount > 0 && (
                  <Box sx={{ position: 'absolute', top: 5, right: 5, minWidth: 16, height: 16, borderRadius: 99, backgroundColor: '#dc2626', color: 'white', fontSize: '0.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.4, border: `1.5px solid ${scrolled ? 'white' : navbarDefault}`, pointerEvents: 'none', zIndex: 1, boxShadow: '0 1px 4px rgba(220,38,38,0.5)' }}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Box>
                )}
              </Box>
            </Tooltip>
          </Box>
        </Toolbar>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <ClickAwayListener onClickAway={() => setMobileMenuOpen(false)}>
            <Box sx={{
              display: { xs: 'block', md: 'none' },
              backgroundColor: scrolled ? 'white' : navbarDefault,
              borderTop: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
              transition: 'background-color 0.3s ease',
              maxHeight: 'calc(100vh - 64px)', overflowY: 'auto', ...noScrollbar,
            }}>
              {/* Profile header */}
              <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', backgroundColor: scrolled ? `${themeColor}20` : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2.5px solid ${scrolled ? themeColor : 'rgba(255,255,255,0.6)'}` }}>
                    {profilePicture
                      ? <Box component="img" src={profilePicture} alt="Profile" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <Person sx={{ fontSize: 24, color: scrolled ? themeColor : 'white' }} />}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.92rem', color: navTextColor, lineHeight: 1.25 }} noWrap>{profileName}</Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: scrolled ? '#64748b' : 'rgba(255,255,255,0.65)', lineHeight: 1.3 }} noWrap>{profileEmail}</Typography>
                  </Box>
                  <Tooltip title="Go to your profile" arrow placement="left">
                    <Button size="small" onClick={() => { setActiveSection('profile'); setMobileMenuOpen(false); }}
                      sx={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'none', color: navTextColor, border: `1px solid ${scrolled ? `${themeColor}30` : 'rgba(255,255,255,0.3)'}`, borderRadius: 2, px: 1.2, py: 0.5, flexShrink: 0, '&:hover': { backgroundColor: scrolled ? `${themeColor}10` : 'rgba(255,255,255,0.1)' } }}>
                      Profile
                    </Button>
                  </Tooltip>
                </Box>
              </Box>

              {/* Help & Support item */}
              <Box sx={{ px: 1.5, py: 1 }}>
                <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color: scrolled ? '#94a3b8' : 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 1.3, px: 1, pt: 1.2, pb: 0.6 }}>Support</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.8, mb: 0.8 }}>
                  {[{ id: 'help', label: 'Help & Support', icon: HelpOutlineIcon }].map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <Tooltip key={item.id} title={item.label} arrow placement="top">
                        <Box onClick={() => { setActiveSection(item.id); setSelectedBooking(null); setMobileMenuOpen(false); }}
                          sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 1.4, py: 1.1, borderRadius: 2.5, cursor: 'pointer', backgroundColor: isActive ? (scrolled ? themeColor : 'rgba(255,255,255,0.18)') : (scrolled ? `${themeColor}06` : 'rgba(255,255,255,0.06)'), border: isActive ? `1.5px solid ${scrolled ? themeColor : 'rgba(255,255,255,0.4)'}` : `1.5px solid ${scrolled ? `${themeColor}12` : 'rgba(255,255,255,0.1)'}`, transition: 'all 0.15s ease', '&:hover': { backgroundColor: isActive ? (scrolled ? themeColor : 'rgba(255,255,255,0.22)') : (scrolled ? `${themeColor}10` : 'rgba(255,255,255,0.12)') } }}>
                          <Box sx={{ width: 30, height: 30, borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isActive ? 'rgba(255,255,255,0.22)' : (scrolled ? `${themeColor}10` : 'rgba(255,255,255,0.12)') }}>
                            <Icon sx={{ fontSize: 15, color: isActive ? 'white' : (scrolled ? themeColor : 'rgba(255,255,255,0.85)') }} />
                          </Box>
                          <Typography sx={{ fontSize: '0.78rem', fontWeight: isActive ? 800 : 600, color: isActive ? 'white' : (scrolled ? '#334155' : 'rgba(255,255,255,0.88)'), lineHeight: 1.2 }}>
                            {item.label}
                          </Typography>
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>

              {/* Notification quick preview */}
              {notificationCount > 0 && (
                <Box sx={{ mx: 1.5, mb: 1, p: 1.2, borderRadius: 2.5, backgroundColor: scrolled ? '#fef2f2' : 'rgba(220,38,38,0.15)', border: scrolled ? '1px solid #fecaca' : '1px solid rgba(220,38,38,0.3)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <NotificationsIcon sx={{ fontSize: 14, color: '#ef4444' }} />
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: scrolled ? '#dc2626' : '#fca5a5' }}>{notificationCount} unread notification{notificationCount > 1 ? 's' : ''}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.8 }}>
                      <Typography onClick={handleMarkAllRead} sx={{ fontSize: '0.62rem', fontWeight: 700, color: scrolled ? '#dc2626' : '#fca5a5', cursor: 'pointer', textDecoration: 'underline' }}>Mark read</Typography>
                      <Typography sx={{ fontSize: '0.62rem', color: scrolled ? '#94a3b8' : 'rgba(255,255,255,0.4)' }}>·</Typography>
                      <Typography onClick={() => { setActiveSection('notifications'); setMobileMenuOpen(false); }} sx={{ fontSize: '0.62rem', fontWeight: 700, color: scrolled ? '#dc2626' : '#fca5a5', cursor: 'pointer', textDecoration: 'underline' }}>View all</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                    {notifications.filter(n => !n.read).slice(0, 2).map(notif => {
                      const NIcon = notif.icon;
                      const typeColors = { chat: '#2563eb', booking: '#16a34a', status: '#f59e0b', system: '#6b7280' };
                      const col = typeColors[notif.type] || themeColor;
                      return (
                        <Box key={notif.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.8, py: 0.3 }}>
                          <NIcon sx={{ fontSize: 12, color: col, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '0.68rem', color: scrolled ? '#475569' : 'rgba(255,255,255,0.75)', lineHeight: 1.3, flex: 1 }} noWrap>{notif.title}</Typography>
                          <Typography sx={{ fontSize: '0.6rem', color: scrolled ? '#94a3b8' : 'rgba(255,255,255,0.45)', flexShrink: 0 }}>{notif.time}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {/* Logout */}
              <Box sx={{ px: 1.5, pb: 2, pt: 0.5, borderTop: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)' }}>
                <Tooltip title="Sign out of your account" arrow placement="top">
                  <Button fullWidth startIcon={<Logout sx={{ fontSize: 16 }} />} onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 700, fontSize: '0.82rem', color: '#ef4444', py: 1, px: 1.4, borderRadius: 2.5, '&:hover': { backgroundColor: 'rgba(239,68,68,0.08)' } }}>
                    Logout
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </ClickAwayListener>
        )}
      </AppBar>

      {/* ── Main Layout ── */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px', pb: { xs: '56px', md: 0 }, overflow: 'hidden', height: '100vh' }}>

        {/* Sidebar — desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, width: 240, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid #e2e8f0', flexDirection: 'column', overflowY: 'auto', boxShadow: '2px 0 8px rgba(18,56,101,0.04)', ...noScrollbar }}>
          <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, borderBottom: `1px solid ${themeColor}10`, background: `linear-gradient(135deg, ${themeColor}08 0%, transparent 100%)` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '8px', backgroundColor: themeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${themeColor}40` }}>
                <DashboardIcon sx={{ fontSize: 15, color: 'white' }} />
              </Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 900, color: themeColor, letterSpacing: 0.6, textTransform: 'uppercase' }}>Dashboard</Typography>
            </Box>
            <Typography sx={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 500, pl: '38px' }}>Welcome back, {profileName}</Typography>
          </Box>

          <Box sx={{ px: 2.5, pt: 1.8, pb: 0.5 }}>
            <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>General</Typography>
          </Box>
          <List sx={{ px: 1.2, pb: 0.5, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {mainNavItems.map(item => renderSidebarBtn(item))}
          </List>

          <Box sx={{ px: 2.5, pt: 1.3, pb: 0.5 }}>
            <Divider sx={{ mb: 1.2, borderColor: `${themeColor}10` }} />
            <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>Account</Typography>
          </Box>
          <List sx={{ px: 1.2, pb: 0.5, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {accountNavItems.map(item => renderSidebarBtn(item))}
          </List>

          <Box sx={{ px: 2.5, pt: 1.3, pb: 0.5 }}>
            <Divider sx={{ mb: 1.2, borderColor: `${themeColor}10` }} />
            <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>Support</Typography>
          </Box>
          <List sx={{ px: 1.2, pb: 1.5, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {helpNavItems.map(item => renderSidebarBtn(item))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderMainContent()}
        </Box>
      </Box>

      {/* ── Bottom Navigation — mobile only ── */}
      <BottomNavigation
        value={MOBILE_NAV_ITEMS.some(n => n.id === activeSection) ? activeSection : false}
        onChange={(event, newValue) => { setActiveSection(newValue); setSelectedBooking(null); }}
        sx={{ display: { xs: 'flex', md: 'none' }, bgcolor: 'white', borderTop: '1px solid #e2e8f0', boxShadow: '0 -2px 8px rgba(0,0,0,0.1)', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1050, height: 60, alignItems: 'center' }}>
        {MOBILE_NAV_ITEMS.map(({ id, label, icon: Icon, priority }) => {
          const isActive = activeSection === id;

          if (priority) {
            return (
              <BottomNavigationAction key={id} label={label} value={id}
                icon={
                  <Tooltip title={label} arrow placement="top">
                    <Box sx={{ width: 46, height: 46, borderRadius: '35%', backgroundColor: isActive ? '#0f2a4d' : themeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isActive ? `0 6px 18px ${themeColor}70` : `0 4px 14px ${themeColor}60`, mb: 0.3, mt: -1.5, border: '3px solid white', transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                      <Icon sx={{ fontSize: 22, color: 'white' }} />
                    </Box>
                  </Tooltip>
                }
                sx={{ color: isActive ? themeColor : '#94a3b8', minWidth: 0, px: 0.25, '& .MuiBottomNavigationAction-label': { fontSize: '0.52rem', marginTop: '2px', fontWeight: isActive ? 800 : 600, color: isActive ? themeColor : '#94a3b8' } }}
              />
            );
          }

          return (
            <BottomNavigationAction key={id} label={label} value={id}
              icon={
                <Tooltip title={label} arrow placement="top">
                  <Badge badgeContent={id === 'notifications' ? notificationCount : 0} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.48rem', minWidth: 12, height: 12, padding: '0 2px', top: 1, right: 1 } }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s ease', backgroundColor: isActive ? `${themeColor}12` : 'transparent', '&:hover': { backgroundColor: `${themeColor}10` }, '&:active': { backgroundColor: `${themeColor}18`, transform: 'scale(0.92)' } }}>
                      <Icon sx={{ color: isActive ? themeColor : '#94a3b8', fontSize: 21 }} />
                    </Box>
                  </Badge>
                </Tooltip>
              }
              sx={{ color: isActive ? themeColor : '#94a3b8', minWidth: 0, px: 0.25, '& .MuiBottomNavigationAction-label': { fontSize: '0.52rem', marginTop: '2px', fontWeight: isActive ? 700 : 500, color: isActive ? themeColor : '#94a3b8' } }}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};

export default UserPage;


