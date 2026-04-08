import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { initiatePasswordReset, confirmPasswordReset } from '../../api/authService';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: code + new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await initiatePasswordReset(email);

    if (result.success) {
      setStep(2);
      setSuccess('Verification code sent to your email');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    const result = await confirmPasswordReset(email, code, newPassword);

    if (result.success) {
      setSuccess('Password reset successfully! You can now sign in.');
      setStep(3); // Success state
    } else {
      setError(result.error);
    }

    setIsLoading(false);
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
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Reset Password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestCode}>
              <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                Enter your email to receive a verification code
              </Typography>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Send Code'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                Enter the code sent to <strong>{email}</strong> and your new password
              </Typography>
              <TextField
                label="Verification Code"
                fullWidth
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ mb: 2 }}
                disabled={isLoading}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
                disabled={isLoading}
                helperText="Minimum 8 characters"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3 }}
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
              </Button>
            </form>
          )}

          {step === 3 && (
            <Box textAlign="center">
              <Typography variant="body1" sx={{ mb: 3 }}>
                Your password has been reset successfully.
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
              >
                Go to Login
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#666', fontSize: '0.875rem' }}>
              ← Back to login
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
