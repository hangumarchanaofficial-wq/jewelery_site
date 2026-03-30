import useScrollReveal from "../../../hooks/useScrollReveal";
import SmartImage from "../../SmartImage";

export default function DetailImages({ images }) {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="py-[clamp(80px,10vw,130px)] bg-ecru-warm overflow-hidden">
            <div className="container-luxury">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`flex items-end justify-between mb-16 transition-all duration-[1200ms] ease-luxury
                        ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <div>
                        <p className="font-body text-label font-medium tracking-editorial uppercase text-burgundy mb-3">
                            Up Close
                        </p>
                        <h2 className="font-heading text-section-title font-light text-burgundy leading-heading">
                            The Details
                        </h2>
                    </div>
                    <div className="hidden md:block w-24 h-px bg-gradient-to-l from-transparent to-burgundy/30" />
                </div>

                {/* Editorial Grid */}
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {images.map((img, i) => (
                        <DetailCard key={i} image={img} index={i} total={images.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function DetailCard({ image, index, total }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });

    // Alternate layout: first card wide, rest equal; or all three equal
    const colSpan =
        total === 3
            ? index === 0
                ? "col-span-12 md:col-span-5"
                : index === 1
                ? "col-span-12 md:col-span-4"
                : "col-span-12 md:col-span-3"
            : "col-span-12 md:col-span-4";

    const aspectRatio =
        total === 3
            ? index === 0
                ? "aspect-[4/3]"
                : index === 1
                ? "aspect-[4/3]"
                : "aspect-[3/4]"
            : "aspect-[4/3]";

    return (
        <div
            ref={ref}
            className={`${colSpan} group transition-all duration-[1000ms] ease-luxury
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            {/* Image */}
            <div className={`relative overflow-hidden bg-ecru ${aspectRatio} mb-5`}>
                <SmartImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.05]"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Index number */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-body text-[0.55rem] font-medium tracking-[0.3em] uppercase text-ecru/80">
                        0{index + 1}
                    </span>
                </div>
            </div>

            {/* Caption */}
            <div className="flex items-start gap-3">
                <span className="font-body text-[0.55rem] font-medium tracking-[0.2em] uppercase text-burgundy/60 mt-1 shrink-0">
                    0{index + 1}
                </span>
                <div>
                    <p className="font-heading text-[1.05rem] font-light italic text-charcoal leading-snug">
                        {image.caption}
                    </p>
                    <div className="mt-2 w-6 h-px bg-burgundy/30 transition-all duration-500 group-hover:w-12 group-hover:bg-burgundy/60" />
                </div>
            </div>
        </div>
    );
}
