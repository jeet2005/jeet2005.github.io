import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ====== CHAPTER 1: LAUNCH ====== */
function ChapterLaunch() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to('.launch-word', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.5,
            })
                .to('.launch-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
                .to('.launch-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')

            gsap.to(ref.current, {
                opacity: 0,
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: '60% top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <div className="story-chapter chapter-launch" id="ch1" ref={ref}>
            <div className="chapter-content center">
                <div className="launch-sub" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                    Full-Stack Developer & Creative Technologist
                </div>
                <h1 className="launch-name">
                    <span className="launch-word" style={{ opacity: 0, transform: 'translateY(100%)' }}>Jeet</span>
                </h1>
                <h1 className="launch-name">
                    <span className="launch-word" style={{ opacity: 0, transform: 'translateY(100%)' }}>Patel</span>
                </h1>
                <p className="launch-tagline" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                    Turning ideas into clean, scalable code — from AI-powered<br />
                    surveillance systems to immersive mobile experiences.
                </p>
            </div>
        </div>
    )
}

/* ====== CHAPTER 2: ORBIT (About) ====== */
function ChapterOrbit() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.orbit-content > *', {
                y: 80,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 60%',
                },
            })

            gsap.from('.photo-card', {
                scale: 0.8,
                opacity: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '.photo-gallery',
                    start: 'top 70%',
                },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <div className="story-chapter chapter-orbit" id="ch2" ref={ref}>
            <div className="chapter-content wide">
                <div className="orbit-layout">
                    <div className="orbit-content">
                        <div className="chapter-num">02</div>
                        <div className="chapter-label">About Me</div>
                        <h2 className="chapter-heading">
                            Crafting digital<br /><span className="accent">experiences</span>
                        </h2>
                        <p className="chapter-text">
                            I'm <strong>Jeet Patel</strong> — a developer who lives at the intersection of
                            technology and creativity. From architecting <strong>AI-powered face recognition
                                systems</strong> to building <strong>Flutter mobile apps</strong> for adventure seekers
                            to crafting <strong>real-time collaborative platforms</strong>.
                        </p>
                        <p className="chapter-text">
                            Every project is a new chapter. I don't just write code — I craft
                            experiences that push boundaries.
                        </p>
                        <div className="stats-row">
                            <div className="stat"><span className="stat-val">8+</span><span className="stat-lbl">Projects</span></div>
                            <div className="stat"><span className="stat-val">6+</span><span className="stat-lbl">Technologies</span></div>
                            <div className="stat"><span className="stat-val">∞</span><span className="stat-lbl">Curiosity</span></div>
                        </div>
                    </div>

                    <div className="photo-gallery">
                        <div className="photo-card photo-main">
                            <img src="/images/jeet-4.jpg" alt="Jeet Patel" loading="lazy" />
                        </div>
                        <div className="photo-card photo-side-1">
                            <img src="/images/jeet-2.jpg" alt="Jeet at campus" loading="lazy" />
                        </div>
                        <div className="photo-card photo-side-2">
                            <img src="/images/jeet-1.jpg" alt="Jeet at work" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ====== CHAPTER 3: CONSTELLATION (Skills) ====== */
function ChapterConstellation() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.constellation-header > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 65%',
                },
            })

            gsap.from('.skill-group', {
                y: 40,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 75%',
                },
            })

            gsap.from('.skill-orbit', {
                scale: 0,
                opacity: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: 'back.out(1.8)',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 70%',
                },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const skills = [
        { category: 'Frontend', items: ['React.js', 'Three.js', 'GSAP', 'JavaScript', 'HTML/CSS'] },
        { category: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Node.js', 'WebSockets'] },
        { category: 'Mobile', items: ['Flutter', 'Dart', 'Android', 'Material Design'] },
        { category: 'AI / Vision', items: ['OpenCV', 'MediaPipe', 'YuNet DNN', 'Face Recognition'] },
        { category: 'Data', items: ['MongoDB', 'Firebase', 'REST APIs', 'Socket.IO'] },
        { category: 'DevOps', items: ['Git', 'Docker', 'Vercel', 'Linux', 'CI/CD'] },
    ]

    return (
        <div className="story-chapter chapter-constellation" id="ch3" ref={ref}>
            <div className="chapter-content wide">
                <div className="constellation-header">
                    <div className="chapter-num">03</div>
                    <div className="chapter-label">Skills</div>
                    <h2 className="chapter-heading">
                        My <span className="accent">Arsenal</span>
                    </h2>
                </div>
                <div className="skills-grid">
                    {skills.map((group) => (
                        <div className="skill-group" key={group.category}>
                            <h4 className="skill-group-title">{group.category}</h4>
                            <div className="skill-orbits">
                                {group.items.map((s) => (
                                    <span className="skill-orbit" key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ====== CHAPTER 4: DEEP SPACE (Projects) ====== */
function ChapterDeepSpace() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.deepspace-header > *', {
                y: 80,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.deepspace-header',
                    start: 'top 70%',
                },
            })

            document.querySelectorAll('.project-station').forEach((el) => {
                gsap.from(el.querySelectorAll('.project-station-content > *'), {
                    y: 60,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 60%',
                    },
                })
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const projects = [
        {
            num: '01', title: 'EYE-X', sub: 'AI Surveillance System',
            desc: 'Real-time face recognition & ANPR with YuNet DNN, OpenCV, FastAPI. Live monitoring with WebSocket analytics.',
            tags: ['Python', 'OpenCV', 'FastAPI', 'MongoDB', 'AI/ML'],
            github: 'https://github.com/jeet2005', featured: true,
            icon: (
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <path d="M24 10C14 10 6 18 4 24C6 30 14 38 24 38C34 38 42 30 44 24C42 18 34 10 24 10Z" stroke="#00e5ff" strokeWidth="2" fill="none" />
                    <circle cx="24" cy="24" r="7" stroke="#7c5cff" strokeWidth="2" fill="rgba(0,229,255,0.1)" />
                    <circle cx="24" cy="24" r="3" fill="#00e5ff" />
                </svg>
            ),
        },
        {
            num: '02', title: 'TrekVerse', sub: 'Adventure Trekking App',
            desc: 'Flutter app for adventure lovers — curated trekking experiences from verified brands with Material Design UI.',
            tags: ['Flutter', 'Dart', 'Firebase'],
            github: 'https://github.com/jeet2005/Trekverse', featured: true,
            icon: (
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#00e5ff" strokeWidth="2" fill="none" />
                    <polygon points="24,8 28,24 24,40 20,24" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" strokeWidth="1.5" />
                    <polygon points="8,24 24,20 40,24 24,28" fill="rgba(124,92,255,0.15)" stroke="#7c5cff" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="3" fill="#00e5ff" />
                </svg>
            ),
        },
        {
            num: '03', title: 'Virtual Hand Controller', sub: 'Gesture Recognition',
            desc: 'Webcam gesture control — MediaPipe hand tracking converted to mouse/keyboard actions in real-time.',
            tags: ['Python', 'MediaPipe', 'OpenCV'],
            github: 'https://github.com/jeet2005/Virtual-Hand-Controller', featured: false,
            icon: (
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <path d="M20 28V12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12V22" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M24 24V10C24 8.9 24.9 8 26 8C27.1 8 28 8.9 28 10V22" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M28 22V12C28 10.9 28.9 10 30 10C31.1 10 32 10.9 32 12V24" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M32 22V16C32 14.9 32.9 14 34 14C35.1 14 36 14.9 36 16V28C36 34 32 40 26 40C20 40 16 36 16 30V26C16 24.9 16.9 24 18 24C19.1 24 20 24.9 20 26" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
            ),
        },
        {
            num: '04', title: 'SWA-HISAB', sub: 'Expense Platform',
            desc: 'Full-stack expense-sharing with analytics, real-time tracking, and premium animated UI.',
            tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
            github: 'https://github.com/jeet2005', featured: false,
            icon: (
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="14" width="36" height="24" rx="4" stroke="#00e5ff" strokeWidth="2" fill="none" />
                    <rect x="30" y="22" width="12" height="10" rx="2" stroke="#7c5cff" strokeWidth="2" fill="rgba(124,92,255,0.1)" />
                    <circle cx="36" cy="27" r="2" fill="#00e5ff" />
                    <path d="M10 14V12C10 10 12 8 14 8H34C36 8 38 10 38 12V14" stroke="#00e5ff" strokeWidth="1.5" opacity="0.5" fill="none" />
                </svg>
            ),
        },
    ]

    return (
        <div className="story-chapter chapter-deepspace" id="ch4" ref={ref}>
            <div className="chapter-content wide deepspace-header">
                <div className="chapter-num">04</div>
                <div className="chapter-label">Projects</div>
                <h2 className="chapter-heading">
                    Selected <span className="accent">Work</span>
                </h2>
            </div>

            {projects.map((p) => (
                <div className="project-station" key={p.title}>
                    <div className="project-station-content">
                        {p.featured && <div className="project-badge">Featured</div>}
                        <div className="project-station-num">{p.num}</div>
                        <div className="project-station-header">
                            <div className="project-station-icon">{p.icon}</div>
                            <div>
                                <h3 className="project-station-title">{p.title}</h3>
                                <p className="project-station-sub">{p.sub}</p>
                            </div>
                        </div>
                        <p className="project-station-desc">{p.desc}</p>
                        <div className="project-station-tags">
                            {p.tags.map((tag) => (
                                <span className="project-station-tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-station-link">
                            View on GitHub →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ====== CHAPTER 5: TRANSMISSION (Contact) ====== */
function ChapterTransmission() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.transmission-content > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 60%',
                },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const subject = encodeURIComponent(`Portfolio Contact from ${fd.get('name')}`)
        const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\nMessage:\n${fd.get('message')}`)
        window.location.href = `mailto:jeetpatel1908@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <div className="story-chapter chapter-transmission" id="ch5" ref={ref}>
            <div className="chapter-content wide">
                <div className="transmission-content">
                    <div className="chapter-num">05</div>
                    <div className="chapter-label">Contact</div>
                    <h2 className="chapter-heading transmission-heading">
                        Send a<br /><span className="accent">transmission</span><span className="magenta">.</span>
                    </h2>

                    <div className="transmission-grid">
                        <div className="transmission-channels">
                            <p className="chapter-text">
                                Got a project, a question, or just want to say hello? My inbox is always open.
                            </p>
                            {[
                                { lbl: 'GitHub', val: '@jeet2005', href: 'https://github.com/jeet2005' },
                                { lbl: 'LinkedIn', val: 'Jeet Patel', href: 'https://www.linkedin.com/in/jeetpatel1908' },
                                { lbl: 'Instagram', val: '@sjeet1908', href: 'https://www.instagram.com/sjeet1908' },
                                { lbl: 'Email', val: 'jeetpatel1908@gmail.com', href: 'mailto:jeetpatel1908@gmail.com' },
                            ].map((c) => (
                                <a key={c.lbl} href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel={c.href.startsWith('mailto') ? undefined : 'noopener noreferrer'} className="channel-link">
                                    <span className="channel-name">{c.lbl}</span>
                                    <span className="channel-val">{c.val}</span>
                                </a>
                            ))}
                        </div>

                        <form className="transmission-form" onSubmit={handleSubmit}>
                            <div className="t-form-group">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Your name" required />
                            </div>
                            <div className="t-form-group">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="your@email.com" required />
                            </div>
                            <div className="t-form-group">
                                <label>Message</label>
                                <textarea name="message" placeholder="What's on your mind?" required></textarea>
                            </div>
                            <button type="submit" className="send-btn">Send Transmission →</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function StoryOverlays() {
    return (
        <div className="story-container">
            <ChapterLaunch />
            <ChapterOrbit />
            <ChapterConstellation />
            <ChapterDeepSpace />
            <ChapterTransmission />
        </div>
    )
}
