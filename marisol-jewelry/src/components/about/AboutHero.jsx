import useParallax from "../../hooks/useParallax";
import SmartImage from "../SmartImage";

export default function AboutHero() {
    const offset = useParallax(0.2);

    return (
        <section className="relative w-full h-screen min-h-[650px] overflow-hidden">
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

            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: `linear-gradient(180deg,
            rgba(17,26,43,0.16) 0%,
            rgba(17,26,43,0.10) 30%,
            rgba(17,26,43,0.28) 58%,
            rgba(17,26,43,0.62) 100%
          )`,
                }}
            />

            <div className="absolute inset-0 z-[3] flex items-end justify-center px-6 pb-[clamp(72px,12vh,132px)]">
                <div className="w-full max-w-[860px] text-center">
                    <span className="block font-body text-[0.62rem] font-medium tracking-[0.42em] uppercase text-ecru/62 mb-6 opacity-0 animate-fade-up-delay-1">
                        Our Story
                    </span>

                    <h1 className="mx-auto mb-7 max-w-[860px] font-heading text-[clamp(3rem,6.2vw,5.6rem)] font-light leading-[1.05] tracking-[0.01em] text-ecru opacity-0 animate-fade-up-delay-2">
                        Born From the Sea,
                        <br />
                        Shaped by Hand
                    </h1>

                    <div className="mx-auto mb-7 w-0 h-px bg-gradient-to-r from-transparent via-ecru/55 to-transparent animate-width-expand" />

                    <p className="mx-auto max-w-[680px] font-heading text-[clamp(1rem,1.5vw,1.28rem)] font-light italic leading-[1.95] text-ecru/78 opacity-0 animate-fade-up-delay-3">
                        The story of Marisol is the story of patience: of listening to the ocean
                        until it reveals what it wants to become.
                    </p>
                </div>
            </div>
        </section>
    );
}
