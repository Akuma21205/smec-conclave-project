import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { Input, Select, SelectItem, RadioGroup, Radio } from "@heroui/react";
import { 
    GraduationCap, 
    Briefcase, 
    Check, 
    ChevronLeft, 
    CreditCard, 
    Sparkles,
    Ticket,
    Calendar,
    MapPin,
    User,
    Mail,
    Phone
} from 'lucide-react';

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
    collegeName: string;
    companyName: string;
}

type Category = 'student' | 'professional' | null;
type PassType = 'day1' | 'day2' | 'full' | 'vip' | null;

interface PassOption {
    id: PassType;
    name: string;
    price: number;
    description: string;
    features: string[];
    recommended?: boolean;
}

const PASS_OPTIONS: Record<'student' | 'professional', PassOption[]> = {
    student: [
        {
            id: 'day1',
            name: 'Day 1 Pass',
            price: 499,
            description: 'Access to Day 1 keynotes and expo.',
            features: ['Keynote Sessions', 'Innovation Expo', 'Standard Swag Bag']
        },
        {
            id: 'full',
            name: 'Conclave Pass',
            price: 899,
            description: 'Complete 2-day experience.',
            features: ['All Keynotes & Panels', 'Innovation Expo', 'Workshop Access', 'Premium Swag Bag', 'Certificate'],
            recommended: true
        }
    ],
    professional: [
        {
            id: 'day1',
            name: 'Day 1 Pass',
            price: 1499,
            description: 'Networking and keynotes for Day 1.',
            features: ['Keynote Sessions', 'Innovation Expo', 'Networking Lunch']
        },
        {
            id: 'full',
            name: 'Pro Delegate',
            price: 2499,
            description: 'Full access + VIP networking.',
            features: ['All Access', 'VIP Lounge Entry', 'Gala Dinner Invite', 'Networking Lunch', 'Priority Seating'],
            recommended: true
        }
    ]
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState<Category>(null);
    const [selectedPass, setSelectedPass] = useState<PassType>(null);
    
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
        collegeName: '',
        companyName: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Helper to get current pass details
    const currentPassDetails = category && selectedPass 
        ? PASS_OPTIONS[category].find(p => p.id === selectedPass) 
        : null;

    // State options based on country
    const statesByCountry: Record<string, string[]> = {
        India: ['Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Delhi', 'Gujarat', 'Kerala', 'West Bengal', 'Uttar Pradesh'],
        USA: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
        UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'country' ? { state: '' } : {}),
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'country' ? { state: '' } : {}),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            setLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Include category and pass info in state
            navigate('/verify-email', { 
                state: { 
                    email: formData.email,
                    category,
                    passType: selectedPass
                } 
            });
        } catch (error) {
            setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const inputStyles = {
        inputWrapper: "border-black/20 hover:border-rose/50 focus-within:!border-rose",
        label: "text-black/60",
        input: "text-black",
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden bg-[#EAEAEA]">
            
            {/* Background elements */}
            <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-rose/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-violet/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-5xl relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-black mb-3 tracking-tight"
                    >
                        Join the Conclave
                    </motion.h1>
                    
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        {['Category', 'Pass Selection', 'Details'].map((label, idx) => {
                            const stepNum = idx + 1;
                            const isActive = step >= stepNum;
                            const isCurrent = step === stepNum;
                            
                            return (
                                <div key={label} className="flex items-center gap-2">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                                        ${isActive ? 'bg-rose text-white shadow-lg shadow-rose/25' : 'bg-black/5 text-black/40'}
                                    `}>
                                        {isActive ? <Check className="w-4 h-4" /> : stepNum}
                                    </div>
                                    <span className={`text-sm font-medium ${isCurrent ? 'text-black' : 'text-black/40'} hidden md:block`}>
                                        {label}
                                    </span>
                                    {idx < 2 && <div className="w-12 h-[1px] bg-black/10 hidden md:block" />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    
                    {/* STEP 1: CATEGORY SELECTION */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'student', icon: GraduationCap, title: 'Student', desc: 'For robust learning & networking' },
                                    { id: 'professional', icon: Briefcase, title: 'Professional', desc: 'For industry insights & connections' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setCategory(item.id as Category);
                                            nextStep();
                                        }}
                                        className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/40 hover:border-rose/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose/5 text-left"
                                    >
                                        <div className="w-14 h-14 bg-rose/5 rounded-2xl flex items-center justify-center text-rose mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-black mb-2">{item.title}</h3>
                                        <p className="text-black/60">{item.desc}</p>
                                        
                                        <div className="absolute top-8 right-8 text-black/20 group-hover:text-rose transition-colors">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: PASS SELECTION */}
                    {step === 2 && category && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {PASS_OPTIONS[category].map((pass) => (
                                    <div 
                                        key={pass.id}
                                        className={`
                                            relative bg-white/80 backdrop-blur-xl rounded-[2rem] border transition-all duration-300 overflow-hidden cursor-pointer
                                            ${selectedPass === pass.id 
                                                ? 'border-rose shadow-2xl shadow-rose/10 scale-[1.02]' 
                                                : 'border-white/40 hover:border-black/20 hover:shadow-xl'}
                                        `}
                                        onClick={() => setSelectedPass(pass.id as PassType)}
                                    >
                                        {pass.recommended && (
                                            <div className="bg-gradient-to-r from-rose to-orange-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 absolute top-0 right-0 rounded-bl-2xl">
                                                Most Popular
                                            </div>
                                        )}
                                        
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-black">{pass.name}</h3>
                                                    <p className="text-sm text-black/50 mt-1">{pass.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-rose">₹{pass.price}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mt-6 mb-8">
                                                {pass.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-sm text-black/70">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                            <Check className="w-3 h-3 text-green-600" />
                                                        </div>
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            <InteractiveHoverButton 
                                                onClick={() => {
                                                    setSelectedPass(pass.id as PassType);
                                                    nextStep();
                                                }}
                                                text={selectedPass === pass.id ? "Selected" : "Select Pass"}
                                                className={`w-full ${selectedPass === pass.id ? 'bg-black text-white' : ''}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 flex justify-center">
                                <button 
                                    onClick={prevStep}
                                    className="text-black/40 hover:text-rose transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Change Category
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: DETAILS FORM */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-xl overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                
                                {/* Form Area */}
                                <div className="lg:col-span-2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-black/5">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-bold text-black">Your Details</h2>
                                        <button 
                                            onClick={prevStep}
                                            className="text-black/40 hover:text-rose transition-colors text-sm"
                                        >
                                            Change Pass
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        
                                        {/* Basic Info */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Full Name</label>
                                                <Input
                                                    startContent={<User className="w-4 h-4 text-black/40" />}
                                                    name="fullName"
                                                    variant="bordered"
                                                    placeholder="Enter your full name"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-black/70">Email</label>
                                                    <Input
                                                        startContent={<Mail className="w-4 h-4 text-black/40" />}
                                                        type="email"
                                                        name="email"
                                                        variant="bordered"
                                                        placeholder="john@example.com"
                                                        value={formData.email}
                                                        onChange={(e) => handleChange(e as any)}
                                                        required
                                                        classNames={inputStyles}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-black/70">Phone Number</label>
                                                    <Input
                                                        startContent={<Phone className="w-4 h-4 text-black/40" />}
                                                        type="tel"
                                                        name="phoneNumber"
                                                        variant="bordered"
                                                        placeholder="+91 98765 43210"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => handleChange(e as any)}
                                                        required
                                                        classNames={inputStyles}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Gender</label>
                                                <Select 
                                                    variant="bordered" 
                                                    placeholder="Select gender"
                                                    selectedKeys={formData.gender ? [formData.gender] : []}
                                                    onSelectionChange={(keys) => handleSelectChange('gender', Array.from(keys)[0] as string)}
                                                    classNames={{ trigger: inputStyles.inputWrapper }}
                                                >
                                                    <SelectItem key="male">Male</SelectItem>
                                                    <SelectItem key="female">Female</SelectItem>
                                                    <SelectItem key="other">Other</SelectItem>
                                                </Select>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Date of Birth</label>
                                                <Input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    variant="bordered"
                                                    value={formData.dateOfBirth}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                        </div>

                                        {/* Category Specific */}
                                        {category === 'student' ? (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">College / University</label>
                                                <Input
                                                    startContent={<GraduationCap className="w-4 h-4 text-black/40" />}
                                                    name="collegeName"
                                                    variant="bordered"
                                                    placeholder="Enter college name"
                                                    value={formData.collegeName}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Company / Organization</label>
                                                <Input
                                                    startContent={<Briefcase className="w-4 h-4 text-black/40" />}
                                                    name="companyName"
                                                    variant="bordered"
                                                    placeholder="Enter company name"
                                                    value={formData.companyName}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                        )}

                                        {/* Address */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Country</label>
                                                <Select
                                                    variant="bordered"
                                                    placeholder="Select country"
                                                    selectedKeys={formData.country ? [formData.country] : []}
                                                    onSelectionChange={(keys) => handleSelectChange('country', Array.from(keys)[0] as string)}
                                                    classNames={{ trigger: inputStyles.inputWrapper }}
                                                >
                                                    <SelectItem key="India">India</SelectItem>
                                                    <SelectItem key="USA">USA</SelectItem>
                                                    <SelectItem key="UK">UK</SelectItem>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">State</label>
                                                <Select
                                                    variant="bordered"
                                                    placeholder="Select state"
                                                    selectedKeys={formData.state ? [formData.state] : []}
                                                    onSelectionChange={(keys) => handleSelectChange('state', Array.from(keys)[0] as string)}
                                                    isDisabled={!formData.country}
                                                    classNames={{ trigger: inputStyles.inputWrapper }}
                                                >
                                                    {(formData.country && statesByCountry[formData.country]) ? 
                                                        statesByCountry[formData.country].map((state) => (
                                                            <SelectItem key={state}>{state}</SelectItem>
                                                        )) : []
                                                    }
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Pincode</label>
                                                <Input
                                                    name="pincode"
                                                    variant="bordered"
                                                    placeholder="Enter pincode"
                                                    value={formData.pincode}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Password</label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    variant="bordered"
                                                    placeholder="Create password"
                                                    value={formData.password}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-black/70">Confirm Password</label>
                                                <Input
                                                    type="password"
                                                    name="confirmPassword"
                                                    variant="bordered"
                                                    placeholder="Confirm password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleChange(e as any)}
                                                    required
                                                    classNames={inputStyles}
                                                />
                                            </div>
                                        </div>
                                        
                                        {message && (
                                            <div className={`text-sm p-3 rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                                {message.text}
                                            </div>
                                        )}

                                        <InteractiveHoverButton 
                                            type="submit"
                                            disabled={loading}
                                            text={loading ? "Processing..." : "Proceed to Payment"}
                                            className="w-full mt-4"
                                        />
                                    </form>
                                </div>

                                {/* Summary / Ticket Preview */}
                                <div className="bg-black/5 p-8 md:p-12 relative overflow-hidden">
                                     {/* Ticket Visual */}
                                     {currentPassDetails && (
                                        <div className="sticky top-8">
                                            <h3 className="text-black/40 font-bold uppercase tracking-widest text-xs mb-6">Booking Summary</h3>
                                            
                                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                                                {/* Header */}
                                                <div className="h-32 bg-black flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
                                                    <div className="text-center z-10">
                                                        <div className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-1">SMEC 2026</div>
                                                        <div className="text-white text-2xl font-display font-bold">{category?.toUpperCase()}</div>
                                                    </div>
                                                </div>
                                                
                                                {/* Dotted Divider */}
                                                <div className="relative h-8 -mt-4 bg-white">
                                                    <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#f2f2f2] -translate-x-1/2 -translate-y-1/2" />
                                                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#f2f2f2] translate-x-1/2 -translate-y-1/2" />
                                                    <div className="border-b-2 border-dashed border-black/10 mx-8 mt-4" />
                                                </div>

                                                {/* Content */}
                                                <div className="p-8 pt-0 space-y-6">
                                                    
                                                    <div className="space-y-1">
                                                        <p className="text-xs text-black/40 font-bold uppercase tracking-wider">Pass Type</p>
                                                        <p className="text-xl font-bold text-black">{currentPassDetails.name}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <div className="space-y-1">
                                                            <p className="text-xs text-black/40 font-bold uppercase tracking-wider">Date</p>
                                                            <div className="flex items-center gap-2 text-black/80 font-medium">
                                                                <Calendar className="w-4 h-4" /> 
                                                                <span>Jan 24-25, 2026</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1 text-right">
                                                            <p className="text-xs text-black/40 font-bold uppercase tracking-wider">Price</p>
                                                            <p className="text-xl font-bold text-rose">₹{currentPassDetails.price}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {formData.fullName && (
                                                        <div className="p-4 bg-black/5 rounded-xl flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black/50">
                                                                <User className="w-5 h-5" />
                                                            </div>
                                                            <div className="overflow-hidden">
                                                                <p className="text-xs text-black/40 font-bold uppercase">Attendee</p>
                                                                <p className="text-sm font-bold text-black truncate">{formData.fullName}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                                
                                                <div className="bg-black/5 p-4 text-center">
                                                    <p className="text-xs text-black/40">Includes {currentPassDetails.features.length} Premium Features</p>
                                                </div>
                                            </div>

                                            <div className="mt-8 text-center text-xs text-black/40 max-w-[200px] mx-auto">
                                                <p>By proceeding, you agree to our Terms of Service & Privacy Policy.</p>
                                            </div>
                                        </div>
                                     )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default RegisterForm;
