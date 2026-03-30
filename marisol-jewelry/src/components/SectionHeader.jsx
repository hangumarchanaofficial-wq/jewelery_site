import useScrollReveal from "../hooks/useScrollReveal";

export default function SectionHeader({
                                          label,
                                          title,
                                          description,
                                          center = false,
                                          light = false,
                                      }) {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${center ? "text-center" : ""}
        ${center ? "mb-[clamp(48px,6vw,80px)]" : "mb-10"}`}
        >
            {/* Label */}
            <p
                className={`font-body text-[0.65rem] font-medium tracking-[0.35em] uppercase mb-5
          ${light ? "text-silver" : "text-silver-dark"}`}
            >
                {label}
            </p>

            {/* Title */}
            <h2
                className={`font-heading text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.25] mb-5
          ${light ? "text-ecru" : "text-burgundy"}`}
            >
                {title}
            </h2>

            {/* Divider */}
            <div
                className={`w-12 h-px mb-7
          ${center ? "mx-auto" : ""}
          ${
                    light
                        ? "bg-gradient-to-r from-silver via-ecru to-silver"
                        : "bg-gradient-to-r from-burgundy to-silver"
                }`}
            />

            {/* Description */}
            {description && (
                <p
                    className={`font-body text-[0.88rem] font-light leading-[1.9] max-w-[540px]
            ${center ? "mx-auto" : ""}
            ${light ? "text-ecru/75" : "text-silver-dark"}`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
