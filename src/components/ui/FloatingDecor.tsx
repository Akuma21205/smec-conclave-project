import { useRef, useEffect } from 'react';

interface FloatingDecorProps {
    type?: 'emoji' | 'shape' | 'text';
    content?: string; // Emoji character or Text
    position: string; // Tailwind absolute position classes (e.g. "top-10 left-10")
    color?: string; // Optional override color
    size?: string; // Tailwind size classes (default: w-12 h-12)
    delay?: number; // Animation delay in seconds
     rotate?: number; // Initial rotation
}

const FloatingDecor = ({ 
    type = 'emoji', 
    content = '⚡', 
    position, 
    color = 'bg-accent/20', 
    size = 'text-4xl', 
    delay = 0,
    rotate = 0
}: FloatingDecorProps) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // Random subtle movement (Simulated organic float)
        const duration = 3 + Math.random() * 2;
        el.style.animation = `float-organic ${duration}s ease-in-out infinite`;
        el.style.animationDelay = `${delay}s`;
    
    }, [delay]);

    return (
        <div 
            ref={elRef}
            className={`absolute ${position} pointer-events-none z-0 select-none hidden md:block`}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
             <style>{`
                @keyframes float-organic {
                    0%, 100% { transform: translate(0, 0) rotate(${rotate}deg); }
                    33% { transform: translate(10px, -10px) rotate(${rotate + 5}deg); }
                    66% { transform: translate(-5px, 5px) rotate(${rotate - 5}deg); }
                }
            `}</style>
            
            {type === 'emoji' && (
                <div className={`${size} filter drop-shadow-[0_0_15px_rgba(139,123,181,0.5)] animate-pulse-slow`}>
                    {content}
                </div>
            )}

            {type === 'shape' && (
                <div className={`w-16 h-16 ${color} backdrop-blur-md rounded-full border border-white/10 shadow-lg`} style={{ borderRadius: content === 'circle' ? '50%' : '12px' }}>
                    {/* Inner shine */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[inherit]"></div>
                </div>
            )}
        </div>
    );
};

export default FloatingDecor;
