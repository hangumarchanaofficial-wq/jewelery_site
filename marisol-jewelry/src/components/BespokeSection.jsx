import useScrollReveal from "../hooks/useScrollReveal";

const BESPOKE_PIECES = [
    {
        label: "Bespoke Creation",
        title: "The Perla Necklace",
        story: `"She wanted something that carried the memory of Santorini mornings — the way light scattered across the Aegean, the warmth of salt air against sun-kissed skin."`,
        detail:
            "Commissioned for a private collector, The Perla is a one-of-a-kind strand of South Sea pearls, hand-selected over fourteen months, each chosen for its unique lustre and oceanic depth. Set in 18k rose gold with an ethically sourced sapphire clasp, this piece is a love letter to the Mediterranean.",
        image:
            "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=85&auto=format&fit=crop",
        alt: "Custom pearl necklace resting on natural stone by the ocean",
        reverse: false,
    },
    {
        label: "Bespoke Creation",
        title: "The Bosque Ring",
        story: `"He described walking through an ancient forest in the rain — the way every shade of green seemed to hold a secret. He wanted that mystery captured in a single stone."`,
        detail:
            "Carved from a rare 4.7-carat Colombian emerald, The Bosque sits in a sculptural platinum band inspired by intertwined branches. The setting was designed over six months, with every curve hand-finished by our master jeweler in Antwerp. A piece that breathes with the spirit of the wild.",
        image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85&auto=format&fit=crop",
        alt: "Emerald ring with forest green hues set in platinum",
        reverse: true,
    },
];

function BespokePiece({ piece }) {
    const [imageRef, imageVisible] = useScrollReveal();
    const [contentRef, contentVisible] = useScrollReveal();

    const imageBlock = (
        <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ease-luxury
        ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            {/* Decorative accent line */}
            <div
                className="hidden md:block absolute -top-10 left-1/2 w-px h-20 z-[2]"
                style={{
                    background:
                        "linear-gradient(to bottom, var(--color-burgundy), transparent)",
                }}
            />

            <div className="relative overflow-hidden aspect-[4/5] bg-ecru group">
                <img
                    src={piece.image}
                    alt={piece.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-luxury
            group-hover:scale-[1.04]"
                />
            </div>
        </div>
    );

    const contentBlock = (
        <div
            ref={contentRef}
            className={`py-5 md:py-[clamp(20px,4vw,60px)] transition-all duration-1000 ease-luxury
        ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "150ms" }}
        >
            {/* Label */}
            <p className="font-body text-[0.65rem] font-medium tracking-[0.35em] uppercase text-burgundy-light mb-5">
                {piece.label}
            </p>

            {/* Title */}
            <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-light text-burgundy leading-[1.25] mb-5">
                {piece.title}
            </h2>

            {/* Divider */}
            <div className="w-12 h-px bg-gradient-to-r from-burgundy to-silver mb-7" />

            {/* Story quote */}
            <p className="font-heading text-[clamp(1.05rem,1.4vw,1.2rem)] font-light italic text-soft-black/85 leading-[1.9] mb-8">
                {piece.story}
            </p>

            {/* Detail */}
            <p className="font-body text-[0.82rem] font-light text-silver-dark leading-[1.9] mb-10">
                {piece.detail}
            </p>

            {/* Link */}
            <a
                href="#"
                className="group/link inline-flex items-center gap-3 font-body text-[0.7rem]
          font-medium tracking-label uppercase text-burgundy
          transition-[gap] duration-300 ease-smooth hover:gap-5"
            >
                Discover the Story
                <span
                    className="block w-8 h-px bg-burgundy transition-[width] duration-300 ease-smooth
            group-hover/link:w-12"
                />
            </a>
        </div>
    );

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[clamp(40px,6vw,80px)] items-center
        mb-[clamp(80px,10vw,120px)] last:mb-0`}
        >
            {piece.reverse ? (
                <>
                    <div className="order-2 md:order-1">{contentBlock}</div>
                    <div className="order-1 md:order-2">{imageBlock}</div>
                </>
            ) : (
                <>
                    {imageBlock}
                    {contentBlock}
                </>
            )}
        </div>
    );
}

export default function BespokeSection() {
    return (
        <section id="products" className="py-[clamp(80px,10vw,140px)] bg-ecru-warm">
            <div className="mx-auto max-w-[1340px] px-6 md:px-10 lg:px-15">
                {BESPOKE_PIECES.map((piece) => (
                    <BespokePiece key={piece.title} piece={piece} />
                ))}
            </div>
        </section>
    );
}
