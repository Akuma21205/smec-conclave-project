import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PasswordReset from './components/PasswordReset';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import Loader from './components/Loader';
import StaggeredMenu from './components/StaggeredMenu';
import SmoothScroll from './components/SmoothScroll';
import LightRays from './components/LightRays';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';

// Pages
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import SpeakersPage from './pages/SpeakersPage';
import SponsorsPage from './pages/SponsorsPage';
import PassesPage from './pages/PassesPage';
import AccommodationPage from './pages/AccommodationPage';
import DashboardPage from './pages/DashboardPage';

import './index.css';

// Menu items configuration
const menuItems = [
  { label: 'Home', ariaLabel: 'Go to Home', link: '/' },
  { label: 'About', ariaLabel: 'Go to About', link: '/about' },
  { label: 'Agenda', ariaLabel: 'Go to Event Agenda', link: '/events' },
  { label: 'Speakers', ariaLabel: 'Go to Speakers', link: '/speakers' },
  { label: 'Sponsors', ariaLabel: 'Go to Sponsors', link: '/sponsors' },
  { label: 'Passes', ariaLabel: 'Go to Passes', link: '/passes' },
  { label: 'Stay', ariaLabel: 'Go to Accommodation', link: '/accommodation' },
  { label: 'Login', ariaLabel: 'Go to Login', link: '/login' },
  { label: 'Dashboard', ariaLabel: 'Go to Dashboard', link: '/dashboard' },
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
];

// Handle GSAP animations on route change
const PageAnimations = () => {
  // Use GSAP hook for scroll animations
  useGSAPAnimations();
  return null;
};

// Main app content wrapped with SmoothScroll
const AppContent = () => {
  return (
    <>
      {/* Staggered Menu Navigation - Fixed position, outside smooth scroll flow */}
      <StaggeredMenu
          items={menuItems}
          socialItems={socialItems}
          logoUrl="/logo.png"
          colors={['#111118', '#8B7BB5']} // Background Secondary, Primary Violet
          accentColor="#8B7BB5"
          menuButtonColor="#EAEAEA"
          openMenuButtonColor="#EAEAEA" // Light for when menu is open (on dark panel)
          isFixed={true}
          displaySocials={true}
          displayItemNumbering={false}
      />
      <SmoothScroll>
        <div className="animate-fade-up">

        <PageAnimations />
        <BackgroundEffects />
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
             <LightRays raysColor="#8B7BB5" raysSpeed={0.5} raysOrigin="top-center" lightSpread={0.5} />
        </div>
        
        <div className="main-container flex flex-col min-h-screen relative z-10">
          <div className="flex-1 pt-20">
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/speakers" element={<SpeakersPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/passes" element={<PassesPage />} />
              <Route path="/accommodation" element={<AccommodationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Auth Pages */}
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<PasswordReset />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && <Loader />}
      {!loading && <AppContent />}
    </Router>
  );
}

export default App;
