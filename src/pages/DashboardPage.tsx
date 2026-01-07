import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

// Mock user data - in production this would come from backend/auth
const mockUserData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1 (555) 123-4567',
    gender: 'Male',
};

interface ProfileData {
    // Permanent (read-only) fields
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    // Editable fields
    location: string;
    profession: string;
    company: string;
    about: string;
    profilePicture: string | null;
}

const DashboardPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const [profileData, setProfileData] = useState<ProfileData>({
        // Permanent fields from mock data
        fullName: mockUserData.fullName,
        email: mockUserData.email,
        phoneNumber: mockUserData.phoneNumber,
        gender: mockUserData.gender,
        // Editable fields
        location: '',
        profession: '',
        company: '',
        about: '',
        profilePicture: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Calculate profile completion percentage
    const calculateCompletion = (): number => {
        const fields = [
            profileData.fullName,
            profileData.email,
            profileData.phoneNumber,
            profileData.gender,
            profileData.location,
            profileData.profession,
            profileData.company,
            profileData.about,
            profileData.profilePicture,
        ];
        const filledFields = fields.filter(field => field && field.trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const completionPercentage = calculateCompletion();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.dash-animate', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({
                    ...prev,
                    profilePicture: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset editable fields would go here if needed
    };

    return (
        <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Dashboard Header */}
                <div className="flex items-center gap-3 mb-8 dash-animate">
                    <div className="grid grid-cols-2 gap-1 p-2 rounded-lg" style={{ background: 'var(--color-accent)' }}>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Dashboard</h1>
                </div>

                {/* Main Content */}
                <div 
                    className="dash-animate rounded-2xl p-8 md:p-10"
                    style={{ background: 'var(--color-bg-secondary)', border: '1px solid rgba(7, 7, 7, 0.08)' }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Panel */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Personal Information
                            </h2>
                            <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                                Use a permanent address where you can receive mail. This information will be displayed on your public profile.
                            </p>

                            {/* Profile Completion */}
                            <div 
                                className="rounded-xl p-5 mb-6"
                                style={{ background: 'rgba(7, 7, 7, 0.02)', border: '1px solid rgba(7, 7, 7, 0.06)' }}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
                                        Profile Completion
                                    </span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                                        {completionPercentage}%
                                    </span>
                                </div>
                                <div 
                                    className="h-2 rounded-full overflow-hidden"
                                    style={{ background: 'rgba(107, 91, 149, 0.2)' }}
                                >
                                    <div 
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ 
                                            width: `${completionPercentage}%`,
                                            background: 'var(--color-accent)'
                                        }}
                                    ></div>
                                </div>
                                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
                                    {completionPercentage < 100 
                                        ? 'Complete your profile to unlock all features.'
                                        : 'Your profile is complete! 🎉'}
                                </p>
                            </div>

                            {/* Profile Picture Upload */}
                            <div 
                                className="rounded-xl p-5"
                                style={{ background: 'rgba(7, 7, 7, 0.02)', border: '1px solid rgba(7, 7, 7, 0.06)' }}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider block mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                    Profile Picture <span style={{ color: 'var(--color-accent)' }}>*</span>
                                </span>
                                <div 
                                    onClick={handleProfilePictureClick}
                                    className="relative w-32 h-32 mx-auto rounded-full overflow-hidden cursor-pointer group transition-all"
                                    style={{ 
                                        background: profileData.profilePicture 
                                            ? 'transparent' 
                                            : 'linear-gradient(135deg, rgba(107, 91, 149, 0.2), rgba(139, 123, 181, 0.2))',
                                        border: '3px dashed rgba(107, 91, 149, 0.3)'
                                    }}
                                >
                                    {profileData.profilePicture ? (
                                        <img 
                                            src={profileData.profilePicture} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <span className="text-3xl mb-1">📷</span>
                                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Upload</span>
                                        </div>
                                    )}
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ background: 'rgba(0,0,0,0.5)' }}
                                    >
                                        <span className="text-white text-sm font-medium">Change Photo</span>
                                    </div>
                                </div>
                                <input 
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <p className="text-xs text-center mt-3" style={{ color: 'var(--color-text-muted)' }}>
                                    Click to upload a profile picture
                                </p>
                            </div>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name - Read Only */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">👤</span>
                                        <input
                                            type="text"
                                            value={profileData.fullName}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm"
                                            style={{ 
                                                background: 'rgba(7, 7, 7, 0.04)',
                                                border: '1px solid rgba(7, 7, 7, 0.08)',
                                                color: 'var(--color-text-secondary)',
                                                cursor: 'not-allowed'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Email - Read Only */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Email Address 
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">✉️</span>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm"
                                            style={{ 
                                                background: 'rgba(7, 7, 7, 0.04)',
                                                border: '1px solid rgba(7, 7, 7, 0.08)',
                                                color: 'var(--color-text-secondary)',
                                                cursor: 'not-allowed'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Phone Number - Read Only */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Phone Number 
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">📞</span>
                                        <input
                                            type="tel"
                                            value={profileData.phoneNumber}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm"
                                            style={{ 
                                                background: 'rgba(7, 7, 7, 0.04)',
                                                border: '1px solid rgba(7, 7, 7, 0.08)',
                                                color: 'var(--color-text-secondary)',
                                                cursor: 'not-allowed'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Gender - Read Only */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Gender 
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">⚧️</span>
                                        <input
                                            type="text"
                                            value={profileData.gender}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm"
                                            style={{ 
                                                background: 'rgba(7, 7, 7, 0.04)',
                                                border: '1px solid rgba(7, 7, 7, 0.08)',
                                                color: 'var(--color-text-secondary)',
                                                cursor: 'not-allowed'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Location - Editable */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Location
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">📍</span>
                                        <input
                                            type="text"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleChange}
                                            placeholder="City, Country"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                                            style={{ 
                                                background: 'white',
                                                border: '1px solid rgba(7, 7, 7, 0.1)',
                                                color: 'var(--color-text-primary)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Profession - Editable */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Profession
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">💼</span>
                                        <input
                                            type="text"
                                            name="profession"
                                            value={profileData.profession}
                                            onChange={handleChange}
                                            placeholder="e.g. Software Engineer"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                                            style={{ 
                                                background: 'white',
                                                border: '1px solid rgba(7, 7, 7, 0.1)',
                                                color: 'var(--color-text-primary)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Company - Editable */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        Company / Organization
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🏢</span>
                                        <input
                                            type="text"
                                            name="company"
                                            value={profileData.company}
                                            onChange={handleChange}
                                            placeholder="e.g. Acme Corp or University"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                                            style={{ 
                                                background: 'white',
                                                border: '1px solid rgba(7, 7, 7, 0.1)',
                                                color: 'var(--color-text-primary)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* About - Editable */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        About
                                    </label>
                                    <textarea
                                        name="about"
                                        value={profileData.about}
                                        onChange={handleChange}
                                        placeholder="Brief description for your profile."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
                                        style={{ 
                                            background: 'white',
                                            border: '1px solid rgba(7, 7, 7, 0.1)',
                                            color: 'var(--color-text-primary)'
                                        }}
                                    />
                                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                        Brief description for your profile. URLs are hyperlinked.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(7, 7, 7, 0.08)' }}>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                                    style={{ 
                                        background: 'white',
                                        border: '1px solid rgba(7, 7, 7, 0.15)',
                                        color: 'var(--color-text-primary)'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || !profileData.profilePicture}
                                    className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ 
                                        background: 'var(--color-accent)'
                                    }}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            {!profileData.profilePicture && (
                                <p className="text-xs text-right mt-2" style={{ color: '#e53e3e' }}>
                                    * Please upload a profile picture to save changes
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 dash-animate">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        © 2026 SMEC Global Innovators Conclave. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
