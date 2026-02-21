'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: '🎮',
        title: 'Game Design',
        description:
            'End-to-end game development using Unreal Engine 5. We craft high-fidelity worlds with engaging loops and balanced economy systems.',
        features: ['Level Design & Environment', 'Character Modeling', 'Physics & Mechanics'],
    },
    {
        icon: '⛓️',
        title: 'Web3 Integration',
        description:
            'Seamless blockchain implementation. Smart contracts, wallet integration, and on-chain asset ownership infrastructure.',
        features: ['Smart Contract Audits', 'Tokenomics Strategy', 'Cross-chain Bridges'],
    },
    {
        icon: '🥽',
        title: 'XR Experiences',
        description:
            'Pushing boundaries with Extended Reality. VR/AR integration for truly immersive metaverse interactions.',
        features: ['VR Optimization', 'AR Mobile Layers', 'Haptic Feedback'],
    },
];

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
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

            // Cards stagger animation
            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="services-section" id="services">
            <div className="container">
                <div ref={headerRef} className="services-header">
                    <span className="section-label">Core Services</span>
                    <h2>
                        Comprehensive blockchain development
                        <br />
                        solutions powering the <span className="gradient-text">next generation</span>
                    </h2>
                    <p>
                        From concept to launch, we deliver everything needed to build and scale
                        your Web3 gaming ecosystem.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="service-card"
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
