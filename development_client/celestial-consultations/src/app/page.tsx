"use client";

import { motion } from "motion/react";
import {
  ArrowRight, CalendarDays, Check, Clock3, Compass, Copyright,
  Gem, Globe, Mail, MapPin, MoonStar, Phone, Quote,
  ShieldCheck, Sparkles, Star,
} from "lucide-react";

const navItems = ["Home", "Services", "About", "Testimonials", "Contact"];

const services = [
  { copy: "A focused 30 minute reading for life direction, timing, and the patterns shaping your current path.", duration: "30 min", icon: MoonStar, price: "USD 10", title: "Birth Chart Reading" },
  { copy: "A detailed 1 hour reading for deeper insight into patterns, timing, and practical guidance.", duration: "1 hour", icon: Check, price: "USD 20", title: "Detailed Chart Reading" },
];

const trustPoints = [
  { copy: "Private one-to-one sessions with discreet handling of personal details.", icon: ShieldCheck, title: "Confidential by design" },
  { copy: "Clear advice built around timing, relationships, work, and personal decision-making.", icon: Sparkles, title: "Practical spiritual insight" },
  { copy: "Online consultations for clients across Sri Lanka and internationally.", icon: Globe, title: "Available wherever you are" },
];

const process = [
  { copy: "Choose the reading that fits your question and preferred consultation window.", title: "Select your session" },
  { copy: "Share your birth details and any focus areas so the reading is prepared properly.", title: "Send your details" },
  { copy: "Receive a private reading with actionable timing guidance and next-step clarity.", title: "Receive your guidance" },
];

const testimonials = [
  {
    avatar: "https://i.pravatar.cc/120?img=47",
    name: "Nimali P.",
    quote:
      "The reading was calm, precise, and far more practical than I expected. I left with clarity on both my work decisions and personal timing.",
    role: "Colombo",
  },
  {
    avatar: "https://i.pravatar.cc/120?img=12",
    name: "Ravin S.",
    quote:
      "It felt premium from the first message to the final session notes. Thoughtful, private, and genuinely useful guidance.",
    role: "Kandy",
  },
  {
    avatar: "https://i.pravatar.cc/120?img=32",
    name: "Shenali F.",
    quote:
      "The annual forecast helped me plan my next move with more confidence. The session felt elegant and deeply personal.",
    role: "Sri Lankan client abroad",
  },
];

