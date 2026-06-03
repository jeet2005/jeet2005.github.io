/* Simple SVG icons for project cards — blue monochrome style */

export function IconEye({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10C14 10 6 18 4 24C6 30 14 38 24 38C34 38 42 30 44 24C42 18 34 10 24 10Z" stroke="#00e5ff" strokeWidth="2" fill="none" />
            <circle cx="24" cy="24" r="7" stroke="#7c5cff" strokeWidth="2" fill="rgba(0,229,255,0.1)" />
            <circle cx="24" cy="24" r="3" fill="#00e5ff" />
            <path d="M24 14V10" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
            <path d="M24 38V34" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
            <path d="M16 16L13 13" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
            <path d="M32 16L35 13" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
        </svg>
    )
}

export function IconCompass({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" stroke="#00e5ff" strokeWidth="2" fill="none" />
            <circle cx="24" cy="24" r="16" stroke="#7c5cff" strokeWidth="1" opacity="0.3" fill="none" />
            <polygon points="24,8 28,24 24,40 20,24" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" strokeWidth="1.5" />
            <polygon points="8,24 24,20 40,24 24,28" fill="rgba(124,92,255,0.15)" stroke="#7c5cff" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="3" fill="#00e5ff" />
            <text x="24" y="7" textAnchor="middle" fill="#00e5ff" fontSize="5" fontFamily="monospace">N</text>
        </svg>
    )
}

export function IconHand({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 28V12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12V22" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M24 24V10C24 8.9 24.9 8 26 8C27.1 8 28 8.9 28 10V22" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M28 22V12C28 10.9 28.9 10 30 10C31.1 10 32 10.9 32 12V24" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M32 22V16C32 14.9 32.9 14 34 14C35.1 14 36 14.9 36 16V28C36 34 32 40 26 40C20 40 16 36 16 30V26C16 24.9 16.9 24 18 24C19.1 24 20 24.9 20 26" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="22" cy="6" r="1.5" fill="#00e5ff" opacity="0.4" />
            <circle cx="30" cy="6" r="1" fill="#00e5ff" opacity="0.3" />
        </svg>
    )
}

export function IconWallet({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="14" width="36" height="24" rx="4" stroke="#00e5ff" strokeWidth="2" fill="none" />
            <path d="M6 22H42" stroke="#7c5cff" strokeWidth="1" opacity="0.3" />
            <rect x="30" y="22" width="12" height="10" rx="2" stroke="#7c5cff" strokeWidth="2" fill="rgba(124,92,255,0.1)" />
            <circle cx="36" cy="27" r="2" fill="#00e5ff" />
            <path d="M10 14V12C10 10 12 8 14 8H34C36 8 38 10 38 12V14" stroke="#00e5ff" strokeWidth="1.5" opacity="0.5" fill="none" />
            <line x1="14" y1="32" x2="24" y2="32" stroke="#7c5cff" strokeWidth="1" opacity="0.3" />
        </svg>
    )
}

export function IconBrush({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 6L18 24C16 26 16 28 18 30C20 32 22 32 24 30L42 12" stroke="#00e5ff" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M18 30C16 32 12 34 10 36C8 38 8 42 12 42C16 42 18 40 18 38C18 36 16 34 18 30Z" stroke="#7c5cff" strokeWidth="2" fill="rgba(124,92,255,0.1)" />
            <circle cx="12" cy="40" r="1.5" fill="#00e5ff" opacity="0.5" />
            <line x1="30" y1="12" x2="36" y2="18" stroke="#00e5ff" strokeWidth="1" opacity="0.4" />
        </svg>
    )
}

export function IconChart({ size = 48 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6,36 14,28 22,32 30,18 38,22 46,10" stroke="#00e5ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="6,36 14,28 22,32 30,18 38,22 46,10 46,36 6,36" fill="rgba(0,229,255,0.05)" stroke="none" />
            <line x1="6" y1="36" x2="6" y2="8" stroke="#7c5cff" strokeWidth="1" opacity="0.3" />
            <line x1="6" y1="36" x2="46" y2="36" stroke="#7c5cff" strokeWidth="1" opacity="0.3" />
            <circle cx="14" cy="28" r="2.5" fill="#00e5ff" opacity="0.6" />
            <circle cx="30" cy="18" r="2.5" fill="#7c5cff" opacity="0.6" />
            <circle cx="46" cy="10" r="2.5" fill="#00e5ff" opacity="0.6" />
        </svg>
    )
}
