import { useState, useMemo, useCallback } from "react";
import PRODUCTS, { CATEGORIES } from "../../data/products";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isAnimating, setIsAnimating] = useState(false);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const handleCategoryChange = useCallback(
        (category) => {
            if (category === activeCategory || isAnimating) return;

            // Fade out → swap → fade in
            setIsAnimating(true);

            // After fade-out completes, change category
            setTimeout(() => {
                setActiveCategory(category);
                // Small delay before allowing re-animation
                setTimeout(() => setIsAnimating(false), 100);
            }, 350);
        },
        [activeCategory, isAnimating]
    );

    return (
        <section className="pb-[clamp(80px,10vw,120px)] bg-ecru-light">
            {/* Category Filter */}
            <CategoryFilter
                categories={CATEGORIES}
                active={activeCategory}
                onChange={handleCategoryChange}
            />

            {/* Grid */}
            <div className="container-luxury">
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 lg:gap-x-7 lg:gap-y-20
            transition-opacity duration-350 ease-smooth
            ${isAnimating ? "opacity-0" : "opacity-100"}`}
                >
                    {filteredProducts.map((product, index) => (
                        <ProductCard
                            key={`${activeCategory}-${product.id}`}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                {/* Empty state — should not happen with our data, but defensive */}
                {filteredProducts.length === 0 && !isAnimating && (
                    <div className="text-center py-20">
                        <p className="font-heading text-xl font-light text-silver-dark italic">
                            No pieces in this collection yet.
                        </p>
                    </div>
                )}

                {/* Result count (below grid) */}
                <div className="mt-16 md:mt-20 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-px bg-silver/30" />
                        <span className="font-body text-label font-medium tracking-editorial uppercase text-silver-dark/50">
              {filteredProducts.length}{" "}
                            {filteredProducts.length === 1 ? "Piece" : "Pieces"}
                            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </span>
                        <div className="w-8 h-px bg-silver/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}
