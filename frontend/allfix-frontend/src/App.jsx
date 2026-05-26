import { Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { AuthProvider, ROLES } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRedirect from './components/LoginRedirect'
import LandingRedirect from './components/LandingRedirect'

// Landing & Public Pages
import LandingPage from './pages/landingpage/LandingPage'
import PrivacyPage from './pages/footerlinks/PrivacyPage';
import TermsOfUse from './pages/footerlinks/TermsOfUse';
import AboutUsPage from './pages/footerlinks/AboutUsPage';
import CareersPage from './pages/footerlinks/CareersPage';
import HelpCenterPage from './pages/footerlinks/HelpCenterPage';
import ServiceGuaranteePage from './pages/footerlinks/ServiceGuaranteePage';
import CoolFixPage from './pages/servicespage/CoolFixPage';
import SaniFixPage from './pages/servicespage/SaniFixPage';
import HomeFixPage from './pages/servicespage/HomeFixPage';
import MoveFixPage from './pages/servicespage/MoveFixPage';
import GreenFixPage from './pages/servicespage/GreenFixPage';
import HealthFixPage from './pages/servicespage/HealthFixPage';
import SpaceFixPage from './pages/servicespage/SpaceFixPage';
import PetFixPage from './pages/servicespage/PetFixPage';
import TechFixPage from './pages/servicespage/TechFixPage';

// Auth Pages
import CustomerLogin from './pages/landingpage/CustomerLogin'
import CustomerSignup from './pages/landingpage/CustomerSignup'
import ConfirmSignup from './pages/landingpage/ConfirmSignup'
import VendorLogin from './pages/landingpage/VendorLogin'
import VendorApplication from './pages/landingpage/VendorApplication'
import VendorApplicationSubmitted from './pages/landingpage/VendorApplicationSubmitted'
import PersonnelLogin from './pages/landingpage/PersonnelLogin'
import PersonnelLandingPage from './pages/landingpage/PersonnelLandingPage'
import AdminLogin from './pages/landingpage/AdminLogin'
import ForgotPassword from './pages/landingpage/ForgotPassword'

// Protected Pages
import AdminPage from './pages/adminpage/AdminPage'
import VendorPage from './pages/vendorpage/VendorPage'
import PersonnelPage from './pages/personnelpage/PersonnelPage'
import UserPage from './pages/userpage/UserPage'

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        {/* Public Routes - Landing page redirects authenticated users to their dashboard */}
        <Route path="/" element={
          <LandingRedirect>
            <LandingPage />
          </LandingRedirect>
        } />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/service-guarantee" element={<ServiceGuaranteePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/coolfix" element={<CoolFixPage />} />
        <Route path="/sanifix" element={<SaniFixPage />} />
        <Route path="/homefix" element={<HomeFixPage />} />
        <Route path="/movefix" element={<MoveFixPage />} />
        <Route path="/greenfix" element={<GreenFixPage />} />
        <Route path="/healthfix" element={<HealthFixPage />} />
        <Route path="/spacefix" element={<SpaceFixPage />} />
        <Route path="/petfix" element={<PetFixPage />} />
        <Route path="/techfix" element={<TechFixPage />} />

        {/* Customer Auth Routes */}
        <Route path="/login" element={
          <LoginRedirect requiredRole={ROLES.CUSTOMER} redirectTo="/user">
            <CustomerLogin />
          </LoginRedirect>
        } />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Vendor Auth Routes */}
        <Route path="/vendor-login" element={
          <LoginRedirect requiredRole={ROLES.VENDOR} redirectTo="/vendor">
            <VendorLogin />
          </LoginRedirect>
        } />
        <Route path="/vendor-apply" element={<VendorApplication />} />
        <Route path="/vendor-application-submitted" element={<VendorApplicationSubmitted />} />

        {/* Personnel Register */}
        <Route path="/personnel-register" element={<PersonnelLandingPage />} />

        {/* Staff Auth Routes */}
        <Route path="/personnel-login" element={
          <LoginRedirect requiredRole={ROLES.PERSONNEL} redirectTo="/personnel">
            <PersonnelLogin />
          </LoginRedirect>
        } />
        <Route path="/admin-login" element={
          <LoginRedirect requiredRole={ROLES.ADMIN} redirectTo="/admin">
            <AdminLogin />
          </LoginRedirect>
        } />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute redirectTo="/login">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={ROLES.VENDOR} redirectTo="/vendor-login">
              <VendorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personnel"
          element={
            <ProtectedRoute allowedRoles={ROLES.PERSONNEL} redirectTo="/personnel-login">
              <PersonnelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={ROLES.ADMIN} redirectTo="/admin-login">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
