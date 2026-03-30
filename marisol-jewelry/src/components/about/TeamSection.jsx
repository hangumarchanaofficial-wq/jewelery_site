import useScrollReveal from "../../hooks/useScrollReveal";
import SmartImage from "../SmartImage";

const TEAM = [
    {
        name: "Elara Montclair",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=85&auto=format&fit=crop",
        alt: "Portrait — Elara Montclair",
        detail: "Trained at École Boulle, Paris. Former head of atelier at Maison Boucheron.",
    },
    {
        name: "Matteo Carlevaris",
        role: "Master Goldsmith",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85&auto=format&fit=crop",
        alt: "Portrait — Matteo Carlevaris",
        detail: "Fourth-generation Ligurian artisan. 32 years at the bench.",
    },
    {
        name: "Léa Duval",
        role: "Gemologist & Sourcing Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=85&auto=format&fit=crop",
        alt: "Portrait — Léa Duval",
        detail: "Graduate Gemologist, GIA. Travels to origin mines quarterly.",
    },
];

function TeamMember({ member, index }) {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`text-center transition-all duration-[1200ms] ease-luxury
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 180}ms` }}
        >
            {/* Portrait */}
            <div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] mx-auto mb-7 overflow-hidden rounded-full group">
                <SmartImage
                    src={member.image}
                    alt={member.alt}
                    className="w-full h-full object-cover transition-transform duration-800 ease-luxury
            group-hover:scale-[1.05] grayscale-[30%] group-hover:grayscale-0"
                />
            </div>

            {/* Info */}
            <h3 className="font-heading text-[1.2rem] font-normal text-burgundy tracking-[0.02em] mb-1">
                {member.name}
            </h3>
            <p className="font-body text-[0.62rem] font-medium tracking-label uppercase text-silver-dark mb-3">
                {member.role}
            </p>
            <p className="font-body text-[0.78rem] font-light text-silver-dark/60 leading-relaxed max-w-[240px] mx-auto">
                {member.detail}
            </p>
        </div>
    );
}

export default function TeamSection() {
    const [headerRef, headerVisible] = useScrollReveal();

    return (
        <section className="section-padding bg-ecru-warm">
            <div className="container-luxury">
                <div
                    ref={headerRef}
                    className={`text-center mb-[clamp(48px,6vw,72px)]
            transition-all duration-[1200ms] ease-luxury
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <p className="font-body text-label font-medium tracking-editorial uppercase text-silver-dark mb-4">
                        The Artisans
                    </p>
                    <h2 className="font-heading text-section-title font-light text-burgundy leading-heading mb-5">
                        The Hands Behind<br />
                        Every Piece
                    </h2>
                    <div className="section-divider-center" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 max-w-[900px] mx-auto">
                    {TEAM.map((member, i) => (
                        <TeamMember key={member.name} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
