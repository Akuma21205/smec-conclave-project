import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '../components/ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const SpeakersPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate decorative elements
            gsap.from('.speaker-decor', {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.3,
            });

            // Animate section label
            gsap.from('.section-label', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Animate CTA section with scroll
            gsap.from('.speaker-cta', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.speaker-cta',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="page-container speakers-reveal-page">
            <section className="section min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
                
                {/* Decorative floating elements */}
                <div className="speaker-decor absolute top-20 left-10 w-32 h-32 rounded-full opacity-20" 
                     style={{ background: 'var(--color-accent)' }} />
                <div className="speaker-decor absolute bottom-40 right-20 w-48 h-48 rounded-full opacity-10" 
                     style={{ background: 'var(--color-accent)' }} />
                <div className="speaker-decor absolute top-1/3 right-10 w-16 h-16 rounded-full opacity-30" 
                     style={{ background: 'var(--color-accent)' }} />
                
                {/* Section label */}
                <span 
                    className="section-label font-mono tracking-widest mb-8" 
                    style={{ 
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.2em',
                    }}
                >
                    [03] SPEAKERS
                </span>

                {/* Main heading with ScrollFloat character animation - starts completely hidden */}
                <ScrollFloat
                    containerClassName="speakers-main-title"
                    textClassName=""
                    scrollStart="top bottom"
                    scrollEnd="top center"
                    stagger={0.02}
                >
                    SPEAKERS
                </ScrollFloat>

                {/* Subtitle */}
                <p 
                    className="mt-6 max-w-lg" 
                    style={{ 
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'var(--text-body-l)',
                        lineHeight: 1.6,
                    }}
                >
                    Industry leaders, visionaries, and innovators<br />
                    who are shaping the future.
                </p>

                {/* Revealing Soon with ScrollFloat - also completely hidden initially */}
                <div className="mt-16">
                    <ScrollFloat
                        containerClassName="revealing-float"
                        textClassName=""
                        scrollStart="top bottom-=10%"
                        scrollEnd="top center"
                        stagger={0.015}
                        ease="back.out(1.7)"
                    >
                        REVEALING SOON
                    </ScrollFloat>
                    
                    {/* Animated underline */}
                    <div 
                        className="speaker-decor h-1 mt-4 mx-auto"
                        style={{ 
                            width: '200px',
                            background: 'var(--color-accent)',
                            opacity: 0.5,
                        }} 
                    />
                </div>

                {/* CTA section */}
                <div className="speaker-cta mt-20">
                    <p 
                        className="mb-4" 
                        style={{ 
                            color: 'var(--color-text-muted)',
                            fontFamily: 'var(--font-primary)',
                            fontSize: 'var(--text-small)',
                        }}
                    >
                        Want to speak at the Conclave?
                    </p>
                    <a 
                        href="mailto:speakers@smec.edu.in"
                        className="inline-flex items-center gap-2 px-8 py-4 border transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white"
                        style={{
                            borderColor: 'var(--color-accent)',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-small)',
                            letterSpacing: '0.15em',
                        }}
                    >
                        APPLY TO SPEAK
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default SpeakersPage;
