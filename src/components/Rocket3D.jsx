import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Rocket3D({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], color = '#00e5ff' }) {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003
            groupRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.002
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
                {/* Rocket body — elongated cylinder */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.25, 1.8, 16]} />
                    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Nose cone */}
                <mesh position={[0, 1.15, 0]}>
                    <coneGeometry args={[0.15, 0.5, 16]} />
                    <meshStandardMaterial color="#7c5cff" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Engine nozzle */}
                <mesh position={[0, -1.1, 0]}>
                    <cylinderGeometry args={[0.3, 0.15, 0.3, 16]} />
                    <meshStandardMaterial color="#1a1a3a" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Fins */}
                {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(angle) * 0.25,
                            -0.7,
                            Math.cos(angle) * 0.25,
                        ]}
                        rotation={[0, angle, Math.PI / 6]}
                    >
                        <boxGeometry args={[0.02, 0.5, 0.3]} />
                        <meshStandardMaterial color="#7c5cff" metalness={0.8} roughness={0.2} />
                    </mesh>
                ))}

                {/* Engine glow */}
                <mesh position={[0, -1.3, 0]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
                </mesh>
                <pointLight position={[0, -1.4, 0]} color="#00e5ff" intensity={2} distance={3} />

                {/* Window */}
                <mesh position={[0, 0.45, 0.17]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
                </mesh>
            </group>
        </Float>
    )
}
