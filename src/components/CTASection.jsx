'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const sectionRef = useRef(null);
    const heading1Ref = useRef(null);
    const heading2Ref = useRef(null);
    const descRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo(
                heading1Ref.current,
                { y: 80, opacity: 0, skewY: 3 },
                { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power4.out' }
            )
                .fromTo(
                    heading2Ref.current,
                    { y: 80, opacity: 0, skewY: 3 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power4.out' },
                    '-=0.7'
                )
                .fromTo(
                    descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
                    '-=0.5'
                )
                .to(
                    buttonRef.current,
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Magnetic button effect
    const handleMouseMove = (e) => {
        const btn = buttonRef.current?.querySelector('.btn-primary');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        const btn = buttonRef.current?.querySelector('.btn-primary');
        if (!btn) return;
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <section ref={sectionRef} className="cta-section" id="contact">
            <div className="cta-content">
                <span className="section-label">Ready to Build?</span>
                <h2>
                    <span ref={heading1Ref} style={{ display: 'block', opacity: 0 }}>
                        LET'S JOIN
                    </span>
                    <span
                        ref={heading2Ref}
                        className="accent-line"
                        style={{ display: 'block', opacity: 0 }}
                    >
                        FORCES
                    </span>
                </h2>
                <p ref={descRef} style={{ opacity: 0 }}>
                    As long as there&apos;s room to turn things up a notch, we&apos;re in.
                    Connect your wallet and enter the metaverse.
                </p>
                <div
                    ref={buttonRef}
                    className="cta-button-wrapper"
                    style={{ transform: 'translateY(20px)' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="btn-primary">
                        <span>Get in Touch</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
