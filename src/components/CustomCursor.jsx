'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const trailRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        const trail = trailRef.current;
        if (!dot || !ring || !trail) return;

        let mouseX = -100;
        let mouseY = -100;

        // Smooth follow
        const moveCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
            // Ring follows with lag
            gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power3.out' });
            // Trail follows with more lag
            gsap.to(trail, { x: mouseX, y: mouseY, duration: 0.6, ease: 'power3.out' });
        };

        // Hover effects on interactive elements
        const handleEnter = (e) => {
            const tag = e.target.tagName;
            const isButton = tag === 'BUTTON' || tag === 'A' || e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-secondary') || e.target.classList.contains('navbar-cta');

            gsap.to(dot, { scale: 0.5, backgroundColor: '#ffffff', duration: 0.3 });
            gsap.to(ring, {
                scale: isButton ? 2.5 : 1.8,
                borderColor: 'rgba(178, 255, 0, 0.6)',
                backgroundColor: 'rgba(178, 255, 0, 0.06)',
                duration: 0.4,
                ease: 'back.out(1.5)',
            });
            gsap.to(trail, { scale: 2, opacity: 0.15, duration: 0.4 });
        };

        const handleLeave = () => {
            gsap.to(dot, { scale: 1, backgroundColor: '#b2ff00', duration: 0.3 });
            gsap.to(ring, {
                scale: 1,
                borderColor: 'rgba(178, 255, 0, 0.35)',
                backgroundColor: 'transparent',
                duration: 0.4,
                ease: 'power3.out',
            });
            gsap.to(trail, { scale: 1, opacity: 0.08, duration: 0.4 });
        };

        // Click effect
        const handleDown = () => {
            gsap.to(dot, { scale: 0.6, duration: 0.15 });
            gsap.to(ring, { scale: 0.8, borderWidth: '3px', duration: 0.15 });
        };

        const handleUp = () => {
            gsap.to(dot, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
            gsap.to(ring, { scale: 1, borderWidth: '1.5px', duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        };

        // Attach listeners
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        // Hover targets
        const interactives = document.querySelectorAll('a, button, .portfolio-card, .service-card, .navbar-cta, .btn-primary, .btn-secondary, input, [role="button"]');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', handleEnter);
            el.addEventListener('mouseleave', handleLeave);
        });

        // Re-bind on DOM changes (for dynamically rendered content)
        const observer = new MutationObserver(() => {
            const newInteractives = document.querySelectorAll('a, button, .portfolio-card, .service-card, .navbar-cta, .btn-primary, .btn-secondary, input, [role="button"]');
            newInteractives.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
                el.addEventListener('mouseenter', handleEnter);
                el.addEventListener('mouseleave', handleLeave);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Soft glow trail */}
            <div
                ref={trailRef}
                className="custom-cursor-trail"
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                className="custom-cursor-ring"
            />
            {/* Inner dot */}
            <div
                ref={dotRef}
                className="custom-cursor-dot"
            />
        </>
    );
}
