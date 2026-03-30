/* ═══════════════════════════════════════════════════════════════
   MARISOL — Complete Product Detail Data (All 14 Pieces)
   ═══════════════════════════════════════════════════════════════ */

function makeGallery(images) {
    return images.map((img) => ({
        src: img.src.replace(/w=\d+/, "w=1200").replace(/q=\d+/, "q=90"),
        thumb: img.src.replace(/w=\d+/, "w=200").replace(/q=\d+/, "q=80"),
        alt: img.alt,
        label: img.label,
    }));
}

const PRODUCT_DETAILS = {
    /* ───────────────────────────────────────
       EARRINGS
       ─────────────────────────────────────── */
    "ear-001": {
        id: "ear-001",
        name: "Ondine Drops",
        category: "Earrings",
        price: "$2,450",
        material: "18k White Gold · Aquamarine",
        tagline: "Movement caught in metal — light falling through water.",
        story:
            "The Ondine earrings were inspired by watching raindrops trail down a windowpane overlooking the Ligurian sea. Each drop earring is asymmetric by a single millimetre — because water never falls the same way twice.",
        specs: {
            metal: "18k White Gold, rhodium-plated finish",
            stone: "Pear-cut Aquamarine, 1.4ct each (matched pair)",
            origin: "Mozambique, ethically sourced",
            dimensions: "Drop length: 42mm · Width: 8mm",
            weight: "4.2 grams per earring",
            sizing: "Standard post with butterfly back",
        },
        description: {
            craftsmanship:
                "Each Ondine earring is hand-formed from a single wire of 18k white gold, drawn and shaped over three days. The aquamarine stones are selected in matched pairs — identical in hue but subtly different in cut, giving each earring its own personality while maintaining harmony. The rhodium plating is applied in our atelier's dedicated finishing room, where temperature and humidity are controlled to ensure a flawless surface.",
            materials:
                "The aquamarines are sourced from the Mavuco mine in Mozambique, known for producing stones with exceptional clarity and a pure blue hue free of green undertones. Each stone is cut in Idar-Oberstein, Germany, by a lapidary who specializes exclusively in aquamarine. The white gold alloy contains palladium rather than nickel, making these earrings suitable for sensitive skin.",
            inspiration:
                "Ondine — the water spirit of European folklore — was said to dissolve into seafoam when betrayed. We wanted earrings that carried that same ethereal quality: present but impermanent, catching light one moment and seeming to vanish the next. The elongated pear shape draws the eye downward, like a droplet about to fall.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=720&q=85&auto=format&fit=crop", alt: "Ondine Drops — front view showing aquamarine pear cuts", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=720&q=85&auto=format&fit=crop", alt: "Ondine Drops — profile showing the white gold wire form", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=720&q=85&auto=format&fit=crop", alt: "Ondine Drops — close-up of aquamarine clarity", label: "Stone Detail" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Artisan setting the aquamarine at the workbench", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85&auto=format&fit=crop", alt: "Aquamarine pear cut detail", caption: "The Matched Pair" },
            { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=85&auto=format&fit=crop", alt: "White gold wire forming", caption: "Three Days of Shaping" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Rhodium plating process", caption: "The Final Finish" },
        ],
        related: [
            { id: "ear-002", name: "Écume Studs", price: "$1,680", material: "Platinum · Diamond", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=85&auto=format&fit=crop", alt: "Écume stud earrings" },
            { id: "ear-003", name: "Corail Hoops", price: "$1,950", material: "18k Rose Gold", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=85&auto=format&fit=crop", alt: "Corail hoop earrings" },
            { id: "pen-001", name: "Abyssal Pearl", price: "$3,200", material: "Oxidised Silver · Tahitian Pearl", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85&auto=format&fit=crop", alt: "Abyssal pendant" },
        ],
    },

    "ear-002": {
        id: "ear-002",
        name: "Écume Studs",
        category: "Earrings",
        price: "$1,680",
        material: "Platinum · Diamond",
        tagline: "Seafoam frozen in platinum — small but unforgettable.",
        story:
            "Designed as an everyday luxury, the Écume studs capture the fleeting texture of sea foam just as it meets the shore. The platinum setting is intentionally organic, with micro-ridges that catch light from every angle.",
        specs: {
            metal: "950 Platinum, hand-textured finish",
            stone: "Round Brilliant Diamond, 0.5ct each (VS1 clarity, F colour)",
            origin: "Botswana, Kimberley Process certified",
            dimensions: "Diameter: 7mm",
            weight: "3.1 grams per earring",
            sizing: "Standard post with screw-back closure",
        },
        description: {
            craftsmanship:
                "The Écume texture is achieved through a proprietary technique developed in our atelier: each stud is cast, then hand-carved under 10x magnification to create the irregular ridges that define its character. No two studs are carved identically. The diamonds sit in bezel settings that follow the organic contour of the platinum, rather than standard prongs.",
            materials:
                "We use 950 platinum — the purest commercially available alloy — because its natural white lustre never yellows or requires replating. The diamonds are selected for their exceptional light return rather than raw carat weight, prioritizing brilliance over size.",
            inspiration:
                "Écume is the French word for foam. We were fascinated by the paradox of foam: it appears solid but is mostly air, it looks white but is actually transparent. These studs aim to hold that same contradiction — substantial in their craftsmanship, ethereal in their effect.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=720&q=85&auto=format&fit=crop", alt: "Écume Studs — front view showing textured platinum", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop", alt: "Écume Studs — on natural stone surface", label: "On Surface" },
            { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=720&q=85&auto=format&fit=crop", alt: "Écume Studs — close-up of diamond bezel", label: "Stone Detail" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Hand-carving the platinum texture", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&q=85&auto=format&fit=crop", alt: "Platinum micro-texture under magnification", caption: "The Foam Texture" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&auto=format&fit=crop", alt: "Diamond bezel setting detail", caption: "Organic Bezel Setting" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Artisan at magnification workstation", caption: "10x Magnification" },
        ],
        related: [
            { id: "ear-001", name: "Ondine Drops", price: "$2,450", material: "18k White Gold · Aquamarine", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop", alt: "Ondine drop earrings" },
            { id: "ear-003", name: "Corail Hoops", price: "$1,950", material: "18k Rose Gold", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=85&auto=format&fit=crop", alt: "Corail hoop earrings" },
            { id: "rin-001", name: "Marée Solitaire", price: "$4,800", material: "Platinum · Blue Sapphire", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop", alt: "Marée ring" },
        ],
    },

    "ear-003": {
        id: "ear-003",
        name: "Corail Hoops",
        category: "Earrings",
        price: "$1,950",
        material: "18k Rose Gold",
        tagline: "The warmth of coral, the elegance of gold.",
        story:
            "These hoops are sculpted to echo the branching forms of Mediterranean coral — each curve is organic, irregular, and alive. The rose gold surface is left with a soft matte finish that warms against the skin.",
        specs: {
            metal: "18k Rose Gold, matte brushed finish",
            stone: "None — pure metalwork",
            origin: "Recycled European gold",
            dimensions: "Outer diameter: 32mm · Thickness: 3mm",
            weight: "5.8 grams per earring",
            sizing: "Hinged snap closure",
        },
        description: {
            craftsmanship:
                "The Corail texture is created through a lost-wax process using actual coral branches as the original mould. Each hoop is then hand-finished to soften the edges while preserving the organic detail. The matte brushed finish is applied with fine-grade pumice, giving the surface a warmth that polished gold cannot achieve.",
            materials:
                "Our rose gold alloy uses copper from recycled electronics, refined to 99.99% purity before being alloyed with fine gold. The resulting colour is a warm blush — deeper than standard rose gold — that complements a wide range of skin tones.",
            inspiration:
                "Coral reefs are the ocean's most intricate architecture — built slowly, patiently, by creatures smaller than a grain of rice. We wanted hoops that carried that same sense of patient accumulation: beauty built over time, not manufactured in an instant.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=720&q=85&auto=format&fit=crop", alt: "Corail Hoops — front view showing organic texture", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Corail Hoops — close-up of coral-inspired surface", label: "Texture Detail" },
            { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=720&q=85&auto=format&fit=crop", alt: "Corail Hoops — profile showing the hoop thickness", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop", alt: "Corail Hoops on display surface", label: "On Surface" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop", alt: "Coral branch texture detail", caption: "Lost-Wax Heritage" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Pumice finishing technique", caption: "The Matte Warmth" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&auto=format&fit=crop", alt: "Rose gold colour under natural light", caption: "Warm Blush Gold" },
        ],
        related: [
            { id: "ear-001", name: "Ondine Drops", price: "$2,450", material: "18k White Gold · Aquamarine", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop", alt: "Ondine drop earrings" },
            { id: "bra-001", name: "Marea Cuff", price: "$3,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop", alt: "Marea cuff bracelet" },
            { id: "nec-001", name: "Perla Strand", price: "$5,600", material: "18k Rose Gold · South Sea Pearls", image: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=600&q=85&auto=format&fit=crop", alt: "Perla necklace" },
        ],
    },

    /* ───────────────────────────────────────
       PENDANTS
       ─────────────────────────────────────── */
    "pen-001": {
        id: "pen-001",
        name: "Abyssal Pearl",
        category: "Pendants",
        price: "$3,200",
        material: "Oxidised Silver · Tahitian Pearl",
        tagline: "Moonlight held beneath the surface.",
        story:
            "The Abyssal pendant draws from the deepest register of our ocean vocabulary — where light doesn't reach and pearls are born in silence. The oxidised silver gives the piece an antique gravity that contrasts with the pearl's living lustre.",
        specs: {
            metal: "Sterling Silver, hand-oxidised patina",
            stone: "Tahitian Pearl, 11mm, natural peacock overtone",
            origin: "French Polynesia, pearl farm certified",
            dimensions: "Pendant: 18mm × 14mm · Chain: 45cm with 5cm extension",
            weight: "12.6 grams total",
            sizing: "Adjustable chain length",
        },
        description: {
            craftsmanship:
                "The oxidisation process is applied by hand using a traditional liver of sulphur technique, building layers of darkness over several days. Each pendant is then selectively polished on the high points, revealing bright silver beneath the patina — like light breaking through deep water. The pearl is held in a cup setting that cradles its form without any visible prongs.",
            materials:
                "Tahitian pearls are the only naturally dark pearls in the world. This specimen displays the coveted 'peacock' overtone — a shifting play of green, purple, and blue across its surface. The sterling silver is alloyed with germanium rather than copper, which prevents tarnishing while maintaining the ability to accept oxidisation treatment.",
            inspiration:
                "The abyssal zone of the ocean — below 4,000 metres — is a world of complete darkness where bioluminescent creatures create their own light. This pendant is our meditation on that paradox: something luminous born from something dark.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=720&q=85&auto=format&fit=crop", alt: "Abyssal Pearl — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=720&q=85&auto=format&fit=crop", alt: "Abyssal Pearl — on chain", label: "On Chain" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop", alt: "Abyssal Pearl — pearl overtone detail", label: "Pearl Detail" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Oxidisation process at atelier", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=85&auto=format&fit=crop", alt: "Peacock overtone close-up", caption: "The Peacock Lustre" },
            { src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=900&q=85&auto=format&fit=crop", alt: "Oxidised silver patina layers", caption: "Layers of Darkness" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Selective polishing technique", caption: "Light Breaking Through" },
        ],
        related: [
            { id: "pen-002", name: "Soleil Médaillon", price: "$2,800", material: "18k Gold · Citrine", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85&auto=format&fit=crop", alt: "Soleil pendant" },
            { id: "nec-003", name: "Horizon Collar", price: "$7,200", material: "Platinum · Blue Sapphires", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop", alt: "Horizon collar necklace" },
            { id: "ear-001", name: "Ondine Drops", price: "$2,450", material: "18k White Gold · Aquamarine", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop", alt: "Ondine earrings" },
        ],
    },

    "pen-002": {
        id: "pen-002",
        name: "Soleil Médaillon",
        category: "Pendants",
        price: "$2,800",
        material: "18k Gold · Citrine",
        tagline: "Sunlight pressed into gold.",
        story:
            "The Soleil captures the warmth of a Mediterranean afternoon — when the sun sits low and everything turns to amber. The citrine at its centre holds that exact colour, set in a medallion inspired by antique navigational instruments.",
        specs: {
            metal: "18k Yellow Gold, polished and engraved",
            stone: "Round Citrine, 3.1 carats, Madeira grade",
            origin: "Brazil, responsibly mined",
            dimensions: "Medallion diameter: 22mm · Chain: 50cm",
            weight: "14.2 grams total",
            sizing: "Fixed chain with lobster clasp",
        },
        description: {
            craftsmanship:
                "The medallion face is engraved with radial lines that emanate from the stone — inspired by the compass roses found on 16th-century Portuguese sea charts. This engraving is done entirely by hand using a traditional burin, taking two full days per piece. The citrine is set in a rubover bezel that follows the stone's table perfectly.",
            materials:
                "Madeira citrine is the rarest and most sought-after variety, named for its resemblance to Madeira wine. This deep amber-orange hue occurs naturally without heat treatment. Our gold is refined from recycled sources and alloyed in-house to achieve a warm yellow that complements the citrine's fire.",
            inspiration:
                "Portuguese navigators once used the sun and the stars to cross oceans. The Soleil medallion is our homage to those journeys — a piece that carries the warmth of distant shores and the courage of setting sail toward the unknown.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop", alt: "Soleil Médaillon — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=720&q=85&auto=format&fit=crop", alt: "Soleil Médaillon — engraving detail", label: "Engraving" },
            { src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=720&q=85&auto=format&fit=crop", alt: "Soleil Médaillon — on chain", label: "On Chain" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Burin engraving at the atelier", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop", alt: "Citrine fire under direct light", caption: "Madeira Fire" },
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop", alt: "Compass rose engraving", caption: "The Navigator's Rose" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Hand engraving with burin", caption: "Two Days by Hand" },
        ],
        related: [
            { id: "pen-001", name: "Abyssal Pearl", price: "$3,200", material: "Oxidised Silver · Tahitian Pearl", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85&auto=format&fit=crop", alt: "Abyssal pendant" },
            { id: "pen-003", name: "Vague Charm", price: "$1,450", material: "Sterling Silver · Moonstone", image: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=600&q=85&auto=format&fit=crop", alt: "Vague charm" },
            { id: "nec-002", name: "Rivage Chain", price: "$3,900", material: "18k Gold · Champagne Diamonds", image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=600&q=85&auto=format&fit=crop", alt: "Rivage necklace" },
        ],
    },

    "pen-003": {
        id: "pen-003",
        name: "Vague Charm",
        category: "Pendants",
        price: "$1,450",
        material: "Sterling Silver · Moonstone",
        tagline: "A wave that never breaks, holding moonlight in its crest.",
        story:
            "The Vague is our most delicate pendant — a sliver of silver curved into a wave's peak, cradling a cabochon moonstone that shifts with blue adularescence. It was designed as a talisman for anyone who feels most at home near the sea.",
        specs: {
            metal: "Sterling Silver, high-polish finish",
            stone: "Rainbow Moonstone cabochon, 1.8 carats",
            origin: "Sri Lanka, ethically sourced",
            dimensions: "Pendant: 15mm × 10mm · Chain: 42cm with 5cm extension",
            weight: "6.4 grams total",
            sizing: "Adjustable chain length",
        },
        description: {
            craftsmanship: "The wave form is hand-carved from a solid silver block — not cast — which gives it a density and weight that cast pieces cannot match. The moonstone sits in a custom bezel that follows the stone's natural dome, allowing the adularescent glow to move freely across the surface as the wearer moves.",
            materials: "Rainbow moonstone is a variety of labradorite that displays a blue-white sheen called adularescence — caused by light scattering between microscopic layers within the stone. Each moonstone is unique in its pattern of light play, making every Vague charm one of a kind.",
            inspiration: "In French, vague means both 'wave' and 'vague' — something imprecise, dreamlike. This pendant lives in that double meaning: a precise rendering of something inherently imprecise. It's a reminder that the most beautiful things resist exact definition.",
        },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=720&q=85&auto=format&fit=crop", alt: "Vague Charm — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=720&q=85&auto=format&fit=crop", alt: "Vague Charm — moonstone glow", label: "Moonstone Glow" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop", alt: "Vague Charm — on chain detail", label: "On Chain" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Hand-carving the wave form", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=900&q=85&auto=format&fit=crop", alt: "Wave crest silver detail", caption: "Carved, Not Cast" },
            { src: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=85&auto=format&fit=crop", alt: "Adularescence light play", caption: "The Blue Sheen" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Custom bezel fitting", caption: "A Perfect Cradle" },
        ],
        related: [
            { id: "pen-001", name: "Abyssal Pearl", price: "$3,200", material: "Oxidised Silver · Tahitian Pearl", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85&auto=format&fit=crop", alt: "Abyssal pendant" },
            { id: "pen-002", name: "Soleil Médaillon", price: "$2,800", material: "18k Gold · Citrine", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85&auto=format&fit=crop", alt: "Soleil pendant" },
            { id: "bra-002", name: "Drift Bangle", price: "$2,750", material: "Sterling Silver · Sapphire", image: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=600&q=85&auto=format&fit=crop", alt: "Drift bangle" },
        ],
    },

    /* ───────────────────────────────────────
       NECKLACES
       ─────────────────────────────────────── */
    "nec-001": {
        id: "nec-001", name: "Perla Strand", category: "Necklaces", price: "$5,600",
        material: "18k Rose Gold · South Sea Pearls",
        tagline: "A love letter to the Mediterranean, written in pearls.",
        story: "Fourteen months of selecting South Sea pearls, each chosen for its unique lustre and oceanic depth. The Perla Strand is the centrepiece of a private collection, now offered in limited numbers.",
        specs: { metal: "18k Rose Gold clasp and spacers", stone: "23 South Sea Pearls, 9–12mm graduated", origin: "Australia & Indonesia", dimensions: "Total length: 46cm (princess length)", weight: "52 grams total", sizing: "Fixed length with rose gold toggle clasp" },
        description: { craftsmanship: "Each pearl is hand-knotted on silk thread with a single knot between each pearl — a technique that protects the pearls from rubbing and ensures the strand drapes with perfect weight. The rose gold toggle clasp is engraved with the Marisol wave motif.", materials: "South Sea pearls are the largest and rarest cultured pearls, grown in the Pinctada maxima oyster. These specimens range from champagne to soft white with pink overtones, creating a gradient effect along the strand.", inspiration: "The Perla was commissioned for a collector who wanted to carry the memory of Santorini mornings — the way light scattered across the Aegean. We built the strand to echo that graduated luminosity." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=720&q=85&auto=format&fit=crop", alt: "Perla Strand — full view", label: "Full View" },
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop", alt: "Perla Strand — clasp detail", label: "Clasp Detail" },
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=720&q=85&auto=format&fit=crop", alt: "Perla Strand — pearl graduation", label: "Pearl Gradient" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Hand-knotting pearls on silk", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=900&q=85&auto=format&fit=crop", alt: "Pearl lustre gradient", caption: "Twenty-Three Pearls" },
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=85&auto=format&fit=crop", alt: "Rose gold toggle clasp", caption: "The Wave Motif" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Silk knotting technique", caption: "Knotted by Hand" },
        ],
        related: [
            { id: "nec-002", name: "Rivage Chain", price: "$3,900", material: "18k Gold · Champagne Diamonds", image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=600&q=85&auto=format&fit=crop", alt: "Rivage chain" },
            { id: "nec-003", name: "Horizon Collar", price: "$7,200", material: "Platinum · Blue Sapphires", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop", alt: "Horizon collar" },
            { id: "pen-001", name: "Abyssal Pearl", price: "$3,200", material: "Oxidised Silver · Tahitian Pearl", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85&auto=format&fit=crop", alt: "Abyssal pendant" },
        ],
    },

    "nec-002": {
        id: "nec-002", name: "Rivage Chain", category: "Necklaces", price: "$3,900",
        material: "18k Gold · Champagne Diamonds",
        tagline: "Where shoreline meets shallows — matte to mirror.",
        story: "Inspired by the line where sand meets sea at dusk. The Rivage chain's links graduate from matte-finished to high-polish, creating a visual tide that moves with the wearer.",
        specs: { metal: "18k Yellow Gold, dual-finish (matte + polish)", stone: "12 Champagne Diamonds, 0.03ct each", origin: "Australia, Argyle-type", dimensions: "Length: 48cm · Link width: 4mm", weight: "24.8 grams", sizing: "Fixed length with concealed clasp" },
        description: { craftsmanship: "Each of the 86 links is individually finished — the first third matte-brushed, the middle third transitional, and the final third mirror-polished. This gradient is achieved through progressive polishing stages, not plating or coating, so the effect is permanent.", materials: "Champagne diamonds carry warm tones that complement yellow gold without the contrast of white diamonds. These stones are flush-set into every seventh link, appearing as subtle points of light along the chain.", inspiration: "The rivage — the French word for shoreline — is the most dynamic boundary in nature. It's never in the same place twice. This chain captures that transitional quality: always shifting between textures, never quite the same in any two moments of light." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=720&q=85&auto=format&fit=crop", alt: "Rivage Chain — full view", label: "Full View" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop", alt: "Rivage Chain — texture gradient", label: "Texture Gradient" },
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop", alt: "Rivage Chain — diamond detail", label: "Diamond Detail" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Progressive polishing stages", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=900&q=85&auto=format&fit=crop", alt: "Matte-to-polish gradient", caption: "The Tide Effect" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop", alt: "Flush-set champagne diamond", caption: "Points of Light" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "86 individual link finishing", caption: "86 Links, Each Unique" },
        ],
        related: [
            { id: "nec-001", name: "Perla Strand", price: "$5,600", material: "18k Rose Gold · South Sea Pearls", image: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=600&q=85&auto=format&fit=crop", alt: "Perla necklace" },
            { id: "nec-003", name: "Horizon Collar", price: "$7,200", material: "Platinum · Blue Sapphires", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop", alt: "Horizon collar" },
            { id: "pen-002", name: "Soleil Médaillon", price: "$2,800", material: "18k Gold · Citrine", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85&auto=format&fit=crop", alt: "Soleil pendant" },
        ],
    },

    "nec-003": {
        id: "nec-003", name: "Horizon Collar", category: "Necklaces", price: "$7,200",
        material: "Platinum · Blue Sapphires",
        tagline: "The place where sea meets sky — captured in platinum.",
        story: "Our most ambitious necklace. Seven graduated sapphires trace the colour shift of the ocean at the horizon line: from deep navy through cobalt to the palest sky blue.",
        specs: { metal: "950 Platinum, mirror polish", stone: "7 Sapphires, graduated colour (8.4ct total)", origin: "Sri Lanka and Madagascar", dimensions: "Inner circumference: 38cm · Width: 6mm at front", weight: "42 grams", sizing: "Fixed collar with concealed hinge" },
        description: { craftsmanship: "The collar is engineered as a single continuous curve using a concealed hinge mechanism. Each sapphire is individually set in a channel that follows the collar's curvature precisely. The colour graduation required sourcing from two different origins to achieve the full spectrum.", materials: "The darkest sapphires (navy) come from Sri Lanka's Ratnapura district, while the lighter stones (cornflower to pale blue) are from Madagascar's Ilakaka deposit. Together they create an unbroken colour gradient that mirrors the ocean's depth.", inspiration: "Stand at the edge of the sea at dawn and look where the water meets the sky. There's no line — just a gradual dissolution of one element into another. The Horizon Collar aims to hold that exact moment of dissolution." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=720&q=85&auto=format&fit=crop", alt: "Horizon Collar — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=720&q=85&auto=format&fit=crop", alt: "Horizon Collar — sapphire gradient", label: "Colour Gradient" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&q=85&auto=format&fit=crop", alt: "Horizon Collar — hinge mechanism", label: "Concealed Hinge" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Channel setting each sapphire", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop", alt: "Seven sapphires in gradient", caption: "Navy to Sky" },
            { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=85&auto=format&fit=crop", alt: "Channel setting close-up", caption: "The Continuous Curve" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Colour matching process", caption: "Two Origins, One Horizon" },
        ],
        related: [
            { id: "nec-001", name: "Perla Strand", price: "$5,600", material: "18k Rose Gold · Pearls", image: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=600&q=85&auto=format&fit=crop", alt: "Perla necklace" },
            { id: "rin-001", name: "Marée Solitaire", price: "$4,800", material: "Platinum · Sapphire", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop", alt: "Marée ring" },
            { id: "ear-001", name: "Ondine Drops", price: "$2,450", material: "18k White Gold · Aquamarine", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop", alt: "Ondine earrings" },
        ],
    },

    /* ───────────────────────────────────────
       RINGS
       ─────────────────────────────────────── */
    "rin-001": {
        id: "rin-001", name: "Marée Solitaire", category: "Rings", price: "$4,800",
        material: "Platinum · Blue Sapphire",
        tagline: "The rhythm of the tide, held in platinum.",
        story: "The Marée was born from a single morning on the Amalfi coast — watching the way light fractures across a wave just before it breaks. Our Creative Director spent three months translating that fleeting geometry into metal and stone.",
        specs: { metal: "950 Platinum, hand-polished to a mirror finish", stone: "Oval Blue Sapphire, 2.3 carats", origin: "Sri Lanka (Ceylon), ethically sourced", dimensions: "Band width: 2.8mm tapering to 1.8mm", weight: "8.4 grams", sizing: "Available in sizes 4–9, quarter sizes included" },
        description: { craftsmanship: "Each Marée ring begins as a single platinum ingot, forged and folded seventeen times by hand. The band's organic taper — wider at the shoulders, slimming toward the base — mirrors the way a wave narrows as it curls. The stone setting uses our signature 'floating' technique: four micro-prongs sculpted to follow the sapphire's natural contour, allowing maximum light to pass through the pavilion.", materials: "The platinum is sourced from a single certified refinery in Switzerland that works exclusively with recycled precious metals. The sapphire — a vivid cornflower blue with violet secondary hues — was cut in Ratnapura by a third-generation lapidary. At 2.3 carats, it sits in the perfect proportion for this band width.", inspiration: "The collection takes its name from the French word for tide — marée. Tides are the ocean's way of breathing: constant, rhythmic, and impossibly patient. We wanted a ring that carried that same quality. Something that felt like it had always existed." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=720&q=85&auto=format&fit=crop", alt: "Marée Solitaire — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=720&q=85&auto=format&fit=crop", alt: "Marée Solitaire — profile", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=720&q=85&auto=format&fit=crop", alt: "Marée Solitaire — stone detail", label: "Stone Detail" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop", alt: "Marée Solitaire — on surface", label: "On Surface" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Artisan finishing the ring", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop", alt: "Floating prong setting", caption: "The Floating Setting" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&auto=format&fit=crop", alt: "Platinum hand-polishing marks", caption: "Forty Hours of Polishing" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Artisan at work", caption: "The Artisan's Hand" },
        ],
        related: [
            { id: "rin-002", name: "Bosque Emerald", price: "$6,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop", alt: "Bosque ring" },
            { id: "nec-003", name: "Horizon Collar", price: "$7,200", material: "Platinum · Sapphires", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop", alt: "Horizon collar" },
            { id: "ear-001", name: "Ondine Drops", price: "$2,450", material: "18k White Gold · Aquamarine", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&auto=format&fit=crop", alt: "Ondine earrings" },
        ],
    },

    "rin-002": {
        id: "rin-002", name: "Bosque Emerald", category: "Rings", price: "$6,400",
        material: "18k Gold · Colombian Emerald",
        tagline: "The mystery of an ancient forest, captured in a single stone.",
        story: "Carved from a rare 4.7-carat Colombian emerald, The Bosque sits in a sculptural gold band inspired by intertwined branches. A piece that breathes with the spirit of the wild.",
        specs: { metal: "18k Yellow Gold, sculptural texture", stone: "Emerald-cut Colombian Emerald, 4.7 carats", origin: "Muzo, Colombia", dimensions: "Band width: 4mm (variable, sculptural)", weight: "11.2 grams", sizing: "Available in sizes 5–8" },
        description: { craftsmanship: "The band is sculpted from wax, not drawn on paper — our goldsmith works intuitively, building the branch forms layer by layer. The emerald sits in a claw setting that emerges organically from the branches, as if the stone grew there naturally.", materials: "Muzo emeralds are the world's most prized, known for their deep 'jardin' — the natural inclusions that give each stone a unique internal landscape. This specimen has exceptional transparency with characteristic three-phase inclusions visible under loupe.", inspiration: "He described walking through an ancient forest in the rain — the way every shade of green seemed to hold a secret. He wanted that mystery captured in a single stone." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=720&q=85&auto=format&fit=crop", alt: "Bosque Emerald — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=720&q=85&auto=format&fit=crop", alt: "Bosque Emerald — side profile", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=720&q=85&auto=format&fit=crop", alt: "Bosque Emerald — emerald detail", label: "Stone Detail" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Wax sculpting the branch forms", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85&auto=format&fit=crop", alt: "Sculptural branch texture", caption: "Grown, Not Made" },
            { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop", alt: "Emerald jardin inclusions", caption: "The Inner Garden" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Wax sculpting process", caption: "Intuition Over Blueprint" },
        ],
        related: [
            { id: "rin-001", name: "Marée Solitaire", price: "$4,800", material: "Platinum · Sapphire", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop", alt: "Marée ring" },
            { id: "rin-003", name: "Littoral Band", price: "$2,100", material: "18k Rose Gold", image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=85&auto=format&fit=crop", alt: "Littoral band" },
            { id: "bra-001", name: "Marea Cuff", price: "$3,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop", alt: "Marea cuff" },
        ],
    },

    "rin-003": {
        id: "rin-003", name: "Littoral Band", category: "Rings", price: "$2,100",
        material: "18k Rose Gold",
        tagline: "The quiet edge where land meets water.",
        story: "The Littoral is a meditation on simplicity — a pure band of rose gold with a surface texture inspired by wet sand at the tideline. No stones, no embellishment. Just metal, light, and the patience of the sea.",
        specs: { metal: "18k Rose Gold, sand-textured finish", stone: "None — pure metalwork", origin: "Recycled European gold", dimensions: "Band width: 5mm · Thickness: 1.8mm", weight: "6.8 grams", sizing: "Available in sizes 4–10, half sizes included" },
        description: { craftsmanship: "The sand texture is achieved by pressing the band into actual sand from the Cinque Terre coastline, then casting the impression. Each ring carries a unique imprint — a literal piece of the shore.", materials: "Our rose gold uses a proprietary alloy that produces a deeper, more coppery tone than commercial rose gold. It develops a subtle patina over years of wear, becoming more beautiful with time.", inspiration: "Littoral — the space between high tide and low tide — is a zone of constant transformation. This band is for people who find beauty in simplicity and who understand that the most profound things are often the most understated." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=720&q=85&auto=format&fit=crop", alt: "Littoral Band — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=720&q=85&auto=format&fit=crop", alt: "Littoral Band — texture detail", label: "Sand Texture" },
            { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=720&q=85&auto=format&fit=crop", alt: "Littoral Band — on hand", label: "On Hand" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Sand impression casting", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=900&q=85&auto=format&fit=crop", alt: "Sand impression close-up", caption: "A Piece of the Shore" },
            { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&auto=format&fit=crop", alt: "Rose gold patina development", caption: "More Beautiful With Time" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Cinque Terre sand casting", caption: "From the Cinque Terre" },
        ],
        related: [
            { id: "rin-001", name: "Marée Solitaire", price: "$4,800", material: "Platinum · Sapphire", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop", alt: "Marée ring" },
            { id: "rin-002", name: "Bosque Emerald", price: "$6,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop", alt: "Bosque ring" },
            { id: "bra-001", name: "Marea Cuff", price: "$3,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop", alt: "Marea cuff" },
        ],
    },

    /* ───────────────────────────────────────
       BRACELETS
       ─────────────────────────────────────── */
    "bra-001": {
        id: "bra-001", name: "Marea Cuff", category: "Bracelets", price: "$3,400",
        material: "18k Gold · Emerald Cabochon",
        tagline: "A single emerald, cradled by the ocean's gold.",
        story: "The Marea cuff is the collection's boldest statement — an organically sculpted gold bangle with a single emerald cabochon that sits like an island in a sea of warm metal.",
        specs: { metal: "18k Yellow Gold, organic sculptural finish", stone: "Emerald Cabochon, 2.8 carats", origin: "Zambia, ethically mined", dimensions: "Inner circumference: 16.5cm · Width: 14mm at widest", weight: "28 grams", sizing: "One size, slight flex for comfort" },
        description: { craftsmanship: "The cuff is hand-raised from a single sheet of gold — hammered, shaped, and sculpted over five days. The emerald sits in a rubover setting that flows seamlessly into the cuff's surface, as if the stone emerged naturally from the metal.", materials: "Zambian emeralds are prized for their slightly blue-green hue, which complements yellow gold beautifully. The cabochon cut — a smooth, unfaceted dome — was chosen to emphasize the stone's depth of colour rather than its sparkle.", inspiration: "Marea means 'tide' in Italian and Spanish. This cuff carries the same unstoppable presence: solid, warm, and impossible to ignore. It's a piece for someone who doesn't need to raise their voice to command a room." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop", alt: "Marea Cuff — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=720&q=85&auto=format&fit=crop", alt: "Marea Cuff — emerald detail", label: "Emerald Detail" },
            { src: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=720&q=85&auto=format&fit=crop", alt: "Marea Cuff — side profile", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Hand-raising the gold sheet", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=85&auto=format&fit=crop", alt: "Emerald cabochon dome", caption: "Depth Over Sparkle" },
            { src: "https://images.unsplash.com/photo-1599459183200-59c3b0208c09?w=900&q=85&auto=format&fit=crop", alt: "Rubover setting detail", caption: "Seamless Integration" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Five days of hand-raising", caption: "Hammered From One Sheet" },
        ],
        related: [
            { id: "bra-002", name: "Drift Bangle", price: "$2,750", material: "Sterling Silver · Sapphire", image: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=600&q=85&auto=format&fit=crop", alt: "Drift bangle" },
            { id: "rin-002", name: "Bosque Emerald", price: "$6,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=85&auto=format&fit=crop", alt: "Bosque ring" },
            { id: "nec-002", name: "Rivage Chain", price: "$3,900", material: "18k Gold · Champagne Diamonds", image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6bc?w=600&q=85&auto=format&fit=crop", alt: "Rivage chain" },
        ],
    },

    "bra-002": {
        id: "bra-002", name: "Drift Bangle", category: "Bracelets", price: "$2,750",
        material: "Sterling Silver · Sapphire",
        tagline: "Following the current — wherever it leads.",
        story: "The Drift bangle is fluid silver made solid — a continuous band that curves and narrows like a piece of driftwood shaped by decades of tide. A single sapphire marks the point where the form folds back on itself.",
        specs: { metal: "Sterling Silver, polished and satin dual-finish", stone: "Oval Blue Sapphire, 0.9 carats", origin: "Madagascar", dimensions: "Inner circumference: 17cm · Width: 3–8mm (variable)", weight: "18.6 grams", sizing: "One size with spring hinge" },
        description: { craftsmanship: "The bangle's continuously varying width is achieved by hand-forging — starting with a uniform silver rod and progressively drawing it thinner at one end while widening the other. The sapphire is set at the widest point, where the bangle's two ends overlap.", materials: "We use a germanium silver alloy that resists tarnishing while maintaining sterling silver's luminous white colour. The sapphire is selected for its cornflower blue — lighter than the Marée sapphire — to complement silver's cooler tone.", inspiration: "Driftwood is nature's sculpture: shaped not by intention but by persistence. The Drift bangle embodies that same effortless beauty — a form that appears simple but required extraordinary skill to achieve." },
        gallery: makeGallery([
            { src: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=720&q=85&auto=format&fit=crop", alt: "Drift Bangle — front view", label: "Front View" },
            { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=720&q=85&auto=format&fit=crop", alt: "Drift Bangle — sapphire overlap", label: "Sapphire Detail" },
            { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=720&q=85&auto=format&fit=crop", alt: "Drift Bangle — profile showing width variation", label: "Profile" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=720&q=85&auto=format&fit=crop", alt: "Hand-forging the silver rod", label: "Craftsmanship" },
        ]),
        detailImages: [
            { src: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=900&q=85&auto=format&fit=crop", alt: "Variable width taper", caption: "From 3mm to 8mm" },
            { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&q=85&auto=format&fit=crop", alt: "Sapphire at the overlap", caption: "Where Form Folds" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop", alt: "Drawing the silver rod thinner", caption: "Shaped by Persistence" },
        ],
        related: [
            { id: "bra-001", name: "Marea Cuff", price: "$3,400", material: "18k Gold · Emerald", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=85&auto=format&fit=crop", alt: "Marea cuff" },
            { id: "pen-003", name: "Vague Charm", price: "$1,450", material: "Sterling Silver · Moonstone", image: "https://images.unsplash.com/photo-1576022162028-3a64bf01e04d?w=600&q=85&auto=format&fit=crop", alt: "Vague charm" },
            { id: "ear-002", name: "Écume Studs", price: "$1,680", material: "Platinum · Diamond", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=85&auto=format&fit=crop", alt: "Écume studs" },
        ],
    },
};

export function getProductDetail(id) {
    return PRODUCT_DETAILS[id] || PRODUCT_DETAILS["rin-001"];
}

export default PRODUCT_DETAILS;
