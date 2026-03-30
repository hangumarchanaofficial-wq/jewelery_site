import { useState, useEffect } from "react";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
    { label: "About Us",   href: "#/about",      type: "page" },
    { label: "Collection", href: "#/collection",  type: "page" },
    { label: "Products",   href: "#/products",    type: "page" },
    { label: "Contact Us", href: "#/contact",     type: "page" },
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
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (href) => {
        if (href.startsWith("#/")) {
            return currentPage.startsWith(href);
        }
        return false;
    };

    const handleNavClick = (e, link) => {
        setMenuOpen(false);
        if (link.type === "page") return; // hash nav handles it

        e.preventDefault();
        const target = document.querySelector(link.href);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    // Pages with light backgrounds need dark text from the start
    const lightBgPages = ["#/products", "#/about", "#/contact", "#/product/"];
    const isLightPage = lightBgPages.some((p) => currentPage.startsWith(p));
    const isDark = scrolled || isLightPage;

    const brandTextClass = isDark ? "text-burgundy" : "text-[rgba(245,240,232,0.96)] drop-shadow-[0_1px_12px_rgba(0,0,0,0.22)]";
    const navTextClass = isDark ? "text-soft-black hover:text-burgundy" : "text-[rgba(245,240,232,0.94)] hover:text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.28)]";
    const activeNavTextClass = isDark ? "text-burgundy" : "text-ecru";
    const navUnderlineClass = isDark ? "bg-burgundy" : "bg-ecru/85";
    const mobileToggleColor = isDark ? "bg-burgundy" : "bg-ecru";
    const logoColor = isDark ? "#6B1D2A" : "rgba(245,240,232,0.96)";

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-smooth
        ${
                isDark
                    ? "bg-ecru-light/97 backdrop-blur-xl shadow-[0_1px_0_rgba(107,29,42,0.08)] py-4"
                    : "bg-transparent py-7"
            }`}
        >
            {!isDark && (
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-charcoal/25 via-charcoal/10 to-transparent pointer-events-none" />
            )}
            <div className="container-luxury flex items-center justify-between">
                {/* Brand */}
                <a href="#/" className="relative z-[1] flex items-center">
                    <span className={`font-heading text-[1.65rem] font-normal tracking-luxury uppercase ${brandTextClass}`}>
            Marisol
          </span>
                </a>

                {/* Desktop Nav */}
                <nav className="relative z-[1] hidden lg:flex items-center gap-8 xl:gap-12">
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

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden relative z-[1001] flex flex-col gap-[5px] p-2"
                    aria-label="Toggle menu"
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

                {/* Mobile Menu */}
                <nav
                    className={`lg:hidden fixed inset-0 bg-ecru-light flex flex-col items-center
            justify-center gap-9 transition-all duration-500 ease-luxury
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                >
                    <a
                        href="#/"
                        onClick={() => setMenuOpen(false)}
                        className="font-body text-sm font-medium tracking-[0.3em] uppercase
              text-soft-black hover:text-burgundy transition-colors duration-300 mb-4"
                    >
                        Home
                    </a>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className={`font-body text-sm font-medium tracking-[0.3em] uppercase
                transition-colors duration-300
                ${isActive(link.href) ? "text-burgundy" : "text-soft-black hover:text-burgundy"}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
