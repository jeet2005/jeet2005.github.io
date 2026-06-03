import { useState, useEffect } from 'react'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const scrollTo = (id) => {
        setMobileOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => scrollTo('hero')} style={{ cursor: 'none' }}>
                JEET PATEL
            </div>

            <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
                {[
                    { id: 'about', label: 'About' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'projects', label: 'Work' },
                    { id: 'contact', label: 'Contact' },
                ].map((item) => (
                    <li key={item.id} style={{ listStyle: 'none' }}>
                        <a onClick={() => scrollTo(item.id)} href={`#${item.id}`}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    )
}
