

const Themes = () => {
    return (
        <section className="py-20 px-6 md:px-12" id="themes">
            <div className="mb-12">
                <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[03]</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>Key Themes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div 
                    className="p-8 rounded-xl transition-all hover:-translate-y-1"
                    style={{ 
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid rgba(7, 7, 7, 0.08)'
                    }}
                >
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Startup Theme</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Building, scaling, and commercializing startups from idea to global markets.</p>
                    <ul className="text-sm space-y-1 opacity-80 list-disc pl-4" style={{ color: 'var(--color-text-secondary)' }}>
                        <li>Ideation, Mindset & Leadership</li>
                        <li>Go-to-Market & Product-Market Fit</li>
                        <li>Fundraising, Investments & Scaling</li>
                        <li>Commercialization, Operations & Legal</li>
                        <li>Branding, Sales & Global Expansion</li>
                    </ul>
                </div>
                <div 
                    className="p-8 rounded-xl transition-all hover:-translate-y-1"
                    style={{ 
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid rgba(7, 7, 7, 0.08)'
                    }}
                >
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Deep Tech Theme</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Advancing frontier technologies that shape national and global innovation.</p>
                    <ul className="text-sm space-y-1 opacity-80 list-disc pl-4" style={{ color: 'var(--color-text-secondary)' }}>
                        <li>AI, Machine Learning & Data Centers</li>
                        <li>Quantum Technologies & Robotics</li>
                        <li>Space, Defence & Semiconductors</li>
                        <li>Biotechnology & Life Sciences</li>
                        <li>Clean Energy & Climate Technologies</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                {['Artificial Intelligence', 'Quantum Tech', 'Robotics', 'Space & Defence', 'Biotech', 'Clean Energy', 'Semiconductors', 'Advanced Materials', 'Smart Mobility'].map((tag, index) => (
                    <span 
                        key={index}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                        style={{ 
                            background: 'rgba(107, 91, 149, 0.1)',
                            color: 'var(--color-accent)',
                            border: '1px solid rgba(107, 91, 149, 0.2)'
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Themes;

