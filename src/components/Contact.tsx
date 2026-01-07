import { useState } from 'react';
import FloatingDecor from './ui/FloatingDecor';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, subscribing, success

    const [contactForm, setContactForm] = useState({
        'entry.1331908454': '', // Name
        'entry.299383262': '',  // Email
        'entry.1599555423': '', // Phone
        'entry.1708222522': '', // Subject
        'entry.1480851550': ''  // Message
    });
    const [contactStatus, setContactStatus] = useState('idle'); // idle, sending, success

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleContactSubmit = () => {
        setContactStatus('sending');
        setTimeout(() => {
            setContactStatus('success');
            setContactForm({
                'entry.1331908454': '',
                'entry.299383262': '',
                'entry.1599555423': '',
                'entry.1708222522': '',
                'entry.1480851550': ''
            });
            setTimeout(() => setContactStatus('idle'), 3000);
        }, 1500);
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('subscribing');

        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('idle');
                alert('Failed to send email. Please try again.');
            }
        } catch (error) {
            setStatus('idle');
            alert('Server unavailable. Please ensure the backend is running.');
        }
    };

    const inputStyle = {
        background: 'white',
        border: '1px solid rgba(7, 7, 7, 0.1)',
        color: 'var(--color-text-primary)'
    };

    const cardStyle = {
        background: 'var(--color-bg-secondary)',
        border: '1px solid rgba(7, 7, 7, 0.08)'
    };

    return (
        <section className="py-20 px-6 md:px-12 relative overflow-hidden" id="contact">
            {/* Background Decor */}
            <FloatingDecor type="emoji" content="📨" position="top-20 right-[5%]" size="text-5xl" delay={0.5} rotate={10} />
            <FloatingDecor type="shape" content="square" position="bottom-40 -left-10" color="bg-accent/10" size="w-32 h-32" delay={3} rotate={45} />

            <div className="mb-12 relative z-10">
                <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[05]</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>Get In Touch</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Info & Organizers */}
                <div className="flex flex-col gap-6">
                    <div className="p-6 rounded-xl" style={cardStyle}>
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Contact Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📞</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>+91 8885155552</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">✉️</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>info@globalinnovatorsconclave.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">🌐</span>
                                <a 
                                    href="https://globalinnovatorsconclave.in/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    www.globalinnovatorsconclave.in
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl" style={cardStyle}>
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Organizing Committee</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Prof. Dr. K. Ravindra', role: 'Chair - Global Innovators Conclave' },
                                { name: 'Dr. Gowtham Mamidisetti', role: 'Convener - Global Innovators Conclave' },
                                { name: 'M. Malavika', role: 'Faculty Coordinator' },
                                { name: 'G. Gnana Abi Sathwik', role: 'Student Coordinator' }
                            ].map((person, index) => (
                                <div key={index}>
                                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{person.name}</p>
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{person.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="p-6 rounded-xl" style={cardStyle}>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>Register To Get Notified</h3>
                    <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>Send us a Message</p>
                    <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>
                    <form
                        className="flex flex-col gap-4"
                        action="https://docs.google.com/forms/d/e/1FAIpQLSeKv9ovZxQ6gTVaV6UxcFyrVuOeLlYzBVZaEw7trLSwrj7Xnw/formResponse"
                        method="POST"
                        target="hidden_iframe"
                        onSubmit={handleContactSubmit}
                    >
                        <input
                            type="text"
                            name="entry.1331908454"
                            placeholder="Your Name"
                            required
                            value={contactForm['entry.1331908454']}
                            onChange={handleContactChange}
                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
                            style={inputStyle}
                        />
                        <input
                            type="email"
                            name="entry.299383262"
                            placeholder="Your Email"
                            required
                            value={contactForm['entry.299383262']}
                            onChange={handleContactChange}
                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
                            style={inputStyle}
                        />
                        <input
                            type="tel"
                            name="entry.1599555423"
                            placeholder="Phone Number"
                            required
                            value={contactForm['entry.1599555423']}
                            onChange={handleContactChange}
                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="entry.1708222522"
                            placeholder="Subject"
                            required
                            value={contactForm['entry.1708222522']}
                            onChange={handleContactChange}
                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
                            style={inputStyle}
                        />
                        <textarea
                            name="entry.1480851550"
                            placeholder="Your Message"
                            rows={4}
                            required
                            value={contactForm['entry.1480851550']}
                            onChange={handleContactChange}
                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors resize-none"
                            style={inputStyle}
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg text-white font-medium transition-all"
                            disabled={contactStatus === 'sending'}
                            style={{ 
                                background: contactStatus === 'success' ? '#27ae60' : 'var(--color-accent)'
                            }}
                        >
                            {contactStatus === 'idle' && 'Send Message'}
                            {contactStatus === 'sending' && 'Sending...'}
                            {contactStatus === 'success' && '✓ Message Sent!'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom: Newsletter */}
            <div className="mt-8 p-8 rounded-xl text-center" style={cardStyle}>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Get Event Details</h3>
                <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>Subscribe to be the first to know when registration opens</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 rounded-lg px-4 py-3 focus:outline-none"
                        style={inputStyle}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-lg text-white font-medium transition-all"
                        disabled={status === 'subscribing'}
                        style={{ 
                            background: status === 'success' ? '#27ae60' : 'var(--color-accent)'
                        }}
                    >
                        {status === 'idle' && 'Notify Me'}
                        {status === 'subscribing' && 'Subscribing...'}
                        {status === 'success' && '✓ Subscribed!'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;

