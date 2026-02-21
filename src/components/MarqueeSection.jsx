'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MarqueeSection() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Clone items for seamless loop
        const items = track.innerHTML;
        track.innerHTML = items + items;

        // Infinite scroll animation
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 25,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
            },
        });
    }, []);

    return (
        <section className="marquee-section">
            <div ref={trackRef} className="marquee-track">
                <span className="marquee-item filled">
                    Enter the Game <span className="separator"></span>
                </span>
                <span className="marquee-item outlined">
                    Web3 Gaming <span className="separator"></span>
                </span>
                <span className="marquee-item filled">
                    Play to Earn <span className="separator"></span>
                </span>
                <span className="marquee-item outlined">
                    NFT Assets <span className="separator"></span>
                </span>
                <span className="marquee-item filled">
                    Metaverse <span className="separator"></span>
                </span>
                <span className="marquee-item outlined">
                    Blockchain <span className="separator"></span>
                </span>
            </div>
        </section>
    );
}
