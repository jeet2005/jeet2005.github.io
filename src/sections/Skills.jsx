import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
    {
        title: 'Frontend',
        skills: ['React.js', 'Three.js', 'HTML5', 'CSS3', 'JavaScript', 'Framer Motion', 'GSAP'],
    },
    {
        title: 'Backend',
        skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'REST APIs', 'WebSockets', 'Socket.IO'],
    },
    {
        title: 'Database & Cloud',
        skills: ['MongoDB', 'Firebase', 'Git', 'GitHub', 'Docker', 'Vercel', 'Render'],
    },
    {
        title: 'Mobile',
        skills: ['Flutter', 'Dart', 'Android', 'Material Design', 'Cross-Platform'],
    },
    {
        title: 'AI & Vision',
        skills: ['OpenCV', 'MediaPipe', 'Face Recognition', 'YuNet DNN', 'Real-time Processing'],
    },
    {
        title: 'Workflow',
        skills: ['VS Code', 'Postman', 'Figma', 'Linux', 'Agile', 'CI/CD'],
    },
]

export default function Skills() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.skills-heading-section > *', {
                y: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-heading-section',
                    start: 'top 70%',
                },
            })

            const track = trackRef.current
            if (!track) return

            const totalWidth = track.scrollWidth - window.innerWidth

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.skills-horizontal-wrapper',
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="chapter-skills" id="skills" ref={sectionRef}>
            <div className="skills-heading-section">
                <div className="skills-label">Chapter 03</div>
                <h2 className="skills-heading">
                    My <span className="accent">Arsenal</span>
                </h2>
                <p className="skills-subtitle">
                    Technologies and tools I wield to bring ideas to life.
                </p>
            </div>

            <div className="skills-horizontal-wrapper">
                <div className="skills-horizontal-track" ref={trackRef}>
                    {skillCategories.map((cat, i) => (
                        <div className="skill-panel" key={cat.title}>
                            <div className="skill-panel-number">0{i + 1}</div>
                            <h3 className="skill-panel-title">{cat.title}</h3>
                            <div className="skill-panel-items">
                                {cat.skills.map((s) => (
                                    <span className="skill-chip" key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
