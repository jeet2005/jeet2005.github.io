import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CosmicRing({ radius = 5, tubeRadius = 0.02, color = '#6c63ff', speed = 0.3, tilt = 0 }) {
    const ringRef = useRef()

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.getElapsedTime() * speed
        }
    })

    return (
        <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
            <torusGeometry args={[radius, tubeRadius, 64, 200]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
    )
}

export function OrbitalRings() {
    return (
        <group>
            <CosmicRing radius={5} color="#6c63ff" speed={0.2} tilt={Math.PI * 0.3} />
            <CosmicRing radius={6.5} color="#00d4ff" speed={-0.15} tilt={Math.PI * 0.45} />
            <CosmicRing radius={8} color="#ff6b9d" speed={0.1} tilt={Math.PI * 0.6} />
        </group>
    )
}
