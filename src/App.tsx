import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AgendaPage from './components/AgendaPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PasswordReset from './components/PasswordReset';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import Loader from './components/Loader';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';
import './index.css';

// Handle scroll to top and GSAP animations on route change
const PageAnimations = () => {
  const { pathname } = useLocation();

  // Use GSAP hook for scroll animations
  useGSAPAnimations();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
      {!loading && (
        <div className="animate-fade-up">
          <PageAnimations />
          <BackgroundEffects />
          <div className="main-container flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/agenda" element={<AgendaPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/forgot-password" element={<PasswordReset />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
