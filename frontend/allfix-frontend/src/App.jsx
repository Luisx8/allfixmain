import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingpage/LandingPage'
import AdminPage from './pages/adminpage/AdminPage'
import VendorPage from './pages/vendorpage/VendorPage'
import PersonnelPage from './pages/personnelpage/PersonnelPage'
import UserPage from './pages/userpage/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/vendor" element={<VendorPage />} />
      <Route path="/personnel" element={<PersonnelPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  )
}

export default App
