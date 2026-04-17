import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Home sections
import Hero from "./components/Hero";
import SignaturePieces from "./components/SignaturePieces";
import BespokeSection from "./components/BespokeSection";
import BrandEssence from "./components/BrandEssence";

// Pages (lazy-loaded)
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function PageLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

function parseHash(hash) {
    const clean = hash.replace("#/", "").split("?")[0];
    if (clean === "collection") return { page: "collection" };
    if (clean === "products") return { page: "products" };
    if (clean === "about") return { page: "about" };
    if (clean === "contact") return { page: "contact" };
    if (clean.startsWith("product/")) {
        return { page: "product-detail", productId: clean.replace("product/", "") };
    }
    return { page: "home" };
}

const PAGE_TITLES = {
    home: "Aphrodite — Heavenly Luxury",
    collection: "Collection — Aphrodite",
    products: "Products — Aphrodite",
    "product-detail": "Piece Detail — Aphrodite",
    about: "About — Aphrodite",
    contact: "Contact — Aphrodite",
};

export default function App() {
    const [route, setRoute] = useState(parseHash(window.location.hash));
    const [loading, setLoading] = useState(true);
    const [routeAnnouncement, setRouteAnnouncement] = useState("");

    useLayoutEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        let loaderTimeout;

        const onHashChange = () => {
            setLoading(true);
            const newRoute = parseHash(window.location.hash);
            setRoute(newRoute);
            setRouteAnnouncement(PAGE_TITLES[newRoute.page] || "Page changed");
            window.scrollTo({ top: 0, behavior: "auto" });
            clearTimeout(loaderTimeout);
            loaderTimeout = setTimeout(() => setLoading(false), 300);
        };

        window.addEventListener("hashchange", onHashChange);
        return () => {
            clearTimeout(loaderTimeout);
            window.removeEventListener("hashchange", onHashChange);
        };
    }, []);

    if (loading) return <PageLoader />;

    let pageContent;
    switch (route.page) {
        case "collection":
            pageContent = (
                <PageLayout>
                    <CollectionPage />
                </PageLayout>
            );
            break;
        case "products":
            pageContent = (
                <PageLayout>
                    <ProductsPage />
                </PageLayout>
            );
            break;
        case "product-detail":
            pageContent = (
                <PageLayout>
                    <ProductDetailPage productId={route.productId} />
                </PageLayout>
            );
            break;
        case "about":
            pageContent = (
                <PageLayout>
                    <AboutPage />
                </PageLayout>
            );
            break;
        case "contact":
            pageContent = (
                <PageLayout>
                    <ContactPage />
                </PageLayout>
            );
            break;
        default:
            pageContent = (
                <PageLayout>
                    <>
                        <Hero />
                        <SignaturePieces />
                        <BespokeSection />
                        <BrandEssence />
                    </>
                </PageLayout>
            );
            break;
    }

    return (
        <>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
                {routeAnnouncement}
            </p>
            <Suspense fallback={<PageLoader />}>{pageContent}</Suspense>
        </>
    );
}
