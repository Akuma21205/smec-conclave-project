import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AgendaPage from './components/AgendaPage';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import './index.css';

// Handle scroll to top and animations on route change
const PageAnimations = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);

    // 2. Re-trigger animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      const animateElements = document.querySelectorAll(
        '.section-header, .hero-main-display, .about-content, .pillar-card, .theme-card, .timeline-item, .glass-card, .stat-card, .track-filters, .countdown-container, .fade-init'
      );

      animateElements.forEach((el) => {
        el.classList.add('fade-init');
        // Remove existing animate-in if we want to re-animate (optional, but safer for re-entering pages)
        el.classList.remove('animate-in');
        observer.observe(el);
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <PageAnimations />
      <BackgroundEffects />
      <div className="main-container flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<AgendaPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
