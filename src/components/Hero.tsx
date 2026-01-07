import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVisual from './HeroVisual';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date('2026-02-27T00:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal animation
            gsap.from('.hero-title-line', {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.2,
            });

            // Metadata fade in
            gsap.from('.hero-meta', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
                delay: 0.6,
            });

            // Stats cards stagger
            gsap.from('.stat-card', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
                delay: 1,
            });

            // CTA buttons
            gsap.from('.hero-cta', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.8,
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { label: "Visitors", value: "10K+", number: "01" },
        { label: "Startups", value: "1K+", number: "02" },
        { label: "Investors", value: "100+", number: "03" },
        { label: "Speakers", value: "200+", number: "04" },
    ];

    return (
        <section ref={heroRef} className="hero-section relative z-10 min-h-screen flex flex-col justify-center" id="hero">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
                {/* Main content area */}
                <div className="hero-content text-center lg:text-left">
                    {/* Massive title */}
                    <h1 ref={titleRef} className="hero-title pt-10 text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-none tracking-tighter">
                    <span className="hero-title-line overflow-hidden block">
                        <span className="inline-block text-white">GLOBAL</span>
                    </span>
                    <span className="hero-title-line overflow-hidden block">
                        <span className="inline-block text-white">INNOVATORS</span>
                    </span>
                    <span className="hero-title-line overflow-hidden block">
                        <span className="inline-block text-primary bg-clip-text text-transparent bg-gradient-to-r from-violet-light to-primary">CONCLAVE</span>
                    </span>
                </h1>

                {/* Tagline */}
                <p className="hero-tagline hero-meta text-xl md:text-2xl text-violet-light/80 mt-6 max-w-2xl font-light">
                    Innovating for India, Scaling to the world
                </p>

                {/* Event details - horizontal */}
                <div className="hero-details mt-12 flex flex-wrap gap-8 items-center justify-center lg:justify-start">
                    <div className="hero-meta detail-item flex flex-col">
                        <span className="detail-label text-sm text-gray-400 uppercase tracking-wider">Date</span>
                        <span className="detail-value text-lg text-white font-medium">Feb 27-28, 2026</span>
                    </div>
                    <span className="detail-divider text-gray-600 hidden md:block">•</span>
                    <div className="hero-meta detail-item flex flex-col">
                        <span className="detail-label text-sm text-gray-400 uppercase tracking-wider">Location</span>
                        <span className="detail-value text-lg text-white font-medium">St. Martin's Engineering College</span>
                    </div>
                    <span className="detail-divider text-gray-600 hidden md:block">•</span>
                    <div className="hero-meta detail-item flex flex-col">
                        <span className="detail-label text-sm text-gray-400 uppercase tracking-wider">Countdown</span>
                        <span className="detail-value font-mono text-lg text-primary">
                            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
                        </span>
                    </div>
                </div>

                {/* CTA buttons */}
                <div className="hero-cta-group mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                        onClick={() => navigate('/register')}
                        className="hero-cta cta-primary bg-primary hover:bg-violet-dark text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Register Now
                        <span className="cta-arrow ml-2 inline-block">→</span>
                    </button>
                    <a href="#about" className="hero-cta cta-secondary border border-violet-light/30 text-violet-light hover:text-white hover:border-violet-light px-8 py-3 rounded-full transition-all duration-300">
                        Learn More
                    </a>
                </div>
                </div>

                {/* Right Side Visual */}
                <div className="hero-visual hidden lg:flex items-center justify-center relative z-20">
                    <HeroVisual />
                </div>
            </div>
            
            {/* Stats row - bottom */}
            <div className="hero-stats mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-300">
                        <span className="stat-value block text-3xl font-bold text-white mb-1">{stat.value}</span>
                        <span className="stat-label text-sm text-gray-400 uppercase tracking-widest">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
