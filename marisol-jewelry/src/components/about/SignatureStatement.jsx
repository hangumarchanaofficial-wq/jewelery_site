import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function SignatureStatement() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <section className="relative py-[clamp(100px,16vw,200px)] bg-deep-blue overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.08] z-[1]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=75&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            {/* Grain */}
            <div className="absolute inset-0 z-[2] opacity-[0.03] grain-overlay pointer-events-none" />

            <div className="container-luxury relative z-[3]">
                <div
                    ref={ref}
                    className={`max-w-[780px] mx-auto text-center
            transition-all duration-[1600ms] ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                    {/* Opening diamond */}
                    <div className="flex justify-center mb-10">
                        <div className="w-6 h-6 opacity-30">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1 L23 12 L12 23 L1 12 Z" stroke="#D4D4D4" strokeWidth="0.6" />
                            </svg>
                        </div>
                    </div>

                    {/* Main quote */}
                    <blockquote
                        className="font-heading text-[clamp(1.3rem,2.6vw,2rem)] font-light italic text-ecru/70 leading-[1.8] mb-10"
                    >
                        We are not in the business of selling jewelry.
                        <br className="hidden md:block" />
                        We are in the practice of translating the natural world
                        <br className="hidden md:block" />
                        into objects worthy of being carried close to the heart.
                        <br />
                        <br />
                        Each piece is a conversation between hand and metal,
                        <br className="hidden md:block" />
                        stone and light, patience and intention.
                        <br className="hidden md:block" />
                        We do not follow seasons. We create heirlooms.
                    </blockquote>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-silver/25" />
                        <div className="w-1.5 h-1.5 rounded-full bg-silver/20" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-silver/25" />
                    </div>

                    {/* Attribution */}
                    <p className="font-heading text-[0.95rem] font-normal italic text-silver/50 tracking-tight-luxury mb-1">
                        Elara Montclair
                    </p>
                    <p className="font-body text-[0.6rem] font-medium tracking-editorial uppercase text-silver/30">
                        Founder & Creative Director
                    </p>
                </div>
            </div>
        </section>
    );
}
