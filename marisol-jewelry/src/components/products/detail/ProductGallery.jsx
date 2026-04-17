import { useState, useRef, useEffect, useCallback } from "react";
import SmartImage from "../../SmartImage";

export default function ProductGallery({ gallery, onOpenLightbox }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const thumbnailsRef = useRef(null);

    const changeImage = useCallback(
        (index) => {
            if (index === activeIndex || isTransitioning) return;
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveIndex(index);
                setTimeout(() => setIsTransitioning(false), 50);
            }, 300);
        },
        [activeIndex, isTransitioning]
    );

    // Keep active thumbnail scrolled into view
    useEffect(() => {
        const container = thumbnailsRef.current;
        const activeThumb = container?.children[activeIndex];
        if (activeThumb && container) {
            activeThumb.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [activeIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                changeImage((activeIndex + 1) % gallery.length);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                changeImage((activeIndex - 1 + gallery.length) % gallery.length);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex, changeImage, gallery.length]);

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-5">
            {/* ─── Thumbnail Strip ─── */}
            <div
                ref={thumbnailsRef}
                className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden
          lg:max-h-[640px] scrollbar-none shrink-0 pb-1 lg:pb-0 lg:pr-1"
                role="tablist"
                aria-label="Product image thumbnails"
            >
                {gallery.map((img, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === activeIndex}
                        aria-label={img.label}
                        onClick={() => changeImage(i)}
                        className={`relative shrink-0 w-16 h-16 lg:w-[72px] lg:h-[72px] overflow-hidden cursor-pointer
              transition-all duration-400 ease-smooth
              ${
                            i === activeIndex
                                ? "ring-1 ring-burgundy/60 ring-offset-2 ring-offset-ecru-light opacity-100"
                                : "opacity-40 hover:opacity-70"
                        }`}
                    >
                        <SmartImage
                            src={img.thumb}
                            alt={img.label}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            {/* ─── Main Image ─── */}
            <div
                className="relative flex-1 overflow-hidden bg-ecru-warm cursor-zoom-in group"
                onClick={() => onOpenLightbox(activeIndex)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenLightbox(activeIndex);
                    }
                }}
                role="button"
                aria-label={`Enlarge image: ${gallery[activeIndex].alt}`}
                tabIndex={0}
            >
                <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                    <SmartImage
                        src={gallery[activeIndex].src}
                        alt={gallery[activeIndex].alt}
                        className={`w-full h-full object-cover transition-all duration-500 ease-luxury
              group-hover:scale-[1.03]
              ${isTransitioning ? "opacity-0 scale-[1.01]" : "opacity-100 scale-100"}`}
                    />
                </div>

                {/* Zoom hint */}
                <div
                    className="absolute top-5 right-5 flex items-center gap-2 opacity-0
            group-hover:opacity-100 transition-opacity duration-400 ease-smooth pointer-events-none"
                >
                    <svg className="w-4 h-4 text-soft-black/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                        <path d="M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                    <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-soft-black/40">
            Enlarge
          </span>
                </div>

                {/* Image label */}
                <div className="absolute bottom-5 left-5">
          <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-soft-black/30">
            {gallery[activeIndex].label}
          </span>
                </div>
            </div>
        </div>
    );
}
