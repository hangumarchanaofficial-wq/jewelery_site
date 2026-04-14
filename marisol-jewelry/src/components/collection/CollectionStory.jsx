import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function CollectionStory() {
    const [sectionRef] = useScrollReveal({ threshold: 0.1 });
    const [imageRef, imageVisible] = useScrollReveal();
    const [quoteRef, quoteVisible] = useScrollReveal();
    const [textRef, textVisible] = useScrollReveal();

    return (
        <section
            id="collection-story"
            ref={sectionRef}
            className="py-[clamp(100px,12vw,160px)] bg-ecru-light overflow-hidden"
        >
            <div className="mx-auto max-w-[1340px] px-page-gutter">
                {/* Top: Centered editorial intro */}
                <div
                    ref={quoteRef}
                    className={`text-center max-w-[680px] mx-auto mb-[clamp(60px,8vw,100px)]
            transition-all duration-[1200ms] ease-luxury
            ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                    <p className="font-body text-[0.6rem] font-medium tracking-[0.4em] uppercase text-deep-blue/60 mb-8">
                        The Inspiration
                    </p>
                    <blockquote className="font-heading text-[clamp(1.4rem,2.8vw,2.2rem)] font-light italic text-burgundy leading-[1.5] mb-8">
                        "We did not design this collection —<br />
                        we listened to the ocean until it<br />
                        told us what it wanted to become."
                    </blockquote>
                    <p className="font-heading text-sm italic text-deep-blue/70 tracking-[0.1em]">
                        — Elara Montclair, Creative Director
                    </p>
                </div>

                {/* Editorial Grid: Image + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
                    {/* Left: Large portrait image */}
                    <div
                        ref={imageRef}
                        className={`lg:col-span-7 transition-all duration-[1400ms] ease-luxury
              ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                    >
                        <div className="relative overflow-hidden group">
                            {/* Main image */}
                            <div className="aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-ecru-warm">
                                <SmartImage
                                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1000&q=85&auto=format&fit=crop"
                                    alt="Close-up of artisan hands shaping a delicate gold chain on a natural stone surface"
                                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-luxury
                    group-hover:scale-[1.03]"
                                />
                            </div>

                            {/* Floating caption */}
                            <div
                                className="absolute bottom-0 left-0 right-0 max-w-none rounded-none border-t border-silver/10
                  bg-ecru-light/95 backdrop-blur-sm p-5 sm:p-6 md:bottom-10 md:right-10 md:left-auto md:max-w-[260px] md:rounded-sm md:border-0 md:-mr-6
                  shadow-[0_8px_40px_rgba(26,39,68,0.08)]"
                            >
                                <p className="font-body text-[0.58rem] font-medium tracking-[0.3em] uppercase text-burgundy-light mb-2">
                                    Atelier Diary
                                </p>
                                <p className="font-heading text-sm italic text-soft-black/70 leading-[1.7]">
                                    Twenty-three weeks of hand-forming each link. No machines. No shortcuts. Only patience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Story text */}
                    <div
                        ref={textRef}
                        className={`lg:col-span-5 lg:pl-8 xl:pl-14
              transition-all duration-[1400ms] ease-luxury
              ${textVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <p className="font-body text-[0.6rem] font-medium tracking-[0.4em] uppercase text-burgundy-light mb-6">
                            Collection Story
                        </p>

                        <h2 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-light text-burgundy leading-[1.3] mb-6">
                            Where the Tide<br />
                            Meets the Light
                        </h2>

                        <div className="w-10 h-px bg-gradient-to-r from-burgundy to-silver mb-8" />

                        <p className="font-heading text-[clamp(1rem,1.3vw,1.12rem)] font-light italic text-soft-black/80 leading-[2] mb-6">
                            The Ocean Whisper collection was born during a solitary winter spent on the Ligurian coast — mornings of watching the Mediterranean reshape the shoreline, afternoons of sketching forms that the water seemed to suggest.
                        </p>

                        <p className="font-body text-[0.82rem] font-light text-soft-black/85 leading-[2] mb-6">
                            Each piece in this collection traces the ephemeral geometry of waves — the way light fractures across a swell, the curve where water meets sand and neither can be told apart. Our goldsmiths translate these moments into precious metal using techniques passed down through four generations of Ligurian artisans.
                        </p>

                        <p className="font-body text-[0.82rem] font-light text-soft-black/85 leading-[2] mb-10">
                            The stones — aquamarines from Mozambique, South Sea pearls, sapphires the colour of twilight — were chosen not for their size, but for the way they hold light. Each one is a small ocean caught in stillness.
                        </p>

                        {/* Signature detail */}
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-px bg-burgundy/30" />
                            <span className="font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase text-deep-blue/70">
                7 Pieces &middot; Limited Edition
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
