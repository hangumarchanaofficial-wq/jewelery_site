import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import ContactHero from "../components/contact/ContactHero";
import ContactChannels from "../components/contact/ContactChannels";
import AppointmentForm from "../components/contact/AppointmentForm";
import PersonalTouch from "../components/contact/PersonalTouch";
import QuickInquiry from "../components/contact/QuickInquiry";

export default function ContactPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <PageLoader />}
            <Header />
            <main>
                <ContactHero />
                <ContactChannels />
                <AppointmentForm />
                <PersonalTouch />
                <QuickInquiry />
            </main>
            <Footer />
        </>
    );
}
