import { useEffect, useRef, ReactNode, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useLocation } from 'react-router-dom';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Context to share smoother instance
interface SmoothScrollContextType {
  smoother: ScrollSmoother | null;
  scrollTo: (target: string | HTMLElement, smooth?: boolean, position?: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  smoother: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Create ScrollSmoother instance
    if (wrapperRef.current && contentRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.8, // Smooth scrolling intensity (1 = medium, 2 = strong)
        effects: true, // Enable data-speed and data-lag effects
        normalizeScroll: true, // Prevents address bar hiding issues on mobile
        smoothTouch: 0.1, // Light smooth scrolling on touch devices
      });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(0, false);
    }
  }, [pathname]);

  // Refresh ScrollTrigger when route changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const scrollTo = (target: string | HTMLElement, smooth = true, position = 'top top') => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, smooth, position);
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ smoother: smootherRef.current, scrollTo }}>
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
