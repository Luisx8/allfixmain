import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { signUpUser, confirmUserSignUp } from '../../api/authService';

const steps = ['Account Details', 'Business Info', 'Verify Email'];

const VendorApplication = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Account details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Business info (stored for later use when admin approves)
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  // Step 3: Verification
  const [verificationCode, setVerificationCode] = useState('');

  const handleNext = async () => {
    setError('');

    if (activeStep === 0) {
      // Validate account details
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Validate business info and create account
      if (!businessName || !contactNumber) {
        setError('Please fill in all required fields');
        return;
      }

      setIsLoading(true);
      const result = await signUpUser(email, password);

      if (result.success) {
        setActiveStep(2);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    } else if (activeStep === 2) {
      // Verify email
      setIsLoading(true);
      const result = await confirmUserSignUp(email, verificationCode);

      if (result.success) {
        // Application submitted - pending admin approval
        // In a real app, you'd also POST the business info to your backend
        navigate('/vendor-application-submitted', {
          state: { businessName, email },
        });
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
              helperText="Minimum 8 characters"
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Business Name"
              fullWidth
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
            />
            <TextField
              label="Business Address"
              fullWidth
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
            />
            <TextField
              label="Contact Number"
              fullWidth
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
            />
            <TextField
              label="Services Description"
              fullWidth
              multiline
              rows={3}
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
              helperText="Describe the services you offer"
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              A verification code has been sent to <strong>{email}</strong>
            </Typography>
            <TextField
              label="Verification Code"
              fullWidth
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading}
              placeholder="Enter 6-digit code"
            />
          </>
        );
      default:
        return null;
    }
  };

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
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Vendor Application
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Apply to become a service provider on Allfix
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {renderStepContent()}

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoading}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
              sx={{
                flex: 1,
                bgcolor: '#2e7d32',
                '&:hover': { bgcolor: '#1b5e20' },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : activeStep === 2 ? (
                'Submit Application'
              ) : (
                'Next'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Already a vendor?{' '}
              <Link to="/vendor-login" style={{ color: '#2e7d32' }}>
                Sign in
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="/" style={{ color: '#666', fontSize: '0.875rem' }}>
              ← Back to home
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VendorApplication;
