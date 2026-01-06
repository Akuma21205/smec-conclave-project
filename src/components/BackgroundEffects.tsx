import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated SVG Paths with Stars Component
const FlowingPathsWithStars: React.FC<{ position: number; scrollSpeed: number }> = ({ 
    position, 
    scrollSpeed 
}) => {
    const paths = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        // Modified path to curve from inside to outside on the top right
        d: `M${152 + i * 5 * position} ${343 + i * 6}C${
            312 + i * 5 * position
        } ${216 + i * 6} ${380 + i * 5 * position} -${189 - i * 6} ${
            380 + i * 5 * position
        } -${189 - i * 6}`,
        color: `rgba(212, 168, 83, ${0.15 + i * 0.015})`, // Gold
        width: 1.5 + i * 0.08, // Increased base width for better visibility
    }));

    return (
        <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 696 316"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                {/* Gradient for paths */}
                <linearGradient id={`pathGradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#d4a853', stopOpacity: 0.6 }} />
                    <stop offset="50%" style={{ stopColor: '#9b5de5', stopOpacity: 0.7 }} />
                    <stop offset="100%" style={{ stopColor: '#4e8fff', stopOpacity: 0.6 }} />
                </linearGradient>
            </defs>

            {/* Render paths with enhanced visibility - NO moving dots */}
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke={`url(#pathGradient-${position})`}
                    strokeWidth={path.width}
                    strokeOpacity={0.6 + path.id * 0.015} // Increased base opacity
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                        pathLength: { duration: 2, ease: 'easeInOut' },
                        opacity: {
                            duration: (3 + Math.random() * 2) / scrollSpeed,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                        },
                    }}
                />
            ))}
        </svg>
    );
};

// Main Background Component
const BackgroundEffects: React.FC = () => {
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const scrollSpeedRef = useRef(1);

    // Scroll-based speed control
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let rafId: number;

        const updateScrollSpeed = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            
            // Map velocity to speed multiplier
            const speedMultiplier = 1 + Math.abs(delta) * 0.1;
            const targetSpeed = delta > 0 
                ? Math.min(speedMultiplier, 3) // Cap at 3x when scrolling down
                : Math.max(1 / speedMultiplier, 0.5); // Slow to 0.5x when scrolling up
            
            // Smooth transition to target speed
            scrollSpeedRef.current = scrollSpeedRef.current + (targetSpeed - scrollSpeedRef.current) * 0.1;
            setScrollSpeed(scrollSpeedRef.current);
            
            lastScrollY = currentScrollY;
            rafId = requestAnimationFrame(updateScrollSpeed);
        };

        rafId = requestAnimationFrame(updateScrollSpeed);

        // Reset to normal speed when scroll stops
        const handleScrollEnd = () => {
            gsap.to(scrollSpeedRef, {
                current: 1,
                duration: 1,
                ease: 'power2.out',
                onUpdate: () => setScrollSpeed(scrollSpeedRef.current),
            });
        };

        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScrollEnd, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div className="background-effects">
            {/* Animated SVG Paths with Flowing Stars */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <FlowingPathsWithStars position={1} scrollSpeed={scrollSpeed} />
                <FlowingPathsWithStars position={-1} scrollSpeed={scrollSpeed} />
            </div>
        </div>
    );
};

export default BackgroundEffects;
