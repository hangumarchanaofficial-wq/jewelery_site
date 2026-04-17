import { useEffect, useRef, useState } from "react";

export default function useScrollReveal({
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
} = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let observer;
        let retryTimer;

        const attachObserver = () => {
            const element = ref.current;
            if (!element || isVisible) return false;

            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer?.unobserve(element);
                    }
                },
                {
                    threshold,
                    rootMargin,
                }
            );

            observer.observe(element);
            return true;
        };

        if (!attachObserver()) {
            // Element may mount after a loader/conditional render; retry briefly.
            retryTimer = setInterval(() => {
                if (attachObserver()) {
                    clearInterval(retryTimer);
                }
            }, 100);
        }

        return () => {
            if (retryTimer) clearInterval(retryTimer);
            if (observer) observer.disconnect();
        };
    }, [threshold, rootMargin, isVisible]);

    return [ref, isVisible];
}
