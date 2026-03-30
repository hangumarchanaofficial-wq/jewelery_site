import { useRef, useEffect, useState } from "react";

export default function CategoryFilter({ categories, active, onChange }) {
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabRefs = useRef({});
    const containerRef = useRef(null);

    // Animate underline indicator to active tab
    useEffect(() => {
        const activeTab = tabRefs.current[active];
        if (activeTab && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();
            setIndicatorStyle({
                width: `${tabRect.width}px`,
                transform: `translateX(${tabRect.left - containerRect.left}px)`,
            });
        }
    }, [active]);

    return (
        <div className="container-luxury mb-[clamp(48px,6vw,72px)]">
            {/* Filter bar with subtle top/bottom lines */}
            <div className="relative border-t border-b border-silver/15 py-6 md:py-8">
                {/* Scrollable tab row */}
                <div
                    ref={containerRef}
                    className="relative flex items-center gap-6 md:gap-10 lg:gap-14 overflow-x-auto
            scrollbar-none -mx-1 px-1"
                    role="tablist"
                    aria-label="Filter by category"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            ref={(el) => (tabRefs.current[cat] = el)}
                            role="tab"
                            aria-selected={active === cat}
                            onClick={() => onChange(cat)}
                            className={`relative whitespace-nowrap font-body text-[0.7rem] md:text-nav font-medium
                tracking-label uppercase pb-1 transition-colors duration-400 ease-smooth
                cursor-pointer shrink-0
                ${
                                active === cat
                                    ? "text-burgundy"
                                    : "text-silver-dark hover:text-soft-black"
                            }`}
                        >
                            {cat}
                            {/* Item count */}
                            {cat !== "All" && (
                                <span
                                    className={`ml-1.5 text-[0.55rem] font-normal transition-colors duration-400
                    ${active === cat ? "text-burgundy/50" : "text-silver/60"}`}
                                >
                  {/* Counts would come from data in production */}
                </span>
                            )}
                        </button>
                    ))}

                    {/* Animated underline indicator */}
                    <div
                        className="absolute bottom-0 left-0 h-[1.5px] bg-burgundy transition-all duration-500 ease-luxury"
                        style={indicatorStyle}
                    />
                </div>

                {/* Right: Product count */}
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
          <span className="font-body text-label font-normal tracking-tight-luxury text-silver-dark/60">
            {active === "All" ? "14" : ""} {active === "All" ? "Pieces" : ""}
          </span>
                </div>
            </div>
        </div>
    );
}
