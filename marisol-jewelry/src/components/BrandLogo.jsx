/**
 * Mark inspired by dove wings (arcs), rose (center bloom), and seashell (lower scallop).
 */
export default function BrandLogo({ className = "", color = "currentColor" }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            {/* Dove — mirrored wing arcs */}
            <path
                d="M6 16 Q14 8 20 14 Q26 8 34 16"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Rose — layered petals */}
            <circle cx="20" cy="22" r="2.2" stroke={color} strokeWidth="0.65" />
            <path
                d="M20 19.2 L20 16.5 M17 21 L14.5 19.5 M23 21 L25.5 19.5 M17.8 23.5 L15.5 25.5 M22.2 23.5 L24.5 25.5"
                stroke={color}
                strokeWidth="0.55"
                strokeLinecap="round"
            />
            {/* Seashell — scalloped cup */}
            <path
                d="M9 28 Q20 36 31 28"
                stroke={color}
                strokeWidth="0.85"
                strokeLinecap="round"
            />
            <path
                d="M11 28 Q20 34 29 28"
                stroke={color}
                strokeWidth="0.45"
                opacity="0.65"
                strokeLinecap="round"
            />
            <path
                d="M13 28 Q20 32 27 28"
                stroke={color}
                strokeWidth="0.35"
                opacity="0.45"
                strokeLinecap="round"
            />
        </svg>
    );
}
