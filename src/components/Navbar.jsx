'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Entrance animation
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
        );

        // Scroll handler
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrolled(currentScroll > 80);

            if (currentScroll > lastScroll && currentScroll > 400) {
                gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.in' });
            } else {
                gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
            }
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <a href="#" className="navbar-logo">
                <span className="logo-dot"></span>
                NEXUS
            </a>

            <div className="navbar-links">
                <a href="#services">Services</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#partners">Partners</a>
                <a href="#contact">Contact</a>
            </div>

            <button className="navbar-cta">Connect Wallet</button>

            <button className="menu-toggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}
