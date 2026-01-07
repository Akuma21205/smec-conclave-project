import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

type NavOption = {
    label: string;
    path: string;
    icon?: string;
};

const navOptions: NavOption[] = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "About", path: "/about", icon: "ℹ️" },
    { label: "Agenda", path: "/agenda", icon: "📅" },
    { label: "Events", path: "/events", icon: "🎉" },
    { label: "Speakers", path: "/speakers", icon: "🎤" },
    { label: "Sponsors", path: "/sponsors", icon: "🤝" },
    { label: "Passes", path: "/passes", icon: "🎫" },
    { label: "Accommodation", path: "/accommodation", icon: "🏨" },
];

const authOptions: NavOption[] = [
    { label: "Register", path: "/register", icon: "📝" },
    { label: "Login", path: "/login", icon: "🔐" },
];

type FloatingActionMenuProps = {
    className?: string;
};

const FloatingActionMenu = ({ className }: FloatingActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div className={cn("fixed bottom-8 right-8 z-50", className)}>
            {/* Main toggle button */}
            <button
                onClick={toggleMenu}
                className="w-14 h-14 rounded-full bg-rose shadow-lg shadow-rose/30 hover:bg-rose-light transition-all duration-300 flex items-center justify-center"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="absolute bottom-16 right-0 mb-2"
                        >
                            <div className="bg-bg-secondary/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl min-w-[200px]">
                                {/* Navigation Links */}
                                <div className="flex flex-col gap-1 mb-4">
                                    <span className="text-xs text-white/40 font-mono tracking-wider px-3 py-1">
                                        [NAVIGATION]
                                    </span>
                                    {navOptions.map((option, index) => (
                                        <motion.button
                                            key={option.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            onClick={() => handleNavigation(option.path)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left",
                                                location.pathname === option.path
                                                    ? "bg-rose/20 text-rose"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            <span className="text-lg">{option.icon}</span>
                                            <span className="text-sm font-medium">{option.label}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/10 my-2" />

                                {/* Auth Links */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-white/40 font-mono tracking-wider px-3 py-1">
                                        [ACCOUNT]
                                    </span>
                                    {authOptions.map((option, index) => (
                                        <motion.button
                                            key={option.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (navOptions.length + index) * 0.03 }}
                                            onClick={() => handleNavigation(option.path)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left",
                                                option.label === "Register"
                                                    ? "bg-rose text-white hover:bg-rose-light"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            <span className="text-lg">{option.icon}</span>
                                            <span className="text-sm font-medium">{option.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionMenu;
