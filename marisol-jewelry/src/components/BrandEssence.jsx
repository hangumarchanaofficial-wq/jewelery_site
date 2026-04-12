import useScrollReveal from "../hooks/useScrollReveal";
import SmartImage from "./SmartImage";
import BrandLogo from "./BrandLogo";

export default function BrandEssence() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section
            id="about"
            className="relative py-[clamp(100px,14vw,180px)] bg-deep-blue overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.12] z-[1]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            <div className="mx-auto max-w-[1340px] px-6 md:px-10 lg:px-15 relative z-[2]">
                <div
                    ref={ref}
                    className={`text-center max-w-[760px] mx-auto transition-all duration-1000 ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="w-14 h-14 mx-auto mb-8 opacity-85 text-silver-light">
                        <BrandLogo className="w-full h-full" color="currentColor" />
                    </div>

                    <p className="font-body text-[0.65rem] font-medium tracking-[0.35em] uppercase text-silver mb-5">
                        Our Philosophy
                    </p>

                    <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-light text-ecru leading-[1.25] mb-5">
                        Heavenly Luxury, crafted with nature.
                    </h2>

                    <div className="w-12 h-px mx-auto bg-gradient-to-r from-silver via-ecru to-silver mb-7" />

                    <p className="font-heading text-[clamp(1.05rem,1.5vw,1.25rem)] font-light text-ecru/75 leading-[2] mb-12">
                        <span className="uppercase tracking-[0.12em] text-silver-light/95">
                            Aphrodite
                        </span>{" "}
                        is named after the Greek goddess of love, beauty, and passion. We at
                        Aphrodite bring the very luxury once glorious in ancient Greece into the
                        modern world — yet keep the greatness of elegance. Every Aphrodite piece is
                        timeless luxury.
                    </p>

                    <p className="font-heading text-base italic text-silver tracking-[0.1em]">
                        — The House of Aphrodite
                    </p>
                </div>
            </div>
        </section>
    );
}
