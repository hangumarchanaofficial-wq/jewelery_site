import { useState, useEffect } from "react";
import PageLoader from "../components/PageLoader";
import ProductsHero from "../components/products/ProductsHero";
import ProductGrid from "../components/products/ProductGrid";

export default function ProductsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <PageLoader visible={loading} />
            <ProductsHero />
            <ProductGrid />
        </>
    );
}
