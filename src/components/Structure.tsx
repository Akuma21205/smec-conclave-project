import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Flip, ScrollTrigger, Observer);

const structureItems = [
    {
        number: "01",
        title: ["K", "nowledge ", "B", "ubble"],
        highlights: [0, 2],
        description: "A high-level platform for policymakers, industry leaders, and scientists.",
        details: [
            "Discuss National Deep-Tech Strategy, IndiaAI Mission, and R&D grants.",
            "Keynote addresses and policy panels enabling direct interaction between innovators and policymakers."
        ]
    },
    {
        number: "02",
        title: ["A", "lpha 2 ", "I", "nfiniti"],
        highlights: [0, 2],
        description: "\"Brighter minds for Viksith Bharath\" - A 30-hour Innovation Challenge.",
        details: [
            "Selected students randomly grouped into teams to solve real-world problem statements.",
            "Mentored by industry experts to develop solutions within 30 hours.",
            "Outcomes: PoCs, PPOs, and Internship Opportunities."
        ]
    },
    {
        number: "03",
        title: ["B", "usi", "T", "ech ", "E", "xpo"],
        highlights: [0, 2, 4],
        description: "Business Technology Expo featuring Professional and Student Innovations.",
        details: [
            "Professional Expo: Startups (early to growth stage) showcasing market-ready products and MVPs.",
            "Student Expo: Undergraduate & postgraduate teams showcasing prototypes and research-based solutions.",
            "Focus on scalability, commercialization, and problem-solving."
        ]
    },
    {
        number: "04",
        title: ["I", "nno", "V", "estors ", "B", "ootcamp"],
        highlights: [0, 2, 4],
        description: "Investment matchmaking and mentoring for startups.",
        details: [
            "1:1 Investor-Startup Meetings for due diligence.",
            "Pitch to a mixed panel of investors and domain mentors.",
            "Investment opportunities worth up to INR 10 Crores.",
            "Benefits: Capital Access, Incubation, and Global Visibility."
        ]
    },
    {
        number: "05",
        title: ["M", "asterminds ", "C", "ongregation"],
        highlights: [0, 2],
        description: "Igniting curiosity and problem-solving among school students.",
        details: [
            "School students (Classes 8-12) pitch their ideas.",
            "Safe platform to receive positive feedback from a panel of 3 judges.",
            "Focus on future-ready technologies and applied research."
        ]
    },
    {
        number: "06",
        title: ["I", "nnovation ", "L", "ab"],
        highlights: [0, 2],
        description: "A sandbox for cutting-edge experiments and prototyping.",
        details: [
            "Access to advanced tools and mentorship for rapid prototyping.",
            "Collaborative environment for interdisciplinary innovation.",
            "Showcase of experimental tech and future concepts."
        ]
    }
];

