export default function BrandLogo({ className = "", color = "#6B1D2A" }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20 2 L38 20 L20 38 L2 20 Z"
                stroke={color}
                strokeWidth="1"
                fill="none"
            />
            <path
                d="M20 8 L32 20 L20 32 L8 20 Z"
                stroke={color}
                strokeWidth="0.5"
                fill="none"
                opacity="0.5"
            />
            <circle
                cx="20"
                cy="20"
                r="3"
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                opacity="0.7"
            />
        </svg>
    );
}
