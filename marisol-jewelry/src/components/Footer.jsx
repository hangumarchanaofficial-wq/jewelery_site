// ============================================================
// MOBILE-OPTIMIZED FOOTER — Clean stacking & tap targets
// ============================================================
import useScrollReveal from "../hooks/useScrollReveal";

const EXPLORE_LINKS = [
    { label: "About Us", href: "#/about" },
    { label: "Collection", href: "#/collection" },
    { label: "Products", href: "#/products" },
    { label: "Bespoke", href: "#" },
    { label: "Journal", href: "#" },
];

const CARE_LINKS = [
    { label: "Sizing Guide", href: "#" },
    { label: "Care Instructions", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
];

function FooterColumn({ children, delay = 0 }) {
    const [ref, isVisible] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function Footer() {
    return (
        <footer id="contact" className="bg-charcoal pt-[clamp(48px,8vw,100px)] pb-8 sm:pb-10">
            <div className="mx-auto max-w-[1340px] px-5 sm:px-6 md:px-10 lg:px-15">
                {/* Mobile: stacked column · lg+: 4-column row */}
                <div className="mb-12 grid grid-cols-1 gap-12 sm:mb-16 sm:gap-14 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-10 xl:gap-16">
                    <FooterColumn delay={0}>
                        <p className="font-heading text-[1.2rem] sm:text-[1.4rem] font-normal tracking-[0.3em] uppercase text-white mb-4 sm:mb-5">
                            Aphrodite
                        </p>
                        <p className="max-w-lg font-body text-[0.75rem] font-normal leading-[1.85] text-[#c8cdd8] sm:text-[0.8rem] sm:leading-[1.9] lg:max-w-[280px]">
                            Heavenly luxury, crafted with nature. Miracles of nature brought into a
                            masterpiece of luxury — timeless, elegant, and quietly bold.
                        </p>
                    </FooterColumn>

                    {/* Explore */}
                    <FooterColumn delay={100}>
                        <p className="font-body text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-label uppercase text-white mb-5 sm:mb-7">
                            Explore
                        </p>
                        <ul className="space-y-2.5 sm:space-y-3.5">
                            {EXPLORE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}
                                        className="font-body text-[0.78rem] sm:text-[0.82rem] font-normal text-[#c8c2b8]
                                            transition-colors duration-300 ease-smooth hover:text-white inline-block py-0.5 touch-manipulation"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </FooterColumn>

                    {/* Client Care */}
                    <FooterColumn delay={200}>
                        <p className="font-body text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-label uppercase text-white mb-5 sm:mb-7">
                            Client Care
                        </p>
                        <ul className="space-y-2.5 sm:space-y-3.5">
                            {CARE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}
                                        className="font-body text-[0.78rem] sm:text-[0.82rem] font-normal text-[#c8c2b8]
                                            transition-colors duration-300 ease-smooth hover:text-white inline-block py-0.5 touch-manipulation"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </FooterColumn>

                    <FooterColumn delay={300}>
                        <div>
                            <p className="font-body text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-label uppercase text-white mb-5 sm:mb-7">
                                Contact
                            </p>
                            <div className="space-y-2">
                                <p>
                                    <a href="mailto:atelier@aphrodite.com"
                                        className="font-body text-[0.78rem] sm:text-[0.82rem] font-normal text-[#c8c2b8]
                                            transition-colors duration-300 ease-smooth hover:text-white touch-manipulation"
                                    >
                                        atelier@aphrodite.com
                                    </a>
                                </p>
                                <p>
                                    <a href="tel:+14155550178"
                                        className="font-body text-[0.78rem] sm:text-[0.82rem] font-normal text-[#c8c2b8]
                                            transition-colors duration-300 ease-smooth hover:text-white touch-manipulation"
                                    >
                                        +1 (415) 555-0178
                                    </a>
                                </p>
                                <p className="font-body text-[0.78rem] sm:text-[0.82rem] font-normal text-white leading-[1.7] pt-1">
                                    By Appointment Only<br />
                                    San Francisco &middot; Paris
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-4 sm:gap-5 mt-6 sm:mt-7">
                                <a href="#" aria-label="Instagram"
                                    className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full
                                        border border-[#c8c2b8]/50 text-[#c8c2b8] transition-all duration-300 ease-smooth
                                        hover:border-white hover:text-white active:scale-95 touch-manipulation"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" />
                                        <circle cx="12" cy="12" r="5" />
                                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Pinterest"
                                    className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full
                                        border border-[#c8c2b8]/50 text-[#c8c2b8] transition-all duration-300 ease-smooth
                                        hover:border-white hover:text-white active:scale-95 touch-manipulation"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.12 2.5 7.65 6.08 9.17-.08-.72-.16-1.83.03-2.62.17-.71 1.12-4.77 1.12-4.77s-.29-.57-.29-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.2.61 1.2 1.34 0 .82-.52 2.04-.79 3.17-.22.95.47 1.72 1.41 1.72 1.69 0 2.99-1.78 2.99-4.36 0-2.28-1.64-3.87-3.98-3.87-2.71 0-4.3 2.03-4.3 4.13 0 .82.31 1.69.71 2.17.08.09.09.17.07.27-.07.3-.24.95-.27 1.08-.04.18-.14.22-.33.13-1.23-.57-2-2.37-2-3.82 0-3.11 2.26-5.96 6.52-5.96 3.42 0 6.08 2.44 6.08 5.7 0 3.4-2.14 6.14-5.12 6.14-1 0-1.94-.52-2.26-1.13l-.62 2.34c-.22.86-.82 1.93-1.23 2.59.93.29 1.91.44 2.94.44 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Facebook"
                                    className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full
                                        border border-[#c8c2b8]/50 text-[#c8c2b8] transition-all duration-300 ease-smooth
                                        hover:border-white hover:text-white active:scale-95 touch-manipulation"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </FooterColumn>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#c8c2b8]/15 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="font-body text-[0.68rem] sm:text-[0.72rem] font-normal text-[#a09a90] tracking-[0.05em]">
                        &copy; 2026 Aphrodite. All rights reserved.
                    </p>
                    <div className="flex gap-5 sm:gap-6">
                        <a href="#" className="font-body text-[0.68rem] sm:text-[0.72rem] font-normal text-[#a09a90]
                            transition-colors duration-300 ease-smooth hover:text-white touch-manipulation py-1"
                        >
                            Privacy Policy
                        </a>
                        <a href="#" className="font-body text-[0.68rem] sm:text-[0.72rem] font-normal text-[#a09a90]
                            transition-colors duration-300 ease-smooth hover:text-white touch-manipulation py-1"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
