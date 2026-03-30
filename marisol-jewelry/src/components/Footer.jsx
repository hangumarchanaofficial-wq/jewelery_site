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
        <footer id="contact" className="bg-charcoal pt-[clamp(60px,8vw,100px)] pb-10">
            <div className="mx-auto max-w-[1340px] px-6 md:px-10 lg:px-15">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-16 mb-16">
                    {/* Brand */}
                    <FooterColumn delay={0}>
                        <p className="font-heading text-[1.4rem] font-normal tracking-[0.3em] uppercase text-[rgba(245,240,232,0.98)] mb-5">
                            Marisol
                        </p>
                        <p className="font-body text-[0.8rem] font-normal text-[rgba(245,240,232,0.9)] leading-[1.9] max-w-[280px]">
                            Ocean-inspired luxury jewelry, handcrafted with intention. Each
                            piece tells a story of nature, artistry, and timeless elegance.
                        </p>
                    </FooterColumn>

                    {/* Explore */}
                    <FooterColumn delay={100}>
                        <p className="font-body text-[0.65rem] font-semibold tracking-label uppercase text-[rgba(245,240,232,0.95)] mb-7">
                            Explore
                        </p>
                        <ul className="space-y-3.5">
                            {EXPLORE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="font-body text-[0.82rem] font-medium text-[rgba(245,240,232,0.88)]
                      transition-colors duration-300 ease-smooth hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </FooterColumn>

                    {/* Client Care */}
                    <FooterColumn delay={200}>
                        <p className="font-body text-[0.65rem] font-semibold tracking-label uppercase text-[rgba(245,240,232,0.95)] mb-7">
                            Client Care
                        </p>
                        <ul className="space-y-3.5">
                            {CARE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="font-body text-[0.82rem] font-medium text-[rgba(245,240,232,0.88)]
                      transition-colors duration-300 ease-smooth hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </FooterColumn>

                    {/* Contact */}
                    <FooterColumn delay={300}>
                        <p className="font-body text-[0.65rem] font-semibold tracking-label uppercase text-[rgba(245,240,232,0.95)] mb-7">
                            Contact
                        </p>
                        <div className="space-y-2.5">
                            <p>
                                <a
                                    href="mailto:atelier@marisol.com"
                                    className="font-body text-[0.82rem] font-medium text-[rgba(245,240,232,0.88)]
                    transition-colors duration-300 ease-smooth hover:text-white"
                                >
                                    atelier@marisol.com
                                </a>
                            </p>
                            <p>
                                <a
                                    href="tel:+14155550178"
                                    className="font-body text-[0.82rem] font-medium text-[rgba(245,240,232,0.88)]
                    transition-colors duration-300 ease-smooth hover:text-white"
                                >
                                    +1 (415) 555-0178
                                </a>
                            </p>
                            <p className="font-body text-[0.82rem] font-medium text-[rgba(245,240,232,0.96)] leading-[1.7]">
                                By Appointment Only
                                <br />
                                San Francisco &middot; Paris
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-5 mt-7">
                            {/* Instagram */}
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-ecru/40 text-ecru
                  transition-all duration-300 ease-smooth
                  hover:border-white hover:text-white"
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle
                                        cx="17.5"
                                        cy="6.5"
                                        r="1"
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </svg>
                            </a>

                            {/* Pinterest */}
                            <a
                                href="#"
                                aria-label="Pinterest"
                                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-ecru/40 text-ecru
                  transition-all duration-300 ease-smooth
                  hover:border-white hover:text-white"
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.12 2.5 7.65 6.08 9.17-.08-.72-.16-1.83.03-2.62.17-.71 1.12-4.77 1.12-4.77s-.29-.57-.29-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.2.61 1.2 1.34 0 .82-.52 2.04-.79 3.17-.22.95.47 1.72 1.41 1.72 1.69 0 2.99-1.78 2.99-4.36 0-2.28-1.64-3.87-3.98-3.87-2.71 0-4.3 2.03-4.3 4.13 0 .82.31 1.69.71 2.17.08.09.09.17.07.27-.07.3-.24.95-.27 1.08-.04.18-.14.22-.33.13-1.23-.57-2-2.37-2-3.82 0-3.11 2.26-5.96 6.52-5.96 3.42 0 6.08 2.44 6.08 5.7 0 3.4-2.14 6.14-5.12 6.14-1 0-1.94-.52-2.26-1.13l-.62 2.34c-.22.86-.82 1.93-1.23 2.59.93.29 1.91.44 2.94.44 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-ecru/40 text-ecru
                  transition-all duration-300 ease-smooth
                  hover:border-white hover:text-white"
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                    </FooterColumn>
                </div>

                {/* Bottom Bar */}
                <div
                    className="border-t border-ecru/10 pt-8 flex flex-col md:flex-row
            justify-between items-center gap-4"
                >
                    <p className="font-body text-[0.72rem] font-normal text-[rgba(245,240,232,0.72)] tracking-[0.05em]">
                        &copy; 2026 Marisol. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="font-body text-[0.72rem] font-normal text-[rgba(245,240,232,0.72)]
                transition-colors duration-300 ease-smooth hover:text-[rgba(245,240,232,0.92)]"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="font-body text-[0.72rem] font-normal text-[rgba(245,240,232,0.72)]
                transition-colors duration-300 ease-smooth hover:text-[rgba(245,240,232,0.92)]"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
