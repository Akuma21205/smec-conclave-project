import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [resending, setResending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Get email from navigation state
    const email = location.state?.email || '';

    useEffect(() => {
        // If no email, redirect to register
        if (!email) {
            navigate('/register');
        }
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, [email, navigate]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all filled
        if (newCode.every(digit => digit !== '') && index === 5) {
            const fullCode = newCode.join('');
            handleVerify(fullCode);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pastedData.split('').filter(char => /^\d$/.test(char));
        
        const newCode = [...code];
        digits.forEach((digit, i) => {
            if (i < 6) newCode[i] = digit;
        });
        setCode(newCode);

        // Auto-submit if complete
        if (digits.length === 6) {
            handleVerify(digits.join(''));
        }
    };

    const handleVerify = async (verificationCode?: string) => {
        const fullCode = verificationCode || code.join('');
        
        if (fullCode.length !== 6) {
            setMessage({ type: 'error', text: 'Please enter the complete 6-digit code' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3000/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    token: fullCode
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Email verified! Redirecting to login...' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Verification failed. Please try again.' });
                // Clear code on error
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3000/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Verification code resent! Check your email.' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to resend code' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setResending(false);
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Verify Your Email</h1>
                        <p className="text-white/60 text-sm">
                            We sent a 6-digit code to<br />
                            <span className="text-white font-medium">{email}</span>
                        </p>
                    </div>

                    {/* OTP Input */}
                    <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/30 transition-all"
                                disabled={loading}
                            />
                        ))}
                    </div>

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-5 p-3 rounded-xl text-sm text-center ${
                                message.type === 'success'
                                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                            }`}
                        >
                            {message.text}
                        </motion.div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={() => handleVerify()}
                        disabled={loading || code.some(d => !d)}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple via-blue to-purple text-white font-semibold text-base hover:shadow-lg hover:shadow-purple/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 mb-4"
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>

                    {/* Resend Code */}
                    <div className="text-center">
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-sm text-white/60 hover:text-white/90 transition-colors disabled:opacity-50"
                        >
                            {resending ? 'Resending...' : "Didn't receive code? Resend"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
