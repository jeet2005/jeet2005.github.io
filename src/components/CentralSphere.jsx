import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function CentralSphere() {
    const sphereRef = useRef()
    const glowRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (sphereRef.current) {
            sphereRef.current.rotation.y = time * 0.1
            sphereRef.current.rotation.x = time * 0.05
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
            <group>
                {/* Main distorted sphere */}
                <mesh ref={sphereRef}>
                    <sphereGeometry args={[2.2, 64, 64]} />
                    <MeshDistortMaterial
                        color="#1a1040"
                        emissive="#6c63ff"
                        emissiveIntensity={0.15}
                        roughness={0.2}
                        metalness={0.9}
                        distort={0.35}
                        speed={2}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
                {/* Glow sphere */}
                <mesh ref={glowRef} scale={2.5}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color="#6c63ff"
                        transparent
                        opacity={0.03}
                        side={THREE.BackSide}
                    />
                </mesh>
            </group>
        </Float>
    )
}
