import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

const IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85&auto=format&fit=crop",
        alt: "Gold pendant catching light on a natural linen surface",
        span: "col-span-2 row-span-2",
        aspect: "aspect-[4/5]",
    },
    {
        src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=600&q=85&auto=format&fit=crop",
        alt: "Delicate chain necklace draped over ocean-worn driftwood",
        span: "",
        aspect: "aspect-square",
    },
    {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop",
        alt: "Pearl earrings on soft cashmere fabric",
        span: "",
        aspect: "aspect-square",
    },
    {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop",
        alt: "Sapphire ring reflecting deep blue on a marble surface",
        span: "col-span-2",
        aspect: "aspect-[16/9]",
    },
];

function StoryImage({ image, index }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });

    return (
        <div
            ref={ref}
            className={`overflow-hidden group ${image.span}`}
        >
            <div
                className={`${image.aspect} overflow-hidden bg-ecru-warm
          transition-all duration-[1400ms] ease-luxury
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
            >
                <SmartImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-luxury
            group-hover:scale-[1.04]"
                />
            </div>
        </div>
    );
}

export default function VisualStory() {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="py-[clamp(80px,10vw,120px)] bg-ecru-warm">
            <div className="container-luxury">
                {/* Section header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-[560px] mx-auto mb-[clamp(48px,6vw,72px)]
            transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <p className="font-body text-label font-medium tracking-editorial uppercase text-silver-dark mb-4">
                        The World of Marisol
                    </p>
                    <h2 className="font-heading text-section-title font-light text-burgundy leading-heading mb-5">
                        Moments of Making
                    </h2>
                    <div className="section-divider-center mb-6" />
                    <p className="font-body text-[0.85rem] font-light text-silver-dark leading-editorial">
                        Light, texture, and the quiet patience of hands at work —
                        glimpses from inside the atelier and the landscapes that inspire us.
                    </p>
                </div>

                {/* Staggered editorial grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                    {IMAGES.map((image, i) => (
                        <StoryImage key={i} image={image} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
