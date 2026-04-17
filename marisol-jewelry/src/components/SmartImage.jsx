import { useEffect, useState } from "react";

// Remote fallbacks — no local asset dependency
const FALLBACKS = {
    ocean:    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop",
    atelier:  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=85&auto=format&fit=crop",
    portrait: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=85&auto=format&fit=crop",
    earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=85&auto=format&fit=crop",
    bracelet: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&q=85&auto=format&fit=crop",
    ring:     "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=85&auto=format&fit=crop",
    jewelry:  "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=1920&q=85&auto=format&fit=crop",
};

// Guaranteed last-resort fallback (no network needed)
const INLINE_FALLBACK =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a2744"/>
      <stop offset="55%" stop-color="#243652"/>
      <stop offset="100%" stop-color="#0a1220"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="rgba(255,255,255,0.72)" font-size="44" letter-spacing="8"
        font-family="Georgia, serif">APHRODITE</text>
</svg>`);

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
    const [fallbackFailed, setFallbackFailed] = useState(false);

    useEffect(() => {
        setFailedSrc(null);
        setFallbackFailed(false);
    }, [src, resolvedFallback]);

    const currentSrc = fallbackFailed
        ? INLINE_FALLBACK
        : !src || failedSrc === src
          ? resolvedFallback
          : src;

    return (
        <img
            {...props}
            src={currentSrc}
            alt={alt}
            onError={() => {
                if (currentSrc === INLINE_FALLBACK) return;
                if (currentSrc === resolvedFallback || !src) {
                    setFallbackFailed(true);
                    return;
                }
                setFailedSrc(src);
            }}
        />
    );
}
