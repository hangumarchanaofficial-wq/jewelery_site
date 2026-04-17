// ============================================================
// MOBILE-OPTIMIZED SIGNATURE PIECES — Better grid & cards
// ============================================================
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";
import SmartImage from "./SmartImage";

const PIECES = [
    {
        id: "nec-003",
        name: "Horizon Collar",
        price: "$7,200",
        image: "https://images.pexels.com/photos/31757541/pexels-photo-31757541.jpeg?auto=compress&cs=tinysrgb&w=1920",
        alt: "Horizon collar necklace in platinum with sapphire gradient",
        featured: true,
    },
    {
        id: "rin-001",
        name: "Marée Solitaire",
        price: "$4,800",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop",
        alt: "Marée solitaire ring in platinum with deep blue sapphire",
    },
    {
        id: "ear-001",
        name: "Ondine Drops",
        price: "$2,450",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop",
        alt: "Ondine drop earrings in white gold with aquamarine stones",
    },
    {
        id: "bra-001",
        name: "Marea Cuff",
        price: "$3,400",
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop",
        alt: "Marea cuff bracelet in gold with emerald cabochon",
    },
    {
        id: "nec-001",
        name: "Perla Strand",
        price: "$5,600",
        image: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=600&q=85&auto=format&fit=crop",
        alt: "Perla necklace — strand of South Sea pearls on rose gold",
    },
    {
        id: "rin-002",
        name: "Bosque Emerald",
        price: "$6,400",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop",
        alt: "Bosque ring in sculpted gold with Colombian emerald",
    },
    {
        id: "nec-002",
        name: "Rivage Chain",
        price: "$3,900",
        image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=600&q=85&auto=format&fit=crop",
        alt: "Rivage chain necklace in gold with champagne diamond accents",
    },
];

function ProductCard({ piece, index }) {
    const [ref, isVisible] = useScrollReveal();
    const delay = index * 120;

    if (piece.featured) {
        return (
            <div ref={ref} className="h-full">
                <div
                    className={`h-full transition-all duration-1000 ease-luxury
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${delay}ms` }}
                >
                    <a
                        href={`#/product/${piece.id}`}
                        className="group block w-full h-full relative overflow-hidden bg-ecru-warm min-h-[300px] sm:min-h-[350px] md:min-h-[520px] lg:h-full"
                        aria-label={`${piece.name}, ${piece.price}`}
                    >
                        <SmartImage
                            src={piece.image}
                            alt={piece.alt}
                            className="w-full h-full object-cover transition-transform duration-800 ease-luxury group-hover:scale-[1.06]"
                        />
                        <div
                            className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-[2]"
                            style={{
                                background: "linear-gradient(to top, rgba(26,26,26,0.70) 0%, transparent 100%)",
                            }}
                        >
                            <h3 className="font-heading text-[1.15rem] sm:text-[1.4rem] font-normal text-ecru mb-1 tracking-[0.02em]">
                                {piece.name}
                            </h3>
                            <span className="font-body text-[0.65rem] sm:text-[0.72rem] font-normal tracking-[0.15em] uppercase text-silver-light">
                                {piece.price}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} className="h-full">
            <div
                className={`h-full flex flex-col transition-all duration-1000 ease-luxury
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                <a
                    href={`#/product/${piece.id}`}
                    className="group block h-full"
                    aria-label={`${piece.name}, ${piece.price}`}
                >
                    <div className="relative overflow-hidden bg-ecru-warm aspect-[4/3] sm:aspect-[5/4] lg:flex-1 lg:min-h-0">
                        <SmartImage
                            src={piece.image}
                            alt={piece.alt}
                            className="w-full h-full object-cover transition-transform duration-800 ease-luxury group-hover:scale-[1.06]"
                        />
                    </div>
                    <div className="pt-2.5 sm:pt-3 pb-1 px-0.5 sm:px-1 min-h-[56px] sm:min-h-[64px] lg:min-h-[70px]">
                        <h3 className="font-heading text-[0.92rem] sm:text-[1.02rem] lg:text-[1.05rem] font-normal text-soft-black mb-0.5 sm:mb-1 tracking-[0.02em] min-h-[2rem] sm:min-h-[2.4rem]">
                            {piece.name}
                        </h3>
                        <span className="font-body text-[0.62rem] sm:text-[0.68rem] font-normal tracking-[0.14em] uppercase text-silver-dark">
                            {piece.price}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default function SignaturePieces() {
    const featuredPiece = PIECES.find((piece) => piece.featured);
    const supportingPieces = PIECES.filter((piece) => !piece.featured);

    return (
        <section
            id="collection"
            className="bg-ecru-light pb-[clamp(56px,10vw,140px)] pt-[clamp(72px,11vw,148px)]"
        >
            <div className="mx-auto max-w-[1340px] px-5 sm:px-6 md:px-10 lg:px-15">
                <SectionHeader
                    label="The Collection"
                    title="Signature Pieces"
                    className="mb-12 sm:mb-14 lg:mb-16"
                    description={
                        <>
                            <p className="m-0">
                                Each piece is uniquely crafted for a few of our prestigious clients,
                                who choose elegance and quiet luxury over common and loud statements.
                            </p>
                            <p className="m-0">
                                Our signature masterpieces choose their clients — with attitude and
                                class.
                            </p>
                        </>
                    }
                    center
                />

                <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-7 xl:gap-8">
                    <div className="lg:col-span-7 h-full">
                        {featuredPiece && <ProductCard key={featuredPiece.name} piece={featuredPiece} index={0} />}
                    </div>
                    <div className="lg:col-span-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-5 lg:gap-x-7 lg:gap-y-5 lg:h-full lg:auto-rows-fr content-start">
                        {supportingPieces.map((piece, index) => (
                            <ProductCard key={piece.name} piece={piece} index={index + 1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
