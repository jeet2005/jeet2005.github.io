import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ===== DOODLE SVGs ===== */
const DoodleStar = ({ style }) => (
    <svg className="doodle-star" style={style} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 2L18 11L27 11L20 17L22 27L15 21L8 27L10 17L3 11L12 11Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
)

const DoodleArrow = ({ style }) => (
    <svg className="doodle-arrow" style={style} width="80" height="40" viewBox="0 0 80 40" fill="none">
        <path d="M5 30C20 30 30 10 50 15C70 20 60 30 75 15" stroke="#333" strokeWidth="1.5" fill="none" />
        <path d="M70 10L75 15L68 18" stroke="#333" strokeWidth="1.5" fill="none" />
    </svg>
)

/* ===== HERO PAGE ===== */
function PageHero() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-greeting', { y: 20, opacity: 0, duration: 0.6, delay: 0.3 })
            gsap.from('.hero-name .first', { x: -60, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
            gsap.from('.hero-name .last', { x: 60, opacity: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' })
            gsap.from('.hero-role', { y: 20, opacity: 0, duration: 0.6, delay: 0.9 })
            gsap.from('.hero-tagline', { y: 20, opacity: 0, duration: 0.6, delay: 1.1 })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="notebook-page page-hero" id="home" ref={ref}>
            {/* Doodles scattered on the page */}
            <DoodleStar style={{ top: '15%', right: '20%', opacity: 0.1, fontSize: '2rem' }} />
            <DoodleStar style={{ top: '70%', left: '10%', opacity: 0.08, fontSize: '1.5rem', transform: 'rotate(20deg)' }} />
            <DoodleArrow style={{ bottom: '25%', right: '15%', opacity: 0.06 }} />

            <div className="hero-content">
                <p className="hero-greeting">hey there, i'm</p>
                <h1 className="hero-name">
                    <span className="first">Jeet</span>
                    <span className="last">Patel</span>
                </h1>
                <p className="hero-role">~ full-stack developer & creative technologist ~</p>
                <p className="hero-tagline">
                    I turn ideas into clean, scalable code — from AI-powered
                    surveillance systems to immersive mobile experiences.
                    This is my rough book. Welcome to my world.
                </p>
            </div>
            <span className="page-number">pg. 1</span>
        </section>
    )
}

/* ===== ABOUT PAGE ===== */
function PageAbout() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-grid > *', {
                y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 65%' },
            })
            gsap.from('.photo-frame', {
                scale: 0.8, opacity: 0, rotation: 'random(-8, 8)', stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '.photo-collage', start: 'top 70%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="notebook-page" id="about" ref={ref}>
            <div className="section-label">chapter 02</div>
            <h2 className="section-title">About <span className="underline">Me</span></h2>

            <div className="about-grid">
                <div>
                    <p className="about-text">
                        I'm <strong>Jeet Patel</strong> — a developer who doodles code on the margins
                        of his notebook. From building <strong>AI-powered face recognition systems</strong> to
                        crafting <strong>Flutter mobile apps</strong> for adventure seekers, I live at the
                        intersection of technology and creativity.
                    </p>
                    <p className="about-text" style={{ marginTop: 16 }}>
                        Every project is a new page. I don't just write code — I <strong>sketch experiences</strong>
                        that push boundaries. Currently flipping through new chapters in <strong>computer vision,
                            real-time systems, and interactive web</strong>.
                    </p>
                    <div className="stats-row">
                        <div className="stat"><span className="stat-val">8+</span><span className="stat-lbl">Projects</span></div>
                        <div className="stat"><span className="stat-val">6+</span><span className="stat-lbl">Technologies</span></div>
                        <div className="stat"><span className="stat-val">∞</span><span className="stat-lbl">Curiosity</span></div>
                    </div>
                </div>

                <div className="photo-collage">
                    <div className="photo-frame main" style={{ '--r': '-2deg' }}>
                        <div className="tape tape-top"></div>
                        <img src="/images/jeet-4.jpg" alt="Jeet Patel" loading="lazy" />
                    </div>
                    <div className="photo-frame" style={{ '--r': '3deg' }}>
                        <div className="tape tape-corner"></div>
                        <img src="/images/jeet-2.jpg" alt="Jeet at campus" loading="lazy" />
                    </div>
                    <div className="photo-frame" style={{ '--r': '-1.5deg' }}>
                        <div className="tape tape-top"></div>
                        <img src="/images/jeet-1.jpg" alt="Jeet at work" loading="lazy" />
                    </div>
                </div>
            </div>
            <span className="page-number">pg. 2</span>
        </section>
    )
}

