import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, geometry, color, speed = 1, distort = 0.3, scale = 1 }) {
    const mesh = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (mesh.current) {
            mesh.current.rotation.x = time * 0.15 * speed
            mesh.current.rotation.y = time * 0.2 * speed
        }
    })

    return (
        <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={mesh} position={position} scale={scale}>
                {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
                {geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
                {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
                {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
                {geometry === 'cone' && <coneGeometry args={[0.8, 1.5, 4]} />}
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    distort={distort}
                    speed={2}
                    roughness={0}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    )
}

export default function FloatingGeometry() {
    const shapes = useMemo(() => [
        { position: [-6, 3, -5], geometry: 'icosahedron', color: '#6c63ff', speed: 0.8, scale: 1.5 },
        { position: [7, -2, -8], geometry: 'octahedron', color: '#00d4ff', speed: 1.2, scale: 1.2 },
        { position: [-4, -4, -6], geometry: 'torus', color: '#ff6b9d', speed: 0.6, scale: 1 },
        { position: [5, 4, -10], geometry: 'torusKnot', color: '#6c63ff', speed: 0.9, scale: 0.8 },
        { position: [0, -6, -7], geometry: 'dodecahedron', color: '#00d4ff', speed: 1, scale: 1.3 },
        { position: [-8, 0, -9], geometry: 'cone', color: '#ff6b9d', speed: 0.7, scale: 1.1 },
    ], [])

    return (
        <group>
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}
        </group>
    )
}
