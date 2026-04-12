import useParallax from "../../hooks/useParallax";
import SmartImage from "../SmartImage";

export default function AboutHero() {
    const offset = useParallax(0.2);

    return (
        <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
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

            <div className="relative z-[3] flex flex-1 flex-col justify-end px-6 pb-[clamp(56px,10vh,120px)] pt-[clamp(120px,18vh,200px)]">
                <div className="mx-auto w-full max-w-[800px] text-center">
                    <span className="mb-6 block font-body text-[0.62rem] font-medium uppercase tracking-[0.42em] text-ecru/62 opacity-0 animate-fade-up-delay-1">
                        About Us
                    </span>

                    <h1 className="mx-auto mb-8 max-w-[920px] font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.12] tracking-[0.01em] text-ecru opacity-0 animate-fade-up-delay-2">
                        We cannot be found.
                        <br />
                        We find you.
                    </h1>

                    <div className="mx-auto mb-8 h-px w-0 max-w-[200px] bg-gradient-to-r from-transparent via-ecru/55 to-transparent animate-width-expand" />

                    <p className="mx-auto mb-6 max-w-[640px] font-heading text-[clamp(1.05rem,1.45vw,1.25rem)] font-light leading-[1.85] text-ecru/85 opacity-0 animate-fade-up-delay-3">
                        Because ultimate luxury is not for sale but to be owned at life&apos;s will.
                    </p>

                    <p className="mx-auto mb-6 max-w-[640px] font-heading text-[clamp(1.05rem,1.45vw,1.25rem)] font-light leading-[1.85] text-ecru/85 opacity-0 animate-fade-up-delay-3">
                        Aphrodite is not just another name for Luxury and Elegance — the uniqueness
                        of Aphrodite can only be felt and experienced.
                    </p>

                    <p className="mx-auto max-w-[640px] font-heading text-[clamp(1.1rem,1.5vw,1.35rem)] font-light italic leading-[1.85] text-ecru opacity-0 animate-fade-up-delay-4">
                        Welcome to the time of luxury!
                    </p>
                </div>
            </div>
        </section>
    );
}
