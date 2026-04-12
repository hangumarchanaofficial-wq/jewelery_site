import useScrollReveal from "../../hooks/useScrollReveal";

export default function QuickInquiry() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-ecru-warm px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
                {/* Header */}
                <div
                    className={`
            mb-12 transition-all duration-[1000ms] ease-luxury
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          `}
                >
          <span className="mb-4 block tracking-[0.3em] text-burgundy font-body text-[11px] uppercase">
            Quick Connect
          </span>
                    <h2 className="mb-4 font-heading text-[clamp(1.4rem,3vw,2rem)] font-light text-deep-blue">
                        Prefer a Direct Message?
                    </h2>
                    <p className="mx-auto max-w-md font-body text-[14px] font-light leading-relaxed text-soft-black/80">
                        If you have a brief question or simply wish to say hello,
                        reach us instantly through your preferred channel.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div
                    className={`
            flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8
            transition-all duration-[1000ms] delay-300 ease-luxury
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          `}
                >
                    {/* Email Button */}
                    <a
                        href="mailto:atelier@aphrodite.com?subject=Inquiry%20from%20Aphrodite%20Website"
                        className="
              group relative flex items-center gap-3 overflow-hidden rounded-sm
              border border-burgundy bg-transparent px-10 py-4
              font-body text-[12px] tracking-[0.25em] uppercase text-burgundy
              transition-all duration-700 ease-luxury
              hover:bg-burgundy hover:text-ecru hover:shadow-[0_8px_30px_rgba(26,39,68,0.2)]
            "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            className="h-4 w-4 transition-colors duration-700"
                        >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M22 4L12 13L2 4" />
                        </svg>
                        <span>Email Us</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/14155550178?text=Hello%20Aphrodite%2C%20I%20have%20a%20question."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              group relative flex items-center gap-3 overflow-hidden rounded-sm
              border border-silver/35 bg-transparent px-10 py-4
              font-body text-[12px] tracking-[0.25em] uppercase text-deep-blue
              transition-all duration-700 ease-luxury
              hover:bg-deep-blue hover:text-ecru hover:border-deep-blue hover:shadow-[0_6px_25px_rgba(0,0,0,0.2)]
            "
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 transition-colors duration-700">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.587l-.377-.23-2.647.887.887-2.647-.23-.377A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                        <span>WhatsApp Us</span>
                    </a>
                </div>

                {/* Availability Note */}
                <p
                    className={`
            mt-10 font-body text-[12px] font-light text-soft-black/70
            transition-all duration-[1000ms] delay-500 ease-luxury
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
                >
                    Our concierge team responds within 2 hours during business hours
                </p>
            </div>
        </section>
    );
}
