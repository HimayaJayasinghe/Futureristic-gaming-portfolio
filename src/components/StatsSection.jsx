'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 2400000, suffix: '+', prefix: '', label: 'Total Battles', display: '2.4M' },
    { value: 85000, suffix: '', prefix: '', label: 'NFTs Minted', display: '85,000' },
    { value: 120, suffix: 'M', prefix: '$', label: 'Volume Traded', display: '120' },
    { value: 45, suffix: '', prefix: '', label: 'Tournaments Hosted', display: '45' },
];

function AnimatedCounter({ value, prefix, suffix, display }) {
    const numberRef = useRef(null);

    useEffect(() => {
        const el = numberRef.current;
        if (!el) return;

        const obj = { val: 0 };
        const target = parseFloat(display.replace(/,/g, ''));

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        let formatted;
                        if (target >= 1000) {
                            formatted = Math.floor(obj.val).toLocaleString();
                        } else if (target >= 100) {
                            formatted = Math.floor(obj.val).toString();
                        } else {
                            formatted = Math.floor(obj.val).toString();
                        }
                        el.textContent = `${prefix}${formatted}${suffix}`;
                    },
                });
            },
            once: true,
        });
    }, [value, prefix, suffix, display]);

    return (
        <span ref={numberRef} className="stat-number">
            {prefix}0{suffix}
        </span>
    );
}

export default function StatsSection() {
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                if (!item) return;
                gsap.to(item, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="stats-section">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        ref={(el) => (itemsRef.current[index] = el)}
                        className="stat-item"
                    >
                        <AnimatedCounter
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            display={stat.display}
                        />
                        <div className="stat-label-text">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
