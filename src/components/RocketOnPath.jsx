import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RocketOnPath({ scrollProgress = 0 }) {
    const groupRef = useRef()
    const exhaustRef = useRef()
    const exhaustLight = useRef()

    // Define the flight path — a sweeping 3D curve the rocket follows
    const { curve, totalLength } = useMemo(() => {
        const points = [
            new THREE.Vector3(0, -10, 0),       // Below screen (pre-launch)
            new THREE.Vector3(0, -2, 0),        // Rising
            new THREE.Vector3(0, 2, 0),         // Center screen (launch!)
            new THREE.Vector3(2, 5, -2),        // Banking right (about)
            new THREE.Vector3(-1.5, 7, -3),     // Leveling left
            new THREE.Vector3(-3, 5, -1),       // Skills approach
            new THREE.Vector3(3, 8, -4),        // Wide right bank
            new THREE.Vector3(-2, 6, -2),       // Through projects
            new THREE.Vector3(1, 9, -5),        // Deep space
            new THREE.Vector3(-1, 7, -3),       // Approaching contact
            new THREE.Vector3(0, 5, -1),        // Settling into orbit
            new THREE.Vector3(0, 3, 0),         // Final position
        ]

        const c = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
        return { curve: c, totalLength: c.getLength() }
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return

        // Clamp scroll progress
        const t = Math.max(0, Math.min(1, scrollProgress))

        // Get position on curve
        const position = curve.getPointAt(t)
        groupRef.current.position.copy(position)

        // Get direction to look ahead  
        const lookAhead = Math.min(t + 0.02, 1)
        const nextPoint = curve.getPointAt(lookAhead)
        const direction = nextPoint.clone().sub(position).normalize()

        // Create a quaternion that aligns the rocket with the travel direction
        const up = new THREE.Vector3(0, 1, 0)
        const quaternion = new THREE.Quaternion()
        const matrix = new THREE.Matrix4()

        if (direction.length() > 0.001) {
            matrix.lookAt(position, nextPoint, up)
            quaternion.setFromRotationMatrix(matrix)
            // Rotate 90 deg so the rocket nose points forward
            const adjustment = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))
            quaternion.multiply(adjustment)
            groupRef.current.quaternion.slerp(quaternion, 0.1)
        }

        // Subtle oscillation for life-like feel
        const time = state.clock.getElapsedTime()
        groupRef.current.position.x += Math.sin(time * 1.5) * 0.03
        groupRef.current.position.z += Math.cos(time * 1.2) * 0.02

        // Engine glow — brighter during 'acceleration' phases
        const speed = t < 0.15 ? t / 0.15 : 1  // Ramp up during launch
        if (exhaustRef.current) {
            exhaustRef.current.material.opacity = 0.3 + speed * 0.5
            exhaustRef.current.scale.setScalar(0.8 + Math.sin(time * 8) * 0.15)
        }
        if (exhaustLight.current) {
            exhaustLight.current.intensity = 1 + speed * 3
        }
    })

    return (
        <group ref={groupRef}>
            {/* === Rocket Body === */}
            <mesh>
                <cylinderGeometry args={[0.12, 0.2, 1.4, 16]} />
                <meshStandardMaterial color="#0a1535" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Nose cone */}
            <mesh position={[0, 0.95, 0]}>
                <coneGeometry args={[0.12, 0.5, 16]} />
                <meshStandardMaterial color="#7c5cff" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Nose tip glow */}
            <mesh position={[0, 1.22, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
            </mesh>
            <pointLight position={[0, 1.22, 0]} color="#00e5ff" intensity={1} distance={2} />

            {/* Body ring detail */}
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.145, 0.015, 8, 32]} />
                <meshStandardMaterial color="#00e5ff" metalness={0.8} roughness={0.2} emissive="#00e5ff" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
                <torusGeometry args={[0.175, 0.012, 8, 32]} />
                <meshStandardMaterial color="#7c5cff" metalness={0.8} roughness={0.2} emissive="#7c5cff" emissiveIntensity={0.2} />
            </mesh>

            {/* Window / Porthole */}
            <mesh position={[0, 0.5, 0.14]}>
                <circleGeometry args={[0.06, 16]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} />
            </mesh>

            {/* Engine nozzle */}
            <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.24, 0.12, 0.25, 16]} />
                <meshStandardMaterial color="#0a0a2a" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Fins — 4 around the base */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(angle) * 0.2,
                        -0.55,
                        Math.cos(angle) * 0.2,
                    ]}
                    rotation={[0, angle, Math.PI / 7]}
                >
                    <boxGeometry args={[0.015, 0.4, 0.22]} />
                    <meshStandardMaterial color="#7c5cff" metalness={0.85} roughness={0.15} />
                </mesh>
            ))}

            {/* === Exhaust / Thrust Flame === */}
            <group position={[0, -1.15, 0]}>
                {/* Inner flame (bright) */}
                <mesh ref={exhaustRef}>
                    <coneGeometry args={[0.15, 0.8, 12]} />
                    <meshBasicMaterial
                        color="#00e5ff"
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Outer flame (wider, dimmer) */}
                <mesh scale={[1.4, 1.2, 1.4]}>
                    <coneGeometry args={[0.15, 0.8, 12]} />
                    <meshBasicMaterial
                        color="#7c5cff"
                        transparent
                        opacity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <pointLight ref={exhaustLight} color="#00e5ff" intensity={2} distance={5} />
            </group>
        </group>
    )
}
