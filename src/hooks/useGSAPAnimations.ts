import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll animations
 * Replaces IntersectionObserver with GSAP ScrollTrigger for smoother animations
 */
export const useGSAPAnimations = () => {
    useEffect(() => {
        // Animate elements on scroll into view
        const animateElements = gsap.utils.toArray<HTMLElement>([
            '.section-header',
            '.hero-main-display',
            '.about-content',
            '.pillar-card',
            '.theme-card',
            '.timeline-item',
            '.glass-card',
            '.stat-card',
            '.track-filters',
            '.countdown-container',
            '.fade-init',
        ]);

        animateElements.forEach((element) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            gsap.to(heroSection, {
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: 100,
                opacity: 0.8,
            });
        }

        // Stat cards stagger animation
        const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');
        if (statCards.length > 0) {
            gsap.fromTo(
                statCards,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: statCards[0],
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }

        // Pillar cards grid animation
        const pillarCards = gsap.utils.toArray<HTMLElement>('.pillar-card');
        if (pillarCards.length > 0) {
            gsap.fromTo(
                pillarCards,
                {
                    opacity: 0,
                    y: 50,
                    rotationY: -15,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: pillarCards[0],
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
};

export default useGSAPAnimations;
