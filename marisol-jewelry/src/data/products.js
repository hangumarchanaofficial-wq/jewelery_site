/* ═══════════════════════════════════════════════════════════════
   MARISOL — Product Catalog
   14 pieces across 5 categories
   Each product has primary + hover image for the gallery effect
   ═══════════════════════════════════════════════════════════════ */

const PRODUCTS = [
    // ─── EARRINGS (3) ───
    {
        id: "ear-001",
        name: "Ondine Drops",
        category: "Earrings",
        price: "$2,450",
        material: "18k White Gold · Aquamarine",
        image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=720&q=85&auto=format&fit=crop",
        alt: "Ondine drop earrings in white gold with aquamarine stones",
    },
    {
        id: "ear-002",
        name: "Écume Studs",
        category: "Earrings",
        price: "$1,680",
        material: "Platinum · Diamond",
        image:
            "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop",
        alt: "Écume stud earrings in platinum with diamonds",
    },
    {
        id: "ear-003",
        name: "Corail Hoops",
        category: "Earrings",
        price: "$1,950",
        material: "18k Rose Gold",
        image:
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop",
        alt: "Corail hoop earrings in rose gold with organic coral-inspired texture",
    },

    // ─── PENDANTS (3) ───
    {
        id: "pen-001",
        name: "Abyssal Pearl",
        category: "Pendants",
        price: "$3,200",
        material: "Oxidised Silver · Tahitian Pearl",
        image:
            "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=720&q=85&auto=format&fit=crop",
        alt: "Abyssal pendant in oxidised silver with a Tahitian pearl",
    },
    {
        id: "pen-002",
        name: "Soleil Médaillon",
        category: "Pendants",
        price: "$2,800",
        material: "18k Gold · Citrine",
        image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=720&q=85&auto=format&fit=crop",
        alt: "Soleil medallion pendant in gold with citrine centre stone",
    },
    {
        id: "pen-003",
        name: "Vague Charm",
        category: "Pendants",
        price: "$1,450",
        material: "Sterling Silver · Moonstone",
        image:
            "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=720&q=85&auto=format&fit=crop",
        alt: "Vague wave-shaped charm in silver with moonstone",
    },

    // ─── NECKLACES (3) ───
    {
        id: "nec-001",
        name: "Perla Strand",
        category: "Necklaces",
        price: "$5,600",
        material: "18k Rose Gold · South Sea Pearls",
        image:
            "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop",
        alt: "Perla necklace — strand of South Sea pearls on rose gold",
    },
    {
        id: "nec-002",
        name: "Rivage Chain",
        category: "Necklaces",
        price: "$3,900",
        material: "18k Gold · Champagne Diamonds",
        image:
            "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop",
        alt: "Rivage chain necklace in gold with champagne diamond accents",
    },
    {
        id: "nec-003",
        name: "Horizon Collar",
        category: "Necklaces",
        price: "$7,200",
        material: "Platinum · Blue Sapphires",
        image:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=720&q=85&auto=format&fit=crop",
        alt: "Horizon collar necklace in platinum with sapphire gradient",
    },

    // ─── RINGS (3) ───
    {
        id: "rin-001",
        name: "Marée Solitaire",
        category: "Rings",
        price: "$4,800",
        material: "Platinum · Blue Sapphire",
        image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=720&q=85&auto=format&fit=crop",
        alt: "Marée solitaire ring in platinum with deep blue sapphire",
    },
    {
        id: "rin-002",
        name: "Bosque Emerald",
        category: "Rings",
        price: "$6,400",
        material: "18k Gold · Colombian Emerald",
        image:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=720&q=85&auto=format&fit=crop",
        alt: "Bosque ring in sculpted gold with Colombian emerald",
    },
    {
        id: "rin-003",
        name: "Littoral Band",
        category: "Rings",
        price: "$2,100",
        material: "18k Rose Gold",
        image:
            "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop",
        alt: "Littoral textured band in rose gold",
    },

    // ─── BRACELETS (2) ───
    {
        id: "bra-001",
        name: "Marea Cuff",
        category: "Bracelets",
        price: "$3,400",
        material: "18k Gold · Emerald Cabochon",
        image:
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=720&q=85&auto=format&fit=crop",
        alt: "Marea cuff bracelet in gold with emerald cabochon",
    },
    {
        id: "bra-002",
        name: "Drift Bangle",
        category: "Bracelets",
        price: "$2,750",
        material: "Sterling Silver · Sapphire",
        image:
            "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=720&q=85&auto=format&fit=crop",
        imageHover:
            "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=720&q=85&auto=format&fit=crop",
        alt: "Drift bangle bracelet in silver with sapphire detail",
    },
];

export const CATEGORIES = [
    "All",
    "Earrings",
    "Pendants",
    "Necklaces",
    "Rings",
    "Bracelets",
];

export default PRODUCTS;
