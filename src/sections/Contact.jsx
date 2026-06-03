import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef(null)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-heading-area > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            })

            gsap.from('.contact-social-link', {
                x: -50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-socials',
                    start: 'top 75%',
                },
            })

            gsap.from('.contact-form-area', {
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-form-area',
                    start: 'top 70%',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
        window.location.href = `mailto:jeetpatel1908@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <section className="chapter-contact" id="contact" ref={sectionRef}>
            <div className="contact-inner">
                <div className="contact-heading-area">
                    <div className="contact-label">Chapter 05</div>
                    <h2 className="contact-heading">
                        Let's build<br />
                        something<br />
                        <span className="accent">amazing</span><span className="magenta">.</span>
                    </h2>
                    <p className="contact-desc">
                        Got a project, a question, or just want to say hello?
                        My inbox is always open.
                    </p>

                    <div className="contact-socials">
                        {[
                            { icon: 'GH', label: 'GitHub', value: '@jeet2005', href: 'https://github.com/jeet2005' },
                            { icon: 'LI', label: 'LinkedIn', value: 'Jeet Patel', href: 'https://www.linkedin.com/in/jeetpatel1908' },
                            { icon: 'IG', label: 'Instagram', value: '@sjeet1908', href: 'https://www.instagram.com/sjeet1908' },
                            { icon: '@', label: 'Email', value: 'jeetpatel1908@gmail.com', href: 'mailto:jeetpatel1908@gmail.com' },
                        ].map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                                rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                className="contact-social-link"
                            >
                                <div className="contact-social-icon">{s.icon}</div>
                                <div className="contact-social-details">
                                    <div className="contact-social-name">{s.label}</div>
                                    <div className="contact-social-value">{s.value}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <form className="contact-form-area" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            placeholder="What's on your mind?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Send Message →
                    </button>
                </form>
            </div>
        </section>
    )
}
