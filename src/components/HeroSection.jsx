'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function HeroSection() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const scrollRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title line reveal animation
            const lines = titleRef.current.querySelectorAll('.line-inner');
            const tl = gsap.timeline({ delay: 0.8 });

            tl.to(lines, {
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.15,
            })
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.5'
                )
                .to(
                    buttonsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                )
                .to(
                    scrollRef.current,
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    '-=0.2'
                );

            // Floating orbs animation
            gsap.to(orb1Ref.current, {
                x: 30,
                y: -20,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to(orb2Ref.current, {
                x: -25,
                y: 15,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to(orb3Ref.current, {
                x: 20,
                y: -30,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero" id="hero">
            <div className="hero-canvas">
                <ThreeScene />
            </div>

            {/* Floating glowing orbs */}
            <div ref={orb1Ref} className="hero-orb hero-orb-1"></div>
            <div ref={orb2Ref} className="hero-orb hero-orb-2"></div>
            <div ref={orb3Ref} className="hero-orb hero-orb-3"></div>

            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                    Web3 Gaming Studio — Now Live
                </div>

                <h1 ref={titleRef} className="hero-title">
                    <span className="line">
                        <span className="line-inner">DIGITAL</span>
                    </span>
                    <span className="line">
                        <span className="line-inner accent">REALITY</span>
                    </span>
                    <span className="line">
                        <span className="line-inner outline-text">STUDIO</span>
                    </span>
                </h1>

                <p ref={subtitleRef} className="hero-subtitle" style={{ transform: 'translateY(20px)' }}>
                    Forging immersive blockchain experiences. Where high-fidelity 3D assets
                    meet sustainable tokenomics in a seamless metaverse.
                </p>

                <div ref={buttonsRef} className="hero-buttons" style={{ transform: 'translateY(20px)' }}>
                    <button className="btn-primary">
                        <span>Enter Metaverse</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="btn-secondary">
                        <span>View Whitepaper</span>
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="hero-scroll-indicator">
                <div className="scroll-line"></div>
                <span className="scroll-text">Scroll</span>
            </div>
        </section>
    );
}
