import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Event {
    title: string;
    description: string;
    time: string;
    type: string;
    day: 1 | 2;
}

const events: Event[] = [
    {
        title: "Inauguration, Opening Remarks & Key Note Sessions",
        description: "By GIC Chair & Chief Guests",
        time: "10:00 - 11:30",
        type: "Ceremony",
        day: 1
    },
    {
        title: "Tea Break & Expo Walk",
        description: "Networking and Exhibition visit",
        time: "11:30 - 12:00",
        type: "Break",
        day: 1
    },
    {
        title: "Panel Discussion: Entrepreneurship & India mission on Innovation",
        description: "Panel Members discussion",
        time: "12:00 - 13:00",
        type: "Panel",
        day: 1
    },
    {
        title: "Panel Discussion: Policy Enablement & Vision 2047",
        description: "Strategic discussion on India's future",
        time: "13:00 - 14:00",
        type: "Panel",
        day: 1
    },
    {
        title: "Lunch Break & Exhibition Walk",
        description: "Networking lunch",
        time: "14:00 - 15:00",
        type: "Break",
        day: 1
    },
    {
        title: "Panel Discussion: Entrepreneurship",
        description: "Deep dive into entrepreneurial ecosystem",
        time: "15:00 - 16:00",
        type: "Panel",
        day: 1
    },
    {
        title: "Panel Discussion: Data Centers & Infrastructure for Deep Technologies",
        description: "Infrastructure challenges and opportunities",
        time: "16:00 - 17:00",
        type: "Panel",
        day: 1
    },
    {
        title: "Coffee Break & Networking",
        description: "Evening networking session",
        time: "17:00 - 17:30",
        type: "Break",
        day: 1
    },
    {
        title: "Opening Remarks & Key Note Sessions",
        description: "Chief Guests & Guest of Honors",
        time: "10:30 - 11:30",
        type: "Talk",
        day: 2
    },
    {
        title: "Tea Break & Expo Walk",
        description: "Networking break",
        time: "11:30 - 12:00",
        type: "Break",
        day: 2
    },
    {
        title: "Panel Discussion: Space & Defence Technologies",
        description: "Frontier technology discussion",
        time: "12:00 - 13:00",
        type: "Panel",
        day: 2
    },
    {
        title: "Panel Discussion: Semi Conductors & Advanced Electronics",
        description: "Future of electronics",
        time: "13:00 - 14:00",
        type: "Panel",
        day: 2
    },
    {
        title: "Lunch Break & Exhibition Walk",
        description: "Networking lunch",
        time: "14:00 - 15:00",
        type: "Break",
        day: 2
    },
    {
        title: "Panel Discussion: Advanced Materials & Nano Technologies",
        description: "Material science innovations",
        time: "15:00 - 16:00",
        type: "Panel",
        day: 2
    },
    {
        title: "Panel Discussion: Biotechnology & Life Sciences",
        description: "Innovations in life sciences",
        time: "16:00 - 17:00",
        type: "Panel",
        day: 2
    },
    {
        title: "Coffee Break & Networking",
        description: "Closing networking session",
        time: "17:00 - 17:30",
        type: "Break",
        day: 2
    },
];

const EventsPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [activeDay, setActiveDay] = useState<1 | 2>(1);

    const filteredEvents = events.filter(e => e.day === activeDay);

    // Scroll-triggered animations
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Progress bar that fills as you scroll
            if (progressRef.current && timelineRef.current) {
                gsap.to(progressRef.current, {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 60%",
                        end: "bottom 40%",
                        scrub: 0.3,
                    }
                });
            }

            // Each timeline item reveals on scroll
            const items = gsap.utils.toArray('.agenda-item');
            items.forEach((item) => {
                const el = item as HTMLElement;
                gsap.from(el, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                });

                // Animate the number
                const number = el.querySelector('.agenda-number');
                if (number) {
                    gsap.from(number, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    });
                }
            });

        }, pageRef);

        return () => ctx.revert();
    }, [activeDay]);

    // Entry animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.header-animate', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    // Day switch animation
    const handleDaySwitch = (day: 1 | 2) => {
        if (day === activeDay) return;
        
        gsap.to('.agenda-item', {
            opacity: 0,
            y: -20,
            stagger: 0.03,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setActiveDay(day);
                // Reset progress bar
                if (progressRef.current) {
                    gsap.set(progressRef.current, { scaleY: 0 });
                }
            }
        });
    };

    return (
        <div ref={pageRef} className="page-container agenda-page">
            {/* Header Section */}
            <section className="agenda-header">
                <div className="header-animate">
                    <span className="agenda-label font-mono">[02]</span>
                </div>
                <h1 className="agenda-title header-animate">
                    Event<br />Agenda
                </h1>
                <p className="agenda-subtitle header-animate">
                    Two days of innovation, connection, and transformation.
                </p>

                {/* Day Selector */}
                <div className="day-selector header-animate">
                    <button
                        className={`day-btn ${activeDay === 1 ? 'active' : ''}`}
                        onClick={() => handleDaySwitch(1)}
                    >
                        <span className="day-num">01</span>
                        <span className="day-date">Feb 27</span>
                    </button>
                    <button
                        className={`day-btn ${activeDay === 2 ? 'active' : ''}`}
                        onClick={() => handleDaySwitch(2)}
                    >
                        <span className="day-num">02</span>
                        <span className="day-date">Feb 28</span>
                    </button>
                </div>
            </section>

            {/* Timeline Section */}
            <section ref={timelineRef} className="agenda-timeline">
                {/* Vertical Progress Line */}
                <div className="timeline-track">
                    <div ref={progressRef} className="timeline-progress"></div>
                </div>

                {/* Events */}
                <div className="agenda-list">
                    {filteredEvents.map((event, index) => (
                        <article 
                            key={`${activeDay}-${index}`} 
                            className="agenda-item"
                        >
                            <div className="agenda-number">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            
                            <div className="agenda-time">
                                {event.time}
                            </div>

                            <div className="agenda-content">
                                <span className="agenda-type">{event.type}</span>
                                <h2 className="agenda-event-title">{event.title}</h2>
                                <p className="agenda-event-desc">{event.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="agenda-cta header-animate">
                <p className="cta-text">Secure your spot today</p>
                <a href="/register" className="cta-link">
                    Register Now
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </section>
        </div>
    );
};

export default EventsPage;
