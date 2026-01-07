import React from 'react';

const Footer = () => {

    return (
        <footer className="footer bg-gray-50 pt-16 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <span className="font-bold text-xl md:text-2xl tracking-tight text-gray-900">SMEC Conclave</span>
                            <span className="text-sm text-gray-500 font-medium">Rising Minds For Global Impact</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            The Global Innovators Conclave is a premier platform for students, startups, and investors to connect, innovate, and scale.
                        </p>
                         <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {['twitter', 'linkedin', 'instagram', 'youtube'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</a></li>
                            <li><a href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a></li>
                            <li><a href="/passes" className="text-gray-600 hover:text-purple-600 transition-colors">Get Passes</a></li>
                            <li><a href="/accommodation" className="text-gray-600 hover:text-purple-600 transition-colors">Accommodation</a></li>
                            <li><a href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Programs</h4>
                        <ul className="space-y-4">
                            <li><a href="#structure" className="text-gray-600 hover:text-purple-600 transition-colors">Knowledge Hub</a></li>
                            <li><a href="#structure" className="text-gray-600 hover:text-purple-600 transition-colors">Alpha to Infiniti</a></li>
                            <li><a href="#structure" className="text-gray-600 hover:text-purple-600 transition-colors">BusiTech Expo</a></li>
                            <li><a href="#structure" className="text-gray-600 hover:text-purple-600 transition-colors">InnoVestors Bootcamp</a></li>
                            <li><a href="#structure" className="text-gray-600 hover:text-purple-600 transition-colors">Innovation Lab</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <span className="mt-1 text-purple-600">📍</span>
                                <span className="text-gray-600 text-sm">St. Martin's Engineering College, Dhulapally, Secunderabad, Telangana 500100</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-purple-600">📧</span>
                                <a href="mailto:gic@smec.ac.in" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">gic@smec.ac.in</a>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-purple-600">📞</span>
                                <span className="text-gray-600 text-sm">+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; 2026 St. Martin's Engineering College. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );

};

export default Footer;
