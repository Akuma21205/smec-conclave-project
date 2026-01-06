import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if this is a valid password reset link
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (!accessToken) {
            setMessage({ 
                type: 'error', 
                text: 'Invalid password reset link. Please request a new one.' 
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setMessage({ 
                    type: 'error', 
                    text: error.message || 'Failed to reset password. Please try again.' 
                });
            } else {
                setMessage({ 
                    type: 'success', 
                    text: 'Password reset successful! Redirecting to login...' 
                });
                setTimeout(() => navigate('/login'), 2000);
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
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple to-blue flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Create New Password</h1>
                        <p className="text-white/60 text-sm">
                            Enter your new password below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Password */}
                        <div className="mb-5">
                            <label htmlFor="password" className="block text-white/80 text-sm mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/30 transition-all"
                                    placeholder="Min 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-white/80 text-sm mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/30 transition-all"
                                    placeholder="Re-enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
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
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple via-blue to-purple text-white font-semibold text-base hover:shadow-lg hover:shadow-purple/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
