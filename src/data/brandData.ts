import { Product, InstagramPost, ReelItem, Campaign, CommunityLook, BrandConfig } from '../types';

export const BRAND_CONFIG: BrandConfig = {
  name: 'FEATOUS',
  handle: '@FEATOUS',
  instagramUrl: 'https://instagram.com/featous',
  instagramProfilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  instagramBio: 'Built for your era. Streetwear • Active • Premium • 90s Retro Archive. Worldwide delivery.',
  isVerified: true,
  tagline: 'BUILT FOR YOUR ERA.',
  subheading: 'STREET. ACTIVE. PREMIUM. MADE FOR THE NEXT GENERATION.',
  manifestoLead: "WE DON'T FOLLOW TRENDS. WE CREATE OUR ERA.",
  manifestoBody: "FEATOUS exists at the intersection of high fashion, street culture, athletic discipline, and raw individuality. Every collection is engineered for a generation that refuses to fit into one single aesthetic box.",
  hashtags: ['#FEATOUS', '#WEARFEATOUS', '#FEATOUSERA'],
  stats: {
    posts: '348',
    followers: '284K',
    following: '42',
    dropsCompleted: '14',
    engagementRate: '5.2%',
    monthlyReach: '1.4M'
  },
  autoSyncInstagram: true,
  syncIntervalMinutes: 5,
  lastSyncedAt: new Date().toISOString(),
  heroImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=85&w=2000&auto=format&fit=crop',
  heroHeadline: 'FEATOUS BUILT FOR YOUR ERA.',
  heroBadge: 'FEATOUS DIGITAL CAMPAIGN 04',
  nextDropTitle: 'THE NEW DROP',
  nextDropSubtitle: 'NEW SEASON. NEW ENERGY.',
  nextDropCountdownText: '02 : 14 : 36 : 48',
  retroStoryTitle: 'OLD SCHOOL. NEW ENERGY.',
  retroStoryBody: 'Archival silhouettes reimagined through a modern lens. The Retro collection bridges the gap between 90s warehouse nostalgia and next-generation street velocity.',
  retroPolaroidImage: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop'
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-heavy-tee',
    name: 'FEATOUS OVERSIZED BOX TEE',
    collection: 'ACTIVE',
    tagline: 'BUILT FOR EVERYDAY MOVEMENT & HEAVY PULLS.',
    description: 'Constructed from custom 320 GSM combed carbon-washed cotton. Drop-shoulder geometric box cut with reinforced collar ribbing and tonal metallic micro-print.',
    price: '$68',
    colors: [
      { name: 'Onyx Black', hex: '#0a0a0c' },
      { name: 'Washed Charcoal', hex: '#262629' },
      { name: 'Raw Bone', hex: '#e3dfd7' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Carbon-Washed French Terry Cotton',
    weightGsm: '320 GSM',
    fit: 'Signature Boxy Relaxed Drop',
    images: {
      main: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['320 GSM', 'Carbon Wash', 'Signature Drop'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousHeavyTee'
  },
  {
    id: 'prod-tech-cargos',
    name: 'FEATOUS TACTICAL TRACK TROUSER',
    collection: 'ACTIVE',
    tagline: 'MOVE. TRAIN. CONQUER.',
    description: 'High-density water-repellent matte nylon blend with articulated knee darts, concealed matte-black zipper utility pockets, and adjustable bungee toggle hems.',
    price: '$120',
    colors: [
      { name: 'Stealth Black', hex: '#0f0f11' },
      { name: 'Asphalt Grey', hex: '#37373b' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    fabric: 'Matte Stretch Ripstop & Ballistic Polyamide',
    weightGsm: '280 GSM',
    fit: 'Ergonomic Tapered Modular Cut',
    images: {
      main: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['Weatherproof', 'Articulated Darts', 'Magnetic Cargo'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousTacticalTrack'
  },
  {
    id: 'prod-silk-knit-polo',
    name: 'FEATOUS CASHMERE-SILK KNIT POLO',
    collection: 'PREMIUM',
    tagline: 'EVERYDAY, ELEVATED.',
    description: 'Fine-gauge Milanese knit polo blending Mulberry silk and organic mercerized cotton. Seamless placket with brushed ruthenium metallic buttons and minimal rib trim.',
    price: '$145',
    colors: [
      { name: 'Midnight Charcoal', hex: '#1a1b1e' },
      { name: 'Ecru Chalk', hex: '#ede9df' },
      { name: 'Espresso', hex: '#2b231f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '65% Mercerized Cotton, 35% Mulberry Silk',
    weightGsm: '240 GSM Milanese',
    fit: 'Tailored Athletic Contour',
    images: {
      main: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['Mulberry Silk', 'Milanese Stitch', 'Ruthenium Hardware'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousSilkPolo'
  },
  {
    id: 'prod-pleated-trousers',
    name: 'FEATOUS WIDE-LEG TAILORED SLACK',
    collection: 'PREMIUM',
    tagline: 'ARCHITECTURAL DRAPE & EFFORTLESS PROPORTION.',
    description: 'Heavyweight tropical wool blend featuring deep double forward pleats, extended tab waistband, and continuous fluid break hemline.',
    price: '$165',
    colors: [
      { name: 'Jet Noir', hex: '#0d0d0f' },
      { name: 'Heather Shadow', hex: '#404147' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    fabric: 'Virgin Wool Blend with Japanese Cupro Lining',
    weightGsm: '340 GSM Drape',
    fit: 'High-Waist Fluid Wide Leg',
    images: {
      main: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['Double Pleated', 'Virgin Wool Blend', 'Extended Tab'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousWideSlacks'
  },
  {
    id: 'prod-retro-runner',
    name: 'FEATOUS FEAT.01 ARCHIVAL RUNNER',
    collection: 'RETRO',
    tagline: 'OLD SCHOOL. NEW ENERGY.',
    description: '90s warehouse rave silhouette reimagined with layered hairy suede, open-cell technical mesh, sculpted EVA midsole, and vulcanized gum lugged traction.',
    price: '$180',
    colors: [
      { name: 'Vintage Chalk / Obsidian', hex: '#ded8ce' },
      { name: 'Dark Mode / Chrome', hex: '#161618' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    fabric: 'Calfskin Suede, Ballistic Mesh, High-Rebound EVA',
    fit: 'True to Size / Padded Arch Collar',
    images: {
      main: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['90s Silhouette', 'Layered Suede', 'EVA Cushioning'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousRunner01'
  },
  {
    id: 'prod-acid-wash-denim',
    name: 'FEATOUS 1994 RAW-EDGE PANELED DENIM',
    collection: 'RETRO',
    tagline: 'ANALOG TEXTURES & HEAVY ROTATION.',
    description: '14.5oz Japanese selvedge denim treated with analog enzyme marble wash, curved knee panels, vintage tobacco chain-stitching, and nickel button-fly.',
    price: '$150',
    colors: [
      { name: 'Acid Marble Grey', hex: '#666970' },
      { name: 'Vintage Indigo Fade', hex: '#323c4a' }
    ],
    sizes: ['29', '31', '33', '35'],
    fabric: '14.5oz Japanese Kurabo Selvedge Cotton',
    weightGsm: '420 GSM Raw Feel',
    fit: '90s Straight Relaxed Thigh',
    images: {
      main: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['14.5oz Selvedge', 'Enzyme Stone Wash', 'Paneled Knees'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#Featous1994Denim'
  },
  {
    id: 'prod-cyber-shell',
    name: 'FEATOUS METALLIC PARACHUTE BOMBER',
    collection: 'PREMIUM',
    tagline: 'TECHNICAL ARCHITECTURE FOR AFTER DARK.',
    description: 'Coated liquid-metal sheen memory nylon with heavy RiRi dual-zip hardware, storm flap collar, articulated raglan sleeves, and custom geometric chest pocket.',
    price: '$210',
    colors: [
      { name: 'Liquid Gunmetal', hex: '#484a51' },
      { name: 'Deep Carbon', hex: '#111215' }
    ],
    sizes: ['M', 'L', 'XL'],
    fabric: 'Liquid Coated Memory Polyamide & Micro-Mesh',
    weightGsm: '300 GSM Technical',
    fit: 'Cropped Body & Oversized Sleeve Volume',
    images: {
      main: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['Liquid Sheen', 'Dual RiRi Hardware', 'Cropped Silhouette'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousParachuteBomber'
  },
  {
    id: 'prod-silver-signet',
    name: 'FEATOUS MONOLITH 925 SIGNET RING',
    collection: 'PREMIUM',
    tagline: 'SOLID STERLING HARDWARE.',
    description: 'Chunky geometric solid 925 sterling silver signet ring with engraved micro-serial numbers and hand-oxidized brushed industrial edges.',
    price: '$95',
    colors: [
      { name: 'Aged 925 Sterling Silver', hex: '#d4d8df' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    fabric: 'Solid 925 Sterling Silver (18.4 Grams)',
    fit: 'Comfort Fit Core',
    images: {
      main: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['925 Sterling', 'Oxidized Finish', 'Serial Numbered'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FeatousMonolithRing'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'carousel',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 18420,
    commentsCount: 312,
    caption: 'FEATOUS CAMPAIGN 04 // Shibuya night run. The Heavyweight 320 GSM Box Tee paired with tactical articulated trousers. Built for the era that never sleeps.\n\nCaptured on 35mm film in Tokyo.',
    tags: ['#FEATOUS', '#TokyoFashion', '#StreetwearSociety', '#GenZStyle', '#320GSM'],
    location: 'Shibuya, Tokyo',
    timestamp: '3 HOURS AGO',
    audioTrack: 'FEATOUS SOUNDS • Original Audio — Tokyo Midnight Echo',
    taggedProductIds: ['prod-heavy-tee', 'prod-tech-cargos'],
    comments: [
      {
        id: 'c1',
        user: 'kaito.matsuda',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'The silhouette on that tee is insane. When is the restock drop?! 🔥',
        timeAgo: '2h',
        likes: 42,
        isVerified: true
      },
      {
        id: 'c2',
        user: 'elena_vogue_noir',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        text: 'Cleanest campaign aesthetics in the industry right now 🖤',
        timeAgo: '1h',
        likes: 19
      },
      {
        id: 'c3',
        user: 'marcus.archive',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        text: 'Heavyweight drape looks heavyweight. Need this for London winter.',
        timeAgo: '45m',
        likes: 8
      }
    ]
  },
  {
    id: 'ig-2',
    type: 'reel',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 34910,
    commentsCount: 684,
    caption: 'HOW TO STYLE: FEATOUS RETRO RUNNERS // 3 silhouettes, 1 pair of FEAT.01s. Layered suede and raw selvedge denim combination.\n\nSave this for your next weekend fit breakdown.',
    tags: ['#FEATOUSERA', '#SneakerReels', '#RetroFashion', '#SneakerHead', '#GRWM'],
    location: 'Berlin Mitte',
    timestamp: '1 DAY AGO',
    audioTrack: 'Underworld • Born Slippy (FEATOUS 2026 Club Rework)',
    taggedProductIds: ['prod-retro-runner', 'prod-acid-wash-denim'],
    reelDuration: '0:34',
    comments: [
      {
        id: 'c4',
        user: 'berlin.threads',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
        text: 'That transition at 0:18 was perfection. Runner chunky profile hits hard.',
        timeAgo: '22h',
        likes: 88,
        isVerified: true
      },
      {
        id: 'c5',
        user: 'lucas_dior',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        text: 'Ordered mine yesterday, cannot wait to pair with the pleated trousers!',
        timeAgo: '16h',
        likes: 12
      }
    ]
  },
  {
    id: 'ig-3',
    type: 'image',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 14200,
    commentsCount: 198,
    caption: 'FEATOUS PREMIUM: The Milanese Cashmere-Silk Knit. Everyday, elevated to architectural luxury. No logos, pure craft and bespoke ruthenium hardware.',
    tags: ['#FEATOUSPREMIUM', '#LuxuryMenswear', '#MinimalistFit', '#CashmereSilk'],
    location: 'Milan, Italy',
    timestamp: '2 DAYS AGO',
    audioTrack: 'Ludovico Einaudi • Experience (Ambient Remix)',
    taggedProductIds: ['prod-silk-knit-polo', 'prod-pleated-trousers'],
    comments: [
      {
        id: 'c6',
        user: 'alessandro.style',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'Pure quiet luxury done with Gen-Z attitude. Masterpiece.',
        timeAgo: '1d',
        likes: 31
      }
    ]
  },
  {
    id: 'ig-4',
    type: 'image',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 29540,
    commentsCount: 520,
    caption: 'FEAT.01 ARCHIVAL RUNNERS on analog 35mm. Warehouse floor tests. The grip, the layered tactile suede, the vintage 90s proportions.',
    tags: ['#FEATOUS', '#ArchivalRunner', '#90sSneakers', '#AnalogPhotography'],
    location: 'Manchester Warehouse District',
    timestamp: '3 DAYS AGO',
    audioTrack: 'The Chemical Brothers • Star Guitar',
    taggedProductIds: ['prod-retro-runner'],
    comments: [
      {
        id: 'c7',
        user: 'kicksoftheday',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
        text: 'Shoe of the year contender right here.',
        timeAgo: '2d',
        likes: 67
      }
    ]
  },
  {
    id: 'ig-5',
    type: 'reel',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 41200,
    commentsCount: 890,
    caption: 'AFTER DARK // Cyber-noir rain in Hackney. The Parachute liquid-metal bomber facing down 2am storms. Water rolls right off.',
    tags: ['#FEATOUSAFTERDARK', '#Techwear', '#LondonStreetwear', '#Rainwear'],
    location: 'London, United Kingdom',
    timestamp: '4 DAYS AGO',
    audioTrack: 'Burial • Archangel (FEATOUS Soundscape)',
    taggedProductIds: ['prod-cyber-shell', 'prod-tech-cargos'],
    reelDuration: '0:28',
    comments: [
      {
        id: 'c8',
        user: 'hackney.youth',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
        text: 'The way the streetlights reflect off that fabric is ridiculous. 🌧️⚡',
        timeAgo: '3d',
        likes: 104,
        isVerified: true
      }
    ]
  },
  {
    id: 'ig-6',
    type: 'carousel',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 19800,
    commentsCount: 240,
    caption: 'FEATOUS 1994 RAW-EDGE DENIM. 14.5oz selvedge woven in Okayama, crafted to mold uniquely to your daily stride. Never wash, let it age like memory.',
    tags: ['#SelvedgeDenim', '#RawDenim', '#FEATOUSRETRO', '#FadeFriday'],
    location: 'Kyoto, Japan',
    timestamp: '5 DAYS AGO',
    audioTrack: 'Nujabes • Feather (Lofi Rework)',
    taggedProductIds: ['prod-acid-wash-denim'],
    comments: [
      {
        id: 'c9',
        user: 'denim.connoisseur',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        text: 'The honeycomb fades starting on that marble wash are looking insane already!',
        timeAgo: '4d',
        likes: 38
      }
    ]
  },
  {
    id: 'ig-7',
    type: 'image',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 16750,
    commentsCount: 180,
    caption: 'SOLID HARDWARE. The Monolith 925 Signet Ring. 18.4 grams of pure sterling silver, stamped with individual drop serials. Stacking with the activewear pieces.',
    tags: ['#FEATOUSJEWELRY', '#SterlingSilver', '#MensJewelry', '#SignetRing'],
    location: 'Stockholm, Sweden',
    timestamp: '6 DAYS AGO',
    audioTrack: 'Gesaffelstein • Opr',
    taggedProductIds: ['prod-silver-signet'],
    comments: [
      {
        id: 'c10',
        user: 'nordic.minimalism',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        text: 'The weight feels so solid in person. Best piece in the accessory collection.',
        timeAgo: '5d',
        likes: 24
      }
    ]
  },
  {
    id: 'ig-8',
    type: 'reel',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 38700,
    commentsCount: 710,
    caption: 'RUNWAY WALK: Double Pleat High-Rise Trousers in motion. Notice how the break lands over the chunky FEAT.01 sneakers. Casual elegance at speed.',
    tags: ['#FEATOUS', '#MenswearMovement', '#HighWaistPants', '#StreetTailoring'],
    location: 'Paris Fashion Week Off-Schedule',
    timestamp: '1 WEEK AGO',
    audioTrack: 'Massive Attack • Angel (FEATOUS Edit)',
    taggedProductIds: ['prod-pleated-trousers', 'prod-retro-runner'],
    reelDuration: '0:42',
    comments: [
      {
        id: 'c11',
        user: 'jean_baptiste',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        text: 'This is the exact silhouette men need in 2026. Phenomenal drape.',
        timeAgo: '6d',
        likes: 92
      }
    ]
  },
  {
    id: 'ig-9',
    type: 'image',
    handle: 'featous',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop'
    ],
    likes: 22100,
    commentsCount: 304,
    caption: 'FEATOUS ACTIVE: MOVE. TRAIN. CONQUER.\n\nFrom the iron room straight to the night streets. Engineered with four-way mechanical stretch that never bags out at the knees.',
    tags: ['#FEATOUSACTIVE', '#GymStreetwear', '#AestheticMovement', '#ConquerYourEra'],
    location: 'Los Angeles, Downtown Arts District',
    timestamp: '1 WEEK AGO',
    audioTrack: 'Kavinsky • Nightcall (Bass Boosted)',
    taggedProductIds: ['prod-heavy-tee', 'prod-tech-cargos'],
    comments: [
      {
        id: 'c12',
        user: 'aesthetic.athlete',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'Squatted in these yesterday. Unmatched durability and style.',
        timeAgo: '1w',
        likes: 47
      }
    ]
  }
];

export interface VideoPreset {
  id: string;
  name: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

export interface VoicePreset {
  id: string;
  name: string;
  narrator: string;
  type: string;
  audioUrl: string;
  description: string;
}

export const SAMPLE_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'vid-preset-1',
    name: 'Urban Streetwear Motion Loop',
    category: 'STREET STYLE',
    duration: '0:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
    description: 'High energy cinematic urban fashion cut with high-contrast motion.'
  },
  {
    id: 'vid-preset-2',
    name: 'Tokyo Midnight Runway Walk',
    category: 'STYLING',
    duration: '0:20',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop',
    description: 'Fast paced street styling sequence featuring oversized tailoring.'
  },
  {
    id: 'vid-preset-3',
    name: 'Backstage Fabric Lab & Texture',
    category: 'CAMPAIGN',
    duration: '0:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    description: 'Slow motion macro zoom showing heavy denim and fabric drape.'
  },
  {
    id: 'vid-preset-4',
    name: 'Metropolitan Silhouette Stride',
    category: 'STREET STYLE',
    duration: '0:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    description: 'Urban architecture backdrop with active streetwear stride.'
  }
];

export const SAMPLE_VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'voice-preset-1',
    name: 'Editorial Director Monologue',
    narrator: 'Creative Director (Tokyo Lab)',
    type: 'NARRATION',
    audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/deep_pulse.ogg',
    description: 'Deep, cinematic voiceover analyzing silhouette proportions and drape.'
  },
  {
    id: 'voice-preset-2',
    name: 'Streetwear Capsule Breakdown',
    narrator: '@kai.urbanist',
    type: 'STYLING GUIDE',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    description: 'Rapid 3-way styling tip commentary for oversized tee and pleat trouser pairings.'
  },
  {
    id: 'voice-preset-3',
    name: '1994 Analog Denim Lab Story',
    narrator: 'Fabric Engineer (Okayama)',
    type: 'FABRIC LECTURE',
    audioUrl: 'https://actions.google.com/sounds/v1/crowds/city_park_day.ogg',
    description: 'Raw tactile story on Kurabo selvedge weaving and volcanic pumice washing.'
  }
];

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'STYLING THE 320 GSM BOX TEE 3 WAYS',
    creator: '@kai.urbanist',
    views: '1.2M',
    likes: '142K',
    duration: '0:32',
    thumbnail: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
    category: 'STYLING',
    audioTrack: 'Original Sound — @kai.urbanist // Tokyo Night Drive',
    taggedProductIds: ['prod-heavy-tee', 'prod-pleated-trousers'],
    caption: 'Watch how simple proportions transform a basic box tee into high-fashion tailoring. 1) Oversized slouch with tactical trackpants, 2) French half-tuck with pleated wool slacks, 3) Layered under Parachute Bomber.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoType: 'preset',
    voiceAudioUrl: 'https://actions.google.com/sounds/v1/science_fiction/deep_pulse.ogg',
    voiceTitle: 'Narrated by @kai.urbanist (Styling Breakdown)',
    voiceEnabled: true
  },
  {
    id: 'reel-2',
    title: 'BEHIND THE SCENES: FEATOUS SHIBUYA CAMPAIGN',
    creator: '@featous',
    views: '890K',
    likes: '96K',
    duration: '0:45',
    thumbnail: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop',
    category: 'BEHIND THE SCENES',
    audioTrack: 'FEATOUS Studio • Shibuya Rain Analog Tape',
    taggedProductIds: ['prod-tech-cargos', 'prod-cyber-shell'],
    caption: 'Midnight in Shibuya. 35mm Hasselblad film, zero studio lights, pure city neon and authentic Gen-Z movement.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    videoType: 'preset',
    voiceAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    voiceTitle: 'Director Commentary: Shibuya Rain Tape',
    voiceEnabled: true
  },
  {
    id: 'reel-3',
    title: 'RETRO RELOADED: 1994 ACID WASH FABRIC LAB',
    creator: '@featous.lab',
    views: '640K',
    likes: '78K',
    duration: '0:28',
    thumbnail: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    category: 'CAMPAIGN',
    audioTrack: 'Daft Punk • Rollin & Scratchin (Vintage Mix)',
    taggedProductIds: ['prod-acid-wash-denim', 'prod-retro-runner'],
    caption: 'How our 14.5oz Kurabo selvedge denim is stone-washed with volcanic pumice to achieve authentic 90s grain.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoType: 'preset',
    voiceTitle: 'Analog Grain Audio Log',
    voiceEnabled: false
  },
  {
    id: 'reel-4',
    title: 'COMMUNITY FIT CHECK: SEOUL FASHION WEEK',
    creator: '@minho.vibe',
    views: '1.8M',
    likes: '210K',
    duration: '0:50',
    thumbnail: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    category: 'STREET STYLE',
    audioTrack: 'NewJeans • Ditto (Club Jersey Drill Remix)',
    taggedProductIds: ['prod-heavy-tee', 'prod-silver-signet'],
    caption: 'Asking random stylish people outside Dongdaemun Design Plaza what they are wearing. FEATOUS representation in full force!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    videoType: 'preset',
    voiceTitle: 'Seoul Street Mic Interview',
    voiceEnabled: true
  },
  {
    id: 'reel-5',
    title: 'MILANESE SILK-KNIT POLO TOUCH & DRAPE TEST',
    creator: '@featous',
    views: '510K',
    likes: '62K',
    duration: '0:22',
    thumbnail: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
    category: 'STYLING',
    audioTrack: 'Quiet Luxury Ambience • Milano 2026',
    taggedProductIds: ['prod-silk-knit-polo'],
    caption: 'Macro camera test showing the micro-gauge stitching and natural luster of 35% Mulberry Silk blended with mercerized organic cotton.',
    videoType: 'preset'
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-summer-26',
    title: 'FEATOUS SUMMER 26',
    season: 'SS/26 CAPSULE',
    subtitle: 'SOLAR FLARE & METROPOLITAN VELOCITY',
    tagline: 'HIGH-HEAT PERFORMANCE MEETS MINIMAL SILHOUETTE.',
    description: 'Designed for the relentless heat of modern megalopolises. Ultra-breathable carbon cotton, liquid-cooled mesh paneling, and featherweight parachute silhouettes.',
    heroImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'
    ],
    palette: ['#0A0A0C', '#2B2B30', '#E5E1D8', '#9B9A95'],
    vibe: 'Industrial Solar Brutalism',
    location: 'Los Angeles & Tokyo Overpasses'
  },
  {
    id: 'camp-street',
    title: 'FEATOUS STREET',
    season: 'CORE PERMANENT',
    subtitle: 'ASPHALT & HEAVYWEIGHT TEXTURES',
    tagline: 'AUTHENTIC STREET CULTURE BRED ON CONCRETE.',
    description: 'The foundation of the brand. 320+ GSM custom textiles, drop shoulders, reinforced construction built to survive skateboard friction and late-night movement.',
    heroImage: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop'
    ],
    palette: ['#000000', '#1C1C1F', '#56565C', '#DCD8CF'],
    vibe: 'Monochrome Asphalt Underground',
    location: 'Shibuya Backstreets & Hackney Alleys'
  },
  {
    id: 'camp-after-dark',
    title: 'FEATOUS AFTER DARK',
    season: 'NIGHT DIVISION',
    subtitle: 'CYBER-NOIR & REFLECTIVE HARDWARE',
    tagline: 'WHEN THE CITY LIGHTS TURN ELECTRIC.',
    description: 'Engineered for night owls, club culture, and nocturnal exploration. Liquid sheen memory fabrics, hidden stash utility zippers, and darkened ruthenium hardware.',
    heroImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop'
    ],
    palette: ['#050507', '#131418', '#3F444E', '#C0C6D1'],
    vibe: 'Techno Club Cyber-Noir',
    location: 'Berlin Berghain Perimeter & London Docks'
  },
  {
    id: 'camp-retro-reloaded',
    title: 'RETRO RELOADED',
    season: 'ARCHIVE 1994',
    subtitle: 'ANALOG GRAIN & WAREHOUSE RAVE VIBES',
    tagline: 'OLD SCHOOL DNA. MODERN REBELLION.',
    description: 'Honoring the golden decade of rave culture, acid wash denim, and chunky trail runners. Digitally refined without losing an ounce of analog grit.',
    heroImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
    ],
    palette: ['#1A1715', '#4A433E', '#9E948B', '#EAE4D9'],
    vibe: '35mm Film Grain & Vintage Rave',
    location: 'Manchester 90s Industrial Warehouses'
  }
];

export const COMMUNITY_LOOKS: CommunityLook[] = [
  {
    id: 'com-1',
    userHandle: '@alexander.noir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
    city: 'London, UK',
    likes: 3420,
    tags: ['#FEATOUS', '#WEARFEATOUS', '#LondonDrip'],
    outfitPieces: ['FEATOUS Oversized Box Tee (Charcoal)', 'FEAT.01 Archival Runners'],
    caption: 'Sunday coffee run in East London. The weight on this tee is second to none.'
  },
  {
    id: 'com-2',
    userHandle: '@ren_haruto',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop',
    city: 'Tokyo, Japan',
    likes: 5890,
    tags: ['#FEATOUSERA', '#HarajukuStyle', '#TacticalFashion'],
    outfitPieces: ['FEATOUS Tactical Track Trousers', 'Monolith 925 Signet Ring'],
    caption: 'Bungee toggle hems adjusted for high-top sneakers. Ready for Shibuya underground.'
  },
  {
    id: 'com-3',
    userHandle: '@maya.solis',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    city: 'Berlin, Germany',
    likes: 4210,
    tags: ['#WEARFEATOUS', '#BerlinFashion', '#GenderFluidStyle'],
    outfitPieces: ['FEATOUS Metallic Parachute Bomber', 'Wide-Leg Tailored Slack'],
    caption: 'Borrowing from the menswear archive. The liquid sheen in club lights is magic.'
  },
  {
    id: 'com-4',
    userHandle: '@tariq.visuals',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop',
    city: 'New York, USA',
    likes: 6730,
    tags: ['#FEATOUS', '#NYCFashionWeek', '#SOHOStyle'],
    outfitPieces: ['FEATOUS Cashmere-Silk Knit Polo', 'Wide-Leg Tailored Slack (Jet Noir)'],
    caption: 'Art gallery opening in SoHo. Pure texture, zero unnecessary logos.'
  },
  {
    id: 'com-5',
    userHandle: '@samuel.arch',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop',
    city: 'Seoul, South Korea',
    likes: 8120,
    tags: ['#FEATOUSERA', '#SeoulStreetwear', '#FEAT01'],
    outfitPieces: ['FEATOUS 1994 Raw-Edge Denim', 'FEAT.01 Archival Runners'],
    caption: 'Vintage acid wash tone hits different under Seoul neon signage.'
  },
  {
    id: 'com-6',
    userHandle: '@enzo_milano',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    city: 'Milan, Italy',
    likes: 3950,
    tags: ['#WEARFEATOUS', '#MilanoDrip', '#ActiveStreet'],
    outfitPieces: ['FEATOUS Oversized Box Tee (Bone)', 'Tactical Track Trousers'],
    caption: 'Post-gym espresso in Navigli. High performance with Italian tailoring sensibility.'
  }
];

export const DROPS_COUNTDOWN_TARGET = () => {
  // 2 days, 14 hours, 36 minutes dynamic target
  const d = new Date();
  d.setDate(d.getDate() + 2);
  d.setHours(d.getHours() + 14);
  d.setMinutes(d.getMinutes() + 36);
  return d.toISOString();
};
