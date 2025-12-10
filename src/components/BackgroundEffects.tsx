import React, { useEffect, useRef } from 'react';

const BackgroundEffects: React.FC = () => {
    const particleFieldRef = useRef<HTMLDivElement>(null);
    const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Create Particles
        const container = particleFieldRef.current;
        if (container && container.childElementCount === 0) {
            const particleCount = 30;
            const colors = ['#d4a853', '#9b5de5', '#e040fb', '#4e8fff', '#ff6b9d'];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                particle.style.left = Math.random() * 100 + '%';
                // Use explicit CSS variable syntax or string concatenation
                (particle.style as any).animationDelay = Math.random() * 8 + 's';
                (particle.style as any).animationDuration = (Math.random() * 4 + 6) + 's';

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                particle.style.boxShadow = `0 0 6px ${color}`;

                container.appendChild(particle);
            }
        }

        // Parallax Effect
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            orbsRef.current.forEach((orb, index) => {
                if (!orb) return;
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;

                orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="background-effects">
            <div className="gradient-orb orb-1" ref={el => { orbsRef.current[0] = el }}></div>
            <div className="gradient-orb orb-2" ref={el => { orbsRef.current[1] = el }}></div>
            <div className="gradient-orb orb-3" ref={el => { orbsRef.current[2] = el }}></div>
            <div className="circuit-pattern"></div>
            <div className="particle-field" id="particleField" ref={particleFieldRef}></div>
        </div>
    );
};

export default BackgroundEffects;
