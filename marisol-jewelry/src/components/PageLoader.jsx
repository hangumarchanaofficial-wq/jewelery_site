export default function PageLoader({ visible }) {
    const show = visible !== false;
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-charcoal transition-all duration-800 ease-luxury
        ${show ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            <span
                className="w-[18rem] text-center font-heading text-3xl leading-none font-light tracking-luxury uppercase text-silver-light animate-loader-pulse"
            >
                Aphrodite
            </span>
            <div className="mt-5 h-px bg-gradient-to-r from-transparent via-silver-light/70 to-transparent animate-loader-line" />
        </div>
    );
}
