import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 2500 }) {
    const mesh = useRef()
    const mouseRef = useRef(new THREE.Vector3(0, 0, 0))
    const { viewport, camera } = useThree()

    const { originalPositions, positions, colors, velocities } = useMemo(() => {
        const origPos = new Float32Array(count * 3)
        const pos = new Float32Array(count * 3)
        const cols = new Float32Array(count * 3)
        const vels = new Float32Array(count * 3) // velocity for scatter effect

        const colorPalette = [
            new THREE.Color('#7c5cff'),
            new THREE.Color('#00e5ff'),
            new THREE.Color('#ff2d8a'),
            new THREE.Color('#ffffff'),
        ]

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const radius = 10 + Math.random() * 30
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)

            origPos[i3] = x
            origPos[i3 + 1] = y
            origPos[i3 + 2] = z
            pos[i3] = x
            pos[i3 + 1] = y
            pos[i3 + 2] = z

            vels[i3] = 0
            vels[i3 + 1] = 0
            vels[i3 + 2] = 0

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            cols[i3] = color.r
            cols[i3 + 1] = color.g
            cols[i3 + 2] = color.b
        }

        return { originalPositions: origPos, positions: pos, colors: cols, velocities: vels }
    }, [count])

    // Track mouse in 3D space
    useEffect(() => {
        const handleMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1
            // Project to 3D world at z=0
            mouseRef.current.set(
                x * viewport.width / 2,
                y * viewport.height / 2,
                0
            )
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [viewport])

    useFrame((state) => {
        if (!mesh.current) return

        const posArray = mesh.current.geometry.attributes.position.array
        const mouse = mouseRef.current
        const repelRadius = 3.5  // how close mouse needs to be
        const repelStrength = 0.8
        const returnSpeed = 0.02  // spring-back speed

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            // Current position
            const px = posArray[i3]
            const py = posArray[i3 + 1]
            const pz = posArray[i3 + 2]

            // Distance to mouse (in XY plane)
            const dx = px - mouse.x
            const dy = py - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < repelRadius && dist > 0.01) {
                // Repel away from mouse
                const force = (1 - dist / repelRadius) * repelStrength
                velocities[i3] += (dx / dist) * force
                velocities[i3 + 1] += (dy / dist) * force
                velocities[i3 + 2] += (Math.random() - 0.5) * force * 0.3
            }

            // Apply velocity
            posArray[i3] += velocities[i3]
            posArray[i3 + 1] += velocities[i3 + 1]
            posArray[i3 + 2] += velocities[i3 + 2]

            // Spring back to original position
            posArray[i3] += (originalPositions[i3] - posArray[i3]) * returnSpeed
            posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * returnSpeed
            posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * returnSpeed

            // Dampen velocity
            velocities[i3] *= 0.92
            velocities[i3 + 1] *= 0.92
            velocities[i3 + 2] *= 0.92
        }

        mesh.current.geometry.attributes.position.needsUpdate = true

        // Slow global rotation
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.01
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.75}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