const Structure = () => {
    // Add unique IDs to initial items to track instances
    const [items, setItems] = useState(() => 
        structureItems.map((item, index) => ({ ...item, uniqueId: `init-${index}` }))
    );
    const uniqueIdCounter = useRef(0);
    const sectionRef = useRef<HTMLElement>(null);
    const q = gsap.utils.selector(sectionRef);
    const flipState = useRef<Flip.FlipState | null>(null);
    const isAnimating = useRef(false);
    
    // We need to track direction for the transformOrigin logic
    const directionRef = useRef<"next" | "prev">("next");

    // Styling gradient to make it "aesthetic"
    const gradients = [
        "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", // Warm
        "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", // Fresh
        "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", // Purple-Pink
        "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", // Cool Blue
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"  // Vibrant Red
    ];

    const rotateCards = (forward: boolean) => {
        if (isAnimating.current) return;
        
        isAnimating.current = true; // Block interaction immediately
        directionRef.current = forward ? "next" : "prev";

        // Capture specific state of visible cards
        flipState.current = Flip.getState(q(".structure-card"));
        
        setItems(prev => {
            const newItems = [...prev];
            if (forward) {
                const first = newItems.shift();
                if (first) {
                    newItems.push({ ...first, uniqueId: `new-${uniqueIdCounter.current++}` });
                }
            } else {
                const last = newItems.pop();
                if (last) {
                    newItems.unshift({ ...last, uniqueId: `new-${uniqueIdCounter.current++}` });
                }
            }
            return newItems;
        });
    };

    useLayoutEffect(() => {
        if (!flipState.current) return;

        // Demo Logic:
        // forward ? "bottom right" : "bottom left"
        const isNext = directionRef.current === "next";

        Flip.from(flipState.current, {
            duration: 0.6,
            ease: "power2.inOut",
            absolute: true, // absoluteOnLeave in demo, but absolute: true handles layout too
            
            targets: q(".structure-card"), // Explicit targets
            
            onEnter: (elements) => {
                return gsap.fromTo(elements, 
                    { 
                        opacity: 0, 
                        scale: 0, 
                    }, 
                    { 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.6,
                        transformOrigin: isNext ? "bottom right" : "bottom left"
                    }
                );
            },
            
            onLeave: (elements) => {
                return gsap.to(elements, { 
                    opacity: 0, 
                    scale: 0, 
                    duration: 0.6,
                    transformOrigin: isNext ? "bottom left" : "bottom right",
                });
            },
            
            onComplete: () => {
                isAnimating.current = false;
            }
        });
        
        flipState.current = null;
    }, [items]);

    // Auto-play Interval
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating.current) {
                rotateCards(true);
            }
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    const visibleItems = items.slice(0, 3);

    return (
        <section ref={sectionRef} className="min-h-screen py-10 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden relative z-10" id="structure">
            <div className="w-full text-center z-10 mb-8 md:mb-12 flex-shrink-0">
                 <span className="font-mono text-xs tracking-widest block mb-2 text-primary/80">[04]</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">Event Structure</h2>
            </div>

            {/* Container */}
            <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center gap-6 perspective-1000">
                {visibleItems.map((item, index) => {
                    return (
                        <div 
                            key={item.uniqueId} 
                            data-flip-id={item.uniqueId}
                            className="structure-card w-1/3 min-w-[300px] h-full p-6 md:p-8 rounded-2xl flex flex-col gap-4 shadow-xl border border-white/10 backdrop-blur-md bg-[#111118]/80"
                            style={{ 
                                cursor: 'default' 
                            }}
                        >
                             {/* Decorative gradient blob */}
                             <div className="absolute top-0 right-0 w-24 h-24 opacity-10 blur-2xl rounded-full" style={{ background: gradients[parseInt(item.number) - 1] }}></div>

                            <div 
                                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xl font-bold shadow-sm self-start"
                                style={{ 
                                    background: gradients[parseInt(item.number) - 1],
                                    color: 'white',
                                }}
                            >
                                {item.number}
                            </div>

                            <h3 className="text-xl font-bold text-white">
                                {item.title.map((part, i) => (
                                    <span 
                                        key={i}
                                        style={{ color: item.highlights.includes(i) ? '#8B7BB5' : 'inherit' }}
                                    >
                                        {part}
                                    </span>
                                ))}
                            </h3>
                            
                            <p className="text-sm font-medium leading-relaxed opacity-90 text-gray-300">
                                {item.description}
                            </p>
                            
                            <div className="mt-auto space-y-2 pt-4 border-t border-white/10">
                                {item.details.slice(0, 2).map((detail, i) => ( // Show fewer details in card view
                                    <p key={i} className="text-xs opacity-70 truncate text-gray-400">
                                        • {detail}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="mt-12 flex gap-6 z-20">
                <button 
                    onClick={() => rotateCards(false)}
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-primary/20 hover:border-primary shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={() => rotateCards(true)}
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-primary/20 hover:border-primary shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14m-7 7l7-7-7-7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Structure;
