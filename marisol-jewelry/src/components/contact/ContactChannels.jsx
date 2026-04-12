import useScrollReveal from "../../hooks/useScrollReveal";

const CHANNELS = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
            </svg>
        ),
        label: "Email",
        value: "atelier@aphrodite.com",
        href: "mailto:atelier@aphrodite.com",
        description: "For detailed inquiries & bespoke requests",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
        label: "Telephone",
        value: "+1 (415) 555‑0178",
        href: "tel:+14155550178",
        description: "Monday – Saturday, 10 am – 6 pm PST",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.587l-.377-.23-2.647.887.887-2.647-.23-.377A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
        ),
        label: "WhatsApp",
        value: "Message Us",
        href: "https://wa.me/14155550178?text=Hello%20Aphrodite%2C%20I%E2%80%99d%20like%20to%20inquire%20about%20a%20piece.",
        description: "Instant connection with our concierge team",
    },
];

export default function ContactChannels() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-ecru-warm px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                {/* Section Label */}
                <div
                    className={`
            mb-16 text-center transition-all duration-[1000ms] ease-luxury
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          `}
                >
          <span className="mb-4 block tracking-[0.3em] text-burgundy/80 font-body text-[11px] uppercase">
            Reach Our Atelier
          </span>
                    <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.4rem)] font-light text-deep-blue leading-tight">
                        How to Connect
                    </h2>
                    <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-silver to-transparent" />
                </div>

                {/* Channels Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {CHANNELS.map((channel, i) => (
                        <a
                            key={channel.label}
                            href={channel.href}
                            target={channel.label === "WhatsApp" ? "_blank" : undefined}
                            rel={channel.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                            className={`
                group flex flex-col items-center rounded-sm border border-silver/20 bg-ecru-light/35
                p-10 text-center backdrop-blur-sm
                transition-all duration-700 ease-luxury
                hover:border-silver/40 hover:bg-ecru-light/55 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                ${isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                            }
              `}
                            style={{ transitionDelay: isVisible ? `${300 + i * 150}ms` : "0ms" }}
                        >
                            {/* Icon */}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-silver/30 text-burgundy/70 transition-colors duration-500 group-hover:border-burgundy/40 group-hover:text-burgundy">
                                {channel.icon}
                            </div>

                            {/* Label */}
                            <span className="mb-2 tracking-[0.25em] text-burgundy/80 font-body text-[10px] uppercase">
                {channel.label}
              </span>

                            {/* Value */}
                            <span className="mb-3 font-heading text-xl font-light text-deep-blue">
                {channel.value}
              </span>

                            {/* Description */}
                            <p className="font-body text-[13px] font-light leading-relaxed text-soft-black/80">
                                {channel.description}
                            </p>

                            {/* Hover Arrow */}
                            <div className="mt-5 flex items-center gap-2 text-burgundy/0 transition-all duration-500 group-hover:text-burgundy/60">
                                <div className="h-px w-0 bg-burgundy/40 transition-all duration-500 group-hover:w-6" />
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
