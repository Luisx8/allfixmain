import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, AppBar, Toolbar, CssBaseline, Button, Grid, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const spacefixServices = [
  { title: 'Decluttering & Organization', description: 'Professional organization for closets, pantries, and garages to maximize space.' },
  { title: 'Interior Layout Planning', description: 'Providing 2D/3D floor plans to help clients arrange their existing furniture better.' },
  { title: 'Custom Storage Solutions', description: 'Designing and installing modular shelving for tight condo spaces.' },
  { title: 'Home Staging', description: 'Decorating and arranging properties to make them more appealing for rent or sale.' },
  { title: 'Balcony / Urban Garden Setup', description: 'Transforming small outdoor spaces into relaxing, green living areas.' },
  { title: 'Interior Services', description: 'Various space planning and interior design services.' },
];

const SpaceFixPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1100, background: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%)', backgroundImage: 'linear-gradient(135deg, #10355f 0%, #0d264a 55%, #1a3f70 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backdropFilter: 'blur(20px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 5 }, minHeight: '80px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', ml: { xs: 0, md: 8, lg: 16 } }} onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
            <Box sx={{ width: 44, height: 44, bgcolor: 'grey.400', borderRadius: '50%' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" color="white" sx={{ lineHeight: 1, mb: 0.3, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>AllFix.ph</Typography>
              <Typography variant="overline" color="rgba(255,255,255,0.7)" sx={{ lineHeight: 1, fontSize: { xs: '0.65rem', md: '0.65rem' }, letterSpacing: 0.5 }}>PROPERTY CARE EXPERTS</Typography>
            </Box>
          </Box>
          <Box sx={{ mr: { xs: 0, md: 8, lg: 16 } }}>
            <Button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} sx={{ color: 'white', fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', '&:hover': { color: '#eaf2fc', backgroundColor: 'rgba(255, 255, 255, 0.1)' }, px: 2, py: 1, borderRadius: '8px', transition: 'all 0.3s ease' }}>Back to Home</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', width: '100%' }}>
        <Box sx={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 12, md: 10 }, pb: { xs: 6, md: 8 }, px: 3, background: 'linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%)', overflow: 'visible' }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <HomeOutlinedIcon sx={{ fontSize: 80, color: '#0277bd' }} />
            </Box>
            <Typography variant="h1" fontWeight="900" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.2, mb: 3, letterSpacing: '-0.02em', color: '#10355f' }}>SpaceFix</Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.6, maxWidth: '700px', mx: 'auto', color: '#555' }}>Space Planning & Interiors | Creative • Functional • Beautiful</Typography>
          </Container>
        </Box>

        <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 12 }, bgcolor: 'white', width: '100%' }}>
          <Container maxWidth="md">
            <Section title="About SpaceFix">
              <Typography sx={{ mb: 2, color: '#555', lineHeight: 1.8 }}>
                SpaceFix is AllFix.ph's interior design and space planning division. We transform homes and offices into beautiful, functional spaces through expert design and organization. Our professionals help you make the most of every square foot.
              </Typography>
              <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
                From space planning and interior design to organization and furniture arrangement, we create environments that inspire comfort and productivity.
              </Typography>
            </Section>

            <Section title="Services Offered">
              <Grid container spacing={2}>
                {spacefixServices.map((service, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, bgcolor: '#f0f7ff', borderRadius: '8px', border: '1px solid #d4e8f7' }}>
                      <CheckCircleIcon sx={{ color: '#2E5BA8', fontSize: 24, mt: 0.5, flexShrink: 0 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: '#10355f', mb: 0.5 }}>{service.title}</Typography>
                        <Typography sx={{ fontSize: '0.95rem', color: '#666' }}>{service.description}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Section>

            <Typography sx={{ mt: 6, pt: 4, borderTop: '1px solid #e5eaf2', color: '#999', fontSize: '0.85rem' }}>Last Updated: May 5, 2026</Typography>
          </Container>
        </Box>

        <Box component="footer" sx={{ width: '100%', bgcolor: '#0a1e3f', pt: { xs: 8, md: 10 }, pb: { xs: 4, md: 6 }, color: 'white' }}>
          <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
            <Grid container spacing={{ xs: 4, md: 10, lg: 12 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, cursor: 'pointer' }} onClick={() => { navigate('/'); window.scrollTo(0,0); }}>
                  <Box sx={{ width: 32, height: 32, position: 'relative', display: 'flex', flexWrap: 'wrap', borderRadius: '50%', overflow: 'hidden' }}>
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#4285F4' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#EA4335' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#FBBC05' }} />
                    <Box sx={{ width: '50%', height: '50%', bgcolor: '#34A853' }} />
                  </Box>
                  <Typography variant="h5" fontWeight="900" color="white" sx={{ letterSpacing: '-0.02em', fontSize: '1.4rem' }}>AllFix<span style={{ color: '#60a5fa' }}>.ph</span></Typography>
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
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>COMPANY</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['About AllFix', 'Careers', 'Press & Media', 'Investor Relations'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SERVICES</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Air-con (CoolFix)', 'Plumbing (SaniFix)', 'Repairs (HomeFix)', 'IT Support (TechFix)', 'Moving (MoveFix)', 'Health (HealthFix)', 'Sustainability (GreenFix)', 'Pets (PetFix)'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>SUPPORT</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Help Center', 'Book a Service', 'Track My Job', 'Partner With Us'].map(link => (
                    <Typography key={link} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', mb: 3, color: 'white' }}>LEGAL</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Service Guarantee'].map(link => (
                    <Typography key={link} onClick={() => { if (link === 'Privacy Policy') { navigate('/privacy'); window.scrollTo(0, 0); } else if (link === 'Terms of Service') { navigate('/terms-of-use'); window.scrollTo(0, 0); } }} sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>{link}</Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: { xs: 5, md: 2 } }} />
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>CALL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>+63 920 9631 217 | +63 975 8336 289</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>EMAIL US</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>inquiry@allfix.ph</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, color: 'white' }}>
                    <LocationOnIcon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', mb: 0.3, letterSpacing: '0.05em' }}>HEAD OFFICE</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', lineHeight: 1.4 }}>9824 Kamagong Street, San Antonio Village,<br/>Makati City 1203 Philippines</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              <Typography variant="caption" sx={{ fontSize: 'inherit' }}>© 2026 AllFix Philippines Inc. All rights reserved. DTI Reg. No. 2021-00001.</Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h3" fontWeight="800" color="#10355f" sx={{ mb: 3, fontSize: '1.8rem' }}>{title}</Typography>
    <Box sx={{ color: '#555', lineHeight: 1.8 }}>{children}</Box>
  </Box>
);

export default SpaceFixPage;
