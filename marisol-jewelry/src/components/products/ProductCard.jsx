import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

export default function ProductCard({ product, index }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });
    const [isHovered, setIsHovered] = useState(false);
    const delay = (index % 4) * 120;

    return (
        <div
            ref={ref}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <a
                href={`#/product/${product.id}`}
                className={`block transition-all duration-[1000ms] ease-luxury
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
                style={{ transitionDelay: `${delay}ms` }}
                aria-label={`View ${product.name} — ${product.material}`}
            >
                {/* ─── Image Container ─── */}
                <div className="relative overflow-hidden bg-ecru-warm mb-5 aspect-[3/4]">
                    {/* Primary Image */}
                    <SmartImage
                        src={product.image}
                        alt={product.alt}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover
              transition-all duration-700 ease-luxury
              ${isHovered ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"}`}
                    />

                    {/* Hover Image */}
                    <SmartImage
                        src={product.imageHover}
                        alt={`${product.name} — alternate view`}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover
              transition-all duration-700 ease-luxury
              ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
                    />

                    {/* Soft shadow on hover — inner bottom gradient */}
                    <div
                        className="absolute inset-0 transition-opacity duration-500 ease-smooth pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(26,39,68,0.08) 0%, transparent 40%)",
                            opacity: isHovered ? 1 : 0,
                        }}
                    />

                    {/* Quick view hint */}
                    <div
                        className={`absolute bottom-5 left-0 right-0 flex justify-center
              transition-all duration-500 ease-smooth pointer-events-none
              ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                    >
            <span
                className="font-body text-[0.58rem] font-medium tracking-[0.25em] uppercase
                text-ecru/80 bg-charcoal/50 backdrop-blur-sm px-5 py-2"
            >
              View Piece
            </span>
                    </div>
                </div>

                {/* ─── Product Info ─── */}
                <div className="px-0.5">
                    {/* Category */}
                    <p className="font-body text-[0.58rem] font-medium tracking-[0.2em] uppercase text-silver-dark/60 mb-1.5">
                        {product.category}
                    </p>

                    {/* Name + Price row */}
                    <div className="flex items-baseline justify-between gap-4">
                        <h3
                            className="font-heading text-[1.15rem] md:text-[1.25rem] font-normal text-soft-black
                tracking-[0.01em] transition-colors duration-300 ease-smooth
                group-hover:text-burgundy"
                        >
                            {product.name}
                        </h3>
                        <span className="font-body text-price font-normal tracking-[0.1em] text-silver-dark shrink-0">
              {product.price}
            </span>
                    </div>

                    {/* Material line */}
                    <p className="font-body text-[0.68rem] font-light text-silver-dark/50 mt-1.5 tracking-[0.03em]">
                        {product.material}
                    </p>
                </div>
            </a>
        </div>
    );
}
