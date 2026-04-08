import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { confirmUserSignUp, resendVerificationCode } from '../../api/authService';
import { useAuth } from '../../contexts/AuthContext';

const ConfirmSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState(location.state?.email || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const result = await confirmUserSignUp(email, code);

    if (result.success) {
      await refreshAuth();
      navigate('/user');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    const result = await resendVerificationCode(email);

    if (result.success) {
      setSuccess('Verification code sent to your email');
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
            Verify Email
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Enter the verification code sent to your email
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

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isLoading || !!location.state?.email}
            />
            <TextField
              label="Verification Code"
              fullWidth
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ mb: 3 }}
              disabled={isLoading}
              placeholder="Enter 6-digit code"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Verify'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={handleResendCode}
              disabled={isLoading || !email}
            >
              Resend verification code
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#666', fontSize: '0.875rem' }}>
              ← Back to login
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfirmSignup;
