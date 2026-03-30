import useScrollReveal from '../../hooks/useScrollReveal';

const VALUES = [
  {
    number: '01',
    title: 'Ethically Sourced',
    text: 'Every gemstone traced to its origin. Every metal refined from recycled sources. We visit our mines, know our refiners, and document every step of the journey from earth to atelier.',
  },
  {
    number: '02',
    title: 'Handcrafted Always',
    text: 'No machines, no moulds, no shortcuts. Every Marisol piece is forged, carved, set, and polished entirely by hand — a process that takes between three and eight weeks per creation.',
  },
  {
    number: '03',
    title: 'Numbered & Signed',
    text: 'Each piece carries an engraved edition number and the initials of its maker. No two are identical. Every creation comes with a provenance journal documenting its complete history.',
  },
  {
    number: '04',
    title: 'Made to Endure',
    text: 'We do not design for seasons. Every piece is conceived as an heirloom — built with structural integrity and material quality to be worn daily for decades and passed on through generations.',
  },
];

function ValueColumn({ value, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000ms ease-luxury ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      {/* Number */}
      <p className="font-heading text-[2.8rem] font-light text-burgundy leading-none mb-6"
         style={{ opacity: 0.18 }}>
        {value.number}
      </p>

      {/* Title */}
      <h3 className="font-heading text-[1.4rem] font-normal text-burgundy leading-snug mb-4">
        {value.title}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-burgundy mb-5" style={{ opacity: 0.35 }} />

      {/* Body */}
      <p className="font-body text-[0.85rem] font-light leading-[1.95]"
         style={{ color: '#2a2a2a', opacity: 0.82 }}>
        {value.text}
      </p>
    </div>
  );
}

export default function ValuesSection() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="section-padding bg-ecru-light">
      <div className="container-luxury">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-[520px] mx-auto mb-[clamp(56px,7vw,88px)] transition-all duration-1000ms ease-luxury ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-body text-[0.6rem] font-medium tracking-[0.4em] uppercase text-soft-black mb-5"
             style={{ opacity: 0.45 }}>
            What We Believe
          </p>
          <h2 className="font-heading text-section-title font-light text-burgundy leading-heading">
            Four Principles,<br />No Compromise
          </h2>
          <div className="w-10 h-px mx-auto mt-6 bg-gradient-to-r from-burgundy to-silver" />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {VALUES.map((value, i) => (
            <ValueColumn key={value.number} value={value} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
