import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const SponsorsPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate decorative circles
            gsap.from('.sponsor-circle', {
                scale: 0,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.3,
            });

            // Animated line that draws across
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        ease: 'power3.inOut',
                        delay: 0.5,
                    }
                );
            }

            // Section label animation
            gsap.from('.section-label', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Partner tiers animation on scroll
            gsap.from('.partner-tier', {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.partner-tiers',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            });

            // Contact CTA animation
            gsap.from('.contact-cta', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-cta',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                }
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="page-container sponsors-reveal-page">
            <section className="section min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
                
                {/* Decorative circles */}
                <div className="sponsor-circle absolute top-16 right-16 w-40 h-40 rounded-full border opacity-20"
                     style={{ borderColor: 'var(--color-accent)', borderWidth: '2px' }} />
                <div className="sponsor-circle absolute bottom-32 left-16 w-24 h-24 rounded-full opacity-30"
                     style={{ background: 'var(--color-accent)' }} />
                <div className="sponsor-circle absolute top-1/4 left-1/4 w-8 h-8 rounded-full opacity-40"
                     style={{ background: 'var(--color-accent)' }} />
                <div className="sponsor-circle absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full border opacity-25"
                     style={{ borderColor: 'var(--color-accent)', borderWidth: '1px' }} />

                {/* Section label */}
                <span 
                    className="section-label font-mono tracking-widest mb-8" 
                    style={{ 
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.2em',
                    }}
                >
                    [04] SPONSORS
                </span>

                {/* Main heading with ScrollReveal blur animation */}
                <ScrollReveal
                    containerClassName="sponsors-main-title"
                    textClassName=""
                    enableBlur={true}
                    baseOpacity={0.15}
                    baseRotation={2}
                    blurStrength={6}
                    rotationEnd="center center"
                    wordAnimationEnd="top center"
                >
                    PARTNER WITH US
                </ScrollReveal>

                {/* Animated line */}
                <div 
                    ref={lineRef}
                    className="my-4"
                    style={{
                        width: '150px',
                        height: '3px',
                        background: 'var(--color-accent)',
                        transformOrigin: 'left',
                    }}
                />

                {/* Subtitle */}
                <p 
                    className="max-w-xl" 
                    style={{ 
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'var(--text-body-l)',
                        lineHeight: 1.6,
                    }}
                >
                    Connect with 10,000+ attendees, 1000+ startups,<br />
                    and India's top innovators.
                </p>

                {/* Revealing Soon with ScrollReveal */}
                <div className="mt-16">
                    <ScrollReveal
                        containerClassName="revealing-reveal"
                        textClassName=""
                        enableBlur={true}
                        baseOpacity={0.1}
                        baseRotation={0}
                        blurStrength={8}
                        rotationEnd="center center"
                        wordAnimationEnd="top center"
                    >
                        REVEALING SOON
                    </ScrollReveal>
                </div>

                {/* Partner tiers preview */}
                <div className="partner-tiers mt-16 flex gap-8 flex-wrap justify-center">
                    {['Platinum', 'Gold', 'Silver'].map((tier) => (
                        <div 
                            key={tier}
                            className="partner-tier px-8 py-4 border transition-all duration-300 cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-1"
                            style={{
                                borderColor: 'rgba(7, 7, 7, 0.1)',
                                color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-small)',
                                letterSpacing: '0.15em',
                            }}
                        >
                            {tier.toUpperCase()}
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="contact-cta mt-16">
                    <p 
                        className="mb-4" 
                        style={{ 
                            color: 'var(--color-text-muted)',
                            fontFamily: 'var(--font-primary)',
                            fontSize: 'var(--text-small)',
                        }}
                    >
                        Interested in sponsoring?
                    </p>
                    <a 
                        href="mailto:sponsors@smec.edu.in"
                        className="inline-flex items-center gap-2 transition-all duration-300 hover:text-[var(--color-accent)]"
                        style={{ 
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-primary)',
                            fontSize: 'var(--text-body-l)',
                            fontWeight: 500,
                        }}
                    >
                        sponsors@smec.edu.in
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default SponsorsPage;
