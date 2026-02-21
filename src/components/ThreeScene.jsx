'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
    const mesh = useRef();
    const mousePos = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            sizes[i] = Math.random() * 2 + 0.5;

            // Mix of green and white particles
            if (Math.random() > 0.7) {
                colors[i * 3] = 0.7;     // R - accent green
                colors[i * 3 + 1] = 1.0; // G
                colors[i * 3 + 2] = 0.0; // B
            } else {
                const v = 0.3 + Math.random() * 0.3;
                colors[i * 3] = v;
                colors[i * 3 + 1] = v;
                colors[i * 3 + 2] = v;
            }
        }

        return { positions, sizes, colors };
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.getElapsedTime();

        mesh.current.rotation.y = time * 0.03;
        mesh.current.rotation.x = Math.sin(time * 0.02) * 0.1;

        const positions = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.001;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function FloatingGeometry() {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.15;
        meshRef.current.rotation.y = time * 0.1;
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    });

    return (
        <mesh ref={meshRef} position={[3, 0, -2]}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial
                color="#b2ff00"
                wireframe
                transparent
                opacity={0.12}
            />
        </mesh>
    );
}

function FloatingGeometry2() {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.z = time * 0.12;
        meshRef.current.position.y = Math.cos(time * 0.4) * 0.2;
    });

    return (
        <mesh ref={meshRef} position={[-3.5, -1, -3]}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
                color="#00ff88"
                wireframe
                transparent
                opacity={0.08}
            />
        </mesh>
    );
}

function GlowRing() {
    const ringRef = useRef();

    useFrame((state) => {
        if (!ringRef.current) return;
        const time = state.clock.getElapsedTime();
        ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.2;
        ringRef.current.rotation.z = time * 0.08;
    });

    return (
        <mesh ref={ringRef} position={[0, 0, -4]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshBasicMaterial color="#b2ff00" transparent opacity={0.15} />
        </mesh>
    );
}

export default function ThreeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
        >
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.3} />
            <Particles count={1500} />
            <FloatingGeometry />
            <FloatingGeometry2 />
            <GlowRing />
        </Canvas>
    );
}
