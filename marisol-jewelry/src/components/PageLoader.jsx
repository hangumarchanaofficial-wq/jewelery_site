export default function PageLoader({ visible }) {
    const show = visible !== false;
    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-charcoal transition-all duration-800 ease-luxury
        ${show ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
      <span className="font-heading text-3xl font-light tracking-luxury uppercase text-silver-light animate-loader-pulse">
        Aphrodite
      </span>
            <div className="mt-5 h-px bg-gradient-to-r from-transparent via-silver-light/70 to-transparent animate-loader-line" />
        </div>
    );
}
