import { useState, useEffect } from "react";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SignaturePieces from "./components/SignaturePieces";
import BespokeSection from "./components/BespokeSection";
import BrandEssence from "./components/BrandEssence";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
      <>
        <PageLoader visible={loading} />
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
