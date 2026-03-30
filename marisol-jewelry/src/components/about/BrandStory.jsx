import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

const CHAPTERS = [
    {
        label: "Chapter One",
        title: "A Coast, a Calling",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&auto=format&fit=crop",
        imageAlt: "Cinque Terre coastline at golden hour with cliffs meeting the Ligurian sea",
        quote:
            "It began with a single winter on the Ligurian coast — three months of silence, sea air, and the rhythmic patience of waves carving stone.",
        body: "In 2019, Elara Montclair left a decade-long career in Parisian haute joaillerie to find something she had lost: the reason she had fallen in love with jewelry in the first place. She rented a stone cottage in Manarola, overlooking the Mediterranean, and spent the winter sketching forms the water seemed to suggest — spirals of current, the geometry of light through a swell, the way a tide pool holds its treasures with quiet grace. By spring, the first seven sketches had become the first seven pieces. They were shown privately in a single room in Genoa, lit by candles and the sound of the sea through open windows. Every piece sold that evening. Marisol was born.",
        reverse: false,
    },
    {
        label: "Chapter Two",
        title: "The Atelier by the Sea",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop",
        imageAlt: "Close-up of artisan hands working at a jeweler's bench under warm light",
        quote:
            "Our atelier sits where the mountains meet the coast — a place where the air carries salt and the light is never the same twice.",
        body: "Today, Marisol's atelier occupies a converted fisherman's warehouse in the hills above Portofino. The stone walls are original; the windows face the sea. A team of five master artisans works here — each trained in the Ligurian tradition of hand-forging, a technique that shapes metal without casting, producing pieces with a density and warmth that machine-made jewelry cannot replicate. The atelier operates at a deliberately unhurried pace. A single piece may take three to eight weeks to complete. There are no production schedules, no seasonal quotas. Each creation is finished when the artisan feels it is ready — and not a moment before.",
        reverse: true,
    },
    {
        label: "Chapter Three",
        title: "Stone, Metal, Meaning",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&auto=format&fit=crop",
        imageAlt: "Precious gemstones and gold pieces arranged on a natural stone surface",
        quote:
            "We do not choose stones for their price. We choose them for their ability to hold light the way the sea holds sunrise.",
        body: "Every material in a Marisol piece is sourced with the same intention as the design itself. Our gold comes from a single Swiss refinery that works exclusively with recycled precious metals — gold and platinum recovered from existing sources rather than newly mined. Our gemstones are sourced through direct relationships with small-scale miners in Sri Lanka, Colombia, Mozambique, and French Polynesia. We visit each origin personally, selecting stones not by spreadsheet but by holding them to the window and watching how they respond to natural light. This process is slower and more expensive than conventional sourcing, but it produces pieces with provenance you can feel.",
        reverse: false,
    },
];

function StoryChapter({ chapter, index }) {
    const [imageRef, imageVisible] = useScrollReveal();
    const [textRef, textVisible] = useScrollReveal();

    const imageBlock = (
        <div
            ref={imageRef}
            className={`transition-all duration-[1400ms] ease-luxury
        ${imageVisible ? "opacity-100 translate-x-0" : `opacity-0 ${chapter.reverse ? "translate-x-10" : "-translate-x-10"}`}`}
        >
            <div className="relative overflow-hidden group">
                <div className="aspect-[4/5] lg:aspect-[3/4] bg-ecru-warm overflow-hidden">
                    <SmartImage
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-luxury
              group-hover:scale-[1.03]"
                    />
                </div>
                {/* Chapter number overlay */}
                <div className="absolute top-6 left-6">
          <span className="font-heading text-[4rem] md:text-[5rem] font-light text-ecru/10 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
                </div>
            </div>
        </div>
    );

    const textBlock = (
        <div
            ref={textRef}
            className={`flex items-center transition-all duration-[1400ms] ease-luxury
        ${textVisible ? "opacity-100 translate-x-0" : `opacity-0 ${chapter.reverse ? "-translate-x-10" : "translate-x-10"}`}`}
            style={{ transitionDelay: "200ms" }}
        >
            <div className="py-4 lg:py-0">
                <p className="font-body text-label font-medium tracking-editorial uppercase text-burgundy-light mb-5">
                    {chapter.label}
                </p>

                <h2 className="font-heading text-editorial-title font-light text-burgundy leading-heading mb-6">
                    {chapter.title}
                </h2>

                <div className="w-10 h-px divider-burgundy-silver mb-8" />

                <blockquote className="font-heading text-body-serif font-light italic text-soft-black/75 leading-prose mb-8 max-w-[460px]">
                    "{chapter.quote}"
                </blockquote>

                <p className="font-body text-[0.82rem] font-light text-silver-dark leading-editorial max-w-[480px]">
                    {chapter.body}
                </p>
            </div>
        </div>
    );

    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[clamp(48px,6vw,80px)] items-center
        mb-[clamp(80px,12vw,140px)] last:mb-0`}
        >
            {chapter.reverse ? (
                <>
                    <div className="order-2 lg:order-1">{textBlock}</div>
                    <div className="order-1 lg:order-2">{imageBlock}</div>
                </>
            ) : (
                <>
                    {imageBlock}
                    {textBlock}
                </>
            )}
        </div>
    );
}

export default function BrandStory() {
    return (
        <section className="section-padding-lg bg-ecru-light">
            <div className="container-luxury">
                {CHAPTERS.map((chapter, i) => (
                    <StoryChapter key={chapter.title} chapter={chapter} index={i} />
                ))}
            </div>
        </section>
    );
}
