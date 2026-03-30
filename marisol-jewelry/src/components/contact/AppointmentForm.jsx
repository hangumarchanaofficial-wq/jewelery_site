import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

const ITEM_TYPES = [
    "Engagement Ring",
    "Wedding Band",
    "Necklace",
    "Earrings",
    "Bracelet",
    "Pendant",
    "Bespoke Commission",
    "Other",
];

const TIMEZONES = [
    "PST (UTC−8)",
    "MST (UTC−7)",
    "CST (UTC−6)",
    "EST (UTC−5)",
    "GMT (UTC+0)",
    "CET (UTC+1)",
    "GST (UTC+4)",
    "IST (UTC+5:30)",
    "JST (UTC+9)",
    "AEST (UTC+10)",
];

const HOURS = [
    "Morning (9 am – 12 pm)",
    "Afternoon (12 pm – 3 pm)",
    "Late Afternoon (3 pm – 6 pm)",
    "Evening (6 pm – 8 pm)",
    "Flexible",
];

export default function AppointmentForm() {
    const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
    const [formData, setFormData] = useState({
        itemType: "",
        fullName: "",
        email: "",
        whatsapp: "",
        description: "",
        timezone: "",
        reachableHours: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to an API
        console.log("Appointment request:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="bg-ecru-light px-6 py-24 md:py-32">
                <div className="mx-auto max-w-2xl text-center">
                    {/* Success Diamond */}
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
                        <svg viewBox="0 0 40 40" fill="none" className="h-12 w-12 text-burgundy/70 animate-[fade-in_0.8s_ease-out]">
                            <path d="M20 2L26 14L38 16L30 26L31 38L20 33L9 38L10 26L2 16L14 14L20 2Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
                            <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="mb-4 font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-charcoal">
                        Thank You
                    </h2>
                    <p className="mx-auto max-w-md font-body text-[15px] font-light leading-relaxed text-charcoal/60">
                        Your appointment request has been received. A member of our concierge team
                        will reach out within 24 hours to confirm your consultation.
                    </p>
                    <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-silver to-transparent" />
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setFormData({
                                itemType: "",
                                fullName: "",
                                email: "",
                                whatsapp: "",
                                description: "",
                                timezone: "",
                                reachableHours: "",
                            });
                        }}
                        className="mt-8 font-body text-[13px] tracking-[0.15em] uppercase text-burgundy/60 transition-colors duration-300 hover:text-burgundy"
                    >
                        Submit Another Request
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="appointment"
            className="bg-ecru-light px-6 py-20 md:py-28"
        >
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                    {/* Left – Context */}
                    <div
                        className={`
              flex flex-col justify-center transition-all duration-[1000ms] ease-luxury
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
                    >
            <span className="mb-5 tracking-[0.3em] text-burgundy/50 font-body text-[11px] uppercase">
              Private Consultation
            </span>
                        <h2 className="mb-6 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15] text-charcoal">
                            Book an
                            <br />
                            Appointment
                        </h2>
                        <div className="mb-8 h-px w-16 bg-gradient-to-r from-burgundy/30 to-transparent" />
                        <p className="mb-6 font-body text-[15px] font-light leading-[1.8] text-charcoal/60">
                            Each Marisol piece is conceived through intimate dialogue. Whether you
                            seek a signature creation or a bespoke commission, our artisans dedicate
                            unhurried attention to understanding your vision.
                        </p>
                        <p className="font-body text-[13px] font-light leading-[1.8] text-charcoal/45">
                            Consultations are available in person at our San Francisco atelier,
                            or virtually via video call. Please share your preferences below,
                            and we will arrange everything for you.
                        </p>

                        {/* Decorative Image */}
                        <div className="mt-12 hidden overflow-hidden rounded-sm lg:block">
                            <SmartImage
                                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80&auto=format&fit=crop"
                                alt="Artisan crafting a gold ring in the Marisol atelier"
                                className="h-64 w-full object-cover opacity-80 transition-transform duration-[1200ms] ease-luxury hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right – Form */}
                    <div
                        className={`
              transition-all duration-[1200ms] delay-200 ease-luxury
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
            `}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-sm border border-silver/15 bg-white/60 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-sm md:p-12"
                        >
                            <div className="space-y-8">
                                {/* Item Requirement */}
                                <div className="group">
                                    <label
                                        htmlFor="itemType"
                                        className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                    >
                                        What Are You Looking For?
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="itemType"
                                            name="itemType"
                                            value={formData.itemType}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("itemType")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className={`
                        w-full appearance-none border-b bg-transparent pb-3 pt-1
                        font-body text-[15px] font-light text-charcoal
                        outline-none transition-all duration-500
                        ${focusedField === "itemType" ? "border-burgundy/40" : "border-silver/30"}
                      `}
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {ITEM_TYPES.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
                                        >
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name & Email Row */}
                                <div className="grid gap-8 md:grid-cols-2">
                                    {/* Full Name */}
                                    <div>
                                        <label
                                            htmlFor="fullName"
                                            className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("fullName")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            placeholder="Your name"
                                            className={`
                        w-full border-b bg-transparent pb-3 pt-1
                        font-body text-[15px] font-light text-charcoal
                        placeholder:text-silver/60 outline-none transition-all duration-500
                        ${focusedField === "fullName" ? "border-burgundy/40" : "border-silver/30"}
                      `}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            placeholder="your@email.com"
                                            className={`
                        w-full border-b bg-transparent pb-3 pt-1
                        font-body text-[15px] font-light text-charcoal
                        placeholder:text-silver/60 outline-none transition-all duration-500
                        ${focusedField === "email" ? "border-burgundy/40" : "border-silver/30"}
                      `}
                                        />
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div>
                                    <label
                                        htmlFor="whatsapp"
                                        className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                    >
                                        WhatsApp Number <span className="normal-case tracking-normal text-silver">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("whatsapp")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="+1 (000) 000‑0000"
                                        className={`
                      w-full border-b bg-transparent pb-3 pt-1
                      font-body text-[15px] font-light text-charcoal
                      placeholder:text-silver/60 outline-none transition-all duration-500
                      ${focusedField === "whatsapp" ? "border-burgundy/40" : "border-silver/30"}
                    `}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                    >
                                        Describe Your Vision
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("description")}
                                        onBlur={() => setFocusedField(null)}
                                        rows={4}
                                        placeholder="Tell us about the piece you envision — the occasion, the feeling, any inspirations…"
                                        className={`
                      w-full resize-none border-b bg-transparent pb-3 pt-1
                      font-body text-[15px] font-light leading-relaxed text-charcoal
                      placeholder:text-silver/60 outline-none transition-all duration-500
                      ${focusedField === "description" ? "border-burgundy/40" : "border-silver/30"}
                    `}
                                    />
                                </div>

                                {/* Timezone & Hours Row */}
                                <div className="grid gap-8 md:grid-cols-2">
                                    {/* Timezone */}
                                    <div>
                                        <label
                                            htmlFor="timezone"
                                            className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                        >
                                            Your Time Zone
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="timezone"
                                                name="timezone"
                                                value={formData.timezone}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("timezone")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`
                          w-full appearance-none border-b bg-transparent pb-3 pt-1
                          font-body text-[15px] font-light text-charcoal
                          outline-none transition-all duration-500
                          ${focusedField === "timezone" ? "border-burgundy/40" : "border-silver/30"}
                        `}
                                            >
                                                <option value="" disabled>Select timezone</option>
                                                {TIMEZONES.map((tz) => (
                                                    <option key={tz} value={tz}>{tz}</option>
                                                ))}
                                            </select>
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
                                            >
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Reachable Hours */}
                                    <div>
                                        <label
                                            htmlFor="reachableHours"
                                            className="mb-3 block tracking-[0.2em] text-charcoal/50 font-body text-[10px] uppercase"
                                        >
                                            Preferred Hours
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="reachableHours"
                                                name="reachableHours"
                                                value={formData.reachableHours}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("reachableHours")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`
                          w-full appearance-none border-b bg-transparent pb-3 pt-1
                          font-body text-[15px] font-light text-charcoal
                          outline-none transition-all duration-500
                          ${focusedField === "reachableHours" ? "border-burgundy/40" : "border-silver/30"}
                        `}
                                            >
                                                <option value="" disabled>Select preferred time</option>
                                                {HOURS.map((h) => (
                                                    <option key={h} value={h}>{h}</option>
                                                ))}
                                            </select>
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
                                            >
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="
                      group relative w-full overflow-hidden rounded-sm border border-burgundy
                      bg-burgundy px-10 py-4
                      font-body text-[12px] tracking-[0.3em] uppercase text-ecru
                      transition-all duration-700 ease-luxury
                      hover:bg-burgundy-dark hover:shadow-[0_8px_30px_rgba(107,29,42,0.2)]
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy
                    "
                                    >
                                        <span className="relative z-10">Request Appointment</span>
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                    </button>
                                </div>

                                {/* Privacy Note */}
                                <p className="text-center font-body text-[11px] font-light leading-relaxed text-charcoal/35">
                                    Your information is held in strictest confidence.
                                    <br />
                                    We will never share your details with third parties.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
