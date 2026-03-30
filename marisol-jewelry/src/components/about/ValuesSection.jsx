import useScrollReveal from "../../hooks/useScrollReveal";

const VALUES = [
    {
        number: "01",
        title: "Ethically Sourced",
        text: "Every gemstone traced to its origin. Every metal refined from recycled sources. We visit our mines, know our refiners, and document every step of the journey from earth to atelier.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                <circle cx="20" cy="20" r="16" />
                <path d="M20 8v24M8 20h24" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="6" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Handcrafted Always",
        text: "No machines, no moulds, no shortcuts. Every Marisol piece is forged, carved, set, and polished entirely by hand — a process that takes between three and eight weeks per creation.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                <path d="M12 28 L20 4 L28 28" />
                <path d="M15 20h10" strokeWidth="0.5" />
                <circle cx="20" cy="34" r="3" strokeWidth="0.5" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Numbered & Signed",
        text: "Each piece carries an engraved edition number and the initials of its maker. No two are identical. Every creation comes with a provenance journal documenting its complete history.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                <rect x="8" y="6" width="24" height="28" rx="1" />
                <path d="M14 14h12M14 20h8M14 26h10" strokeWidth="0.5" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Made to Endure",
        text: "We do not design for seasons. Every piece is conceived as an heirloom — built with the structural integrity and material quality to be worn daily for decades and passed down through generations.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                <path d="M20 2 L38 20 L20 38 L2 20 Z" />
                <path d="M20 10 L30 20 L20 30 L10 20 Z" strokeWidth="0.5" />
            </svg>
        ),
    },
];

function ValueCard({ value, index }) {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`transition-all duration-[1200ms] ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {/* Icon */}
            <div className="w-10 h-10 text-burgundy/30 mb-6">
                {value.icon}
            </div>

            {/* Number */}
            <span className="font-body text-[0.58rem] font-medium tracking-editorial uppercase text-silver/60 block mb-3">
        {value.number}
      </span>

            {/* Title */}
            <h3 className="font-heading text-[1.35rem] font-normal text-burgundy tracking-[0.02em] mb-4">
                {value.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px bg-burgundy/20 mb-5" />

            {/* Text */}
            <p className="font-body text-[0.8rem] font-light text-silver-dark leading-editorial">
                {value.text}
            </p>
        </div>
    );
}

export default function ValuesSection() {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="section-padding bg-ecru-light">
            <div className="container-luxury">
                {/* Section header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-[560px] mx-auto mb-[clamp(56px,7vw,88px)]
            transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <p className="font-body text-label font-medium tracking-editorial uppercase text-silver-dark mb-4">
                        What We Believe
                    </p>
                    <h2 className="font-heading text-section-title font-light text-burgundy leading-heading">
                        Four Principles,
                        <br />
                        No Compromise
                    </h2>
                </div>

                {/* Values grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
                    {VALUES.map((value, i) => (
                        <ValueCard key={value.number} value={value} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
