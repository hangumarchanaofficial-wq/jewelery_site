import useScrollReveal from "../../../hooks/useScrollReveal";
import Accordion from "./Accordion";

export default function ProductInfo({ product }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.05 });

    const specsEntries = [
        { label: "Metal", value: product.specs.metal },
        { label: "Primary Stone", value: product.specs.stone },
        { label: "Stone Origin", value: product.specs.origin },
        { label: "Dimensions", value: product.specs.dimensions },
        { label: "Weight", value: product.specs.weight },
        { label: "Sizing", value: product.specs.sizing },
    ];

    return (
        <div
            ref={ref}
            className={`transition-all duration-[1200ms] ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            {/* ─── Category + Breadcrumb ─── */}
            <div className="flex items-center gap-3 mb-8">
                <a
                    href="#/products"
                    className="font-body text-label font-medium tracking-label uppercase text-silver-dark
            transition-colors duration-300 hover:text-burgundy"
                >
                    {product.category}
                </a>
                <span className="w-4 h-px bg-silver" />
                <span className="font-body text-label font-medium tracking-label uppercase text-burgundy/60">
          Detail
        </span>
            </div>

            {/* ─── Product Name ─── */}
            <h1 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-light text-burgundy leading-hero mb-4">
                {product.name}
            </h1>

            {/* ─── Tagline ─── */}
            <p className="font-heading text-body-serif font-light italic text-soft-black/65 leading-editorial mb-6">
                {product.tagline}
            </p>

            {/* ─── Divider ─── */}
            <div className="w-12 h-px divider-burgundy-silver mb-8" />

            {/* ─── Story ─── */}
            <p className="font-body text-[0.85rem] font-light text-silver-dark leading-editorial mb-8 max-w-[500px]">
                {product.story}
            </p>

            {/* ─── Price ─── */}
            <div className="flex items-baseline gap-4 mb-10">
        <span className="font-heading text-2xl font-light text-soft-black tracking-[0.02em]">
          {product.price}
        </span>
                <span className="font-body text-[0.62rem] font-normal tracking-[0.15em] uppercase text-silver-dark/60">
          Starting Price
        </span>
            </div>

            {/* ─── Specifications ─── */}
            <div className="mb-10">
                <p className="font-body text-label font-medium tracking-editorial uppercase text-burgundy-light mb-5">
                    Specifications
                </p>
                <div className="space-y-0">
                    {specsEntries.map((spec) => (
                        <div
                            key={spec.label}
                            className="flex items-start gap-4 py-3 border-b border-silver/10 last:border-b-0"
                        >
              <span className="font-body text-[0.7rem] font-medium tracking-[0.08em] text-soft-black/50 w-28 shrink-0 pt-px">
                {spec.label}
              </span>
                            <span className="font-body text-[0.78rem] font-light text-soft-black/80 leading-relaxed">
                {spec.value}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Expandable Description ─── */}
            <div className="mb-12">
                <Accordion description={product.description} />
            </div>

            {/* ─── Inquiry CTAs ─── */}
            <div className="space-y-3">
                <a
                    href={`mailto:atelier@marisol.com?subject=Inquiry: ${product.name}&body=I am interested in learning more about the ${product.name} (${product.material}).`}
                    className="group relative flex items-center justify-center gap-3 w-full py-[18px]
            border border-burgundy/30 overflow-hidden transition-all duration-400 ease-smooth
            hover:border-burgundy"
                >
          <span
              className="absolute inset-0 bg-burgundy -translate-x-full
              transition-transform duration-500 ease-luxury group-hover:translate-x-0"
          />
                    <span className="relative z-10 flex items-center gap-3 transition-colors duration-400 group-hover:text-ecru">
            {/* Email icon */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            <span className="font-body text-[0.68rem] font-medium tracking-[0.25em] uppercase text-burgundy group-hover:text-ecru">
              Inquire via Email
            </span>
          </span>
                </a>

                <a
                    href={`https://wa.me/14155550178?text=Hello, I'm interested in the ${product.name} (${product.material}). Could you share more details?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 w-full py-[18px]
            border border-silver/25 overflow-hidden transition-all duration-400 ease-smooth
            hover:border-forest-green/40"
                >
          <span
              className="absolute inset-0 bg-forest-green -translate-x-full
              transition-transform duration-500 ease-luxury group-hover:translate-x-0"
          />
                    <span className="relative z-10 flex items-center gap-3 transition-colors duration-400 group-hover:text-ecru">
            {/* WhatsApp icon */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-body text-[0.68rem] font-medium tracking-[0.25em] uppercase text-soft-black/70 group-hover:text-ecru">
              Inquire via WhatsApp
            </span>
          </span>
                </a>
            </div>

            {/* ─── Concierge note ─── */}
            <p className="font-body text-[0.68rem] font-light text-silver-dark/50 leading-relaxed mt-5 text-center">
                Our concierge team typically responds within 2 hours.<br />
                Private viewings available by appointment.
            </p>
        </div>
    );
}
