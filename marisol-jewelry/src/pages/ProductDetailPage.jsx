import { useState, useEffect, useMemo } from "react";
import PageLoader from "../components/PageLoader";
import ProductGallery from "../components/products/detail/ProductGallery";
import ProductInfo from "../components/products/detail/ProductInfo";
import Lightbox from "../components/products/detail/Lightbox";
import DetailImages from "../components/products/detail/DetailImages";
import RelatedPieces from "../components/products/detail/RelatedPieces";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProductDetailPage({ productId }) {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const galleryRevealOptions = useMemo(() => ({ threshold: 0.05 }), []);
    const [galleryRef, galleryVisible] = useScrollReveal(galleryRevealOptions);

    useEffect(() => {
        let isActive = true;
        setLoading(true);
        setProduct(null);
        setLightboxIndex(null);

        import("../data/productDetails.js")
            .then(({ getProductDetail }) => {
                if (!isActive) return;
                const detail = getProductDetail(productId);
                setProduct(detail);
            })
            .catch(() => {
                if (!isActive) return;
                setProduct(null);
                setLoading(false);
            })
            .finally(() => {
                if (!isActive) return;
                setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [productId]);

    if (!product && !loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
                <p className="font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-light text-soft-black/70">
                    This piece could not be found.
                </p>
                <a
                    href="#/products"
                    className="font-body text-[0.68rem] font-medium tracking-[0.25em] uppercase text-burgundy hover:opacity-70 transition-opacity"
                >
                    ← View all pieces
                </a>
            </div>
        );
    }

    if (!product) return <PageLoader visible />;

    return (
        <>
            <PageLoader visible={loading} />
            {/* ═══════════════════════════════════════
            PRODUCT SECTION — Gallery + Info
            ═══════════════════════════════════════ */}
            <section className="pt-28 md:pt-32 lg:pt-40 pb-[clamp(60px,8vw,100px)] bg-ecru-light">
                <div className="container-luxury">
                    <div
                        ref={galleryRef}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-start
                transition-all duration-[1400ms] ease-luxury
                ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        {/* Left — Gallery */}
                        <div className="lg:sticky lg:top-28">
                            <ProductGallery
                                gallery={product.gallery}
                                productName={product.name}
                                onOpenLightbox={(index) => setLightboxIndex(index)}
                            />
                        </div>

                        {/* Right — Product Info */}
                        <div className="pt-0 lg:pt-4">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
            DETAIL IMAGES — Horizontal Scroll
            ═══════════════════════════════════════ */}
            <DetailImages images={product.detailImages} />

            {/* ═══════════════════════════════════════
            RELATED PIECES
            ═══════════════════════════════════════ */}
            <RelatedPieces pieces={product.related} />

            {/* ═══════════════════════════════════════
          LIGHTBOX OVERLAY
          ═══════════════════════════════════════ */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={product.gallery}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}
