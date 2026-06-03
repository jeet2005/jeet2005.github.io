import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    end: 'center center',
                    scrub: 1,
                },
            })

            tl.to('.about-label', { opacity: 1, y: 0, duration: 0.3 })
                .to('.about-heading', { opacity: 1, y: 0, duration: 0.5 }, '-=0.15')
                .to('.about-text', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
                .to('.about-stats-row', { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
                .to('.about-visual', { opacity: 1, x: 0, scale: 1, duration: 0.5 }, '-=0.4')
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="chapter-about" id="about" ref={sectionRef}>
            <div className="about-sticky">
                <div className="about-container">
                    <div>
                        <div className="about-label" style={{ transform: 'translateY(30px)' }}>
                            Chapter 02
                        </div>
                        <h2 className="about-heading" style={{ transform: 'translateY(40px)' }}>
                            Crafting digital<br />
                            <span className="accent">experiences</span>
                        </h2>
                        <div className="about-text" style={{ transform: 'translateY(30px)' }}>
                            <p>
                                I'm <strong>Jeet Patel</strong> — a developer who lives at the intersection
                                of technology and creativity. From architecting <strong>AI-powered face
                                    recognition systems</strong> with deep learning, to building <strong>Flutter
                                        mobile apps</strong> for adventure seekers, to crafting <strong>real-time
                                            collaborative platforms</strong> — I thrive on turning complex problems into
                                elegant solutions.
                            </p>
                            <br />
                            <p>
                                Every project is a new chapter in my story. I don't just write code —
                                I craft experiences that push boundaries and challenge conventions.
                            </p>
                        </div>

                        <div className="about-stats-row" style={{ transform: 'translateY(20px)' }}>
                            <div className="about-stat">
                                <div className="about-stat-num">8+</div>
                                <div className="about-stat-label">Projects</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-num">6+</div>
                                <div className="about-stat-label">Technologies</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-num">∞</div>
                                <div className="about-stat-label">Curiosity</div>
                            </div>
                        </div>
                    </div>

                    <div className="about-visual" style={{ transform: 'translateX(60px) scale(0.9)' }}>
                        <div className="about-avatar">
                            <div className="about-avatar-text">JP</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
