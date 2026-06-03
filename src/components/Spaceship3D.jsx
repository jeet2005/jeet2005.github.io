import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Spaceship3D({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004
            groupRef.current.position.x += Math.sin(state.clock.getElapsedTime() * 0.3) * 0.003
        }
    })

    return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
            <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
                {/* Main fuselage — flattened ellipsoid */}
                <mesh>
                    <sphereGeometry args={[1, 32, 16]} />
                    <meshStandardMaterial color="#0d1b4a" metalness={0.9} roughness={0.15} />
                    <mesh scale={[1.8, 0.3, 1]}>
                        <sphereGeometry args={[1, 32, 16]} />
                        <meshStandardMaterial color="#0a1535" metalness={0.9} roughness={0.2} />
                    </mesh>
                </mesh>

                {/* Cockpit dome */}
                <mesh position={[0, 0.25, 0.3]}>
                    <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#00e5ff" transparent opacity={0.3} metalness={0.2} roughness={0.1} />
                </mesh>

                {/* Wings — left */}
                <mesh position={[-1.5, -0.05, 0]} rotation={[0, 0, -0.1]}>
                    <boxGeometry args={[1.2, 0.04, 0.6]} />
                    <meshStandardMaterial color="#7c5cff" metalness={0.85} roughness={0.15} />
                </mesh>

                {/* Wings — right */}
                <mesh position={[1.5, -0.05, 0]} rotation={[0, 0, 0.1]}>
                    <boxGeometry args={[1.2, 0.04, 0.6]} />
                    <meshStandardMaterial color="#7c5cff" metalness={0.85} roughness={0.15} />
                </mesh>

                {/* Engine pods — left */}
                <mesh position={[-1.2, -0.1, -0.3]}>
                    <cylinderGeometry args={[0.1, 0.15, 0.5, 12]} />
                    <meshStandardMaterial color="#1a1a3a" metalness={0.7} roughness={0.3} />
                </mesh>
                <pointLight position={[-1.2, -0.4, -0.3]} color="#00e5ff" intensity={1} distance={2} />

                {/* Engine pods — right */}
                <mesh position={[1.2, -0.1, -0.3]}>
                    <cylinderGeometry args={[0.1, 0.15, 0.5, 12]} />
                    <meshStandardMaterial color="#1a1a3a" metalness={0.7} roughness={0.3} />
                </mesh>
                <pointLight position={[1.2, -0.4, -0.3]} color="#00e5ff" intensity={1} distance={2} />

                {/* Tail fin */}
                <mesh position={[0, 0.3, -0.8]} rotation={[0.3, 0, 0]}>
                    <boxGeometry args={[0.04, 0.5, 0.3]} />
                    <meshStandardMaterial color="#7c5cff" metalness={0.85} roughness={0.15} />
                </mesh>

                {/* Cockpit glow */}
                <mesh position={[0, 0.15, 0.35]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
                </mesh>
            </group>
        </Float>
    )
}
