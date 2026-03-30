import { useState, useEffect } from "react";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Home sections
import Hero from "./components/Hero";
import SignaturePieces from "./components/SignaturePieces";
import BespokeSection from "./components/BespokeSection";
import BrandEssence from "./components/BrandEssence";

// Pages
import CollectionPage from "./pages/CollectionPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

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

export default function App() {
    const [route, setRoute] = useState(parseHash(window.location.hash));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onHashChange = () => {
            setLoading(true);
            setRoute(parseHash(window.location.hash));
            window.scrollTo({ top: 0, behavior: "instant" });
            setTimeout(() => setLoading(false), 600);
        };
        window.addEventListener("hashchange", onHashChange);
        setTimeout(() => setLoading(false), 1000);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    if (loading) return <PageLoader />;

    switch (route.page) {
        case "collection":
            return <CollectionPage />;
        case "products":
            return <ProductsPage />;
        case "product-detail":
            return <ProductDetailPage productId={route.productId} />;
        case "about":
            return <AboutPage />;
        case "contact":
            return <ContactPage />;
        default:
            return (
                <>
                    <Header />
                    <main>
                        <Hero />
                        <SignaturePieces />
                        <BespokeSection />
                        <BrandEssence />
                    </main>
                    <Footer />
                </>
            );
    }
}
