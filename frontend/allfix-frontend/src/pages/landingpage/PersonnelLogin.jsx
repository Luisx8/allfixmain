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
} from '@mui/material';
import { signInUser } from '../../api/authService';
import { useAuth, ROLES } from '../../contexts/AuthContext';

const PersonnelLogin = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signInUser(email, password);

    if (result.success) {
      const groups = result.data.groups || [];
      const isPersonnel = groups.includes(ROLES.PERSONNEL);
      
      if (isPersonnel) {
        await refreshAuth();
        navigate('/personnel');
      } else {
        setError('This account is not registered as personnel');
      }
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
            Personnel Login
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Sign in to view your assigned tasks
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
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
              disabled={isLoading}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ bgcolor: '#ed6c02', '&:hover': { bgcolor: '#e65100' } }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Personnel accounts are created by vendors.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link to="/forgot-password" style={{ color: '#ed6c02' }}>
                Forgot password?
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

export default PersonnelLogin;
