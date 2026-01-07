import React from 'react';

const logos = [
    { name: "Google", color: "#4285F4" },
    { name: "Microsoft", color: "#F25022" },
    { name: "Amazon", color: "#FF9900" },
    { name: "Uber", color: "#000000" },
    { name: "Airbnb", color: "#FF5A5F" },
    { name: "Spotify", color: "#1DB954" },
    { name: "Netflix", color: "#E50914" },
    { name: "Stripe", color: "#008CDD" },
];

const TrustedBy = () => {
    return (
        <section className="py-12 bg-[#0a0a0f] border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Trusted by Industry Leaders</p>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap">
                    {/* First set of logos */}
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-8 flex items-center justify-center min-w-[120px] opacity-50 hover:opacity-100 transition-opacity duration-300">
                             <span className="text-xl md:text-2xl font-bold font-sans text-white/80">
                                 {logo.name}
                             </span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless scrolling */}
                    {logos.map((logo, index) => (
                        <div key={`dup-${index}`} className="mx-8 flex items-center justify-center min-w-[120px] opacity-50 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xl md:text-2xl font-bold font-sans text-white/80">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                     {/* Triplicate set for seamlessly scrolling on wide screens */}
                     {logos.map((logo, index) => (
                        <div key={`trip-${index}`} className="mx-8 flex items-center justify-center min-w-[120px] opacity-50 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xl md:text-2xl font-bold font-sans text-white/80">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default TrustedBy;
