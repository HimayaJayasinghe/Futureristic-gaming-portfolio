'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
    'Avalanche', 'Ethereum', 'Polygon', 'Solana', 'Immutable X',
    'OpenSea', 'Chainlink', 'Ubisoft', 'Epic Games', 'Unity',
    'MetaMask', 'WalletConnect',
];

export default function PartnersSection() {
    const trackRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Duplicate for seamless loop
        const content = track.innerHTML;
        track.innerHTML = content + content;

        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
            },
        });

        // Section title animation
        const title = sectionRef.current?.querySelector('h2');
        const subtitle = sectionRef.current?.querySelector('p');
        if (title) {
            gsap.fromTo(
                [title, subtitle],
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} className="partners-section" id="partners">
            <div className="container">
                <span className="section-label">Trusted Network</span>
                <h2>
                    We partner with <span className="gradient-text">industry leaders</span>
                </h2>
                <p>Their trust in our capabilities makes us super proud.</p>
            </div>

            <div className="partners-marquee">
                <div ref={trackRef} className="partners-track">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-logo">
                            {partner}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
