import useScrollReveal from "../hooks/useScrollReveal";

export default function BrandEssence() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section
            id="about"
            className="relative py-[clamp(100px,14vw,180px)] bg-deep-blue overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.12] z-[1]">
                <img
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            <div className="mx-auto max-w-[1340px] px-6 md:px-10 lg:px-15 relative z-[2]">
                <div
                    ref={ref}
                    className={`text-center max-w-[720px] mx-auto transition-all duration-1000 ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    {/* Diamond Icon */}
                    <div className="w-12 h-12 mx-auto mb-8 opacity-60">
                        <svg
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 4 L44 24 L24 44 L4 24 Z"
                                stroke="#D4D4D4"
                                strokeWidth="0.8"
                                fill="none"
                            />
                            <path
                                d="M24 12 L36 24 L24 36 L12 24 Z"
                                stroke="#D4D4D4"
                                strokeWidth="0.5"
                                fill="none"
                            />
                        </svg>
                    </div>

                    {/* Label */}
                    <p className="font-body text-[0.65rem] font-medium tracking-[0.35em] uppercase text-silver mb-5">
                        Our Philosophy
                    </p>

                    {/* Title */}
                    <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-light text-ecru leading-[1.25] mb-5">
                        Crafted by Nature,
                        <br />
                        Perfected by Hand
                    </h2>

                    {/* Divider */}
                    <div className="w-12 h-px mx-auto bg-gradient-to-r from-silver via-ecru to-silver mb-7" />

                    {/* Text */}
                    <p className="font-heading text-[clamp(1.05rem,1.5vw,1.25rem)] font-light text-ecru/75 leading-[2] mb-12">
                        At Marisol, we believe that true luxury is born from patience and
                        reverence. Every stone is ethically sourced, every metal responsibly
                        refined. Our artisans work with the quiet discipline of generations
                        — shaping, polishing, and setting each piece until it carries the
                        unmistakable weight of something real. We do not follow seasons. We
                        create heirlooms.
                    </p>

                    {/* Signature */}
                    <p className="font-heading text-base italic text-silver tracking-[0.1em]">
                        — The House of Marisol
                    </p>
                </div>
            </div>
        </section>
    );
}
