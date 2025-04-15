import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar'

import './App.css'
import Register from "./pages/Signup/Register";
import VerifyOtp from "./pages/Signup/VerifyOtp.jsx";
import PersonalDetails from "./pages/Signup/PersonalDetails.jsx";
import ProfileView from "./pages/Home/ProfileView.jsx";

function AppRoutes() {
  const location = useLocation();

  // Do not show Navbar on /register
  const hideNavbar = location.pathname === "/register";
  const hideNavbarOTP = location.pathname === "/verify-otp";
  const hideeNavbarPersonalDetails = location.pathname === "/personal-details";
  const hideNavbarLogin = location.pathname === "/login";

  return (
    <>
     {!(hideNavbar || hideNavbarOTP || hideeNavbarPersonalDetails || hideNavbarLogin) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/profile-view" element={<ProfileView />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