const footerLinks = {
  company: [
    { href: "#about", label: "About the practice" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Client words" },
    { href: "#contact", label: "Book a consultation" },
  ],
  guidance: [
    { href: "#services", label: "Natal chart reading" },
    { href: "#services", label: "Career and finance" },
    { href: "#services", label: "Relationship reading" },
    { href: "#services", label: "Year ahead forecast" },
  ],
};

function SectionHeading({ body, title }: { body: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-[0.68rem] uppercase tracking-[0.35em] text-[var(--gold-soft)]">Premium astrology guidance</p>
      <h2 className="font-display text-4xl leading-tight text-[var(--ivory)] sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">{body}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="lux-shell">
      <div className="lux-noise" />
      <div className="hero-aurora" />

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(4,4,6,0.8)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-3" href="#home">
            <div className="brand-emblem"><Star className="h-4 w-4" strokeWidth={1.7} /></div>
            <div>
              <p className="font-display text-2xl tracking-[0.08em] text-[var(--gold-bright)]">Star Insight</p>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[var(--muted-strong)]">Astrology</p>
            </div>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a className="text-sm tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-[var(--ivory)]" href={`#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <a className="premium-button hidden sm:inline-flex" href="/book">Book a Session</a>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-18 pt-12 sm:px-8 sm:pt-18" id="home">
        <div className="mx-auto grid max-w-7xl gap-16 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] xl:items-center">
          <motion.div animate={{ opacity: 1, y: 0 }} className="relative z-10" initial={{ opacity: 0, y: 28 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <p className="mb-6 inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.38em] text-[var(--gold-soft)]">
              <span className="h-px w-10 bg-[var(--gold-line)]" />
              Bespoke astrology for modern life
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-[var(--ivory)] sm:text-6xl lg:text-7xl">
              Guidance shaped by the stars, delivered with quiet precision.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--muted)]">
              Private consultations for clients in Sri Lanka and abroad, created for love, career, timing, and the kind of clarity that helps you move with more confidence.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a className="premium-button" href="/book">Book Your Consultation</a>
              <a className="premium-button secondary" href="#services">Explore Services <ArrowRight className="h-4 w-4" strokeWidth={1.7} /></a>
            </div>
            <div className="mt-10 flex flex-col gap-5 border-t border-[var(--line)] pt-7 text-[var(--muted)] sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-3 text-[var(--ivory)]">
                <div className="flex -space-x-2">
                  {["N","R","S","A"].map((letter) => (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(236,223,198,0.18)] bg-[rgba(255,255,255,0.04)] text-sm font-semibold text-[var(--gold-soft)]" key={letter}>{letter}</span>
                  ))}
                </div>
                <div>
                  <p className="text-sm">Trusted by private clients</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--muted-strong)]">In Sri Lanka and beyond</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-[var(--gold-bright)]">
                  {Array.from({ length: 5 }).map((_, index) => (<Star className="h-4 w-4 fill-current" key={index} />))}
                </div>
                <span>Premium one-to-one sessions with practical follow-through.</span>
              </div>
            </div>
          </motion.div>

          <motion.div animate={{ opacity: 1, scale: 1 }} className="hero-stage" initial={{ opacity: 0, scale: 0.96 }} transition={{ delay: 0.15, duration: 0.8, ease: [0.22,1,0.36,1] }}>
            <div className="solar-system">
              <motion.div className="solar-system-scene" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22,1,0.36,1] }}>
                <div className="solar-grid-glow" />
                <motion.div animate={{ scale: [1,1.03,1] }} className="sun-core" transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }} />
                <div className="orbit-track orbit-track-1" /><div className="orbit-track orbit-track-2" /><div className="orbit-track orbit-track-3" /><div className="orbit-track orbit-track-4" />
                <motion.div animate={{ rotate: [35,395] }} className="planet-orbit planet-orbit-1" transition={{ duration: 18, ease: "linear", repeat: Infinity }}><div className="planet planet-mercury" /></motion.div>
                <motion.div animate={{ rotate: [145,-215] }} className="planet-orbit planet-orbit-2" transition={{ duration: 28, ease: "linear", repeat: Infinity }}><div className="planet planet-venus" /></motion.div>
                <motion.div animate={{ rotate: [230,590] }} className="planet-orbit planet-orbit-3" transition={{ duration: 40, ease: "linear", repeat: Infinity }}><div className="planet planet-earth"><span className="planet-moon" /></div></motion.div>
                <motion.div animate={{ rotate: [315,-45] }} className="planet-orbit planet-orbit-4" transition={{ duration: 54, ease: "linear", repeat: Infinity }}><div className="planet planet-saturn"><span className="saturn-ring" /></div></motion.div>
                <div className="solar-star solar-star-1 orbit-star-float-1" /><div className="solar-star solar-star-2 orbit-star-float-2" /><div className="solar-star solar-star-3 orbit-star-float-3" />
              </motion.div>
            </div>
            <motion.div animate={{ y: [0,-8,0] }} className="hero-callout hero-callout-top" transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}>
              <CalendarDays className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.7} />
              <div><p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-strong)]">By appointment</p><p className="mt-1 text-sm text-[var(--ivory)]">Online private sessions</p></div>
            </motion.div>
            <motion.div animate={{ y: [0,10,0] }} className="hero-callout hero-callout-bottom" transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}>
              <Gem className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.7} />
              <div><p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-strong)]">Signature offer</p><p className="mt-1 text-sm text-[var(--ivory)]">Natal and timing consultation</p></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-block" id="services">
        <div className="mx-auto max-w-7xl">
          <SectionHeading body="Choose the session that matches the question you are holding now." title="Consultation services designed for clarity, not confusion." />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {services.map(({ copy, duration, icon: Icon, price, title }, index) => (
              <motion.article animate={{ opacity: 1, y: 0 }} className="service-card h-full w-full" initial={{ opacity: 0, y: 24 }} key={title} transition={{ delay: index * 0.08, duration: 0.55 }}>
                <div className="service-icon"><Icon className="h-6 w-6" strokeWidth={1.7} /></div>
                <h3 className="mt-10 font-display text-3xl leading-tight text-[var(--ivory)]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                <div className="service-meta">
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" strokeWidth={1.7} />{duration}</span>
                  <span>{price}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-band" id="about">
        <div className="mx-auto grid max-w-7xl gap-14 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
          <div className="detail-panel">
            <p className="mb-4 text-[0.72rem] uppercase tracking-[0.34em] text-[var(--gold-soft)]">What this experience is built around</p>
            <h3 className="font-display text-4xl leading-tight text-[var(--ivory)]">A premium service experience with spiritual depth and real-world usefulness.</h3>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">Every session is designed to feel private, composed, and deeply personal. The goal is not vague mysticism. It is guidance you can actually carry into decisions, relationships, work, and the next season of your life.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {trustPoints.map(({ copy, icon: Icon, title }) => (
              <div className="trust-card" key={title}>
                <Icon className="h-6 w-6 text-[var(--gold-bright)]" strokeWidth={1.7} />
                <h4 className="mt-6 text-lg font-semibold text-[var(--ivory)]">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="mx-auto grid max-w-7xl gap-14 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <SectionHeading body="The process is simple, discreet, and intentionally personal." title="A consultation flow that feels polished from first click to final insight." />
          <div className="process-list">
            {process.map(({ copy, title }, index) => (
              <div className="process-row" key={title}>
                <div className="process-index">0{index + 1}</div>
                <div><h3 className="text-2xl font-semibold text-[var(--ivory)]">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="testimonials">
        <div className="mx-auto max-w-7xl">
          <SectionHeading body="The strongest feedback is rarely loud. It is the quiet confidence clients feel when a reading leaves them more settled." title="What clients remember is the clarity, calm, and confidence they leave with." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map(({ avatar, name, quote, role }) => (
              <article className="testimonial-card" key={name}>
                <Quote className="h-7 w-7 text-[var(--gold-bright)]" strokeWidth={1.6} />
                <p className="mt-6 text-base leading-8 text-[var(--ivory)]">{quote}</p>
                <div className="mt-8 border-t border-[var(--line)] pt-5">
                  <div className="flex items-center gap-3">
                    <img
                      alt={`${name} profile`}
                      className="h-11 w-11 rounded-full border border-[rgba(202,167,107,0.28)] object-cover"
                      src={avatar}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--ivory)]">{name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--muted-strong)]">{role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pt-6" id="contact">
        <div className="mx-auto max-w-7xl">
          <div className="cta-panel">
            <div className="cta-layout">
              <div className="max-w-3xl">
                <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[var(--gold-soft)]">Book your private consultation</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-[var(--ivory)] sm:text-5xl">Ready for a more personal, premium astrology experience?</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">Start with the service that matches your question. Sessions are delivered privately, with calm guidance, elegant presentation, and space for meaningful clarity.</p>
                <div className="contact-grid">
                  <div className="contact-item"><MapPin className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Serving clients across Sri Lanka and online</span></div>
                  <div className="contact-item"><CalendarDays className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Advance booking recommended for signature readings</span></div>
                  <div className="contact-item"><Check className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Private booking, session details, and secure follow-up</span></div>
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a className="premium-button" href="/book">Reserve a Session</a>
                  <a className="premium-button secondary" href="#services">Review Services <ArrowRight className="h-4 w-4" strokeWidth={1.7} /></a>
                </div>
              </div>
              <div className="cta-image-shell">
                <img alt="Astrology consultation altar" className="cta-image" src="/consultation-altar.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-shell">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 xl:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,0.65fr))]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="brand-emblem"><Star className="h-4 w-4" strokeWidth={1.7} /></div>
              <div><p className="font-display text-2xl tracking-[0.08em] text-[var(--gold-bright)]">Star Insight</p><p className="text-[0.62rem] uppercase tracking-[0.42em] text-[var(--muted-strong)]">Astrology</p></div>
            </div>
            <p className="mt-6 text-sm leading-8 text-[var(--muted)]">Private astrology consultations for clients in Sri Lanka and abroad.</p>
            <div className="mt-7 space-y-3">
              <div className="footer-contact-item"><MapPin className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Colombo based, serving clients online worldwide</span></div>
              <div className="footer-contact-item"><Mail className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>hello@starinsightastrology.com</span></div>
              <div className="footer-contact-item"><Phone className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>By appointment only</span></div>
            </div>
          </div>
          <div>
            <p className="footer-title">Company</p>
            <div className="mt-5 flex flex-col gap-3">{footerLinks.company.map((item) => (<a className="footer-link" href={item.href} key={item.label}>{item.label}</a>))}</div>
          </div>
          <div>
            <p className="footer-title">Services</p>
            <div className="mt-5 flex flex-col gap-3">{footerLinks.guidance.map((item) => (<a className="footer-link" href={item.href} key={item.label}>{item.label}</a>))}</div>
          </div>
          <div>
            <p className="footer-title">Client experience</p>
            <div className="mt-5 space-y-4">
              <div className="footer-feature"><ShieldCheck className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Private and confidential booking</span></div>
              <div className="footer-feature"><Compass className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Clear practical guidance, not vague answers</span></div>
              <div className="footer-feature"><CalendarDays className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.7} /><span>Online sessions with flexible appointment windows</span></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-[var(--muted-strong)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="inline-flex items-center gap-2"><Copyright className="h-3.5 w-3.5" strokeWidth={1.7} />2026 Star Insight Astrology. All rights reserved.</p>
            <p className="uppercase tracking-[0.24em]">Crafted for private, premium consultations</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
