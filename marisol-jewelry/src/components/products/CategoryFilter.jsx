import { useRef, useEffect, useState, useCallback } from "react";

const AUTO_SCROLL_PX_PER_SEC = 22;
/** Idle time after last touch/scroll before auto-scroll resumes */
const RESUME_AFTER_MS = 2000;
/** Same as Tailwind `md` — ticker only runs on small viewports */
const MOBILE_MAX = 767;

function CategoryTabButton({ cat, active, onChange, tabRef, mobileTicker }) {
    const isActive = active === cat;

    if (mobileTicker) {
        return (
            <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                className={`relative inline-flex max-w-max whitespace-nowrap font-body text-[0.62rem] font-medium tracking-label
          uppercase pb-1.5 transition-colors duration-400 ease-smooth cursor-pointer shrink-0
          border-b-[1.5px] touch-manipulation
          ${
              isActive
                  ? "text-burgundy border-burgundy"
                  : "text-silver-dark border-transparent hover:text-soft-black"
          }`}
            >
                {cat}
            </button>
        );
    }

    return (
        <button
            ref={tabRef}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`relative whitespace-nowrap font-body text-[0.7rem] md:text-nav font-medium
        tracking-label uppercase pb-1 transition-colors duration-400 ease-smooth cursor-pointer shrink-0
        ${isActive ? "text-burgundy" : "text-silver-dark hover:text-soft-black"}`}
        >
            {cat}
            {cat !== "All" && (
                <span
                    className={`ml-1.5 text-[0.55rem] font-normal transition-colors duration-400
          ${isActive ? "text-burgundy/50" : "text-silver/60"}`}
                >
                    {/* Counts would come from data in production */}
                </span>
            )}
        </button>
    );
}

