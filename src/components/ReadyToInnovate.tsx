import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadyToInnovate = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 -z-10"></div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
                    Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Innovate?</span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join thousands of students, innovators, and industry leaders at the largest innovation conclave of the year.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                    >
                        Register Now
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                    
                    <button 
                         onClick={() => navigate('/passes')}
                        className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    >
                        View Passes
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReadyToInnovate;
