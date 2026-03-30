import useScrollReveal from "../../hooks/useScrollReveal";
import atelierImage from "../../assets/fallbacks/atelier.jpg";
import necklaceImage from "../../assets/fallbacks/necklace.jpg";
import oceanImage from "../../assets/fallbacks/ocean.jpg";
import ringImage from "../../assets/fallbacks/ring.jpg";
import SmartImage from "../SmartImage";

const VISUALS = [
    {
        src: atelierImage,
        alt: "Inside the atelier with tools, textures, and materials gathered for handcraft",
        title: "Inside the Atelier",
        note: "Where every piece begins with touch, weight, and light.",
        className: "lg:col-span-8",
        aspect: "aspect-[16/10]",
        imageClassName: "object-center",
    },
    {
        src: oceanImage,
        alt: "Morning shoreline with pale sea light and gentle surf",
        title: "Coastal Reference",
        note: "The sea remains the first reference for color and calm.",
        className: "lg:col-span-4",
        aspect: "aspect-[4/5]",
        imageClassName: "object-center",
    },
    {
        src: necklaceImage,
        alt: "Necklace detail photographed in warm golden light",
        title: "Metal and Motion",
        note: "Curves that hold warmth without losing restraint.",
        className: "lg:col-span-5",
        aspect: "aspect-[5/6]",
        imageClassName: "object-[50%_34%]",
    },
    {
        src: ringImage,
        alt: "Diamond ring resting on a dark surface with precise highlights",
        title: "Final Setting",
        note: "Precision arrives last, after proportion feels inevitable.",
        className: "lg:col-span-7",
        aspect: "aspect-[16/10]",
        imageClassName: "object-center",
    },
];

function VisualCard({ visual, index }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });

    return (
        <figure
            ref={ref}
            className={`transition-all duration-[1400ms] ease-luxury ${
                visual.className
            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${120 + index * 120}ms` }}
        >
            <div className={`${visual.aspect} overflow-hidden bg-[#e9e0d3]`}>
                <SmartImage
                    src={visual.src}
                    alt={visual.alt}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-luxury hover:scale-[1.02] ${visual.imageClassName}`}
                />
            </div>

            <figcaption className="pt-5 md:pt-6">
                <p className="font-heading text-[1.2rem] md:text-[1.45rem] leading-none text-burgundy">
                    {visual.title}
                </p>
                <p className="mt-2 max-w-[32rem] font-body text-[0.78rem] uppercase tracking-[0.22em] text-soft-black/58">
                    {visual.note}
                </p>
            </figcaption>
        </figure>
    );
}

export default function VisualStory() {
    const [introRef, introVisible] = useScrollReveal();

    return (
        <section className="bg-ecru-warm py-[clamp(92px,10vw,138px)]">
            <div className="container-luxury">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
                    <div
                        ref={introRef}
                        className={`lg:col-span-4 lg:pt-5 transition-all duration-[1200ms] ease-luxury ${
                            introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <p className="font-body text-[0.74rem] font-medium uppercase tracking-[0.42em] text-soft-black/50">
                            The World of Marisol
                        </p>

                        <h2 className="mt-6 max-w-[7ch] font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.03em] text-burgundy">
                            Moments of Making
                        </h2>

                        <div className="mt-7 h-px w-20 bg-gradient-to-r from-burgundy/70 to-burgundy/10" />

                        <p className="mt-8 max-w-[24rem] font-body text-[1rem] font-light leading-[1.95] text-soft-black/70">
                            Marisol is shaped by a small sequence of quiet moments:
                            material gathered, light observed, form tested, and only then
                            the final setting.
                        </p>

                        <p className="mt-10 max-w-[21rem] font-heading text-[1.05rem] font-light italic leading-[1.9] text-burgundy/72">
                            "The most important decisions are made before the stone is ever set."
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid gap-7 md:gap-8 lg:grid-cols-12">
                            {VISUALS.map((visual, index) => (
                                <VisualCard key={visual.title} visual={visual} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
