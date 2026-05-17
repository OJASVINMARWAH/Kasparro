import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NoirNavbar from './components/NoirNavbar';
import LandingPage from './pages/LandingPage';
import LiveSupportPage from './pages/LiveSupportPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ComplaintIntakePage from './pages/ComplaintIntakePage';
import CustomerTrackingPage from './pages/CustomerTrackingPage';
import './styles/globals.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardView, setDashboardView] = useState('view-support'); // default or get from auth context
  const [selectedCase, setSelectedCase] = useState(null);

  const handleComplaintSuccess = (caseData) => {
    setSelectedCase(caseData);
    navigate('/track');
  };

  const handleTalkToAI = () => {
    navigate('/live-support');
  };

  const handleCloseAISupport = () => {
    navigate(-1); // go back
  };

  const handleEnterPortal = () => {
    navigate('/login');
  };

  const handleLogin = (role) => {
    setDashboardView(role);
    if (role === 'view-customer') {
      navigate('/claim');
    } else {
      navigate('/dashboard');
    }
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleSignOut = () => {
    navigate('/');
  };

  const handleNavClick = (view) => {
    setDashboardView(view);
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="grid-layer"></div>
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      {location.pathname !== '/live-support' && (
        <NoirNavbar 
          onTalkToAI={handleTalkToAI} 
          activeView={dashboardView} 
          onNavClick={handleNavClick} 
          onSignOut={handleSignOut} 
          currentPage={location.pathname}
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPage onEnterPortal={handleEnterPortal} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} onReturnHome={handleReturnHome} />} />
        <Route path="/claim" element={<ComplaintIntakePage onComplaintSuccess={handleComplaintSuccess} />} />
        <Route path="/track" element={<CustomerTrackingPage selectedCase={selectedCase} />} />
        <Route path="/dashboard" element={<DashboardPage activeView={dashboardView} />} />
        <Route path="/live-support" element={<LiveSupportPage onClose={handleCloseAISupport} />} />
      </Routes>

      {location.pathname !== '/live-support' && (
        <div className="curator-footer">
          Curated By Hurreet Kaur and Ojasvin Marwah, TIET Patiala
        </div>
      )}
    </>
  );
}

export default App;
