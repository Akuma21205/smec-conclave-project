import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        number: "01",
        title: "Showcase",
        description: "Feature professional startups and student innovators with prototypes and live demos"
    },
    {
        number: "02",
        title: "Invest",
        description: "Create curated investment opportunities with potential funding up to INR 10 Crores"
    },
    {
        number: "03",
        title: "Educate",
        description: "Inform founders on policy, IP, regulations, and scaling deep-tech businesses"
    },
    {
        number: "04",
        title: "Connect",
        description: "Strengthen collaborations between government, industry, and startups"
    }
];

const Pillars = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple fade-in animation on scroll
            gsap.fromTo('.pillar-card-new', 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.12, 
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.pillars-grid-new',
                        start: 'top 90%',
                    }
                }
            );
        }, sectionRef);

        // Fallback: Show content after a delay if animation doesn't trigger
        const fallback = setTimeout(() => {
            const cards = document.querySelectorAll('.pillar-card-new');
            cards.forEach(card => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
            });
        }, 1500);

        return () => {
            ctx.revert();
            clearTimeout(fallback);
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 md:px-12" id="pillars">
            {/* Section header */}
            <div className="mb-12">
                <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[02]</span>
                <h2 className="pillar-title text-4xl md:text-5xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>KEY PILLARS</h2>
            </div>

            {/* Pillars grid */}
            <div className="pillars-grid-new grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar, index) => (
                    <div 
                        key={index} 
                        className="pillar-card-new p-8 rounded-xl transition-all hover:-translate-y-1"
                        style={{ 
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid rgba(7, 7, 7, 0.08)'
                        }}
                    >
                        <span 
                            className="font-mono text-6xl font-bold block mb-4"
                            style={{ color: 'rgba(107, 91, 149, 0.15)' }}
                        >
                            {pillar.number}
                        </span>
                        <h3 
                            className="text-xl font-bold mb-3"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {pillar.title}
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            {pillar.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pillars;

