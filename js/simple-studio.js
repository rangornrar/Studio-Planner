(function () {
  const StudioModels = window.LiteStudioModels;
  const { LANGUAGE_OPTIONS, LOCALES, LOCALE_CODES, TYPE_LABEL_TRANSLATIONS, SHORT_LABEL_KEYS, SHORT_LABEL_TRANSLATIONS, PRESET_TOKEN_TRANSLATIONS, UI_COPY, COLOR_NOUN_TRANSLATIONS, COLOR_MODIFIER_TRANSLATIONS } = window.LiteStudioLocales;
  const STUDIO = {
    width: 8,
    depth: 6,
    backdropDepth: 0.75,
    backdropHeight: 2.8
  };

  const PLAN_CORNER_RADIUS = 8;
  let planLabelQueue = [];
  const NUMERIC_TOKEN = /(f\/)?\d+(?:[.,]\d+)?(?:\s?[x×]\s?\d+(?:[.,]\d+)?)*(?:\s?(?:cm|mm|m|°|%))?/g;
  const STORAGE_KEY_LANGUAGE = "lite-studio-language";
  const STORAGE_KEY_CUSTOM_PRESETS = "lite-studio-custom-presets";
  const STORAGE_KEY_INSET_COLLAPSED = "lite-studio-inset-collapsed";


  const FLOOR_COLORS = [
    { id: "white", label: "Blanc", color: "#f1f3f5" },
    { id: "light-gray", label: "Gris clair", color: "#d7dbe0" },
    { id: "neutral-gray", label: "Gris neutre", color: "#a4aab2" },
    { id: "charcoal", label: "Anthracite", color: "#525963" },
    { id: "black", label: "Noir", color: "#181b20" },
    { id: "cream", label: "Creme", color: "#ece2d2" },
    { id: "sand", label: "Sable", color: "#c9af8f" },
    { id: "slate", label: "Bleu ardoise", color: "#60728a" }
  ];

  const BACKDROP_COLORS = [
    { id: "white", label: "Blanc", color: "#f7f7f3" },
    { id: "super-white", label: "Super blanc", color: "#fbfbf8" },
    { id: "black", label: "Noir", color: "#17181b" },
    { id: "light-gray", label: "Gris clair", color: "#d8dde0" },
    { id: "medium-gray", label: "Gris moyen", color: "#b8bec6" },
    { id: "neutral-gray", label: "Gris neutre", color: "#9ea4ac" },
    { id: "dark-gray", label: "Gris fonce", color: "#454b54" },
    { id: "thunder-gray", label: "Gris orage", color: "#6d747e" },
    { id: "charcoal", label: "Anthracite", color: "#32373f" },
    { id: "stone", label: "Pierre", color: "#c6beb4" },
    { id: "pebble", label: "Galet", color: "#a89f95" },
    { id: "cream", label: "Creme", color: "#efe4d4" },
    { id: "ivory", label: "Ivoire", color: "#f2ede1" },
    { id: "vanilla", label: "Vanille", color: "#efe1bf" },
    { id: "oat", label: "Avoine", color: "#d7ccb8" },
    { id: "beige", label: "Beige", color: "#d2b697" },
    { id: "camel", label: "Camel", color: "#b99268" },
    { id: "sand", label: "Sable", color: "#bb986f" },
    { id: "tan", label: "Sable chaud", color: "#c59a72" },
    { id: "caramel", label: "Caramel", color: "#b8784f" },
    { id: "mocha", label: "Moka", color: "#7a5f50" },
    { id: "cocoa", label: "Cacao", color: "#6b4f41" },
    { id: "chestnut", label: "Chataigne", color: "#8a5b46" },
    { id: "chocolate", label: "Chocolat", color: "#4e352e" },
    { id: "clay", label: "Argile", color: "#b2876a" },
    { id: "terracotta", label: "Terracotta", color: "#b66649" },
    { id: "rust", label: "Rouille", color: "#9d4d36" },
    { id: "brick", label: "Brique", color: "#8b3632" },
    { id: "burgundy", label: "Bordeaux", color: "#6d2431" },
    { id: "red", label: "Rouge", color: "#b83335" },
    { id: "coral", label: "Corail", color: "#d77967" },
    { id: "peach", label: "Peche", color: "#e6b391" },
    { id: "blush", label: "Rose poudre", color: "#d5b5bc" },
    { id: "dusty-rose", label: "Rose nude", color: "#bf8f95" },
    { id: "lavender", label: "Lavande", color: "#a39bbc" },
    { id: "lilac", label: "Lilas", color: "#bca9ca" },
    { id: "plum", label: "Prune", color: "#6d526f" },
    { id: "sky", label: "Bleu ciel", color: "#89afcc" },
    { id: "powder-blue", label: "Bleu poudre", color: "#b7cadc" },
    { id: "arctic-blue", label: "Bleu glacier", color: "#d8e8f1" },
    { id: "steel", label: "Bleu acier", color: "#5f7890" },
    { id: "cobalt", label: "Bleu cobalt", color: "#3f5f8f" },
    { id: "navy", label: "Bleu marine", color: "#22324d" },
    { id: "teal", label: "Sarcelle", color: "#2f6f72" },
    { id: "turquoise", label: "Turquoise", color: "#58a6a6" },
    { id: "mint", label: "Menthe", color: "#bcd8c9" },
    { id: "sage", label: "Sauge", color: "#95a08a" },
    { id: "olive", label: "Olive", color: "#737a58" },
    { id: "forest", label: "Vert foret", color: "#375542" },
    { id: "emerald", label: "Emeraude", color: "#1f7a62" },
    { id: "mustard", label: "Moutarde", color: "#bf9240" },
    { id: "sunflower", label: "Jaune studio", color: "#ddb64f" },
    { id: "chroma", label: "Vert chroma", color: "#41a54c" },
    { id: "chroma-blue", label: "Bleu chroma", color: "#2d63c8" }
  ];
  const ITEM_VARIANTS = {
    "subject-adult": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Adulte",
      sizeLabel: "58 x 58 cm",
      heightLabel: "H 1.75 m",
      description: "1 personne debout",
      width: 0.58,
      depth: 0.58,
      height: 1.75,
      shape: "ellipse"
    },
    "subject-child": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Enfant",
      sizeLabel: "44 x 44 cm",
      heightLabel: "H 1.30 m",
      description: "1 enfant debout",
      width: 0.44,
      depth: 0.44,
      height: 1.3,
      shape: "ellipse"
    },
    "subject-couple": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Couple serre",
      sizeLabel: "95 x 65 cm",
      heightLabel: "H 1.75 m",
      description: "2 personnes rapprochees",
      width: 0.95,
      depth: 0.65,
      height: 1.75,
      shape: "ellipse"
    },
    "camera-standard": {
      family: "camera",
      typeLabel: "Appareil",
      shortLabel: "Trepied standard",
      sizeLabel: "70 x 86 cm",
      heightLabel: "H 1.62 m",
      description: "Boitier sur trepied",
      width: 0.7,
      depth: 0.86,
      height: 1.62,
      shape: "rect"
    },
    "camera-high": {
      family: "camera",
      typeLabel: "Appareil",
      shortLabel: "Trepied haut",
      sizeLabel: "70 x 86 cm",
      heightLabel: "H 1.90 m",
      description: "Appareil pour prise haute",
      width: 0.7,
      depth: 0.86,
      height: 1.9,
      shape: "rect"
    },
    "camera-video": {
      family: "camera",
      typeLabel: "Camera video",
      shortLabel: "Trepied video",
      sizeLabel: "78 x 92 cm",
      heightLabel: "H 1.72 m",
      description: "Camera cinema ou interview",
      width: 0.78,
      depth: 0.92,
      height: 1.72,
      shape: "rect"
    },
    "softbox-octa90": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Octa 90",
      sizeLabel: "90 cm",
      heightLabel: "H 2.10 m",
      description: "Octabox compacte",
      width: 0.78,
      depth: 0.62,
      height: 2.1,
      shape: "rect"
    },
    "softbox-octa120": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Octa 120",
      sizeLabel: "120 cm",
      heightLabel: "H 2.18 m",
      description: "Octabox portrait",
      width: 0.92,
      depth: 0.68,
      height: 2.18,
      shape: "rect"
    },
    "softbox-rect60x90": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Recta 60 x 90",
      sizeLabel: "60 x 90 cm",
      heightLabel: "H 2.08 m",
      description: "Rectangulaire compacte",
      width: 0.72,
      depth: 0.52,
      height: 2.08,
      shape: "rect"
    },
    "softbox-rect90x120": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Recta 90 x 120",
      sizeLabel: "90 x 120 cm",
      heightLabel: "H 2.22 m",
      description: "Grande source diffuse",
      width: 1.02,
      depth: 0.68,
      height: 2.22,
      shape: "rect"
    },
    "softbox-parabolic150": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Parabolique 150",
      sizeLabel: "150 cm",
      heightLabel: "H 2.25 m",
      description: "Grande parabolique",
      width: 1.08,
      depth: 0.78,
      height: 2.25,
      shape: "rect"
    },
    "strip-30x120": {
      family: "striplight",
      typeLabel: "Striplight",
      shortLabel: "30 x 120",
      sizeLabel: "30 x 120 cm",
      heightLabel: "H 2.12 m",
      description: "Bande lumineuse fine",
      width: 0.32,
      depth: 0.52,
      height: 2.12,
      shape: "rect"
    },
    "strip-40x140": {
      family: "striplight",
      typeLabel: "Striplight",
      shortLabel: "40 x 140",
      sizeLabel: "40 x 140 cm",
      heightLabel: "H 2.22 m",
      description: "Bande lumineuse haute",
      width: 0.4,
      depth: 0.58,
      height: 2.22,
      shape: "rect"
    },
    "tube-60": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "60 cm",
      sizeLabel: "60 cm",
      heightLabel: "H 1.60 m",
      description: "Tube LED court",
      width: 0.22,
      depth: 0.32,
      height: 1.6,
      shape: "rect"
    },
    "tube-120": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "120 cm",
      sizeLabel: "120 cm",
      heightLabel: "H 2.05 m",
      description: "Tube LED standard",
      width: 0.24,
      depth: 0.42,
      height: 2.05,
      shape: "rect"
    },
    "tube-240": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "240 cm",
      sizeLabel: "240 cm",
      heightLabel: "H 2.30 m",
      description: "Tube LED long",
      width: 0.26,
      depth: 0.52,
      height: 2.3,
      shape: "rect"
    },
    "led-panel-1x1": {
      family: "softbox",
      typeLabel: "Panneau LED",
      shortLabel: "1 x 1",
      sizeLabel: "30 x 30 cm",
      heightLabel: "H 1.95 m",
      description: "Panneau LED carre",
      width: 0.42,
      depth: 0.38,
      height: 1.95,
      shape: "rect"
    },
    "led-panel-1x2": {
      family: "striplight",
      typeLabel: "Panneau LED",
      shortLabel: "1 x 2",
      sizeLabel: "30 x 60 cm",
      heightLabel: "H 2.05 m",
      description: "Panneau LED allonge",
      width: 0.36,
      depth: 0.56,
      height: 2.05,
      shape: "rect"
    },
    "beauty-dish-55": {
      family: "reflector",
      typeLabel: "Beauty Dish",
      shortLabel: "55 cm",
      sizeLabel: "55 cm",
      heightLabel: "H 2.00 m",
      description: "Dish beaute compact",
      width: 0.6,
      depth: 0.6,
      height: 2.0,
      shape: "circle"
    },
    "beauty-dish-70": {
      family: "reflector",
      typeLabel: "Beauty Dish",
      shortLabel: "70 cm",
      sizeLabel: "70 cm",
      heightLabel: "H 2.05 m",
      description: "Dish beaute standard",
      width: 0.74,
      depth: 0.74,
      height: 2.05,
      shape: "circle"
    },
    "umbrella-shoot-105": {
      family: "reflector",
      typeLabel: "Parapluie diffusant",
      shortLabel: "105 cm",
      sizeLabel: "105 cm",
      heightLabel: "H 2.10 m",
      description: "Shoot-through blanc",
      width: 0.98,
      depth: 0.98,
      height: 2.1,
      shape: "circle"
    },
    "umbrella-deep-135": {
      family: "reflector",
      typeLabel: "Parapluie profond",
      shortLabel: "135 cm",
      sizeLabel: "135 cm",
      heightLabel: "H 2.20 m",
      description: "Parapluie profond blanc",
      width: 1.16,
      depth: 1.16,
      height: 2.2,
      shape: "circle"
    },
    "umbrella-silver-150": {
      family: "reflector",
      typeLabel: "Parapluie argent",
      shortLabel: "150 cm",
      sizeLabel: "150 cm",
      heightLabel: "H 2.25 m",
      description: "Parapluie reflex argent",
      width: 1.26,
      depth: 1.26,
      height: 2.25,
      shape: "circle"
    },
    "lantern-65": {
      family: "reflector",
      typeLabel: "Lantern",
      shortLabel: "65 cm",
      sizeLabel: "65 cm",
      heightLabel: "H 2.10 m",
      description: "Boule diffuse compacte",
      width: 0.7,
      depth: 0.7,
      height: 2.1,
      shape: "circle"
    },
    "lantern-90": {
      family: "reflector",
      typeLabel: "Lantern",
      shortLabel: "90 cm",
      sizeLabel: "90 cm",
      heightLabel: "H 2.20 m",
      description: "Boule diffuse grande",
      width: 0.9,
      depth: 0.9,
      height: 2.2,
      shape: "circle"
    },
    "ringlight-45": {
      family: "reflector",
      typeLabel: "Ring Light",
      shortLabel: "45 cm",
      sizeLabel: "45 cm",
      heightLabel: "H 1.85 m",
      description: "Lumiere frontale circulaire",
      width: 0.5,
      depth: 0.5,
      height: 1.85,
      shape: "circle"
    },
    "fresnel-200": {
      family: "reflector",
      typeLabel: "Fresnel",
      shortLabel: "200 W",
      sizeLabel: "40 cm",
      heightLabel: "H 1.95 m",
      description: "Fresnel petite tete",
      width: 0.42,
      depth: 0.42,
      height: 1.95,
      shape: "circle"
    },
    "fresnel-650": {
      family: "reflector",
      typeLabel: "Fresnel",
      shortLabel: "650 W",
      sizeLabel: "55 cm",
      heightLabel: "H 2.05 m",
      description: "Fresnel standard",
      width: 0.56,
      depth: 0.56,
      height: 2.05,
      shape: "circle"
    },
    "projector-19": {
      family: "camera",
      typeLabel: "Projecteur optique",
      shortLabel: "19 deg",
      sizeLabel: "45 x 50 cm",
      heightLabel: "H 2.00 m",
      description: "Optical spot faisceau serre",
      width: 0.46,
      depth: 0.52,
      height: 2.0,
      shape: "rect"
    },
    "projector-36": {
      family: "camera",
      typeLabel: "Projecteur optique",
      shortLabel: "36 deg",
      sizeLabel: "45 x 50 cm",
      heightLabel: "H 2.00 m",
      description: "Optical spot faisceau moyen",
      width: 0.46,
      depth: 0.52,
      height: 2.0,
      shape: "rect"
    },
    "reflector-80": {
      family: "reflector",
      typeLabel: "Reflecteur",
      shortLabel: "80 cm",
      sizeLabel: "80 cm",
      heightLabel: "H 1.70 m",
      description: "Reflecteur compact",
      width: 0.8,
      depth: 0.8,
      height: 1.7,
      shape: "circle"
    },
    "reflector-110": {
      family: "reflector",
      typeLabel: "Reflecteur",
      shortLabel: "110 cm",
      sizeLabel: "110 cm",
      heightLabel: "H 1.84 m",
      description: "Reflecteur grand format",
      width: 1.1,
      depth: 1.1,
      height: 1.84,
      shape: "circle"
    },
    "reflector-panel": {
      family: "vflat",
      typeLabel: "Reflecteur panneau",
      shortLabel: "120 x 180",
      sizeLabel: "120 x 180 cm",
      heightLabel: "H 1.80 m",
      description: "Grand rebond blanc",
      width: 1.2,
      depth: 0.12,
      height: 1.8,
      shape: "rect"
    },
    "flag-60x90": {
      family: "flag",
      typeLabel: "Drapeau",
      shortLabel: "60 x 90",
      sizeLabel: "60 x 90 cm",
      heightLabel: "H 2.00 m",
      description: "Coupe-flux standard",
      width: 0.62,
      depth: 0.16,
      height: 2.0,
      shape: "rect"
    },
    "flag-90x120": {
      family: "flag",
      typeLabel: "Drapeau",
      shortLabel: "90 x 120",
      sizeLabel: "90 x 120 cm",
      heightLabel: "H 2.08 m",
      description: "Coupe-flux large",
      width: 0.9,
      depth: 0.18,
      height: 2.08,
      shape: "rect"
    },
    "cutter-45x120": {
      family: "flag",
      typeLabel: "Cutter",
      shortLabel: "45 x 120",
      sizeLabel: "45 x 120 cm",
      heightLabel: "H 2.05 m",
      description: "Coupe-flux etroit",
      width: 0.45,
      depth: 0.14,
      height: 2.05,
      shape: "rect"
    },
    "floppy-120x120": {
      family: "flag",
      typeLabel: "Floppy",
      shortLabel: "120 x 120",
      sizeLabel: "120 x 120 cm",
      heightLabel: "H 2.10 m",
      description: "Drapeau double volet",
      width: 1.08,
      depth: 0.2,
      height: 2.1,
      shape: "rect"
    },
    "scrim-100": {
      family: "flag",
      typeLabel: "Scrim",
      shortLabel: "100 x 100",
      sizeLabel: "100 x 100 cm",
      heightLabel: "H 2.00 m",
      description: "Cadre diffusion legere",
      width: 1.0,
      depth: 0.12,
      height: 2.0,
      shape: "rect"
    },
    "scrim-150": {
      family: "flag",
      typeLabel: "Scrim",
      shortLabel: "150 x 150",
      sizeLabel: "150 x 150 cm",
      heightLabel: "H 2.18 m",
      description: "Cadre diffusion grand",
      width: 1.35,
      depth: 0.14,
      height: 2.18,
      shape: "rect"
    },
    "diffusion-100x150": {
      family: "vflat",
      typeLabel: "Cadre diffusion",
      shortLabel: "100 x 150",
      sizeLabel: "100 x 150 cm",
      heightLabel: "H 2.05 m",
      description: "Cadre diffusion portrait",
      width: 1.0,
      depth: 0.1,
      height: 2.05,
      shape: "rect"
    },
    "diffusion-200x200": {
      family: "vflat",
      typeLabel: "Cadre diffusion",
      shortLabel: "200 x 200",
      sizeLabel: "200 x 200 cm",
      heightLabel: "H 2.30 m",
      description: "Cadre diffusion grande taille",
      width: 1.8,
      depth: 0.12,
      height: 2.3,
      shape: "rect"
    },
    "vflat-100x200": {
      family: "vflat",
      typeLabel: "V-Flat",
      shortLabel: "100 x 200",
      sizeLabel: "100 x 200 cm",
      heightLabel: "H 2.00 m",
      description: "Panneau de controle compact",
      width: 1.0,
      depth: 0.2,
      height: 2.0,
      shape: "rect"
    },
    "vflat-120x240": {
      family: "vflat",
      typeLabel: "V-Flat",
      shortLabel: "120 x 240",
      sizeLabel: "120 x 240 cm",
      heightLabel: "H 2.40 m",
      description: "Panneau grand format",
      width: 1.2,
      depth: 0.22,
      height: 2.4,
      shape: "rect"
    },
    "foamcore-100x150": {
      family: "vflat",
      typeLabel: "Foamcore",
      shortLabel: "100 x 150",
      sizeLabel: "100 x 150 cm",
      heightLabel: "H 1.85 m",
      description: "Panneau mousse leger",
      width: 1.0,
      depth: 0.08,
      height: 1.85,
      shape: "rect"
    },
    "negfill-120x200": {
      family: "vflat",
      typeLabel: "Negative Fill",
      shortLabel: "120 x 200",
      sizeLabel: "120 x 200 cm",
      heightLabel: "H 2.00 m",
      description: "Absorption de lumiere",
      width: 1.2,
      depth: 0.1,
      height: 2.0,
      shape: "rect"
    },
    "stool-low": {
      family: "stool",
      typeLabel: "Tabouret",
      shortLabel: "Bas",
      sizeLabel: "45 x 45 cm",
      heightLabel: "H 45 cm",
      description: "Assise basse",
      width: 0.45,
      depth: 0.45,
      height: 0.45,
      shape: "circle"
    },
    "stool-high": {
      family: "stool",
      typeLabel: "Tabouret",
      shortLabel: "Haut",
      sizeLabel: "52 x 52 cm",
      heightLabel: "H 65 cm",
      description: "Assise haute",
      width: 0.52,
      depth: 0.52,
      height: 0.65,
      shape: "circle"
    },
    "chair-standard": {
      family: "stool",
      typeLabel: "Chaise",
      shortLabel: "Standard",
      sizeLabel: "50 x 50 cm",
      heightLabel: "H 85 cm",
      description: "Chaise de posing",
      width: 0.5,
      depth: 0.5,
      height: 0.85,
      shape: "circle"
    },
    "chair-director": {
      family: "stool",
      typeLabel: "Chaise realisateur",
      shortLabel: "Plateau",
      sizeLabel: "58 x 58 cm",
      heightLabel: "H 1.10 m",
      description: "Chaise de plateau",
      width: 0.58,
      depth: 0.58,
      height: 1.1,
      shape: "circle"
    },
    "bench-120": {
      family: "table",
      typeLabel: "Banc",
      shortLabel: "120 cm",
      sizeLabel: "120 x 40 cm",
      heightLabel: "H 48 cm",
      description: "Banc portrait famille",
      width: 1.2,
      depth: 0.4,
      height: 0.48,
      shape: "rect"
    },
    "sofa-180": {
      family: "table",
      typeLabel: "Canape",
      shortLabel: "180 cm",
      sizeLabel: "180 x 80 cm",
      heightLabel: "H 88 cm",
      description: "Canape lifestyle",
      width: 1.8,
      depth: 0.8,
      height: 0.88,
      shape: "rect"
    },
    "cube-50": {
      family: "table",
      typeLabel: "Cube posing",
      shortLabel: "50 cm",
      sizeLabel: "50 x 50 cm",
      heightLabel: "H 50 cm",
      description: "Cube d'assise ou pose",
      width: 0.5,
      depth: 0.5,
      height: 0.5,
      shape: "rect"
    },
    "applebox-full": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Full",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 20 cm",
      description: "Caisse full",
      width: 0.5,
      depth: 0.3,
      height: 0.2,
      shape: "rect"
    },
    "applebox-half": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Half",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 10 cm",
      description: "Caisse half",
      width: 0.5,
      depth: 0.3,
      height: 0.1,
      shape: "rect"
    },
    "applebox-quarter": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Quarter",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 5 cm",
      description: "Caisse quarter",
      width: 0.5,
      depth: 0.3,
      height: 0.05,
      shape: "rect"
    },
    "table-120": {
      family: "table",
      typeLabel: "Table",
      shortLabel: "120 x 70",
      sizeLabel: "120 x 70 cm",
      heightLabel: "H 78 cm",
      description: "Table de produit",
      width: 1.2,
      depth: 0.7,
      height: 0.78,
      shape: "rect"
    },
    "table-160": {
      family: "table",
      typeLabel: "Table",
      shortLabel: "160 x 80",
      sizeLabel: "160 x 80 cm",
      heightLabel: "H 78 cm",
      description: "Table de stylisme",
      width: 1.6,
      depth: 0.8,
      height: 0.78,
      shape: "rect"
    },
    "table-round": {
      family: "table",
      typeLabel: "Table ronde",
      shortLabel: "90 cm",
      sizeLabel: "90 cm",
      heightLabel: "H 76 cm",
      description: "Petite table ronde",
      width: 0.9,
      depth: 0.9,
      height: 0.76,
      shape: "rect"
    },
    "cart-rolling": {
      family: "table",
      typeLabel: "Chariot",
      shortLabel: "Rolling cart",
      sizeLabel: "80 x 50 cm",
      heightLabel: "H 92 cm",
      description: "Chariot accessoires ou tether",
      width: 0.8,
      depth: 0.5,
      height: 0.92,
      shape: "rect"
    },
    "ladder-small": {
      family: "table",
      typeLabel: "Escabeau",
      shortLabel: "Petit",
      sizeLabel: "60 x 45 cm",
      heightLabel: "H 1.10 m",
      description: "Escabeau photographe",
      width: 0.6,
      depth: 0.45,
      height: 1.1,
      shape: "rect"
    },
    "flash-head-compact": {
      family: "reflector",
      typeLabel: "Tete flash",
      shortLabel: "Compacte",
      sizeLabel: "24 x 24 cm",
      heightLabel: "H 2.10 m",
      description: "Flash monobloc compact sur pied",
      width: 0.24,
      depth: 0.24,
      height: 2.1,
      shape: "circle"
    },
    "flash-head-pro": {
      family: "reflector",
      typeLabel: "Tete flash",
      shortLabel: "Pro",
      sizeLabel: "28 x 28 cm",
      heightLabel: "H 2.20 m",
      description: "Flash studio puissant sur pied",
      width: 0.28,
      depth: 0.28,
      height: 2.2,
      shape: "circle"
    },
    "cob-led-300": {
      family: "reflector",
      typeLabel: "COB LED",
      shortLabel: "300 W",
      sizeLabel: "32 x 32 cm",
      heightLabel: "H 2.15 m",
      description: "Projecteur LED continu polyvalent",
      width: 0.32,
      depth: 0.32,
      height: 2.15,
      shape: "circle"
    },
    "cob-led-600": {
      family: "reflector",
      typeLabel: "COB LED",
      shortLabel: "600 W",
      sizeLabel: "38 x 38 cm",
      heightLabel: "H 2.25 m",
      description: "Projecteur LED puissant pour modeleurs",
      width: 0.38,
      depth: 0.38,
      height: 2.25,
      shape: "circle"
    },
    "hmi-1200": {
      family: "reflector",
      typeLabel: "HMI",
      shortLabel: "1200 W",
      sizeLabel: "42 x 42 cm",
      heightLabel: "H 2.35 m",
      description: "Source daylight puissante sur pied",
      width: 0.42,
      depth: 0.42,
      height: 2.35,
      shape: "circle"
    },
    "cstand-grip": {
      family: "stand",
      typeLabel: "Pied C",
      shortLabel: "Grip",
      sizeLabel: "85 x 85 cm",
      heightLabel: "H 2.40 m",
      description: "Pied C avec grip head",
      width: 0.85,
      depth: 0.85,
      height: 2.4,
      shape: "rect"
    },
    "cstand-arm": {
      family: "stand",
      typeLabel: "Pied C",
      shortLabel: "Bras 40 in",
      sizeLabel: "110 x 85 cm",
      heightLabel: "H 2.40 m",
      description: "Pied C avec bras et grip head",
      width: 1.1,
      depth: 0.85,
      height: 2.4,
      shape: "rect"
    },
    "combo-stand": {
      family: "stand",
      typeLabel: "Pied combo",
      shortLabel: "Junior",
      sizeLabel: "90 x 90 cm",
      heightLabel: "H 3.20 m",
      description: "Pied combo pour grosses sources",
      width: 0.9,
      depth: 0.9,
      height: 3.2,
      shape: "rect"
    },
    "roller-stand": {
      family: "stand",
      typeLabel: "Pied roller",
      shortLabel: "Low base",
      sizeLabel: "88 x 88 cm",
      heightLabel: "H 2.90 m",
      description: "Pied a roulettes pour sources lourdes",
      width: 0.88,
      depth: 0.88,
      height: 2.9,
      shape: "rect"
    },
    "boom-stand": {
      family: "stand",
      typeLabel: "Girafe",
      shortLabel: "Boom",
      sizeLabel: "150 x 90 cm",
      heightLabel: "H 2.80 m",
      description: "Girafe pour overhead et perche",
      width: 1.5,
      depth: 0.9,
      height: 2.8,
      shape: "rect"
    },
    "sandbag-single": {
      family: "table",
      typeLabel: "Sac de lest",
      shortLabel: "Simple",
      sizeLabel: "30 x 18 cm",
      heightLabel: "H 10 cm",
      description: "Lest pour securiser un pied",
      width: 0.3,
      depth: 0.18,
      height: 0.1,
      shape: "rect"
    },
    "sandbag-double": {
      family: "table",
      typeLabel: "Sac de lest",
      shortLabel: "Double",
      sizeLabel: "42 x 20 cm",
      heightLabel: "H 12 cm",
      description: "Lest double pour gros pied",
      width: 0.42,
      depth: 0.2,
      height: 0.12,
      shape: "rect"
    },
    "tether-station": {
      family: "table",
      typeLabel: "Station tether",
      shortLabel: "Laptop",
      sizeLabel: "60 x 40 cm",
      heightLabel: "H 1.05 m",
      description: "Station de controle capture",
      width: 0.6,
      depth: 0.4,
      height: 1.05,
      shape: "rect"
    },
    "monitor-station": {
      family: "table",
      typeLabel: "Moniteur controle",
      shortLabel: "24 pouces",
      sizeLabel: "70 x 45 cm",
      heightLabel: "H 1.40 m",
      description: "Moniteur client ou direction artistique",
      width: 0.7,
      depth: 0.45,
      height: 1.4,
      shape: "rect"
    },
    "dimmer-desk": {
      family: "table",
      typeLabel: "Console dimmer",
      shortLabel: "Desk",
      sizeLabel: "100 x 50 cm",
      heightLabel: "H 1.05 m",
      description: "Commande intensite et DMX",
      width: 1,
      depth: 0.5,
      height: 1.05,
      shape: "rect"
    },
    "armchair-90": {
      family: "table",
      typeLabel: "Fauteuil",
      shortLabel: "90 cm",
      sizeLabel: "90 x 80 cm",
      heightLabel: "H 82 cm",
      description: "Fauteuil lounge photo",
      width: 0.9,
      depth: 0.8,
      height: 0.82,
      shape: "rect"
    },
    "ottoman-80": {
      family: "stool",
      typeLabel: "Pouf",
      shortLabel: "80 cm",
      sizeLabel: "80 x 80 cm",
      heightLabel: "H 45 cm",
      description: "Assise basse ronde",
      width: 0.8,
      depth: 0.8,
      height: 0.45,
      shape: "ellipse"
    },
    "desk-140": {
      family: "table",
      typeLabel: "Bureau",
      shortLabel: "140 x 70",
      sizeLabel: "140 x 70 cm",
      heightLabel: "H 75 cm",
      description: "Poste stylisme ou retouche",
      width: 1.4,
      depth: 0.7,
      height: 0.75,
      shape: "rect"
    },
    "makeup-station": {
      family: "table",
      typeLabel: "Poste maquillage",
      shortLabel: "120 cm",
      sizeLabel: "120 x 55 cm",
      heightLabel: "H 1.75 m",
      description: "Table avec miroir pour HMUA",
      width: 1.2,
      depth: 0.55,
      height: 1.75,
      shape: "rect"
    },
    "mirror-standing": {
      family: "vflat",
      typeLabel: "Miroir",
      shortLabel: "Pied",
      sizeLabel: "60 x 170 cm",
      heightLabel: "H 1.75 m",
      description: "Miroir pied pour styling et pose",
      width: 0.6,
      depth: 0.06,
      height: 1.75,
      shape: "rect"
    }
  };

  const PALETTE_CATEGORIES = [
    {
      id: "subjects",
      label: "Sujets",
      groups: [
        {
          title: "Sujet",
          description: "Personnes et occupation du plateau.",
          variants: ["subject-adult", "subject-child", "subject-couple"]
        }
      ]
    },
    {
      id: "capture",
      label: "Capture",
      groups: [
        {
          title: "Camera",
          description: "Prise de vue photo ou video.",
          variants: ["camera-standard", "camera-high", "camera-video"]
        }
      ]
    },
    {
      id: "lights",
      label: "Lumieres",
      groups: [
        {
          title: "Sources diffuses",
          description: "Softbox, parapluies et lanternes.",
          variants: ["softbox-octa90", "softbox-octa120", "softbox-rect60x90", "softbox-rect90x120", "softbox-parabolic150", "umbrella-shoot-105", "umbrella-deep-135", "umbrella-silver-150", "lantern-65", "lantern-90"]
        },
        {
          title: "Sources dirigees",
          description: "Modeleurs plus precis, flashs et projecteurs.",
          variants: ["strip-30x120", "strip-40x140", "beauty-dish-55", "beauty-dish-70", "flash-head-compact", "flash-head-pro", "cob-led-300", "cob-led-600", "hmi-1200", "fresnel-200", "fresnel-650", "projector-19", "projector-36"]
        },
        {
          title: "LED et accessoires",
          description: "Panneaux, tubes et ring light.",
          variants: ["led-panel-1x1", "led-panel-1x2", "tube-60", "tube-120", "tube-240", "ringlight-45"]
        }
      ]
    },
    {
      id: "control",
      label: "Controle",
      groups: [
        {
          title: "Reflecteurs et rebond",
          description: "Controle doux et relance de lumiere.",
          variants: ["reflector-80", "reflector-110", "reflector-panel"]
        },
        {
          title: "Coupe-flux",
          description: "Flags, cutters et floppy.",
          variants: ["flag-60x90", "flag-90x120", "cutter-45x120", "floppy-120x120"]
        },
        {
          title: "Diffusion et flats",
          description: "Scrims, diffusion, V-flat et panneaux.",
          variants: ["scrim-100", "scrim-150", "diffusion-100x150", "diffusion-200x200", "vflat-100x200", "vflat-120x240", "foamcore-100x150", "negfill-120x200"]
        },
        {
          title: "Pieds et grip",
          description: "Supports, girafes, lest et grip de plateau.",
          variants: ["cstand-grip", "cstand-arm", "combo-stand", "roller-stand", "boom-stand", "sandbag-single", "sandbag-double"]
        },
        {
          title: "Controle plateau",
          description: "Stations tether, moniteurs et dimmer.",
          variants: ["tether-station", "monitor-station", "dimmer-desk"]
        }
      ]
    },
    {
      id: "furniture",
      label: "Mobilier",
      groups: [
        {
          title: "Assises",
          description: "Sieges et pose des sujets.",
          variants: ["stool-low", "stool-high", "chair-standard", "chair-director", "armchair-90", "ottoman-80", "bench-120", "sofa-180"]
        },
        {
          title: "Supports",
          description: "Tables, cubes, postes maquillage et boites.",
          variants: ["cube-50", "applebox-full", "applebox-half", "applebox-quarter", "table-120", "table-160", "table-round", "desk-140", "makeup-station"]
        },
        {
          title: "Plateau",
          description: "Aides de travail et accessoires volumineux.",
          variants: ["cart-rolling", "ladder-small", "mirror-standing"]
        }
      ]
    }
  ];
  const STUDIO_PRESET_CATEGORIES = [
    {
      id: "portrait",
      label: "Portrait",
      description: "Headshots, book comedien et portraits editoriaux polyvalents.",
      presets: [
        {
          id: "portrait-soft-45",
          name: "Portrait doux 45 deg",
          summary: "Octa principale, reflecteur oppose et drapeau de contour.",
          floorId: "white",
          backdropId: "neutral-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-octa120", x: 2.55, y: 2.3, rotation: 28 },
            { variantId: "reflector-110", x: 5.75, y: 3.1, rotation: 200 },
            { variantId: "flag-60x90", x: 6.35, y: 2.25, rotation: 200 }
          ]
        },
        {
          id: "headshot-corporate-clean",
          name: "Headshot corporate clean",
          summary: "Grande recta, rebond controle et station tether laterale.",
          floorId: "cream",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.35, y: 2.25, rotation: 30 },
            { variantId: "reflector-panel", x: 5.55, y: 3.1, rotation: 180 },
            { variantId: "vflat-100x200", x: 6.55, y: 3.05, rotation: 90 },
            { variantId: "tether-station", x: 5.95, y: 4.65, rotation: 0 }
          ]
        },
        {
          id: "actor-low-key",
          name: "Book comedien low key",
          summary: "Petite source douce, neg fill et contre de Fresnel.",
          floorId: "charcoal",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-octa90", x: 2.55, y: 2.2, rotation: 28 },
            { variantId: "negfill-120x200", x: 5.85, y: 3.0, rotation: 90 },
            { variantId: "fresnel-200", x: 6.2, y: 1.95, rotation: 210 },
            { variantId: "flag-60x90", x: 1.7, y: 2.8, rotation: 95 }
          ]
        },
        {
          id: "daylight-vflat",
          name: "Portrait daylight V-flat",
          summary: "Diffusion large type fenetre, source COB et V-flat de retour.",
          floorId: "cream",
          backdropId: "ivory",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "diffusion-200x200", x: 2.05, y: 2.55, rotation: 90 },
            { variantId: "cob-led-600", x: 1.25, y: 2.55, rotation: 25 },
            { variantId: "vflat-120x240", x: 6.0, y: 2.9, rotation: 90 },
            { variantId: "reflector-panel", x: 4.75, y: 4.1, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "beauty",
      label: "Beauty",
      description: "Schemas propres pour peau, maquillage et glamour studio.",
      presets: [
        {
          id: "beauty-clamshell",
          name: "Beauty clamshell",
          summary: "Beauty dish frontal, reflecteur sous visage et fond propre.",
          floorId: "cream",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "beauty-dish-70", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "reflector-110", x: 4.0, y: 4.0, rotation: 270 },
            { variantId: "flag-90x120", x: 2.6, y: 2.95, rotation: 90 },
            { variantId: "flag-90x120", x: 5.4, y: 2.95, rotation: 90 }
          ]
        },
        {
          id: "beauty-ring-clean",
          name: "Beauty ring clean",
          summary: "Ring light axial avec coupe laterale et rebond frontal.",
          floorId: "cream",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "ringlight-45", x: 4.0, y: 2.1, rotation: 90 },
            { variantId: "flag-60x90", x: 2.7, y: 2.95, rotation: 90 },
            { variantId: "flag-60x90", x: 5.3, y: 2.95, rotation: 90 },
            { variantId: "reflector-panel", x: 4.0, y: 4.0, rotation: 270 }
          ]
        },
        {
          id: "beauty-gloss-strips",
          name: "Beauty glossy strips",
          summary: "Dish central et deux strips pour les accroches laterales.",
          floorId: "white",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "beauty-dish-55", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "strip-30x120", x: 2.25, y: 3.0, rotation: 18 },
            { variantId: "strip-30x120", x: 5.75, y: 3.0, rotation: 162 },
            { variantId: "reflector-panel", x: 4.0, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "makeup-editorial",
          name: "Makeup editorial",
          summary: "Double LED douce avec station maquillage et miroir.",
          floorId: "cream",
          backdropId: "blush",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "stool-high", x: 4.0, y: 3.65, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.4, y: 2.35, rotation: 32 },
            { variantId: "led-panel-1x2", x: 5.45, y: 2.3, rotation: 148 },
            { variantId: "mirror-standing", x: 6.0, y: 2.8, rotation: 270 },
            { variantId: "makeup-station", x: 6.3, y: 3.75, rotation: 270 }
          ]
        }
      ]
    },
    {
      id: "corporate",
      label: "Corporate",
      description: "Portrait business, dirigeant et communication d entreprise.",
      presets: [
        {
          id: "corporate-gray-clean",
          name: "Corporate gris propre",
          summary: "Recta cle, rebond doux et tether pour flux rapide.",
          floorId: "light-gray",
          backdropId: "neutral-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.35, y: 2.35, rotation: 30 },
            { variantId: "reflector-110", x: 5.7, y: 3.1, rotation: 190 },
            { variantId: "flag-60x90", x: 6.35, y: 2.3, rotation: 200 },
            { variantId: "tether-station", x: 5.9, y: 4.6, rotation: 0 }
          ]
        },
        {
          id: "executive-desk",
          name: "Portrait dirigeant bureau",
          summary: "Bureau hero, LED cle et fond structure video corporate.",
          floorId: "sand",
          backdropId: "steel",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.65, rotation: 0 },
            { variantId: "chair-standard", x: 4.0, y: 4.1, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.4, y: 2.35, rotation: 30 },
            { variantId: "tube-120", x: 6.15, y: 1.85, rotation: 180 },
            { variantId: "monitor-station", x: 5.9, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "linkedin-umbrella",
          name: "LinkedIn umbrella",
          summary: "Parapluie diffusant, petit fill et fond pastel corporate.",
          floorId: "cream",
          backdropId: "powder-blue",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "umbrella-shoot-105", x: 2.45, y: 2.2, rotation: 34 },
            { variantId: "reflector-80", x: 5.7, y: 3.0, rotation: 196 },
            { variantId: "vflat-100x200", x: 6.55, y: 3.05, rotation: 90 }
          ]
        }
      ]
    },
    {
      id: "mode",
      label: "Mode",
      description: "Silhouettes, plein pied et eclairage editoriale plus contraste.",
      presets: [
        {
          id: "fashion-parabolic",
          name: "Mode parabolique plus strips",
          summary: "Grande source cle, deux strips d accent et neg fill lateral.",
          floorId: "light-gray",
          backdropId: "white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.3, y: 2.15, rotation: 30 },
            { variantId: "strip-40x140", x: 2.2, y: 4.2, rotation: 340 },
            { variantId: "strip-40x140", x: 5.85, y: 4.05, rotation: 200 },
            { variantId: "negfill-120x200", x: 6.6, y: 3.0, rotation: 90 }
          ]
        },
        {
          id: "catalog-clean",
          name: "Plein pied catalogue",
          summary: "Deux grandes rectas croisees et grand rebond frontal.",
          floorId: "white",
          backdropId: "cream",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.35, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.15, y: 2.3, rotation: 24 },
            { variantId: "softbox-rect90x120", x: 5.9, y: 2.35, rotation: 156 },
            { variantId: "reflector-panel", x: 4.0, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "fashion-silhouette-strips",
          name: "Silhouette strips",
          summary: "Deux bandes laterales pour detacher la silhouette sur fond dense.",
          floorId: "charcoal",
          backdropId: "dark-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.15, y: 2.9, rotation: 8 },
            { variantId: "strip-40x140", x: 5.85, y: 2.9, rotation: 172 },
            { variantId: "reflector-panel", x: 4.0, y: 4.4, rotation: 0 }
          ]
        },
        {
          id: "editorial-projector",
          name: "Editorial projector",
          summary: "Projecteur optique, fill doux et coupe laterale pour texture mode.",
          floorId: "charcoal",
          backdropId: "clay",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-19", x: 2.25, y: 2.15, rotation: 28 },
            { variantId: "softbox-octa90", x: 5.65, y: 2.45, rotation: 150 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "flag-90x120", x: 6.65, y: 2.9, rotation: 90 },
            { variantId: "applebox-full", x: 5.65, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "highkey-umbrellas",
          name: "High key umbrellas",
          summary: "Double parapluie profond, rebond frontal et V-flats pour le blanc.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-deep-135", x: 2.05, y: 2.3, rotation: 28 },
            { variantId: "umbrella-deep-135", x: 5.95, y: 2.3, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.5, rotation: 0 },
            { variantId: "vflat-120x240", x: 1.1, y: 2.95, rotation: 90 },
            { variantId: "vflat-120x240", x: 6.9, y: 2.95, rotation: 90 }
          ]
        }
      ]
    },
    {
      id: "product",
      label: "Produit",
      description: "Packshots, table-top et plateaux publicitaires controles.",
      presets: [
        {
          id: "packshot-tabletop",
          name: "Packshot table-top",
          summary: "Table produit, deux rectas, diffusion frontale et rebonds.",
          floorId: "white",
          backdropId: "white",
          items: [
            { variantId: "table-120", x: 4.0, y: 2.95, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-rect60x90", x: 2.55, y: 2.1, rotation: 34 },
            { variantId: "softbox-rect60x90", x: 5.45, y: 2.1, rotation: 146 },
            { variantId: "diffusion-100x150", x: 4.0, y: 1.55, rotation: 0 },
            { variantId: "reflector-panel", x: 4.0, y: 4.15, rotation: 0 },
            { variantId: "applebox-full", x: 5.85, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "bottle-specular",
          name: "Bouteille speculaire",
          summary: "Deux strips, grande diffusion frontale et coupe noire laterale.",
          floorId: "white",
          backdropId: "white",
          items: [
            { variantId: "table-120", x: 4.0, y: 2.95, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "strip-30x120", x: 2.45, y: 2.45, rotation: 26 },
            { variantId: "strip-30x120", x: 5.55, y: 2.45, rotation: 154 },
            { variantId: "diffusion-200x200", x: 4.0, y: 1.55, rotation: 0 },
            { variantId: "negfill-120x200", x: 6.6, y: 2.95, rotation: 90 },
            { variantId: "applebox-half", x: 5.7, y: 4.35, rotation: 0 }
          ]
        },
        {
          id: "jewelry-scrim",
          name: "Bijou scrim control",
          summary: "Petite source COB, scrim de coupe et fill discret.",
          floorId: "white",
          backdropId: "light-gray",
          items: [
            { variantId: "table-120", x: 4.0, y: 3.0, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "cob-led-300", x: 2.15, y: 2.25, rotation: 32 },
            { variantId: "scrim-100", x: 2.85, y: 2.6, rotation: 24 },
            { variantId: "reflector-80", x: 5.35, y: 3.0, rotation: 180 },
            { variantId: "flag-60x90", x: 6.1, y: 2.45, rotation: 200 },
            { variantId: "applebox-quarter", x: 5.7, y: 4.25, rotation: 0 }
          ]
        },
        {
          id: "food-editorial",
          name: "Food editorial top light",
          summary: "Lantern haute, retours mousse et chariot de styling.",
          floorId: "cream",
          backdropId: "oat",
          items: [
            { variantId: "table-160", x: 4.0, y: 3.25, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.75, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.55, y: 2.95, rotation: 90 },
            { variantId: "vflat-100x200", x: 2.1, y: 2.95, rotation: 90 },
            { variantId: "cart-rolling", x: 6.45, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "flatlay-clothing",
          name: "Flatlay vetement",
          summary: "Camera haute, double grande recta et echelle de prise de vue.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "table-160", x: 4.0, y: 3.1, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "ladder-small", x: 5.95, y: 5.05, rotation: 0 },
            { variantId: "softbox-rect90x120", x: 2.15, y: 2.2, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.85, y: 2.2, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.35, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "group",
      label: "Groupe",
      description: "Duo, famille, enfants et petites equipes en studio.",
      presets: [
        {
          id: "duo-soft-wide",
          name: "Duo source large",
          summary: "Grande octa cle, panel d appoint et drapeaux lateraux.",
          floorId: "light-gray",
          backdropId: "dark-gray",
          items: [
            { variantId: "subject-couple", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.3, y: 2.1, rotation: 28 },
            { variantId: "led-panel-1x2", x: 5.85, y: 2.4, rotation: 150 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "flag-90x120", x: 6.65, y: 2.9, rotation: 90 },
            { variantId: "bench-120", x: 4.0, y: 3.85, rotation: 0 }
          ]
        },
        {
          id: "family-soft-daylight",
          name: "Famille soft daylight",
          summary: "Grande source type fenetre, banc et retour frontal doux.",
          floorId: "cream",
          backdropId: "vanilla",
          items: [
            { variantId: "subject-adult", x: 3.35, y: 3.2, rotation: 270 },
            { variantId: "subject-child", x: 4.75, y: 3.25, rotation: 270 },
            { variantId: "subject-child", x: 5.35, y: 3.25, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.15, y: 2.1, rotation: 28 },
            { variantId: "reflector-panel", x: 5.85, y: 3.65, rotation: 180 },
            { variantId: "bench-120", x: 4.25, y: 3.95, rotation: 0 }
          ]
        },
        {
          id: "trio-corporate",
          name: "Trio corporate",
          summary: "Double recta propre pour equipe ou associes.",
          floorId: "light-gray",
          backdropId: "steel",
          items: [
            { variantId: "subject-couple", x: 3.55, y: 3.15, rotation: 270 },
            { variantId: "subject-adult", x: 5.25, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.1, y: 2.2, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.95, y: 2.25, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.4, rotation: 0 },
            { variantId: "bench-120", x: 4.2, y: 3.95, rotation: 0 }
          ]
        },
        {
          id: "kids-playful",
          name: "Kids playful",
          summary: "Double parapluie doux, cubes et fond plus vivant.",
          floorId: "cream",
          backdropId: "coral",
          items: [
            { variantId: "subject-child", x: 3.55, y: 3.15, rotation: 270 },
            { variantId: "subject-child", x: 4.55, y: 3.2, rotation: 270 },
            { variantId: "cube-50", x: 3.1, y: 3.65, rotation: 0 },
            { variantId: "cube-50", x: 5.05, y: 3.7, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-shoot-105", x: 2.2, y: 2.25, rotation: 34 },
            { variantId: "umbrella-shoot-105", x: 5.8, y: 2.25, rotation: 146 }
          ]
        }
      ]
    },
    {
      id: "boudoir",
      label: "Boudoir",
      description: "Ambiances intimes, douces ou luxueuses pour series boudoir.",
      presets: [
        {
          id: "boudoir-window-soft",
          name: "Boudoir fenetre douce",
          summary: "Grande diffusion laterale, sofa et retour naturel type hotel.",
          floorId: "cream",
          backdropId: "ivory",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "diffusion-200x200", x: 2.05, y: 2.45, rotation: 90 },
            { variantId: "cob-led-600", x: 1.15, y: 2.45, rotation: 28 },
            { variantId: "vflat-120x240", x: 6.1, y: 2.9, rotation: 90 },
            { variantId: "ottoman-80", x: 5.45, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "boudoir-armchair-lowkey",
          name: "Boudoir fauteuil low key",
          summary: "Parapluie argent, neg fill et accent tube pour contraste chic.",
          floorId: "charcoal",
          backdropId: "cocoa",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.45, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-silver-150", x: 2.15, y: 2.15, rotation: 28 },
            { variantId: "negfill-120x200", x: 6.45, y: 3.0, rotation: 90 },
            { variantId: "tube-120", x: 6.15, y: 1.9, rotation: 180 }
          ]
        },
        {
          id: "boudoir-lantern-lounge",
          name: "Boudoir lantern lounge",
          summary: "Lantern haute, fill lateral et petit salon editorial.",
          floorId: "sand",
          backdropId: "blush",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 3.75, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.7, rotation: 90 },
            { variantId: "strip-30x120", x: 6.0, y: 2.4, rotation: 168 },
            { variantId: "reflector-panel", x: 2.35, y: 3.55, rotation: 0 },
            { variantId: "ottoman-80", x: 5.2, y: 4.25, rotation: 0 }
          ]
        },
        {
          id: "boudoir-parabolic",
          name: "Boudoir parabolic",
          summary: "Grande source enveloppante, accent vertical et miroir d ambiance.",
          floorId: "cream",
          backdropId: "dusty-rose",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.4, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.2, y: 2.1, rotation: 30 },
            { variantId: "strip-40x140", x: 5.95, y: 3.35, rotation: 176 },
            { variantId: "mirror-standing", x: 6.45, y: 2.9, rotation: 270 }
          ]
        }
      ]
    },
    {
      id: "erotique",
      label: "Erotique",
      description: "Setups sensuels, low key ou graphiques, sans surcharge de scene.",
      presets: [
        {
          id: "erotique-silhouette-burgundy",
          name: "Erotique silhouette bordeaux",
          summary: "Deux strips de contour et fond bordeaux pour lignes plus denses.",
          floorId: "charcoal",
          backdropId: "burgundy",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.1, y: 2.95, rotation: 10 },
            { variantId: "strip-40x140", x: 5.9, y: 2.95, rotation: 170 },
            { variantId: "projector-36", x: 4.0, y: 1.65, rotation: 90 }
          ]
        },
        {
          id: "erotique-projector-shadow",
          name: "Erotique shadow projector",
          summary: "Projecteur optique, rim Fresnel et neg fill tres controle.",
          floorId: "black",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "projector-19", x: 2.25, y: 2.15, rotation: 28 },
            { variantId: "fresnel-650", x: 6.15, y: 2.2, rotation: 150 },
            { variantId: "negfill-120x200", x: 6.55, y: 3.3, rotation: 90 }
          ]
        },
        {
          id: "erotique-neon-tubes",
          name: "Erotique neon tubes",
          summary: "Deux tubes longs et un COB frontal pour ambiance neon studio.",
          floorId: "charcoal",
          backdropId: "plum",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "tube-240", x: 2.05, y: 2.9, rotation: 6 },
            { variantId: "tube-240", x: 5.95, y: 2.9, rotation: 174 },
            { variantId: "cob-led-300", x: 4.0, y: 1.95, rotation: 90 }
          ]
        },
        {
          id: "erotique-sofa-contrast",
          name: "Erotique sofa contrast",
          summary: "Sofa central, parapluie argent et bande laterale de separation.",
          floorId: "charcoal",
          backdropId: "brick",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 4.1, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "umbrella-silver-150", x: 2.15, y: 2.1, rotation: 28 },
            { variantId: "strip-30x120", x: 5.95, y: 3.15, rotation: 176 },
            { variantId: "reflector-panel", x: 2.55, y: 4.05, rotation: 340 }
          ]
        }
      ]
    },
    {
      id: "nu",
      label: "Nu artistique",
      description: "Eclairages sculpturaux, high key ou graphiques pour nu d art.",
      presets: [
        {
          id: "nu-sculptural-hard",
          name: "Nu sculptural hard",
          summary: "Fresnel dur, petit fill et coupe laterale pour volumes marques.",
          floorId: "charcoal",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "fresnel-650", x: 2.25, y: 2.15, rotation: 30 },
            { variantId: "reflector-80", x: 5.35, y: 3.45, rotation: 210 },
            { variantId: "flag-90x120", x: 6.25, y: 2.85, rotation: 90 }
          ]
        },
        {
          id: "nu-high-key-classic",
          name: "Nu high key classique",
          summary: "Double grande recta et rebond frontal pour rendu propre et doux.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.1, y: 2.25, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.9, y: 2.25, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "nu-outline-backlight",
          name: "Nu outline backlight",
          summary: "Deux bandes arriere et neg fill frontal pour contour pur.",
          floorId: "black",
          backdropId: "black",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.15, y: 2.45, rotation: 24 },
            { variantId: "strip-40x140", x: 5.85, y: 2.45, rotation: 156 },
            { variantId: "negfill-120x200", x: 4.0, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "nu-graphic-projector",
          name: "Nu graphique projector",
          summary: "Projection de motif, V-flat et retour mousse pour dessin plus abstrait.",
          floorId: "cream",
          backdropId: "sand",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-36", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "vflat-100x200", x: 6.1, y: 2.95, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.2, y: 4.1, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "video",
      label: "Video",
      description: "Interviews, podcast, greenscreen et plateaux hybrides.",
      presets: [
        {
          id: "interview-led",
          name: "Interview LED 2 points",
          summary: "Panneau cle, panneau fill, tube de separation et fauteuil.",
          floorId: "sand",
          backdropId: "steel",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.45, y: 2.35, rotation: 32 },
            { variantId: "led-panel-1x1", x: 5.55, y: 2.7, rotation: 150 },
            { variantId: "tube-120", x: 6.35, y: 1.95, rotation: 180 },
            { variantId: "monitor-station", x: 5.7, y: 4.6, rotation: 0 }
          ]
        },
        {
          id: "podcast-desk",
          name: "Podcast desk",
          summary: "Bureau, double LED, fond tube et station de controle.",
          floorId: "sand",
          backdropId: "teal",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.45, rotation: 0 },
            { variantId: "chair-standard", x: 4.0, y: 3.95, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.35, y: 2.3, rotation: 30 },
            { variantId: "led-panel-1x1", x: 5.75, y: 2.55, rotation: 152 },
            { variantId: "tube-120", x: 6.2, y: 1.95, rotation: 180 },
            { variantId: "monitor-station", x: 5.95, y: 4.55, rotation: 0 },
            { variantId: "dimmer-desk", x: 6.55, y: 4.65, rotation: 0 }
          ]
        },
        {
          id: "greenscreen-presenter",
          name: "Greenscreen presenter",
          summary: "Presenter simple, double source frontale et fonds uniformises.",
          floorId: "neutral-gray",
          backdropId: "chroma",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "cob-led-600", x: 2.35, y: 2.2, rotation: 30 },
            { variantId: "cob-led-300", x: 5.65, y: 2.45, rotation: 152 },
            { variantId: "led-panel-1x2", x: 1.55, y: 1.85, rotation: 45 },
            { variantId: "led-panel-1x2", x: 6.45, y: 1.85, rotation: 135 }
          ]
        },
        {
          id: "masterclass-soft",
          name: "Masterclass soft",
          summary: "Lantern de dessus, bureau sobre et controle video laterale.",
          floorId: "cream",
          backdropId: "steel",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "stool-high", x: 4.0, y: 4.0, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.65, rotation: 90 },
            { variantId: "tube-120", x: 6.2, y: 2.1, rotation: 180 },
            { variantId: "monitor-station", x: 5.95, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "fashion-bts-video",
          name: "Fashion BTS video",
          summary: "Tubes longs, panneau central et chariot de plateau pour BTS.",
          floorId: "charcoal",
          backdropId: "cobalt",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "tube-240", x: 2.15, y: 2.8, rotation: 14 },
            { variantId: "tube-240", x: 5.85, y: 2.8, rotation: 166 },
            { variantId: "led-panel-1x2", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "cart-rolling", x: 6.35, y: 4.45, rotation: 0 },
            { variantId: "monitor-station", x: 5.65, y: 4.65, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "creative",
      label: "Creatif",
      description: "Presets de projection, miroir, chroma et ombres dessinees.",
      presets: [
        {
          id: "cinema-gobo",
          name: "Cinema gobo",
          summary: "Projecteur optique, Fresnel d accent et drapeaux type cinema.",
          floorId: "charcoal",
          backdropId: "olive",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-19", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "fresnel-650", x: 5.95, y: 2.15, rotation: 152 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "cutter-45x120", x: 6.45, y: 3.1, rotation: 90 }
          ]
        },
        {
          id: "mirror-tubes",
          name: "Mirror tubes",
          summary: "Miroir debout et tubes LED pour rendu editorial reflexif.",
          floorId: "black",
          backdropId: "cobalt",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "mirror-standing", x: 5.85, y: 3.0, rotation: 270 },
            { variantId: "tube-240", x: 2.1, y: 2.95, rotation: 8 },
            { variantId: "tube-240", x: 5.95, y: 1.95, rotation: 180 }
          ]
        },
        {
          id: "chroma-pop",
          name: "Chroma pop",
          summary: "Fond chroma bleu avec contre uniformes et cle douce.",
          floorId: "neutral-gray",
          backdropId: "chroma-blue",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "softbox-octa120", x: 2.35, y: 2.2, rotation: 28 },
            { variantId: "led-panel-1x2", x: 6.15, y: 1.9, rotation: 160 },
            { variantId: "led-panel-1x2", x: 1.85, y: 1.9, rotation: 20 }
          ]
        },
        {
          id: "shadow-play",
          name: "Shadow play",
          summary: "Fresnel, cutter et V-flat pour ombres nettes et graphiques.",
          floorId: "cream",
          backdropId: "stone",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "fresnel-200", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "cutter-45x120", x: 2.9, y: 2.55, rotation: 30 },
            { variantId: "vflat-120x240", x: 6.1, y: 2.95, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.1, y: 4.15, rotation: 0 }
          ]
        }
      ]
    }
  ];

  const refs = {
    librarySearch: document.getElementById("librarySearch"),
    categoryTabs: document.getElementById("categoryTabs"),
    palettePanel: document.getElementById("palettePanel"),
    floorMenuSwatches: document.getElementById("floorMenuSwatches"),
    backdropMenuSwatches: document.getElementById("backdropMenuSwatches"),
    presetMenuList: document.getElementById("presetMenuList"),
    actionSavePreset: document.getElementById("actionSavePreset"),
    languageMenuList: document.getElementById("languageMenuList"),
    selectionPanel: document.getElementById("selectionPanel"),
    studioBadge: document.getElementById("studioBadge"),
    countBadge: document.getElementById("countBadge"),
    workspace: document.querySelector(".workspace"),
    libraryPanel: document.querySelector(".library-panel"),
    stageCanvasWrap: document.getElementById("stageCanvasWrap"),
    planViewPane: document.getElementById("planViewPane"),
    isoViewPane: document.getElementById("isoViewPane"),
    insetToggle: document.getElementById("insetToggle"),
    insetToggleLabel: document.getElementById("insetToggleLabel"),
    planCanvas: document.getElementById("planCanvas"),
    isoCanvas: document.getElementById("isoCanvas"),
    viewPlanToggle: document.getElementById("viewPlanToggle"),
    viewIsoToggle: document.getElementById("viewIsoToggle"),
    libraryToggle: document.getElementById("libraryToggle"),
    libraryClose: document.getElementById("libraryClose"),
    libraryBackdrop: document.getElementById("libraryBackdrop"),
    measureToggle: document.getElementById("measureToggle"),
    planZoomTools: document.getElementById("planZoomTools"),
    isoZoomTools: document.getElementById("isoZoomTools"),
    planZoomOut: document.getElementById("planZoomOut"),
    planZoomReset: document.getElementById("planZoomReset"),
    planZoomIn: document.getElementById("planZoomIn"),
    isoZoomOut: document.getElementById("isoZoomOut"),
    isoZoomReset: document.getElementById("isoZoomReset"),
    isoZoomIn: document.getElementById("isoZoomIn"),
    menus: Array.from(document.querySelectorAll(".menu")),
    menuTriggers: Array.from(document.querySelectorAll("[data-menu-trigger]")),
    menuPanels: Array.from(document.querySelectorAll(".menu-panel")),
    menuActions: Array.from(document.querySelectorAll("[data-menu-action]"))
  };

  const planCtx = refs.planCanvas.getContext("2d");
  const isoCtx = refs.isoCanvas.getContext("2d");
  const launchOptions = getLaunchOptions();

  const state = {
    floorId: FLOOR_COLORS[0].id,
    backdropId: BACKDROP_COLORS[3].id,
    activeCategoryId: PALETTE_CATEGORIES[0].id,
    language: launchOptions.language || detectInitialLanguage(),
    paletteQuery: "",
    customPresets: loadCustomPresets(),
    items: [],
    selectedId: null,
    interaction: null,
    hoverItemId: null,
    hoverHandle: false,
    measurementMode: false,
    measureStart: null,
    measurePreview: null,
    measureEnd: null,
    openMenu: null,
    primaryView: "plan",
    libraryCollapsed: window.matchMedia("(max-width: 700px)").matches, // mobile : bibliotheque fermee au depart
    planZoom: 1,
    planPanX: 0,
    planPanY: 0,
    activePointers: new Map(),
    pinchGesture: null,
    isoActivePointers: new Map(),
    isoPinchGesture: null,
    isoZoom: 1,
    insetPreference: loadInsetPreference(),
    insetCollapsed: false,
    planRegion: null,
    nextId: 1
  };

  // Choix explicite de l'utilisateur pour la vignette : true (repliee), false (depliee)
  // ou null (automatique : repliee seulement si elle masquerait le plan).
  function loadInsetPreference() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_INSET_COLLAPSED);
      if (stored === "1") return true;
      if (stored === "0") return false;
    } catch (error) {
      // Stockage indisponible : mode automatique.
    }
    return null;
  }

  function setInsetCollapsed(collapsed) {
    state.insetPreference = Boolean(collapsed);
    state.insetCollapsed = state.insetPreference;
    try {
      window.localStorage.setItem(STORAGE_KEY_INSET_COLLAPSED, state.insetPreference ? "1" : "0");
    } catch (error) {
      // Stockage indisponible : le choix vaut pour la session.
    }
    renderAll();
  }

  function detectInitialLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (stored && LANGUAGE_OPTIONS.some(function (option) { return option.id === stored; })) {
        return stored;
      }
    } catch (error) {
      // Ignore storage access issues and fallback to browser language.
    }

    const browserLanguage = String(navigator.language || "fr").slice(0, 2).toLowerCase();
    return LANGUAGE_OPTIONS.some(function (option) { return option.id === browserLanguage; }) ? browserLanguage : "fr";
  }

  function getLaunchOptions() {
    try {
      const params = new URLSearchParams(window.location.search);
      const language = String(params.get("lang") || "").slice(0, 2).toLowerCase();
      const preset = String(params.get("preset") || "").trim();
      return {
        language: LANGUAGE_OPTIONS.some(function (option) { return option.id === language; }) ? language : "",
        preset: preset
      };
    } catch (error) {
      return { language: "", preset: "" };
    }
  }

  function getLocaleBundle(language) {
    return LOCALES[language || state.language] || LOCALES.fr;
  }

  function interpolateText(template, replacements) {
    if (!replacements) return template;
    return Object.keys(replacements).reduce(function (result, key) {
      return result.replace(new RegExp(`\\{${key}\\}`, "g"), String(replacements[key]));
    }, template);
  }

  function t(path, replacements) {
    const parts = path.split(".");
    const bundles = [getLocaleBundle(), LOCALES.fr];

    for (let index = 0; index < bundles.length; index += 1) {
      let value = bundles[index];
      for (let partIndex = 0; partIndex < parts.length; partIndex += 1) {
        value = value && typeof value === "object" ? value[parts[partIndex]] : undefined;
      }
      if (typeof value === "string") {
        return interpolateText(value, replacements);
      }
    }

    return path;
  }

  function getLocalizedPaletteCategoryLabel(category) {
    const bundle = getLocaleBundle();
    return (bundle.paletteCategories && bundle.paletteCategories[category.id]) || category.label;
  }

  function getLocalizedPaletteGroupCopy(categoryId, groupIndex, group) {
    const bundle = getLocaleBundle();
    const groupSet = bundle.paletteGroups && bundle.paletteGroups[categoryId];
    const groupCopy = groupSet && groupSet[groupIndex];
    return {
      title: groupCopy && groupCopy.title ? groupCopy.title : group.title,
      description: groupCopy && groupCopy.description ? groupCopy.description : group.description
    };
  }

  function getLocalizedPresetCategory(category) {
    if (category.id === "custom") {
      return {
        label: getUiCopy("customPresets"),
        description: getUiCopy("customPresetsDescription")
      };
    }

    const bundle = getLocaleBundle();
    const categoryCopy = bundle.presetCategories && bundle.presetCategories[category.id];
    return {
      label: categoryCopy && categoryCopy.label ? categoryCopy.label : category.label,
      description: categoryCopy && categoryCopy.description ? categoryCopy.description : category.description
    };
  }





  function getLocaleCode(language) {
    return LOCALE_CODES[language || state.language] || LOCALE_CODES.fr;
  }

  function getUiCopy(key, replacements) {
    const bundle = UI_COPY[state.language] || UI_COPY.fr;
    const fallback = UI_COPY.fr[key] || key;
    return interpolateText(bundle[key] || fallback, replacements);
  }

  function getLocalizedTypeLabel(baseLabel) {
    const bundle = TYPE_LABEL_TRANSLATIONS[state.language];
    return bundle && bundle[baseLabel] ? bundle[baseLabel] : baseLabel;
  }

  function getLocalizedShortLabel(variantId, variant) {
    if (!variant) return "";
    if (state.language === "fr") return variant.shortLabel;

    const key = SHORT_LABEL_KEYS[variantId];
    const translated = key && SHORT_LABEL_TRANSLATIONS[state.language] && SHORT_LABEL_TRANSLATIONS[state.language][key];
    if (translated) return translated;

    let label = variant.shortLabel;
    if (label.indexOf("deg") !== -1) label = label.replace(/\bdeg\b/g, "°");
    if (label.indexOf("pouces") !== -1) {
      const inchUnit = { en: "in", es: "pulgadas", de: "Zoll", ar: "بوصة" }[state.language] || "in";
      label = label.replace(/\bpouces\b/g, inchUnit);
    }
    return label;
  }

  function formatLocalizedHeightLabel(heightValue, fallbackLabel) {
    if (typeof heightValue !== "number" || Number.isNaN(heightValue)) return fallbackLabel || "";

    const value = heightValue < 1 ? Math.round(heightValue * 100) : heightValue.toFixed(2);
    const unit = heightValue < 1 ? "cm" : "m";
    const pattern = {
      fr: "H {value} {unit}",
      en: "H {value} {unit}",
      es: "Alt. {value} {unit}",
      de: "H {value} {unit}",
      ar: "ارتفاع {value} {unit}"
    }[state.language] || "H {value} {unit}";

    return interpolateText(pattern, { value: value, unit: unit });
  }

  function getLocalizedVariantCopy(variantId, source) {
    const variant = source || ITEM_VARIANTS[variantId];
    if (!variant) {
      return { type: "", short: "", size: "", height: "" };
    }

    return {
      type: getLocalizedTypeLabel(variant.typeLabel),
      short: getLocalizedShortLabel(variantId, variant),
      size: variant.sizeLabel,
      height: formatLocalizedHeightLabel(variant.height, variant.heightLabel)
    };
  }

  function getItemTypeKey(item) {
    const variant = ITEM_VARIANTS[item.variantId];
    return variant ? variant.typeLabel : item.typeLabel;
  }

  function getLocalizedItemLabel(item) {
    const typeKey = getItemTypeKey(item);
    const localizedType = getLocalizedTypeLabel(typeKey);
    let count = 0;

    for (let index = 0; index < state.items.length; index += 1) {
      const entry = state.items[index];
      if (getItemTypeKey(entry) !== typeKey) continue;
      count += 1;
      if (entry.id === item.id) return `${localizedType} ${count}`;
    }

    return localizedType;
  }

  function toTitleCase(value) {
    return String(value || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (match) {
        return match.toUpperCase();
      });
  }

  function composeColorLabel(noun, modifiers, language) {
    if (!modifiers.length) return noun;
    if (language === "en") return `${modifiers.join(" ")} ${noun}`;
    if (language === "ar") return `${noun} ${modifiers.join(" ")}`;
    if (language === "es") return `${noun} ${modifiers.join(" ")}`;
    if (language === "de") return `${modifiers.join(" ")}${noun}`;
    return `${noun} ${modifiers.join(" ")}`;
  }

  function getLocalizedColorLabel(entry) {
    if (!entry) return "";
    if (state.language === "fr") return entry.label;

    const tokens = entry.id.split("-");
    const nounMap = COLOR_NOUN_TRANSLATIONS[state.language] || {};
    const modifierMap = COLOR_MODIFIER_TRANSLATIONS[state.language] || {};
    const nounKey = tokens[tokens.length - 1];
    const noun = nounMap[nounKey];

    if (noun) {
      const modifiers = tokens.slice(0, -1).map(function (token) {
        return modifierMap[token] || nounMap[token] || toTitleCase(token);
      });
      return composeColorLabel(noun, modifiers, state.language);
    }

    return tokens.map(function (token) {
      return modifierMap[token] || nounMap[token] || toTitleCase(token);
    }).join(" ");
  }

  function getLocalizedVariantTitle(variantId, source) {
    const copy = getLocalizedVariantCopy(variantId, source);
    return copy.short ? `${copy.type} ${copy.short}`.trim() : copy.type;
  }

  function formatLocalizedList(items) {
    const values = items.filter(Boolean);
    if (!values.length) return "";

    try {
      return new Intl.ListFormat(getLocaleCode(), { style: "short", type: "conjunction" }).format(values);
    } catch (error) {
      return values.join(", ");
    }
  }

  function getLocalizedPresetName(preset) {
    if (preset.isCustom || state.language === "fr") return preset.name;

    const dictionary = PRESET_TOKEN_TRANSLATIONS[state.language] || PRESET_TOKEN_TRANSLATIONS.en;
    const tokens = preset.id.split("-").map(function (token) {
      return dictionary[token] || toTitleCase(token);
    }).filter(Boolean);

    return tokens.join(" ");
  }

  function getLocalizedPresetSummary(preset) {
    if (preset.isCustom) return buildDynamicPresetSummary(preset);
    if (state.language === "fr") return preset.summary;

    const labels = [];
    const seen = new Set();

    preset.items.forEach(function (entry) {
      const variant = ITEM_VARIANTS[entry.variantId];
      if (!variant || variant.family === "subject") return;
      const label = getLocalizedVariantTitle(entry.variantId, variant);
      if (seen.has(label)) return;
      seen.add(label);
      labels.push(label);
    });

    const visible = labels.slice(0, 4);
    const suffix = labels.length > 4 ? ` +${labels.length - 4}` : "";
    return `${formatLocalizedList(visible)}${suffix}`.trim();
  }
  function renderLanguageMenu() {

    if (!refs.languageMenuList) return;

    if (!refs.languageMenuList.children.length) {
      refs.languageMenuList.innerHTML = LANGUAGE_OPTIONS.map(function (option) {
        return `
          <button class="language-item" type="button" data-language-id="${option.id}">
            <em class="language-code">${escapeHtml(option.code)}</em>
            <strong>${escapeHtml(option.nativeLabel)}</strong>
          </button>
        `;
      }).join("");
    }

    refs.languageMenuList.querySelectorAll("[data-language-id]").forEach(function (button) {
      const languageId = button.getAttribute("data-language-id");
      button.classList.toggle("active", languageId === state.language);
      button.setAttribute("aria-pressed", languageId === state.language ? "true" : "false");
      button.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        applyLanguage(languageId);
        closeMenus();
      };
    });
  }

  function translateStaticUi() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = getLocaleBundle().dir || "ltr";
    document.title = t("documentTitle");

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    const metaOgDescription = document.querySelector('meta[property="og:description"]');
    const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
    const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
    const localizedMetaDescription = t("metaDescription");

    if (metaDescription) metaDescription.setAttribute("content", localizedMetaDescription);
    if (metaOgTitle) metaOgTitle.setAttribute("content", t("documentTitle"));
    if (metaOgDescription) metaOgDescription.setAttribute("content", localizedMetaDescription);
    if (metaTwitterTitle) metaTwitterTitle.setAttribute("content", t("documentTitle"));
    if (metaTwitterDescription) metaTwitterDescription.setAttribute("content", localizedMetaDescription);

    const supportStrip = document.getElementById("supportStrip");
    const supportText = document.getElementById("supportText");
    const supportButton = document.getElementById("supportButton");
    const brandTagline = document.getElementById("brandTagline");
    const mainMenuBar = document.getElementById("mainMenuBar");
    const menuFileTrigger = document.getElementById("menuFileTrigger");
    const menuColorTrigger = document.getElementById("menuColorTrigger");
    const menuPresetsTrigger = document.getElementById("menuPresetsTrigger");
    const menuLanguageTrigger = document.getElementById("menuLanguageTrigger");
    const actionReset = document.getElementById("actionReset");
    const actionCopyImage = document.getElementById("actionCopyImage");
    const actionExportPng = document.getElementById("actionExportPng");
    const actionExportPdf = document.getElementById("actionExportPdf");
    const actionPrint = document.getElementById("actionPrint");
    const floorMenuLabel = document.getElementById("floorMenuLabel");
    const backdropMenuLabel = document.getElementById("backdropMenuLabel");
    const libraryEyebrow = document.getElementById("libraryEyebrow");
    const stageViewSwitch = document.getElementById("stageViewSwitch");
    const viewPlanToggle = document.getElementById("viewPlanToggle");
    const viewIsoToggle = document.getElementById("viewIsoToggle");
    const libraryTitle = document.getElementById("libraryTitle");
    const libraryCopy = document.getElementById("libraryCopy");
    const planEyebrow = document.getElementById("planEyebrow");
    const planTitle = document.getElementById("planTitle");
    const hintDrag = document.getElementById("hintDrag");
    const hintRotate = document.getElementById("hintRotate");
    const libraryToggle = document.getElementById("libraryToggle");
    const measureToggle = document.getElementById("measureToggle");
    const previewEyebrow = document.getElementById("previewEyebrow");
    const previewTitle = document.getElementById("previewTitle");

    if (supportStrip) supportStrip.setAttribute("aria-label", t("supportAriaLabel"));
    if (supportText) supportText.textContent = t("supportText");
    if (supportButton) supportButton.textContent = t("supportButton");
    if (brandTagline) brandTagline.textContent = t("brandTagline");
    if (mainMenuBar) mainMenuBar.setAttribute("aria-label", t("navAriaLabel"));
    if (menuFileTrigger) menuFileTrigger.textContent = t("menu.file");
    if (menuColorTrigger) menuColorTrigger.textContent = t("menu.color");
    if (menuPresetsTrigger) menuPresetsTrigger.textContent = t("menu.presets");
    if (menuLanguageTrigger) menuLanguageTrigger.textContent = t("menu.language");
    if (actionReset) actionReset.textContent = t("actions.reset");
    if (actionCopyImage) actionCopyImage.textContent = t("actions.copyImage");
    if (actionExportPng) actionExportPng.textContent = t("actions.exportPng");
    if (actionExportPdf) actionExportPdf.textContent = t("actions.exportPdf");
    if (actionPrint) actionPrint.textContent = t("actions.print");
    if (floorMenuLabel) floorMenuLabel.textContent = t("colors.floor");
    if (backdropMenuLabel) backdropMenuLabel.textContent = t("colors.backdrop");
    if (libraryEyebrow) libraryEyebrow.textContent = t("library.eyebrow");
    if (stageViewSwitch) stageViewSwitch.setAttribute("aria-label", t("stage.viewSwitchAria"));
    if (viewPlanToggle) viewPlanToggle.textContent = t("stage.viewPlan");
    if (viewIsoToggle) viewIsoToggle.textContent = t("stage.viewIso");
    if (libraryTitle) libraryTitle.textContent = t("library.title");
    if (libraryCopy) libraryCopy.textContent = t("library.copy");
    if (planEyebrow) planEyebrow.textContent = t("stage.eyebrow");
    if (planTitle) planTitle.textContent = t("stage.title");
    if (hintDrag) hintDrag.textContent = t("stage.hintDrag");
    if (hintRotate) hintRotate.textContent = t("stage.hintRotate");
    if (libraryToggle) libraryToggle.textContent = t("stage.toggleLibrary");
    const libraryClose = document.getElementById("libraryClose");
    if (libraryClose) {
      libraryClose.textContent = t("stage.closeLibrary");
      libraryClose.setAttribute("aria-label", `${t("stage.closeLibrary")} : ${t("stage.toggleLibrary")}`);
    }
    if (measureToggle) measureToggle.textContent = t("stage.hintMeasure");
    if (previewEyebrow) previewEyebrow.textContent = t("stage.previewEyebrow");
    if (previewTitle) previewTitle.textContent = t("stage.previewTitle");
    if (refs.librarySearch) refs.librarySearch.placeholder = getUiCopy("searchPlaceholder");
    if (refs.actionSavePreset) refs.actionSavePreset.textContent = getUiCopy("savePreset");
    if (refs.planZoomOut) refs.planZoomOut.setAttribute("aria-label", getUiCopy("zoomOut"));
    if (refs.planZoomIn) refs.planZoomIn.setAttribute("aria-label", getUiCopy("zoomIn"));
    if (refs.isoZoomOut) refs.isoZoomOut.setAttribute("aria-label", getUiCopy("zoomOut"));
    if (refs.isoZoomIn) refs.isoZoomIn.setAttribute("aria-label", getUiCopy("zoomIn"));
    if (refs.planCanvas) refs.planCanvas.setAttribute("aria-label", t("stage.planAriaLabel"));
    if (refs.isoCanvas) refs.isoCanvas.setAttribute("aria-label", t("stage.isoAriaLabel"));
    renderPlanZoomUi();
    renderIsoZoomUi();
  }

  function applyLanguage(language, persist) {
    const normalized = LANGUAGE_OPTIONS.some(function (option) {
      return option.id === language;
    }) ? language : "fr";

    state.language = normalized;

    if (persist !== false) {
      try {
        window.localStorage.setItem(STORAGE_KEY_LANGUAGE, normalized);
      } catch (error) {
        // Ignore storage access issues.
      }
    }

    translateStaticUi();
    renderLanguageMenu();
    renderCategoryTabs();
    renderColorSwatches(refs.floorMenuSwatches, FLOOR_COLORS, "floor");
    renderColorSwatches(refs.backdropMenuSwatches, BACKDROP_COLORS, "backdrop");
    renderPalette();
    renderPresetMenu();
    renderAll();
  }

  function renderPlanZoomUi() {
    if (!refs.planZoomReset) return;
    const value = Math.round(state.planZoom * 100);
    refs.planZoomReset.textContent = getUiCopy("zoomReset", { value: value });
    if (refs.planZoomOut) refs.planZoomOut.disabled = state.planZoom <= 0.71;
    if (refs.planZoomIn) refs.planZoomIn.disabled = state.planZoom >= 2.39;
  }

  function renderIsoZoomUi() {
    if (!refs.isoZoomReset) return;
    const value = Math.round(state.isoZoom * 100);
    refs.isoZoomReset.textContent = getUiCopy("zoomReset", { value: value });
    if (refs.isoZoomOut) refs.isoZoomOut.disabled = state.isoZoom <= 0.71;
    if (refs.isoZoomIn) refs.isoZoomIn.disabled = state.isoZoom >= 2.19;
  }

  function getSecondaryView() {
    return state.primaryView === "plan" ? "iso" : "plan";
  }

  function isCompactLibraryViewport() {
    return window.matchMedia("(max-width: 1180px)").matches;
  }

  function closeLibraryPanel() {
    if (!isCompactLibraryViewport() || state.libraryCollapsed) return;
    state.libraryCollapsed = true;
    renderAll();
    if (refs.libraryToggle && !refs.libraryToggle.hidden) refs.libraryToggle.focus();
  }

  function syncCompactLibraryUi() {
    const compact = isCompactLibraryViewport();
    const expanded = !compact || !state.libraryCollapsed;

    if (refs.workspace) {
      refs.workspace.classList.toggle("is-library-collapsed", compact && !expanded);
      refs.workspace.classList.toggle("is-library-open", compact && expanded);
    }
    if (refs.libraryPanel) {
      refs.libraryPanel.classList.toggle("is-collapsed", compact && !expanded);
      refs.libraryPanel.classList.toggle("is-active", compact && expanded);
      refs.libraryPanel.setAttribute("aria-hidden", expanded ? "false" : "true");
      // Sur mobile, la bibliotheque ouverte est un panneau modal par-dessus le plan.
      const isSheet = window.matchMedia("(max-width: 700px)").matches;
      refs.libraryPanel.setAttribute("aria-modal", isSheet && expanded ? "true" : "false");
      if (isSheet) refs.libraryPanel.setAttribute("role", "dialog");
      else refs.libraryPanel.removeAttribute("role");
    }
    if (refs.libraryBackdrop) {
      refs.libraryBackdrop.hidden = !(compact && expanded && window.matchMedia("(max-width: 700px)").matches);
    }
    if (refs.libraryToggle) {
      refs.libraryToggle.hidden = !compact;
      refs.libraryToggle.classList.toggle("active", compact && expanded);
      refs.libraryToggle.setAttribute("aria-pressed", compact && expanded ? "true" : "false");
      refs.libraryToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  function syncStageViewUi() {
    const isPlanMain = state.primaryView !== "iso";

    if (refs.stageCanvasWrap) {
      refs.stageCanvasWrap.setAttribute("data-main-view", isPlanMain ? "plan" : "iso");
      refs.stageCanvasWrap.classList.toggle("is-inset-collapsed", state.insetCollapsed);
    }
    if (refs.insetToggle) {
      const showLabel = isPlanMain ? t("stage.insetShowIso") : t("stage.insetShowPlan");
      const toggleLabel = state.insetCollapsed ? showLabel : t("stage.insetHide");
      refs.insetToggle.setAttribute("aria-pressed", state.insetCollapsed ? "true" : "false");
      refs.insetToggle.setAttribute("aria-label", toggleLabel);
      refs.insetToggle.setAttribute("title", toggleLabel);
      if (refs.insetToggleLabel) refs.insetToggleLabel.textContent = showLabel;
    }
    if (refs.planViewPane) {
      refs.planViewPane.classList.toggle("is-main", isPlanMain);
      refs.planViewPane.classList.toggle("is-secondary", !isPlanMain);
      refs.planViewPane.setAttribute("tabindex", isPlanMain ? "-1" : "0");
      refs.planViewPane.setAttribute("role", isPlanMain ? "presentation" : "button");
      refs.planViewPane.setAttribute("aria-label", isPlanMain ? t("stage.planAriaLabel") : t("stage.openPlan"));
    }
    if (refs.isoViewPane) {
      refs.isoViewPane.classList.toggle("is-main", !isPlanMain);
      refs.isoViewPane.classList.toggle("is-secondary", isPlanMain);
      refs.isoViewPane.setAttribute("tabindex", isPlanMain ? "0" : "-1");
      refs.isoViewPane.setAttribute("role", isPlanMain ? "button" : "presentation");
      refs.isoViewPane.setAttribute("aria-label", isPlanMain ? t("stage.openIso") : t("stage.isoAriaLabel"));
    }

    if (refs.viewPlanToggle) {
      refs.viewPlanToggle.classList.toggle("active", isPlanMain);
      refs.viewPlanToggle.setAttribute("aria-pressed", isPlanMain ? "true" : "false");
    }
    if (refs.viewIsoToggle) {
      refs.viewIsoToggle.classList.toggle("active", !isPlanMain);
      refs.viewIsoToggle.setAttribute("aria-pressed", !isPlanMain ? "true" : "false");
    }

    if (refs.planZoomTools) refs.planZoomTools.classList.toggle("is-active", isPlanMain);
    if (refs.isoZoomTools) refs.isoZoomTools.classList.toggle("is-active", !isPlanMain);
    if (refs.planCanvas) refs.planCanvas.style.pointerEvents = isPlanMain ? "auto" : "none";
    if (refs.isoCanvas) refs.isoCanvas.style.pointerEvents = isPlanMain ? "none" : "auto";
    if (refs.planCanvas && !isPlanMain) refs.planCanvas.style.cursor = "default";
  }

  function setPrimaryView(viewId) {
    const nextView = viewId === "iso" ? "iso" : "plan";
    if (state.primaryView === nextView) return;

    state.activePointers.clear();
    state.pinchGesture = null;
    state.isoActivePointers.clear();
    state.isoPinchGesture = null;

    if (nextView === "iso") {
      cancelCanvasInteraction();
      state.measurementMode = false;
      state.measureStart = null;
      state.measurePreview = null;
      state.measureEnd = null;
      if (refs.planCanvas) refs.planCanvas.style.cursor = "default";
    }

    if (refs.isoCanvas) refs.isoCanvas.style.cursor = "default";
    state.primaryView = nextView;
    renderAll();
  }

  function syncMeasurementToggle() {
    if (!refs.measureToggle) return;
    refs.measureToggle.classList.toggle("active", state.measurementMode);
    refs.measureToggle.setAttribute("aria-pressed", state.measurementMode ? "true" : "false");
  }

  function toggleLibraryPanel() {
    if (!isCompactLibraryViewport()) return;
    state.libraryCollapsed = !state.libraryCollapsed;
    closeMenus();
    renderAll();
  }

  function toggleMeasurementMode() {
    if (state.primaryView !== "plan") {
      state.primaryView = "plan";
    }
    state.measurementMode = !state.measurementMode;
    state.measureStart = null;
    state.measurePreview = null;
    state.measureEnd = null;
    refs.planCanvas.style.cursor = state.measurementMode ? "crosshair" : "default";
    renderAll();
  }

  function setIsoZoom(nextValue) {
    state.isoZoom = clamp(nextValue, 0.7, 2.2);
    renderIsoZoomUi();
    drawIsoView();
  }

  function getPlanZoomAnchorPoint() {
    if (!refs.planCanvas.width || !refs.planCanvas.height) return null;
    const selected = getSelectedItem();
    if (!selected) {
      const base = getPlanBaseMetrics(refs.planCanvas.width, refs.planCanvas.height);
      return {
        x: base.centerX,
        y: base.centerY
      };
    }

    return studioToPlan(selected.x, selected.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
  }

  function setPlanZoom(nextValue, anchorCanvasPoint) {
    const clampedZoom = clamp(nextValue, 0.7, 2.4);
    if (Math.abs(clampedZoom - state.planZoom) < 0.001) return;

    const width = refs.planCanvas.width;
    const height = refs.planCanvas.height;
    const anchor = anchorCanvasPoint || getPlanZoomAnchorPoint();

    if (anchor && width && height) {
      const currentMetrics = getPlanMetrics(width, height);
      const anchorStudio = planToStudio(anchor.x, anchor.y, currentMetrics);
      state.planZoom = clampedZoom;
      const nextBaseMetrics = getPlanBaseMetrics(width, height);
      const nextScale = nextBaseMetrics.scale * state.planZoom;
      const nextStageWidth = STUDIO.width * nextScale;
      const nextStageHeight = STUDIO.depth * nextScale;
      state.planPanX = anchor.x - nextBaseMetrics.centerX + nextStageWidth / 2 - anchorStudio.x * nextScale;
      state.planPanY = anchor.y - nextBaseMetrics.centerY + nextStageHeight / 2 - anchorStudio.y * nextScale;
      const clampedPan = getClampedPlanPan(width, height, state.planZoom, state.planPanX, state.planPanY);
      state.planPanX = clampedPan.x;
      state.planPanY = clampedPan.y;
    } else {
      state.planZoom = clampedZoom;
      state.planPanX = 0;
      state.planPanY = 0;
    }

    renderPlanZoomUi();
    drawPlanView();
  }

  function resetPlanZoom() {
    state.planZoom = 1;
    state.planPanX = 0;
    state.planPanY = 0;
    renderPlanZoomUi();
    drawPlanView();
  }

  function cancelCanvasInteraction() {
    if (!state.interaction) return;
    try {
      refs.planCanvas.releasePointerCapture(state.interaction.pointerId);
    } catch (error) {
      // Pointer capture may already be released.
    }
    state.interaction = null;
  }

  function updateActivePointer(event, canvasPoint) {
    if (!canvasPoint) return;
    state.activePointers.set(event.pointerId, canvasPoint);
  }

  function clearActivePointer(pointerId) {
    state.activePointers.delete(pointerId);
    if (state.pinchGesture && state.pinchGesture.pointerIds.indexOf(pointerId) !== -1) {
      state.pinchGesture = null;
      refs.planCanvas.style.cursor = state.measurementMode ? "crosshair" : "default";
    }
  }

  function startPinchGesture() {
    const pointers = Array.from(state.activePointers.entries()).slice(0, 2);
    if (pointers.length < 2) return false;

    const first = pointers[0];
    const second = pointers[1];
    const dx = second[1].x - first[1].x;
    const dy = second[1].y - first[1].y;
    const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));

    cancelCanvasInteraction();
    if (state.measurementMode) {
      state.measureStart = null;
      state.measurePreview = null;
      state.measureEnd = null;
    }

    state.pinchGesture = {
      pointerIds: [first[0], second[0]],
      startDistance: distance,
      startZoom: state.planZoom
    };
    refs.planCanvas.style.cursor = "zoom-in";
    return true;
  }

  function updateIsoActivePointer(event, canvasPoint) {
    if (!canvasPoint) return;
    state.isoActivePointers.set(event.pointerId, canvasPoint);
  }

  function clearIsoActivePointer(pointerId) {
    state.isoActivePointers.delete(pointerId);
    if (state.isoPinchGesture && state.isoPinchGesture.pointerIds.indexOf(pointerId) !== -1) {
      state.isoPinchGesture = null;
      refs.isoCanvas.style.cursor = "default";
    }
  }

  function startIsoPinchGesture() {
    const pointers = Array.from(state.isoActivePointers.entries()).slice(0, 2);
    if (pointers.length < 2) return false;

    const first = pointers[0];
    const second = pointers[1];
    const dx = second[1].x - first[1].x;
    const dy = second[1].y - first[1].y;
    const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));

    state.isoPinchGesture = {
      pointerIds: [first[0], second[0]],
      startDistance: distance,
      startZoom: state.isoZoom
    };
    refs.isoCanvas.style.cursor = "zoom-in";
    return true;
  }

  const spawnPoints = [
    { x: 4, y: 3, rotation: 270 },
    { x: 2.2, y: 2.15, rotation: 35 },
    { x: 5.8, y: 2.2, rotation: 145 },
    { x: 2.4, y: 4.2, rotation: 325 },
    { x: 5.6, y: 4.1, rotation: 215 },
    { x: 4, y: 4.8, rotation: 270 }
  ];

  // Emprise au sol (largeur selon l'orientation, profondeur sur le cote) tiree des
  // modeles 3D : selection, collisions et distances suivent la forme reelle.
  function applyModelFootprints() {
    Object.keys(ITEM_VARIANTS).forEach(function (variantId) {
      const variant = ITEM_VARIANTS[variantId];
      const model = getVariantModel(variantId, variant);
      variant.width = Math.max(0.12, Number(model.width.toFixed(2)));
      variant.depth = Math.max(0.12, Number(model.depth.toFixed(2)));
    });
  }

  function getVariantModel(variantId, variant) {
    return StudioModels.buildModel(getVariantVisualKind(variantId, variant.family), variantId, variant);
  }

  // Assise sur laquelle se trouve un sujet (a moins de 45 cm de son centre).
  function findSeatUnder(subject, items) {
    let best = null;
    items.forEach(function (other) {
      const seatZ = StudioModels.seatHeights[other.variantId];
      if (!seatZ || other === subject) return;
      const distance = Math.hypot(other.x - subject.x, other.y - subject.y);
      if (distance <= 0.45 && (!best || distance < best.distance)) {
        best = { item: other, seatZ: seatZ, distance: distance };
      }
    });
    return best;
  }

  function getItemModelInstances(items) {
    return items.map(function (item) {
      const variant = ITEM_VARIANTS[item.variantId] || item;
      if (item.family === "subject") {
        const seat = findSeatUnder(item, items);
        if (seat) {
          // Sujet assis : place sur l'assise et tourne vers sa face avant.
          const front = StudioModels.seatFront[seat.item.variantId];
          const rotation = typeof front === "number"
            ? degreesToRadians(seat.item.rotation) + front - Math.PI
            : degreesToRadians(item.rotation);
          const back = typeof front === "number" ? 0.08 : 0;
          return {
            model: StudioModels.buildModel(getVariantVisualKind(item.variantId, item.family), item.variantId, variant, { seatZ: seat.seatZ }),
            x: seat.item.x - Math.cos(rotation) * -back,
            y: seat.item.y - Math.sin(rotation) * -back,
            rotation: rotation
          };
        }
      }
      return {
        model: getVariantModel(item.variantId, variant),
        x: item.x,
        y: item.y,
        rotation: degreesToRadians(item.rotation)
      };
    });
  }

  function init() {
    applyModelFootprints();
    renderColorSwatches(refs.floorMenuSwatches, FLOOR_COLORS, "floor");
    renderColorSwatches(refs.backdropMenuSwatches, BACKDROP_COLORS, "backdrop");
    bindEvents();
    applyLanguage(state.language, false);

    if (launchOptions.preset) {
      loadPreset(launchOptions.preset);
    }

    // Les etiquettes du canvas utilisent la police de l'interface : on redessine
    // une fois les polices chargees pour que leur largeur soit mesuree correctement.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(renderAll);
    }
  }

  function bindPress(button, handler) {
    if (!button) return;

    let touchGesture = null;
    let suppressClick = false;

    button.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") return;
      touchGesture = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        moved: false
      };
    });

    button.addEventListener("pointermove", function (event) {
      if (!touchGesture || event.pointerId !== touchGesture.pointerId) return;
      if (Math.hypot(event.clientX - touchGesture.startX, event.clientY - touchGesture.startY) > 10) {
        touchGesture.moved = true;
      }
    });

    button.addEventListener("pointerup", function (event) {
      if (!touchGesture || event.pointerId !== touchGesture.pointerId) return;
      const shouldHandle = !touchGesture.moved;
      touchGesture = null;
      if (!shouldHandle) return;
      suppressClick = true;
      event.preventDefault();
      event.stopPropagation();
      handler(event);
    });

    button.addEventListener("pointercancel", function () {
      touchGesture = null;
      suppressClick = false;
    });

    button.addEventListener("click", function (event) {
      if (suppressClick) {
        suppressClick = false;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handler(event);
    });
  }

  function bindEvents() {
    refs.menuTriggers.forEach(function (trigger) {
      bindPress(trigger, function (event) {
        if (event) event.stopPropagation();
        const id = trigger.getAttribute("data-menu-trigger");
        toggleMenu(id);
      });
    });

    refs.menuPanels.forEach(function (panel) {
      panel.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    refs.menuActions.forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.getAttribute("data-menu-action");
        closeMenus();
        if (action === "reset") handleReset();
        if (action === "copy-image") void copyImage();
        if (action === "export-png") exportPng();
        if (action === "export-pdf") exportPdf();
        if (action === "print") printPlan();
      });
    });

    if (refs.presetMenuList) {
      refs.presetMenuList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-preset-id]");
        if (!button) return;
        loadPreset(button.getAttribute("data-preset-id"));
        closeMenus();
      });
    }

    if (refs.languageMenuList) {
      refs.languageMenuList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-language-id]");
        if (!button) return;
        applyLanguage(button.getAttribute("data-language-id"));
        closeMenus();
      });
    }

    [refs.floorMenuSwatches, refs.backdropMenuSwatches].forEach(function (container) {
      container.addEventListener("click", function (event) {
        const button = event.target.closest("[data-color-id]");
        if (!button) return;
        const id = button.getAttribute("data-color-id");
        const kind = button.getAttribute("data-color-kind");
        if (kind === "floor") state.floorId = id;
        if (kind === "backdrop") state.backdropId = id;
        renderAll();
      });
    });

    refs.categoryTabs.addEventListener("click", function (event) {
      const button = event.target.closest("[data-category-id]");
      if (!button) return;
      state.activeCategoryId = button.getAttribute("data-category-id");
      renderCategoryTabs();
      renderPalette();
    });

    if (refs.librarySearch) {
      refs.librarySearch.addEventListener("input", function (event) {
        state.paletteQuery = String(event.target.value || "").trim().toLowerCase();
        renderPalette();
      });
    }

    refs.palettePanel.addEventListener("click", function (event) {
      const button = event.target.closest("[data-variant-id]");
      if (!button) return;
      addItem(button.getAttribute("data-variant-id"));
      // Sur ecran compact, on referme la bibliotheque pour montrer l'element ajoute.
      if (isCompactLibraryViewport()) {
        state.libraryCollapsed = true;
        renderAll();
      }
    });

    if (refs.actionSavePreset) {
      bindPress(refs.actionSavePreset, function (event) {
        event.preventDefault();
        event.stopPropagation();
        saveCurrentPreset();
      });
    }

    [refs.viewPlanToggle, refs.viewIsoToggle].forEach(function (button) {
      if (!button) return;
      bindPress(button, function () {
        const viewId = button.getAttribute("data-stage-view-toggle");
        setPrimaryView(viewId);
      });
    });

    [refs.planViewPane, refs.isoViewPane].forEach(function (pane) {
      if (!pane) return;
      pane.addEventListener("click", function () {
        if (pane.classList.contains("is-main")) return;
        setPrimaryView(pane.getAttribute("data-stage-view-pane"));
      });
      pane.addEventListener("keydown", handleStageViewPaneKeydown);
    });

    if (refs.isoZoomOut) {
      refs.isoZoomOut.addEventListener("click", function () {
        setIsoZoom(state.isoZoom - 0.15);
      });
    }

    if (refs.planZoomOut) {
      refs.planZoomOut.addEventListener("click", function () {
        setPlanZoom(state.planZoom - 0.15);
      });
    }

    if (refs.planZoomReset) {
      refs.planZoomReset.addEventListener("click", function () {
        resetPlanZoom();
      });
    }

    if (refs.planZoomIn) {
      refs.planZoomIn.addEventListener("click", function () {
        setPlanZoom(state.planZoom + 0.15);
      });
    }

    if (refs.isoZoomReset) {
      refs.isoZoomReset.addEventListener("click", function () {
        setIsoZoom(1);
      });
    }

    if (refs.isoZoomIn) {
      refs.isoZoomIn.addEventListener("click", function () {
        setIsoZoom(state.isoZoom + 0.15);
      });
    }

    if (refs.measureToggle) {
      bindPress(refs.measureToggle, function () {
        toggleMeasurementMode();
      });
    }

    if (refs.libraryToggle) {
      bindPress(refs.libraryToggle, function () {
        toggleLibraryPanel();
      });
    }

    if (refs.libraryClose) {
      bindPress(refs.libraryClose, function () {
        closeLibraryPanel();
      });
    }

    if (refs.libraryBackdrop) {
      refs.libraryBackdrop.addEventListener("click", function () {
        closeLibraryPanel();
      });
    }

    refs.selectionPanel.addEventListener("input", handleSelectionInput);
    refs.selectionPanel.addEventListener("click", handleSelectionClick);

    refs.planCanvas.addEventListener("pointerdown", handlePointerDown);
    refs.planCanvas.addEventListener("pointermove", handlePointerMove);
    refs.planCanvas.addEventListener("pointerup", handlePointerUp);
    refs.planCanvas.addEventListener("pointercancel", handlePointerUp);
    refs.planCanvas.addEventListener("pointerleave", handlePointerLeave);
    refs.planCanvas.addEventListener("wheel", handlePlanWheel, { passive: false });
    refs.isoCanvas.addEventListener("pointerdown", handleIsoPointerDown);
    refs.isoCanvas.addEventListener("pointermove", handleIsoPointerMove);
    refs.isoCanvas.addEventListener("pointerup", handleIsoPointerUp);
    refs.isoCanvas.addEventListener("pointercancel", handleIsoPointerUp);
    refs.isoCanvas.addEventListener("pointerleave", handleIsoPointerLeave);
    refs.isoCanvas.addEventListener("wheel", handleIsoWheel, { passive: false });

    document.addEventListener("click", function () {
      closeMenus();
    });

    if (refs.insetToggle) {
      refs.insetToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        setInsetCollapsed(!state.insetCollapsed);
      });
    }

    window.addEventListener("resize", renderAll);
    window.addEventListener("beforeprint", function () {
      // A l'impression la vignette est masquee : le plan reprend toute la surface.
      state.planRegion = null;
      drawPlanView();
    });
    window.addEventListener("afterprint", renderAll);
    window.addEventListener("keydown", handleKeydown);
  }
  function toggleMenu(id) {
    state.openMenu = state.openMenu === id ? null : id;
    syncMenus();
  }

  function closeMenus() {
    if (!state.openMenu) return;
    state.openMenu = null;
    syncMenus();
  }

  function syncMenus() {
    refs.menus.forEach(function (menu) {
      const isOpen = menu.getAttribute("data-menu") === state.openMenu;
      menu.classList.toggle("open", isOpen);
      const panel = menu.querySelector(".menu-panel");
      if (!panel) return;
      if (isOpen) {
        fitMenuPanelToViewport(panel);
      } else {
        panel.style.removeProperty("transform");
        panel.style.removeProperty("max-height");
      }
    });
  }

  // Garde un menu deroulant entierement visible : decalage horizontal si le panneau
  // depasse l'ecran, hauteur bornee au bas de la fenetre (le contenu defile).
  function fitMenuPanelToViewport(panel) {
    const margin = 12;
    panel.style.removeProperty("transform");
    panel.style.removeProperty("max-height");
    const rect = panel.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    let shift = 0;
    if (rect.right > viewportWidth - margin) {
      shift = viewportWidth - margin - rect.right;
    }
    if (rect.left + shift < margin) {
      shift = margin - rect.left;
    }
    if (shift) panel.style.transform = `translateX(${Math.round(shift)}px)`;
    const available = Math.floor(viewportHeight - rect.top - margin);
    if (available > 120 && rect.height > available) {
      panel.style.maxHeight = `${available}px`;
      panel.style.overflowY = "auto";
    }
  }

  function renderCategoryTabs() {
    refs.categoryTabs.innerHTML = PALETTE_CATEGORIES.map(function (category) {
      const label = getLocalizedPaletteCategoryLabel(category);
      return `
        <button class="category-tab${category.id === state.activeCategoryId ? " active" : ""}" type="button" data-category-id="${category.id}">
          ${escapeHtml(label)}
        </button>
      `;
    }).join("");
  }

  function matchesPaletteQuery(variantId, variant, groupCopy) {
    if (!state.paletteQuery) return true;
    const copy = getLocalizedVariantCopy(variantId, variant);
    const terms = [
      copy.type,
      copy.short,
      copy.size,
      copy.height,
      groupCopy.title,
      groupCopy.description,
      variant.family,
      variant.description
    ].join(" ").toLowerCase();
    return terms.indexOf(state.paletteQuery) !== -1;
  }

  function renderPalette() {
    const activeCategory = PALETTE_CATEGORIES.find(function (entry) {
      return entry.id === state.activeCategoryId;
    }) || PALETTE_CATEGORIES[0];
    const categories = state.paletteQuery ? PALETTE_CATEGORIES : [activeCategory];

    const sections = categories.reduce(function (allSections, category) {
      category.groups.forEach(function (group, groupIndex) {
        const groupCopy = getLocalizedPaletteGroupCopy(category.id, groupIndex, group);
        const visibleVariants = group.variants.filter(function (variantId) {
          const variant = ITEM_VARIANTS[variantId];
          return variant && matchesPaletteQuery(variantId, variant, groupCopy);
        });

        if (!visibleVariants.length) return;

        allSections.push(`
          <section class="palette-group">
            <div class="palette-head">
              <h3>${escapeHtml(groupCopy.title)}</h3>
              <p>${escapeHtml(groupCopy.description)}</p>
            </div>
            <div class="variant-grid">
              ${visibleVariants.map(function (variantId) {
                const variant = ITEM_VARIANTS[variantId];
                const copy = getLocalizedVariantCopy(variantId, variant);
                return `
                  <button class="variant-btn" type="button" data-variant-id="${variantId}">
                    ${getVariantPreviewMarkup(variantId, variant)}
                    <span class="variant-copy">
                      <strong>${escapeHtml(copy.short)}</strong>
                      <span class="variant-meta">${escapeHtml(isolateNumbers(copy.size))}</span>
                      <span class="variant-meta">${escapeHtml(isolateNumbers(copy.height))}</span>
                    </span>
                  </button>
                `;
              }).join("")}
            </div>
          </section>
        `);
      });
      return allSections;
    }, []);

    refs.palettePanel.innerHTML = sections.length ? sections.join("") : `<div class="palette-empty">${escapeHtml(getUiCopy("searchEmpty"))}</div>`;
  }

  function getVariantVisualKind(variantId, family) {
    if (variantId.indexOf("softbox-octa") === 0) return "softbox-octa";
    if (variantId.indexOf("softbox-parabolic") === 0) return "softbox-parabolic";
    if (variantId.indexOf("softbox-rect") === 0) return "softbox-rect";
    if (variantId.indexOf("led-panel-") === 0) return "led-panel";
    if (variantId.indexOf("strip-") === 0) return "striplight";
    if (variantId.indexOf("tube-") === 0) return "tube";
    if (variantId.indexOf("umbrella-") === 0) return "umbrella";
    if (variantId.indexOf("lantern-") === 0) return "lantern";
    if (variantId.indexOf("beauty-dish-") === 0) return "beauty-dish";
    if (variantId.indexOf("ringlight-") === 0) return "ringlight";
    if (variantId.indexOf("flash-head-") === 0 || variantId.indexOf("cob-led-") === 0 || variantId.indexOf("hmi-") === 0 || variantId.indexOf("fresnel-") === 0) return "spot-head";
    if (variantId.indexOf("projector-") === 0) return "spot-projector";
    if (variantId === "reflector-panel") return "flat-panel";
    if (variantId.indexOf("reflector-") === 0) return "reflector-disc";
    if (variantId.indexOf("flag-") === 0 || variantId.indexOf("cutter-") === 0 || variantId.indexOf("floppy-") === 0 || variantId.indexOf("scrim-") === 0) return "flag";
    if (variantId.indexOf("diffusion-") === 0 || variantId.indexOf("vflat-") === 0 || variantId.indexOf("foamcore-") === 0 || variantId.indexOf("negfill-") === 0) return "flat-panel";
    if (variantId.indexOf("camera-") === 0) return "camera";
    if (variantId.indexOf("subject-") === 0) return "subject";
    if (variantId.indexOf("stool-") === 0 || variantId.indexOf("ottoman-") === 0) return "stool";
    if (variantId.indexOf("chair-director") === 0) return "director-chair";
    if (variantId.indexOf("chair-") === 0) return "chair";
    if (variantId.indexOf("armchair-") === 0) return "armchair";
    if (variantId.indexOf("bench-") === 0) return "bench";
    if (variantId.indexOf("sofa-") === 0) return "sofa";
    if (variantId.indexOf("table-round") === 0) return "round-table";
    if (variantId.indexOf("table-") === 0) return "table";
    if (variantId.indexOf("desk-") === 0) return "desk";
    if (variantId.indexOf("makeup-station") === 0) return "makeup-station";
    if (variantId.indexOf("cube-") === 0) return "block";
    if (variantId.indexOf("applebox-") === 0) return "applebox";
    if (variantId.indexOf("sandbag-") === 0) return "sandbag";
    if (variantId.indexOf("cart-") === 0) return "cart";
    if (variantId.indexOf("ladder-") === 0) return "ladder";
    if (variantId.indexOf("mirror-") === 0) return "mirror";
    if (variantId.indexOf("tether-") === 0) return "tether-station";
    if (variantId.indexOf("monitor-") === 0) return "monitor-station";
    if (variantId.indexOf("dimmer-") === 0) return "dimmer-desk";
    if (variantId.indexOf("cstand-arm") === 0) return "cstand-arm";
    if (variantId.indexOf("cstand-") === 0) return "cstand";
    if (variantId.indexOf("combo-") === 0) return "combo-stand";
    if (variantId.indexOf("roller-") === 0) return "roller-stand";
    if (variantId.indexOf("boom-") === 0) return "boom-stand";
    if (variantId.indexOf("power-pack") === 0) return "power-pack";
    if (family === "camera") return "camera";
    if (family === "softbox") return "softbox-rect";
    if (family === "striplight") return "striplight";
    if (family === "reflector") return "spot-head";
    if (family === "flag") return "flag";
    if (family === "vflat") return "flat-panel";
    if (family === "stool") return "stool";
    if (family === "table") return "table";
    if (family === "stand") return "stand";
    return "block";
  }

  function isEmitterVisualKind(kind) {
    return [
      "softbox-octa",
      "softbox-parabolic",
      "softbox-rect",
      "led-panel",
      "striplight",
      "tube",
      "umbrella",
      "lantern",
      "ringlight",
      "beauty-dish",
      "spot-head",
      "spot-projector"
    ].indexOf(kind) !== -1;
  }

  function getDefaultPowerPercent(kind) {
    if (kind === "tube") return 55;
    if (kind === "led-panel" || kind === "ringlight") return 60;
    if (kind === "umbrella" || kind === "lantern") return 68;
    if (kind === "softbox-octa" || kind === "softbox-rect" || kind === "softbox-parabolic") return 72;
    if (kind === "striplight") return 74;
    if (kind === "beauty-dish") return 78;
    if (kind === "spot-head") return 80;
    if (kind === "spot-projector") return 84;
    return 70;
  }

  function isLightEmitter(item) {
    if (!item) return false;
    return isEmitterVisualKind(getVariantVisualKind(item.variantId, item.family));
  }

  function clampPowerPercent(value) {
    return clamp(value, 10, 100);
  }

  function formatPowerLabel(value) {
    return `${Math.round(clampPowerPercent(value))}%`;
  }

  function formatFStopLabel(value) {
    return `f/${Math.max(0.7, value).toFixed(1)}`;
  }

  function getNearestEmitter(sourceItem) {
    const matches = state.items.filter(function (item) {
      return item.id !== sourceItem.id && isLightEmitter(item);
    });

    if (!matches.length) return null;

    return matches.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(sourceItem, item) < distanceBetweenItems(sourceItem, closest) ? item : closest;
    }, null);
  }

  function getLightGuideNumber(item) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    if (kind === "tube") return 6.3;
    if (kind === "led-panel") return 7.8;
    if (kind === "ringlight") return 8.6;
    if (kind === "umbrella") return 10.8;
    if (kind === "lantern") return 8.8;
    if (kind === "softbox-octa" || kind === "softbox-rect") return 11.6;
    if (kind === "softbox-parabolic") return 12.8;
    if (kind === "striplight") return 12.2;
    if (kind === "beauty-dish") return 15.2;
    if (kind === "spot-head") return 16.4;
    if (kind === "spot-projector") return 18.8;
    return 11;
  }

  function getLightEstimation(lightItem, subjectItem) {
    if (!isLightEmitter(lightItem) || !subjectItem) return null;
    const distance = Math.max(0.35, distanceBetweenItems(lightItem, subjectItem));
    const angle = getAngleToTarget(lightItem, subjectItem);
    const aimFactor = Math.max(0.18, Math.cos(degreesToRadians(Math.min(angle, 89))));
    const power = clampPowerPercent(typeof lightItem.power === "number" ? lightItem.power : getDefaultPowerPercent(getVariantVisualKind(lightItem.variantId, lightItem.family)));
    const guideNumber = getLightGuideNumber(lightItem);
    const fStop = (guideNumber * Math.sqrt(power / 100) * Math.sqrt(aimFactor)) / distance;
    return {
      distance: distance,
      angle: angle,
      power: power,
      fStop: Math.max(0.7, fStop)
    };
  }

  function getVariantPreviewMarkup(variantId, variant) {
    const title = escapeHtml(getLocalizedVariantTitle(variantId, variant));
    const kind = getVariantVisualKind(variantId, variant.family);
    const ratio = Math.min(3, Math.max(1, window.devicePixelRatio || 1) * 1.5);
    const src = StudioModels.thumbnail(kind, variantId, variant, 150, 92, ratio);
    return `
      <span class="variant-preview" aria-hidden="true">
        <img class="variant-img" src="${src}" alt="" width="150" height="92" draggable="false" data-title="${title}">
      </span>
    `;
  }

  function renderColorSwatches(container, palette, kind) {
    container.innerHTML = palette.map(function (entry) {
      const label = getLocalizedColorLabel(entry);
      return `
        <button class="menu-swatch" type="button" data-color-kind="${kind}" data-color-id="${entry.id}">
          <span class="menu-swatch-chip" style="background:${entry.color}"></span>
          <strong>${escapeHtml(label)}</strong>
        </button>
      `;
    }).join("");
  }

  function updateColorSwatchState() {
    document.querySelectorAll('[data-color-kind="floor"]').forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-color-id") === state.floorId);
    });
    document.querySelectorAll('[data-color-kind="backdrop"]').forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-color-id") === state.backdropId);
    });
  }

  function normalizeCustomPreset(input) {
    const preset = input && typeof input === "object" ? input : {};
    const items = Array.isArray(preset.items) ? preset.items : [];
    return {
      id: String(preset.id || ""),
      name: String(preset.name || "").trim(),
      floorId: String(preset.floorId || FLOOR_COLORS[0].id),
      backdropId: String(preset.backdropId || BACKDROP_COLORS[3].id),
      items: items.map(function (entry) {
        return {
          variantId: String(entry.variantId || ""),
          x: typeof entry.x === "number" ? entry.x : 0,
          y: typeof entry.y === "number" ? entry.y : 0,
          rotation: typeof entry.rotation === "number" ? entry.rotation : 0,
          label: typeof entry.label === "string" ? entry.label : "",
          power: typeof entry.power === "number" ? clampPowerPercent(entry.power) : null
        };
      }).filter(function (entry) {
        return entry.variantId && ITEM_VARIANTS[entry.variantId];
      }),
      isCustom: true
    };
  }

  function loadCustomPresets() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_CUSTOM_PRESETS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeCustomPreset).filter(function (preset) {
        return preset.id && preset.name && preset.items.length;
      });
    } catch (error) {
      return [];
    }
  }

  function persistCustomPresets() {
    try {
      window.localStorage.setItem(STORAGE_KEY_CUSTOM_PRESETS, JSON.stringify(state.customPresets.map(function (preset) {
        return {
          id: preset.id,
          name: preset.name,
          floorId: preset.floorId,
          backdropId: preset.backdropId,
          items: preset.items
        };
      })));
    } catch (error) {
      // Ignore storage access issues.
    }
  }

  function slugifyPresetName(name) {
    return String(name || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || `preset-${Date.now()}`;
  }

  function buildDynamicPresetSummary(preset) {
    const labels = [];
    const seen = new Set();

    preset.items.forEach(function (entry) {
      const variant = ITEM_VARIANTS[entry.variantId];
      if (!variant || variant.family === "subject") return;
      const label = getLocalizedVariantTitle(entry.variantId, variant);
      if (seen.has(label)) return;
      seen.add(label);
      labels.push(label);
    });

    const itemWord = preset.items.length === 1 ? t("status.itemSingular") : t("status.itemPlural");
    const countLabel = `${preset.items.length} ${itemWord}`;
    const visible = labels.slice(0, 3);
    const suffix = labels.length > 3 ? ` +${labels.length - 3}` : "";
    if (!visible.length) return countLabel;
    return `${countLabel} · ${formatLocalizedList(visible)}${suffix}`.trim();
  }

  function serializeCurrentPreset(name) {
    return normalizeCustomPreset({
      id: `custom-${slugifyPresetName(name)}`,
      name: name,
      floorId: state.floorId,
      backdropId: state.backdropId,
      items: state.items.map(function (item) {
        return {
          variantId: item.variantId,
          x: Number(item.x.toFixed(3)),
          y: Number(item.y.toFixed(3)),
          rotation: Number(item.rotation.toFixed(1)),
          label: item.label,
          power: typeof item.power === "number" ? item.power : null
        };
      })
    });
  }

  function saveCurrentPreset() {
    if (!state.items.length) {
      window.alert(getUiCopy("savePresetEmpty"));
      return;
    }

    const name = window.prompt(getUiCopy("savePresetPrompt"), "");
    if (name === null) return;

    const trimmed = String(name || "").trim();
    if (!trimmed) return;

    const preset = serializeCurrentPreset(trimmed);
    const existingIndex = state.customPresets.findIndex(function (entry) {
      return entry.id === preset.id;
    });

    if (existingIndex >= 0) state.customPresets.splice(existingIndex, 1, preset);
    else state.customPresets.unshift(preset);

    persistCustomPresets();
    renderPresetMenu();
    window.alert(getUiCopy("savePresetSaved", { name: trimmed }));
  }

  function getPresetCategories() {
    if (!state.customPresets.length) return STUDIO_PRESET_CATEGORIES;
    return [{
      id: "custom",
      label: getUiCopy("customPresets"),
      description: getUiCopy("customPresetsDescription"),
      presets: state.customPresets
    }].concat(STUDIO_PRESET_CATEGORIES);
  }

  function renderPresetMenu() {
    if (!refs.presetMenuList) return;
    refs.presetMenuList.innerHTML = getPresetCategories().map(function (category) {
      const categoryCopy = getLocalizedPresetCategory(category);
      return `
        <section class="preset-group">
          <div class="preset-head">
            <h3>${escapeHtml(categoryCopy.label)}</h3>
            <p>${escapeHtml(categoryCopy.description)}</p>
          </div>
          <div class="preset-list">
            ${category.presets.map(function (preset) {
              return `
                <button class="preset-item" type="button" data-preset-id="${preset.id}">
                  <em>${escapeHtml(categoryCopy.label)}</em>
                  <strong>${escapeHtml(getLocalizedPresetName(preset))}</strong>
                  <span>${escapeHtml(getLocalizedPresetSummary(preset))}</span>
                </button>
              `;
            }).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  function findPreset(presetId) {
    const categories = getPresetCategories();
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];
      const preset = category.presets.find(function (entry) {
        return entry.id === presetId;
      });
      if (preset) return preset;
    }
    return null;
  }
  function createPlacedItem(variantId, options) {
    const variant = ITEM_VARIANTS[variantId];
    if (!variant) return null;

    const spawn = spawnPoints[state.items.length % spawnPoints.length];
    const config = options || {};
    const kind = getVariantVisualKind(variantId, variant.family);
    const emitter = isEmitterVisualKind(kind);
    return {
      id: `item-${state.nextId++}`,
      variantId: variantId,
      family: variant.family,
      typeLabel: variant.typeLabel,
      variantLabel: variant.shortLabel,
      sizeLabel: variant.sizeLabel,
      heightLabel: variant.heightLabel,
      description: variant.description,
      width: variant.width,
      depth: variant.depth,
      height: variant.height,
      shape: variant.shape,
      label: config.label || nextLabel(variant.typeLabel),
      x: clamp(typeof config.x === "number" ? config.x : spawn.x + randomOffset(), 0.75, STUDIO.width - 0.75),
      y: clamp(typeof config.y === "number" ? config.y : spawn.y + randomOffset(), 1.0, STUDIO.depth - 0.5),
      rotation: normalizeDegrees(typeof config.rotation === "number" ? config.rotation : defaultRotation(variant.family)),
      power: emitter ? clampPowerPercent(typeof config.power === "number" ? config.power : getDefaultPowerPercent(kind)) : null
    };
  }

  function loadPreset(presetId) {
    const preset = findPreset(presetId);
    if (!preset) return;

    state.floorId = preset.floorId || FLOOR_COLORS[0].id;
    state.backdropId = preset.backdropId || BACKDROP_COLORS[3].id;
    state.items = [];
    state.selectedId = null;
    state.interaction = null;
    state.nextId = 1;

    preset.items.forEach(function (entry) {
      const item = createPlacedItem(entry.variantId, entry);
      if (item) state.items.push(item);
    });

    state.selectedId = state.items[0] ? state.items[0].id : null;
    renderAll();
  }

  function addItem(variantId) {
    const item = createPlacedItem(variantId);
    if (!item) return;

    state.items.push(item);
    state.selectedId = item.id;
    renderAll();
  }
  function defaultRotation(family) {
    if (family === "softbox") return 45;
    if (family === "striplight") return 90;
    if (family === "reflector") return 90;
    if (family === "flag") return 90;
    if (family === "vflat") return 90;
    if (family === "stand") return 90;
    if (family === "table" || family === "stool") return 0;
    return 270;
  }

  function nextLabel(base) {
    const count = state.items.filter(function (item) {
      return item.typeLabel === base;
    }).length;
    return `${base} ${count + 1}`;
  }

  function randomOffset() {
    return (Math.random() - 0.5) * 0.28;
  }

  function handleReset() {
    if (!window.confirm(t("dialogs.reset"))) {
      return;
    }

    state.floorId = FLOOR_COLORS[0].id;
    state.backdropId = BACKDROP_COLORS[3].id;
    state.items = [];
    state.selectedId = null;
    state.interaction = null;
    renderAll();
  }

  function handleSelectionInput(event) {
    const item = getSelectedItem();
    if (!item) return;
    const field = event.target.getAttribute("data-field");
    if (!field) return;
    const value = parseFloat(event.target.value);
    if (Number.isNaN(value)) return;

    if (field === "x" || field === "y") {
      item[field] = clampItemPosition(item, field, value);
    } else if (field === "rotation") {
      item.rotation = normalizeDegrees(value);
    } else if (field === "power" && isLightEmitter(item)) {
      item.power = clampPowerPercent(value);
    }

    renderAll();
  }

  function handleSelectionClick(event) {
    const action = event.target.getAttribute("data-action");
    if (action !== "delete") return;
    deleteSelectedItem();
  }

  function distanceBetweenItems(a, b) {
    if (!a || !b) return 0;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  }

  function getNearestItemByFamily(sourceItem, family) {
    const matches = state.items.filter(function (item) {
      return item.id !== sourceItem.id && item.family === family;
    });

    if (!matches.length) return null;

    return matches.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(sourceItem, item) < distanceBetweenItems(sourceItem, closest) ? item : closest;
    }, null);
  }

  function formatDistanceLabel(distance) {
    if (distance < 1) return `${Math.round(distance * 100)} cm`;
    return `${distance.toFixed(distance < 10 ? 2 : 1)} m`;
  }

  function formatAngleLabel(angle) {
    return `${Math.round(normalizeDegrees(angle))}°`;
  }

  function getAngleToTarget(sourceItem, targetItem) {
    const bearing = normalizeDegrees(radiansToDegrees(Math.atan2(targetItem.y - sourceItem.y, targetItem.x - sourceItem.x)));
    const diff = Math.abs(normalizeDegrees(bearing) - normalizeDegrees(sourceItem.rotation));
    return diff > 180 ? 360 - diff : diff;
  }

  function getBackdropDistance(item) {
    return Math.max(0, item.y - STUDIO.backdropDepth);
  }

  function getBackdropMeasureY(item) {
    return item.y <= STUDIO.backdropDepth ? item.y : STUDIO.backdropDepth;
  }

  function buildSelectionMetrics(item, copy) {
    const metrics = [{
      label: getUiCopy("metricHeight"),
      value: copy.height
    }, {
      label: getUiCopy("metricRotation"),
      value: formatAngleLabel(item.rotation)
    }];

    if (item.family === "subject") {
      const camera = getNearestItemByFamily(item, "camera");
      const mainLight = getNearestEmitter(item);
      metrics.push({
        label: getUiCopy("metricBackdropDistance"),
        value: formatDistanceLabel(getBackdropDistance(item))
      });
      if (camera) {
        metrics.push({
          label: getUiCopy("metricCameraDistance"),
          value: formatDistanceLabel(distanceBetweenItems(item, camera))
        });
      }
      if (mainLight) {
        const lightEstimate = getLightEstimation(mainLight, item);
        metrics.push({
          label: getUiCopy("metricMainLightDistance"),
          value: formatDistanceLabel(lightEstimate.distance)
        });
        metrics.push({
          label: getUiCopy("metricMainLightPower"),
          value: formatPowerLabel(lightEstimate.power)
        });
        metrics.push({
          label: getUiCopy("metricEstimatedFStop"),
          value: formatFStopLabel(lightEstimate.fStop)
        });
      }
      return metrics;
    }

    const subject = getNearestItemByFamily(item, "subject");
    if (!subject) return metrics;

    if (isLightEmitter(item)) {
      const lightEstimate = getLightEstimation(item, subject);
      metrics.push({
        label: getUiCopy("metricSubjectDistance"),
        value: formatDistanceLabel(lightEstimate.distance)
      });
      metrics.push({
        label: getUiCopy("metricLightAngle"),
        value: formatAngleLabel(lightEstimate.angle)
      });
      metrics.push({
        label: getUiCopy("metricMainLightPower"),
        value: formatPowerLabel(lightEstimate.power)
      });
      metrics.push({
        label: getUiCopy("metricEstimatedFStop"),
        value: formatFStopLabel(lightEstimate.fStop)
      });
      return metrics;
    }

    metrics.push({
      label: getUiCopy("metricSubjectDistance"),
      value: formatDistanceLabel(distanceBetweenItems(item, subject))
    });

    return metrics;
  }

  function updateSelectionPanel() {
    const item = getSelectedItem();
    if (!item) {
      refs.selectionPanel.className = "selection-panel empty is-hidden";
      refs.selectionPanel.innerHTML = "";
      return;
    }

    const copy = getLocalizedVariantCopy(item.variantId, ITEM_VARIANTS[item.variantId]);
    const itemLabel = getLocalizedItemLabel(item);
    const powerMarkup = isLightEmitter(item) ? `
      <div class="selection-power">
        <label>
          <span>${escapeHtml(getUiCopy("power"))}</span>
          <span class="power-readout">${escapeHtml(formatPowerLabel(item.power))}</span>
        </label>
        <input type="range" min="10" max="100" step="5" data-field="power" value="${item.power}">
        <span class="inline-note">${escapeHtml(getUiCopy("powerHint"))}</span>
      </div>
    ` : "";
    const metricMarkup = buildSelectionMetrics(item, copy).map(function (entry) {
      return `
        <div class="metric-chip">
          <dt>${escapeHtml(entry.label)}</dt>
          <dd>${escapeHtml(isolateNumbers(entry.value))}</dd>
        </div>
      `;
    }).join("");

    refs.selectionPanel.className = "selection-panel";
    refs.selectionPanel.innerHTML = `
      <div class="selection-head">
        <div class="selection-copy">
          <strong>${escapeHtml(itemLabel)}</strong>
          <span>${escapeHtml(copy.type)} · ${escapeHtml(copy.short)} · ${escapeHtml(isolateNumbers(copy.size))}</span>
        </div>
        <button class="delete-btn" type="button" data-action="delete" aria-label="${escapeHtml(t("stage.deleteAria"))}">
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4M6.8 6.8v4.4M9.2 6.8v4.4"/></svg>
          <span>${escapeHtml(t("selection.delete"))}</span>
        </button>
      </div>
      <div class="selection-grid">
        <label>${escapeHtml(getUiCopy("x"))}<input type="number" step="0.1" data-field="x" value="${item.x.toFixed(2)}"></label>
        <label>${escapeHtml(getUiCopy("y"))}<input type="number" step="0.1" data-field="y" value="${item.y.toFixed(2)}"></label>
        <label>${escapeHtml(t("selection.rotation"))}<input type="number" step="1" data-field="rotation" value="${item.rotation.toFixed(0)}"></label>
      </div>
      ${powerMarkup}
      <dl class="selection-metrics">${metricMarkup}</dl>
    `;
  }

  function updateStatus() {
    const floor = getFloorColor();
    const backdrop = getBackdropColor();
    const itemWord = state.items.length === 1 ? t("status.itemSingular") : t("status.itemPlural");
    refs.studioBadge.textContent = getUiCopy("studio", { width: STUDIO.width, depth: STUDIO.depth });
    refs.countBadge.textContent = `${state.items.length} ${itemWord} · ${getLocalizedColorLabel(floor)} / ${getLocalizedColorLabel(backdrop)}`;
  }

  function renderAll() {
    syncCompactLibraryUi();
    syncStageViewUi();
    resizeCanvas(refs.planCanvas);
    resizeCanvas(refs.isoCanvas);
    if (updatePlanRegion()) syncStageViewUi();
    updateColorSwatchState();
    updateSelectionPanel();
    updateStatus();
    renderPlanZoomUi();
    renderIsoZoomUi();
    syncMeasurementToggle();
    syncMenus();
    drawPlanView();
    drawIsoView();
  }

  function getSelectedItem() {
    return findItem(state.selectedId);
  }

  function findItem(id) {
    return state.items.find(function (item) {
      return item.id === id;
    }) || null;
  }

  function deleteSelectedItem() {
    if (!state.selectedId) return;
    state.items = state.items.filter(function (item) {
      return item.id !== state.selectedId;
    });
    state.selectedId = null;
    state.interaction = null;
    renderAll();
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && isCompactLibraryViewport() && !state.libraryCollapsed) {
      closeLibraryPanel();
      return;
    }

    const item = getSelectedItem();
    if (!item) return;

    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      deleteSelectedItem();
      return;
    }

    const step = event.shiftKey ? 0.05 : 0.1;
    let changed = false;

    if (event.key === "ArrowLeft") {
      item.x = clampItemPosition(item, "x", item.x - step);
      changed = true;
    } else if (event.key === "ArrowRight") {
      item.x = clampItemPosition(item, "x", item.x + step);
      changed = true;
    } else if (event.key === "ArrowUp") {
      item.y = clampItemPosition(item, "y", item.y - step);
      changed = true;
    } else if (event.key === "ArrowDown") {
      item.y = clampItemPosition(item, "y", item.y + step);
      changed = true;
    } else if (event.key.toLowerCase() === "r") {
      item.rotation = normalizeDegrees(item.rotation + (event.shiftKey ? -10 : 10));
      changed = true;
    }

    if (changed) {
      event.preventDefault();
      renderAll();
    }
  }

  function handlePlanWheel(event) {
    const anchor = getCanvasPointFromEvent(event, refs.planCanvas);
    if (!anchor) return;
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    if (!delta) return;
    event.preventDefault();
    closeMenus();
    setPlanZoom(state.planZoom + delta, anchor);
  }

  function handleIsoWheel(event) {
    if (state.primaryView !== "iso") return;
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    if (!delta) return;
    event.preventDefault();
    closeMenus();
    setIsoZoom(state.isoZoom + delta);
  }

  function handleIsoPointerDown(event) {
    if (state.primaryView !== "iso") return;
    closeMenus();
    const canvasPoint = getCanvasPointFromEvent(event, refs.isoCanvas);
    if (!canvasPoint) return;
    updateIsoActivePointer(event, canvasPoint);

    if (state.isoActivePointers.size >= 2 && startIsoPinchGesture()) {
      drawIsoView();
    }
  }

  function handleIsoPointerMove(event) {
    if (state.primaryView !== "iso") return;
    const canvasPoint = getCanvasPointFromEvent(event, refs.isoCanvas);
    if (!canvasPoint) return;
    updateIsoActivePointer(event, canvasPoint);

    if (state.isoPinchGesture && state.isoPinchGesture.pointerIds.indexOf(event.pointerId) !== -1) {
      const first = state.isoActivePointers.get(state.isoPinchGesture.pointerIds[0]);
      const second = state.isoActivePointers.get(state.isoPinchGesture.pointerIds[1]);
      if (first && second) {
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));
        const nextZoom = state.isoPinchGesture.startZoom * (distance / state.isoPinchGesture.startDistance);
        setIsoZoom(nextZoom);
      }
    }
  }

  function handleIsoPointerUp(event) {
    clearIsoActivePointer(event.pointerId);
  }

  function handleIsoPointerLeave(event) {
    if (event) clearIsoActivePointer(event.pointerId);
  }

  function handleStageViewPaneKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const pane = event.currentTarget;
    if (!pane || pane.classList.contains("is-main")) return;
    event.preventDefault();
    setPrimaryView(pane.getAttribute("data-stage-view-pane"));
  }

  function handlePointerDown(event) {
    closeMenus();
    const canvasPoint = getCanvasPointFromEvent(event, refs.planCanvas);
    if (!canvasPoint) return;
    updateActivePointer(event, canvasPoint);

    if (state.activePointers.size >= 2 && startPinchGesture()) {
      drawPlanView();
      return;
    }

    const point = planToStudio(canvasPoint.x, canvasPoint.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
    if (!point) return;

    if (state.measurementMode) {
      const measurePoint = resolveMeasurePoint(point.x, point.y);
      if (!state.measureStart || state.measureEnd) {
        state.measureStart = measurePoint;
        state.measurePreview = null;
        state.measureEnd = null;
      } else {
        state.measureEnd = measurePoint;
        state.measurePreview = null;
      }
      drawPlanView();
      return;
    }

    const selected = getSelectedItem();
    if (selected && isOnRotateHandle(point.x, point.y, selected)) {
      state.interaction = {
        mode: "rotate",
        pointerId: event.pointerId,
        itemId: selected.id
      };
      refs.planCanvas.setPointerCapture(event.pointerId);
      refs.planCanvas.style.cursor = "grabbing";
      return;
    }

    const hit = hitTest(point.x, point.y);
    if (!hit) {
      state.selectedId = null;
      state.interaction = null;
      renderAll();
      return;
    }

    state.selectedId = hit.id;
    state.interaction = {
      mode: "drag",
      pointerId: event.pointerId,
      itemId: hit.id,
      offsetX: point.x - hit.x,
      offsetY: point.y - hit.y
    };
    refs.planCanvas.setPointerCapture(event.pointerId);
    refs.planCanvas.style.cursor = "grabbing";
    renderAll();
  }

  function handlePointerMove(event) {
    const canvasPoint = getCanvasPointFromEvent(event, refs.planCanvas);
    if (!canvasPoint) return;
    updateActivePointer(event, canvasPoint);

    if (state.pinchGesture && state.pinchGesture.pointerIds.indexOf(event.pointerId) !== -1) {
      const first = state.activePointers.get(state.pinchGesture.pointerIds[0]);
      const second = state.activePointers.get(state.pinchGesture.pointerIds[1]);
      if (first && second) {
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));
        const midpoint = {
          x: (first.x + second.x) / 2,
          y: (first.y + second.y) / 2
        };
        const nextZoom = state.pinchGesture.startZoom * (distance / state.pinchGesture.startDistance);
        setPlanZoom(nextZoom, midpoint);
      }
      return;
    }

    const point = planToStudio(canvasPoint.x, canvasPoint.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
    if (!point) return;

    if (state.measurementMode) {
      if (state.measureStart && !state.measureEnd) {
        state.measurePreview = resolveMeasurePoint(point.x, point.y);
      }
      refs.planCanvas.style.cursor = "crosshair";
      drawPlanView();
      return;
    }

    if (state.interaction && state.interaction.pointerId === event.pointerId) {
      const item = findItem(state.interaction.itemId);
      if (!item) return;

      if (state.interaction.mode === "drag") {
        item.x = clampItemPosition(item, "x", point.x - state.interaction.offsetX);
        item.y = clampItemPosition(item, "y", point.y - state.interaction.offsetY);
      } else if (state.interaction.mode === "rotate") {
        item.rotation = normalizeDegrees(radiansToDegrees(Math.atan2(point.y - item.y, point.x - item.x)));
      }

      renderAll();
      return;
    }

    const selected = getSelectedItem();
    const hoverHandle = selected ? isOnRotateHandle(point.x, point.y, selected) : false;
    const hoverItem = hoverHandle ? selected : hitTest(point.x, point.y);
    state.hoverHandle = hoverHandle;
    state.hoverItemId = hoverItem ? hoverItem.id : null;

    if (hoverHandle) refs.planCanvas.style.cursor = "crosshair";
    else if (hoverItem) refs.planCanvas.style.cursor = "grab";
    else refs.planCanvas.style.cursor = "default";

    drawPlanView();
  }

  function handlePointerUp(event) {
    clearActivePointer(event.pointerId);
    if (state.pinchGesture) return;
    if (state.measurementMode) return;
    if (state.interaction && state.interaction.pointerId === event.pointerId) {
      state.interaction = null;
      refs.planCanvas.releasePointerCapture(event.pointerId);
      refs.planCanvas.style.cursor = "default";
      renderAll();
    }
  }

  function handlePointerLeave(event) {
    if (event) clearActivePointer(event.pointerId);
    if (state.pinchGesture) return;
    if (state.measurementMode) {
      if (!state.measureEnd) state.measurePreview = null;
      refs.planCanvas.style.cursor = "crosshair";
      drawPlanView();
      return;
    }

    if (!state.interaction) {
      state.hoverHandle = false;
      state.hoverItemId = null;
      refs.planCanvas.style.cursor = "default";
      drawPlanView();
    }
  }

  function getCanvasPointFromEvent(event, canvas) {
    const targetCanvas = canvas || refs.planCanvas;
    if (!targetCanvas) return null;
    const rect = targetCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const ratioX = targetCanvas.width / rect.width;
    const ratioY = targetCanvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * ratioX,
      y: (event.clientY - rect.top) * ratioY
    };
  }


  function resolveMeasurePoint(studioX, studioY) {
    const hit = hitTest(studioX, studioY);
    if (hit) {
      return {
        x: hit.x,
        y: hit.y,
        label: getLocalizedItemLabel(hit)
      };
    }

    return {
      x: clamp(studioX, 0, STUDIO.width),
      y: clamp(studioY, 0, STUDIO.depth),
      label: ""
    };
  }

  function hitTest(studioX, studioY) {
    const items = state.items.slice().reverse();
    for (let index = 0; index < items.length; index += 1) {
      if (isPointInsideItem(studioX, studioY, items[index])) {
        return items[index];
      }
    }
    return null;
  }

  function isPointInsideItem(studioX, studioY, item) {
    const radians = degreesToRadians(item.rotation);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const dx = studioX - item.x;
    const dy = studioY - item.y;
    const localX = dx * cos + dy * sin;
    const localY = -dx * sin + dy * cos;

    if (item.shape === "circle" || item.shape === "ellipse") {
      const rx = item.width / 2;
      const ry = item.depth / 2;
      return ((localX * localX) / (rx * rx)) + ((localY * localY) / (ry * ry)) <= 1;
    }

    return Math.abs(localX) <= item.width / 2 && Math.abs(localY) <= item.depth / 2;
  }

  function isOnRotateHandle(studioX, studioY, item) {
    const handle = getRotateHandle(item);
    const dx = studioX - handle.x;
    const dy = studioY - handle.y;
    return Math.sqrt(dx * dx + dy * dy) <= 0.18;
  }

  function getRotateHandle(item) {
    const distance = Math.max(item.width, item.depth) * 0.7 + 0.45;
    const radians = degreesToRadians(item.rotation);
    return {
      x: item.x + Math.cos(radians) * distance,
      y: item.y + Math.sin(radians) * distance
    };
  }

  function clampItemPosition(item, axis, value) {
    const radius = Math.max(item.width, item.depth) * 0.5;
    if (axis === "x") {
      return clamp(value, radius + 0.18, STUDIO.width - radius - 0.18);
    }
    return clamp(value, radius + 0.2, STUDIO.depth - radius - 0.18);
  }

  function drawPlanView(targetCtx, width, height, options) {
    const ctx = targetCtx || planCtx;
    // Plan affiche en vignette (a l'ecran ou dans un export) : sans etiquettes ni cotes.
    const compact = options && typeof options.compact === "boolean"
      ? options.compact
      : (!targetCtx && state.primaryView === "iso");
    const canvasWidth = width || refs.planCanvas.width;
    const canvasHeight = height || refs.planCanvas.height;
    const metrics = getPlanMetrics(canvasWidth, canvasHeight);
    const floor = getFloorColor();
    const backdrop = getBackdropColor();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    planLabelQueue = [];

    const bg = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bg.addColorStop(0, "rgba(255,255,255,0.07)");
    bg.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const stageLeft = metrics.left;
    const stageTop = metrics.top;
    const stageWidth = STUDIO.width * metrics.scale;
    const stageHeight = STUDIO.depth * metrics.scale;

    const shell = ctx.createLinearGradient(stageLeft, stageTop, stageLeft, stageTop + stageHeight);
    shell.addColorStop(0, lightenHex(floor.color, 0.14));
    shell.addColorStop(1, darkenHex(floor.color, 0.18));
    roundRect(ctx, stageLeft, stageTop, stageWidth, stageHeight, PLAN_CORNER_RADIUS * metrics.unit);
    ctx.fillStyle = shell;
    ctx.fill();

    drawPlanBackdrop(ctx, metrics, backdrop.color);
    drawPlanGrid(ctx, metrics);
    if (!compact) drawPlanMeasures(ctx, metrics);

    drawPlanItems(ctx, metrics);

    if (compact) {
      planLabelQueue = [];
      return;
    }

    const measurementGuides = state.measurementMode ? getMeasurementModeGuides() : [];
    if (measurementGuides.length) {
      const theme = getCanvasTheme();
      drawMeasurementGuides(ctx, measurementGuides, metrics, {
        stroke: theme.measureModeLine,
        border: theme.measureModeBorder,
        fill: theme.measureBg,
        text: theme.measureText
      });
    }

    const selected = getSelectedItem();
    if (selected) {
      if (!state.measurementMode || !measurementGuides.length) {
        drawSelectedMeasurementGuides(ctx, selected, metrics);
      }
      drawSelectionOutline(ctx, selected, metrics);
    }

    drawManualMeasurement(ctx, metrics);
    queuePlanItemLabels(metrics);
    flushPlanLabels(ctx, metrics);
  }

  function drawPlanBackdrop(ctx, metrics, color) {
    const width = STUDIO.width * metrics.scale;
    const depth = STUDIO.backdropDepth * metrics.scale;
    const left = metrics.left;
    const top = metrics.top;

    // Mur de fond : bande pleine, puis arrondi du cyclo rendu par un degrade d'ombre.
    const backdropGradient = ctx.createLinearGradient(0, top, 0, top + depth);
    backdropGradient.addColorStop(0, lightenHex(color, 0.12));
    backdropGradient.addColorStop(1, darkenHex(color, 0.06));
    roundTopRect(ctx, left, top, width, depth, PLAN_CORNER_RADIUS * metrics.unit);
    ctx.fillStyle = backdropGradient;
    ctx.fill();

    const sweep = 18 * metrics.unit;
    const sweepGradient = ctx.createLinearGradient(0, top + depth, 0, top + depth + sweep);
    sweepGradient.addColorStop(0, rgbaFromHex(darkenHex(color, 0.35), 0.28));
    sweepGradient.addColorStop(1, rgbaFromHex(darkenHex(color, 0.35), 0));
    ctx.fillStyle = sweepGradient;
    ctx.fillRect(left, top + depth, width, sweep);

    ctx.strokeStyle = rgbaFromHex(darkenHex(color, 0.3), 0.55);
    ctx.lineWidth = Math.max(1, 1.5 * metrics.unit);
    ctx.beginPath();
    ctx.moveTo(left, top + depth);
    ctx.lineTo(left + width, top + depth);
    ctx.stroke();
  }


  function drawPlanGrid(ctx, metrics) {
    const left = metrics.left;
    const top = metrics.top;
    const width = STUDIO.width * metrics.scale;
    const height = STUDIO.depth * metrics.scale;
    const floorTop = top + STUDIO.backdropDepth * metrics.scale;
    const hairline = Math.max(1, (metrics.px || 1));

    ctx.save();
    // Grille uniquement sur le sol, pas sur le mur de fond.
    ctx.beginPath();
    ctx.rect(left, floorTop, width, top + height - floorTop);
    ctx.clip();

    // Traits fins tous les 50 cm, traits marques tous les metres.
    [[0.5, "rgba(255,255,255,0.16)"], [1, "rgba(255,255,255,0.34)"]].forEach(function (pass) {
      const step = pass[0];
      ctx.strokeStyle = pass[1];
      ctx.lineWidth = hairline;
      ctx.beginPath();
      for (let x = step; x < STUDIO.width; x += step) {
        if (step === 0.5 && Number.isInteger(x)) continue;
        const px = Math.round(left + x * metrics.scale) + 0.5;
        ctx.moveTo(px, floorTop);
        ctx.lineTo(px, top + height);
      }
      for (let y = step; y < STUDIO.depth; y += step) {
        if (step === 0.5 && Number.isInteger(y)) continue;
        const py = Math.round(top + y * metrics.scale) + 0.5;
        if (py <= floorTop) continue;
        ctx.moveTo(left, py);
        ctx.lineTo(left + width, py);
      }
      ctx.stroke();
    });

    ctx.restore();

    ctx.strokeStyle = "rgba(7, 10, 16, 0.28)";
    ctx.lineWidth = 2 * metrics.unit;
    roundRect(ctx, left, top, width, height, PLAN_CORNER_RADIUS * metrics.unit);
    ctx.stroke();
  }


  function drawPlanMeasures(ctx, metrics) {
    ctx.save();
    const fontSize = Math.max(12 * metrics.unit, 13 * (metrics.px || 1));
    const offset = fontSize * 1.6;
    ctx.fillStyle = getCanvasTheme().dimensionText;
    ctx.font = canvasFont(fontSize, 600);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(isolateNumbers(`${STUDIO.width} m`), metrics.left + (STUDIO.width * metrics.scale) / 2, metrics.top + STUDIO.depth * metrics.scale + offset);
    ctx.save();
    ctx.translate(metrics.left - offset, metrics.top + (STUDIO.depth * metrics.scale) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(isolateNumbers(`${STUDIO.depth} m`), 0, 0);
    ctx.restore();
    ctx.restore();
  }

  function getPlanBeamConfig(item) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    if (kind === "camera") return { lengthMeters: 2.7, widthMeters: 0.55, color: "rgba(116, 180, 255, 0.14)" };
    if (kind === "softbox-octa" || kind === "softbox-rect" || kind === "softbox-parabolic") return { lengthMeters: 2.45, widthMeters: 0.82, color: "rgba(255, 232, 184, 0.18)" };
    if (kind === "striplight") return { lengthMeters: 2.6, widthMeters: 0.48, color: "rgba(255, 232, 184, 0.16)" };
    if (kind === "tube") return { lengthMeters: 2.2, widthMeters: 0.3, color: "rgba(179, 228, 255, 0.14)" };
    if (kind === "led-panel" || kind === "ringlight") return { lengthMeters: 2.2, widthMeters: 0.6, color: "rgba(255, 236, 198, 0.15)" };
    if (kind === "umbrella" || kind === "lantern") return { lengthMeters: 2.4, widthMeters: 0.92, color: "rgba(255, 237, 206, 0.15)" };
    if (kind === "beauty-dish" || kind === "spot-head") return { lengthMeters: 2.8, widthMeters: 0.38, color: "rgba(255, 225, 157, 0.18)" };
    if (kind === "spot-projector") return { lengthMeters: 3.1, widthMeters: 0.22, color: "rgba(255, 219, 140, 0.22)" };
    return null;
  }


  // Elements du plan : faisceaux lumineux au sol, puis modeles 3D vus de dessus.
  function drawPlanItems(ctx, metrics) {
    state.items.forEach(function (item) {
      const beam = getPlanBeamConfig(item);
      if (beam) drawPlanBeam(ctx, item, metrics, beam.lengthMeters, beam.widthMeters, beam.color);
    });
    const view = StudioModels.planView(function (p) {
      return [metrics.left + p[0] * metrics.scale, metrics.top + p[1] * metrics.scale];
    }, Math.max(0.6, (metrics.px || 1) * 0.8));
    StudioModels.render(ctx, getItemModelInstances(state.items), view);
  }


  // ---------------------------------------------------------------------------
  // Etiquettes du plan : elles sont mises en file pendant le rendu, puis placees
  // a la fin pour eviter les objets, la poignee de rotation et les autres etiquettes.
  // ---------------------------------------------------------------------------
  function getCanvasFontFamily() {
    if (!getCanvasFontFamily.cached) {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--font-base").trim();
      getCanvasFontFamily.cached = value || "Inter, system-ui, sans-serif";
    }
    return getCanvasFontFamily.cached;
  }

  const CANVAS_THEME_DEFAULTS = {
    labelBg: "rgba(8, 12, 18, 0.88)",
    labelBgSelected: "rgba(8, 12, 18, 0.96)",
    labelBorder: "rgba(255, 255, 255, 0.14)",
    labelBorderSelected: "rgba(140, 220, 255, 0.55)",
    labelText: "rgba(247, 241, 235, 0.98)",
    leader: "rgba(8, 12, 18, 0.55)",
    dimensionText: "rgba(238, 245, 255, 0.82)",
    measureLine: "rgba(143, 208, 255, 0.62)",
    measureBorder: "rgba(143, 208, 255, 0.4)",
    measureBg: "rgba(9, 16, 28, 0.9)",
    measureText: "rgba(240, 248, 255, 0.96)",
    measureModeLine: "rgba(255, 190, 114, 0.72)",
    measureModeBorder: "rgba(255, 190, 114, 0.35)",
    manualLine: "rgba(251, 191, 36, 0.92)",
    manualPoint: "#fbbf24",
    manualBorder: "rgba(251, 191, 36, 0.45)",
    manualText: "#fff7e0",
    selection: "rgba(116, 180, 255, 0.95)",
    handle: "#ffb561",
    handleHover: "#ffd49a"
  };

  // Couleurs d'interface du canvas, definies en variables CSS (--canvas-*) dans
  // css/simple-studio.css ; les valeurs ci-dessus servent de secours.
  function getCanvasTheme() {
    if (getCanvasTheme.cached) return getCanvasTheme.cached;
    const styles = getComputedStyle(document.documentElement);
    const theme = {};
    Object.keys(CANVAS_THEME_DEFAULTS).forEach(function (key) {
      const cssName = "--canvas-" + key.replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); });
      theme[key] = styles.getPropertyValue(cssName).trim() || CANVAS_THEME_DEFAULTS[key];
    });
    getCanvasTheme.cached = theme;
    return theme;
  }

  function canvasFont(sizePx, weight) {
    return `${weight || 500} ${Math.round(sizePx)}px ${getCanvasFontFamily()}`;
  }

  // Isole chaque valeur chiffree (1.66 m, 58 x 58 cm, f/5.9, 72%) dans un bloc
  // gauche-a-droite, pour qu'elle reste lisible dans une phrase en arabe.

  function isolateNumbers(text) {
    if (state.language !== "ar") return String(text);
    return String(text).replace(NUMERIC_TOKEN, function (match) {
      return "\u2066" + match + "\u2069";
    });
  }

  function getPlanLabelFontSize(metrics) {
    return Math.max(11 * metrics.unit, 12 * (metrics.px || 1));
  }

  function measurePlanLabel(ctx, text, metrics, weight) {
    const fontSize = getPlanLabelFontSize(metrics);
    ctx.save();
    ctx.font = canvasFont(fontSize, weight);
    const textWidth = ctx.measureText(isolateNumbers(text)).width;
    ctx.restore();
    return {
      width: textWidth + fontSize * 1.7,
      height: Math.round(fontSize * 1.85),
      fontSize: fontSize
    };
  }

  function queuePlanItemLabels(metrics) {
    const selectedId = state.selectedId;
    const ordered = state.items.slice().sort(function (a, b) {
      return (b.id === selectedId) - (a.id === selectedId);
    });
    ordered.forEach(function (item) {
      planLabelQueue.push({
        kind: "item",
        itemId: item.id,
        text: getLocalizedItemLabel(item),
        anchor: studioToPlan(item.x, item.y, metrics),
        radius: Math.max(item.width, item.depth) * metrics.scale * 0.5,
        selected: item.id === selectedId
      });
    });
  }

  function queueMeasureLabel(text, from, to, labelT, palette) {
    planLabelQueue.push({
      kind: "measure",
      text: text,
      from: from,
      to: to,
      labelT: typeof labelT === "number" ? labelT : 0.5,
      palette: palette
    });
  }

  function rectOverlapArea(a, b) {
    const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return w > 0 && h > 0 ? w * h : 0;
  }

  function getPlanLabelObstacles(metrics) {
    const obstacles = state.items.map(function (item) {
      const center = studioToPlan(item.x, item.y, metrics);
      const half = Math.max(item.width, item.depth) * metrics.scale * 0.5;
      return { itemId: item.id, x: center.x - half, y: center.y - half, w: half * 2, h: half * 2 };
    });
    const selected = getSelectedItem();
    if (selected) {
      const handlePoint = getRotateHandle(selected);
      const handle = studioToPlan(handlePoint.x, handlePoint.y, metrics);
      const r = 12 * metrics.unit;
      obstacles.push({ x: handle.x - r, y: handle.y - r, w: r * 2, h: r * 2, weight: 4 });
    }
    return obstacles;
  }

  function getItemLabelCandidates(entry, size) {
    const gap = 6 * (size.fontSize / 12);
    const r = Math.max(entry.radius, 8);
    const a = entry.anchor;
    const out = [];
    [1, 1.9].forEach(function (ring) {
      const dy = r * ring + size.height / 2 + gap;
      const dx = r * ring + size.width / 2 + gap;
      out.push(
        { x: a.x, y: a.y - dy },
        { x: a.x, y: a.y + dy },
        { x: a.x + dx, y: a.y },
        { x: a.x - dx, y: a.y },
        { x: a.x + dx * 0.8, y: a.y - dy * 0.8 },
        { x: a.x - dx * 0.8, y: a.y - dy * 0.8 },
        { x: a.x + dx * 0.8, y: a.y + dy * 0.8 },
        { x: a.x - dx * 0.8, y: a.y + dy * 0.8 }
      );
    });
    return out;
  }

  function getMeasureLabelCandidates(entry, size) {
    const out = [];
    const dx = entry.to.x - entry.from.x;
    const dy = entry.to.y - entry.from.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const shift = size.height * 0.9;
    [entry.labelT, 0.35, 0.65, 0.25, 0.75].forEach(function (t) {
      const x = entry.from.x + dx * t;
      const y = entry.from.y + dy * t;
      out.push(
        { x: x, y: y },
        { x: x + nx * shift, y: y + ny * shift },
        { x: x - nx * shift, y: y - ny * shift }
      );
    });
    return out;
  }

  function flushPlanLabels(ctx, metrics) {
    const queue = planLabelQueue;
    planLabelQueue = [];
    if (!queue.length) return;

    const bounds = {
      left: metrics.left + 6 * metrics.unit,
      top: metrics.top + 6 * metrics.unit,
      right: metrics.left + metrics.stageWidth - 6 * metrics.unit,
      bottom: metrics.top + metrics.stageHeight - 6 * metrics.unit
    };
    const obstacles = getPlanLabelObstacles(metrics);
    const placed = [];
    const ordered = queue.filter(function (entry) { return entry.kind === "measure"; })
      .concat(queue.filter(function (entry) { return entry.kind !== "measure"; }));

    ordered.forEach(function (entry) {
      const weight = entry.kind === "item" && entry.selected ? 650 : 550;
      const size = measurePlanLabel(ctx, entry.text, metrics, weight);
      const candidates = entry.kind === "measure"
        ? getMeasureLabelCandidates(entry, size)
        : getItemLabelCandidates(entry, size);
      let best = null;

      candidates.forEach(function (candidate, index) {
        const x = clamp(candidate.x - size.width / 2, bounds.left, Math.max(bounds.left, bounds.right - size.width));
        const y = clamp(candidate.y - size.height / 2, bounds.top, Math.max(bounds.top, bounds.bottom - size.height));
        const rect = { x: x, y: y, w: size.width, h: size.height };
        // Petite penalite par rang : a recouvrement egal, on garde la position la plus naturelle.
        let score = index * 0.5;
        placed.forEach(function (other) {
          score += rectOverlapArea(rect, other) * 6;
        });
        obstacles.forEach(function (obstacle) {
          if (obstacle.itemId && obstacle.itemId === entry.itemId) return;
          score += rectOverlapArea(rect, obstacle) * (obstacle.weight || 1);
        });
        if (!best || score < best.score) best = { rect: rect, score: score, index: index };
      });

      placed.push(best.rect);
      drawPlanLabel(ctx, entry, best.rect, size, weight, metrics, entry.kind === "item" && best.index >= 8);
    });
  }

  function drawPlanLabel(ctx, entry, rect, size, weight, metrics, needsLeader) {
    const theme = getCanvasTheme();
    const palette = entry.kind === "measure"
      ? Object.assign({
        fill: theme.measureBg,
        border: theme.measureBorder,
        text: theme.measureText
      }, entry.palette || {})
      : {
        fill: entry.selected ? theme.labelBgSelected : theme.labelBg,
        border: entry.selected ? theme.labelBorderSelected : theme.labelBorder,
        text: theme.labelText
      };
    const lineWidth = Math.max(1, 1.2 * metrics.unit);

    ctx.save();
    if (needsLeader && entry.anchor) {
      // Etiquette eloignee de son objet : trait de rappel.
      ctx.strokeStyle = theme.leader;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(entry.anchor.x, entry.anchor.y);
      ctx.lineTo(clamp(entry.anchor.x, rect.x, rect.x + rect.w), clamp(entry.anchor.y, rect.y, rect.y + rect.h));
      ctx.stroke();
    }
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, rect.h / 2);
    ctx.fillStyle = palette.fill;
    ctx.fill();
    ctx.strokeStyle = palette.border;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.font = canvasFont(size.fontSize, weight);
    ctx.fillStyle = palette.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(isolateNumbers(entry.text), rect.x + rect.w / 2, rect.y + rect.h / 2 + size.fontSize * 0.06);
    ctx.restore();
  }

  function getSelectedMeasurementGuides(item) {
    const guides = [];

    if (item.family === "subject") {
      guides.push({
        from: { x: item.x, y: item.y },
        to: { x: item.x, y: getBackdropMeasureY(item) },
        label: formatDistanceLabel(getBackdropDistance(item))
      });

      const camera = getNearestItemByFamily(item, "camera");
      if (camera) {
        guides.push({
          from: { x: item.x, y: item.y },
          to: { x: camera.x, y: camera.y },
          label: formatDistanceLabel(distanceBetweenItems(item, camera))
        });
      }

      const mainLight = getNearestEmitter(item);
      if (mainLight) {
        const estimate = getLightEstimation(mainLight, item);
        guides.push({
          from: { x: item.x, y: item.y },
          to: { x: mainLight.x, y: mainLight.y },
          label: `${getUiCopy("guideMainLight")} ${formatDistanceLabel(estimate.distance)} · ${formatFStopLabel(estimate.fStop)}`
        });
      }

      return guides;
    }

    const subject = getNearestItemByFamily(item, "subject");
    if (!subject) return guides;

    let label = formatDistanceLabel(distanceBetweenItems(item, subject));
    if (isLightEmitter(item)) {
      const estimate = getLightEstimation(item, subject);
      label = `${formatDistanceLabel(estimate.distance)} · ${formatAngleLabel(estimate.angle)} · ${formatFStopLabel(estimate.fStop)}`;
    }

    guides.push({
      from: { x: item.x, y: item.y },
      to: { x: subject.x, y: subject.y },
      label: label
    });

    return guides;
  }

  function getMeasurementModeSubject() {
    const selected = getSelectedItem();
    if (selected && selected.family === "subject") return selected;

    const subjects = state.items.filter(function (item) {
      return item.family === "subject";
    });
    if (!subjects.length) return null;
    if (!selected) return subjects[0];

    return subjects.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(selected, item) < distanceBetweenItems(selected, closest) ? item : closest;
    }, null);
  }

  function getMeasurementModeGuides() {
    const subject = getMeasurementModeSubject();
    if (!subject) {
      const selected = getSelectedItem();
      return selected ? getSelectedMeasurementGuides(selected) : [];
    }

    const guides = [{
      from: { x: subject.x, y: subject.y },
      to: { x: subject.x, y: getBackdropMeasureY(subject) },
      label: `${getUiCopy("metricBackdropDistance")} · ${formatDistanceLabel(getBackdropDistance(subject))}`,
      distance: getBackdropDistance(subject),
      labelT: 0.38
    }];

    state.items.forEach(function (item) {
      if (item.id === subject.id) return;
      const distance = distanceBetweenItems(subject, item);
      guides.push({
        from: { x: subject.x, y: subject.y },
        to: { x: item.x, y: item.y },
        label: `${getLocalizedItemLabel(item)} · ${formatDistanceLabel(distance)}`,
        distance: distance,
        labelT: 0.72
      });
    });

    return guides.sort(function (a, b) {
      return (b.distance || 0) - (a.distance || 0);
    });
  }

  function drawMeasurementGuides(ctx, guides, metrics, palette) {
    if (!guides.length) return;

    const theme = getCanvasTheme();
    const colors = Object.assign({
      stroke: theme.measureLine,
      border: theme.measureBorder,
      fill: theme.measureBg,
      text: theme.measureText
    }, palette || {});

    ctx.save();
    ctx.setLineDash([10 * metrics.unit, 8 * metrics.unit]);
    ctx.lineWidth = 2 * metrics.unit;
    ctx.strokeStyle = colors.stroke;

    guides.forEach(function (guide) {
      const from = studioToPlan(guide.from.x, guide.from.y, metrics);
      const to = studioToPlan(guide.to.x, guide.to.y, metrics);
      const labelT = typeof guide.labelT === "number" ? guide.labelT : 0.5;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      queueMeasureLabel(guide.label, from, to, labelT, {
        fill: colors.fill,
        border: colors.border,
        text: colors.text
      });
    });

    ctx.restore();
  }

  function drawSelectedMeasurementGuides(ctx, item, metrics) {
    drawMeasurementGuides(ctx, getSelectedMeasurementGuides(item), metrics);
  }

  function drawManualMeasurement(ctx, metrics) {
    if (!state.measureStart) return;
    const endPoint = state.measureEnd || state.measurePreview;
    if (!endPoint) return;

    const start = studioToPlan(state.measureStart.x, state.measureStart.y, metrics);
    const end = studioToPlan(endPoint.x, endPoint.y, metrics);
    const distance = formatDistanceLabel(distanceBetweenItems(state.measureStart, endPoint));
    const labelParts = [];

    if (state.measureStart.label) labelParts.push(state.measureStart.label);
    if (endPoint.label) labelParts.push(endPoint.label);

    const label = labelParts.length ? `${labelParts.join(" <-> ")} · ${distance}` : distance;

    const theme = getCanvasTheme();
    ctx.save();
    ctx.strokeStyle = theme.manualLine;
    ctx.setLineDash([12 * metrics.unit, 8 * metrics.unit]);
    ctx.lineWidth = 2.2 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.setLineDash([]);

    [start, end].forEach(function (point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5 * metrics.unit, 0, Math.PI * 2);
      ctx.fillStyle = theme.manualPoint;
      ctx.fill();
      ctx.strokeStyle = "rgba(12, 20, 34, 0.88)";
      ctx.lineWidth = 1.6 * metrics.unit;
      ctx.stroke();
    });

    queueMeasureLabel(label, start, end, 0.5, {
      fill: theme.measureBg,
      border: theme.manualBorder,
      text: theme.manualText
    });
    ctx.restore();
  }

  function drawSelectionOutline(ctx, item, metrics) {
    const center = studioToPlan(item.x, item.y, metrics);
    const width = item.width * metrics.scale;
    const depth = item.depth * metrics.scale;
    const handle = studioToPlan(getRotateHandle(item).x, getRotateHandle(item).y, metrics);

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(degreesToRadians(item.rotation));
    const theme = getCanvasTheme();
    ctx.strokeStyle = theme.selection;
    ctx.lineWidth = 3 * metrics.unit;
    if (item.shape === "circle" || item.shape === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.7, depth * 0.7, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      roundRect(ctx, -width / 2 - 8 * metrics.unit, -depth / 2 - 8 * metrics.unit, width + 16 * metrics.unit, depth + 16 * metrics.unit, 18 * metrics.unit);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = theme.handle;
    ctx.lineWidth = 2.6 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(handle.x, handle.y);
    ctx.stroke();
    ctx.fillStyle = state.hoverHandle ? theme.handleHover : theme.handle;
    ctx.beginPath();
    ctx.arc(handle.x, handle.y, 8 * metrics.unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2 * metrics.unit;
    ctx.strokeStyle = "rgba(17, 20, 27, 0.8)";
    ctx.stroke();
    ctx.restore();
  }





  function drawPlanBeam(ctx, item, metrics, lengthMeters, widthMeters, color) {
    const center = studioToPlan(item.x, item.y, metrics);
    const angle = degreesToRadians(item.rotation);
    const length = lengthMeters * metrics.scale;
    const halfSpread = widthMeters * metrics.scale;
    const forwardX = Math.cos(angle);
    const forwardY = Math.sin(angle);
    const sideX = -Math.sin(angle);
    const sideY = Math.cos(angle);

    const tipX = center.x + forwardX * length;
    const tipY = center.y + forwardY * length;
    const leftX = center.x + sideX * halfSpread;
    const leftY = center.y + sideY * halfSpread;
    const rightX = center.x - sideX * halfSpread;
    const rightY = center.y - sideY * halfSpread;

    const beamColor = isLightEmitter(item) ? scaleColorAlpha(color, 0.55 + (clampPowerPercent(item.power) / 100) * 0.9) : color;
    const gradient = ctx.createLinearGradient(center.x, center.y, tipX, tipY);
    gradient.addColorStop(0, beamColor);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(tipX + sideX * halfSpread * 0.9, tipY + sideY * halfSpread * 0.34);
    ctx.lineTo(tipX - sideX * halfSpread * 0.9, tipY - sideY * halfSpread * 0.34);
    ctx.closePath();
    ctx.fill();
  }



  function drawIsoView(targetCtx, width, height) {
    const ctx = targetCtx || isoCtx;
    const canvasWidth = width || refs.isoCanvas.width;
    const canvasHeight = height || refs.isoCanvas.height;
    const metrics = getIsoMetrics(canvasWidth, canvasHeight);
    const floor = getFloorColor();
    const backdrop = getBackdropColor();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const bg = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bg.addColorStop(0, "rgba(255,255,255,0.08)");
    bg.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawIsoStudio(ctx, metrics, floor.color, backdrop.color);
    state.items.forEach(function (item) {
      drawIsoLightSpread(ctx, item, metrics);
    });

    const view = StudioModels.isoView(function (p) {
      const q = isoProject(p[0], p[1], p[2], metrics);
      return [q.x, q.y];
    }, Math.max(0.6, getCanvasPixelRatio(refs.isoCanvas, canvasWidth, canvasHeight) * 0.8));
    StudioModels.render(ctx, getItemModelInstances(state.items), view);
  }

  function drawIsoStudio(ctx, metrics, floorColor, backdropColor) {
    const a = isoProject(0, STUDIO.depth, 0, metrics);
    const b = isoProject(STUDIO.width, STUDIO.depth, 0, metrics);
    const c = isoProject(STUDIO.width, 0, 0, metrics);
    const d = isoProject(0, 0, 0, metrics);

    const floorGradient = ctx.createLinearGradient(0, d.y, 0, a.y);
    floorGradient.addColorStop(0, lightenHex(floorColor, 0.18));
    floorGradient.addColorStop(1, darkenHex(floorColor, 0.2));
    ctx.fillStyle = floorGradient;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1.2 * metrics.unit;
    for (let x = 0.5; x < STUDIO.width; x += 0.5) {
      const front = isoProject(x, STUDIO.depth, 0, metrics);
      const back = isoProject(x, 0, 0, metrics);
      ctx.beginPath();
      ctx.moveTo(front.x, front.y);
      ctx.lineTo(back.x, back.y);
      ctx.stroke();
    }
    for (let y = 0.5; y < STUDIO.depth; y += 0.5) {
      const left = isoProject(0, y, 0, metrics);
      const right = isoProject(STUDIO.width, y, 0, metrics);
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();
    }

    const wallBL = isoProject(0, 0, 0, metrics);
    const wallBR = isoProject(STUDIO.width, 0, 0, metrics);
    const wallTR = isoProject(STUDIO.width, 0, STUDIO.backdropHeight, metrics);
    const wallTL = isoProject(0, 0, STUDIO.backdropHeight, metrics);
    const wallGradient = ctx.createLinearGradient(0, wallTL.y, 0, wallBL.y);
    wallGradient.addColorStop(0, lightenHex(backdropColor, 0.12));
    wallGradient.addColorStop(1, darkenHex(backdropColor, 0.08));
    ctx.fillStyle = wallGradient;
    ctx.beginPath();
    ctx.moveTo(wallBL.x, wallBL.y);
    ctx.lineTo(wallBR.x, wallBR.y);
    ctx.lineTo(wallTR.x, wallTR.y);
    ctx.lineTo(wallTL.x, wallTL.y);
    ctx.closePath();
    ctx.fill();

    const sweepLeft = isoProject(0, STUDIO.backdropDepth, 0, metrics);
    const sweepRight = isoProject(STUDIO.width, STUDIO.backdropDepth, 0, metrics);
    ctx.fillStyle = rgbaFromHex(lightenHex(backdropColor, 0.08), 0.82);
    ctx.beginPath();
    ctx.moveTo(wallBL.x, wallBL.y);
    ctx.lineTo(wallBR.x, wallBR.y);
    ctx.lineTo(sweepRight.x, sweepRight.y);
    ctx.lineTo(sweepLeft.x, sweepLeft.y);
    ctx.closePath();
    ctx.fill();
  }

  function withAlpha(color, alpha) {
    const match = String(color || "").match(/^rgba\(([^)]+),\s*[\d.]+\)$/);
    if (!match) return color;
    return `rgba(${match[1]}, ${alpha})`;
  }

  function scaleColorAlpha(color, factor) {
    const match = String(color || "").match(/^rgba\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([\d.]+)\s*\)$/);
    if (!match) return color;
    const alpha = clamp(parseFloat(match[4]) * factor, 0, 1);
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha.toFixed(3)})`;
  }

  function drawIsoLightSpread(ctx, item, metrics) {
    const beam = getPlanBeamConfig(item);
    if (!beam) return;

    const radians = degreesToRadians(item.rotation);
    const beamLength = beam.lengthMeters * (item.family === "camera" ? 0.9 : 1);
    const beamWidth = beam.widthMeters * 0.7;
    const startX = clamp(item.x + Math.cos(radians) * 0.18, 0, STUDIO.width);
    const startY = clamp(item.y + Math.sin(radians) * 0.18, 0, STUDIO.depth);
    const endX = clamp(item.x + Math.cos(radians) * beamLength, 0, STUDIO.width);
    const endY = clamp(item.y + Math.sin(radians) * beamLength, 0, STUDIO.depth);
    const perpX = -Math.sin(radians);
    const perpY = Math.cos(radians);
    const start = isoProject(startX, startY, 0, metrics);
    const endCenter = isoProject(endX, endY, 0, metrics);
    const endLeft = isoProject(clamp(endX + perpX * beamWidth, 0, STUDIO.width), clamp(endY + perpY * beamWidth, 0, STUDIO.depth), 0, metrics);
    const endRight = isoProject(clamp(endX - perpX * beamWidth, 0, STUDIO.width), clamp(endY - perpY * beamWidth, 0, STUDIO.depth), 0, metrics);

    const powerFactor = isLightEmitter(item) ? 0.55 + (clampPowerPercent(item.power) / 100) * 0.9 : 1;
    const fill = ctx.createLinearGradient(start.x, start.y, endCenter.x, endCenter.y);
    fill.addColorStop(0, item.family === "camera" ? withAlpha(beam.color, 0.1) : scaleColorAlpha(beam.color, powerFactor));
    fill.addColorStop(1, withAlpha(beam.color, 0.02));
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(endLeft.x, endLeft.y);
    ctx.lineTo(endRight.x, endRight.y);
    ctx.closePath();
    ctx.fill();
  }






















  async function copyImage() {
    try {
      const canvas = createStudioSnapshotCanvas(1800, 1180);
      if (!navigator.clipboard || typeof window.ClipboardItem === "undefined") {
        window.alert(t("alerts.clipboardUnsupported"));
        return;
      }

      const blob = await new Promise(function (resolve) {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        window.alert(t("alerts.imageFailed"));
        return;
      }

      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    } catch (error) {
      window.alert(t("alerts.clipboardDenied"));
    }
  }

  function exportPng() {
    const canvas = createStudioSnapshotCanvas(1800, 1180);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `lite-studio-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();
  }

  function exportPdf() {
    try {
      const canvas = createStudioSnapshotCanvas(1800, 1180);
      const bytes = buildPdfFromCanvas(canvas);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lite-studio-${new Date().toISOString().slice(0, 10)}.pdf`;
      link.click();
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1200);
    } catch (error) {
      window.alert(getUiCopy("pdfFailed"));
    }
  }

  function printPlan() {
    window.print();
  }

  function drawStageView(viewId, ctx, width, height, options) {
    if (viewId === "iso") {
      drawIsoView(ctx, width, height);
      return;
    }
    drawPlanView(ctx, width, height, options);
  }

  function createStudioSnapshotCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const mainView = state.primaryView === "iso" ? "iso" : "plan";
    const secondaryView = getSecondaryView();

    // Mise en page de l'export : vue principale a gauche, vignette dans une colonne
    // a droite, pour qu'elle ne recouvre jamais le plan.
    const gap = Math.round(width * 0.02);
    const columnWidth = Math.round(width * 0.26);
    const mainWidth = width - columnWidth - gap;
    const mainCanvas = document.createElement("canvas");
    mainCanvas.width = mainWidth;
    mainCanvas.height = height;
    drawStageView(mainView, mainCanvas.getContext("2d"), mainWidth, height, { compact: false });
    ctx.drawImage(mainCanvas, 0, 0);

    const padding = Math.round(width * 0.012);
    const radius = Math.round(width * 0.012);
    const insetWidth = columnWidth - gap - padding * 2;
    const insetHeight = Math.round(insetWidth * 0.7);
    const insetCanvas = document.createElement("canvas");
    insetCanvas.width = insetWidth;
    insetCanvas.height = insetHeight;
    drawStageView(secondaryView, insetCanvas.getContext("2d"), insetWidth, insetHeight, { compact: true });

    const cardX = mainWidth + gap + padding;
    const cardY = Math.round(height * 0.08);

    ctx.save();
    ctx.fillStyle = "rgba(9, 16, 28, 0.88)";
    roundRect(ctx, cardX - padding, cardY - padding, insetWidth + padding * 2, insetHeight + padding * 2, radius);
    ctx.fill();
    ctx.drawImage(insetCanvas, cardX, cardY);
    ctx.restore();

    return canvas;
  }


  function buildPdfFromCanvas(canvas) {
    const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);
    return buildPdfFromJpegDataUrl(jpegDataUrl, canvas.width, canvas.height);
  }

  function buildPdfFromJpegDataUrl(dataUrl, imageWidth, imageHeight) {
    const binary = atob(String(dataUrl).split(",")[1] || "");
    const imageBytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      imageBytes[index] = binary.charCodeAt(index);
    }

    const landscape = imageWidth >= imageHeight;
    const pageWidth = landscape ? 841.89 : 595.28;
    const pageHeight = landscape ? 595.28 : 841.89;
    const margin = 24;
    const scale = Math.min((pageWidth - margin * 2) / imageWidth, (pageHeight - margin * 2) / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const drawX = (pageWidth - drawWidth) / 2;
    const drawY = (pageHeight - drawHeight) / 2;
    const content = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n/Im0 Do\nQ\n`;

    const encoder = new TextEncoder();
    const parts = [];
    const offsets = [0];
    let totalLength = 0;

    function pushAscii(value) {
      const bytes = encoder.encode(value);
      parts.push(bytes);
      totalLength += bytes.length;
    }

    function pushBytes(bytes) {
      parts.push(bytes);
      totalLength += bytes.length;
    }

    function addObject(objectId, dictionary, streamBytes) {
      offsets[objectId] = totalLength;
      pushAscii(`${objectId} 0 obj\n${dictionary}`);
      if (streamBytes) {
        pushAscii("stream\n");
        pushBytes(streamBytes);
        pushAscii("\nendstream\n");
      }
      pushAscii("endobj\n");
    }

    pushAscii("%PDF-1.4\n");
    addObject(1, "<< /Type /Catalog /Pages 2 0 R >>\n", null);
    addObject(2, "<< /Type /Pages /Count 1 /Kids [3 0 R] >>\n", null);
    addObject(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /ProcSet [/PDF /ImageC] /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\n`, null);
    addObject(4, `<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\n`, imageBytes);
    addObject(5, `<< /Length ${encoder.encode(content).length} >>\n`, encoder.encode(content));

    const xrefOffset = totalLength;
    pushAscii("xref\n0 6\n0000000000 65535 f \n");
    for (let objectId = 1; objectId <= 5; objectId += 1) {
      pushAscii(`${String(offsets[objectId]).padStart(10, "0")} 00000 n \n`);
    }
    pushAscii(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

    const output = new Uint8Array(totalLength);
    let cursor = 0;
    parts.forEach(function (part) {
      output.set(part, cursor);
      cursor += part.length;
    });
    return output;
  }


  function resizeCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  // Zone du canvas plan non couverte par la vignette secondaire (en pixels canvas).
  // Calculee a chaque rendu ; ignoree pour les exports qui ont leur propre taille.
  // Renvoie true si l'etat replie/deplie de la vignette a change.
  function updatePlanRegion() {
    const wasCollapsed = state.insetCollapsed;
    state.planRegion = null;
    const region = computePlanRegionAvoidingInset();

    if (state.primaryView === "iso") {
      state.insetCollapsed = state.insetPreference === true;
    } else if (state.insetPreference === null) {
      // Automatique : on replie la vignette si elle ne peut pas etre evitee sans trop reduire le plan.
      state.insetCollapsed = !region;
    } else {
      state.insetCollapsed = state.insetPreference;
    }

    if (region && !state.insetCollapsed && state.primaryView !== "iso") {
      state.planRegion = region;
    }
    return wasCollapsed !== state.insetCollapsed;
  }

  function computePlanRegionAvoidingInset() {
    const canvas = refs.planCanvas;
    const pane = refs.isoViewPane;
    if (!canvas || !pane || state.primaryView === "iso") return null;

    const canvasRect = canvas.getBoundingClientRect();
    const paneRect = pane.getBoundingClientRect();
    if (!canvasRect.width || !canvasRect.height || !paneRect.width) return null;

    const ratio = canvas.width / canvasRect.width;
    const gap = 12;
    const W = canvasRect.width;
    const H = canvasRect.height;
    const left = paneRect.left - canvasRect.left;
    const right = paneRect.right - canvasRect.left;
    const top = paneRect.top - canvasRect.top;
    const bottom = paneRect.bottom - canvasRect.top;
    const candidates = [
      { x: 0, y: 0, w: left - gap, h: H },
      { x: right + gap, y: 0, w: W - right - gap, h: H },
      { x: 0, y: 0, w: W, h: top - gap },
      { x: 0, y: bottom + gap, w: W, h: H - bottom - gap }
    ].filter(function (region) {
      return region.w > 80 && region.h > 80;
    });
    if (!candidates.length) return null;

    function fitScale(region) {
      const padding = Math.max(36, Math.min(region.w, region.h) * 0.06);
      return Math.min((region.w - padding * 2) / STUDIO.width, (region.h - padding * 2) / STUDIO.depth);
    }

    let best = candidates[0];
    candidates.forEach(function (region) {
      if (fitScale(region) > fitScale(best)) best = region;
    });

    // Eviter la vignette ne doit pas reduire le plan de plus de 30 %.
    if (fitScale(best) < fitScale({ w: W, h: H }) * 0.7) return null;

    return {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      x: best.x * ratio,
      y: best.y * ratio,
      w: best.w * ratio,
      h: best.h * ratio
    };
  }


  function getPlanRegion(width, height) {
    const region = state.planRegion;
    if (region && region.canvasWidth === width && region.canvasHeight === height) {
      return region;
    }
    return { x: 0, y: 0, w: width, h: height };
  }

  function getPlanBaseMetrics(width, height) {
    const region = getPlanRegion(width, height);
    // Marge minimale de 36 px ecran pour loger les cotes (6 m / 8 m) autour du plateau.
    const minPadding = 36 * getCanvasPixelRatio(refs.planCanvas, width, height);
    const padding = Math.max(minPadding, Math.min(region.w, region.h) * (region.w === width && region.h === height ? 0.075 : 0.06));
    const scale = Math.min((region.w - padding * 2) / STUDIO.width, (region.h - padding * 2) / STUDIO.depth);
    return {
      padding: padding,
      scale: scale,
      region: region,
      centerX: region.x + region.w / 2,
      centerY: region.y + region.h / 2,
      stageWidth: STUDIO.width * scale,
      stageHeight: STUDIO.depth * scale
    };
  }

  function getClampedPlanPan(width, height, zoom, panX, panY) {
    const base = getPlanBaseMetrics(width, height);
    const stageWidth = base.stageWidth * zoom;
    const stageHeight = base.stageHeight * zoom;
    const maxPanX = Math.max(0, (stageWidth - (base.region.w - base.padding * 2)) / 2);
    const maxPanY = Math.max(0, (stageHeight - (base.region.h - base.padding * 2)) / 2);
    return {
      x: clamp(panX, -maxPanX, maxPanX),
      y: clamp(panY, -maxPanY, maxPanY)
    };
  }

  function getPlanMetrics(width, height) {
    const base = getPlanBaseMetrics(width, height);
    const scale = base.scale * state.planZoom;
    const stageWidth = STUDIO.width * scale;
    const stageHeight = STUDIO.depth * scale;
    const pan = getClampedPlanPan(width, height, state.planZoom, state.planPanX, state.planPanY);
    return {
      left: base.centerX + pan.x - stageWidth / 2,
      top: base.centerY + pan.y - stageHeight / 2,
      scale: scale,
      padding: base.padding,
      panX: pan.x,
      panY: pan.y,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      px: getCanvasPixelRatio(refs.planCanvas, width, height),
      unit: Math.max(0.8, scale / 118)
    };
  }

  // Rapport pixels canvas / pixels CSS : le devicePixelRatio a l'ecran,
  // une valeur proportionnelle a la largeur pour les exports hors ecran.
  function getCanvasPixelRatio(canvas, width, height) {
    if (canvas && canvas.width === width && canvas.height === height && canvas.clientWidth) {
      return width / canvas.clientWidth;
    }
    return Math.max(1, width / 1400);
  }

  function getIsoMetrics(width, height) {
    // Emprise projetee du plateau : 14 m de large (8 + 6), et en hauteur
    // 3,36 m sous l'origine (sol avant) + 6,02 m au-dessus (haut du fond).
    const isoBelow = (STUDIO.width + STUDIO.depth) / 2 * 0.48;
    const isoAbove = (STUDIO.width + STUDIO.depth) / 2 * 0.48 + STUDIO.backdropHeight * 0.95;
    const fit = Math.min((width * 0.9) / (STUDIO.width + STUDIO.depth), (height * 0.86) / (isoBelow + isoAbove));
    const scale = fit * state.isoZoom;
    return {
      originX: width / 2,
      originY: height / 2 + ((isoAbove - isoBelow) / 2) * scale,
      scaleX: scale,
      scaleY: scale * 0.48,
      scaleZ: scale * 0.95,
      unit: Math.max(0.75, scale / 24)
    };
  }


  function studioToPlan(x, y, metrics) {
    return {
      x: metrics.left + x * metrics.scale,
      y: metrics.top + y * metrics.scale
    };
  }

  function planToStudio(x, y, metrics) {
    return {
      x: (x - metrics.left) / metrics.scale,
      y: (y - metrics.top) / metrics.scale
    };
  }

  function isoProject(x, y, z, metrics) {
    const centeredX = x - STUDIO.width / 2;
    const centeredY = y - STUDIO.depth / 2;
    return {
      x: metrics.originX + (centeredX - centeredY) * metrics.scaleX,
      y: metrics.originY + (centeredX + centeredY) * metrics.scaleY - z * metrics.scaleZ
    };
  }


  function getFloorColor() {
    return FLOOR_COLORS.find(function (entry) {
      return entry.id === state.floorId;
    }) || FLOOR_COLORS[0];
  }

  function getBackdropColor() {
    return BACKDROP_COLORS.find(function (entry) {
      return entry.id === state.backdropId;
    }) || BACKDROP_COLORS[0];
  }


  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  function radiansToDegrees(rad) {
    return (rad * 180) / Math.PI;
  }

  function normalizeDegrees(deg) {
    const value = deg % 360;
    return value < 0 ? value + 360 : value;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function roundTopRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.lineTo(x + width - r, y);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
  }

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map(function (char) { return char + char; }).join("") : clean;
    const int = parseInt(full, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  }

  function mixHex(hexA, hexB, ratio) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    return rgbToHex(
      Math.round(a.r + (b.r - a.r) * ratio),
      Math.round(a.g + (b.g - a.g) * ratio),
      Math.round(a.b + (b.b - a.b) * ratio)
    );
  }

  function lightenHex(hex, ratio) {
    return mixHex(hex, "#ffffff", ratio);
  }

  function darkenHex(hex, ratio) {
    return mixHex(hex, "#000000", ratio);
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(function (value) {
      return value.toString(16).padStart(2, "0");
    }).join("");
  }

  function rgbaFromHex(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();

























