import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconEye, IconCompass, IconHand, IconWallet, IconBrush, IconChart } from '../components/ProjectIcons'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'EYE-X',
        subtitle: 'AI Surveillance System',
        description: 'Real-time face recognition & ANPR with AI-powered YuNet DNN models, OpenCV, and FastAPI. Live monitoring dashboards with WebSocket-based real-time analytics.',
        tags: ['Python', 'OpenCV', 'FastAPI', 'MongoDB', 'WebSocket', 'AI/ML'],
        github: 'https://github.com/jeet2005',
        featured: true,
        Icon: IconEye,
        bg: 'radial-gradient(ellipse at 30% 50%, rgba(124,92,255,0.08) 0%, transparent 70%)',
    },
    {
        title: 'TrekVerse',
        subtitle: 'Adventure Trekking App',
        description: 'A modern Flutter app for adventure lovers — suggesting trekking camps & curated experiences from verified brands with stunning Material Design.',
        tags: ['Flutter', 'Dart', 'Firebase', 'Material Design'],
        github: 'https://github.com/jeet2005/Trekverse',
        featured: true,
        Icon: IconCompass,
        bg: 'radial-gradient(ellipse at 70% 40%, rgba(0,229,255,0.06) 0%, transparent 70%)',
    },
    {
        title: 'Virtual Hand Controller',
        subtitle: 'Gesture Recognition System',
        description: 'Webcam-based gesture recognition that controls your mouse & keyboard. Uses MediaPipe hand tracking + PyAutoGUI for real-time control.',
        tags: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI'],
        github: 'https://github.com/jeet2005/Virtual-Hand-Controller',
        featured: false,
        Icon: IconHand,
        bg: 'radial-gradient(ellipse at 50% 60%, rgba(124,92,255,0.05) 0%, transparent 70%)',
    },
    {
        title: 'SWA-HISAB',
        subtitle: 'Expense Sharing Platform',
        description: 'Full-stack expense-sharing platform with analytics, real-time group tracking, email invitations, and premium animated UI.',
        tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
        github: 'https://github.com/jeet2005',
        featured: false,
        Icon: IconWallet,
        bg: 'radial-gradient(ellipse at 30% 30%, rgba(0,229,255,0.04) 0%, transparent 70%)',
    },
]

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-intro > *', {
                y: 80,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-intro',
                    start: 'top 70%',
                },
            })

            document.querySelectorAll('.project-showcase').forEach((el) => {
                gsap.from(el.querySelectorAll('.project-meta > *'), {
                    y: 60,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 65%',
                    },
                })

                gsap.from(el.querySelector('.project-icon-display'), {
                    scale: 0.3,
                    opacity: 0,
                    rotation: -30,
                    duration: 1.2,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 60%',
                    },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="chapter-projects" id="projects" ref={sectionRef}>
            <div className="projects-intro">
                <div className="projects-label">Chapter 04</div>
                <h2 className="projects-heading">
                    Selected <span className="accent">Work</span>
                </h2>
            </div>

            {projects.map((project, i) => (
                <div className="project-showcase" key={project.title}>
                    <div className="project-showcase-bg" style={{ background: project.bg }} />
                    <div className="project-showcase-content">
                        <div className="project-meta">
                            {project.featured && (
                                <div className="project-featured-tag">Featured Project</div>
                            )}
                            <div className="project-number">0{i + 1}</div>
                            <h3 className="project-name">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tech-stack">
                                {project.tags.map((tag) => (
                                    <span className="project-tech-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link-btn"
                            >
                                View on GitHub →
                            </a>
                        </div>
                        <div className="project-visual">
                            <div className="project-icon-display">
                                <project.Icon size={160} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
