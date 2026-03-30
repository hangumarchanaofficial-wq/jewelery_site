import useScrollReveal from "../../../hooks/useScrollReveal";
import SmartImage from "../../SmartImage";

export default function RelatedPieces({ pieces }) {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="section-padding bg-ecru-light">
            <div className="container-luxury">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-[clamp(40px,5vw,64px)]
            transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="font-body text-label font-medium tracking-editorial uppercase text-silver-dark mb-4">
                        You May Also Admire
                    </p>
                    <h2 className="font-heading text-section-title font-light text-burgundy leading-heading mb-5">
                        Related Pieces
                    </h2>
                    <div className="section-divider-center" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {pieces.map((piece, i) => (
                        <RelatedCard key={piece.id} piece={piece} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RelatedCard({ piece, index }) {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div ref={ref}>
            <a
                href={`#/product/${piece.id}`}
                className={`block group transition-all duration-[1200ms] ease-luxury
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
            >
                {/* Image */}
                <div className="relative overflow-hidden bg-ecru-warm aspect-[3/4] mb-5">
                    <SmartImage
                        src={piece.image}
                        alt={piece.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-800 ease-luxury
              group-hover:scale-[1.05]"
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: "linear-gradient(to top, rgba(26,39,68,0.08) 0%, transparent 40%)",
                        }}
                    />
                </div>

                {/* Info */}
                <div className="px-0.5">
                    <h3
                        className="font-heading text-[1.15rem] font-normal text-soft-black tracking-[0.01em]
              transition-colors duration-300 group-hover:text-burgundy mb-1"
                    >
                        {piece.name}
                    </h3>
                    <p className="font-body text-[0.65rem] font-medium tracking-[0.15em] uppercase text-silver-dark mb-1">
                        {piece.material}
                    </p>
                    <span className="font-body text-price font-normal tracking-[0.1em] text-silver-dark/70">
            {piece.price}
          </span>
                </div>
            </a>
        </div>
    );
}
