import useScrollReveal from "../../hooks/useScrollReveal";

export default function ProductsHero() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    return (
        <section className="relative pt-40 pb-[clamp(60px,8vw,100px)] bg-ecru-light overflow-hidden">
            {/* Subtle decorative element — large faded diamond */}
            <div className="absolute top-20 right-[10%] w-[300px] h-[300px] opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M150 0 L300 150 L150 300 L0 150 Z" stroke="#b8c4d6" strokeWidth="1" />
                    <path d="M150 40 L260 150 L150 260 L40 150 Z" stroke="#b8c4d6" strokeWidth="0.5" />
                    <path d="M150 80 L220 150 L150 220 L80 150 Z" stroke="#b8c4d6" strokeWidth="0.3" />
                </svg>
            </div>

            <div className="container-luxury" ref={ref}>
                <div
                    className={`max-w-[640px] transition-all duration-[1200ms] ease-luxury
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    {/* Breadcrumb trail */}
                    <div className="flex items-center gap-3 mb-10">
                        <a
                            href="#/"
                            className="font-body text-label font-medium tracking-label uppercase text-silver-dark
                transition-colors duration-300 ease-smooth hover:text-burgundy"
                        >
                            Home
                        </a>
                        <span className="w-4 h-px bg-silver" />
                        <span className="font-body text-label font-medium tracking-label uppercase text-burgundy">
              Products
            </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-heading text-[clamp(2.6rem,5vw,4rem)] font-light text-burgundy leading-hero mb-6">
                        Fine Jewelry
                    </h1>

                    {/* Divider */}
                    <div className="w-14 h-px divider-burgundy-silver mb-8" />

                    {/* Description */}
                    <p className="font-heading text-body-serif font-light italic text-soft-black/70 leading-editorial max-w-[480px]">
                        Each piece in our collection is crafted by hand, shaped by nature,
                        and made to be cherished across generations.
                    </p>
                </div>
            </div>
        </section>
    );
}
