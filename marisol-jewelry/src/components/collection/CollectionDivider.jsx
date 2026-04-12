import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function CollectionDivider() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <section
            ref={ref}
            className="relative min-h-screen bg-deep-blue overflow-hidden flex items-center"
        >
            {/* Ocean background image */}
            <div className="absolute inset-0 opacity-30 z-[1]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=75&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            {/* Animated grain texture overlay */}
            <div
                className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            <div className="relative z-[3] mx-auto max-w-[1340px] px-page-gutter">
                <div
                    className={`max-w-[800px] mx-auto text-center transition-all duration-[1400ms] ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                    {/* Decorative diamond */}
                    <div className="flex items-center justify-center gap-6 mb-10">
                        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-silver/30" />
                        <svg
                            className="w-5 h-5 opacity-40"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 0 L20 10 L10 20 L0 10 Z" stroke="#D4D4D4" strokeWidth="0.6" fill="none" />
                        </svg>
                        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-silver/30" />
                    </div>

                    <p className="font-heading text-[clamp(1.1rem,2vw,1.5rem)] font-light italic text-ecru leading-[2] mb-10">
                        "Luxury is not in the weight of gold, but in the weight of meaning.<br className="hidden md:block" />
                        Every piece we create carries the intention of its making —<br className="hidden md:block" />
                        unhurried, unrepeatable, and wholly yours."
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-px bg-silver/20" />
                        <span className="font-body text-[0.58rem] font-medium tracking-[0.3em] uppercase text-silver/80">
              Aphrodite Atelier &middot; Est. 2019
            </span>
                        <div className="w-8 h-px bg-silver/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}
