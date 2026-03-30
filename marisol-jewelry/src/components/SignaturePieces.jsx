import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";
import SmartImage from "./SmartImage";

const PIECES = [
    {
        name: "Oceana Pendant",
        price: "From $4,200",
        image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop",
        alt: "Oceana Pendant Necklace with aquamarine stone",
        featured: true,
    },
    {
        name: "Coral Éternity Ring",
        price: "From $2,800",
        image:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop",
        alt: "Delicate rose gold band with coral-inspired design",
    },
    {
        name: "Lunaire Drop Earrings",
        price: "From $1,950",
        image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop",
        alt: "Moon-shaped silver drop earrings",
    },
    {
        name: "Marea Gold Bracelet",
        price: "From $3,400",
        image:
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop",
        alt: "Woven gold chain bracelet inspired by waves",
    },
];

function ProductCard({ piece, index }) {
    const [ref, isVisible] = useScrollReveal();
    const delay = index * 150;

    if (piece.featured) {
        return (
            <div
                ref={ref}
                className="col-span-2 row-span-2 max-lg:col-span-2 max-lg:row-span-1 max-md:col-span-1
          relative overflow-hidden cursor-pointer group"
                style={{
                    transitionDelay: `${delay}ms`,
                }}
            >
                <div
                    className={`transition-all duration-1000 ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${delay}ms` }}
                >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-ecru-warm h-full min-h-[350px] md:min-h-[560px]">
                        <SmartImage
                            src={piece.image}
                            alt={piece.alt}
                            className="w-full h-full object-cover transition-transform duration-800 ease-luxury
                group-hover:scale-[1.06]"
                        />

                        {/* Info overlay — positioned at bottom of image */}
                        <div
                            className="absolute bottom-0 left-0 right-0 p-8 z-[2]"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(26,26,26,0.65) 0%, transparent 100%)",
                            }}
                        >
                            <h3 className="font-heading text-[1.4rem] font-normal text-ecru mb-1.5 tracking-[0.02em]">
                                {piece.name}
                            </h3>
                            <span className="font-body text-[0.72rem] font-normal tracking-[0.15em] uppercase text-silver-light">
                {piece.price}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="relative overflow-hidden cursor-pointer group"
        >
            <div
                className={`transition-all duration-1000 ease-luxury
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {/* Image */}
                <div className="relative overflow-hidden bg-ecru-warm h-[280px] md:h-[320px]">
                    <SmartImage
                        src={piece.image}
                        alt={piece.alt}
                        className="w-full h-full object-cover transition-transform duration-800 ease-luxury
              group-hover:scale-[1.06]"
                    />
                </div>

                {/* Info below image */}
                <div className="pt-6 pb-2 px-1">
                    <h3 className="font-heading text-[1.15rem] font-normal text-soft-black mb-1.5 tracking-[0.02em]">
                        {piece.name}
                    </h3>
                    <span className="font-body text-[0.72rem] font-normal tracking-[0.15em] uppercase text-silver-dark">
            {piece.price}
          </span>
                </div>
            </div>
        </div>
    );
}

export default function SignaturePieces() {
    return (
        <section
            id="collection"
            className="py-[clamp(80px,10vw,140px)] bg-ecru-light"
        >
            <div className="mx-auto max-w-[1340px] px-6 md:px-10 lg:px-15">
                <SectionHeader
                    label="The Collection"
                    title="Signature Pieces"
                    description="Each creation is a meditation on nature's perfection — shaped by artisan hands, inspired by the eternal rhythm of the sea."
                    center
                />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PIECES.map((piece, index) => (
                        <ProductCard key={piece.name} piece={piece} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
