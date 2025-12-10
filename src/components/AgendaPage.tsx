import React, { useState, useEffect } from 'react';

interface Event {
    time: string;
    title: string;
    type: string;
    category: string;
    speaker: string;
    description: string;
}

interface Schedule {
    [key: number]: Event[];
}

const AgendaPage: React.FC = () => {
    const [activeDay, setActiveDay] = useState<number>(1);
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const filters = ['All', 'Main Stage', 'Innovation Zone', 'Competition', 'Pitching'];

    const schedule: Schedule = {
        1: [
            {
                time: "09:00 AM",
                title: "Inauguration Ceremony",
                type: "Main Stage",
                category: "Main Stage",
                speaker: "Chief Guests & Dignitaries",
                description: "Lighting of the lamp and opening address by SMEC Leadership."
            },
            {
                time: "10:30 AM",
                title: "Knowledge Bubble: Global Innovation Trends",
                type: "Panel Discussion",
                category: "Main Stage",
                speaker: "Industry Leaders & Policymakers",
                description: "Discussion on national strategies, funding frameworks, and R&D."
            },
            {
                time: "01:00 PM",
                title: "Networking Lunch",
                type: "Break",
                category: "All",
                speaker: "",
                description: ""
            },
            {
                time: "02:00 PM",
                title: "Ignite Expo Opening",
                type: "Exhibition",
                category: "Innovation Zone",
                speaker: "Student Innovators",
                description: "Showcasing top 20 pre-summit student innovation teams."
            },
            {
                time: "03:30 PM",
                title: "Idea2Impact",
                type: "Competition",
                category: "Competition",
                speaker: "Mentors & Teams",
                description: "Student teams present solutions to real-world problems."
            }
        ],
        2: [
            {
                time: "10:00 AM",
                title: "Masterminds Congregation",
                type: "Pitch",
                category: "Competition",
                speaker: "School Students (8th-10th)",
                description: "Young entrepreneurs pitch ideas to expert mentors."
            },
            {
                time: "11:30 AM",
                title: "InnoVestors Boot Camp",
                type: "Investment Pitch",
                category: "Pitching",
                speaker: "Startups & Investors",
                description: "Seed funding pitches. Potential investment up to 10 Crore INR."
            },
            {
                time: "01:00 PM",
                title: "Networking Lunch",
                type: "Break",
                category: "All",
                speaker: "",
                description: ""
            },
            {
                time: "02:00 PM",
                title: "Valedictory & Awards",
                type: "Main Stage",
                category: "Main Stage",
                speaker: "",
                description: "Recognizing the winners of the Pitch Challenge and closing remarks."
            }
        ]
    };

    const filteredEvents = schedule[activeDay].filter(item =>
        activeFilter === 'All' || item.category === activeFilter || item.category === 'All'
    );

    return (
        <div className={`min-h-screen pt-24 pb-16 px-4 md:px-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-in">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                        Event <span className="text-gold">Agenda</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore our comprehensive schedule of keynotes, pitch sessions, and networking opportunities designed to ignite innovation.
                    </p>
                </div>

                {/* Controls Container */}
                <div className="bg-bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-12 animate-in" style={{ animationDelay: '200ms' }}>

                    {/* Day Tabs */}
                    <div className="flex justify-center gap-6 mb-8 flex-wrap">
                        {[1, 2].map((day) => (
                            <button
                                key={day}
                                className={`relative group px-8 py-4 rounded-xl transition-all duration-300 w-full md:w-auto ${activeDay === day ? 'bg-gradient-to-r from-gold/20 to-orange-500/20 border-gold' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                onClick={() => setActiveDay(day)}
                                style={{ borderWidth: '1px' }}
                            >
                                <div className={`absolute inset-0 rounded-xl bg-gold/10 blur-xl transition-opacity duration-300 ${activeDay === day ? 'opacity-100' : 'opacity-0'}`}></div>
                                <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Day {day}</span>
                                <span className={`block text-xl md:text-2xl font-bold ${activeDay === day ? 'text-gold' : 'text-white'}`}>
                                    {day === 1 ? 'Fri, Feb 27' : 'Sat, Feb 28'}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex justify-center gap-3 flex-wrap">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === filter
                                        ? 'bg-gold text-bg-primary border-gold shadow-[0_0_15px_rgba(212,168,83,0.4)] scale-105'
                                        : 'bg-transparent text-gray-400 border-white/10 hover:border-gold hover:text-gold'
                                    }`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline & Cards */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block"></div>

                    <div className="flex flex-col gap-8 md:gap-12">
                        {filteredEvents.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-6 items-start md:items-center group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Event Card */}
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <div className={`w-full max-w-xl glass-card p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden group-hover:border-gold/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] fade-init`}>
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <i className="text-6xl md:text-8xl text-gold">★</i>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-bg-primary bg-gold/80 rounded-full">
                                                {item.time}
                                            </span>
                                            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-300 bg-white/5 rounded-full border border-white/10">
                                                {item.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-gold transition-colors">
                                            {item.title}
                                        </h3>

                                        {item.speaker && (
                                            <div className="flex items-center gap-2 text-gold-light mb-4">
                                                <span className="text-lg">🎤</span>
                                                <span className="font-medium">{item.speaker}</span>
                                            </div>
                                        )}

                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-[14px] md:left-1/2 w-3 h-3 bg-gold rounded-full border-4 border-bg-primary shadow-[0_0_0_4px_rgba(212,168,83,0.3)] z-10 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>

                                {/* Empty Space for Timeline Balance */}
                                <div className="hidden md:block w-1/2"></div>
                            </div>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20 animate-pulse">
                            <p className="text-xl text-gray-500">No events found for this filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgendaPage;