export default function CategoryFilter({ categories, active, onChange }) {
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabRefs = useRef({});
    const containerRef = useRef(null);

    const mobileScrollRef = useRef(null);
    const mobileTrackRef = useRef(null);
    const halfWidthRef = useRef(0);
    /** True only while we mutate scrollLeft so scroll events don't count as user interaction */
    const suppressUserScrollPauseRef = useRef(false);
    const autoPausedRef = useRef(false);
    const resumeTimerRef = useRef(null);
    const rafRef = useRef(null);
    const lastTsRef = useRef(0);
    const reduceMotionRef = useRef(false);

    const syncIndicator = useCallback(() => {
        const activeTab = tabRefs.current[active];
        const container = containerRef.current;
        if (!activeTab || !container) return;
        if (typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX) return;
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        setIndicatorStyle({
            width: `${tabRect.width}px`,
            transform: `translateX(${tabRect.left - containerRect.left}px)`,
        });
    }, [active]);

    useEffect(() => {
        syncIndicator();
    }, [syncIndicator]);

    useEffect(() => {
        const onResize = () => {
            if (typeof window !== "undefined" && window.innerWidth > MOBILE_MAX) {
                syncIndicator();
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [syncIndicator]);

    const clearResumeTimer = () => {
        if (resumeTimerRef.current != null) {
            clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = null;
        }
    };

    const scheduleResumeAutoScroll = () => {
        clearResumeTimer();
        resumeTimerRef.current = window.setTimeout(() => {
            autoPausedRef.current = false;
            resumeTimerRef.current = null;
        }, RESUME_AFTER_MS);
    };

    const bumpHalfWidth = useCallback(() => {
        const track = mobileTrackRef.current;
        if (!track) return;
        halfWidthRef.current = track.scrollWidth / 2;
    }, []);

    useEffect(() => {
        const track = mobileTrackRef.current;
        if (!track) return;
        bumpHalfWidth();
        const ro = new ResizeObserver(() => bumpHalfWidth());
        ro.observe(track);
        return () => ro.disconnect();
    }, [categories, bumpHalfWidth]);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        reduceMotionRef.current = mq.matches;
        const onChangeMq = () => {
            reduceMotionRef.current = mq.matches;
        };
        mq.addEventListener("change", onChangeMq);
        return () => mq.removeEventListener("change", onChangeMq);
    }, []);

    useEffect(() => {
        const el = mobileScrollRef.current;
        if (!el) return;

        const tick = (ts) => {
            if (!lastTsRef.current) lastTsRef.current = ts;
            const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
            lastTsRef.current = ts;

            const visible =
                el.offsetParent !== null && window.innerWidth <= MOBILE_MAX;

            const half = halfWidthRef.current;
            if (
                visible &&
                half > 0 &&
                !reduceMotionRef.current &&
                !autoPausedRef.current &&
                el.scrollWidth > el.clientWidth + 1
            ) {
                suppressUserScrollPauseRef.current = true;
                el.scrollLeft += AUTO_SCROLL_PX_PER_SEC * dt;
                if (el.scrollLeft >= half - 0.5) {
                    el.scrollLeft -= half;
                }
                // Two frames: lets sync/async `scroll` from this nudge run before we allow "user" pauses
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        suppressUserScrollPauseRef.current = false;
                    });
                });
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            lastTsRef.current = 0;
        };
    }, [categories]);

    const handleMobileScroll = () => {
        if (suppressUserScrollPauseRef.current) return;
        autoPausedRef.current = true;
        scheduleResumeAutoScroll();
    };

    const handleMobilePointerDown = () => {
        autoPausedRef.current = true;
        clearResumeTimer();
    };

    const handleMobilePointerUp = () => {
        scheduleResumeAutoScroll();
    };

    useEffect(() => {
        return () => clearResumeTimer();
    }, []);

    return (
        <div className="container-luxury mb-[clamp(48px,6vw,72px)]">
            <div className="relative border-t border-b border-silver/15 py-6 md:py-8">
                {/* Mobile: auto-scroll + native horizontal drag; seamless loop via duplicated row */}
                <div
                    ref={mobileScrollRef}
                    onScroll={handleMobileScroll}
                    onPointerDown={handleMobilePointerDown}
                    onPointerUp={handleMobilePointerUp}
                    onPointerCancel={handleMobilePointerUp}
                    onPointerLeave={(e) => {
                        if (e.pointerType === "mouse") {
                            scheduleResumeAutoScroll();
                        }
                    }}
                    className="relative md:hidden overflow-x-auto overflow-y-hidden overscroll-x-contain
            scrollbar-none touch-pan-x -mx-1 px-1 motion-reduce:scroll-auto"
                    role="tablist"
                    aria-label="Filter by category"
                >
                    <div
                        ref={mobileTrackRef}
                        className="flex w-max min-w-0 items-center gap-6 select-none"
                    >
                        {categories.map((cat) => (
                            <CategoryTabButton
                                key={`m-a-${cat}`}
                                cat={cat}
                                active={active}
                                onChange={onChange}
                                mobileTicker
                            />
                        ))}
                        {categories.map((cat) => (
                            <CategoryTabButton
                                key={`m-b-${cat}`}
                                cat={cat}
                                active={active}
                                onChange={onChange}
                                mobileTicker
                            />
                        ))}
                    </div>
                </div>

                <div
                    ref={containerRef}
                    onScroll={syncIndicator}
                    className="relative hidden md:flex items-center gap-10 lg:gap-14 overflow-x-auto
            scrollbar-none -mx-1 px-1"
                    role="tablist"
                    aria-label="Filter by category"
                >
                    {categories.map((cat) => (
                        <CategoryTabButton
                            key={cat}
                            cat={cat}
                            active={active}
                            onChange={onChange}
                            tabRef={(el) => {
                                tabRefs.current[cat] = el;
                            }}
                        />
                    ))}

                    <div
                        className="absolute bottom-0 left-0 h-[1.5px] bg-burgundy transition-all duration-500 ease-luxury pointer-events-none"
                        style={indicatorStyle}
                    />
                </div>

                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
                    <span className="font-body text-label font-normal tracking-tight-luxury text-silver-dark/60">
                        {active === "All" ? "14" : ""} {active === "All" ? "Pieces" : ""}
                    </span>
                </div>
            </div>
        </div>
    );
}
