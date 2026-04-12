import { useState, useEffect, useMemo } from "react";
import { getProductDetail } from "../data/productDetails";
import PageLoader from "../components/PageLoader";
import Header from "../components/Header";
import ProductGallery from "../components/products/detail/ProductGallery";
import ProductInfo from "../components/products/detail/ProductInfo";
import Lightbox from "../components/products/detail/Lightbox";
import DetailImages from "../components/products/detail/DetailImages";
import RelatedPieces from "../components/products/detail/RelatedPieces";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProductDetailPage({ productId }) {
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [galleryRef, galleryVisible] = useScrollReveal({ threshold: 0.05 });

    const product = useMemo(() => getProductDetail(productId), [productId]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [productId]);

    return (
        <>
            <PageLoader visible={loading} />
            <Header />

            <main>
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
            </main>

            <Footer />

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
