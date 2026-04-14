import { useState, useEffect } from "react";
import PageLoader from "../components/PageLoader";
import Header from "../components/Header";
import CollectionHero from "../components/collection/CollectionHero";
import CollectionStory from "../components/collection/CollectionStory";
import CinematicVisual from "../components/collection/CinematicVisual";
import CollectionPieces from "../components/collection/CollectionPieces";
import Footer from "../components/Footer";

export default function CollectionPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <PageLoader visible={loading} />
            <Header />
            <main>
                <CollectionHero />
                <CollectionStory />
                <CinematicVisual />
                <CollectionPieces />
            </main>
            <Footer />
        </>
    );
}
