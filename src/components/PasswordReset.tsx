import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3000/reset-password-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ 
                    type: 'success', 
                    text: 'Password reset email sent! Please check your inbox.' 
                });
                setEmail('');
            } else {
                setMessage({ 
                    type: 'error', 
                    text: data.error || 'Failed to send reset email. Please try again.' 
                });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gold to-amber flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Reset Password</h1>
                        <p className="text-white/60 text-sm">
                            Enter your email and we'll send you a link to reset your password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-5 p-3 rounded-xl text-sm ${
                                    message.type === 'success'
                                        ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                        : 'bg-red-500/20 border border-red-500/50 text-red-300'
                                }`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-amber to-orange text-bg-primary font-semibold text-base hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        {/* Back to Login */}
                        <div className="text-center mt-6">
                            <Link to="/login" className="text-sm text-white/60 hover:text-white/90 transition-colors">
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default PasswordReset;
