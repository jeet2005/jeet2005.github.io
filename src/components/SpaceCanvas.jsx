import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import RocketOnPath from './RocketOnPath'
import ParticleField from './ParticleField'
import CentralSphere from './CentralSphere'
import Satellite3D from './Satellite3D'
import * as THREE from 'three'

function CameraRig({ scrollProgress }) {
    const { camera } = useThree()

    useEffect(() => {
        const t = scrollProgress
        camera.position.x = Math.sin(t * Math.PI * 0.5) * 0.8
        camera.position.y = t * 2
        camera.lookAt(0, t * 3, -2)
    }, [scrollProgress, camera])

    return null
}

function NebulaGlow({ position, color, size = 3 }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.015} side={THREE.BackSide} />
        </mesh>
    )
}

export default function SpaceCanvas({ scrollProgress }) {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
        }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 55 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                style={{ pointerEvents: 'auto' }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.15} />
                    <directionalLight position={[5, 8, 5]} intensity={0.4} color="#7c5cff" />
                    <pointLight position={[-8, 4, 3]} intensity={0.3} color="#00e5ff" />
                    <pointLight position={[6, -4, -5]} intensity={0.2} color="#ff2d8a" />

                    {/* Interactive stars — scatter on mouse, spring back */}
                    <ParticleField count={2500} />

                    {/* The blue jelly sphere — back in the center */}
                    <CentralSphere />

                    {/* The rocket following the path */}
                    <RocketOnPath scrollProgress={scrollProgress} />

                    {/* Scattered satellites */}
                    <Satellite3D position={[6, 4, -8]} scale={0.25} />
                    <Satellite3D position={[-7, 8, -10]} scale={0.2} />
                    <Satellite3D position={[4, -3, -12]} scale={0.15} />

                    {/* Nebula glow */}
                    <NebulaGlow position={[0, 2, -3]} color="#7c5cff" size={4} />
                    <NebulaGlow position={[-2, 7, -4]} color="#00e5ff" size={5} />

                    {/* Camera follows scroll */}
                    <CameraRig scrollProgress={scrollProgress} />

                    <fog attach="fog" args={['#000005', 15, 40]} />
                </Suspense>
            </Canvas>
        </div>
    )
}
