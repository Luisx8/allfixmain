import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAuthenticatedUser,
  getAuthSession,
  getUserAttributes,
  signOutUser,
} from '../api/authService';

const AuthContext = createContext(null);

export const ROLES = {
  CUSTOMER: 'customers',
  VENDOR: 'vendors',
  PERSONNEL: 'personnel',
  ADMIN: 'admins',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const userResult = await getAuthenticatedUser();
      if (!userResult.success) {
        setUser(null);
        setUserAttributes(null);
        setGroups([]);
        setIsAuthenticated(false);
        return;
      }

      setUser(userResult.data);
      setIsAuthenticated(true);

      // Fetch session to get groups
      const sessionResult = await getAuthSession();
      if (sessionResult.success) {
        setGroups(sessionResult.data.groups);
      }

      // Mark auth as resolved once principal + groups are available.
      // User attributes are non-blocking metadata and can load in the background.
      setIsLoading(false);

      void getUserAttributes()
        .then((attributesResult) => {
          if (attributesResult.success) {
            setUserAttributes(attributesResult.data);
          }
        })
        .catch((attributesError) => {
          console.warn('User attributes fetch failed:', attributesError);
        });

      return;
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setUserAttributes(null);
      setGroups([]);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const logout = async () => {
    const result = await signOutUser();
    setUser(null);
    setUserAttributes(null);
    setGroups([]);
    setIsAuthenticated(false);
    return result;
  };

  const hasRole = (role) => {
    return groups.includes(role);
  };

  const isCustomer = () => hasRole(ROLES.CUSTOMER);
  const isVendor = () => hasRole(ROLES.VENDOR);
  const isPersonnel = () => hasRole(ROLES.PERSONNEL);
  const isAdmin = () => hasRole(ROLES.ADMIN);

  const value = {
    user,
    userAttributes,
    groups,
    isAuthenticated,
    isLoading,
    logout,
    refreshAuth: checkAuthStatus,
    hasRole,
    isCustomer,
    isVendor,
    isPersonnel,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
