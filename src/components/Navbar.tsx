import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
        { name: 'Agenda', path: '/agenda' },
        { name: 'Themes', path: '/#themes' },
        { name: 'Login', path: '/login' },
    ];

    const getActivePath = () => {
        const path = location.pathname;
        const hash = location.hash;
        
        if (path === '/' && !hash) return 'Home';
        if (path === '/' && hash === '#about') return 'About';
        if (path === '/agenda') return 'Agenda';
        if (path === '/' && hash === '#themes') return 'Themes';
        if (path === '/login') return 'Login';
        if (path === '/register') return 'Register';
        return 'Home';
    };

    const activeTab = getActivePath();

    const isHome = location.pathname === '/';
    const showBackground = scrolled || !isHome || isMenuOpen;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
            showBackground ? 'bg-bg-primary/95 shadow-lg backdrop-blur-lg' : 'bg-transparent'
        }`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                {/* Logo */}
                <div className="z-50">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="SMEC Logo"
                            className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300"
                            onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation - Centered Floating Pill */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.name;
                            const isLink = item.path.startsWith('/') && !item.path.includes('#');

                            return isLink ? (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                                        isActive 
                                            ? 'text-white' 
                                            : 'text-white/70 hover:text-white/90'
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-lamp"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        >
                                            {/* Lamp glow effect */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-gold via-amber to-orange rounded-t-full shadow-lg shadow-gold/50">
                                                <div className="absolute w-12 h-8 bg-gold/30 rounded-full blur-lg -top-3 -left-1" />
                                                <div className="absolute w-8 h-6 bg-amber/40 rounded-full blur-md -top-2" />
                                                <div className="absolute w-6 h-4 bg-orange/30 rounded-full blur-sm -top-1 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </Link>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    className={`relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                                        isActive 
                                            ? 'text-white' 
                                            : 'text-white/70 hover:text-white/90'
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-lamp"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        >
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-gold via-amber to-orange rounded-t-full shadow-lg shadow-gold/50">
                                                <div className="absolute w-12 h-8 bg-gold/30 rounded-full blur-lg -top-3 -left-1" />
                                                <div className="absolute w-8 h-6 bg-amber/40 rounded-full blur-md -top-2" />
                                                <div className="absolute w-6 h-4 bg-orange/30 rounded-full blur-sm -top-1 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Register Button (Desktop) */}
                <div className="hidden md:block">
                    <Link 
                        to="/register" 
                        className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-gold via-amber to-orange text-bg-primary font-bold text-sm uppercase tracking-wide hover:shadow-lg hover:shadow-gold/40 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden group"
                    >
                        <span className="relative z-10">Register</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange via-amber to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 focus:outline-none relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-8 h-8 flex items-center justify-center">
                        <motion.div
                            animate={isMenuOpen ? "open" : "closed"}
                            className="relative w-6 h-5"
                        >
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 8 }
                                }}
                                className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
                                style={{ transformOrigin: "center" }}
                            />
                            <motion.span
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 }
                                }}
                                className="absolute top-2 left-0 w-full h-0.5 bg-white rounded-full"
                            />
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -8 }
                                }}
                                className="absolute top-4 left-0 w-full h-0.5 bg-white rounded-full"
                                style={{ transformOrigin: "center" }}
                            />
                        </motion.div>
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <motion.div
                    initial={false}
                    animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed inset-0 bg-bg-primary/98 backdrop-blur-2xl z-40 md:hidden flex flex-col items-center justify-center gap-6"
                >
                    {navItems.map((item, index) => {
                        const isLink = item.path.startsWith('/') && !item.path.includes('#');
                        
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {isLink ? (
                                    <Link
                                        to={item.path}
                                        className={`text-3xl font-display font-medium transition-colors ${
                                            activeTab === item.name 
                                                ? 'text-gold' 
                                                : 'text-white hover:text-gold'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.path}
                                        className={`text-3xl font-display font-medium transition-colors ${
                                            activeTab === item.name 
                                                ? 'text-gold' 
                                                : 'text-white hover:text-gold'
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </motion.div>
                        );
                    })}
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: navItems.length * 0.05 }}
                        className="mt-6"
                    >
                        <Link
                            to="/register"
                            className="px-10 py-4 text-xl rounded-full bg-gradient-to-r from-gold via-amber to-orange text-bg-primary font-bold hover:shadow-lg hover:shadow-gold/40 transition-all duration-300 inline-block"
                        >
                            Register Now
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
