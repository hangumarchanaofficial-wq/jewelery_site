import { useState, useEffect } from "react";
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
            <ContactHero />
            <ContactChannels />
            <AppointmentForm />
            <PersonalTouch />
            <QuickInquiry />
        </>
    );
}
