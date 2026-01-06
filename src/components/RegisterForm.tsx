import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    state: string;
    pincode: string;
    profession: 'student' | 'professional' | '';
    collegeName: string;
    companyName: string;
}

const RegisterForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        state: '',
        pincode: '',
        profession: '',
        collegeName: '',
        companyName: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // State options based on country
    const statesByCountry: Record<string, string[]> = {
        India: ['Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Delhi', 'Gujarat', 'Kerala', 'West Bengal', 'Uttar Pradesh'],
        USA: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
        UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Clear state when country changes
            ...(name === 'country' ? { state: '' } : {}),
            // Clear conditional fields when profession changes
            ...(name === 'profession' && value === 'student' ? { companyName: '' } : {}),
            ...(name === 'profession' && value === 'professional' ? { collegeName: '' } : {}),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            setLoading(false);
            return;
        }

        // Remove confirmPassword before sending
        const { confirmPassword, ...dataToSend } = formData;

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Registration successful! You can now login with your credentials.' });
                // Reset form
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                    dateOfBirth: '',
                    country: '',
                    state: '',
                    pincode: '',
                    profession: '',
                    collegeName: '',
                    companyName: '',
                });
            } else {
                setMessage({ type: 'error', text: data.error || 'Registration failed. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-gold via-purple to-blue bg-clip-text text-transparent">
                        Register for Conclave
                    </h1>
                    <p className="text-lg text-white/70">
                        Join us at SMEC's Global Innovators Conclave 2026
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
                >
                    {/* Full Name */}
                    <div className="mb-6">
                        <label htmlFor="fullName" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                            Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-6">
                        <label htmlFor="phoneNumber" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                            Phone Number <span className="text-gold">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            placeholder="10-digit mobile number"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                            Email ID <span className="text-gold">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Password and Confirm Password in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Password <span className="text-gold">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                    placeholder="Min 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Confirm Password <span className="text-gold">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                    placeholder="Re-enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Gender and DOB in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Gender <span className="text-gold">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            >
                                <option value="" className="bg-bg-primary">Select gender</option>
                                <option value="male" className="bg-bg-primary">Male</option>
                                <option value="female" className="bg-bg-primary">Female</option>
                                <option value="other" className="bg-bg-primary">Other</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Date of Birth <span className="text-gold">*</span>
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Country, State, and Pincode in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Country */}
                        <div>
                            <label htmlFor="country" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Country <span className="text-gold">*</span>
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                            >
                                <option value="" className="bg-bg-primary">Select country</option>
                                <option value="India" className="bg-bg-primary">India</option>
                                <option value="USA" className="bg-bg-primary">USA</option>
                                <option value="UK" className="bg-bg-primary">UK</option>
                            </select>
                        </div>

                        {/* State */}
                        <div>
                            <label htmlFor="state" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                State <span className="text-gold">*</span>
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                disabled={!formData.country}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" className="bg-bg-primary">Select state</option>
                                {formData.country && statesByCountry[formData.country]?.map(state => (
                                    <option key={state} value={state} className="bg-bg-primary">{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* Pincode */}
                        <div>
                            <label htmlFor="pincode" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Pincode <span className="text-gold">*</span>
                            </label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{6}"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                placeholder="6-digit code"
                            />
                        </div>
                    </div>

                    {/* Profession */}
                    <div className="mb-6">
                        <label className="block text-white/90 font-medium mb-3 text-sm uppercase tracking-wide">
                            Profession <span className="text-gold">*</span>
                        </label>
                        <div className="flex gap-6">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="profession"
                                    value="student"
                                    checked={formData.profession === 'student'}
                                    onChange={handleChange}
                                    required
                                    className="w-5 h-5 text-gold border-white/20 focus:ring-gold focus:ring-2 cursor-pointer"
                                />
                                <span className="ml-2 text-white/80 group-hover:text-gold transition-colors">Student</span>
                            </label>
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="profession"
                                    value="professional"
                                    checked={formData.profession === 'professional'}
                                    onChange={handleChange}
                                    required
                                    className="w-5 h-5 text-gold border-white/20 focus:ring-gold focus:ring-2 cursor-pointer"
                                />
                                <span className="ml-2 text-white/80 group-hover:text-gold transition-colors">Professional</span>
                            </label>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {formData.profession === 'student' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6"
                        >
                            <label htmlFor="collegeName" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                College Name <span className="text-gold">*</span>
                            </label>
                            <input
                                type="text"
                                id="collegeName"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                required={formData.profession === 'student'}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                placeholder="Enter your college name"
                            />
                        </motion.div>
                    )}

                    {formData.profession === 'professional' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6"
                        >
                            <label htmlFor="companyName" className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                                Company Name <span className="text-gold">*</span>
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required={formData.profession === 'professional'}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
                                placeholder="Enter your company name"
                            />
                        </motion.div>
                    )}

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-xl ${
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
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-amber to-orange text-bg-primary font-bold text-lg uppercase tracking-wide hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Registering...' : 'Complete Registration'}
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default RegisterForm;
