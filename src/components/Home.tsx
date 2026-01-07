import React, { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Pillars from './Pillars';
import Themes from './Themes';
import Structure from './Structure';
import Contact from './Contact';
import TrustedBy from './TrustedBy';
import ReadyToInnovate from './ReadyToInnovate';

const Home: React.FC = () => {
    useEffect(() => {
        // re-trigger initial animations if needed when navigating back
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => el.classList.add('fade-init'));
    }, []);

    return (
        <>
            <Hero />
            <TrustedBy />
            <About />
            <Pillars />
            <Themes />
            <Structure />
            {/* Agenda removed from here as it has its own page now */}
            <ReadyToInnovate />
            <Contact />
        </>
    );
};

export default Home;
