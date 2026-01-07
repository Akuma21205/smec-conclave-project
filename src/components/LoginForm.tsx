import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { Input } from "@heroui/react";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Basic validation
        if (!formData.email || !formData.password) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            setLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
             // navigate('/dashboard'); // Mock navigation
             setMessage({ type: 'error', text: 'Backend functionality coming soon!' });
             navigate('/');
        } catch (error) {
            setMessage({ type: 'error', text: 'Login failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden bg-[#EAEAEA]">
            {/* Decorative background elements - Adjusted for Light Theme */}
            <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-rose/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-violet/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl border border-white/40 shadow-xl relative overflow-hidden group">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-display font-bold text-black mb-2 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-black/60 text-sm">
                            Access your personalized dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            variant="bordered"
                            value={formData.email}
                            onChange={(e) => handleChange(e as any)}
                            required
                            classNames={{
                                inputWrapper: "border-black/20 hover:border-rose/50 focus-within:!border-rose",
                                label: "text-black/60",
                                input: "text-black",
                            }}
                        />

                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            variant="bordered"
                            value={formData.password}
                            onChange={(e) => handleChange(e as any)}
                            required
                            classNames={{
                                inputWrapper: "border-black/20 hover:border-rose/50 focus-within:!border-rose",
                                label: "text-black/60",
                                input: "text-black",
                            }}
                        />

                        {/* Message */}
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl text-sm border backdrop-blur-md ${
                                    message.type === 'success'
                                        ? 'bg-green-100 border-green-200 text-green-700'
                                        : 'bg-red-100 border-red-200 text-red-700'
                                }`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="flex flex-col items-center pt-4 gap-6">
                            <InteractiveHoverButton 
                                type="submit"
                                disabled={loading}
                                text={loading ? "SIGNING IN..." : "SIGN IN"}
                                className="w-full border-black/10 hover:border-black/30 text-black hover:bg-black/5"
                            />
                            
                            <p className="text-black/40 text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-rose hover:text-rose/80 transition-colors font-medium">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginForm;
