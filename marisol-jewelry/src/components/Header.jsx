import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "About Us", href: "#/about", type: "page" },
    { label: "Collection", href: "#/collection", type: "page" },
    { label: "Products", href: "#/products", type: "page" },
    { label: "Contact Us", href: "#/contact", type: "page" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(window.location.hash);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleHash = () => setCurrentPage(window.location.hash);
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && menuOpen) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    const isActive = (href) => {
        if (href.startsWith("#/")) {
            return currentPage.startsWith(href);
        }
        return false;
    };

    const handleNavClick = (e, link) => {
        setMenuOpen(false);
        if (link.type === "page") return;

        e.preventDefault();
        const target = document.querySelector(link.href);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const lightBgPages = ["#/products", "#/about", "#/contact", "#/product/"];
    const isLightPage = lightBgPages.some((p) => currentPage.startsWith(p));
    const isDark = scrolled || isLightPage;

    const brandTextClass = isDark
        ? "text-ecru"
        : "text-[rgba(245,240,232,0.96)] drop-shadow-[0_1px_12px_rgba(0,0,0,0.22)]";
    const navTextClass = isDark
        ? "text-ecru/80 hover:text-white"
        : "text-[rgba(245,240,232,0.94)] hover:text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.28)]";
    const activeNavTextClass = isDark ? "text-white" : "text-ecru";
    const navUnderlineClass = isDark ? "bg-ecru/90" : "bg-ecru/85";
    const mobileToggleColor = isDark ? "bg-ecru" : "bg-ecru";

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-smooth
        pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]
        ${
                isDark
                    ? "bg-charcoal/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.35)] py-3.5 pt-[calc(env(safe-area-inset-top,0px)+0.875rem)]"
                    : "bg-transparent pb-7 pt-[calc(env(safe-area-inset-top,0px)+1.75rem)]"
            }`}
        >
            {!isDark && (
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-charcoal/25 via-charcoal/10 to-transparent pointer-events-none" />
            )}
            <div className="container-luxury relative z-[1001] flex items-center justify-between">
                <a href="#/" className="relative z-[1002]">
                    <span
                        className={`font-heading text-[1.5rem] md:text-[1.65rem] font-normal tracking-[0.28em] uppercase ${brandTextClass}`}
                    >
                        Aphrodite
                    </span>
                </a>

                <nav className="relative z-[1002] hidden lg:flex items-center gap-8 xl:gap-12">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className={`relative font-body text-nav font-medium tracking-label uppercase
                pb-1 transition-colors duration-300 ease-smooth group
                ${isActive(link.href) ? activeNavTextClass : navTextClass}`}
                        >
                            {link.label}
                            <span
                                className={`absolute bottom-0 left-0 h-px ${navUnderlineClass} transition-all duration-400 ease-luxury
                  ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden relative z-[1002] flex flex-col gap-[5px] p-2"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    <span
                        className={`block w-6 h-[1.5px] ${mobileToggleColor} transition-transform duration-300 ease-smooth
              ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
                    />
                    <span
                        className={`block w-6 h-[1.5px] ${mobileToggleColor} transition-opacity duration-300
              ${menuOpen ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                        className={`block w-6 h-[1.5px] ${mobileToggleColor} transition-transform duration-300 ease-smooth
              ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
                    />
                </button>

                <nav
                    id="mobile-navigation"
                    className={`lg:hidden fixed inset-0 z-[998] flex min-h-[100dvh] flex-col bg-charcoal
            pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]
            transition-all duration-500 ease-luxury
            ${menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
                    aria-hidden={!menuOpen}
                >
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu backdrop"
                        className="absolute inset-0 z-0"
                    />
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                            className="absolute right-6 top-6 font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-ecru/80 transition-colors duration-300 hover:text-white"
                        >
                            Close
                        </button>
                        <a
                            href="#/"
                            onClick={() => setMenuOpen(false)}
                            className="font-body text-sm font-medium tracking-[0.3em] uppercase text-ecru/80 transition-colors duration-300 hover:text-white"
                        >
                            Home
                        </a>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link)}
                                className={`font-body text-sm font-medium tracking-[0.3em] uppercase transition-colors duration-300
                ${isActive(link.href) ? "text-white" : "text-ecru/80 hover:text-white"}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
