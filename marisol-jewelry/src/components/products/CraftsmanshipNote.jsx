import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function CraftsmanshipNote() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });

    return (
        <section className="relative bg-ecru-warm overflow-hidden">
            {/* Two-column editorial: Image + Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* Left: Full-height image */}
                <div className="relative overflow-hidden min-h-[350px] lg:min-h-[unset]">
                    <SmartImage
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1000&q=85&auto=format&fit=crop"
                        alt="Artisan hands carefully setting a gemstone under warm atelier light"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Soft edge fade into text column */}
                    <div
                        className="hidden lg:block absolute inset-y-0 right-0 w-32"
                        style={{
                            background:
                                "linear-gradient(to right, transparent, var(--color-ecru-warm))",
                        }}
                    />
                    {/* Bottom fade on mobile */}
                    <div
                        className="lg:hidden absolute inset-x-0 bottom-0 h-24"
                        style={{
                            background:
                                "linear-gradient(to top, var(--color-ecru-warm), transparent)",
                        }}
                    />
                </div>

                {/* Right: Craftsmanship text */}
                <div
                    ref={ref}
                    className="flex items-center px-8 md:px-12 lg:px-[clamp(48px,5vw,80px)]
            py-16 lg:py-[clamp(60px,8vw,100px)]"
                >
                    <div
                        className={`max-w-[480px] transition-all duration-[1400ms] ease-luxury
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                    >
                        {/* Decorative diamond */}
                        <div className="w-8 h-8 mb-8 opacity-30">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1 L31 16 L16 31 L1 16 Z" stroke="#6B1D2A" strokeWidth="0.8" />
                                <path d="M16 8 L24 16 L16 24 L8 16 Z" stroke="#6B1D2A" strokeWidth="0.4" />
                            </svg>
                        </div>

                        <p className="font-body text-label font-medium tracking-editorial uppercase text-burgundy-light mb-6">
                            A Note on Craftsmanship
                        </p>

                        <h2 className="font-heading text-editorial-title font-light text-burgundy leading-heading mb-6">
                            Made Once,<br />
                            Meant Forever
                        </h2>

                        <div className="w-10 h-px divider-burgundy-silver mb-8" />

                        <p className="font-heading text-body-serif font-light italic text-soft-black/75 leading-prose mb-6">
                            Every piece you see in this collection was shaped by hand in our
                            Ligurian atelier — where the sound of the Mediterranean carries
                            through open windows and every gesture is unhurried.
                        </p>

                        <p className="font-body text-[0.82rem] font-light text-silver-dark leading-editorial mb-10">
                            We source our stones from ethical mines in Colombia, Mozambique,
                            and Sri Lanka. Our metals are refined from recycled precious alloys.
                            Each finished piece undergoes forty hours of hand-polishing before
                            it is signed, numbered, and placed in its provenance case. Nothing
                            is rushed. Nothing is repeated.
                        </p>

                        {/* Signature */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-px bg-burgundy/20" />
                            <span className="font-heading text-sm italic text-silver-dark tracking-tight-luxury">
                The Aphrodite Atelier
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
