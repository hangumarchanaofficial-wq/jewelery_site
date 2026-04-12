import { useState, useEffect, useCallback } from "react";
import SmartImage from "./SmartImage";

const SLIDES = [
    {
        image:
            "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=1920&q=85&auto=format&fit=crop",
        alt: "Luxury gold necklace draped on natural driftwood",
    },
    {
        image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop",
        alt: "Serene ocean coastline at golden hour",
    },
    {
        image:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=85&auto=format&fit=crop",
        alt: "Elegant pearl jewelry on soft fabric",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToSlide = useCallback(
        (index) => {
            if (index === current || isTransitioning) return;
            setIsTransitioning(true);
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 1800);
        },
        [current, isTransitioning]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [current]);

    const handleCTA = (e) => {
        e.preventDefault();
        const target = document.querySelector("#collection");
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full h-screen min-h-[600px] max-h-[1100px] overflow-hidden">
            {/* Slides */}
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[1800ms] ease-luxury
            ${index === current ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}
                >
                    <SmartImage
                        src={slide.image}
                        alt={slide.alt}
                        className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-luxury
              ${index === current ? "scale-100" : "scale-[1.08]"}`}
                    />
                </div>
            ))}

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 z-[3]"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(10,16,28,0.2) 0%, rgba(8,15,28,0.45) 50%, rgba(5,10,20,0.72) 100%)",
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center text-center px-6">
                <span
                    className="font-body text-[0.7rem] font-medium tracking-[0.35em] uppercase
            text-silver-light mb-6 opacity-0 animate-fade-up-delay-1"
                >
                    Timeless &nbsp;|&nbsp; Elegant &nbsp;|&nbsp; Luxury
                </span>

                <h1
                    className="font-heading text-[clamp(2.2rem,5vw,4.2rem)] font-light
            text-ecru leading-[1.15] max-w-[900px] mb-12
            opacity-0 animate-fade-up-delay-2"
                >
                    Miracles of Nature brings in a masterpiece of Luxury
                </h1>

                <div className="opacity-0 animate-fade-up-delay-3">
                    <a
                        href="#collection"
                        onClick={handleCTA}
                        className="group relative inline-block font-body text-[0.68rem] font-medium
              tracking-[0.3em] uppercase text-ecru border border-ecru/50
              px-12 py-[18px] overflow-hidden transition-all duration-400 ease-smooth
              hover:text-burgundy hover:border-ecru"
                    >
                        <span
                            className="absolute inset-0 bg-ecru -translate-x-full
                transition-transform duration-500 ease-luxury
                group-hover:translate-x-0"
                        />
                        <span className="relative z-10">Explore Collection</span>
                    </a>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[5] flex gap-4">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-[2px] transition-all duration-500 ease-smooth border-0 cursor-pointer
              ${
                            index === current
                                ? "w-14 bg-ecru"
                                : "w-8 bg-ecru/30 hover:bg-ecru/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
