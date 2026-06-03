import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from '../components/ParticleField'
import CentralSphere from '../components/CentralSphere'
import Rocket3D from '../components/Rocket3D'
import Spaceship3D from '../components/Spaceship3D'
import Satellite3D from '../components/Satellite3D'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const sectionRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            tl.to('.hero-name-word', {
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                delay: 0.5,
            })
                .to('.hero-intro-line', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                .to('.hero-role-line', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
                .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .to('.hero-scroll-hint', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.2')

            gsap.to(overlayRef.current, {
                opacity: 0,
                y: -100,
                scale: 0.9,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '70% top',
                    scrub: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="chapter-hero" id="hero" ref={sectionRef}>
            <div className="hero-sticky">
                <div className="hero-3d-canvas">
                    <Canvas
                        camera={{ position: [0, 0, 14], fov: 60 }}
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.25} />
                            <directionalLight position={[5, 5, 5]} intensity={0.5} color="#7c5cff" />
                            <pointLight position={[10, 10, 10]} intensity={0.6} color="#7c5cff" />
                            <pointLight position={[-10, -5, 5]} intensity={0.3} color="#00e5ff" />
                            <pointLight position={[0, -10, 5]} intensity={0.2} color="#ff2d8a" />

                            <ParticleField count={2000} />
                            <CentralSphere />

                            {/* Rockets and spaceships flowing through the scene */}
                            <Rocket3D position={[-5, 3, -4]} scale={0.6} rotation={[0.2, 0.5, -0.3]} />
                            <Rocket3D position={[6, -2, -6]} scale={0.4} rotation={[-0.3, -0.4, 0.2]} color="#7c5cff" />
                            <Spaceship3D position={[4, 4, -8]} scale={0.35} rotation={[0.1, 0.8, 0.1]} />
                            <Spaceship3D position={[-6, -3, -7]} scale={0.25} rotation={[0.2, -0.6, -0.1]} />
                            <Satellite3D position={[-3, -5, -5]} scale={0.5} />
                            <Satellite3D position={[7, 1, -9]} scale={0.3} />
                            <Rocket3D position={[0, 6, -10]} scale={0.3} rotation={[0.5, 0, 0.5]} />
                        </Suspense>
                    </Canvas>
                </div>

                <div className="hero-overlay" ref={overlayRef}>
                    <div className="hero-intro-line" style={{ transform: 'translateY(20px)' }}>
                        Full-Stack Developer & Creative Technologist
                    </div>

                    <div className="hero-name-line">
                        <span className="hero-name-word">Jeet</span>
                    </div>
                    <div className="hero-name-line">
                        <span className="hero-name-word">Patel</span>
                    </div>

                    <div className="hero-role-line" style={{ transform: 'translateY(20px)' }}>
                        I build things that live on the internet
                    </div>

                    <p className="hero-tagline" style={{ transform: 'translateY(20px)' }}>
                        Turning ideas into clean, scalable code — from AI-powered surveillance systems
                        to immersive mobile experiences. Every line of code tells a story.
                    </p>
                </div>

                <div className="hero-scroll-hint" style={{ opacity: 0 }}>
                    <span>Scroll</span>
                    <div className="scroll-line"></div>
                </div>
            </div>
        </section>
    )
}
