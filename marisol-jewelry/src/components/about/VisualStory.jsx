import useScrollReveal from '../../hooks/useScrollReveal';
import atelierImage from '../../assets/fallbacks/atelier.jpg';
import necklaceImage from '../../assets/fallbacks/necklace.jpg';
import oceanImage from '../../assets/fallbacks/ocean.jpg';
import ringImage from '../../assets/fallbacks/ring.jpg';
import SmartImage from '../SmartImage';

const VISUALS = [
  {
    src: atelierImage,
    alt: 'Inside the atelier with tools, textures, and materials gathered for handcraft',
    title: 'Inside the Atelier',
    note: 'Where every piece begins with touch, weight, and light.',
  },
  {
    src: oceanImage,
    alt: 'Morning shoreline with pale sea light and gentle surf',
    title: 'Coastal Reference',
    note: 'The sea remains the first reference for color and calm.',
  },
  {
    src: necklaceImage,
    alt: 'Necklace detail photographed in warm golden light',
    title: 'Metal and Motion',
    note: 'Curves that hold warmth without losing restraint.',
  },
  {
    src: ringImage,
    alt: 'Diamond ring resting on a dark surface with precise highlights',
    title: 'Final Setting',
    note: 'Precision arrives last, after proportion feels inevitable.',
  },
];

function VisualCard({ visual, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <figure
      ref={ref}
      className={`group transition-all duration-1200ms ease-luxury ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3 bg-ecru-warm">
        <SmartImage
          src={visual.src}
          alt={visual.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[#1a2744] opacity-0 transition-opacity duration-700 group-hover:opacity-[0.06] pointer-events-none" />
      </div>

      {/* Caption */}
      <figcaption className="border-t border-burgundy/15 pt-5">
        <p className="font-body text-[0.6rem] font-semibold tracking-[0.34em] uppercase text-burgundy mb-2" style={{ opacity: 0.65 }}>
          {visual.title}
        </p>
        <p className="font-heading text-[0.96rem] font-light italic leading-[1.75] text-soft-black/70">
          {visual.note}
        </p>
      </figcaption>
    </figure>
  );
}

export default function VisualStory() {
  const [introRef, introVisible] = useScrollReveal();

  return (
    <section className="bg-ecru-warm py-[clamp(92px,10vw,138px)]">
      <div className="container-luxury">

        {/* ── Intro row: heading left, prose + quote right ── */}
        <div
          ref={introRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-start mb-[clamp(52px,7vw,80px)] transition-all duration-1200ms ease-luxury ${
            introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left: label + large heading + rule */}
          <div className="max-w-md">
            <p className="font-body text-[0.72rem] font-medium uppercase tracking-[0.42em] mb-5 text-soft-black/55">
              The World of Aphrodite
            </p>
            <h2 className="font-heading font-light leading-[1.0] tracking-[-0.02em] text-burgundy"
                style={{ fontSize: 'clamp(2.6rem, 4.2vw, 4rem)' }}>
              Moments<br />of Making
            </h2>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-burgundy/70 to-burgundy/10" />
          </div>

          {/* Right: prose + blockquote */}
          <div className="lg:pt-2">
            <p className="font-body text-[0.88rem] font-light leading-[1.95] mb-6 text-soft-black/90">
              Aphrodite is shaped by a small sequence of quiet moments &mdash; material gathered,
              light observed, form tested, and only then the final setting.
            </p>
            <blockquote className="border-l-[1.5px] border-burgundy/25 pl-5">
              <p className="font-heading text-[1.02rem] font-light italic leading-[1.85] text-burgundy font-normal">
                &ldquo;The most important decisions are made before the stone is ever set.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* ── Clean 2 × 2 editorial grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
          {VISUALS.map((visual, index) => (
            <VisualCard key={visual.title} visual={visual} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
