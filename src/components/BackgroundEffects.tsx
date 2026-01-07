import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Cloud } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Planet = ({ position, size, color, ringColor, rotationSpeed = 0.001 }: { position: [number, number, number], size: number, color: string, ringColor?: string, rotationSpeed?: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
                </mesh>
                {ringColor && (
                   <mesh rotation={[-Math.PI / 2, 0.2, 0]}>
                       <ringGeometry args={[size * 1.4, size * 2, 64]} />
                       <meshStandardMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.6} />
                   </mesh>
                )}
            </Float>
        </group>
    );
};

const CustomNebula = () => {
    return (
        <group>
             <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[-5, 2, -10]} color="#8a2be2" />
             <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[5, -2, -15]} color="#4b0082" />
        </group>
    )
}

const BackgroundEffects = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <color attach="background" args={['#050510']} /> {/* Deep space dark blue/black */}
                
                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4b0082" />

                {/* Stars */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Nebula Effects */}
                <CustomNebula />

                {/* Planets */}
                <Planet 
                    position={[-8, 3, -5]} 
                    size={2} 
                    color="#4169e1" // Royal Blue
                    rotationSpeed={0.002}
                />
                
                <Planet 
                    position={[10, -4, -10]} 
                    size={3.5} 
                    color="#cd853f" // Peru (Orange-ish)
                    ringColor="#deb887"
                    rotationSpeed={0.001}
                />

                <Planet 
                     position={[-5, -6, 0]}
                     size={0.8}
                     color="#a0a0a0"
                     rotationSpeed={0.005}
                />

                {/* Interactive Camera movement could be added here defined by mouse position if requested, 
                    but sticking to subtle float for now */}
            </Canvas>
            
            {/* Overlay for text readability if needed, though the scene is dark */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />

             {/* Preserving the aesthetic UI labels from previous version if they fit the theme, or adapted */}
             <div className="absolute top-28 left-8 text-white/30 font-mono text-xs tracking-wider mix-blend-screen pointer-events-none">
                [GIC.2026]
            </div>
            <div className="absolute top-28 right-8 text-white/30 font-mono text-xs tracking-wider hidden md:block mix-blend-screen pointer-events-none">
                [INNOVATE]
            </div>
             <div className="absolute bottom-8 left-8 text-white/30 font-mono text-xs tracking-wider hidden md:block mix-blend-screen pointer-events-none">
                FEB.27-28
            </div>
            <div className="absolute bottom-8 right-8 text-white/30 font-mono text-xs tracking-wider hidden md:block mix-blend-screen pointer-events-none">
                HYDERABAD
            </div>
        </div>
    );
};

export default BackgroundEffects;
