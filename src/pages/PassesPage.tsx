import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const passes = [
    {
        name: "Visitor Pass",
        price: "₹999",
        originalPrice: "₹1,499",
        features: ["Access to Expo", "Keynote Sessions", "Networking Areas"],
        popular: false
    },
    {
        name: "Delegate Pass",
        price: "₹4,999",
        originalPrice: "₹7,499",
        features: ["All Visitor Benefits", "Workshop Access", "Lunch Included", "Certificate"],
        popular: true
    },
    {
        name: "VIP Pass",
        price: "₹14,999",
        originalPrice: "₹19,999",
        features: ["All Delegate Benefits", "VIP Lounge", "1:1 Investor Meeting", "Priority Seating", "Dinner Gala"],
        popular: false
    },
];

const PassesPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pass-animate', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="page-container">
            <section className="section">
                <div className="section-header-new pass-animate">
                    <span className="section-number font-mono text-xs tracking-widest">[PASSES]</span>
                    <h1 className="section-title-new">GET YOUR PASS</h1>
                </div>

                <p className="pass-animate text-lg mb-12 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
                    Early bird pricing available! Secure your spot at India's biggest 
                    innovation summit.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {passes.map((pass, index) => (
                        <div 
                            key={index} 
                            className={`pass-animate pass-card ${pass.popular ? 'popular' : ''}`}
                        >
                            {pass.popular && (
                                <span 
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs px-4 py-1 rounded-full"
                                    style={{ background: 'var(--color-accent)' }}
                                >
                                    MOST POPULAR
                                </span>
                            )}
                            <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{pass.name}</h3>
                            <div className="mt-4">
                                <span className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>{pass.price}</span>
                                <span className="line-through ml-2" style={{ color: 'var(--color-text-muted)' }}>{pass.originalPrice}</span>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {pass.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <span className="text-sm" style={{ color: 'var(--color-accent)' }}>●</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => navigate('/register')}
                                className={`mt-8 w-full py-3 rounded-lg font-medium transition-all ${
                                    pass.popular 
                                        ? 'text-white' 
                                        : 'border'
                                }`}
                                style={pass.popular 
                                    ? { background: 'var(--color-accent)' }
                                    : { background: 'rgba(107, 91, 149, 0.05)', borderColor: 'rgba(7, 7, 7, 0.1)', color: 'var(--color-text-primary)' }
                                }
                            >
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pass-animate rounded-xl p-8 text-center" style={{ background: 'rgba(107, 91, 149, 0.05)', border: '1px solid rgba(7, 7, 7, 0.1)' }}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Group Discounts Available</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Register 5+ people and get 20% off. Contact us for details.</p>
                </div>
            </section>
        </div>
    );
};

export default PassesPage;

