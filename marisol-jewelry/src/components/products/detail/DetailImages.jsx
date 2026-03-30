import useScrollReveal from "../../../hooks/useScrollReveal";
import SmartImage from "../../SmartImage";

export default function DetailImages({ images }) {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="py-[clamp(80px,10vw,120px)] bg-ecru-warm overflow-hidden">
            <div className="container-luxury">
                {/* Section label */}
                <div
                    ref={headerRef}
                    className={`mb-12 transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="font-body text-label font-medium tracking-editorial uppercase text-burgundy-light mb-3">
                        Up Close
                    </p>
                    <h2 className="font-heading text-section-title font-light text-burgundy leading-heading">
                        The Details
                    </h2>
                </div>
            </div>

            {/* Horizontal scroll strip */}
            <div
                className="flex gap-5 md:gap-7 overflow-x-auto scrollbar-none
          pl-[max(1.5rem,calc((100vw-1340px)/2+1.5rem))]
          pr-6 pb-2"
            >
                {images.map((img, i) => (
                    <DetailCard key={i} image={img} index={i} />
                ))}
            </div>
        </section>
    );
}

function DetailCard({ image, index }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`shrink-0 w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] max-w-[450px]
        transition-all duration-[1200ms] ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="relative overflow-hidden bg-ecru aspect-[4/3] mb-5 group">
                <SmartImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-luxury
            group-hover:scale-[1.04]"
                />
            </div>
            <p className="font-heading text-[1rem] font-normal italic text-soft-black/70 tracking-[0.02em]">
                {image.caption}
            </p>
        </div>
    );
}
