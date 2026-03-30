import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function PersonalTouch() {
    const { ref, isVisible } = useScrollReveal(0.3);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden bg-deep-blue px-6 py-24 md:py-32"
        >
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=60&auto=format&fit=crop"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div
                className={`
          relative z-10 mx-auto max-w-2xl text-center
          transition-all duration-[1200ms] ease-luxury
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
            >
                {/* Decorative Diamond */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto mb-8 h-6 w-6 text-silver/40"
                >
                    <path
                        d="M12 2L22 12L12 22L2 12L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                <h2 className="mb-6 font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-light italic leading-snug text-ecru/90">
                    "Every piece we create carries a part of someone's story.
                    <br className="hidden md:block" />
                    That story always begins with listening."
                </h2>

                <div className="mx-auto my-8 h-px w-12 bg-gradient-to-r from-transparent via-silver/40 to-transparent" />

                <p className="font-body text-[13px] font-light tracking-[0.15em] uppercase text-silver/50">
                    — The Marisol Atelier
                </p>
            </div>
        </section>
    );
}