/* ===== SKILLS PAGE ===== */
function PageSkills() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.skill-card', {
                y: 40, opacity: 0, rotation: 'random(-3, 3)', stagger: 0.08, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' },
            })
            gsap.from('.skill-tag', {
                scale: 0, opacity: 0, stagger: 0.02, duration: 0.3, ease: 'back.out(2)',
                scrollTrigger: { trigger: '.skills-grid', start: 'top 70%' },
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
        <section className="notebook-page" id="skills" ref={ref}>
            <DoodleStar style={{ top: '10%', right: '12%', opacity: 0.08 }} />
            <div className="section-label">chapter 03</div>
            <h2 className="section-title">My <span className="underline">Arsenal</span> 🛠️</h2>

            <div className="skills-grid">
                {skills.map((group) => (
                    <div className="skill-card" key={group.category}>
                        <h4 className="skill-card-title">{group.category}</h4>
                        <div className="skill-tags">
                            {group.items.map((s) => (
                                <span className="skill-tag" key={s}>{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <span className="page-number">pg. 3</span>
        </section>
    )
}

/* ===== PROJECTS PAGE ===== */
function PageProjects() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            document.querySelectorAll('.project-entry').forEach((el) => {
                gsap.from(el.children, {
                    y: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 70%' },
                })
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const projects = [
        {
            num: '01', title: 'EYE-X', sub: 'AI Surveillance System',
            desc: 'Real-time face recognition & ANPR with YuNet DNN, OpenCV, FastAPI. Live monitoring with WebSocket analytics dashboard.',
            tags: ['Python', 'OpenCV', 'FastAPI', 'MongoDB', 'AI/ML'],
            github: 'https://github.com/jeet2005', featured: true,
        },
        {
            num: '02', title: 'TrekVerse', sub: 'Adventure Trekking App',
            desc: 'Flutter app for adventure lovers — curated trekking experiences from verified brands with Material Design UI.',
            tags: ['Flutter', 'Dart', 'Firebase'],
            github: 'https://github.com/jeet2005/Trekverse', featured: true,
        },
        {
            num: '03', title: 'Virtual Hand Controller', sub: 'Gesture Recognition',
            desc: 'Webcam gesture control — MediaPipe hand tracking converted to mouse/keyboard actions in real-time.',
            tags: ['Python', 'MediaPipe', 'OpenCV'],
            github: 'https://github.com/jeet2005/Virtual-Hand-Controller',
        },
        {
            num: '04', title: 'SWA-HISAB', sub: 'Expense Platform',
            desc: 'Full-stack expense-sharing with analytics, real-time tracking, and premium animated UI.',
            tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
            github: 'https://github.com/jeet2005',
        },
    ]

    return (
        <section className="notebook-page" id="projects" ref={ref}>
            <DoodleArrow style={{ top: '5%', right: '8%', opacity: 0.06, transform: 'rotate(-20deg)' }} />
            <div className="section-label">chapter 04</div>
            <h2 className="section-title">Selected <span className="underline">Work</span> 📝</h2>

            {projects.map((p) => (
                <div className="project-entry" key={p.title}>
                    <div className="project-num">{p.num}</div>
                    <div>
                        {p.featured && <div className="project-featured">★ featured</div>}
                        <h3 className="project-title">{p.title}</h3>
                        <p className="project-subtitle">{p.sub}</p>
                        <p className="project-desc">{p.desc}</p>
                        <div className="project-tags">
                            {p.tags.map((tag) => (
                                <span className="project-tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                            view on github →
                        </a>
                    </div>
                </div>
            ))}
            <span className="page-number">pg. 4</span>
        </section>
    )
}

/* ===== CONTACT PAGE ===== */
function PageContact() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-grid > *', {
                y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 60%' },
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const subject = encodeURIComponent(`Portfolio Contact from ${fd.get('name')}`)
        const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`)
        window.location.href = `mailto:jeetpatel1908@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <section className="notebook-page" id="contact" ref={ref}>
            <div className="section-label">chapter 05</div>
            <h2 className="section-title">Let's <span className="underline">Talk</span> ✉️</h2>

            <div className="contact-grid">
                <div>
                    <p className="about-text">
                        Got a project idea, a question, or just want to say hi?
                        Drop me a note — my inbox is always open.
                    </p>
                    <div className="contact-channels">
                        {[
                            { name: 'GitHub', val: '@jeet2005', href: 'https://github.com/jeet2005' },
                            { name: 'LinkedIn', val: 'Jeet Patel', href: 'https://www.linkedin.com/in/jeetpatel1908' },
                            { name: 'Instagram', val: '@sjeet1908', href: 'https://www.instagram.com/sjeet1908' },
                            { name: 'Email', val: 'jeetpatel1908@gmail.com', href: 'mailto:jeetpatel1908@gmail.com' },
                        ].map((c) => (
                            <a key={c.name} href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'}
                                rel={c.href.startsWith('mailto') ? undefined : 'noopener noreferrer'} className="contact-channel">
                                <span className="contact-channel-name">{c.name}</span>
                                <span className="contact-channel-val">{c.val}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" placeholder="write your name here..." required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="your@email.com" required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea name="message" placeholder="what's on your mind?" required></textarea>
                    </div>
                    <button type="submit" className="send-btn">Send Note ✏️</button>
                </form>
            </div>
            <span className="page-number">pg. 5</span>
        </section>
    )
}

export default function NotebookPages() {
    return (
        <main>
            <PageHero />
            <PageAbout />
            <PageSkills />
            <PageProjects />
            <PageContact />
        </main>
    )
}
