'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const games = [
    {
        title: 'Neon District',
        image: '/images/games/neon-district.jpg',
        description:
            'A cyberpunk open-world RPG where every asset is an NFT. Roam the rainy streets of Neo-Veridia, complete contracts, and build your syndicate empire.',
        stats: [
            { label: 'Active Players', value: '125,000+' },
            { label: 'Chain', value: 'Ethereum' },
            { label: 'Token', value: '$NEON' },
        ],
        status: 'Online',
        statusClass: 'online',
        accent: '#00ffcc',
    },
    {
        title: 'Mecha Genesis',
        image: '/images/games/mecha-genesis.jpg',
        description:
            'Tactical shooter featuring fully customizable mech warriors. Assemble your parts, tune your engines, and dominate the arena in fast-paced 5v5 combat.',
        stats: [
            { label: 'Pre-Registrations', value: '450,000' },
            { label: 'Chain', value: 'Solana' },
            { label: 'Token', value: '$MECH' },
        ],
        status: 'Beta',
        statusClass: 'beta',
        accent: '#ff6600',
    },
    {
        title: 'Void Horizon',
        image: '/images/games/void-horizon.jpg',
        description:
            '4X Space Strategy game. Explore the infinite procedural cosmos, establish colonies, and engage in massive fleet battles.',
        stats: [
            { label: 'Galaxies Minted', value: '8,400' },
            { label: 'Chain', value: 'Polygon' },
            { label: 'Token', value: '$VOID' },
        ],
        status: 'Alpha',
        statusClass: 'alpha',
        accent: '#7b4fff',
  gaming  },
    {
        title: 'Aether Racing',
        image: '/images/games/aether-racing.jpg',
        description:
            'High-octane anti-gravity racing. Stake tokens on races, modify your vehicle with NFT parts, and climb the global leaderboards.',
        stats: [
            { label: 'Daily Races', value: '24,000+' },
            { label: 'Chain', value: 'Avalanche' },
            { label: 'Token', value: '$FUEL' },
        ],
        status: 'Online',
        statusClass: 'online',
        accent: '#ff3366',
    },
    {
        title: 'Cipher City',
        image: '/images/games/cipher-city.jpg',
        description:
            'Social MMO where digital identity is everything. Buy land, build virtual businesses, and interact with thousands.',
        stats: [
            { label: 'Land Plots', value: '55% Sold' },
            { label: 'Chain', value: 'Ethereum' },
            { label: 'Token', value: '$CITY' },
        ],
        status: 'In Dev',
        statusClass: 'dev',
        accent: '#8e2de2',
    },
];

export default function PortfolioSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.fromTo(
                headerRef.current.children,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Per-card 3D scroll entrance
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // 3D rotate-in entrance
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 120,
                        rotateX: 20,
                        rotateY: index % 2 === 0 ? -10 : 10,
                        scale: 0.85,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 1.4,
                        delay: index * 0.1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 92%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Image parallax on scroll
                const img = card.querySelector('.card-img');
                if (img) {
                    gsap.fromTo(
                        img,
                        { y: -30, scale: 1.15 },
                        {
                            y: 30,
                            scale: 1.05,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.5,
                            },
                        }
                    );
                }

                // Floating overlay text parallax
                const overlay = card.querySelector('.card-overlay-title');
                if (overlay) {
                    gsap.fromTo(
                        overlay,
                        { y: 20 },
                        {
                            y: -20,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 2,
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ——— Hover: deep 3D tilt + layer separation ———
    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const px = (x - cx) / cx;
        const py = (y - cy) / cy;

        // Deep 3D card tilt
        gsap.to(card, {
            rotateX: py * -15,
            rotateY: px * 15,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
        });

        // Image shifts opposite for depth
        const img = card.querySelector('.card-img');
        if (img) {
            gsap.to(img, {
                x: px * -25,
                y: py * -20,
                scale: 1.12,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }

        // Overlay title shifts for depth
        const overlay = card.querySelector('.card-overlay-title');
        if (overlay) {
            gsap.to(overlay, {
                x: px * 15,
                y: py * 10,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }

        // Content shifts for layer separation
        const content = card.querySelector('.portfolio-card-content');
        if (content) {
            gsap.to(content, {
                x: px * 10,
                y: py * 6,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }

        // Cursor glow follows mouse
        const glow = card.querySelector('.card-cursor-glow');
        if (glow) {
            gsap.to(glow, {
                opacity: 1,
                x: x - 150,
                y: y - 150,
                duration: 0.3,
                overwrite: 'auto',
            });
        }
    };

    const handleMouseEnter = (index) => {
        const card = cardsRef.current[index];
        if (!card) return;
        gsap.to(card, {
            boxShadow: `0 35px 80px rgba(0,0,0,0.5), 0 0 60px ${games[index].accent}22`,
            borderColor: `${games[index].accent}55`,
            duration: 0.4,
        });
        const badge = card.querySelector('.status-badge');
        if (badge) gsap.to(badge, { scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
    };

    const handleMouseLeave = (index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        // Elastic snap-back on all layers
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            borderColor: 'rgba(255,255,255,0.06)',
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
        });

        const img = card.querySelector('.card-img');
        if (img) gsap.to(img, { x: 0, y: 0, scale: 1.05, duration: 0.7, ease: 'elastic.out(1, 0.5)' });

        const overlay = card.querySelector('.card-overlay-title');
        if (overlay) gsap.to(overlay, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });

        const content = card.querySelector('.portfolio-card-content');
        if (content) gsap.to(content, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });

        const glow = card.querySelector('.card-cursor-glow');
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });

        const badge = card.querySelector('.status-badge');
        if (badge) gsap.to(badge, { scale: 1, duration: 0.3 });
    };

    return (
        <section ref={sectionRef} className="portfolio-section" id="portfolio">
            <div className="container">
                <div ref={headerRef} className="portfolio-header">
                    <span className="section-label">Game Portfolio</span>
                    <h2>
                        Explore our <span className="gradient-text">flagship titles</span>
                        <br />
                        redefining the industry
                    </h2>
                    <p>
                        Each game pushes boundaries in blockchain gaming, delivering
                        unforgettable player experiences.
                    </p>
                </div>

                <div className="portfolio-grid">
                    {games.map((game, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="portfolio-card card-3d"
                            style={{
                                opacity: 0,
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {/* Cursor-follow glow */}
                            <div
                                className="card-cursor-glow"
                                style={{
                                    background: `radial-gradient(circle, ${game.accent}30 0%, transparent 70%)`,
                                }}
                            />

                            {/* Image section */}
                            <div className="portfolio-card-image">
                                <img
                                    className="card-img"
                                    src={game.image}
                                    alt={game.title}
                                />
                                {/* Bottom gradient fade */}
                                <div className="card-img-gradient" />
                                {/* Overlay title */}
                                <span className="card-overlay-title">{game.title}</span>
                                {/* Status badge */}
                                <span className={`status-badge ${game.statusClass}`}>
                                    {game.status}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="portfolio-card-content">
                                <h3>{game.title}</h3>
                                <p>{game.description}</p>
                                <div className="portfolio-stats">
                                    {game.stats.map((stat, i) => (
                                        <div key={i} className="portfolio-stat">
                                            <span className="stat-label">{stat.label}</span>
                                            <span className="stat-value" style={{ color: game.accent }}>
                                                {stat.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
