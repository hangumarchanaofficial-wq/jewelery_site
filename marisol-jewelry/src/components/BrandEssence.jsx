// ============================================================
// MOBILE-OPTIMIZED BRAND ESSENCE — Refined mobile typography
// ============================================================
import useScrollReveal from "../hooks/useScrollReveal";
import SmartImage from "./SmartImage";
import BrandLogo from "./BrandLogo";

export default function BrandEssence() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section id="about" className="relative py-[clamp(70px,14vw,180px)] bg-deep-blue overflow-hidden">
            <div className="absolute inset-0 opacity-[0.12] z-[1]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            <div className="mx-auto max-w-[1340px] px-5 sm:px-6 md:px-10 lg:px-15 relative z-[2]">
                <div
                    ref={ref}
                    className={`text-center max-w-[760px] mx-auto transition-all duration-1000 ease-luxury
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-6 sm:mb-8 opacity-85 text-silver-light">
                        <BrandLogo className="w-full h-full" color="currentColor" />
                    </div>

                    <p className="font-body text-[0.6rem] sm:text-[0.65rem] font-medium tracking-[0.35em] uppercase text-silver mb-4 sm:mb-5">
                        Our Philosophy
                    </p>

                    <h2 className="font-heading text-[clamp(1.6rem,3.5vw,3rem)] font-light text-ecru leading-[1.25] mb-4 sm:mb-5">
                        Heavenly Luxury, crafted with nature.
                    </h2>

                    <div className="w-12 h-px mx-auto bg-gradient-to-r from-silver via-ecru to-silver mb-5 sm:mb-7" />

                    <p className="font-heading text-[clamp(0.95rem,1.5vw,1.25rem)] font-light text-ecru/75 leading-[1.85] sm:leading-[2] mb-8 sm:mb-12">
                        <span className="uppercase tracking-[0.12em] text-silver-light/95">
                            Aphrodite
                        </span>{" "}
                        is named after the Greek goddess of love, beauty, and passion. We at
                        Aphrodite bring the very luxury once glorious in ancient Greece into the
                        modern world — yet keep the greatness of elegance. Every Aphrodite piece is
                        timeless luxury.
                    </p>

                    <p className="font-heading text-[0.9rem] sm:text-base italic text-silver tracking-[0.1em]">
                        — The House of Aphrodite
                    </p>
                </div>
            </div>
        </section>
    );
}
