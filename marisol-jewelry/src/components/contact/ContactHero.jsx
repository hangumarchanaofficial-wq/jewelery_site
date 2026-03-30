import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function ContactHero() {
    const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.2);

    return (
        <section className="relative h-[70vh] min-h-[520px] max-h-[780px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <SmartImage
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop"
                    alt="Calm ocean shoreline at golden hour"
                    className="h-full w-full object-cover"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
            </div>

            {/* Content */}
            <div
                ref={titleRef}
                className={`
          relative z-10 flex h-full flex-col items-center justify-center px-6 text-center
          transition-all duration-[1200ms] ease-luxury
          ${titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
            >
                {/* Decorative Label */}
                <span className="mb-6 inline-block tracking-[0.35em] text-silver/80 font-body text-[11px] uppercase">
          Private Atelier
        </span>

                {/* Title */}
                <h1 className="font-heading text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[1.1] text-white">
                    Begin Your Journey
                </h1>

                {/* Divider */}
                <div
                    className={`
            my-8 h-px bg-gradient-to-r from-transparent via-silver/60 to-transparent
            transition-all duration-[1600ms] delay-500 ease-luxury
            ${titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"}
          `}
                />

                {/* Subtitle */}
                <p className="max-w-lg font-body text-[15px] font-light leading-relaxed tracking-wide text-ecru/80">
                    Every extraordinary piece begins with a conversation.
                    <br className="hidden sm:block" />
                    We invite you to connect with our atelier.
                </p>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ecru to-transparent" />
        </section>
    );
}
