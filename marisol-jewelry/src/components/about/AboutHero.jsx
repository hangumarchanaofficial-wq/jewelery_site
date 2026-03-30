import useParallax from "../../hooks/useParallax";
import SmartImage from "../SmartImage";

export default function AboutHero() {
    const offset = useParallax(0.2);

    return (
        <section className="relative w-full h-[85vh] min-h-[550px] max-h-[950px] overflow-hidden">
            {/* Parallax Image */}
            <div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ transform: `translateY(${offset}px)` }}
            >
                <SmartImage
                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=85&auto=format&fit=crop"
                    alt="Calm Mediterranean ocean surface reflecting golden light at dawn"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Layered overlays */}
            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: `linear-gradient(180deg,
            rgba(26,39,68,0.20) 0%,
            rgba(74,14,26,0.15) 40%,
            rgba(26,39,68,0.55) 80%,
            rgba(26,39,68,0.70) 100%
          )`,
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end text-center px-6 pb-[clamp(60px,10vh,120px)]">
        <span className="font-body text-label font-medium tracking-editorial uppercase text-silver-light/60 mb-5 opacity-0 animate-fade-up-delay-1">
          Our Story
        </span>

                <h1 className="font-heading text-[clamp(2.6rem,6vw,5rem)] font-light text-ecru leading-hero max-w-[800px] mb-5 opacity-0 animate-fade-up-delay-2">
                    Born From the Sea,
                    <br />
                    Shaped by Hand
                </h1>

                <div className="w-0 h-px bg-gradient-to-r from-transparent via-ecru/50 to-transparent animate-width-expand mb-6" />

                <p className="font-heading text-[clamp(0.95rem,1.6vw,1.2rem)] font-light italic text-ecru/65 max-w-[480px] leading-editorial opacity-0 animate-fade-up-delay-3">
                    The story of Marisol is the story of patience —
                    of listening to the ocean until it reveals what it wants to become.
                </p>
            </div>
        </section>
    );
}
