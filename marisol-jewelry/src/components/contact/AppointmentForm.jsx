import { useState, useRef, useEffect } from "react";
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
    "PST (UTC-8)",
    "MST (UTC-7)",
    "CST (UTC-6)",
    "EST (UTC-5)",
    "GMT (UTC+0)",
    "CET (UTC+1)",
    "GST (UTC+4)",
    "IST (UTC+5:30)",
    "JST (UTC+9)",
    "AEST (UTC+10)",
];

const HOURS = [
    "Morning (9 am - 12 pm)",
    "Afternoon (12 pm - 3 pm)",
    "Late Afternoon (3 pm - 6 pm)",
    "Evening (6 pm - 8 pm)",
    "Flexible",
];

function LuxurySelect({ label, placeholder, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const select = (opt) => {
        onChange(opt);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <label className="mb-3 block tracking-[0.2em] text-soft-black/80 font-body text-[10px] uppercase">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center justify-between pb-3 pt-1 border-b bg-transparent
                    font-body text-[15px] font-light text-left outline-none transition-all duration-300
                    ${open ? "border-burgundy/60" : "border-silver/30"}
                    ${value ? "text-soft-black" : "text-soft-black/70"}`}
            >
                <span>{value || placeholder}</span>
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-3.5 h-3.5 text-silver transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-ecru-light border border-silver/20 shadow-[0_8px_40px_rgba(26,39,68,0.10)] max-h-52 overflow-y-auto">
                    {options.map((opt, i) => (
                        <div key={opt}>
                            {i > 0 && <div className="mx-5 h-px bg-silver/15" />}
                            <button
                                type="button"
                                onClick={() => select(opt)}
                                className={`w-full text-left px-5 py-2.5 font-body text-[13px] font-light
                                    transition-colors duration-200
                                    ${value === opt
                                        ? "bg-burgundy/5 text-burgundy border-l-2 border-burgundy"
                                        : "text-soft-black/85 hover:bg-ecru-warm hover:text-burgundy border-l-2 border-transparent"
                                    }`}
                            >
                                {opt}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function AppointmentForm() {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
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
        console.log("Appointment request:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="bg-ecru-light px-6 py-24 md:py-32">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
                        <svg viewBox="0 0 40 40" fill="none" className="h-12 w-12 text-burgundy/70">
                            <path d="M20 2L26 14L38 16L30 26L31 38L20 33L9 38L10 26L2 16L14 14L20 2Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
                            <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="mb-4 font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-deep-blue">
                        Thank You
                    </h2>
                    <p className="mx-auto max-w-md font-body text-[15px] font-light leading-relaxed text-soft-black/80">
                        Your appointment request has been received. A member of our concierge team
                        will reach out within 24 hours to confirm your consultation.
                    </p>
                    <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-silver to-transparent" />
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setFormData({ itemType: "", fullName: "", email: "", whatsapp: "", description: "", timezone: "", reachableHours: "" });
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
                    {/* Left */}
                    <div className={`flex flex-col justify-center transition-all duration-[1000ms] ease-luxury ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                        <span className="mb-5 tracking-[0.3em] text-burgundy/80 font-body text-[11px] uppercase">
                            Private Consultation
                        </span>
                        <h2 className="mb-6 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15] text-deep-blue">
                            Book an<br />Appointment
                        </h2>
                        <div className="mb-8 h-px w-16 bg-gradient-to-r from-burgundy/30 to-transparent" />
                        <p className="mb-6 font-body text-[15px] font-light leading-[1.8] text-soft-black/90">
                            Each Aphrodite piece is conceived through intimate dialogue. Whether you
                            seek a signature creation or a bespoke commission, our artisans dedicate
                            unhurried attention to understanding your vision.
                        </p>
                        <p className="font-body text-[13px] font-light leading-[1.8] text-soft-black/80">
                            Consultations are available in person at our San Francisco atelier,
                            or virtually via video call. Please share your preferences below,
                            and we will arrange everything for you.
                        </p>
                        <div className="mt-12 hidden overflow-hidden lg:block">
                            <SmartImage
                                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80&auto=format&fit=crop"
                                alt="Artisan crafting a gold ring in the Aphrodite atelier"
                                className="h-64 w-full object-cover opacity-80 transition-transform duration-[1200ms] ease-luxury hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right – Form */}
                    <div className={`transition-all duration-[1200ms] delay-200 ease-luxury ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="border border-silver/15 bg-white/60 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-sm md:p-12"
                        >
                            <div className="space-y-8">
                                {/* Category */}
                                <LuxurySelect
                                    label="What Are You Looking For?"
                                    placeholder="Select a category"
                                    options={ITEM_TYPES}
                                    value={formData.itemType}
                                    onChange={(val) => setFormData((p) => ({ ...p, itemType: val }))}
                                />

                                {/* Name & Email */}
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="fullName" className="mb-3 block tracking-[0.2em] text-soft-black/80 font-body text-[10px] uppercase">
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
                                            className={`w-full border-b bg-transparent pb-3 pt-1 font-body text-[15px] font-light text-soft-black placeholder:text-soft-black/50 outline-none [&:invalid]:shadow-none transition-all duration-500 ${focusedField === "fullName" ? "border-burgundy/60" : "border-silver/30"}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-3 block tracking-[0.2em] text-soft-black/80 font-body text-[10px] uppercase">
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
                                            className={`w-full border-b bg-transparent pb-3 pt-1 font-body text-[15px] font-light text-soft-black placeholder:text-soft-black/50 outline-none [&:invalid]:shadow-none transition-all duration-500 ${focusedField === "email" ? "border-burgundy/60" : "border-silver/30"}`}
                                        />
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div>
                                    <label htmlFor="whatsapp" className="mb-3 block tracking-[0.2em] text-soft-black/80 font-body text-[10px] uppercase">
                                        WhatsApp Number <span className="normal-case tracking-normal text-silver/70">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("whatsapp")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="+1 (000) 000-0000"
                                        className={`w-full border-b bg-transparent pb-3 pt-1 font-body text-[15px] font-light text-soft-black placeholder:text-soft-black/50 outline-none transition-all duration-500 ${focusedField === "whatsapp" ? "border-burgundy/60" : "border-silver/30"}`}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="mb-3 block tracking-[0.2em] text-soft-black/80 font-body text-[10px] uppercase">
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
                                        placeholder="Tell us about the piece you envision..."
                                        className={`w-full resize-none border-b bg-transparent pb-3 pt-1 font-body text-[15px] font-light leading-relaxed text-soft-black placeholder:text-soft-black/50 outline-none transition-all duration-500 ${focusedField === "description" ? "border-burgundy/60" : "border-silver/30"}`}
                                    />
                                </div>

                                {/* Timezone & Hours */}
                                <div className="grid gap-8 md:grid-cols-2">
                                    <LuxurySelect
                                        label="Your Time Zone"
                                        placeholder="Select timezone"
                                        options={TIMEZONES}
                                        value={formData.timezone}
                                        onChange={(val) => setFormData((p) => ({ ...p, timezone: val }))}
                                    />
                                    <LuxurySelect
                                        label="Preferred Hours"
                                        placeholder="Select preferred time"
                                        options={HOURS}
                                        value={formData.reachableHours}
                                        onChange={(val) => setFormData((p) => ({ ...p, reachableHours: val }))}
                                    />
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="group relative w-full overflow-hidden border border-burgundy bg-burgundy px-10 py-4 font-body text-[12px] tracking-[0.3em] uppercase text-ecru transition-all duration-700 ease-luxury hover:bg-burgundy-deep hover:shadow-[0_8px_30px_rgba(107,29,42,0.2)]"
                                    >
                                        <span className="relative z-10">Request Appointment</span>
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                    </button>
                                </div>

                                <p className="text-center font-body text-[11px] font-light leading-relaxed text-soft-black/70">
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
