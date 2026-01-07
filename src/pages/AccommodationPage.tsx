import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const hotels = [
    {
        name: "Hotel Grand Hyderabad",
        distance: "2 km from venue",
        price: "₹8,000/night",
        rating: "5 Star",
        amenities: ["WiFi", "Pool", "Gym", "Spa"]
    },
    {
        name: "ITC Kohenur",
        distance: "3 km from venue",
        price: "₹7,500/night",
        rating: "5 Star",
        amenities: ["WiFi", "Restaurant", "Gym"]
    },
    {
        name: "Novotel Hyderabad",
        distance: "4 km from venue",
        price: "₹5,000/night",
        rating: "4 Star",
        amenities: ["WiFi", "Pool", "Restaurant"]
    },
    {
        name: "Budget Inn",
        distance: "5 km from venue",
        price: "₹2,500/night",
        rating: "3 Star",
        amenities: ["WiFi", "Breakfast"]
    },
];

const AccommodationPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.acc-animate', {
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
                <div className="section-header-new acc-animate">
                    <span className="section-number font-mono text-xs tracking-widest">[STAY]</span>
                    <h1 className="section-title-new">ACCOMMODATION</h1>
                </div>

                <p className="acc-animate text-lg mb-12 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
                    Partner hotels offering special rates for Conclave attendees. 
                    Book early for the best availability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hotels.map((hotel, index) => (
                        <div key={index} className="acc-animate hotel-card">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{hotel.name}</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{hotel.distance}</p>
                                </div>
                                <span 
                                    className="text-xs px-2 py-1 rounded"
                                    style={{ background: 'rgba(107, 91, 149, 0.15)', color: 'var(--color-accent)' }}
                                >
                                    {hotel.rating}
                                </span>
                            </div>
                            <p className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>{hotel.price}</p>
                            <div className="flex flex-wrap gap-2">
                                {hotel.amenities.map((amenity, i) => (
                                    <span 
                                        key={i} 
                                        className="text-xs px-2 py-1 rounded"
                                        style={{ background: 'rgba(7, 7, 7, 0.05)', color: 'var(--color-text-secondary)' }}
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                            <button 
                                className="mt-6 w-full py-2 rounded-lg text-sm transition-all"
                                style={{ background: 'rgba(107, 91, 149, 0.05)', border: '1px solid rgba(7, 7, 7, 0.1)', color: 'var(--color-text-primary)' }}
                            >
                                Book Now →
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 acc-animate">
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Travel Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl p-6" style={{ background: 'rgba(107, 91, 149, 0.05)', border: '1px solid rgba(7, 7, 7, 0.1)' }}>
                            <h4 className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>By Air</h4>
                            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                Rajiv Gandhi International Airport (HYD) - 25 km from venue. 
                                Taxi/cab services available.
                            </p>
                        </div>
                        <div className="rounded-xl p-6" style={{ background: 'rgba(107, 91, 149, 0.05)', border: '1px solid rgba(7, 7, 7, 0.1)' }}>
                            <h4 className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>By Train</h4>
                            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                Secunderabad/Hyderabad Station - 15 km from venue. 
                                Metro connectivity available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccommodationPage;

