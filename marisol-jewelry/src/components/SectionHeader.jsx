import useScrollReveal from "../hooks/useScrollReveal";

export default function SectionHeader({
    label,
    title,
    description,
    center = false,
    light = false,
    className = "",
}) {
    const [ref, isVisible] = useScrollReveal();

    const labelClass = light ? "text-silver-light/80" : "text-burgundy/70";
    const titleClass = light ? "text-ecru" : "text-burgundy";
    const descClass = light ? "text-ecru/80" : "text-soft-black/80";

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-luxury
        ${center ? "mx-auto max-w-[640px] text-center" : ""}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${className}`}
        >
            <p
                className={`font-body text-[0.65rem] font-medium tracking-[0.32em] uppercase sm:text-[0.72rem] sm:tracking-[0.35em] ${labelClass}`}
            >
                {label}
            </p>
            <h2
                className={`mt-3 font-heading text-[clamp(1.85rem,4vw,3rem)] font-light leading-[1.2] sm:mt-4 ${titleClass}`}
            >
                {title}
            </h2>
            <div
                className={`mt-4 h-px w-12 sm:mt-5 divider-burgundy-silver ${center ? "mx-auto" : ""}`}
            />
            {description && (
                <div
                    className={`mt-6 space-y-4 font-body text-[0.9rem] font-light leading-[1.85] text-balance sm:mt-7 sm:text-[0.92rem] sm:leading-[1.9] ${descClass} ${
                        center ? "" : "max-w-[540px]"
                    }`}
                >
                    {description}
                </div>
            )}
        </div>
    );
}
