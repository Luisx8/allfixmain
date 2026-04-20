import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserPage = () => {
  const navigate = useNavigate();
  const { logout, userAttributes } = useAuth();
  const displayName = userAttributes?.name || userAttributes?.preferred_username || 'User';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {displayName}!</p>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserPage;