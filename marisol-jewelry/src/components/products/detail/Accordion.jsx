import { useState, useRef, useEffect } from "react";

function AccordionItem({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(defaultOpen ? "auto" : "0px");

    useEffect(() => {
        if (isOpen) {
            setHeight(`${contentRef.current.scrollHeight}px`);
            const timer = setTimeout(() => setHeight("auto"), 500);
            return () => clearTimeout(timer);
        } else {
            // Collapse: set explicit height first, then to 0
            setHeight(`${contentRef.current.scrollHeight}px`);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setHeight("0px"));
            });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-silver/15 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
                aria-expanded={isOpen}
            >
        <span
            className={`font-body text-[0.72rem] font-medium tracking-label uppercase
            transition-colors duration-300
            ${isOpen ? "text-burgundy" : "text-soft-black group-hover:text-burgundy"}`}
        >
          {title}
        </span>

                {/* Animated plus/minus icon */}
                <div className="relative w-4 h-4 shrink-0 ml-4">
          <span
              className={`absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2
              transition-all duration-300 ease-smooth
              ${isOpen ? "text-burgundy rotate-0" : "text-silver-dark"}`}
          />
                    <span
                        className={`absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2
              transition-all duration-300 ease-smooth
              ${isOpen ? "text-burgundy rotate-0 opacity-0" : "text-silver-dark rotate-90 opacity-100"}`}
                    />
                </div>
            </button>

            <div
                ref={contentRef}
                className="overflow-hidden transition-[height] duration-500 ease-luxury"
                style={{ height }}
            >
                <div className="pb-8 pr-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function Accordion({ description }) {
    return (
        <div className="border-t border-silver/15">
            <AccordionItem title="Craftsmanship" defaultOpen>
                <p className="font-body text-[0.82rem] font-light text-silver-dark leading-editorial">
                    {description.craftsmanship}
                </p>
            </AccordionItem>

            <AccordionItem title="Materials & Sourcing">
                <p className="font-body text-[0.82rem] font-light text-silver-dark leading-editorial">
                    {description.materials}
                </p>
            </AccordionItem>

            <AccordionItem title="Inspiration">
                <p className="font-heading text-body-serif font-light italic text-soft-black/70 leading-prose">
                    {description.inspiration}
                </p>
            </AccordionItem>
        </div>
    );
}
