import { useState, useEffect } from "react";
import PageLoader from "../components/PageLoader";
import Header from "../components/Header";
import AboutHero from "../components/about/AboutHero";
import BrandStory from "../components/about/BrandStory";
import VisualStory from "../components/about/VisualStory";
import ValuesSection from "../components/about/ValuesSection";
import SignatureStatement from "../components/about/SignatureStatement";
import Footer from "../components/Footer";

export default function AboutPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <PageLoader visible={loading} />
            <Header />
            <main>
                <AboutHero />
                <BrandStory />
                <VisualStory />
                <ValuesSection />
                <SignatureStatement />
            </main>
            <Footer />
        </>
    );
}
