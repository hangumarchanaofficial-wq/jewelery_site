import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

const PIECES = [
    {
        name: "Ondine Necklace",
        subtitle: "18k Gold · Aquamarine · South Sea Pearl",
        description: "Cascading links that mirror the movement of current over coral. The centrepiece aquamarine was cut to catch light the way the sea holds sunrise.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop",
        alt: "Ondine necklace — gold chain with aquamarine pendant",
    },
    {
        name: "Marée Ring",
        subtitle: "Platinum · Blue Sapphire",
        description: "The band ripples like a tide pool's edge — hand-carved in platinum, holding a sapphire the colour of the ocean at depth.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop",
        alt: "Marée ring — platinum with deep blue sapphire",
    },
    {
        name: "Écume Earrings",
        subtitle: "18k White Gold · Diamonds · Pearl",
        description: "Seafoam frozen in white gold. Each earring is asymmetric by design — because no two waves ever break the same way.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop",
        alt: "Écume earrings — white gold drop earrings with pearl",
    },
    {
        name: "Rivage Bracelet",
        subtitle: "18k Rose Gold · Champagne Diamonds",
        description: "Inspired by the line where sand meets sea at dusk. Rose gold links graduate from matte to polished — shoreline to shallows.",
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=85&auto=format&fit=crop",
        alt: "Rivage bracelet — rose gold chain with champagne diamonds",
    },
    {
        name: "Abyssal Pendant",
        subtitle: "Oxidised Silver · Tahitian Pearl",
        description: "From the deepest register of the collection — a Tahitian pearl suspended in blackened silver, like moonlight held beneath the surface.",
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85&auto=format&fit=crop",
        alt: "Abyssal pendant — dark silver chain with Tahitian pearl",
    },
    {
        name: "Littoral Cuff",
        subtitle: "18k Gold · Emerald Cabochon",
        description: "A single emerald sits in an organically sculpted gold cuff — as if the stone grew there naturally, shaped by centuries of tide.",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop",
        alt: "Littoral cuff — gold bangle with green emerald",
    },
];

function PieceCard({ piece, index }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
    const delay = (index % 3) * 180;

    return (
        <div ref={ref} className="group cursor-pointer">
            <div
                className={`transition-all duration-[1200ms] ease-luxury
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {/* Image */}
                <div className="relative overflow-hidden bg-ecru-warm mb-6 aspect-[4/5]">
                    <SmartImage
                        src={piece.image}
                        alt={piece.alt}
                        className="w-full h-full object-cover transition-transform duration-[1000ms] ease-luxury
              group-hover:scale-[1.05]"
                    />

                    {/* Hover overlay — subtle info reveal */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-smooth"
                    />

                    {/* Hover action hint */}
                    <div
                        className="absolute bottom-6 left-6 right-6 flex items-center justify-between
              opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-500 ease-smooth"
                    >
            <span className="font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ecru/70">
              View Piece
            </span>
                        <svg
                            className="w-4 h-4 text-ecru/70"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Text info */}
                <div className="px-1">
                    <h3 className="font-heading text-[1.2rem] md:text-[1.35rem] font-normal text-deep-blue mb-1.5 tracking-[0.02em]">
                        {piece.name}
                    </h3>
                    <p className="font-body text-[0.65rem] font-medium tracking-[0.15em] uppercase mb-4 text-deep-blue/75">
                        {piece.subtitle}
                    </p>
                    <p className="font-heading text-[0.92rem] font-light italic text-deep-blue/75 leading-[1.8] max-w-[380px]">
                        {piece.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CollectionPieces() {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section
            id="collection-pieces"
            className="py-[clamp(100px,12vw,160px)] bg-ecru-light"
        >
            <div className="mx-auto max-w-[1340px] px-page-gutter">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-[600px] mx-auto mb-[clamp(56px,7vw,96px)]
            transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                    <p className="font-body text-[0.6rem] font-medium tracking-[0.4em] uppercase mb-6 text-deep-blue/65">
                        The Pieces
                    </p>
                    <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-light text-burgundy leading-[1.25] mb-5">
                        Seven Conversations<br />
                        With the Sea
                    </h2>
                    <div className="w-12 h-px mx-auto bg-gradient-to-r from-burgundy to-silver mb-7" />
                    <p className="font-body text-[0.85rem] font-light leading-[1.9] text-soft-black/85">
                        Each piece exists as a singular expression — numbered, signed,<br className="hidden md:block" />
                        and accompanied by its own provenance journal.
                    </p>
                </div>

                {/* Masonry-style editorial grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {PIECES.map((piece, index) => (
                        <PieceCard key={piece.name} piece={piece} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div
                    className={`text-center mt-[clamp(64px,8vw,100px)] transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: "400ms" }}
                >
                    <a
                        href="#"
                        className="group relative inline-block font-body text-[0.65rem] font-medium
              tracking-[0.3em] uppercase text-burgundy border border-burgundy/30
              px-6 sm:px-10 md:px-12 py-5 overflow-hidden transition-all duration-400 ease-smooth
              hover:text-ecru hover:border-burgundy"
                    >
            <span
                className="absolute inset-0 bg-burgundy -translate-x-full
                transition-transform duration-500 ease-luxury
                group-hover:translate-x-0"
            />
                        <span className="relative z-10">Request Private Viewing</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
