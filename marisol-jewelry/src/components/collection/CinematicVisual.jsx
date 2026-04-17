import { useRef, useState, useEffect } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function CinematicVisual() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [isVisible]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section
            ref={ref}
            className="relative bg-charcoal overflow-hidden h-[100dvh] min-h-[480px] sm:min-h-[560px] md:min-h-[600px]"
        >
            <div
                className={`h-full transition-all duration-[2000ms] ease-luxury
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
            >
                {/* Video Container */}
                <div
                    className="relative w-full h-full group"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(isPlaying ? false : true)}
                >
                    {/* Fallback poster image */}
                    <SmartImage
                        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=85&auto=format&fit=crop"
                        alt="Artisan crafting jewelry at the workbench"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <video
                        ref={videoRef}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=85&auto=format&fit=crop"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            maxWidth: "none",
                        }}
                    >
                        <source
                            src="https://videos.pexels.com/video-files/4087991/4087991-uhd_2732_1440_25fps.mp4"
                            type="video/mp4"
                        />
                    </video>

                    {/* Subtle gradient edges */}
                    <div
                        className="absolute inset-0 z-[1] pointer-events-none"
                        style={{
                            background: `
                linear-gradient(90deg, rgba(28,28,28,0.3) 0%, transparent 15%, transparent 85%, rgba(28,28,28,0.3) 100%),
                linear-gradient(180deg, rgba(28,28,28,0.15) 0%, transparent 20%, transparent 80%, rgba(28,28,28,0.15) 100%)
              `,
                        }}
                    />

                    {/* Play/Pause Button */}
                    <div
                        className={`absolute inset-0 z-[2] flex items-center justify-center
              transition-opacity duration-500 ease-smooth pointer-events-none
              ${showControls || !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    >
                        <button
                            type="button"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            aria-pressed={isPlaying}
                            className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full border border-ecru/30
                flex items-center justify-center bg-charcoal/20 backdrop-blur-sm
                transition-all duration-300 ease-smooth
                hover:border-ecru/60 hover:bg-charcoal/40 hover:scale-110
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-ecru/60"
                        >
                            {isPlaying ? (
                                <svg className="w-5 h-5 text-ecru/80" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-ecru/80 ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="6,4 20,12 6,20" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Caption overlay */}
                    <div className="absolute bottom-[max(clamp(28px,4vw,56px),env(safe-area-inset-bottom,0px))] left-0 right-0 z-[2] text-center pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
                        <p
                            className={`font-body text-[0.58rem] font-medium tracking-[0.35em] uppercase text-ecru/50
                transition-all duration-700 ease-luxury
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                            style={{ transitionDelay: "600ms" }}
                        >
                            The Making — Ocean Whisper Collection
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
