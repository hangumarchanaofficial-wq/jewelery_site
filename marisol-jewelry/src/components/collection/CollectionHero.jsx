import { useRef, useEffect, useState } from "react";
import useParallax from "../../hooks/useParallax";
import SmartImage from "../SmartImage";

export default function CollectionHero() {
    const parallaxOffset = useParallax(0.25);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(() => {});
        }
    }, []);

    const handleCTA = (e) => {
        e.preventDefault();
        const target = document.querySelector("#collection-pieces");
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full h-screen min-h-[650px] max-h-[1100px] overflow-hidden">
            {/* Video Background */}
            <div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
                {/* Fallback Image — shows while video loads */}
                <SmartImage
                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=85&auto=format&fit=crop"
                    alt="Serene deep blue ocean surface"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${videoLoaded ? "opacity-0" : "opacity-100"}`}
                />

                <video
                    ref={videoRef}
                    onLoadedData={() => setVideoLoaded(true)}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover transition-opacity duration-[2000ms] ease-luxury
            ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                    poster="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=85&auto=format&fit=crop"
                >
                    <source
                        src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* Multi-layer gradient overlay */}
            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: `
            linear-gradient(180deg,
              rgba(26, 39, 68, 0.25) 0%,
              rgba(74, 14, 26, 0.18) 35%,
              rgba(26, 39, 68, 0.50) 70%,
              rgba(26, 39, 68, 0.75) 100%
            )
          `,
                }}
            />

            {/* Subtle vignette */}
            <div
                className="absolute inset-0 z-[3]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(26,39,68,0.3) 100%)",
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center text-center px-6">
                {/* Collection Label */}
                <div className="opacity-0 animate-fade-up-delay-1">
          <span
              className="inline-block font-body text-[0.6rem] font-medium tracking-[0.5em] uppercase
              text-silver-light/70 border border-silver-light/20 px-6 py-2.5 mb-8"
          >
            The 2026 Collection
          </span>
                </div>

                {/* Title */}
                <h1
                    className="font-heading text-[clamp(2.8rem,6.5vw,5.5rem)] font-light
            text-ecru leading-[1.1] max-w-[900px] mb-6
            opacity-0 animate-fade-up-delay-2"
                >
                    Ocean Whisper
                </h1>

                {/* Animated divider line */}
                <div className="w-0 h-px bg-gradient-to-r from-transparent via-ecru/60 to-transparent mb-8 animate-width-expand" />

                {/* Poetic description */}
                <p
                    className="font-heading text-[clamp(1rem,2vw,1.35rem)] font-light italic
            text-ecru/70 max-w-[560px] leading-[1.9] mb-12
            opacity-0 animate-fade-up-delay-3"
                >
                    Born from the silence between waves —<br />
                    where light dissolves into silver, and every curve<br />
                    remembers the shape of the shore.
                </p>

                {/* CTA */}
                <div className="opacity-0 animate-fade-up-delay-4">
                    <a
                        href="#collection-pieces"
                        onClick={handleCTA}
                        className="group relative inline-flex items-center gap-4 font-body text-[0.65rem]
              font-medium tracking-[0.3em] uppercase text-ecru/80
              transition-all duration-500 ease-smooth hover:text-ecru hover:gap-6"
                    >
                        <span className="block w-10 h-px bg-ecru/40 transition-all duration-500 group-hover:w-16 group-hover:bg-ecru/70" />
                        Explore Pieces
                        <span className="block w-10 h-px bg-ecru/40 transition-all duration-500 group-hover:w-16 group-hover:bg-ecru/70" />
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3 opacity-0 animate-fade-in-slow">
        <span className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-ecru/40">
          Scroll
        </span>
                <div className="w-px h-8 bg-gradient-to-b from-ecru/40 to-transparent animate-float" />
            </div>
        </section>
    );
}
