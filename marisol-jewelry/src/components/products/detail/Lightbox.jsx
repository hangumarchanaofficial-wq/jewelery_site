import { useState, useEffect, useCallback } from "react";
import SmartImage from "../../SmartImage";

export default function Lightbox({ images, startIndex = 0, onClose }) {
    const [current, setCurrent] = useState(startIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [visible, setVisible] = useState(false);

    // Animate in
    useEffect(() => {
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => setVisible(true));
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 400);
    }, [onClose]);

    const next = useCallback(() => {
        setIsZoomed(false);
        setCurrent((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setIsZoomed(false);
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleClose, next, prev]);

    return (
        <div
            className={`fixed inset-0 z-[9000] flex items-center justify-center
        transition-all duration-400 ease-smooth
        ${visible ? "opacity-100" : "opacity-0"}`}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-charcoal/95 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Close button */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-[9002] w-10 h-10 flex items-center justify-center
          text-ecru/60 hover:text-ecru transition-colors duration-300"
                aria-label="Close lightbox"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-7 left-6 z-[9002]">
        <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-ecru/40">
          {current + 1} / {images.length}
        </span>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[9002]
          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
          border border-ecru/15 rounded-full text-ecru/50
          hover:border-ecru/40 hover:text-ecru transition-all duration-300"
                aria-label="Previous image"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[9002]
          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
          border border-ecru/15 rounded-full text-ecru/50
          hover:border-ecru/40 hover:text-ecru transition-all duration-300"
                aria-label="Next image"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Main image */}
            <div
                className={`relative z-[9001] max-w-[90vw] max-h-[85vh] transition-transform duration-500 ease-luxury
          ${visible ? "scale-100" : "scale-95"}
          ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setIsZoomed(!isZoomed)}
            >
                <SmartImage
                    src={images[current].src}
                    alt={images[current].alt}
                    className={`max-w-full max-h-[85vh] object-contain transition-transform duration-500 ease-luxury select-none
            ${isZoomed ? "scale-150" : "scale-100"}`}
                    draggable={false}
                />
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9002] text-center">
                <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-ecru/40">
                    {images[current].label}
                </p>
            </div>
        </div>
    );
}
