import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* Small satellite / space debris for background variety */
export default function Satellite3D({ position = [0, 0, 0], scale = 1 }) {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.005
            groupRef.current.rotation.z += 0.008
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
            <group ref={groupRef} position={position} scale={scale}>
                {/* Satellite body */}
                <mesh>
                    <boxGeometry args={[0.4, 0.4, 0.6]} />
                    <meshStandardMaterial color="#0a1535" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* Solar panel left */}
                <mesh position={[-0.8, 0, 0]}>
                    <boxGeometry args={[0.8, 0.02, 0.5]} />
                    <meshStandardMaterial color="#00347a" metalness={0.6} roughness={0.3} emissive="#002255" emissiveIntensity={0.3} />
                </mesh>

                {/* Solar panel right */}
                <mesh position={[0.8, 0, 0]}>
                    <boxGeometry args={[0.8, 0.02, 0.5]} />
                    <meshStandardMaterial color="#00347a" metalness={0.6} roughness={0.3} emissive="#002255" emissiveIntensity={0.3} />
                </mesh>

                {/* Antenna */}
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
                    <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Antenna tip */}
                <mesh position={[0, 0.52, 0]}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
                </mesh>
                <pointLight position={[0, 0.52, 0]} color="#00e5ff" intensity={0.5} distance={1.5} />
            </group>
        </Float>
    )
}
