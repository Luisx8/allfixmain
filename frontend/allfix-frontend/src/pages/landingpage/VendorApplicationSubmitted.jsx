import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VendorApplicationSubmitted = () => {
  const location = useLocation();
  const { businessName, email } = location.state || {};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#2e7d32', mb: 2 }} />

          <Typography variant="h4" component="h1" gutterBottom>
            Application Submitted!
          </Typography>

          {businessName && (
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {businessName}
            </Typography>
          )}

          <Typography variant="body1" sx={{ mb: 3 }}>
            Thank you for applying to become a vendor on Allfix. Your application
            is now pending review by our admin team.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We'll notify you at <strong>{email}</strong> once your application
            has been reviewed. This typically takes 1-3 business days.
          </Typography>

          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2">
              <strong>What happens next?</strong>
            </Typography>
            <Typography variant="body2" component="ul" sx={{ textAlign: 'left', mt: 1 }}>
              <li>Our team reviews your application</li>
              <li>You'll receive an email with the decision</li>
              <li>Once approved, you can log in as a vendor</li>
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VendorApplicationSubmitted;
