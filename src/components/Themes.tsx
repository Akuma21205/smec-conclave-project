import React from 'react';

const Themes = () => {
    return (
        <section className="section themes-section" id="themes">
            <div className="section-header">
                <h2 className="section-title">Key Themes</h2>
                <div className="title-underline"></div>
            </div>
            <div className="themes-content">
                <div className="theme-card main-theme">
                    <div className="theme-icon">🚀</div>
                    <h3>Startup Enablement</h3>
                    <p>Empowering the next generation of entrepreneurs</p>
                </div>
                <div className="theme-card main-theme">
                    <div className="theme-icon">⚡</div>
                    <h3>Deep Technology</h3>
                    <p>Pioneering the future of innovation</p>
                </div>
            </div>
            <div className="tech-tags">
                <span className="tech-tag">Artificial Intelligence</span>
                <span className="tech-tag">Quantum Computing</span>
                <span className="tech-tag">Robotics</span>
                <span className="tech-tag">Space Tech</span>
                <span className="tech-tag">Biotech</span>
                <span className="tech-tag">Advanced Materials</span>
                <span className="tech-tag">Semiconductors</span>
                <span className="tech-tag">Data Centers</span>
            </div>
        </section>
    );
};

export default Themes;
