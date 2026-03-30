import { useState } from "react";
import atelierFallback from "../assets/fallbacks/atelier.jpg";
import braceletFallback from "../assets/fallbacks/bracelet.jpg";
import earringsFallback from "../assets/fallbacks/earrings.jpg";
import necklaceFallback from "../assets/fallbacks/necklace.jpg";
import oceanFallback from "../assets/fallbacks/ocean.jpg";
import portraitFallback from "../assets/fallbacks/portrait.jpg";
import ringFallback from "../assets/fallbacks/ring.jpg";

const FALLBACKS = {
    ocean: oceanFallback,
    atelier: atelierFallback,
    portrait: portraitFallback,
    earrings: earringsFallback,
    bracelet: braceletFallback,
    ring: ringFallback,
    jewelry: necklaceFallback,
};

function inferFallbackKey(src = "", alt = "", fallbackKey) {
    if (fallbackKey && FALLBACKS[fallbackKey]) {
        return fallbackKey;
    }

    const context = `${src} ${alt}`.toLowerCase();

    if (/ocean|shore|sea|wave|water|coast|beach|tide|horizon/.test(context)) {
        return "ocean";
    }

    if (/artisan|atelier|craft|workbench|engraving|setting|carving|polish|knotting|hammer|hand|making/.test(context)) {
        return "atelier";
    }

    if (/director|founder|designer|portrait|team|elara|mateo|sophia/.test(context)) {
        return "portrait";
    }

    if (/earring|drops|stud|hoop/.test(context)) {
        return "earrings";
    }

    if (/bracelet|cuff|bangle/.test(context)) {
        return "bracelet";
    }

    if (/ring|solitaire|band/.test(context)) {
        return "ring";
    }

    return "jewelry";
}

export default function SmartImage({ src, alt = "", fallbackKey, ...props }) {
    const resolvedFallback = FALLBACKS[inferFallbackKey(src, alt, fallbackKey)];
    const [failedSrc, setFailedSrc] = useState(null);
    const currentSrc = !src || failedSrc === src ? resolvedFallback : src;

    return (
        <img
            {...props}
            src={currentSrc}
            alt={alt}
            onError={() => {
                if (src && currentSrc !== resolvedFallback) {
                    setFailedSrc(src);
                }
            }}
        />
    );
}
