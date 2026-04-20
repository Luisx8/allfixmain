import { Routes, Route } from 'react-router-dom'
import { AuthProvider, ROLES } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRedirect from './components/LoginRedirect'
import LandingRedirect from './components/LandingRedirect'

// Landing & Public Pages
import LandingPage from './pages/landingpage/LandingPage'

// Auth Pages
import CustomerLogin from './pages/landingpage/CustomerLogin'
import CustomerSignup from './pages/landingpage/CustomerSignup'
import ConfirmSignup from './pages/landingpage/ConfirmSignup'
import VendorLogin from './pages/landingpage/VendorLogin'
import VendorApplication from './pages/landingpage/VendorApplication'
import VendorApplicationSubmitted from './pages/landingpage/VendorApplicationSubmitted'
import PersonnelLogin from './pages/landingpage/PersonnelLogin'
import AdminLogin from './pages/landingpage/AdminLogin'
import ForgotPassword from './pages/landingpage/ForgotPassword'
import PmsTrustedBridge from './pages/landingpage/PmsTrustedBridge'

// Protected Pages
import AdminPage from './pages/adminpage/AdminPage'
import VendorPage from './pages/vendorpage/VendorPage'
import PersonnelPage from './pages/personnelpage/PersonnelPage'
import UserPage from './pages/userpage/UserPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - Landing page redirects authenticated users to their dashboard */}
        <Route path="/" element={
          <LandingRedirect>
            <LandingPage />
          </LandingRedirect>
        } />

        {/* Customer Auth Routes */}
        <Route path="/login" element={
          <LoginRedirect requiredRole={ROLES.CUSTOMER} redirectTo="/user">
            <CustomerLogin />
          </LoginRedirect>
        } />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* OIDC callback route for Hosted UI code+PKCE flow */}
        <Route path="/auth/callback" element={
          <LandingRedirect>
            <LandingPage />
          </LandingRedirect>
        } />

        {/* PMS trusted handoff bridge (no Hosted UI) */}
        <Route path="/auth/pms-trusted" element={<PmsTrustedBridge />} />

        {/* Vendor Auth Routes */}
        <Route path="/vendor-login" element={
          <LoginRedirect requiredRole={ROLES.VENDOR} redirectTo="/vendor">
            <VendorLogin />
          </LoginRedirect>
        } />
        <Route path="/vendor-apply" element={<VendorApplication />} />
        <Route path="/vendor-application-submitted" element={<VendorApplicationSubmitted />} />

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
