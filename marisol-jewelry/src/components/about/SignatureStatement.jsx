import useScrollReveal from '../../hooks/useScrollReveal';
import SmartImage from '../SmartImage';

export default function SignatureStatement() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden py-[clamp(100px,14vw,180px)]" style={{ backgroundColor: '#0d1623' }}>

      {/* Ocean background */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.28 }}
          aria-hidden="true"
        />
      </div>

      {/* Depth gradient */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(13,22,35,0.65) 0%, rgba(13,22,35,0.38) 50%, rgba(13,22,35,0.65) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-2 container-luxury">
        <div
          ref={ref}
          className={`text-center max-w-[800px] mx-auto transition-all duration-1400ms ease-luxury ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >

          {/* Diamond icon */}
          <div className="mx-auto mb-10 w-7 h-7" style={{ opacity: 0.6 }}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M16 1L31 16L16 31L1 16Z" stroke="#d4d4d4" strokeWidth="0.8" />
              <path d="M16 7L25 16L16 25L7 16Z" stroke="#d4d4d4" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="2" fill="#d4d4d4" fillOpacity="0.6" />
            </svg>
          </div>

          {/* First paragraph */}
          <p
            className="font-heading font-light italic leading-[1.8]"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)', color: 'rgba(245,240,232,0.95)' }}
          >
            We are not in the business of selling jewelry.
            <br className="hidden md:block" />
            We are in the practice of translating the natural world
            <br className="hidden md:block" />
            into objects worthy of being carried close to the heart.
          </p>

          {/* Mid divider */}
          <div className="flex items-center justify-center gap-5 my-10">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(184,184,184,0.4))' }} />
            <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'rgba(184,184,184,0.45)' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(184,184,184,0.4))' }} />
          </div>

          {/* Second paragraph */}
          <p
            className="font-heading font-light italic leading-[1.8]"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)', color: 'rgba(245,240,232,0.85)' }}
          >
            Each piece is a conversation between hand and metal,
            <br className="hidden md:block" />
            stone and light, patience and intention.
            <br className="hidden md:block" />
            We do not follow seasons.&nbsp; We create heirlooms.
          </p>

          {/* Attribution */}
          <div
            className="mx-auto mt-14 mb-6 h-px w-24"
            style={{ background: 'linear-gradient(to right, transparent, rgba(184,184,184,0.35), transparent)' }}
          />
          <p
            className="font-heading font-light italic mb-2"
            style={{ fontSize: '1.05rem', letterSpacing: '0.03em', color: 'rgba(220,213,205,0.92)' }}
          >
            Elara Montclair
          </p>
          <p
            className="font-body font-medium uppercase"
            style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: 'rgba(184,184,184,0.6)' }}
          >
            Founder &amp; Creative Director
          </p>

        </div>
      </div>
    </section>
  );
}
