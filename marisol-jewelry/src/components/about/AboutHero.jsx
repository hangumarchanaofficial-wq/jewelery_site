import useParallax from "../../hooks/useParallax";
import SmartImage from "../SmartImage";

export default function AboutHero() {
    const offset = useParallax(0.2);

    return (
        <section className="relative isolate flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden overflow-y-hidden">
            <div
                className="absolute inset-0 -top-[10%] h-[120%] min-h-full w-full min-w-full"
                style={{ transform: `translate3d(0, ${offset}px, 0)` }}
            >
                <SmartImage
                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=85&auto=format&fit=crop"
                    alt="Calm Mediterranean ocean surface reflecting golden light at dawn"
                    className="h-full min-h-full w-full min-w-full max-w-none object-cover object-center"
                />
            </div>

            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: `linear-gradient(180deg,
            rgba(17,26,43,0.42) 0%,
            rgba(17,26,43,0.22) 28%,
            rgba(17,26,43,0.18) 45%,
            rgba(17,26,43,0.38) 70%,
            rgba(17,26,43,0.62) 100%
          )`,
                }}
            />

            <div
                className="relative z-[3] flex min-h-[100dvh] flex-col justify-center px-6
        pb-[clamp(48px,9vh,100px)]
        pt-[calc(env(safe-area-inset-top,0px)+5.5rem)]"
            >
                <div className="mx-auto w-full max-w-[800px] text-center">
                    <span className="mb-6 block font-body text-[0.62rem] font-medium uppercase tracking-[0.42em] text-ecru/75 opacity-0 animate-fade-up-delay-1 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                        About Us
                    </span>

                    <h1 className="mx-auto mb-8 max-w-[920px] font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.12] tracking-[0.01em] text-ecru opacity-0 animate-fade-up-delay-2 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                        We cannot be found.
                        <br />
                        We find you.
                    </h1>

                    <div className="mx-auto mb-8 h-px w-0 max-w-[200px] bg-gradient-to-r from-transparent via-ecru/55 to-transparent animate-width-expand" />

                    <p className="mx-auto mb-6 max-w-[640px] font-heading text-[clamp(1.05rem,1.45vw,1.25rem)] font-light leading-[1.85] text-ecru/90 opacity-0 animate-fade-up-delay-3 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]">
                        Because ultimate luxury is not for sale but to be owned at life&apos;s will.
                    </p>

                    <p className="mx-auto mb-6 max-w-[640px] font-heading text-[clamp(1.05rem,1.45vw,1.25rem)] font-light leading-[1.85] text-ecru/90 opacity-0 animate-fade-up-delay-3 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]">
                        Aphrodite is not just another name for Luxury and Elegance — the uniqueness
                        of Aphrodite can only be felt and experienced.
                    </p>

                    <p className="mx-auto max-w-[640px] font-heading text-[clamp(1.1rem,1.5vw,1.35rem)] font-light italic leading-[1.85] text-ecru opacity-0 animate-fade-up-delay-4 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]">
                        Welcome to the time of luxury!
                    </p>
                </div>
            </div>
        </section>
    );
}
