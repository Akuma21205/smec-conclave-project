import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingDecor from '../components/ui/FloatingDecor';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-animate', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="page-container relative overflow-hidden">
            {/* Background Decor */}
            <FloatingDecor type="emoji" content="💡" position="-top-10 right-[10%]" delay={0} rotate={15} />
            <FloatingDecor type="shape" content="circle" position="top-[20%] -left-10" color="bg-rose/20" size="w-24 h-24" delay={2} />
            <FloatingDecor type="emoji" content="🚀" position="bottom-[10%] right-20" size="text-6xl" delay={1} rotate={-10} />

            <section className="section relative z-10">
                {/* Header */}
                <div className="section-header-new about-animate">
                    <span className="section-number font-mono text-xs text-white/30 tracking-widest">[ABOUT]</span>
                    <h1 className="section-title-new">ABOUT THE CONCLAVE</h1>
                </div>

                {/* Mission */}
                <div className="about-animate mb-16" style={{ maxWidth: '900px' }}>
                    <p className="mission-text">
                        The primary mission of SMEC's Global Innovators Conclave – 2026 is to{' '}
                        <span className="text-rose">accelerate deep-tech innovations and entrepreneurship</span>,
                        connecting promising teams with funding, mentorship, and strategic partners.
                    </p>
                </div>

                {/* Info Cards */}
                <div className="about-grid about-animate">
                    <div className="about-card-new">
                        <span className="card-number font-mono text-xs text-white/30">[A]</span>
                        <h3 className="card-title">Organized By</h3>
                        <p className="card-highlight">St. Martin's Engineering College</p>
                        <p className="card-detail">UGC Autonomous Institution</p>
                        <p className="card-detail">NAAC A+ Accredited</p>
                    </div>

                    <div className="about-card-new">
                        <span className="card-number font-mono text-xs text-white/30">[B]</span>
                        <h3 className="card-title">Recognition</h3>
                        <p className="card-highlight">ARIIA & NIRF Ranked</p>
                        <p className="card-detail">Top Institution for Innovation</p>
                        <p className="card-detail">Excellence in Entrepreneurship</p>
                    </div>

                    <div className="about-card-new">
                        <span className="card-number font-mono text-xs text-white/30">[C]</span>
                        <h3 className="card-title">Vision</h3>
                        <p className="card-highlight">"Raising Minds For Global Impact"</p>
                        <p className="card-detail">Fostering Innovation</p>
                        <p className="card-detail">Building Tomorrow's Leaders</p>
                    </div>
                </div>

                {/* Key Pillars */}
                <div className="mt-24 about-animate">
                    <h2 className="section-title mb-8">Key Pillars</h2>
                    <div className="pillars-grid-new">
                        {[
                            { num: "01", title: "Showcase", desc: "Feature startups with prototypes and live demos" },
                            { num: "02", title: "Invest", desc: "Curated opportunities with funding up to INR 10 Crores" },
                            { num: "03", title: "Educate", desc: "Inform on policy, IP, and scaling deep-tech" },
                            { num: "04", title: "Connect", desc: "Strengthen government-industry-startup collaborations" },
                        ].map((pillar, i) => (
                            <div key={i} className="pillar-card-new">
                                <span className="pillar-number">{pillar.num}</span>
                                <h3 className="pillar-title-text">{pillar.title}</h3>
                                <p className="pillar-desc">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
