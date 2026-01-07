import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from('.about-title', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            // Animate content blocks with stagger
            gsap.from('.about-block', {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 md:px-12" id="about">
            {/* Section header with number */}
            <div className="mb-12">
                <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[01]</span>
                <h2 className="about-title text-4xl md:text-5xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>ABOUT THE CONCLAVE</h2>
            </div>

            <div className="about-content space-y-8">
                {/* Mission statement - large text */}
                <div 
                    className="about-block p-8 rounded-xl"
                    style={{ 
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid rgba(7, 7, 7, 0.08)'
                    }}
                >
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Mission</h3>
                    <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                        To build <span style={{ fontWeight: 600 }}>innovation and entrepreneurial mindset</span> by bringing together students, startups, industry, government and mentors to create solutions for India, with global relevance.
                    </p>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                        className="about-block p-6 rounded-xl transition-all hover:-translate-y-1"
                        style={{ 
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid rgba(7, 7, 7, 0.08)'
                        }}
                    >
                        <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>[A]</span>
                        <h3 className="text-lg font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>Vision</h3>
                        <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                            To make campus innovation a <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>launchpad</span> that strengthens India's Deep-tech ecosystem and scales ideas to the world.
                        </p>
                    </div>

                    <div 
                        className="about-block p-6 rounded-xl transition-all hover:-translate-y-1"
                        style={{ 
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid rgba(7, 7, 7, 0.08)'
                        }}
                    >
                        <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>[B]</span>
                        <h3 className="text-lg font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>Objectives</h3>
                        <ul className="mt-2 space-y-2 text-sm list-disc pl-4" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Foster Innovation and Entrepreneurship culture</li>
                            <li>Promote Deep-Tech and Problem-Driven Innovation</li>
                            <li>Connect talent with incubators & global industry</li>
                            <li>Enable mentorship and market access</li>
                            <li>Contribute to India's innovation leadership</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

