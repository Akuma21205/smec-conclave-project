import React from 'react';

const About = () => {
    return (
        <section className="section about-section" id="about">
            <div className="section-header">
                <h2 className="section-title">About The Conclave</h2>
                <div className="title-underline"></div>
            </div>
            <div className="about-content">
                <div className="about-card glass-card">
                    <div className="card-icon">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                            />
                        </svg>
                    </div>
                    <h3>Organized By</h3>
                    <p><strong>St. Martin's Engineering College (SMEC)</strong></p>
                    <p className="card-detail">
                        UGC Autonomous Institution | NAAC A+ Accredited
                    </p>
                    <p className="card-detail">Recognized in ARIIA and NIRF Rankings</p>
                </div>
                <div className="about-text">
                    <p className="mission-statement">
                        The primary mission of SMEC's Global Innovation Summit – 2026 is
                        to <span className="gradient-text">accelerate deep-tech innovations and entrepreneurship</span>,
                        connecting promising teams with funding, mentorship, and
                        strategic partners.
                    </p>
                    <p className="tagline">"Raising Minds For Global Impact"</p>
                </div>
            </div>
        </section>
    );
};

export default About;
