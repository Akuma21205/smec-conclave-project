import React from 'react';

const Pillars = () => {
    return (
        <section className="section pillars-section">
            <div className="pillars-grid">
                <div className="pillar-card" data-aos="fade-up">
                    <div className="pillar-icon showcase"></div>
                    <h3>Showcase</h3>
                    <p>
                        Feature professional startups and student innovators with
                        prototypes and live demos
                    </p>
                </div>
                <div className="pillar-card" data-aos="fade-up" data-delay="100">
                    <div className="pillar-icon invest"></div>
                    <h3>Invest</h3>
                    <p>
                        Create curated investment opportunities with potential funding up
                        to INR 10 Crores
                    </p>
                </div>
                <div className="pillar-card" data-aos="fade-up" data-delay="200">
                    <div className="pillar-icon educate"></div>
                    <h3>Educate</h3>
                    <p>
                        Inform founders on policy, IP, regulations, and scaling deep-tech
                        businesses
                    </p>
                </div>
                <div className="pillar-card" data-aos="fade-up" data-delay="300">
                    <div className="pillar-icon connect"></div>
                    <h3>Connect</h3>
                    <p>
                        Strengthen collaborations between government, industry, and
                        startups
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pillars;
