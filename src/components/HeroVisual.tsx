import { useEffect, useRef } from 'react';

const HeroVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;
        if (!container || !card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            const moveX = (x - 0.5) * 20; // Max rotation deg
            const moveY = (y - 0.5) * 20;

            card.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="visual-container relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow"></div>

            {/* Main Glass Card */}
            <div
                ref={cardRef}
                className="glass-panel relative w-[320px] md:w-[380px] h-[460px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-transform duration-100 ease-out preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>

                {/* Content Container */}
                <div className="flex flex-col h-full p-6 relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                            <span className="text-xs font-mono text-white/60 tracking-widest uppercase">Live Opp</span>
                        </div>
                        <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-accent-light border border-white/5">
                            GIC.2026
                        </div>
                    </div>

                    {/* Graph Area (Simulated) */}
                    <div className="flex-1 w-full bg-black/20 rounded-xl mb-6 relative overflow-hidden border border-white/5 group">
                        {/* Grid lines */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        
                        {/* Animated Graph Line */}
                        <svg className="absolute bottom-0 left-0 w-full h-[60%] overflow-visible" preserveAspectRatio="none">
                            <path
                                d="M0,100 Q40,80 80,90 T160,60 T240,40 T320,10"
                                fill="none"
                                stroke="#8B7BB5"
                                strokeWidth="3"
                                className="drop-shadow-[0_0_10px_rgba(139,123,181,0.5)]"
                            />
                             <path
                                d="M0,100 Q40,80 80,90 T160,60 T240,40 T320,10 L320,150 L0,150 Z"
                                fill="url(#gradient)"
                                opacity="0.2"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#8B7BB5" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Hover Effect Spotlight */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-xs text-white/50 mb-1">Total Pool</div>
                            <div className="text-xl font-display font-bold text-white">₹10Cr</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-xs text-white/50 mb-1">Ventures</div>
                            <div className="text-xl font-display font-bold text-accent-light">1K+</div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements (Orbiting) */}
                
                {/* 3D GIC Cube Logo - Floating Top Right - Moved to avoid overlap */}
                 <div 
                    className="absolute -top-32 -right-16 md:-right-32 w-24 h-24 preserve-3d animate-float-delayed"
                    style={{ transform: 'translateZ(60px) rotateY(-20deg)' }}
                >
                    <div className="relative w-full h-full preserve-3d animate-spin-slow">
                        {/* Cube Faces - Glass Only, No Text */}
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm shadow-[0_0_15px_rgba(139,123,181,0.3)] translate-z-12" style={{ transform: 'translateZ(24px)' }}></div>
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm shadow-[0_0_15px_rgba(139,123,181,0.3)] translate-z-N12" style={{ transform: 'rotateY(180deg) translateZ(24px)' }}></div>
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm -rotate-y-90 translate-x-12" style={{ transform: 'rotateY(-90deg) translateZ(24px)' }}></div>
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm rotate-y-90 -translate-x-12" style={{ transform: 'rotateY(90deg) translateZ(24px)' }}></div>
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm rotate-x-90 -translate-y-12" style={{ transform: 'rotateX(90deg) translateZ(24px)' }}></div>
                        <div className="absolute inset-0 border border-accent/40 bg-accent/5 backdrop-blur-sm -rotate-x-90 translate-y-12" style={{ transform: 'rotateX(-90deg) translateZ(24px)' }}></div>
                        
                        {/* Inner Core - Burning Bright */}
                        <div className="absolute inset-6 bg-accent/60 blur-lg rounded-full animate-pulse-fast"></div>
                    </div>
                </div>

                <div 
                    className="absolute -top-6 -right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl animate-float-slow"
                    style={{ transform: 'translateZ(40px)' }}
                >
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-accent-dark flex items-center justify-center text-xs font-bold text-white">
                             🚀
                         </div>
                         <div>
                             <div className="text-xs font-bold text-white">Scaling</div>
                             <div className="text-[10px] text-white/60">Rapid Growth</div>
                         </div>
                    </div>
                </div>

                 <div 
                    className="absolute -bottom-8 -left-8 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-float-delayed"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    <div className="text-xs font-mono text-accent-light">
                        Verified
                    </div>
                </div>
            </div>
            
            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateZ(40px) translateY(0); }
                    50% { transform: translateZ(40px) translateY(-10px); }
                }
                 @keyframes float-delayed {
                    0%, 100% { transform: translateZ(60px) translateY(0); }
                    50% { transform: translateZ(60px) translateY(10px); }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-float-slow {
                    animation: float-slow 4s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 5s ease-in-out infinite reverse;
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                @keyframes spin-slow {
                    0% { transform: rotateX(0deg) rotateY(0deg); }
                    100% { transform: rotateX(360deg) rotateY(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HeroVisual;
