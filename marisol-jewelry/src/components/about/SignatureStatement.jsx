import useScrollReveal from '../../hooks/useScrollReveal';

export default function SignatureStatement() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden border-y border-silver/25 bg-ecru-dark py-[clamp(100px,14vw,180px)]">

      <div className="relative z-[2] container-luxury">
        <div
          ref={ref}
          className={`mx-auto max-w-[800px] text-center transition-all duration-1400ms ease-luxury ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >

          {/* Diamond icon */}
          <div className="mx-auto mb-10 w-7 h-7 opacity-50">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M16 1L31 16L16 31L1 16Z" stroke="#1a2744" strokeWidth="0.8" />
              <path d="M16 7L25 16L16 25L7 16Z" stroke="#1a2744" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="2" fill="#1a2744" fillOpacity="0.35" />
            </svg>
          </div>

          <p
            className="font-heading font-light italic leading-[1.8] text-soft-black/80"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)' }}
          >
            What we make is not offered to everyone.
            <br className="hidden md:block" />
            It waits — until the moment it is meant to be yours.
          </p>

          <div className="my-10 flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-silver/50" />
            <div className="h-[5px] w-[5px] rounded-full bg-silver/45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-silver/50" />
          </div>

          <p
            className="font-heading font-light italic leading-[1.8] text-soft-black/80"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)' }}
          >
            Hand and metal, stone and light — patience and intention,
            <br className="hidden md:block" />
            in a place you do not stumble upon. You are chosen for the piece,
            <br className="hidden md:block" />
            as much as it is chosen for you.
          </p>

          <div className="mx-auto mb-6 mt-14 h-px w-24 bg-gradient-to-r from-transparent via-silver/40 to-transparent" />
          <p className="mb-2 font-heading text-[1.05rem] font-light italic tracking-[0.03em] text-burgundy">
            Elara Montclair
          </p>
          <p className="font-body text-[0.58rem] font-medium uppercase tracking-[0.38em] text-silver-dark">
            Founder &amp; Creative Director
          </p>

        </div>
      </div>
    </section>
  );
}
