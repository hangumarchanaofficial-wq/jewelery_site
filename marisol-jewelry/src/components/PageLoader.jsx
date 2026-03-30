export default function PageLoader({ visible }) {
    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-ecru-light transition-all duration-800 ease-luxury
        ${visible ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
      <span className="font-heading text-3xl font-light tracking-luxury uppercase text-burgundy animate-loader-pulse">
        Marisol
      </span>
            <div className="mt-5 h-px bg-gradient-to-r from-transparent via-burgundy to-transparent animate-loader-line" />
        </div>
    );
}
