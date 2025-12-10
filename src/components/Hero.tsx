import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set date to Feb 27, 2026
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

    const stats = [
        { label: "Visitors", value: "10000+", icon: "👥" },
        { label: "Startups", value: "1000+", icon: "🚀" },
        { label: "Investors", value: "100+", icon: "💰" },
        { label: "Mentors", value: "100+", icon: "🧠" },
        { label: "Speakers", value: "200+", icon: "🎙️" },
        { label: "Exhibitors", value: "50+", icon: "🏢" }
    ];

    return (
        <section className="hero-section" id="hero">
            {/* Main Content Area */}
            <div className="hero-main-display">
                <div className="hero-visual-left">
                    <div className="logo-glow-container">
                        <div className="flower-logo large">
                            <div className="petal petal-1"></div>
                            <div className="petal petal-2"></div>
                            <div className="petal petal-3"></div>
                            <div className="petal petal-4"></div>
                            <div className="center-glow"></div>
                        </div>
                    </div>
                </div>

                <div className="hero-text-content">
                    <div className="coming-soon-badge">
                        <span className="pulse-dot"></span>
                        <span>Global Summit</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="block-title">WHERE</span>
                        <span className="block-title highlight">INNOVATION</span>
                        <span className="block-title">MEETS IMPACT</span>
                    </h1>

                    <div className="hero-event-details">
                        <h2 className="event-name">SMEC's Global Innovators Conclave</h2>
                        <div className="event-meta">
                            <span className="meta-item"><i className="icon">📅</i> Feb 27-28, 2026</span>
                            <span className="separator">|</span>
                            <span className="meta-item"><i className="icon">📍</i> Hyderabad, India</span>
                        </div>
                    </div>

                    <div className="hero-cta-group">
                        <a href="#contact" className="cta-button primary">Register Now</a>
                        <a href="#about" className="cta-button secondary">View Agenda</a>
                    </div>
                </div>
            </div>

            {/* Countdown Bar */}
            <div className="countdown-container glass-panel">
                <div className="countdown-label">CONCLAVE BEGINS IN</div>
                <div className="countdown-timer">
                    <div className="time-block">
                        <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="time-label">DAYS</span>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-block">
                        <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="time-label">HOURS</span>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-block">
                        <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="time-label">MINS</span>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-block">
                        <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="time-label">SECS</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="hero-stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="stat-content">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        {/* Creative Element: Tech Pulse Line */}
                        <div className="tech-pulse-container">
                            <svg className="tech-pulse-line" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,20 L0,10 Q20,20 40,10 T80,10 T100,20 V20 Z" className="pulse-path" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
