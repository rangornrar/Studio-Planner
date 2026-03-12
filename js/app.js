const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");
const canvasWrap = document.getElementById("canvasWrap");
const sidebarTabsEl = document.getElementById("sidebarTabs");
const sidebarContentEl = document.getElementById("sidebarContent");
const propertyPanelEl = document.getElementById("propertyPanel");
const propertyBadgeEl = document.getElementById("propertyBadge");
const tipsBarEl = document.getElementById("tipsBar");
const studioMenuEl = document.getElementById("studioMenu");
const presetMenuEl = document.getElementById("presetMenu");
const toastStackEl = document.getElementById("toastStack");
const checklistModalEl = document.getElementById("checklistModal");
const checklistBodyEl = document.getElementById("checklistBody");
const loadJsonInputEl = document.getElementById("loadJsonInput");
const presetPreviewEl = document.getElementById("presetPreview");
const presetPreviewCanvas = document.getElementById("presetPreviewCanvas");
const presetPreviewCtx = presetPreviewCanvas.getContext("2d");
const presetPreviewTitleEl = document.getElementById("presetPreviewTitle");
const presetPreviewDescEl = document.getElementById("presetPreviewDesc");
const presetPreviewMetaEl = document.getElementById("presetPreviewMeta");
 const VIEWS = [
  { id: "setup", label: "Vue Studio" },
  { id: "camera", label: "Vue APN" },
  { id: "light", label: "Vue Lumière" },
  { id: "iso", label: "Vue Iso" }
];
 const STUDIO_SIZES = [
  {
        label: "2 × 6 m",
        w: 2,
        h: 6,
        type: "indoor"
  },
  {
        label: "3 × 6 m",
        w: 3,
        h: 6,
        type: "indoor"
  },
  {
        label: "4 × 6 m",
        w: 4,
        h: 6,
        type: "indoor"
  },
  {
        label: "5 × 6 m",
        w: 5,
        h: 6,
        type: "indoor"
  },
  {
        label: "6 × 6 m",
        w: 6,
        h: 6,
        type: "indoor"
  },
  {
        label: "6 × 8 m",
        w: 6,
        h: 8,
        type: "indoor"
  },
  {
        label: "8 × 8 m",
        w: 8,
        h: 8,
        type: "indoor"
  },
  {
        label: "8 × 10 m",
        w: 8,
        h: 10,
        type: "indoor"
  },
  {
        label: "10 × 8 m",
        w: 10,
        h: 8,
        type: "indoor"
  },
  {
        label: "10 × 10 m",
        w: 10,
        h: 10,
        type: "indoor"
  },
  {
        label: "12 × 10 m",
        w: 12,
        h: 10,
        type: "indoor"
  },
  {
        label: "12 × 12 m",
        w: 12,
        h: 12,
        type: "indoor"
  },
  {
        label: "15 × 12 m",
        w: 15,
        h: 12,
        type: "indoor"
  },
  {
        label: "Outdoor",
        w: 12,
        h: 12,
        type: "outdoor"
  }
];
 const sidebarTabs = [
  { id: "cameras", label: "📷 Caméras" },
  { id: "subjects", label: "🧍 Sujets" },
  { id: "lights", label: "💡 Lumières" },
  { id: "modifiers", label: "🔆 Modifs" },
  { id: "notes", label: "📝 Notes" }
];
 const LIGHT_SPREAD = {
  octobox: 220,
  softbox: 190,
  "beauty-dish": 140,
  parabolic: 240,
  reflector: 130,
  snoot: 80,
  grid: 95,
  "ring-flash": 115,
  "strip-box": 170,
  "barn-doors": 100,
  gel: 145,
  flag: 70,
  monolight: 160,
  generator: 170,
  "led-panel": 165,
  fresnel: 120,
  speedlight: 110,
  torch: 145,
  window: 240,
  sun: 300
};
 const SURFACE_PALETTES = [
  {
    key: "concrete",
    material: "concrete",
    materialLabel: "Béton",
    name: "Charbon",
    floorStart: "#2a3139",
    floorEnd: "#1b2026",
    secondary: "#3b4651",
    accent: "rgba(255,255,255,0.038)",
    accentSoft: "rgba(255,255,255,0.014)",
    seam: "rgba(255,255,255,0.08)",
    wallStart: "#4f5864",
    wallEnd: "#22282e"
  },
  {
    key: "concrete-dove",
    material: "concrete",
    materialLabel: "Béton",
    name: "Perle",
    floorStart: "#8e96a1",
    floorEnd: "#5c646f",
    secondary: "#aeb6c2",
    accent: "rgba(255,255,255,0.09)",
    accentSoft: "rgba(255,255,255,0.04)",
    seam: "rgba(255,255,255,0.14)",
    wallStart: "#cfd6df",
    wallEnd: "#7e8793"
  },
  {
    key: "concrete-sand",
    material: "concrete",
    materialLabel: "Béton",
    name: "Sable",
    floorStart: "#b49d88",
    floorEnd: "#7f6b59",
    secondary: "#d0b9a4",
    accent: "rgba(255,244,228,0.09)",
    accentSoft: "rgba(255,248,238,0.04)",
    seam: "rgba(255,244,226,0.13)",
    wallStart: "#dbc9b6",
    wallEnd: "#8d7867"
  },
  {
    key: "parquet",
    material: "parquet",
    materialLabel: "Parquet",
    name: "Naturel",
    floorStart: "#7a5841",
    floorEnd: "#3a261a",
    secondary: "#9a6f52",
    accent: "rgba(255,255,255,0.048)",
    accentSoft: "rgba(0,0,0,0.08)",
    seam: "rgba(0,0,0,0.16)",
    wallStart: "#7f6958",
    wallEnd: "#36281f"
  },
  {
    key: "parquet-walnut",
    material: "parquet",
    materialLabel: "Parquet",
    name: "Noyer",
    floorStart: "#5f4335",
    floorEnd: "#241712",
    secondary: "#825a47",
    accent: "rgba(255,255,255,0.04)",
    accentSoft: "rgba(0,0,0,0.1)",
    seam: "rgba(0,0,0,0.18)",
    wallStart: "#695247",
    wallEnd: "#241815"
  },
  {
    key: "parquet-ebony",
    material: "parquet",
    materialLabel: "Parquet",
    name: "Ébène",
    floorStart: "#3e2d28",
    floorEnd: "#140f0d",
    secondary: "#59413a",
    accent: "rgba(255,255,255,0.03)",
    accentSoft: "rgba(0,0,0,0.12)",
    seam: "rgba(255,255,255,0.06)",
    wallStart: "#4d3b35",
    wallEnd: "#161110"
  },
  {
    key: "vinyl-white",
    material: "vinyl",
    materialLabel: "Vinyle",
    name: "Blanc pur",
    floorStart: "#f4f6fa",
    floorEnd: "#cfd7e2",
    secondary: "#ffffff",
    accent: "rgba(255,255,255,0.74)",
    accentSoft: "rgba(0,0,0,0.025)",
    seam: "rgba(0,0,0,0.04)",
    wallStart: "#fbfcfe",
    wallEnd: "#e1e8f0"
  },
  {
    key: "vinyl-cream",
    material: "vinyl",
    materialLabel: "Vinyle",
    name: "Crème",
    floorStart: "#f4ebdf",
    floorEnd: "#d4c2ad",
    secondary: "#fff7ef",
    accent: "rgba(255,255,255,0.58)",
    accentSoft: "rgba(108,84,60,0.05)",
    seam: "rgba(92,74,56,0.08)",
    wallStart: "#f8f0e6",
    wallEnd: "#e1cfbb"
  },
  {
    key: "vinyl-slate",
    material: "vinyl",
    materialLabel: "Vinyle",
    name: "Ardoise",
    floorStart: "#5b6370",
    floorEnd: "#2a303a",
    secondary: "#808997",
    accent: "rgba(255,255,255,0.16)",
    accentSoft: "rgba(0,0,0,0.08)",
    seam: "rgba(255,255,255,0.08)",
    wallStart: "#7b8390",
    wallEnd: "#343b45"
  }
];
 const SURFACE_MATERIAL_ORDER = ["vinyl", "concrete", "parquet"];
const SURFACE_PALETTE_LOOKUP = SURFACE_PALETTES.reduce((acc, palette) => {
  acc[palette.key] = palette;
  return acc;
}, {});
 const templateCatalog = {
  cameras: [
    { id: "canon-r5-35", category: "camera", name: "Canon R5", lens: "35mm", w: 0.72, h: 0.46, height: 1.5 },
    { id: "canon-r5-50", category: "camera", name: "Canon R5", lens: "50mm", w: 0.72, h: 0.46, height: 1.5 },
    { id: "canon-r5-85", category: "camera", name: "Canon R5", lens: "85mm", w: 0.72, h: 0.46, height: 1.5 },
    { id: "sony-a7-35", category: "camera", name: "Sony A7 IV", lens: "35mm", w: 0.7, h: 0.45, height: 1.5 },
    { id: "sony-a7-24-70", category: "camera", name: "Sony A7 IV", lens: "24-70mm", w: 0.74, h: 0.46, height: 1.5 },
    { id: "sony-a7-135", category: "camera", name: "Sony A7 IV", lens: "135mm", w: 0.78, h: 0.47, height: 1.5 },
    { id: "sony-a7-macro", category: "camera", name: "Sony A7 IV", lens: "100mm Macro", w: 0.77, h: 0.47, height: 1.5 }
  ],
  subjects: [
    { id: "male-standing", category: "subject", name: "Homme debout", pose: "standing", gender: "male", w: 0.62, h: 0.62, height: 1.82 },
    { id: "female-standing", category: "subject", name: "Femme debout", pose: "standing", gender: "female", w: 0.6, h: 0.6, height: 1.75 },
    { id: "male-seated", category: "subject", name: "Homme assis", pose: "seated", gender: "male", w: 0.8, h: 0.8, height: 1.45 },
    { id: "child-standing", category: "subject", name: "Enfant", pose: "standing", gender: "child", w: 0.46, h: 0.46, height: 1.2 },
    { id: "couple-standing", category: "subject", name: "Couple", pose: "couple", gender: "mixed", w: 1.14, h: 0.72, height: 1.8 },
    { id: "bust", category: "subject", name: "Buste", pose: "bust", gender: "neutral", w: 0.44, h: 0.44, height: 0.8 },
    { id: "backdrop-white", category: "backdrop", name: "Fond blanc", background: "vinyl-white", w: 2.8, h: 0.18, height: 2.7 },
    { id: "backdrop-gray", category: "backdrop", name: "Fond gris", background: "paper-gray", w: 2.8, h: 0.18, height: 2.7 },
    { id: "backdrop-muslin", category: "backdrop", name: "Fond canvas", background: "muslin", w: 2.8, h: 0.18, height: 2.7 },
    { id: "backdrop-green", category: "backdrop", name: "Fond chroma", background: "chroma", w: 2.8, h: 0.18, height: 2.7 }
  ],
  lights: [
    { id: "monolight", category: "light", name: "Monolight", w: 0.38, h: 0.38, height: 2.3, defaultPower: 78, colorTemp: 5600 },
    { id: "generator", category: "light", name: "Générateur", w: 0.42, h: 0.42, height: 2.4, defaultPower: 85, colorTemp: 5600 },
    { id: "led-panel", category: "light", name: "LED Panel", w: 0.48, h: 0.32, height: 2.2, defaultPower: 55, colorTemp: 5200 },
    { id: "fresnel", category: "light", name: "Fresnel", w: 0.36, h: 0.36, height: 2.4, defaultPower: 66, colorTemp: 3200 },
    { id: "speedlight", category: "light", name: "Speedlight", w: 0.28, h: 0.28, height: 2.1, defaultPower: 48, colorTemp: 5600 },
    { id: "torch", category: "light", name: "Torche", w: 0.34, h: 0.34, height: 2.1, defaultPower: 62, colorTemp: 4300 },
    { id: "window", category: "light", name: "Fenêtre", w: 1.1, h: 0.18, height: 2.6, defaultPower: 72, colorTemp: 6200 },
    { id: "sun", category: "light", name: "Soleil", w: 0.42, h: 0.42, height: 4.8, defaultPower: 100, colorTemp: 5600 }
  ],
  modifiers: [
    { id: "octobox-90", category: "modifier", baseVariant: "octobox", name: "Octobox 90 cm", sizeLabel: "90 cm", mountLight: "Monolight", w: 0.62, h: 0.62, height: 2.3, defaultPower: 74, colorTemp: 5600 },
    { id: "octobox-120", category: "modifier", baseVariant: "octobox", name: "Octobox 120 cm", sizeLabel: "120 cm", mountLight: "Monolight", w: 0.82, h: 0.82, height: 2.35, defaultPower: 80, colorTemp: 5600 },
    { id: "octobox-150", category: "modifier", baseVariant: "octobox", name: "Octobox 150 cm", sizeLabel: "150 cm", mountLight: "Generator", w: 1.02, h: 1.02, height: 2.4, defaultPower: 86, colorTemp: 5600 },
    { id: "softbox-60x90", category: "modifier", baseVariant: "softbox", name: "Softbox 60 × 90 cm", sizeLabel: "60 × 90 cm", mountLight: "Monolight", w: 0.68, h: 0.44, height: 2.3, defaultPower: 72, colorTemp: 5600 },
    { id: "softbox-80x120", category: "modifier", baseVariant: "softbox", name: "Softbox 80 × 120 cm", sizeLabel: "80 × 120 cm", mountLight: "Monolight", w: 0.88, h: 0.58, height: 2.35, defaultPower: 78, colorTemp: 5600 },
    { id: "softbox-120x180", category: "modifier", baseVariant: "softbox", name: "Softbox 120 × 180 cm", sizeLabel: "120 × 180 cm", mountLight: "Generator", w: 1.18, h: 0.78, height: 2.4, defaultPower: 86, colorTemp: 5600 },
    { id: "beauty-dish-42", category: "modifier", baseVariant: "beauty-dish", name: "Beauty Dish 42 cm", sizeLabel: "42 cm", mountLight: "Monolight", w: 0.44, h: 0.44, height: 2.28, defaultPower: 68, colorTemp: 5600 },
    { id: "beauty-dish-55", category: "modifier", baseVariant: "beauty-dish", name: "Beauty Dish 55 cm", sizeLabel: "55 cm", mountLight: "Monolight", w: 0.56, h: 0.56, height: 2.3, defaultPower: 72, colorTemp: 5600 },
    { id: "beauty-dish-70", category: "modifier", baseVariant: "beauty-dish", name: "Beauty Dish 70 cm", sizeLabel: "70 cm", mountLight: "Generator", w: 0.7, h: 0.7, height: 2.35, defaultPower: 78, colorTemp: 5600 },
    { id: "parabolic-105", category: "modifier", baseVariant: "parabolic", name: "Parabolic 105 cm", sizeLabel: "105 cm", mountLight: "Generator", w: 0.96, h: 0.96, height: 2.4, defaultPower: 84, colorTemp: 5600 },
    { id: "parabolic-150", category: "modifier", baseVariant: "parabolic", name: "Parabolic 150 cm", sizeLabel: "150 cm", mountLight: "Generator", w: 1.16, h: 1.16, height: 2.45, defaultPower: 90, colorTemp: 5600 },
    { id: "strip-box-30x120", category: "modifier", baseVariant: "strip-box", name: "Strip Box 30 × 120 cm", sizeLabel: "30 × 120 cm", mountLight: "Monolight", w: 0.34, h: 1.0, height: 2.4, defaultPower: 70, colorTemp: 5600 },
    { id: "strip-box-40x140", category: "modifier", baseVariant: "strip-box", name: "Strip Box 40 × 140 cm", sizeLabel: "40 × 140 cm", mountLight: "Monolight", w: 0.42, h: 1.14, height: 2.42, defaultPower: 74, colorTemp: 5600 },
    { id: "strip-box-40x180", category: "modifier", baseVariant: "strip-box", name: "Strip Box 40 × 180 cm", sizeLabel: "40 × 180 cm", mountLight: "Generator", w: 0.46, h: 1.42, height: 2.48, defaultPower: 80, colorTemp: 5600 },
    { id: "snoot-standard", category: "modifier", baseVariant: "snoot", name: "Snoot Standard", sizeLabel: "standard", mountLight: "Speedlight", w: 0.32, h: 0.32, height: 2.2, defaultPower: 38, colorTemp: 5600 },
    { id: "grid-20", category: "modifier", baseVariant: "grid", name: "Grille 20°", sizeLabel: "20°", mountLight: "Speedlight", w: 0.38, h: 0.38, height: 2.2, defaultPower: 34, colorTemp: 5600 },
    { id: "grid-40", category: "modifier", baseVariant: "grid", name: "Grille 40°", sizeLabel: "40°", mountLight: "Speedlight", w: 0.42, h: 0.42, height: 2.2, defaultPower: 38, colorTemp: 5600 },
    { id: "ring-flash-pro", category: "modifier", baseVariant: "ring-flash", name: "Ring Flash Pro", sizeLabel: "480 mm", mountLight: "Ring Head", w: 0.46, h: 0.46, height: 1.65, defaultPower: 56, colorTemp: 5600 },
    { id: "barn-doors-small", category: "modifier", baseVariant: "barn-doors", name: "Volets Small", sizeLabel: "small", mountLight: "Fresnel", w: 0.46, h: 0.46, height: 2.25, defaultPower: 58, colorTemp: 3200 },
    { id: "barn-doors-large", category: "modifier", baseVariant: "barn-doors", name: "Volets Large", sizeLabel: "large", mountLight: "Fresnel", w: 0.58, h: 0.58, height: 2.3, defaultPower: 64, colorTemp: 3200 },
    { id: "gel-cto", category: "modifier", baseVariant: "gel", name: "Gel CTO", sizeLabel: "full CTO", mountLight: "Speedlight", w: 0.44, h: 0.44, height: 2.2, defaultPower: 34, colorTemp: 3200 },
    { id: "gel-ctb", category: "modifier", baseVariant: "gel", name: "Gel CTB", sizeLabel: "full CTB", mountLight: "Speedlight", w: 0.44, h: 0.44, height: 2.2, defaultPower: 34, colorTemp: 6800 },
    { id: "gel-magenta", category: "modifier", baseVariant: "gel", name: "Gel Magenta", sizeLabel: "accent", mountLight: "Speedlight", w: 0.44, h: 0.44, height: 2.2, defaultPower: 30, colorTemp: 5600 },
    { id: "reflector-80", category: "modifier", baseVariant: "reflector", name: "Réflecteur 5-en-1 80 cm", sizeLabel: "80 cm", w: 0.72, h: 0.5, height: 1.5 },
    { id: "reflector-110", category: "modifier", baseVariant: "reflector", name: "Réflecteur 5-en-1 110 cm", sizeLabel: "110 cm", w: 0.92, h: 0.62, height: 1.56 },
    { id: "reflector-panel-120x180", category: "modifier", baseVariant: "reflector", name: "Panneau réflecteur 120 × 180 cm", sizeLabel: "120 × 180 cm", w: 1.16, h: 0.74, height: 1.7 },
    { id: "flag-45x60", category: "modifier", baseVariant: "flag", name: "Flag 45 × 60 cm", sizeLabel: "45 × 60 cm", w: 0.36, h: 0.68, height: 2.2 },
    { id: "flag-60x90", category: "modifier", baseVariant: "flag", name: "Flag 60 × 90 cm", sizeLabel: "60 × 90 cm", w: 0.44, h: 0.92, height: 2.25 },
    { id: "flag-120x120", category: "modifier", baseVariant: "flag", name: "Flag 120 × 120 cm", sizeLabel: "120 × 120 cm", w: 0.64, h: 1.04, height: 2.35 }
  ]
};
 const legacyModifierTemplates = [
  { id: "octobox", category: "modifier", baseVariant: "octobox", name: "Octobox", w: 0.72, h: 0.72, height: 2.3 },
  { id: "softbox", category: "modifier", baseVariant: "softbox", name: "Softbox", w: 0.84, h: 0.54, height: 2.3 },
  { id: "beauty-dish", category: "modifier", baseVariant: "beauty-dish", name: "Beauty Dish", w: 0.56, h: 0.56, height: 2.3 },
  { id: "parabolic", category: "modifier", baseVariant: "parabolic", name: "Parabolic", w: 0.92, h: 0.92, height: 2.4 },
  { id: "reflector", category: "modifier", baseVariant: "reflector", name: "Réflecteur", w: 0.68, h: 0.48, height: 1.5 },
  { id: "snoot", category: "modifier", baseVariant: "snoot", name: "Snoot", w: 0.36, h: 0.36, height: 2.3 },
  { id: "grid", category: "modifier", baseVariant: "grid", name: "Grille", w: 0.42, h: 0.42, height: 2.3 },
  { id: "ring-flash", category: "modifier", baseVariant: "ring-flash", name: "Ring Flash", w: 0.46, h: 0.46, height: 1.6 },
  { id: "strip-box", category: "modifier", baseVariant: "strip-box", name: "Strip Box", w: 0.42, h: 1.02, height: 2.4 },
  { id: "barn-doors", category: "modifier", baseVariant: "barn-doors", name: "Volets", w: 0.5, h: 0.5, height: 2.3 },
  { id: "gel", category: "modifier", baseVariant: "gel", name: "Gel", w: 0.48, h: 0.48, height: 2.3 },
  { id: "flag", category: "modifier", baseVariant: "flag", name: "Flag", w: 0.34, h: 0.8, height: 2.2 }
];
 const templateLookup = [...Object.values(templateCatalog).flat(), ...legacyModifierTemplates].reduce((acc, tpl) => {
  acc[tpl.id] = tpl;
  return acc;
}, {});
 function createPreset(key, category, name, desc, settings, items, tips) {
  return { key, category, name, desc, settings, items, tips };
}  const PRESETS = [
  createPreset(
    "corporate-clean",
    "Corporate",
    "Corporate Clean",
    "Portrait corporate propre et doux au télé court.",
    { iso: 100, aperture: "f/5.6", speed: "1/160", focal: "85mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.1, rotation: -90 },
      { templateId: "male-standing", x: 4, y: 4.4, rotation: -90 },
      { templateId: "backdrop-gray", x: 4, y: 0.8, rotation: 0 },
      { templateId: "monolight", x: 2.35, y: 3.25, rotation: 18, power: 84 },
      { templateId: "octobox", x: 2.05, y: 3.08, rotation: 18 },
      { templateId: "led-panel", x: 6.1, y: 4.1, rotation: 160, power: 36 },
      { templateId: "flag", x: 5.2, y: 4.3, rotation: 92 }
    ],
    { eclairage: "Octobox clé à 45°, panel léger en fill et flag pour redessiner la joue opposée." }
  ),
  createPreset(
    "corporate-rim",
    "Corporate",
    "Executive Rim",
    "Schéma premium avec rim discret et fond plus sombre.",
    { iso: 100, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.1, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.5, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.9, rotation: 0 },
      { templateId: "generator", x: 2.2, y: 3.2, rotation: 22, power: 88 },
      { templateId: "softbox", x: 1.92, y: 3.05, rotation: 22 },
      { templateId: "speedlight", x: 5.8, y: 2.6, rotation: 214, power: 34 },
      { templateId: "grid", x: 5.72, y: 2.53, rotation: 214 },
      { templateId: "reflector", x: 5.9, y: 4.7, rotation: 160 }
    ],
    { eclairage: "Grande source latérale, rim au fond via grille, réflecteur côté ombre pour tenir la texture peau." }
  ),
  createPreset(
    "corporate-linkedin",
    "Corporate",
    "LinkedIn Soft",
    "Rendu simple, neutre, orienté portrait d’équipe.",
    { iso: 100, aperture: "f/4", speed: "1/125", focal: "70mm" },
    [
      { templateId: "sony-a7-24-70", x: 4, y: 6.9, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.3, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.8, rotation: 0 },
      { templateId: "led-panel", x: 2.25, y: 3.55, rotation: 25, power: 52 },
      { templateId: "softbox", x: 1.95, y: 3.45, rotation: 25 },
      { templateId: "reflector", x: 5.9, y: 4.1, rotation: 180 }
    ],
    { eclairage: "Grand fill blanc et source souple pour un portrait sans contraste dur." }
  ),
  createPreset(
    "corporate-team",
    "Corporate",
    "Team Profile",
    "Preset pour couple ou petite équipe serrée.",
    { iso: 160, aperture: "f/8", speed: "1/160", focal: "50mm" },
    [
      { templateId: "canon-r5-50", x: 4, y: 7.15, rotation: -90 },
      { templateId: "couple-standing", x: 4, y: 4.55, rotation: -90 },
      { templateId: "backdrop-gray", x: 4, y: 0.85, rotation: 0 },
      { templateId: "generator", x: 2.1, y: 3.15, rotation: 18, power: 92 },
      { templateId: "parabolic", x: 1.78, y: 3.02, rotation: 18 },
      { templateId: "led-panel", x: 6.3, y: 3.55, rotation: 155, power: 40 },
      { templateId: "flag", x: 5.45, y: 4.35, rotation: 90 }
    ],
    { eclairage: "Parabolic large pour couvrir deux visages, panel de soutien et flag pour préserver le contraste." }
  ),
  createPreset(
    "corporate-editorial",
    "Corporate",
    "Editorial CEO",
    "Portrait légèrement dramatique, élégant sans devenir cinéma.",
    { iso: 100, aperture: "f/6.3", speed: "1/200", focal: "135mm" },
    [
      { templateId: "sony-a7-135", x: 4.1, y: 7.2, rotation: -88 },
      { templateId: "male-standing", x: 4.1, y: 4.35, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4.1, y: 0.8, rotation: 0 },
      { templateId: "fresnel", x: 2.65, y: 3.15, rotation: 20, power: 70 },
      { templateId: "barn-doors", x: 2.48, y: 3.05, rotation: 20 },
      { templateId: "speedlight", x: 6.0, y: 2.45, rotation: 214, power: 24 },
      { templateId: "grid", x: 5.95, y: 2.45, rotation: 214 }
    ],
    { eclairage: "Fresnel contrôlé avec volets, rim très discret pour détacher costume et cheveux." }
  ),
  createPreset(
    "classic-rembrandt",
    "Éclairage Classique",
    "Rembrandt",
    "Triangle lumineux sur la joue ombre.",
    { iso: 100, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.05, rotation: -90 },
      { templateId: "male-standing", x: 4, y: 4.5, rotation: -90 },
      { templateId: "backdrop-gray", x: 4, y: 0.85, rotation: 0 },
      { templateId: "monolight", x: 2.55, y: 3.1, rotation: 28, power: 84 },
      { templateId: "softbox", x: 2.22, y: 2.95, rotation: 28 },
      { templateId: "reflector", x: 5.7, y: 4.8, rotation: 160 }
    ],
    { eclairage: "Montez la clé légèrement au-dessus du regard et refermez l’angle pour créer le triangle Rembrandt." }
  ),
  createPreset(
    "classic-loop",
    "Éclairage Classique",
    "Loop",
    "Ombre de nez courte et flatteuse.",
    { iso: 100, aperture: "f/5.6", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.05, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.48, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.85, rotation: 0 },
      { templateId: "monolight", x: 2.75, y: 3.45, rotation: 20, power: 78 },
      { templateId: "octobox", x: 2.45, y: 3.26, rotation: 20 },
      { templateId: "reflector", x: 5.55, y: 4.5, rotation: 170 }
    ],
    { eclairage: "Source ouverte à 35° du sujet, avec reflet doux pour rester lumineux dans l’œil ombre." }
  ),
  createPreset(
    "classic-split",
    "Éclairage Classique",
    "Split",
    "Une moitié de visage baignée, l’autre très dense.",
    { iso: 100, aperture: "f/8", speed: "1/200", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.0, rotation: -90 },
      { templateId: "male-standing", x: 4, y: 4.45, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.8, rotation: 0 },
      { templateId: "fresnel", x: 1.95, y: 4.38, rotation: 0, power: 74 },
      { templateId: "barn-doors", x: 1.82, y: 4.38, rotation: 0 },
      { templateId: "flag", x: 5.15, y: 4.35, rotation: 90 }
    ],
    { eclairage: "Amenez la source quasi perpendiculaire et absorbez tout fill parasite côté ombre." }
  ),
  createPreset(
    "classic-butterfly",
    "Éclairage Classique",
    "Butterfly",
    "Lumière frontale haute pour pommettes et nez dessinés.",
    { iso: 100, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.15, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.4, rotation: -90 },
      { templateId: "backdrop-gray", x: 4, y: 0.85, rotation: 0 },
      { templateId: "generator", x: 4.0, y: 2.6, rotation: 90, power: 90 },
      { templateId: "beauty-dish", x: 4.0, y: 2.35, rotation: 90 },
      { templateId: "reflector", x: 4.0, y: 5.5, rotation: -90 }
    ],
    { eclairage: "Beauty dish centré haut, réflecteur sous le menton pour ouvrir juste assez l’ombre." }
  ),
  createPreset(
    "classic-clamshell",
    "Éclairage Classique",
    "Clamshell",
    "Schéma beauté doux, double source symétrique.",
    { iso: 100, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.2, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.45, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.85, rotation: 0 },
      { templateId: "monolight", x: 4.0, y: 2.8, rotation: 90, power: 76 },
      { templateId: "softbox", x: 4.0, y: 2.55, rotation: 90 },
      { templateId: "led-panel", x: 4.0, y: 5.55, rotation: -90, power: 42 },
      { templateId: "reflector", x: 4.0, y: 5.1, rotation: -90 }
    ],
    { eclairage: "Softbox haut + fill frontal bas pour lisser les ombres sous yeux et nez." }
  ),
  createPreset(
    "classic-broad",
    "Éclairage Classique",
    "Broad Light",
    "Clé sur le côté large du visage pour élargir légèrement.",
    { iso: 100, aperture: "f/5.6", speed: "1/160", focal: "50mm" },
    [
      { templateId: "canon-r5-50", x: 4, y: 6.95, rotation: -90 },
      { templateId: "male-standing", x: 4, y: 4.4, rotation: -70 },
      { templateId: "backdrop-gray", x: 4, y: 0.85, rotation: 0 },
      { templateId: "monolight", x: 5.7, y: 3.4, rotation: 165, power: 72 },
      { templateId: "softbox", x: 5.45, y: 3.25, rotation: 165 },
      { templateId: "flag", x: 2.9, y: 4.3, rotation: 90 }
    ],
    { eclairage: "Faites légèrement tourner le sujet vers la clé pour placer la lumière côté large." }
  ),
  createPreset(
    "classic-short",
    "Éclairage Classique",
    "Short Light",
    "Clé sur le côté étroit pour sculpter davantage.",
    { iso: 100, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.05, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.45, rotation: -110 },
      { templateId: "backdrop-gray", x: 4, y: 0.8, rotation: 0 },
      { templateId: "monolight", x: 2.3, y: 3.35, rotation: 24, power: 78 },
      { templateId: "octobox", x: 2.05, y: 3.18, rotation: 24 },
      { templateId: "reflector", x: 5.8, y: 4.55, rotation: 180 }
    ],
    { eclairage: "Tournez le visage vers l’ombre puis placez la clé sur le côté opposé pour amincir la face visible." }
  ),
  createPreset(
    "beauty-glossy",
    "Beauté",
    "Glossy Skin",
    "Beauté brillante avec frontalité propre et peau lumineuse.",
    { iso: 100, aperture: "f/11", speed: "1/200", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.25, rotation: -90 },
      { templateId: "bust", x: 4, y: 4.62, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.8, rotation: 0 },
      { templateId: "monolight", x: 4.0, y: 2.7, rotation: 90, power: 82 },
      { templateId: "beauty-dish", x: 4.0, y: 2.46, rotation: 90 },
      { templateId: "ring-flash", x: 4.0, y: 6.8, rotation: -90 },
      { templateId: "reflector", x: 4.0, y: 5.25, rotation: -90 }
    ],
    { eclairage: "Beauty dish en clé, réflecteur sous visage et ring flash léger pour ajouter le gloss." }
  ),
  createPreset(
    "beauty-editorial",
    "Beauté",
    "Clean Editorial",
    "Rendu éditorial propre, peau nette et séparation fond/sujet.",
    { iso: 100, aperture: "f/9", speed: "1/160", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.18, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.45, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.8, rotation: 0 },
      { templateId: "monolight", x: 2.6, y: 3.1, rotation: 18, power: 80 },
      { templateId: "octobox", x: 2.28, y: 2.92, rotation: 18 },
      { templateId: "speedlight", x: 6.0, y: 2.4, rotation: 214, power: 32 },
      { templateId: "strip-box", x: 5.75, y: 2.52, rotation: 214 }
    ],
    { eclairage: "Octobox large en clé et strip arrière pour souligner les contours cheveux/épaules." }
  ),
  createPreset(
    "beauty-ring",
    "Beauté",
    "Ring Fashion",
    "Look mode frontal avec ombres écrasées et catchlights marqués.",
    { iso: 100, aperture: "f/11", speed: "1/200", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 6.95, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.4, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.8, rotation: 0 },
      { templateId: "ring-flash", x: 4.0, y: 6.42, rotation: -90 },
      { templateId: "led-panel", x: 2.55, y: 3.8, rotation: 24, power: 34 },
      { templateId: "led-panel", x: 5.45, y: 3.8, rotation: 156, power: 34 }
    ],
    { eclairage: "Ring centré pour la signature beauté, panneaux latéraux très dosés pour réintroduire du modelé." }
  ),
  createPreset(
    "beauty-highkey",
    "Beauté",
    "High-Key Beauty",
    "Fond très propre, contraste bas et maquillage visible.",
    { iso: 125, aperture: "f/8", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.1, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.46, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.75, rotation: 0 },
      { templateId: "generator", x: 2.4, y: 3.1, rotation: 20, power: 76 },
      { templateId: "softbox", x: 2.12, y: 2.95, rotation: 20 },
      { templateId: "led-panel", x: 6.0, y: 3.25, rotation: 158, power: 45 },
      { templateId: "speedlight", x: 2.5, y: 1.8, rotation: 65, power: 38 },
      { templateId: "speedlight", x: 5.5, y: 1.8, rotation: 115, power: 38 }
    ],
    { eclairage: "Deux flashes vers le fond pour le monter au blanc, avec une clé souple et un fill latéral." }
  ),
  createPreset(
    "beauty-bronze",
    "Beauté",
    "Bronze Beauty",
    "Ambiance chaude, peau contrastée et bords légèrement cuivrés.",
    { iso: 100, aperture: "f/8", speed: "1/200", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.18, rotation: -90 },
      { templateId: "bust", x: 4, y: 4.66, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.78, rotation: 0 },
      { templateId: "fresnel", x: 2.45, y: 3.08, rotation: 20, power: 68, colorTemp: 3400 },
      { templateId: "gel", x: 2.28, y: 2.95, rotation: 20 },
      { templateId: "speedlight", x: 5.85, y: 2.5, rotation: 214, power: 22, colorTemp: 5600 },
      { templateId: "grid", x: 5.8, y: 2.5, rotation: 214 }
    ],
    { eclairage: "Fresnel chaud en clé avec gel CTO, rim froid léger pour un relief plus cosmétique." }
  ),
  createPreset(
    "boudoir-window",
    "Boudoir",
    "Window Silk",
    "Éclairage naturel doux près d’une grande source latérale.",
    { iso: 320, aperture: "f/2.8", speed: "1/250", focal: "50mm" },
    [
      { templateId: "sony-a7-35", x: 4, y: 6.8, rotation: -90 },
      { templateId: "female-standing", x: 4.6, y: 4.6, rotation: -110 },
      { templateId: "window", x: 1.15, y: 3.35, rotation: 0, power: 70, colorTemp: 6400 },
      { templateId: "reflector", x: 6.0, y: 4.8, rotation: 170 }
    ],
    { eclairage: "Fenêtre latérale comme source principale, réflecteur ivoire pour remonter les ombres sans casser la douceur." }
  ),
  createPreset(
    "boudoir-warm",
    "Boudoir",
    "Warm Silhouette",
    "Look sensuel chaud avec découpe prononcée.",
    { iso: 200, aperture: "f/4", speed: "1/160", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.05, rotation: -90 },
      { templateId: "female-standing", x: 4.2, y: 4.7, rotation: -95 },
      { templateId: "backdrop-muslin", x: 4, y: 0.85, rotation: 0 },
      { templateId: "torch", x: 2.65, y: 3.8, rotation: 20, power: 58, colorTemp: 3200 },
      { templateId: "gel", x: 2.45, y: 3.7, rotation: 20 },
      { templateId: "speedlight", x: 5.7, y: 2.45, rotation: 214, power: 32 },
      { templateId: "strip-box", x: 5.55, y: 2.55, rotation: 214 }
    ],
    { eclairage: "Clé chaude, arrière plus neutre et verticale pour dessiner le contour sans trop détailler les ombres." }
  ),
  createPreset(
    "boudoir-lace",
    "Boudoir",
    "Lace Shadow",
    "Motifs et ombres plus graphiques sur le corps.",
    { iso: 160, aperture: "f/5.6", speed: "1/200", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.0, rotation: -90 },
      { templateId: "female-standing", x: 4.25, y: 4.7, rotation: -96 },
      { templateId: "backdrop-gray", x: 4, y: 0.9, rotation: 0 },
      { templateId: "fresnel", x: 2.0, y: 4.1, rotation: 12, power: 65 },
      { templateId: "grid", x: 1.85, y: 4.08, rotation: 12 },
      { templateId: "flag", x: 5.4, y: 4.5, rotation: 90 }
    ],
    { eclairage: "Faisceau resserré pour générer un motif plus dramatique, avec un côté opposé très absorbant." }
  ),
  createPreset(
    "boudoir-velvet",
    "Boudoir",
    "Velvet Rim",
    "Silhouette sombre avec contour lumineux velours.",
    { iso: 200, aperture: "f/5", speed: "1/160", focal: "135mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.15, rotation: -90 },
      { templateId: "female-standing", x: 4.1, y: 4.8, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.8, rotation: 0 },
      { templateId: "speedlight", x: 2.8, y: 2.35, rotation: 250, power: 34 },
      { templateId: "strip-box", x: 2.7, y: 2.45, rotation: 250 },
      { templateId: "speedlight", x: 5.3, y: 2.35, rotation: 290, power: 34 },
      { templateId: "strip-box", x: 5.4, y: 2.45, rotation: 290 },
      { templateId: "flag", x: 4.0, y: 3.9, rotation: 90 }
    ],
    { eclairage: "Double rim symétrique et drapeau frontal pour garder le centre du sujet volontairement sombre." }
  ),   createPreset(
    "art-cyan-magenta",
    "Artistique",
    "Cyan Magenta",
    "Contraste chromatique assumé pour série mode ou cover.",
    { iso: 125, aperture: "f/8", speed: "1/160", focal: "50mm" },
    [
      { templateId: "sony-a7-24-70", x: 4, y: 6.95, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.55, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.75, rotation: 0 },
      { templateId: "led-panel", x: 2.35, y: 3.45, rotation: 18, power: 52, colorTemp: 9000 },
      { templateId: "gel", x: 2.2, y: 3.35, rotation: 18 },
      { templateId: "led-panel", x: 5.85, y: 3.4, rotation: 162, power: 52, colorTemp: 2600 },
      { templateId: "gel", x: 6.0, y: 3.3, rotation: 162 }
    ],
    { eclairage: "Deux panneaux colorés en opposition, avec balance des blancs verrouillée pour garder la séparation." }
  ),
  createPreset(
    "art-hard-noir",
    "Artistique",
    "Hard Noir",
    "Noir graphique à ombres dures et faisceau serré.",
    { iso: 100, aperture: "f/11", speed: "1/200", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.1, rotation: -90 },
      { templateId: "male-standing", x: 4.1, y: 4.45, rotation: -95 },
      { templateId: "backdrop-gray", x: 4, y: 0.82, rotation: 0 },
      { templateId: "fresnel", x: 2.2, y: 3.85, rotation: 10, power: 72 },
      { templateId: "barn-doors", x: 2.05, y: 3.8, rotation: 10 },
      { templateId: "flag", x: 5.0, y: 4.3, rotation: 90 }
    ],
    { eclairage: "Fresnel étroit avec volets, aucune source secondaire. Laisser le noir envahir tout le hors-faisceau." }
  ),
  createPreset(
    "art-dream-haze",
    "Artistique",
    "Dream Haze",
    "Preset doux et enveloppant pour un rendu pastel diffus.",
    { iso: 200, aperture: "f/4", speed: "1/125", focal: "50mm" },
    [
      { templateId: "sony-a7-35", x: 4, y: 6.85, rotation: -90 },
      { templateId: "female-standing", x: 4, y: 4.5, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.75, rotation: 0 },
      { templateId: "window", x: 1.3, y: 3.25, rotation: 0, power: 66 },
      { templateId: "reflector", x: 5.9, y: 4.6, rotation: 165 },
      { templateId: "led-panel", x: 4.0, y: 2.3, rotation: 90, power: 20, colorTemp: 7000 }
    ],
    { eclairage: "Grande source douce + léger overhead froid pour donner un voile presque aérien au haut du portrait." }
  ),
  createPreset(
    "art-sun-flare",
    "Artistique",
    "Sun Flare",
    "Contre-jour solaire stylisé avec flare assumé.",
    { iso: 100, aperture: "f/9", speed: "1/250", focal: "35mm" },
    [
      { templateId: "sony-a7-35", x: 4, y: 6.75, rotation: -90 },
      { templateId: "male-standing", x: 4.0, y: 4.7, rotation: -88 },
      { templateId: "sun", x: 6.8, y: 1.3, rotation: 230, power: 100, colorTemp: 5800 },
      { templateId: "reflector", x: 2.6, y: 4.9, rotation: 22 }
    ],
    { eclairage: "Le soleil arrive arrière-latéral. Garder un léger fill au réflecteur pour récupérer juste le regard." }
  ),
  createPreset(
    "family-trio",
    "Famille",
    "Family Trio Soft",
    "Grand groupe serré éclairé sans zones mortes.",
    { iso: 160, aperture: "f/8", speed: "1/160", focal: "50mm" },
    [
      { templateId: "canon-r5-50", x: 4, y: 7.25, rotation: -90 },
      { templateId: "couple-standing", x: 4.2, y: 4.7, rotation: -90 },
      { templateId: "child-standing", x: 3.2, y: 4.95, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.75, rotation: 0 },
      { templateId: "generator", x: 2.15, y: 3.2, rotation: 18, power: 90 },
      { templateId: "parabolic", x: 1.8, y: 3.0, rotation: 18 },
      { templateId: "led-panel", x: 6.15, y: 3.65, rotation: 160, power: 48 }
    ],
    { eclairage: "Grande source large et légèrement haute, avec fill latéral pour conserver de la lisibilité sur tous les visages." }
  ),
  createPreset(
    "family-couple",
    "Famille",
    "Couple Lifestyle",
    "Couple plus vivant avec lumière douce et légère profondeur.",
    { iso: 200, aperture: "f/4", speed: "1/200", focal: "50mm" },
    [
      { templateId: "sony-a7-35", x: 4, y: 6.85, rotation: -90 },
      { templateId: "couple-standing", x: 4, y: 4.65, rotation: -86 },
      { templateId: "window", x: 1.3, y: 3.4, rotation: 0, power: 68 },
      { templateId: "reflector", x: 6.0, y: 4.7, rotation: 170 }
    ],
    { eclairage: "Parfait pour des interactions naturelles : la fenêtre structure, le réflecteur reste discret." }
  ),
  createPreset(
    "family-child",
    "Famille",
    "Child Daylight",
    "Setup vivant et lumineux pour portrait enfant.",
    { iso: 250, aperture: "f/3.5", speed: "1/320", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 6.95, rotation: -90 },
      { templateId: "child-standing", x: 4, y: 4.75, rotation: -90 },
      { templateId: "backdrop-muslin", x: 4, y: 0.82, rotation: 0 },
      { templateId: "window", x: 1.5, y: 3.55, rotation: 0, power: 64 },
      { templateId: "reflector", x: 5.75, y: 4.85, rotation: 168 }
    ],
    { eclairage: "Gardez la source large et basse pour suivre le sujet même s’il bouge entre les prises." }
  ),
  createPreset(
    "family-maternity",
    "Famille",
    "Maternity Glow",
    "Schéma doux et enveloppant pour maternité.",
    { iso: 125, aperture: "f/5.6", speed: "1/160", focal: "85mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.15, rotation: -90 },
      { templateId: "female-standing", x: 4.1, y: 4.55, rotation: -90 },
      { templateId: "backdrop-white", x: 4, y: 0.8, rotation: 0 },
      { templateId: "monolight", x: 2.45, y: 3.2, rotation: 18, power: 74 },
      { templateId: "octobox", x: 2.15, y: 3.05, rotation: 18 },
      { templateId: "reflector", x: 5.95, y: 4.65, rotation: 174 }
    ],
    { eclairage: "Octobox rapprochée pour enrober le ventre et conserver un fond très doux sans dureté." }
  ),
  createPreset(
    "product-bottle",
    "Packshot / Produit",
    "Bottle Hero",
    "Packshot bouteille avec reflets latéraux contrôlés.",
    { iso: 100, aperture: "f/13", speed: "1/160", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.1, rotation: -90 },
      { templateId: "bust", x: 4, y: 4.55, rotation: -90, name: "Produit principal", height: 0.45 },
      { templateId: "backdrop-white", x: 4, y: 0.7, rotation: 0 },
      { templateId: "strip-box", x: 2.55, y: 3.65, rotation: 8 },
      { templateId: "speedlight", x: 2.7, y: 3.7, rotation: 8, power: 40 },
      { templateId: "strip-box", x: 5.45, y: 3.65, rotation: 172 },
      { templateId: "speedlight", x: 5.3, y: 3.7, rotation: 172, power: 40 },
      { templateId: "flag", x: 4.0, y: 4.0, rotation: 90 }
    ],
    { eclairage: "Deux strips pour dessiner la bouteille et un flag central pour contrôler la bande spéculaire." }
  ),
  createPreset(
    "product-cosmetic",
    "Packshot / Produit",
    "Cosmetic Flat",
    "Produit cosmétique en lumière douce high-end.",
    { iso: 100, aperture: "f/11", speed: "1/160", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.15, rotation: -90 },
      { templateId: "bust", x: 4, y: 4.62, rotation: -90, name: "Cosmétique", height: 0.38 },
      { templateId: "backdrop-white", x: 4, y: 0.78, rotation: 0 },
      { templateId: "monolight", x: 4.0, y: 2.85, rotation: 90, power: 74 },
      { templateId: "softbox", x: 4.0, y: 2.55, rotation: 90 },
      { templateId: "reflector", x: 4.0, y: 5.2, rotation: -90 }
    ],
    { eclairage: "Top light doux et front fill au réflecteur pour un rendu très clean de packaging." }
  ),
  createPreset(
    "product-watch",
    "Packshot / Produit",
    "Watch Specular",
    "Montre ou bijou avec accents précis.",
    { iso: 100, aperture: "f/16", speed: "1/200", focal: "100mm" },
    [
      { templateId: "sony-a7-macro", x: 4, y: 7.12, rotation: -90 },
      { templateId: "bust", x: 4, y: 4.7, rotation: -90, name: "Montre", height: 0.22 },
      { templateId: "backdrop-gray", x: 4, y: 0.75, rotation: 0 },
      { templateId: "fresnel", x: 2.35, y: 3.82, rotation: 16, power: 58 },
      { templateId: "grid", x: 2.2, y: 3.8, rotation: 16 },
      { templateId: "speedlight", x: 5.75, y: 3.7, rotation: 164, power: 24 },
      { templateId: "snoot", x: 5.55, y: 3.65, rotation: 164 }
    ],
    { eclairage: "Clé dure avec grille pour ciseler les arêtes, accent secondaire au snoot pour le métal." }
  ),
  createPreset(
    "product-darkstill",
    "Packshot / Produit",
    "Still Life Dark",
    "Nature morte dramatique, presque éditoriale.",
    { iso: 100, aperture: "f/11", speed: "1/200", focal: "85mm" },
    [
      { templateId: "canon-r5-85", x: 4, y: 7.0, rotation: -90 },
      { templateId: "bust", x: 4.1, y: 4.7, rotation: -90, name: "Nature morte", height: 0.5 },
      { templateId: "backdrop-muslin", x: 4, y: 0.78, rotation: 0 },
      { templateId: "fresnel", x: 2.25, y: 3.55, rotation: 18, power: 60 },
      { templateId: "barn-doors", x: 2.1, y: 3.5, rotation: 18 },
      { templateId: "flag", x: 5.0, y: 4.4, rotation: 90 }
    ],
    { eclairage: "Faisceau précis et beaucoup de négatif fill pour conserver une image dense et sculptée." }
  ),
  createPreset(
    "cinema-talking-head",
    "Cinéma / Interview",
    "Talking Head LED",
    "Set interview moderne à LED bicolores.",
    { iso: 400, aperture: "f/2.8", speed: "1/50", focal: "50mm" },
    [
      { templateId: "sony-a7-35", x: 4, y: 7.0, rotation: -90 },
      { templateId: "male-standing", x: 4.0, y: 4.55, rotation: -90 },
      { templateId: "backdrop-gray", x: 4, y: 0.82, rotation: 0 },
      { templateId: "led-panel", x: 2.45, y: 3.4, rotation: 18, power: 58, colorTemp: 4300 },
      { templateId: "softbox", x: 2.2, y: 3.25, rotation: 18 },
      { templateId: "led-panel", x: 6.0, y: 2.65, rotation: 214, power: 22, colorTemp: 3200 },
      { templateId: "strip-box", x: 5.78, y: 2.72, rotation: 214 }
    ],
    { eclairage: "Panneau clé diffusé, accent arrière plus chaud, vitesse vidéo à 1/50 pour rester cinéma." }
  ),
  createPreset(
    "cinema-window",
    "Cinéma / Interview",
    "Motivated Window",
    "Interview motivée par une fenêtre hors-champ.",
    { iso: 640, aperture: "f/2.8", speed: "1/48", focal: "85mm" },
    [
      { templateId: "sony-a7-135", x: 4, y: 7.1, rotation: -90 },
      { templateId: "female-standing", x: 4.15, y: 4.58, rotation: -96 },
      { templateId: "backdrop-muslin", x: 4, y: 0.82, rotation: 0 },
      { templateId: "window", x: 1.25, y: 3.45, rotation: 0, power: 78, colorTemp: 6500 },
      { templateId: "flag", x: 5.2, y: 4.35, rotation: 90 },
      { templateId: "led-panel", x: 5.95, y: 2.55, rotation: 214, power: 18, colorTemp: 3200 }
    ],
    { eclairage: "La fenêtre motive la scène. Le fill reste minimal et chaud pour ne pas casser le modelé principal." }
  )
];
 const state = {
  view: "setup",
  tool: "select",
  zoom: 1,
  panX: 0,
  panY: 0,
  studio: { w: 8, h: 8, type: "indoor", surface: "concrete" },
  items: [],
  selected: null,
  history: [],
  historyIndex: -1,
  preset: null,
  sidebarTab: "cameras",
  notes: "",
  gridSnap: 0.5,
  showLightCones: true,
  measure: { active: false, firstId: null, secondId: null },
  checklist: {},
  backgroundOverride: null
};
 const interaction = {
  mode: null,
  itemId: null,
  moved: false,
  startPointer: null,
  startPan: null,
  offset: null
};
 const LOCAL_KEY = "lite-lighting-diagram-v2";
let previewHideTimer = null;
 function uid() {
  return "id-" + Math.random().toString(36).slice(2, 10);
}
 function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
 function degToRad(deg) {
  return deg * Math.PI / 180;
}
 function radToDeg(rad) {
  return rad * 180 / Math.PI;
}
 function roundRectPath(targetCtx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  targetCtx.beginPath();
  targetCtx.moveTo(x + rr, y);
  targetCtx.arcTo(x + w, y, x + w, y + h, rr);
  targetCtx.arcTo(x + w, y + h, x, y + h, rr);
  targetCtx.arcTo(x, y + h, x, y, rr);
  targetCtx.arcTo(x, y, x + w, y, rr);
  targetCtx.closePath();
}
 function serializeState() {
  return {
    view: state.view,
    tool: state.tool,
    zoom: state.zoom,
    panX: state.panX,
    panY: state.panY,
    studio: { ...state.studio },
    items: state.items.map(item => ({ ...item })),
    selected: state.selected,
    preset: state.preset,
    sidebarTab: state.sidebarTab,
    notes: state.notes,
    gridSnap: state.gridSnap,
    showLightCones: state.showLightCones,
    measure: { ...state.measure },
    checklist: { ...state.checklist },
    backgroundOverride: state.backgroundOverride
  };
}
 function restoreSnapshot(snapshot) {
  state.view = snapshot.view;
  state.tool = snapshot.tool;
  state.zoom = snapshot.zoom;
  state.panX = snapshot.panX;
  state.panY = snapshot.panY;
  state.studio = { ...snapshot.studio };
  state.items = (snapshot.items || []).map(normalizeItem);
  state.selected = state.items.some(item => item.id === snapshot.selected) ? snapshot.selected : null;
  state.preset = snapshot.preset || null;
  state.sidebarTab = snapshot.sidebarTab || state.sidebarTab;
  state.notes = snapshot.notes || "";
  state.gridSnap = snapshot.gridSnap ?? 0.5;
  state.showLightCones = snapshot.showLightCones ?? true;
  state.measure = { active: snapshot.measure?.active || false, firstId: snapshot.measure?.firstId || null, secondId: snapshot.measure?.secondId || null };
  state.checklist = { ...(snapshot.checklist || {}) };
  state.backgroundOverride = snapshot.backgroundOverride || null;
}
 function commitHistory(label) {
  const snapshot = serializeState();
  const encoded = JSON.stringify(snapshot);
  const previous = state.history[state.historyIndex];
  if (previous && JSON.stringify(previous) === encoded) {
    return;
  }
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(snapshot);
  state.historyIndex = state.history.length - 1;
  syncUI();
  saveLocalState(false);
  if (label) {
    notify(label);
  }
}
 function undo() {
  if (state.historyIndex <= 0) {
    return;
  }
  state.historyIndex -= 1;
  restoreSnapshot(state.history[state.historyIndex]);
  syncUI();
  render();
}
 function redo() {
  if (state.historyIndex >= state.history.length - 1) {
    return;
  }
  state.historyIndex += 1;
  restoreSnapshot(state.history[state.historyIndex]);
  syncUI();
  render();
}
 function saveLocalState(withToast = true) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(serializeState()));
  if (withToast) {
    notify("Auto-save enregistré");
  }
}
 function loadLocalState() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) {
    notify("Aucun auto-save trouvé");
    return;
  }
  try {
    restoreSnapshot(JSON.parse(raw));
    commitHistory("Auto-save restauré");
    syncUI();
    render();
  } catch (error) {
    console.error(error);
    notify("Auto-save invalide");
  }
}
 function normalizeItem(item) {
  const template = templateLookup[item.variant] || templateLookup[item.templateId] || {};
  return {
    id: item.id || uid(),
    type: item.type || template.category || "subject",
    templateId: item.templateId || template.id || null,
    variant: item.variant || item.templateId || template.id,
    baseVariant: item.baseVariant || template.baseVariant || item.variant || item.templateId || template.id,
    name: item.name || template.name || "Élément",
    x: item.x ?? state.studio.w / 2,
    y: item.y ?? state.studio.h / 2,
    rotation: item.rotation ?? 0,
    power: item.power ?? template.defaultPower ?? 0,
    lens: item.lens || template.lens || null,
    gender: item.gender || template.gender || "neutral",
    pose: item.pose || template.pose || "standing",
    w: item.w ?? template.w ?? 0.5,
    h: item.h ?? template.h ?? 0.5,
    height: item.height ?? template.height ?? 1.8,
    colorTemp: item.colorTemp ?? template.colorTemp ?? 5600,
    background: item.background || template.background || null,
    sizeLabel: item.sizeLabel || template.sizeLabel || null,
    mountLight: item.mountLight || template.mountLight || null
  };
}
 function createItemFromTemplate(templateId, x, y, overrides = {}) {
  const template = templateLookup[templateId];
  return normalizeItem({
    id: uid(),
    templateId,
    variant: templateId,
    baseVariant: overrides.baseVariant || template.baseVariant || templateId,
    type: template.category,
    name: overrides.name || template.name,
    x,
    y,
    rotation: overrides.rotation ?? 0,
    power: overrides.power ?? template.defaultPower ?? 0,
    lens: overrides.lens || template.lens,
    gender: overrides.gender || template.gender,
    pose: overrides.pose || template.pose,
    w: overrides.w ?? template.w,
    h: overrides.h ?? template.h,
    height: overrides.height ?? template.height,
    colorTemp: overrides.colorTemp ?? template.colorTemp,
    background: overrides.background || template.background,
    sizeLabel: overrides.sizeLabel || template.sizeLabel,
    mountLight: overrides.mountLight || template.mountLight
  });
}
 function resolvePresetItems(preset) {
  return preset.items.map(spec => createItemFromTemplate(spec.templateId, spec.x, spec.y, spec));
}
 function applyPreset(presetKey) {
  const preset = PRESETS.find(entry => entry.key === presetKey);
  if (!preset) {
    return;
  }
  state.items = resolvePresetItems(preset);
  state.selected = state.items[0]?.id || null;
  state.preset = preset.key;
  state.studio = { ...state.studio, w: 8, h: 8, type: "indoor" };
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  state.measure.firstId = null;
  state.measure.secondId = null;
  state.backgroundOverride = null;
  state.checklist = {};
  document.getElementById("textureSelect").value = state.studio.surface;
  commitHistory("Preset appliqué : " + preset.name);
  render();
}
 function resetProject() {
  state.items = [];
  state.selected = null;
  state.preset = null;
  state.notes = "";
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  state.studio = { w: 8, h: 8, type: "indoor", surface: "concrete" };
  state.measure = { active: false, firstId: null, secondId: null };
  state.checklist = {};
  document.getElementById("textureSelect").value = state.studio.surface;
  document.getElementById("snapSelect").value = String(state.gridSnap);
  commitHistory("Nouveau plateau");
  render();
}
 function setStudioSize(size) {
  state.studio.w = size.w;
  state.studio.h = size.h;
  state.studio.type = size.type;
  state.items.forEach(clampItemToStudio);
  commitHistory("Studio " + size.label);
  render();
}
 function getSelectedItem() { return state.items.find(item => item.id === state.selected) || null; }
function getBackdropItem() { return state.items.find(item => item.type === "backdrop") || null; }
function getCurrentPreset() { return PRESETS.find(entry => entry.key === state.preset) || null; }
function getModifierFamily(item) { return item?.baseVariant || item?.variant || item?.templateId || null; }
function getAttachedLightForModifier(modifier) {
  if (!modifier || modifier.type !== "modifier") return null;
  let closest = null;
  let closestDistance = 0.72;
  state.items.forEach(item => {
    if (item.type !== "light") return;
    const distance = Math.hypot(item.x - modifier.x, item.y - modifier.y);
    if (distance < closestDistance) {
      closest = item;
      closestDistance = distance;
    }
  });
  return closest;
}
function isLightEmitter(item) { return item.type === "light" || (item.type === "modifier" && !!item.mountLight); }
function getLightItems() { return state.items.filter(isLightEmitter); }
function getSubjectItems() { return state.items.filter(item => item.type === "subject"); }
function getModifierItems() { return state.items.filter(item => item.type === "modifier"); }
function getSurfacePalette(surfaceKey) {
  return SURFACE_PALETTE_LOOKUP[surfaceKey] || SURFACE_PALETTE_LOOKUP.concrete;
}
 function getSurfaceGroups() {
  return SURFACE_MATERIAL_ORDER.map(material => ({
    material,
    label: SURFACE_PALETTES.find(entry => entry.material === material)?.materialLabel || material,
    palettes: SURFACE_PALETTES.filter(entry => entry.material === material)
  }));
}
 function getSurfaceLabel(surfaceKey) {
  const palette = getSurfacePalette(surfaceKey);
  return palette.materialLabel + ' ' + palette.name;
}
 function getSceneMetrics(width = canvas.width, height = canvas.height) {
  const scale = Math.max(20, Math.min((width - 200) / state.studio.w, (height - 200) / state.studio.h));
  return { width, height, scale, centerX: width / 2 + state.panX, centerY: height / 2 + state.panY };
}
 function worldToScene(itemX, itemY, metrics) {
  return { x: (itemX - state.studio.w / 2) * metrics.scale, y: (itemY - state.studio.h / 2) * metrics.scale };
}
 function worldToScreen(itemX, itemY, metrics = getSceneMetrics()) {
  const point = worldToScene(itemX, itemY, metrics);
  return { x: metrics.centerX + point.x * state.zoom, y: metrics.centerY + point.y * state.zoom };
}
 function screenToWorld(screenX, screenY, metrics = getSceneMetrics()) {
  const localX = (screenX - metrics.centerX) / state.zoom;
  const localY = (screenY - metrics.centerY) / state.zoom;
  return { x: localX / metrics.scale + state.studio.w / 2, y: localY / metrics.scale + state.studio.h / 2 };
}
 function withStudioTransform(targetCtx, metrics, drawFn) {
  targetCtx.save();
  targetCtx.translate(metrics.centerX, metrics.centerY);
  targetCtx.scale(state.zoom, state.zoom);
  drawFn();
  targetCtx.restore();
}
 function clampItemToStudio(item) {
  const halfW = item.w / 2;
  const halfH = item.h / 2;
  item.x = clamp(item.x, halfW, state.studio.w - halfW);
  item.y = clamp(item.y, halfH, state.studio.h - halfH);
  return item;
}
 function snapValue(value) {
  if (!state.gridSnap) {
    return value;
  }
  return Math.round(value / state.gridSnap) * state.gridSnap;
}
 function fitItemInsideStudio(item, point) {
  item.x = snapValue(point.x);
  item.y = snapValue(point.y);
  clampItemToStudio(item);
}
 function getItemRadiusPx(item, metrics = getSceneMetrics()) {
  return Math.max(item.w, item.h) * metrics.scale * state.zoom * 0.65;
}
 function getRotationHandle(item, metrics = getSceneMetrics()) {
  const center = worldToScreen(item.x, item.y, metrics);
  const angle = degToRad(item.rotation);
  const distance = getItemRadiusPx(item, metrics) + 24;
  return { x: center.x + Math.cos(angle) * distance, y: center.y + Math.sin(angle) * distance };
}
 function hitTestItem(screenX, screenY, metrics = getSceneMetrics()) {
  const sorted = [...state.items].reverse();
  return sorted.find(item => {
    const center = worldToScreen(item.x, item.y, metrics);
    const radius = getItemRadiusPx(item, metrics);
    return Math.hypot(screenX - center.x, screenY - center.y) <= radius;
  }) || null;
}
 function hitTestRotationHandle(screenX, screenY, metrics = getSceneMetrics()) {
  const item = getSelectedItem();
  if (!item) {
    return false;
  }
  const handle = getRotationHandle(item, metrics);
  return Math.hypot(screenX - handle.x, screenY - handle.y) <= 12;
}
 function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}
 function getLensAngle(item) {
  const lens = item.lens || "";
  if (lens.includes("24-70")) return 48;
  if (lens.includes("35")) return 63;
  if (lens.includes("50")) return 39;
  if (lens.includes("85")) return 24;
  if (lens.includes("100")) return 20;
  if (lens.includes("135")) return 15;
  return 35;
}
 function kelvinToRgb(temp) {
  const k = clamp(temp, 1000, 40000) / 100;
  let red;
  let green;
  let blue;
  if (k <= 66) {
    red = 255;
    green = 99.4708025861 * Math.log(k) - 161.1195681661;
    blue = k <= 19 ? 0 : 138.5177312231 * Math.log(k - 10) - 305.0447927307;
  } else {
    red = 329.698727446 * Math.pow(k - 60, -0.1332047592);
    green = 288.1221695283 * Math.pow(k - 60, -0.0755148492);
    blue = 255;
  }
  return {
    r: Math.round(clamp(red, 0, 255)),
    g: Math.round(clamp(green, 0, 255)),
    b: Math.round(clamp(blue, 0, 255))
  };
}
 function rgbString(rgb, alpha = 1) {
  return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
}
 function getLightColor(light) {
  const variant = getModifierFamily(light);
  const rgb = kelvinToRgb(light.colorTemp || 5600);
  if (variant === "led-panel") {
    return rgbString({ r: Math.min(255, rgb.r + 15), g: rgb.g, b: Math.min(255, rgb.b + 18) });
  }
  if (variant === "fresnel" || variant === "torch") {
    return rgbString({ r: Math.min(255, rgb.r + 18), g: Math.max(0, rgb.g - 4), b: Math.max(0, rgb.b - 12) });
  }
  if (variant === "window") return "rgba(160, 205, 255, 1)";
  if (variant === "sun") return "rgba(255, 210, 112, 1)";
  return rgbString(rgb);
}
 function getNearestModifier(light) {
  if (light?.type === "modifier") return light;
  const modifiers = getModifierItems();
  let closest = null;
  let closestDistance = 1.1;
  modifiers.forEach(modifier => {
    const distance = Math.hypot(light.x - modifier.x, light.y - modifier.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = modifier;
    }
  });
  return closest;
}
 function getSpread(light) {
  const modifier = getNearestModifier(light);
  const spreadKey = getModifierFamily(modifier || light);
  return LIGHT_SPREAD[spreadKey] || 160;
}
 function getLightConeFamily(light) {
  if (!light) return null;
  if (light.type === "modifier") return getModifierFamily(light);
  const modifier = getNearestModifier(light);
  const family = getModifierFamily(modifier);
  if (modifier && family && family !== "reflector" && family !== "flag") {
    return family;
  }
  return getModifierFamily(light);
}
 function getLightConeAngle(light) {
  const family = getLightConeFamily(light);
  const angles = {
    octobox: 72,
    softbox: 62,
    "beauty-dish": 48,
    parabolic: 82,
    reflector: 46,
    snoot: 18,
    grid: 24,
    "ring-flash": 70,
    "strip-box": 40,
    "barn-doors": 28,
    gel: 34,
    flag: 14,
    monolight: 54,
    generator: 56,
    "led-panel": 74,
    fresnel: 32,
    speedlight: 38,
    torch: 44,
    window: 88,
    sun: 110
  };
  return degToRad(angles[family] || clamp(getSpread(light) * 0.32, 20, 90));
}
 function getLightConeReach(light) {
  const angle = degToRad(light.rotation || 0);
  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);
  const candidates = [];
  if (dirX > 0.0001) candidates.push((state.studio.w - light.x) / dirX);
  else if (dirX < -0.0001) candidates.push((0 - light.x) / dirX);
  if (dirY > 0.0001) candidates.push((state.studio.h - light.y) / dirY);
  else if (dirY < -0.0001) candidates.push((0 - light.y) / dirY);
  const reach = candidates.filter(value => value > 0).sort((a, b) => a - b)[0];
  return clamp((reach || Math.max(state.studio.w, state.studio.h) * 0.7) * 0.96, 0.8, Math.max(state.studio.w, state.studio.h));
}
 function drawLightCone(targetCtx, light, metrics) {
  if (!isLightEmitter(light)) return;
  const point = worldToScene(light.x, light.y, metrics);
  const beamColor = getLightColor(light);
  const coneAngle = getLightConeAngle(light);
  const reach = getLightConeReach(light) * metrics.scale;
  const innerReach = reach * 0.56;
  const outerGradient = targetCtx.createLinearGradient(0, 0, reach, 0);
  outerGradient.addColorStop(0, beamColor.replace(", 1)", ", 0.22)"));
  outerGradient.addColorStop(0.38, beamColor.replace(", 1)", ", 0.12)"));
  outerGradient.addColorStop(1, "rgba(0,0,0,0)");
  const innerGradient = targetCtx.createLinearGradient(0, 0, innerReach, 0);
  innerGradient.addColorStop(0, beamColor.replace(", 1)", ", 0.34)"));
  innerGradient.addColorStop(0.55, beamColor.replace(", 1)", ", 0.1)"));
  innerGradient.addColorStop(1, "rgba(0,0,0,0)");
  const edgeY = Math.tan(coneAngle / 2) * reach;
   targetCtx.save();
  targetCtx.translate(point.x, point.y);
  targetCtx.rotate(degToRad(light.rotation || 0));
  targetCtx.fillStyle = outerGradient;
  targetCtx.beginPath();
  targetCtx.moveTo(0, 0);
  targetCtx.arc(0, 0, reach, -coneAngle / 2, coneAngle / 2);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.fillStyle = innerGradient;
  targetCtx.beginPath();
  targetCtx.moveTo(0, 0);
  targetCtx.arc(0, 0, innerReach, -coneAngle * 0.32, coneAngle * 0.32);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.strokeStyle = beamColor.replace(", 1)", ", 0.34)");
  targetCtx.lineWidth = 1.1;
  targetCtx.setLineDash([10, 8]);
  targetCtx.beginPath();
  targetCtx.moveTo(0, 0);
  targetCtx.lineTo(reach, -edgeY);
  targetCtx.moveTo(0, 0);
  targetCtx.lineTo(reach, edgeY);
  targetCtx.stroke();
  targetCtx.setLineDash([]);
  targetCtx.strokeStyle = beamColor.replace(", 1)", ", 0.18)");
  targetCtx.beginPath();
  targetCtx.moveTo(0, 0);
  targetCtx.lineTo(innerReach, 0);
  targetCtx.stroke();
  targetCtx.restore();
}
 function mixColor(base, color, weight) {
  const clamped = clamp(weight, 0, 1);
  return {
    r: Math.round(base.r + (color.r - base.r) * clamped),
    g: Math.round(base.g + (color.g - base.g) * clamped),
    b: Math.round(base.b + (color.b - base.b) * clamped)
  };
}
 function darken(color, amount) {
  const factor = 1 - clamp(amount, 0, 1);
  return { r: Math.round(color.r * factor), g: Math.round(color.g * factor), b: Math.round(color.b * factor) };
}
 function lighten(color, amount) {
  return mixColor(color, { r: 255, g: 255, b: 255 }, clamp(amount, 0, 1));
}
 function withAlpha(color, alpha) {
  if (typeof color !== "string") return color;
  if (color.includes("rgba(")) return color.replace(/,\s*[\d.]+\)$/, ", " + alpha + ")");
  return color;
}
 function createMetalGradient(targetCtx, x1, y1, x2, y2, lift = 0) {
  const depth = clamp(lift, -0.4, 0.9);
  const low = clamp(Math.round(18 + depth * 22), 10, 120);
  const mid = clamp(Math.round(54 + depth * 34), 26, 185);
  const bright = clamp(Math.round(96 + depth * 46), 50, 238);
  const sheen = clamp(Math.round(132 + depth * 40), 72, 245);
  const gradient = targetCtx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, "rgba(" + low + ", " + (low + 6) + ", " + (low + 12) + ", 1)");
  gradient.addColorStop(0.18, "rgba(" + bright + ", " + (bright + 6) + ", " + (bright + 12) + ", 1)");
  gradient.addColorStop(0.42, "rgba(" + mid + ", " + (mid + 5) + ", " + (mid + 10) + ", 1)");
  gradient.addColorStop(0.74, "rgba(" + sheen + ", " + (sheen + 5) + ", " + (sheen + 10) + ", 1)");
  gradient.addColorStop(1, "rgba(" + low + ", " + (low + 6) + ", " + (low + 12) + ", 1)");
  return gradient;
}
 function drawShadowEllipse(targetCtx, x, y, radiusX, radiusY, alpha = 0.18, blur = 16, rotation = 0) {
  targetCtx.save();
  targetCtx.fillStyle = "rgba(0,0,0," + alpha + ")";
  targetCtx.shadowColor = "rgba(0,0,0," + Math.min(0.4, alpha * 1.35) + ")";
  targetCtx.shadowBlur = blur;
  targetCtx.beginPath();
  targetCtx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
 function drawGlossyPass(targetCtx, x, y, w, h, radius = 8, alpha = 0.18) {
  const gloss = targetCtx.createLinearGradient(x, y, x + w, y + h);
  gloss.addColorStop(0, "rgba(255,255,255," + alpha + ")");
  gloss.addColorStop(0.16, "rgba(255,255,255," + (alpha * 0.62) + ")");
  gloss.addColorStop(0.42, "rgba(255,255,255," + (alpha * 0.18) + ")");
  gloss.addColorStop(0.62, "rgba(255,255,255,0)");
  gloss.addColorStop(1, "rgba(255,255,255,0)");
  roundRectPath(targetCtx, x, y, w, h, radius);
  targetCtx.fillStyle = gloss;
  targetCtx.fill();
}
 function drawLensGlass(targetCtx, x, y, radiusX, radiusY, options = {}) {
  const rotation = options.rotation || 0;
  const ringAlpha = options.ringAlpha == null ? 0.18 : options.ringAlpha;
  const glass = targetCtx.createRadialGradient(x - radiusX * 0.24, y - radiusY * 0.28, Math.max(1, Math.min(radiusX, radiusY) * 0.16), x, y, Math.max(radiusX, radiusY));
  glass.addColorStop(0, options.innerColor || "rgba(138,205,255,0.42)");
  glass.addColorStop(0.22, "rgba(44,74,104,0.42)");
  glass.addColorStop(0.56, "rgba(10,16,23,0.96)");
  glass.addColorStop(1, "rgba(2,4,8,1)");
  targetCtx.beginPath();
  targetCtx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
  targetCtx.fillStyle = glass;
  targetCtx.fill();
  targetCtx.strokeStyle = "rgba(255,255,255," + ringAlpha + ")";
  targetCtx.lineWidth = Math.max(1, Math.min(radiusX, radiusY) * 0.12);
  targetCtx.stroke();
  targetCtx.strokeStyle = "rgba(255,255,255," + ringAlpha * 0.66 + ")";
  targetCtx.lineWidth = Math.max(1, Math.min(radiusX, radiusY) * 0.06);
  targetCtx.beginPath();
  targetCtx.ellipse(x, y, radiusX * 0.62, radiusY * 0.62, rotation, 0, Math.PI * 2);
  targetCtx.stroke();
  targetCtx.fillStyle = "rgba(255,255,255,0.18)";
  targetCtx.beginPath();
  targetCtx.ellipse(x - radiusX * 0.26, y - radiusY * 0.34, radiusX * 0.28, radiusY * 0.15, rotation - 0.34, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = "rgba(255,255,255,0.7)";
  targetCtx.beginPath();
  targetCtx.arc(x - radiusX * 0.1, y - radiusY * 0.16, Math.max(1.1, Math.min(radiusX, radiusY) * 0.12), 0, Math.PI * 2);
  targetCtx.fill();
}
 function drawGlowDisc(targetCtx, x, y, radius, color, alpha = 0.28) {
  const glow = targetCtx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, withAlpha(color, alpha));
  glow.addColorStop(0.52, withAlpha(color, alpha * 0.28));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  targetCtx.fillStyle = glow;
  targetCtx.beginPath();
  targetCtx.arc(x, y, radius, 0, Math.PI * 2);
  targetCtx.fill();
}
 function octagonPath(targetCtx, x, y, radiusX, radiusY) {
  targetCtx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const angle = Math.PI / 8 + i * Math.PI / 4;
    const px = x + Math.cos(angle) * radiusX;
    const py = y + Math.sin(angle) * radiusY;
    if (i === 0) targetCtx.moveTo(px, py); else targetCtx.lineTo(px, py);
  }
  targetCtx.closePath();
}
 function litColor(base, facingKey, facingFill, facingBack) {
  let result = { ...base };
  result = mixColor(result, { r: 255, g: 230, b: 196 }, facingKey * 0.72);
  result = mixColor(result, { r: 190, g: 212, b: 255 }, facingFill * 0.46);
  result = mixColor(result, { r: 255, g: 245, b: 215 }, facingBack * 0.28);
  return result;
}
 function getKeyLight() {
  return getLightItems().slice().sort((a, b) => (b.power || 0) - (a.power || 0))[0] || null;
}
 function computeLightingForSubject(subject) {
  const contributions = getLightItems().map(light => {
    const distance = Math.max(0.55, Math.hypot(light.x - subject.x, light.y - subject.y));
    const intensity = (light.power || 0) / Math.pow(distance, 2);
    const side = light.x < subject.x ? "left" : "right";
    const back = light.y < subject.y - 0.2;
    const front = light.y >= subject.y - 0.2;
    return { light, intensity, side, back, front };
  }).sort((a, b) => b.intensity - a.intensity);
   const key = contributions[0] || null;
  const fill = contributions.find(entry => entry !== key && entry.front) || null;
  const back = contributions.find(entry => entry.back) || null;
  const total = contributions.reduce((sum, entry) => sum + entry.intensity, 0) || 1;
  const leftValue = contributions.filter(entry => entry.side === "left").reduce((sum, entry) => sum + entry.intensity, 0) / total;
  const rightValue = contributions.filter(entry => entry.side === "right").reduce((sum, entry) => sum + entry.intensity, 0) / total;
  return {
    key,
    fill,
    back,
    total,
    directionX: rightValue - leftValue,
    facingKey: key ? clamp(key.intensity / total, 0, 1) : 0,
    facingFill: fill ? clamp(fill.intensity / total, 0, 1) : 0,
    facingBack: back ? clamp(back.intensity / total, 0, 1) : 0
  };
}
 function estimateExposure() {
  const lights = getLightItems();
  if (!lights.length) {
    return { avgPower: 0, ev: 0, aperture: "f/4", speed: "1/125", iso: 200, ratio: "1:1", level: 0.12 };
  }
  const avgPower = lights.reduce((sum, light) => sum + (light.power || 0), 0) / lights.length;
  const ev = 10 + Math.log2(Math.max(1, avgPower / 50));
  const keyLights = lights.filter(light => (light.power || 0) > 60);
  const fillLights = lights.filter(light => (light.power || 0) <= 60);
  const keyValue = keyLights.reduce((sum, light) => sum + (light.power || 0), 0) || avgPower;
  const fillValue = fillLights.reduce((sum, light) => sum + (light.power || 0), 0) || avgPower / 2;
  const ratio = (keyValue / Math.max(1, fillValue)).toFixed(1) + ":1";
  const iso = clamp(Math.round(100 + avgPower * 2.2), 100, 800);
  const apertureStops = ["f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16"];
  const aperture = apertureStops[Math.round(clamp((avgPower - 20) / 16, 0, apertureStops.length - 1))];
  const speeds = ["1/50", "1/80", "1/125", "1/160", "1/200", "1/250"];
  const speed = speeds[Math.round(clamp((avgPower - 15) / 16, 0, speeds.length - 1))];
  return { avgPower, ev, aperture, speed, iso, ratio, level: clamp(avgPower / 110, 0.06, 1) };
}
 function getEquipmentSummary() {
  const groups = state.items.reduce((acc, item) => {
    const key = item.type;
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
  const emitters = getLightItems();
  return [
    { label: "Caméras", value: (groups.camera || []).map(item => item.name + (item.lens ? " " + item.lens : "")).join(", ") || "Aucune" },
    { label: "Sujets", value: (groups.subject || []).map(item => item.name).join(", ") || "Aucun" },
    { label: "Lumières", value: emitters.map(item => item.name + " " + Math.round(item.power || 0) + "%").join(", ") || "Aucune" },
    { label: "Modifs", value: (groups.modifier || []).map(item => item.name + (item.mountLight ? " • " + item.mountLight : "")).join(", ") || "Aucune" }
  ];
}
 function drawTextureFill(targetCtx, x, y, w, h, texture) {
  const palette = getSurfacePalette(texture);
  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.rect(x, y, w, h);
  targetCtx.clip();
  if (palette.material === 'parquet') {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, palette.floorStart);
    gradient.addColorStop(1, palette.floorEnd);
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
    const plankWidth = Math.max(24, w / 14);
    for (let i = 0; i <= w + plankWidth; i += plankWidth) {
      const plankGradient = targetCtx.createLinearGradient(x + i, y, x + i + plankWidth, y + h);
      plankGradient.addColorStop(0, i % (plankWidth * 2) === 0 ? palette.secondary : palette.floorStart);
      plankGradient.addColorStop(1, i % (plankWidth * 2) === 0 ? palette.floorStart : palette.floorEnd);
      targetCtx.fillStyle = plankGradient;
      targetCtx.fillRect(x + i, y, plankWidth, h);
      targetCtx.fillStyle = palette.seam;
      targetCtx.fillRect(x + i, y, 2, h);
    }
    targetCtx.fillStyle = palette.accentSoft;
    for (let row = 0; row < 8; row += 1) {
      targetCtx.fillRect(x, y + row * h / 8 + 4, w, 1);
    }
  } else if (palette.material === 'vinyl') {
    const gradient = targetCtx.createLinearGradient(x, y, x, y + h);
    gradient.addColorStop(0, palette.secondary);
    gradient.addColorStop(0.24, palette.floorStart);
    gradient.addColorStop(1, palette.floorEnd);
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
    const sheen = targetCtx.createRadialGradient(x + w * 0.5, y + h * 0.14, 0, x + w * 0.5, y + h * 0.14, w * 0.72);
    sheen.addColorStop(0, palette.accent);
    sheen.addColorStop(1, 'rgba(0,0,0,0)');
    targetCtx.fillStyle = sheen;
    targetCtx.fillRect(x, y, w, h);
    targetCtx.fillStyle = palette.accentSoft;
    targetCtx.fillRect(x, y + h * 0.7, w, h * 0.3);
    for (let i = 1; i < 6; i += 1) {
      targetCtx.fillStyle = i % 2 === 0 ? palette.seam : 'rgba(0,0,0,0)';
      targetCtx.fillRect(x, y + i * h / 6, w, 1);
    }
  } else {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, palette.floorStart);
    gradient.addColorStop(1, palette.floorEnd);
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
    for (let i = 0; i < 160; i += 1) {
      const px = x + (i * 73 % 1000) / 1000 * w;
      const py = y + (i * 37 % 1000) / 1000 * h;
      targetCtx.fillStyle = i % 7 === 0 ? palette.accent : palette.accentSoft;
      targetCtx.fillRect(px, py, i % 5 === 0 ? 3 : 2, i % 5 === 0 ? 3 : 2);
    }
    targetCtx.fillStyle = palette.seam;
    for (let i = 0; i < 12; i += 1) {
      targetCtx.beginPath();
      targetCtx.arc(x + (i * 97 % 1000) / 1000 * w, y + (i * 53 % 1000) / 1000 * h, 1.6 + (i % 3), 0, Math.PI * 2);
      targetCtx.fill();
    }
  }
  targetCtx.restore();
}
function drawStudioBase(targetCtx, metrics) {
  const left = -state.studio.w * metrics.scale / 2;
  const top = -state.studio.h * metrics.scale / 2;
  const width = state.studio.w * metrics.scale;
  const height = state.studio.h * metrics.scale;
  const floorGradient = targetCtx.createLinearGradient(left, top, left + width, top + height);
  floorGradient.addColorStop(0, "rgba(24, 31, 41, 0.98)");
  floorGradient.addColorStop(1, "rgba(8, 10, 13, 0.98)");
  targetCtx.fillStyle = floorGradient;
  roundRectPath(targetCtx, left, top, width, height, 26);
  targetCtx.fill();
  drawTextureFill(targetCtx, left, top, width, height, state.studio.surface);
  const sheen = targetCtx.createLinearGradient(0, top, 0, top + height);
  sheen.addColorStop(0, "rgba(255,255,255,0.08)");
  sheen.addColorStop(0.35, "rgba(255,255,255,0.01)");
  sheen.addColorStop(1, "rgba(0,0,0,0.18)");
  targetCtx.fillStyle = sheen;
  roundRectPath(targetCtx, left, top, width, height, 26);
  targetCtx.fill();
  targetCtx.strokeStyle = "rgba(255,255,255,0.08)";
  targetCtx.lineWidth = 1.2;
  roundRectPath(targetCtx, left, top, width, height, 26);
  targetCtx.stroke();
}
 function drawGrid(targetCtx, metrics) {
  const left = -state.studio.w * metrics.scale / 2;
  const top = -state.studio.h * metrics.scale / 2;
  targetCtx.save();
  targetCtx.lineWidth = 1;
  targetCtx.strokeStyle = "rgba(255,255,255,0.04)";
  for (let x = 0; x <= state.studio.w; x += 1) {
    const px = left + x * metrics.scale;
    targetCtx.beginPath();
    targetCtx.moveTo(px, top);
    targetCtx.lineTo(px, top + state.studio.h * metrics.scale);
    targetCtx.stroke();
  }
  for (let y = 0; y <= state.studio.h; y += 1) {
    const py = top + y * metrics.scale;
    targetCtx.beginPath();
    targetCtx.moveTo(left, py);
    targetCtx.lineTo(left + state.studio.w * metrics.scale, py);
    targetCtx.stroke();
  }
  targetCtx.restore();
}
 function drawLightFalloff(targetCtx, light, metrics) {
  const point = worldToScene(light.x, light.y, metrics);
  const spread = getSpread(light) * (0.85 + (light.power || 0) / 220);
  const modifier = getNearestModifier(light);
  targetCtx.save();
  targetCtx.translate(point.x, point.y);
  targetCtx.scale(1, 0.55);
  const gradient = targetCtx.createRadialGradient(0, 0, 0, 0, 0, spread);
  gradient.addColorStop(0, getLightColor(light).replace(", 1)", ", 0.22)"));
  gradient.addColorStop(0.5, getLightColor(light).replace(", 1)", ", 0.08)"));
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  targetCtx.fillStyle = gradient;
  targetCtx.beginPath();
  targetCtx.arc(0, 0, spread, 0, Math.PI * 2);
  targetCtx.fill();
  if (modifier && getModifierFamily(modifier) === "gel") {
    const gelGradient = targetCtx.createRadialGradient(0, 0, 0, 0, 0, spread * 0.75);
    gelGradient.addColorStop(0, "rgba(255, 156, 91, 0.12)");
    gelGradient.addColorStop(0.4, "rgba(159, 86, 255, 0.08)");
    gelGradient.addColorStop(0.7, "rgba(99, 181, 255, 0.06)");
    gelGradient.addColorStop(1, "rgba(0,0,0,0)");
    targetCtx.fillStyle = gelGradient;
    targetCtx.beginPath();
    targetCtx.arc(0, 0, spread * 0.75, 0, Math.PI * 2);
    targetCtx.fill();
  }
  targetCtx.restore();
}
 function drawStudioShadows(targetCtx, metrics) {
  const key = getKeyLight();
  if (!key) {
    return;
  }
  const lightPoint = worldToScene(key.x, key.y, metrics);
  state.items.filter(item => item.type !== "light").forEach(item => {
    const point = worldToScene(item.x, item.y, metrics);
    const dx = point.x - lightPoint.x;
    const dy = point.y - lightPoint.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const nx = dx / length;
    const ny = dy / length;
    const spread = getItemRadiusPx(item, metrics) / Math.max(state.zoom, 0.2);
    targetCtx.save();
    targetCtx.translate(point.x + nx * 28, point.y + ny * 28);
    targetCtx.rotate(Math.atan2(dy, dx));
    targetCtx.fillStyle = "rgba(0,0,0,0.16)";
    targetCtx.beginPath();
    targetCtx.ellipse(0, 0, spread * 1.3, spread * 0.54, 0, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.restore();
  });
}
 function drawCameraIcon(targetCtx, item, metrics) {
  const sizeW = item.w * metrics.scale;
  const sizeH = item.h * metrics.scale;
  const lensX = sizeW * 0.2;
  drawShadowEllipse(targetCtx, sizeW * 0.1, sizeH * 0.24, sizeW * 0.64, sizeH * 0.26, 0.18, 14, -0.08);
  targetCtx.save();
   roundRectPath(targetCtx, -sizeW * 0.48, -sizeH * 0.34, sizeW * 0.8, sizeH * 0.68, 12);
  targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.48, -sizeH * 0.34, sizeW * 0.22, sizeH * 0.34, -0.06);
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
  targetCtx.lineWidth = 1.8;
  targetCtx.stroke();
  drawGlossyPass(targetCtx, -sizeW * 0.48, -sizeH * 0.34, sizeW * 0.8, sizeH * 0.68, 12, 0.2);
   targetCtx.beginPath();
  targetCtx.moveTo(-sizeW * 0.46, -sizeH * 0.12);
  targetCtx.lineTo(-sizeW * 0.58, -sizeH * 0.02);
  targetCtx.lineTo(-sizeW * 0.58, sizeH * 0.26);
  targetCtx.lineTo(-sizeW * 0.46, sizeH * 0.34);
  targetCtx.lineTo(-sizeW * 0.22, sizeH * 0.34);
  targetCtx.lineTo(-sizeW * 0.18, -sizeH * 0.3);
  targetCtx.closePath();
  targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.58, -sizeH * 0.3, -sizeW * 0.14, sizeH * 0.34, 0.06);
  targetCtx.fill();
   targetCtx.beginPath();
  targetCtx.moveTo(-sizeW * 0.1, -sizeH * 0.34);
  targetCtx.lineTo(sizeW * 0.08, -sizeH * 0.5);
  targetCtx.lineTo(sizeW * 0.2, -sizeH * 0.34);
  targetCtx.closePath();
  targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.1, -sizeH * 0.5, sizeW * 0.2, -sizeH * 0.28, 0.12);
  targetCtx.fill();
   roundRectPath(targetCtx, -sizeW * 0.06, -sizeH * 0.42, sizeW * 0.14, sizeH * 0.07, 4);
  targetCtx.fillStyle = 'rgba(22,28,36,0.95)';
  targetCtx.fill();
  drawGlossyPass(targetCtx, -sizeW * 0.06, -sizeH * 0.42, sizeW * 0.14, sizeH * 0.07, 4, 0.18);
   roundRectPath(targetCtx, -sizeW * 0.16, -sizeH * 0.16, sizeW * 0.28, sizeH * 0.22, 8);
  targetCtx.fillStyle = 'rgba(8,12,18,0.92)';
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
  targetCtx.lineWidth = 1.1;
  targetCtx.stroke();
  targetCtx.fillStyle = 'rgba(91,168,245,0.08)';
  roundRectPath(targetCtx, -sizeW * 0.14, -sizeH * 0.14, sizeW * 0.24, sizeH * 0.18, 6);
  targetCtx.fill();
   targetCtx.beginPath();
  targetCtx.ellipse(lensX, 0, sizeH * 0.56, sizeH * 0.5, 0, 0, Math.PI * 2);
  targetCtx.fillStyle = createMetalGradient(targetCtx, lensX - sizeH * 0.56, -sizeH * 0.5, lensX + sizeH * 0.56, sizeH * 0.5, -0.08);
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.8;
  targetCtx.stroke();
  targetCtx.beginPath();
  targetCtx.arc(lensX, 0, sizeH * 0.38, 0, Math.PI * 2);
  targetCtx.strokeStyle = 'rgba(255,255,255,0.1)';
  targetCtx.lineWidth = 2.2;
  targetCtx.stroke();
  drawLensGlass(targetCtx, lensX, 0, sizeH * 0.32, sizeH * 0.28, { innerColor: 'rgba(140,205,255,0.44)' });
  targetCtx.beginPath();
  targetCtx.arc(lensX, 0, sizeH * 0.16, 0, Math.PI * 2);
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.2;
  targetCtx.stroke();
   targetCtx.fillStyle = 'rgba(255,255,255,0.22)';
  targetCtx.beginPath();
  targetCtx.arc(-sizeW * 0.26, sizeH * 0.06, sizeH * 0.045, 0, Math.PI * 2);
  targetCtx.fill();
   targetCtx.strokeStyle = 'rgba(240,165,0,0.22)';
  targetCtx.lineWidth = 5;
  targetCtx.beginPath();
  targetCtx.moveTo(sizeW * 0.26, 0);
  targetCtx.lineTo(sizeW * 1.02, 0);
  targetCtx.stroke();
  targetCtx.strokeStyle = 'rgba(240,165,0,0.96)';
  targetCtx.lineWidth = 2;
  targetCtx.setLineDash([7, 4]);
  targetCtx.beginPath();
  targetCtx.moveTo(sizeW * 0.26, 0);
  targetCtx.lineTo(sizeW * 1.02, 0);
  targetCtx.stroke();
  targetCtx.setLineDash([]);
  targetCtx.restore();
}
 function getSubjectPalette(gender) {
  const palettes = {
    female: {
      skin: { r: 239, g: 199, b: 176 },
      outfit: { r: 147, g: 92, b: 124 },
      hair: "#4b342d",
      accent: "#f2d8cb",
      shoe: "#14181d"
    },
    child: {
      skin: { r: 244, g: 213, b: 190 },
      outfit: { r: 88, g: 120, b: 192 },
      hair: "#6c4a32",
      accent: "#d6ebff",
      shoe: "#1a2230"
    },
    neutral: {
      skin: { r: 228, g: 189, b: 166 },
      outfit: { r: 113, g: 110, b: 136 },
      hair: "#4a362d",
      accent: "#ebe3d9",
      shoe: "#161a20"
    },
    male: {
      skin: { r: 217, g: 174, b: 147 },
      outfit: { r: 59, g: 87, b: 122 },
      hair: "#3c2d29",
      accent: "#d8e2ef",
      shoe: "#14181d"
    }
  };
  return palettes[gender] || palettes.neutral;
}
 function getSubjectBuild(gender) {
  const builds = {
    female: { overall: 0.98, head: 1.02, shoulder: 0.92, waist: 0.66, hip: 1.04, arm: 0.96, leg: 1.04, stance: 0.94 },
    male: { overall: 1.02, head: 0.98, shoulder: 1.06, waist: 0.78, hip: 0.86, arm: 1.02, leg: 1.02, stance: 1.04 },
    child: { overall: 0.78, head: 1.18, shoulder: 0.8, waist: 0.84, hip: 0.92, arm: 0.84, leg: 0.82, stance: 0.82 },
    neutral: { overall: 1, head: 1, shoulder: 0.98, waist: 0.74, hip: 0.92, arm: 1, leg: 1, stance: 0.96 }
  };
  return builds[gender] || builds.neutral;
}
 function drawTopSubjectIcon(targetCtx, item, metrics) {
  const pose = item.pose || 'standing';
  const baseSize = Math.max(item.w, item.h) * metrics.scale;
   function drawSingleFigure(offsetX, scaleFactor, genderKey, figurePose) {
    const palette = getSubjectPalette(genderKey);
    const build = getSubjectBuild(genderKey);
    const figureSize = baseSize * scaleFactor * build.overall;
    const shoulderW = figureSize * 0.16 * build.shoulder;
    const ribW = shoulderW * 0.92;
    const waistW = shoulderW * build.waist;
    const hipW = shoulderW * build.hip;
    const headR = figureSize * 0.105 * build.head * (figurePose === 'bust' ? 1.06 : 1);
    const headY = -figureSize * (figurePose === 'bust' ? 0.43 : 0.56);
    const shoulderY = headY + headR * 1.28;
    const chestY = shoulderY + figureSize * 0.07;
    const waistY = shoulderY + figureSize * (figurePose === 'bust' ? 0.1 : 0.18);
    const pelvisY = shoulderY + figureSize * (figurePose === 'bust' ? 0.14 : figurePose === 'seated' ? 0.26 : 0.32);
    const kneeY = shoulderY + figureSize * (figurePose === 'seated' ? 0.4 : 0.52);
    const ankleY = shoulderY + figureSize * (figurePose === 'seated' ? 0.56 : 0.72);
    const stance = figureSize * 0.1 * build.stance;
    const bodyGrad = targetCtx.createLinearGradient(offsetX - shoulderW, shoulderY, offsetX + shoulderW, pelvisY);
    bodyGrad.addColorStop(0, rgbString(darken(palette.outfit, 0.2)));
    bodyGrad.addColorStop(0.45, rgbString(palette.outfit));
    bodyGrad.addColorStop(1, rgbString(darken(palette.outfit, 0.08)));
    const headGrad = targetCtx.createRadialGradient(offsetX - headR * 0.24, headY - headR * 0.26, headR * 0.14, offsetX, headY, headR * 1.08);
    headGrad.addColorStop(0, rgbString(mixColor(palette.skin, { r: 255, g: 240, b: 226 }, 0.26)));
    headGrad.addColorStop(1, rgbString(darken(palette.skin, 0.08)));
     drawShadowEllipse(targetCtx, offsetX + figureSize * 0.03, figurePose === 'bust' ? pelvisY + figureSize * 0.08 : figurePose === 'seated' ? ankleY - figureSize * 0.02 : ankleY + figureSize * 0.04, figurePose === 'bust' ? figureSize * 0.2 : figurePose === 'seated' ? figureSize * 0.28 : figureSize * 0.24, figureSize * 0.09, 0.16, 10, 0);
     if (figurePose !== 'bust') {
      targetCtx.fillStyle = rgbString(palette.skin, 0.92);
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - shoulderW * 1.02, chestY + figureSize * 0.04, figureSize * 0.048, figureSize * 0.15, 0.42, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + shoulderW * 1.02, chestY + figureSize * 0.04, figureSize * 0.048, figureSize * 0.15, -0.42, 0, Math.PI * 2);
      targetCtx.fill();
    }
     targetCtx.fillStyle = bodyGrad;
    targetCtx.beginPath();
    targetCtx.moveTo(offsetX - shoulderW, shoulderY);
    targetCtx.quadraticCurveTo(offsetX - ribW * 1.02, chestY, offsetX - waistW, waistY);
    targetCtx.quadraticCurveTo(offsetX - hipW * 1.06, pelvisY - figureSize * 0.03, offsetX - hipW, pelvisY);
    targetCtx.lineTo(offsetX + hipW, pelvisY);
    targetCtx.quadraticCurveTo(offsetX + hipW * 1.06, pelvisY - figureSize * 0.03, offsetX + waistW, waistY);
    targetCtx.quadraticCurveTo(offsetX + ribW * 1.02, chestY, offsetX + shoulderW, shoulderY);
    targetCtx.quadraticCurveTo(offsetX + headR * 0.44, shoulderY - figureSize * 0.06, offsetX, shoulderY - figureSize * 0.05);
    targetCtx.quadraticCurveTo(offsetX - headR * 0.44, shoulderY - figureSize * 0.06, offsetX - shoulderW, shoulderY);
    targetCtx.closePath();
    targetCtx.fill();
     targetCtx.fillStyle = rgbString(mixColor(palette.outfit, { r: 255, g: 255, b: 255 }, 0.18), 0.34);
    targetCtx.beginPath();
    targetCtx.ellipse(offsetX - shoulderW * 0.18, chestY, figureSize * 0.07, figureSize * 0.18, -0.18, 0, Math.PI * 2);
    targetCtx.fill();
     if (figurePose === 'seated') {
      targetCtx.fillStyle = rgbString(darken(palette.outfit, 0.08));
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - stance * 0.7, kneeY - figureSize * 0.02, figureSize * 0.13, figureSize * 0.09, 0.42, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance * 0.7, kneeY - figureSize * 0.04, figureSize * 0.13, figureSize * 0.09, -0.34, 0, Math.PI * 2);
      targetCtx.fill();
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - stance * 1.04, ankleY - figureSize * 0.02, figureSize * 0.07, figureSize * 0.16, 0.08, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance * 1.04, ankleY - figureSize * 0.04, figureSize * 0.07, figureSize * 0.16, -0.08, 0, Math.PI * 2);
      targetCtx.fill();
      targetCtx.fillStyle = palette.shoe;
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - stance * 1.1, ankleY + figureSize * 0.11, figureSize * 0.08, figureSize * 0.04, 0.08, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance * 1.1, ankleY + figureSize * 0.09, figureSize * 0.08, figureSize * 0.04, -0.08, 0, Math.PI * 2);
      targetCtx.fill();
    } else if (figurePose !== 'bust') {
      targetCtx.fillStyle = rgbString(darken(palette.outfit, 0.1));
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - stance, kneeY - figureSize * 0.01, figureSize * 0.075, figureSize * 0.18, 0.12, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance, kneeY - figureSize * 0.01, figureSize * 0.075, figureSize * 0.18, -0.12, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX - stance * 1.04, ankleY - figureSize * 0.02, figureSize * 0.06, figureSize * 0.14, 0.08, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance * 1.04, ankleY - figureSize * 0.02, figureSize * 0.06, figureSize * 0.14, -0.08, 0, Math.PI * 2);
      targetCtx.fill();
      targetCtx.fillStyle = palette.shoe;
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - stance * 1.08, ankleY + figureSize * 0.12, figureSize * 0.08, figureSize * 0.04, 0.08, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + stance * 1.08, ankleY + figureSize * 0.12, figureSize * 0.08, figureSize * 0.04, -0.08, 0, Math.PI * 2);
      targetCtx.fill();
    }
     targetCtx.fillStyle = rgbString(palette.skin, 0.96);
    roundRectPath(targetCtx, offsetX - headR * 0.34, headY + headR * 0.84, headR * 0.68, headR * 0.44, headR * 0.22);
    targetCtx.fill();
    targetCtx.fillStyle = headGrad;
    targetCtx.beginPath();
    targetCtx.ellipse(offsetX, headY, headR * 0.94, headR * 1.06, 0, 0, Math.PI * 2);
    targetCtx.fill();
     targetCtx.fillStyle = palette.hair;
    targetCtx.beginPath();
    targetCtx.arc(offsetX, headY - headR * 0.08, headR * 1.04, Math.PI * 0.96, Math.PI * 2.05);
    targetCtx.lineTo(offsetX + headR * 0.78, headY + headR * (genderKey === 'female' ? 0.36 : 0.16));
    targetCtx.quadraticCurveTo(offsetX, headY + headR * (genderKey === 'female' ? 0.64 : 0.28), offsetX - headR * 0.78, headY + headR * (genderKey === 'female' ? 0.36 : 0.16));
    targetCtx.closePath();
    targetCtx.fill();
    if (genderKey === 'female' || figurePose === 'bust') {
      targetCtx.beginPath();
      targetCtx.ellipse(offsetX - headR * 0.76, headY + headR * 0.14, headR * 0.24, headR * 0.52, Math.PI / 12, 0, Math.PI * 2);
      targetCtx.ellipse(offsetX + headR * 0.76, headY + headR * 0.14, headR * 0.24, headR * 0.52, -Math.PI / 12, 0, Math.PI * 2);
      targetCtx.fill();
    }
     targetCtx.fillStyle = 'rgba(255,255,255,0.16)';
    targetCtx.beginPath();
    targetCtx.ellipse(offsetX - headR * 0.22, headY - headR * 0.24, headR * 0.24, headR * 0.14, -0.4, 0, Math.PI * 2);
    targetCtx.fill();
  }
   if (pose === 'couple') {
    drawSingleFigure(-baseSize * 0.19, 0.94, 'female', 'standing');
    drawSingleFigure(baseSize * 0.2, 1, 'male', 'standing');
    return;
  }
   drawSingleFigure(0, 1, item.gender === 'mixed' ? 'neutral' : item.gender, pose);
}
 function drawLightIcon(targetCtx, item, metrics) {
  const size = Math.max(item.w, item.h) * metrics.scale;
  const variant = getModifierFamily(item);
  const lightColor = getLightColor(item);
  drawShadowEllipse(targetCtx, size * 0.04, size * 0.2, size * 0.5, size * 0.18, 0.16, 12, -0.08);
  targetCtx.save();
  targetCtx.lineCap = 'round';
   if (variant === 'window') {
    const frameGrad = targetCtx.createLinearGradient(-size * 0.58, -size * 0.16, size * 0.58, size * 0.16);
    frameGrad.addColorStop(0, 'rgba(42,52,66,0.96)');
    frameGrad.addColorStop(1, 'rgba(16,22,28,0.98)');
    roundRectPath(targetCtx, -size * 0.58, -size * 0.16, size * 1.16, size * 0.32, 8);
    targetCtx.fillStyle = frameGrad;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
    targetCtx.lineWidth = 2;
    targetCtx.stroke();
    const pane = targetCtx.createLinearGradient(-size * 0.46, -size * 0.1, size * 0.46, size * 0.1);
    pane.addColorStop(0, 'rgba(210,235,255,0.56)');
    pane.addColorStop(0.5, 'rgba(156,208,255,0.32)');
    pane.addColorStop(1, 'rgba(112,182,255,0.48)');
    roundRectPath(targetCtx, -size * 0.48, -size * 0.1, size * 0.96, size * 0.2, 6);
    targetCtx.fillStyle = pane;
    targetCtx.fill();
    drawGlowDisc(targetCtx, 0, 0, size * 0.5, 'rgba(170,220,255,1)', 0.18);
    targetCtx.strokeStyle = 'rgba(255,255,255,0.52)';
    targetCtx.lineWidth = 1.6;
    targetCtx.beginPath();
    targetCtx.moveTo(0, -size * 0.1);
    targetCtx.lineTo(0, size * 0.1);
    targetCtx.moveTo(-size * 0.48, 0);
    targetCtx.lineTo(size * 0.48, 0);
    targetCtx.stroke();
    targetCtx.restore();
    return;
  }
   if (variant === 'sun') {
    drawGlowDisc(targetCtx, 0, 0, size * 0.52, lightColor, 0.34);
    targetCtx.fillStyle = 'rgba(255,218,128,0.98)';
    targetCtx.beginPath();
    targetCtx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,226,151,0.92)';
    targetCtx.lineWidth = 2.2;
    for (let i = 0; i < 8; i += 1) {
      const angle = i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(Math.cos(angle) * size * 0.28, Math.sin(angle) * size * 0.28);
      targetCtx.lineTo(Math.cos(angle) * size * 0.48, Math.sin(angle) * size * 0.48);
      targetCtx.stroke();
    }
    targetCtx.restore();
    return;
  }
   targetCtx.strokeStyle = 'rgba(166,176,188,0.78)';
  targetCtx.lineWidth = 2.4;
  targetCtx.beginPath();
  targetCtx.moveTo(-size * 0.18, size * 0.06);
  targetCtx.lineTo(-size * 0.34, size * 0.26);
  targetCtx.moveTo(-size * 0.18, size * 0.06);
  targetCtx.lineTo(-size * 0.12, size * 0.34);
  targetCtx.moveTo(-size * 0.18, size * 0.06);
  targetCtx.lineTo(0, size * 0.3);
  targetCtx.stroke();
  targetCtx.beginPath();
  targetCtx.moveTo(-size * 0.18, size * 0.06);
  targetCtx.lineTo(-size * 0.18, -size * 0.1);
  targetCtx.strokeStyle = 'rgba(205,214,223,0.9)';
  targetCtx.lineWidth = 2.1;
  targetCtx.stroke();
   if (variant === 'led-panel') {
    roundRectPath(targetCtx, -size * 0.3, -size * 0.22, size * 0.6, size * 0.44, 12);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.3, -size * 0.22, size * 0.3, size * 0.22, -0.02);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.6;
    targetCtx.stroke();
    roundRectPath(targetCtx, -size * 0.23, -size * 0.15, size * 0.46, size * 0.3, 8);
    const inner = targetCtx.createLinearGradient(-size * 0.23, -size * 0.15, size * 0.23, size * 0.15);
    inner.addColorStop(0, 'rgba(255,214,136,0.16)');
    inner.addColorStop(0.48, 'rgba(235,241,246,0.08)');
    inner.addColorStop(1, 'rgba(118,196,255,0.16)');
    targetCtx.fillStyle = inner;
    targetCtx.fill();
    for (let y = -2; y <= 2; y += 1) {
      for (let x = -3; x <= 3; x += 1) {
        targetCtx.fillStyle = (x + y) % 2 === 0 ? 'rgba(255,215,136,0.88)' : 'rgba(132,205,255,0.78)';
        targetCtx.beginPath();
        targetCtx.arc(x * size * 0.078, y * size * 0.07, size * 0.026, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }
  } else if (variant === 'fresnel') {
    roundRectPath(targetCtx, -size * 0.22, -size * 0.16, size * 0.24, size * 0.32, 8);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.22, -size * 0.16, size * 0.02, size * 0.16, -0.08);
    targetCtx.fill();
    targetCtx.beginPath();
    targetCtx.ellipse(size * 0.12, 0, size * 0.2, size * 0.18, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.06, -size * 0.18, size * 0.28, size * 0.18, 0.06);
    targetCtx.fill();
    drawGlowDisc(targetCtx, size * 0.16, 0, size * 0.2, lightColor, 0.14);
    drawLensGlass(targetCtx, size * 0.16, 0, size * 0.12, size * 0.11, { innerColor: withAlpha(lightColor, 0.36) });
    targetCtx.strokeStyle = withAlpha(lightColor, 0.44);
    targetCtx.lineWidth = 1.1;
    for (let ring = 1; ring <= 3; ring += 1) {
      targetCtx.beginPath();
      targetCtx.arc(size * 0.16, 0, size * (0.045 + ring * 0.032), 0, Math.PI * 2);
      targetCtx.stroke();
    }
  } else if (variant === 'speedlight') {
    roundRectPath(targetCtx, -size * 0.12, -size * 0.14, size * 0.18, size * 0.3, 6);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.12, -size * 0.14, size * 0.06, size * 0.16, -0.08);
    targetCtx.fill();
    roundRectPath(targetCtx, -size * 0.02, -size * 0.26, size * 0.32, size * 0.16, 4);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.02, -size * 0.26, size * 0.3, -size * 0.1, 0.08);
    targetCtx.fill();
    drawGlowDisc(targetCtx, size * 0.24, -size * 0.18, size * 0.12, lightColor, 0.14);
    roundRectPath(targetCtx, size * 0.12, -size * 0.22, size * 0.14, size * 0.08, 2);
    targetCtx.fillStyle = withAlpha(lightColor, 0.34);
    targetCtx.fill();
  } else if (variant === 'torch') {
    roundRectPath(targetCtx, -size * 0.24, -size * 0.12, size * 0.4, size * 0.24, 10);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.24, -size * 0.12, size * 0.16, size * 0.12, -0.08);
    targetCtx.fill();
    targetCtx.beginPath();
    targetCtx.ellipse(size * 0.18, 0, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, size * 0.06, -size * 0.1, size * 0.3, size * 0.1, 0.18);
    targetCtx.fill();
    drawGlowDisc(targetCtx, size * 0.2, 0, size * 0.14, lightColor, 0.16);
    drawLensGlass(targetCtx, size * 0.2, 0, size * 0.075, size * 0.065, { innerColor: withAlpha(lightColor, 0.34) });
  } else {
    roundRectPath(targetCtx, -size * 0.2, -size * 0.16, size * 0.34, size * 0.32, 10);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -size * 0.2, -size * 0.16, size * 0.14, size * 0.16, -0.06);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.4;
    targetCtx.stroke();
    targetCtx.beginPath();
    targetCtx.ellipse(size * 0.16, 0, size * 0.14, size * 0.12, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, size * 0.02, -size * 0.12, size * 0.3, size * 0.12, 0.18);
    targetCtx.fill();
    drawGlowDisc(targetCtx, size * 0.18, 0, size * 0.16, lightColor, 0.18);
    drawLensGlass(targetCtx, size * 0.18, 0, size * 0.09, size * 0.08, { innerColor: withAlpha(lightColor, 0.36) });
    targetCtx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let i = -1; i <= 1; i += 1) {
      targetCtx.fillRect(-size * 0.14, i * size * 0.06, size * 0.08, 2);
    }
  }
  targetCtx.restore();
}
 function drawModifierIcon(targetCtx, item, metrics) {
  const sizeW = item.w * metrics.scale;
  const sizeH = item.h * metrics.scale;
  const family = getModifierFamily(item);
  const attachedLight = item.mountLight ? item : getAttachedLightForModifier(item);
  const hasMountedLight = !!attachedLight;
  const lightColor = getLightColor(attachedLight || item);
  drawShadowEllipse(targetCtx, sizeW * 0.04, sizeH * 0.24, Math.max(sizeW, sizeH) * 0.34, Math.max(sizeW, sizeH) * 0.14, 0.16, 12, -0.08);
  targetCtx.save();
   if (hasMountedLight) {
    roundRectPath(targetCtx, -sizeW * 0.12, sizeH * 0.04, sizeW * 0.24, sizeH * 0.22, 7);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.12, sizeH * 0.04, sizeW * 0.12, sizeH * 0.26, -0.08);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.1)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    targetCtx.beginPath();
    targetCtx.moveTo(0, sizeH * 0.16);
    targetCtx.lineTo(0, sizeH * 0.42);
    targetCtx.strokeStyle = 'rgba(182,192,204,0.72)';
    targetCtx.lineWidth = 2;
    targetCtx.stroke();
    drawGlowDisc(targetCtx, 0, sizeH * 0.15, Math.max(8, Math.min(sizeW, sizeH) * 0.16), lightColor, 0.18);
  }
   if (family === 'octobox') {
    octagonPath(targetCtx, 0, 0, sizeW * 0.38, sizeH * 0.34);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.38, -sizeH * 0.34, sizeW * 0.38, sizeH * 0.34, -0.02);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.8;
    targetCtx.stroke();
    octagonPath(targetCtx, 0, 0, sizeW * 0.28, sizeH * 0.24);
    const inner = targetCtx.createRadialGradient(0, 0, 0, 0, 0, sizeW * 0.34);
    inner.addColorStop(0, hasMountedLight ? withAlpha(lightColor, 0.22) : 'rgba(255,255,255,0.08)');
    inner.addColorStop(0.58, 'rgba(255,255,255,0.05)');
    inner.addColorStop(1, 'rgba(0,0,0,0.22)');
    targetCtx.fillStyle = inner;
    targetCtx.fill();
    for (let i = 0; i < 8; i += 1) {
      const angle = Math.PI / 8 + i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(0, 0);
      targetCtx.lineTo(Math.cos(angle) * sizeW * 0.3, Math.sin(angle) * sizeH * 0.26);
      targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
      targetCtx.lineWidth = 1;
      targetCtx.stroke();
    }
  } else if (family === 'softbox' || family === 'strip-box' || family === 'grid' || family === 'gel' || family === 'flag' || family === 'barn-doors') {
    const widthPx = family === 'strip-box' ? sizeW * 0.42 : family === 'flag' ? sizeW * 0.34 : sizeW * 0.72;
    const heightPx = family === 'strip-box' ? sizeH * 0.94 : family === 'flag' ? sizeH * 0.86 : sizeH * 0.62;
    roundRectPath(targetCtx, -widthPx / 2, -heightPx / 2, widthPx, heightPx, 12);
    targetCtx.fillStyle = family === 'flag' ? 'rgba(14,18,22,0.98)' : createMetalGradient(targetCtx, -widthPx / 2, -heightPx / 2, widthPx / 2, heightPx / 2, -0.04);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.6;
    targetCtx.stroke();
    if (family !== 'flag' && family !== 'barn-doors') {
      roundRectPath(targetCtx, -widthPx * 0.36, -heightPx * 0.34, widthPx * 0.72, heightPx * 0.68, 9);
      const panel = targetCtx.createLinearGradient(-widthPx * 0.36, -heightPx * 0.34, widthPx * 0.36, heightPx * 0.34);
      panel.addColorStop(0, hasMountedLight ? withAlpha(lightColor, 0.18) : 'rgba(255,255,255,0.08)');
      panel.addColorStop(0.46, 'rgba(246,248,250,0.1)');
      panel.addColorStop(1, 'rgba(255,255,255,0.04)');
      targetCtx.fillStyle = panel;
      targetCtx.fill();
      drawGlossyPass(targetCtx, -widthPx * 0.36, -heightPx * 0.34, widthPx * 0.72, heightPx * 0.68, 9, 0.12);
    }
    if (family === 'grid') {
      targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
      targetCtx.lineWidth = 1;
      for (let step = -2; step <= 2; step += 1) {
        targetCtx.beginPath();
        targetCtx.moveTo(step * widthPx * 0.12, -heightPx * 0.34);
        targetCtx.lineTo(step * widthPx * 0.12, heightPx * 0.34);
        targetCtx.moveTo(-widthPx * 0.34, step * heightPx * 0.12);
        targetCtx.lineTo(widthPx * 0.34, step * heightPx * 0.12);
        targetCtx.stroke();
      }
    }
    if (family === 'gel') {
      const gel = targetCtx.createLinearGradient(-widthPx / 2, -heightPx / 2, widthPx / 2, heightPx / 2);
      gel.addColorStop(0, 'rgba(255,174,97,0.74)');
      gel.addColorStop(0.5, 'rgba(163,84,245,0.66)');
      gel.addColorStop(1, 'rgba(104,194,255,0.72)');
      roundRectPath(targetCtx, -widthPx * 0.31, -heightPx * 0.3, widthPx * 0.62, heightPx * 0.6, 8);
      targetCtx.fillStyle = gel;
      targetCtx.fill();
    }
    if (family === 'barn-doors') {
      roundRectPath(targetCtx, -widthPx * 0.2, -heightPx * 0.18, widthPx * 0.4, heightPx * 0.36, 8);
      targetCtx.fillStyle = createMetalGradient(targetCtx, -widthPx * 0.2, -heightPx * 0.18, widthPx * 0.2, heightPx * 0.18, -0.12);
      targetCtx.fill();
      drawGlowDisc(targetCtx, 0, 0, Math.max(widthPx, heightPx) * 0.16, lightColor, hasMountedLight ? 0.16 : 0.08);
      targetCtx.fillStyle = 'rgba(12,15,19,0.96)';
      targetCtx.beginPath();
      targetCtx.moveTo(-widthPx * 0.18, 0);
      targetCtx.lineTo(-widthPx * 0.46, -heightPx * 0.22);
      targetCtx.lineTo(-widthPx * 0.44, heightPx * 0.22);
      targetCtx.closePath();
      targetCtx.fill();
      targetCtx.beginPath();
      targetCtx.moveTo(widthPx * 0.18, 0);
      targetCtx.lineTo(widthPx * 0.46, -heightPx * 0.22);
      targetCtx.lineTo(widthPx * 0.44, heightPx * 0.22);
      targetCtx.closePath();
      targetCtx.fill();
    }
  } else if (family === 'beauty-dish' || family === 'reflector' || family === 'parabolic' || family === 'ring-flash') {
    const radiusX = family === 'parabolic' ? sizeW * 0.42 : family === 'reflector' ? sizeW * 0.34 : sizeW * 0.28;
    const radiusY = family === 'parabolic' ? sizeH * 0.34 : family === 'reflector' ? sizeH * 0.24 : sizeH * 0.28;
    const bowl = targetCtx.createRadialGradient(-radiusX * 0.18, -radiusY * 0.26, 0, 0, 0, radiusX);
    bowl.addColorStop(0, family === 'reflector' ? 'rgba(255,255,255,0.46)' : 'rgba(178,188,200,0.18)');
    bowl.addColorStop(0.42, family === 'reflector' ? 'rgba(200,208,216,0.92)' : 'rgba(44,50,58,0.98)');
    bowl.addColorStop(1, family === 'reflector' ? 'rgba(122,132,145,0.96)' : 'rgba(16,20,26,1)');
    targetCtx.beginPath();
    targetCtx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = bowl;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
    targetCtx.lineWidth = 1.6;
    targetCtx.stroke();
    if (family === 'ring-flash') {
      targetCtx.strokeStyle = hasMountedLight ? withAlpha(lightColor, 0.88) : 'rgba(255,229,184,0.84)';
      targetCtx.lineWidth = Math.max(6, sizeW * 0.09);
      targetCtx.beginPath();
      targetCtx.arc(0, 0, sizeW * 0.18, 0, Math.PI * 2);
      targetCtx.stroke();
    } else {
      targetCtx.beginPath();
      targetCtx.arc(0, 0, family === 'parabolic' ? sizeW * 0.08 : sizeW * 0.06, 0, Math.PI * 2);
      targetCtx.fillStyle = hasMountedLight ? withAlpha(lightColor, 0.2) : 'rgba(12,15,19,0.96)';
      targetCtx.fill();
    }
    if (family === 'parabolic') {
      targetCtx.strokeStyle = 'rgba(255,255,255,0.1)';
      targetCtx.lineWidth = 1;
      for (let t = -2; t <= 2; t += 1) {
        targetCtx.beginPath();
        targetCtx.moveTo(t * sizeW * 0.08, -radiusY * 0.82);
        targetCtx.quadraticCurveTo(t * sizeW * 0.02, 0, t * sizeW * 0.08, radiusY * 0.82);
        targetCtx.stroke();
      }
    }
  } else if (family === 'snoot') {
    targetCtx.beginPath();
    targetCtx.moveTo(-sizeW * 0.08, -sizeH * 0.28);
    targetCtx.lineTo(sizeW * 0.06, -sizeH * 0.2);
    targetCtx.lineTo(sizeW * 0.28, sizeH * 0.18);
    targetCtx.lineTo(-sizeW * 0.24, sizeH * 0.12);
    targetCtx.closePath();
    targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.24, -sizeH * 0.28, sizeW * 0.28, sizeH * 0.18, -0.08);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.4;
    targetCtx.stroke();
    drawGlowDisc(targetCtx, sizeW * 0.18, 0, sizeW * 0.12, lightColor, hasMountedLight ? 0.18 : 0.08);
  } else {
    roundRectPath(targetCtx, -sizeW * 0.34, -sizeH * 0.24, sizeW * 0.68, sizeH * 0.48, 10);
    targetCtx.fillStyle = createMetalGradient(targetCtx, -sizeW * 0.34, -sizeH * 0.24, sizeW * 0.34, sizeH * 0.24, -0.04);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.4;
    targetCtx.stroke();
  }
   if (hasMountedLight) {
    drawGlowDisc(targetCtx, 0, 0, Math.max(sizeW, sizeH) * 0.28, lightColor, 0.12);
  }
  targetCtx.restore();
}
 function drawBackdropIcon(targetCtx, item, metrics) {
  const width = item.w * metrics.scale;
  const depth = Math.max(18, width * 0.16);
  const panelColor = getBackdropColor(item);
  drawShadowEllipse(targetCtx, 0, depth * 0.46, width * 0.42, depth * 0.34, 0.12, 12, 0);
  targetCtx.save();
  targetCtx.strokeStyle = 'rgba(212,220,229,0.78)';
  targetCtx.lineWidth = 2.2;
  targetCtx.beginPath();
  targetCtx.moveTo(-width / 2, -depth * 0.04);
  targetCtx.lineTo(width / 2, -depth * 0.04);
  targetCtx.stroke();
  targetCtx.beginPath();
  targetCtx.moveTo(-width / 2, -depth * 0.04);
  targetCtx.lineTo(-width / 2 - 2, depth * 0.82);
  targetCtx.moveTo(width / 2, -depth * 0.04);
  targetCtx.lineTo(width / 2 + 2, depth * 0.82);
  targetCtx.strokeStyle = 'rgba(152,164,177,0.76)';
  targetCtx.lineWidth = 2;
  targetCtx.stroke();
  const paper = targetCtx.createLinearGradient(-width / 2, -depth * 0.08, width / 2, depth);
  paper.addColorStop(0, panelColor.replace('0.94', '0.98').replace('0.96', '0.98').replace('0.92', '0.98'));
  paper.addColorStop(0.58, panelColor);
  paper.addColorStop(1, 'rgba(0,0,0,0.06)');
  targetCtx.beginPath();
  targetCtx.moveTo(-width * 0.48, 0);
  targetCtx.lineTo(width * 0.48, 0);
  targetCtx.lineTo(width * 0.38, depth * 0.88);
  targetCtx.lineTo(-width * 0.38, depth * 0.88);
  targetCtx.closePath();
  targetCtx.fillStyle = paper;
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.2;
  targetCtx.stroke();
  targetCtx.fillStyle = 'rgba(255,255,255,0.14)';
  targetCtx.beginPath();
  targetCtx.ellipse(-width * 0.12, depth * 0.18, width * 0.16, depth * 0.12, -0.18, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
 function drawFovCone(targetCtx, item, metrics) {
  if (item.type !== "camera") return;
  const center = worldToScene(item.x, item.y, metrics);
  const angle = degToRad(item.rotation);
  const fov = degToRad(getLensAngle(item));
  const length = metrics.scale * 2.4;
  targetCtx.save();
  targetCtx.translate(center.x, center.y);
  targetCtx.fillStyle = "rgba(91, 168, 245, 0.08)";
  targetCtx.strokeStyle = "rgba(91, 168, 245, 0.34)";
  targetCtx.beginPath();
  targetCtx.moveTo(0, 0);
  targetCtx.arc(0, 0, length, angle - fov / 2, angle + fov / 2);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.stroke();
  targetCtx.restore();
}
 function drawItemTopDown(targetCtx, item, metrics) {
  const point = worldToScene(item.x, item.y, metrics);
  targetCtx.save();
  targetCtx.translate(point.x, point.y);
  targetCtx.rotate(degToRad(item.rotation));
  if (item.type === "camera") drawCameraIcon(targetCtx, item, metrics);
  else if (item.type === "subject") drawTopSubjectIcon(targetCtx, item, metrics);
  else if (item.type === "light") drawLightIcon(targetCtx, item, metrics);
  else if (item.type === "modifier") drawModifierIcon(targetCtx, item, metrics);
  else if (item.type === "backdrop") drawBackdropIcon(targetCtx, item, metrics);
  targetCtx.restore();
}
 function drawItemLabels(targetCtx, metrics) {
  targetCtx.save();
  targetCtx.textAlign = "center";
  targetCtx.font = "12px Space Grotesk";
  state.items.forEach(item => {
    const point = worldToScreen(item.x, item.y, metrics);
    targetCtx.fillStyle = "rgba(255,255,255,0.88)";
    targetCtx.fillText(item.name + (item.lens ? " " + item.lens : ""), point.x, point.y + getItemRadiusPx(item, metrics) + 18);
    if (isLightEmitter(item)) {
      const badgeColor = kelvinToRgb(item.colorTemp || 5600);
      targetCtx.fillStyle = rgbString(badgeColor, 0.92);
      roundRectPath(targetCtx, point.x - 28, point.y - getItemRadiusPx(item, metrics) - 32, 56, 20, 10);
      targetCtx.fill();
      targetCtx.fillStyle = "#0b0d10";
      targetCtx.font = "10px DM Mono";
      targetCtx.fillText((item.colorTemp || 5600) + "K", point.x, point.y - getItemRadiusPx(item, metrics) - 18);
      targetCtx.font = "12px Space Grotesk";
    }
  });
  targetCtx.restore();
}
 function drawSelectionOverlay(targetCtx, metrics) {
  const item = getSelectedItem();
  if (!item) return;
  const center = worldToScreen(item.x, item.y, metrics);
  const radius = getItemRadiusPx(item, metrics);
  targetCtx.save();
  targetCtx.strokeStyle = "rgba(240,165,0,0.92)";
  targetCtx.lineWidth = 1.6;
  targetCtx.setLineDash([7, 5]);
  targetCtx.beginPath();
  targetCtx.arc(center.x, center.y, radius + 8, 0, Math.PI * 2);
  targetCtx.stroke();
  targetCtx.setLineDash([]);
  const corners = [
    [center.x - radius, center.y - radius],
    [center.x + radius, center.y - radius],
    [center.x + radius, center.y + radius],
    [center.x - radius, center.y + radius]
  ];
  targetCtx.fillStyle = "#fff5d2";
  corners.forEach(([x, y]) => {
    targetCtx.beginPath();
    targetCtx.rect(x - 4, y - 4, 8, 8);
    targetCtx.fill();
  });
  const handle = getRotationHandle(item, metrics);
  targetCtx.strokeStyle = "rgba(255,255,255,0.3)";
  targetCtx.beginPath();
  targetCtx.moveTo(center.x, center.y);
  targetCtx.lineTo(handle.x, handle.y);
  targetCtx.stroke();
  targetCtx.fillStyle = "rgba(240,165,0,0.98)";
  targetCtx.beginPath();
  targetCtx.arc(handle.x, handle.y, 8, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}  function projectFrontal(item, width, height) {
  const nx = (item.x - state.studio.w / 2) / Math.max(1, state.studio.w / 2);
  const ny = (item.y - state.studio.h / 2) / Math.max(1, state.studio.h / 2);
  return { x: width / 2 + nx * width * 0.32, y: height * 0.78 + ny * height * 0.14, scale: clamp(2.25 + ny * 0.18, 1.8, 2.7) };
}
 function projectLightFrontal(item, width, height) {
  const nx = (item.x - state.studio.w / 2) / Math.max(1, state.studio.w / 2);
  const ny = (item.y - state.studio.h / 2) / Math.max(1, state.studio.h / 2);
  return { x: width / 2 + nx * width * 0.34, y: height * 0.24 + ny * height * 0.12 };
}
 function fillBackdropRegion(targetCtx, x, y, w, h, kind) {
  const surfacePalette = getSurfacePalette(state.studio.surface);
  if (kind === 'vinyl-white') {
    const gradient = targetCtx.createLinearGradient(x, y, x, y + h);
    gradient.addColorStop(0, '#fafbfc');
    gradient.addColorStop(1, '#d6dde6');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
  } else if (kind === 'muslin') {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, '#5a5460');
    gradient.addColorStop(1, '#262930');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
    for (let i = 0; i < 180; i += 1) {
      targetCtx.fillStyle = i % 2 ? 'rgba(255,255,255,0.014)' : 'rgba(0,0,0,0.026)';
      targetCtx.beginPath();
      targetCtx.arc(x + (i * 67 % 1100) / 1100 * w, y + (i * 53 % 1000) / 1000 * h, 2.2, 0, Math.PI * 2);
      targetCtx.fill();
    }
  } else if (kind === 'chroma') {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, '#44d07e');
    gradient.addColorStop(1, '#13834b');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
  } else if (kind === 'outdoor') {
    const sky = targetCtx.createLinearGradient(x, y, x, y + h);
    sky.addColorStop(0, '#7cb7ff');
    sky.addColorStop(0.72, '#d8e5ff');
    sky.addColorStop(0.721, '#9a8f7e');
    sky.addColorStop(1, '#4a3c2d');
    targetCtx.fillStyle = sky;
    targetCtx.fillRect(x, y, w, h);
  } else if (kind === 'paper-gray') {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, '#707985');
    gradient.addColorStop(1, '#2a3139');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
  } else {
    const gradient = targetCtx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, surfacePalette.wallStart);
    gradient.addColorStop(1, surfacePalette.wallEnd);
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(x, y, w, h);
  }
}
 function drawBackdropForView(targetCtx, width, height) {
  const backdrop = getBackdropItem();
  const kind = state.backgroundOverride || backdrop?.background || (state.studio.type === 'outdoor' ? 'outdoor' : 'paper-gray');
  const surfacePalette = getSurfacePalette(state.studio.surface);
  const horizonY = kind === 'outdoor' ? height * 0.66 : height * 0.61;
  fillBackdropRegion(targetCtx, 0, 0, width, horizonY + 28, kind);
  if (kind !== 'outdoor') {
    drawTextureFill(targetCtx, 0, horizonY - 8, width, height - horizonY + 8, state.studio.surface);
  } else {
    const ground = targetCtx.createLinearGradient(0, horizonY - 8, 0, height);
    ground.addColorStop(0, '#827463');
    ground.addColorStop(1, '#403126');
    targetCtx.fillStyle = ground;
    targetCtx.fillRect(0, horizonY - 8, width, height - horizonY + 8);
  }
  const transition = targetCtx.createLinearGradient(0, horizonY - 18, 0, horizonY + 36);
  transition.addColorStop(0, 'rgba(255,255,255,0.14)');
  transition.addColorStop(0.4, 'rgba(255,255,255,0.03)');
  transition.addColorStop(1, 'rgba(0,0,0,0)');
  targetCtx.fillStyle = transition;
  targetCtx.fillRect(0, horizonY - 18, width, 54);
  const floorShade = targetCtx.createLinearGradient(0, horizonY, 0, height);
  floorShade.addColorStop(0, 'rgba(255,255,255,0.02)');
  floorShade.addColorStop(1, 'rgba(0,0,0,0.2)');
  targetCtx.fillStyle = floorShade;
  targetCtx.fillRect(0, horizonY, width, height - horizonY);
  const reflection = targetCtx.createRadialGradient(width / 2, horizonY + 38, 0, width / 2, horizonY + 38, width * 0.42);
  reflection.addColorStop(0, surfacePalette.accent);
  reflection.addColorStop(1, 'rgba(0,0,0,0)');
  targetCtx.fillStyle = reflection;
  targetCtx.fillRect(0, horizonY - 12, width, height - horizonY + 16);
  targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
  targetCtx.lineWidth = 1;
  targetCtx.beginPath();
  targetCtx.moveTo(0, horizonY + 1);
  targetCtx.lineTo(width, horizonY + 1);
  targetCtx.stroke();
}
function getLightViewProjection(width, height) {
  return {
    floorY: height * 0.84,
    xScale: width * 0.34,
    depthScale: height * 0.12,
    heightScale: Math.min(86, height * 0.082),
    subjectZ: 1.18
  };
}
 function projectLightViewPoint(x, y, z, width, height) {
  const projection = getLightViewProjection(width, height);
  const nx = (x - state.studio.w / 2) / Math.max(1, state.studio.w / 2);
  const ny = (y - state.studio.h / 2) / Math.max(1, state.studio.h / 2);
  return {
    x: width / 2 + nx * projection.xScale,
    y: projection.floorY + ny * projection.depthScale - z * projection.heightScale
  };
}
 function getLightViewSizeFactor(item) {
  const ny = (item.y - state.studio.h / 2) / Math.max(1, state.studio.h / 2);
  return clamp(1 + ny * 0.08, 0.92, 1.12);
}
 function getLightViewHeadPoint(item, width, height, headHeight = null) {
  const resolvedHeight = headHeight == null ? Math.max(0.35, item.height || 1.2) : headHeight;
  return projectLightViewPoint(item.x, item.y, resolvedHeight, width, height);
}
 function drawLightViewFloorShadow(targetCtx, item, width, height, radiusX, radiusY, alpha = 0.16) {
  const base = projectLightViewPoint(item.x, item.y, 0, width, height);
  targetCtx.save();
  targetCtx.fillStyle = 'rgba(0,0,0,' + alpha + ')';
  targetCtx.beginPath();
  targetCtx.ellipse(base.x + radiusX * 0.08, base.y + radiusY * 0.18, radiusX, radiusY, -0.1, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
 function drawLightViewStand(targetCtx, item, width, height, options = {}) {
  const factor = getLightViewSizeFactor(item);
  const topHeight = options.topHeight ?? Math.max(0.6, item.height - 0.06);
  const base = projectLightViewPoint(item.x, item.y, 0, width, height);
  const lowerCollar = projectLightViewPoint(item.x, item.y, Math.max(0.14, Math.min(topHeight * 0.22, 0.48)), width, height);
  const upperCollar = projectLightViewPoint(item.x, item.y, Math.max(0.3, Math.min(topHeight * 0.62, topHeight - 0.12)), width, height);
  const head = projectLightViewPoint(item.x, item.y, topHeight, width, height);
  const spread = (options.spread ?? 24) * factor;
  const legDrop = 6 * factor;
  targetCtx.save();
  drawShadowEllipse(targetCtx, base.x + spread * 0.04, base.y + legDrop * 0.78, spread * 0.88, Math.max(3, legDrop * 0.44), 0.1, 10, -0.12);
  targetCtx.lineCap = 'round';
  targetCtx.strokeStyle = 'rgba(10,13,17,0.54)';
  targetCtx.lineWidth = 4.8 * factor;
  targetCtx.beginPath();
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x - spread, base.y + legDrop);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x + spread, base.y + legDrop);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x, base.y + legDrop * 1.18);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(upperCollar.x, upperCollar.y);
  targetCtx.lineTo(head.x, head.y);
  targetCtx.stroke();
   const standGradient = createMetalGradient(targetCtx, lowerCollar.x, lowerCollar.y, head.x + 8, head.y, 0.12);
  targetCtx.strokeStyle = standGradient;
  targetCtx.lineWidth = 2.3 * factor;
  targetCtx.beginPath();
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x - spread, base.y + legDrop);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x + spread, base.y + legDrop);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(base.x, base.y + legDrop * 1.18);
  targetCtx.moveTo(lowerCollar.x, lowerCollar.y);
  targetCtx.lineTo(upperCollar.x, upperCollar.y);
  targetCtx.lineTo(head.x, head.y);
  targetCtx.stroke();
   roundRectPath(targetCtx, lowerCollar.x - 4.6 * factor, lowerCollar.y - 4 * factor, 9.2 * factor, 8 * factor, 3 * factor);
  targetCtx.fillStyle = createMetalGradient(targetCtx, lowerCollar.x - 4.6 * factor, lowerCollar.y - 4 * factor, lowerCollar.x + 4.6 * factor, lowerCollar.y + 4 * factor, 0.18);
  targetCtx.fill();
  roundRectPath(targetCtx, upperCollar.x - 4.2 * factor, upperCollar.y - 3.6 * factor, 8.4 * factor, 7.2 * factor, 3 * factor);
  targetCtx.fillStyle = createMetalGradient(targetCtx, upperCollar.x - 4.2 * factor, upperCollar.y - 3.6 * factor, upperCollar.x + 4.2 * factor, upperCollar.y + 3.6 * factor, 0.1);
  targetCtx.fill();
  targetCtx.fillStyle = 'rgba(248,249,250,0.82)';
  targetCtx.beginPath();
  targetCtx.arc(head.x, head.y, 3.2 * factor, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = 'rgba(255,255,255,0.2)';
  targetCtx.beginPath();
  targetCtx.arc(head.x - 1.3 * factor, head.y - 1.2 * factor, 1.2 * factor, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
  return { base, collar: lowerCollar, upperCollar, head, factor };
}
function drawLightViewBackdropItem(targetCtx, item, width, height) {
  const leftBase = projectLightViewPoint(item.x - item.w / 2, item.y, 0, width, height);
  const rightBase = projectLightViewPoint(item.x + item.w / 2, item.y, 0, width, height);
  const leftTop = projectLightViewPoint(item.x - item.w / 2, item.y, item.height, width, height);
  const rightTop = projectLightViewPoint(item.x + item.w / 2, item.y, item.height, width, height);
  const sweepLeft = projectLightViewPoint(item.x - item.w / 2, item.y, 0.12, width, height);
  const sweepRight = projectLightViewPoint(item.x + item.w / 2, item.y, 0.12, width, height);
  const kind = item.background || 'paper-gray';
  const panelGradient = targetCtx.createLinearGradient((leftTop.x + rightTop.x) / 2, leftTop.y, (leftBase.x + rightBase.x) / 2, leftBase.y);
  if (kind === 'vinyl-white') {
    panelGradient.addColorStop(0, 'rgba(252,252,249,0.98)');
    panelGradient.addColorStop(0.7, 'rgba(228,234,240,0.96)');
    panelGradient.addColorStop(1, 'rgba(202,208,216,0.94)');
  } else if (kind === 'muslin') {
    panelGradient.addColorStop(0, 'rgba(176,152,129,0.98)');
    panelGradient.addColorStop(0.6, 'rgba(126,108,93,0.96)');
    panelGradient.addColorStop(1, 'rgba(80,70,61,0.98)');
  } else if (kind === 'chroma') {
    panelGradient.addColorStop(0, 'rgba(108,206,136,0.98)');
    panelGradient.addColorStop(0.65, 'rgba(60,158,98,0.96)');
    panelGradient.addColorStop(1, 'rgba(29,102,60,0.98)');
  } else {
    panelGradient.addColorStop(0, 'rgba(164,171,180,0.98)');
    panelGradient.addColorStop(0.62, 'rgba(98,106,117,0.96)');
    panelGradient.addColorStop(1, 'rgba(55,62,72,0.98)');
  }
  const sweepGradient = targetCtx.createLinearGradient((leftBase.x + rightBase.x) / 2, leftBase.y, (sweepLeft.x + sweepRight.x) / 2, sweepLeft.y + 26);
  sweepGradient.addColorStop(0, 'rgba(255,255,255,0.08)');
  sweepGradient.addColorStop(1, 'rgba(0,0,0,0.06)');
  drawShadowEllipse(targetCtx, (leftBase.x + rightBase.x) / 2, leftBase.y + 10, Math.abs(rightBase.x - leftBase.x) * 0.46, 12, 0.08, 12, 0);
  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.moveTo(leftBase.x, leftBase.y);
  targetCtx.lineTo(rightBase.x, rightBase.y);
  targetCtx.lineTo(rightTop.x, rightTop.y);
  targetCtx.lineTo(leftTop.x, leftTop.y);
  targetCtx.closePath();
  targetCtx.fillStyle = panelGradient;
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.4;
  targetCtx.stroke();
   targetCtx.beginPath();
  targetCtx.moveTo(leftBase.x, leftBase.y);
  targetCtx.lineTo(rightBase.x, rightBase.y);
  targetCtx.lineTo(sweepRight.x, sweepRight.y + 18);
  targetCtx.lineTo(sweepLeft.x, sweepLeft.y + 18);
  targetCtx.closePath();
  targetCtx.fillStyle = sweepGradient;
  targetCtx.fill();
   targetCtx.strokeStyle = 'rgba(223,229,235,0.86)';
  targetCtx.lineWidth = 2.2;
  targetCtx.beginPath();
  targetCtx.moveTo(leftBase.x, leftBase.y);
  targetCtx.lineTo(leftTop.x, leftTop.y);
  targetCtx.moveTo(rightBase.x, rightBase.y);
  targetCtx.lineTo(rightTop.x, rightTop.y);
  targetCtx.moveTo(leftTop.x, leftTop.y);
  targetCtx.lineTo(rightTop.x, rightTop.y);
  targetCtx.stroke();
   targetCtx.strokeStyle = 'rgba(150,160,171,0.52)';
  targetCtx.lineWidth = 1.2;
  targetCtx.beginPath();
  targetCtx.moveTo(leftBase.x - 9, leftBase.y + 4);
  targetCtx.lineTo(leftTop.x, leftTop.y + 2);
  targetCtx.moveTo(rightBase.x + 9, rightBase.y + 4);
  targetCtx.lineTo(rightTop.x, rightTop.y + 2);
  targetCtx.stroke();
   targetCtx.fillStyle = 'rgba(255,255,255,0.12)';
  targetCtx.beginPath();
  targetCtx.moveTo(leftTop.x + (rightTop.x - leftTop.x) / 2 * 0.24, leftTop.y + 8);
  targetCtx.lineTo(leftTop.x + (rightTop.x - leftTop.x) * 0.48, leftTop.y + 10);
  targetCtx.lineTo(leftBase.x + (rightBase.x - leftBase.x) * 0.42, leftBase.y - 18);
  targetCtx.lineTo(leftBase.x + (rightBase.x - leftBase.x) * 0.08, leftBase.y - 16);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.restore();
}
function drawLightViewCameraItem(targetCtx, item, width, height) {
  const factor = getLightViewSizeFactor(item);
  drawLightViewFloorShadow(targetCtx, item, width, height, 22 * factor, 7 * factor, 0.18);
  const stand = drawLightViewStand(targetCtx, item, width, height, { topHeight: Math.max(0.82, item.height - 0.04), spread: 20 });
  const body = projectLightViewPoint(item.x, item.y, Math.max(0.86, item.height - 0.04), width, height);
  const direction = Math.cos(degToRad(item.rotation || 0)) >= 0 ? 1 : -1;
  targetCtx.save();
  targetCtx.strokeStyle = 'rgba(160,170,182,0.72)';
  targetCtx.lineWidth = 2;
  targetCtx.beginPath();
  targetCtx.moveTo(stand.head.x, stand.head.y);
  targetCtx.lineTo(body.x - direction * 5 * factor, body.y + 4 * factor);
  targetCtx.stroke();
   const bodyW = 34 * factor;
  const bodyH = 20 * factor;
  roundRectPath(targetCtx, body.x - bodyW / 2, body.y - bodyH / 2, bodyW, bodyH, 8 * factor);
  targetCtx.fillStyle = createMetalGradient(targetCtx, body.x - bodyW / 2, body.y - bodyH / 2, body.x + bodyW / 2, body.y + bodyH / 2, -0.04);
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
  targetCtx.lineWidth = 1.4;
  targetCtx.stroke();
  drawGlossyPass(targetCtx, body.x - bodyW / 2, body.y - bodyH / 2, bodyW, bodyH, 8 * factor, 0.14);
   targetCtx.beginPath();
  targetCtx.moveTo(body.x - direction * bodyW * 0.24, body.y - bodyH * 0.5);
  targetCtx.lineTo(body.x - direction * bodyW * 0.08, body.y - bodyH * 0.84);
  targetCtx.lineTo(body.x + direction * bodyW * 0.04, body.y - bodyH * 0.5);
  targetCtx.closePath();
  targetCtx.fillStyle = createMetalGradient(targetCtx, body.x - bodyW * 0.16, body.y - bodyH * 0.84, body.x + bodyW * 0.08, body.y - bodyH * 0.46, 0.12);
  targetCtx.fill();
   targetCtx.beginPath();
  targetCtx.moveTo(body.x - direction * bodyW * 0.5, body.y - bodyH * 0.14);
  targetCtx.lineTo(body.x - direction * bodyW * 0.66, body.y - bodyH * 0.02);
  targetCtx.lineTo(body.x - direction * bodyW * 0.64, body.y + bodyH * 0.32);
  targetCtx.lineTo(body.x - direction * bodyW * 0.44, body.y + bodyH * 0.46);
  targetCtx.lineTo(body.x - direction * bodyW * 0.22, body.y + bodyH * 0.46);
  targetCtx.lineTo(body.x - direction * bodyW * 0.2, body.y - bodyH * 0.4);
  targetCtx.closePath();
  targetCtx.fillStyle = createMetalGradient(targetCtx, body.x - bodyW * 0.66, body.y - bodyH * 0.12, body.x - bodyW * 0.16, body.y + bodyH * 0.46, 0.02);
  targetCtx.fill();
   const lensBodyX = direction > 0 ? body.x + bodyW * 0.08 : body.x - bodyW * 0.08 - 24 * factor;
  roundRectPath(targetCtx, lensBodyX, body.y - 7 * factor, 24 * factor, 14 * factor, 6 * factor);
  targetCtx.fillStyle = createMetalGradient(targetCtx, lensBodyX, body.y - 7 * factor, lensBodyX + 24 * factor, body.y + 7 * factor, 0.12);
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.1;
  targetCtx.stroke();
  const frontX = body.x + direction * (bodyW * 0.46 + 6 * factor);
  targetCtx.beginPath();
  targetCtx.ellipse(frontX, body.y, 7 * factor, 7 * factor, 0, 0, Math.PI * 2);
  targetCtx.fillStyle = createMetalGradient(targetCtx, frontX - 7 * factor, body.y - 7 * factor, frontX + 7 * factor, body.y + 7 * factor, 0.2);
  targetCtx.fill();
  drawLensGlass(targetCtx, frontX, body.y, 5.2 * factor, 5.2 * factor, { innerColor: 'rgba(132,205,255,0.42)' });
  targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  targetCtx.lineWidth = 1.2;
  targetCtx.beginPath();
  targetCtx.arc(frontX, body.y, 3.2 * factor, 0, Math.PI * 2);
  targetCtx.stroke();
   roundRectPath(targetCtx, body.x - direction * 3 * factor, body.y - bodyH * 0.72, 8 * factor, 3.4 * factor, 2);
  targetCtx.fillStyle = 'rgba(15,18,23,0.92)';
  targetCtx.fill();
   targetCtx.strokeStyle = 'rgba(240,165,0,0.22)';
  targetCtx.lineWidth = 4;
  targetCtx.beginPath();
  targetCtx.moveTo(frontX + direction * 2 * factor, body.y);
  targetCtx.lineTo(frontX + direction * 22 * factor, body.y - 2 * factor);
  targetCtx.stroke();
  targetCtx.strokeStyle = 'rgba(240,165,0,0.94)';
  targetCtx.lineWidth = 1.6;
  targetCtx.beginPath();
  targetCtx.moveTo(frontX + direction * 2 * factor, body.y);
  targetCtx.lineTo(frontX + direction * 22 * factor, body.y - 2 * factor);
  targetCtx.stroke();
  targetCtx.restore();
}
function drawLightViewLightItem(targetCtx, item, width, height) {
  const variant = getModifierFamily(item);
  const factor = getLightViewSizeFactor(item);
  const lightColor = getLightColor(item);
  if (variant === 'sun') {
    const point = projectLightViewPoint(item.x, item.y, item.height, width, height);
    targetCtx.save();
    drawGlowDisc(targetCtx, point.x, point.y, 34 * factor, lightColor, 0.26);
    targetCtx.fillStyle = 'rgba(255,220,132,0.98)';
    targetCtx.beginPath();
    targetCtx.arc(point.x, point.y, 14 * factor, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,232,166,0.92)';
    targetCtx.lineWidth = 2;
    for (let i = 0; i < 8; i += 1) {
      const angle = i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(point.x + Math.cos(angle) * 18 * factor, point.y + Math.sin(angle) * 18 * factor);
      targetCtx.lineTo(point.x + Math.cos(angle) * 30 * factor, point.y + Math.sin(angle) * 30 * factor);
      targetCtx.stroke();
    }
    targetCtx.restore();
    return;
  }
  if (variant === 'window') {
    const leftBase = projectLightViewPoint(item.x - item.w / 2, item.y, 0.24, width, height);
    const rightBase = projectLightViewPoint(item.x + item.w / 2, item.y, 0.24, width, height);
    const leftTop = projectLightViewPoint(item.x - item.w / 2, item.y, Math.max(2.1, item.height), width, height);
    const rightTop = projectLightViewPoint(item.x + item.w / 2, item.y, Math.max(2.1, item.height), width, height);
    targetCtx.save();
    const frame = targetCtx.createLinearGradient(leftBase.x, leftTop.y, rightBase.x, rightBase.y);
    frame.addColorStop(0, 'rgba(36,48,61,0.98)');
    frame.addColorStop(1, 'rgba(14,18,23,0.98)');
    targetCtx.beginPath();
    targetCtx.moveTo(leftBase.x, leftBase.y);
    targetCtx.lineTo(rightBase.x, rightBase.y);
    targetCtx.lineTo(rightTop.x, rightTop.y);
    targetCtx.lineTo(leftTop.x, leftTop.y);
    targetCtx.closePath();
    targetCtx.fillStyle = frame;
    targetCtx.fill();
    const pane = targetCtx.createLinearGradient(leftBase.x, leftTop.y, rightBase.x, rightBase.y);
    pane.addColorStop(0, 'rgba(210,235,255,0.52)');
    pane.addColorStop(0.6, 'rgba(162,210,255,0.22)');
    pane.addColorStop(1, 'rgba(116,189,255,0.38)');
    targetCtx.beginPath();
    targetCtx.moveTo(leftBase.x + 4, leftBase.y - 4);
    targetCtx.lineTo(rightBase.x - 4, rightBase.y - 4);
    targetCtx.lineTo(rightTop.x - 4, rightTop.y + 4);
    targetCtx.lineTo(leftTop.x + 4, leftTop.y + 4);
    targetCtx.closePath();
    targetCtx.fillStyle = pane;
    targetCtx.fill();
    drawGlowDisc(targetCtx, (leftBase.x + rightBase.x) / 2, (leftBase.y + leftTop.y) / 2, 48 * factor, 'rgba(176,220,255,1)', 0.12);
    targetCtx.strokeStyle = 'rgba(236,244,252,0.76)';
    targetCtx.lineWidth = 2;
    targetCtx.stroke();
    const midTop = projectLightViewPoint(item.x, item.y, Math.max(2.1, item.height), width, height);
    const midBase = projectLightViewPoint(item.x, item.y, 0.24, width, height);
    targetCtx.beginPath();
    targetCtx.moveTo(midBase.x, midBase.y);
    targetCtx.lineTo(midTop.x, midTop.y);
    targetCtx.moveTo(leftBase.x, (leftBase.y + leftTop.y) / 2);
    targetCtx.lineTo(rightBase.x, (rightBase.y + rightTop.y) / 2);
    targetCtx.stroke();
    targetCtx.restore();
    return;
  }
   drawLightViewFloorShadow(targetCtx, item, width, height, 17 * factor, 6 * factor, 0.17);
  const stand = drawLightViewStand(targetCtx, item, width, height, { topHeight: Math.max(0.72, item.height - 0.04), spread: 18 });
  const head = stand.head;
  const direction = Math.cos(degToRad(item.rotation || 0)) >= 0 ? 1 : -1;
  const emitterX = head.x + direction * 12 * factor;
  const bodyX = head.x - direction * 6 * factor;
  targetCtx.save();
  targetCtx.strokeStyle = 'rgba(168,178,190,0.72)';
  targetCtx.lineWidth = 1.8;
  targetCtx.beginPath();
  targetCtx.moveTo(stand.head.x, stand.head.y);
  targetCtx.lineTo(bodyX, head.y + 2 * factor);
  targetCtx.stroke();
   if (variant === 'led-panel') {
    roundRectPath(targetCtx, bodyX - 18 * factor, head.y - 15 * factor, 36 * factor, 30 * factor, 8 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 18 * factor, head.y - 15 * factor, bodyX + 18 * factor, head.y + 15 * factor, -0.04);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    roundRectPath(targetCtx, bodyX - 14 * factor, head.y - 11 * factor, 28 * factor, 22 * factor, 5 * factor);
    const panel = targetCtx.createLinearGradient(bodyX - 14 * factor, head.y - 11 * factor, bodyX + 14 * factor, head.y + 11 * factor);
    panel.addColorStop(0, 'rgba(255,220,146,0.16)');
    panel.addColorStop(0.5, 'rgba(238,243,248,0.1)');
    panel.addColorStop(1, 'rgba(132,208,255,0.16)');
    targetCtx.fillStyle = panel;
    targetCtx.fill();
    for (let row = -2; row <= 2; row += 1) {
      for (let col = -3; col <= 3; col += 1) {
        targetCtx.fillStyle = (row + col) % 2 === 0 ? 'rgba(255,214,134,0.84)' : 'rgba(136,210,255,0.74)';
        targetCtx.beginPath();
        targetCtx.arc(bodyX + col * 5.3 * factor, head.y + row * 4.6 * factor, 1.35 * factor, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }
  } else if (variant === 'fresnel') {
    roundRectPath(targetCtx, bodyX - 20 * factor, head.y - 8 * factor, 16 * factor, 16 * factor, 6 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 20 * factor, head.y - 8 * factor, bodyX - 4 * factor, head.y + 8 * factor, -0.12);
    targetCtx.fill();
    targetCtx.beginPath();
    targetCtx.ellipse(emitterX, head.y, 12 * factor, 10 * factor, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, emitterX - 12 * factor, head.y - 10 * factor, emitterX + 12 * factor, head.y + 10 * factor, 0.16);
    targetCtx.fill();
    drawGlowDisc(targetCtx, emitterX, head.y, 18 * factor, lightColor, 0.14);
    drawLensGlass(targetCtx, emitterX, head.y, 7 * factor, 7 * factor, { innerColor: withAlpha(lightColor, 0.36) });
    targetCtx.strokeStyle = withAlpha(lightColor, 0.42);
    targetCtx.lineWidth = 1.1;
    for (let ring = 1; ring <= 3; ring += 1) {
      targetCtx.beginPath();
      targetCtx.arc(emitterX, head.y, (2.6 + ring * 1.9) * factor, 0, Math.PI * 2);
      targetCtx.stroke();
    }
  } else if (variant === 'speedlight') {
    roundRectPath(targetCtx, bodyX - 8 * factor, head.y - 15 * factor, 16 * factor, 24 * factor, 5 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 8 * factor, head.y - 15 * factor, bodyX + 8 * factor, head.y + 9 * factor, -0.12);
    targetCtx.fill();
    roundRectPath(targetCtx, bodyX - 2 * factor, head.y - 28 * factor, 24 * factor, 11 * factor, 4 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 2 * factor, head.y - 28 * factor, bodyX + 22 * factor, head.y - 17 * factor, 0.06);
    targetCtx.fill();
    roundRectPath(targetCtx, bodyX + direction * 10 * factor - 5 * factor, head.y - 26 * factor, 10 * factor, 7 * factor, 2 * factor);
    targetCtx.fillStyle = withAlpha(lightColor, 0.32);
    targetCtx.fill();
    drawGlowDisc(targetCtx, bodyX + direction * 14 * factor, head.y - 22 * factor, 10 * factor, lightColor, 0.14);
  } else if (variant === 'torch') {
    roundRectPath(targetCtx, bodyX - 22 * factor, head.y - 8 * factor, 34 * factor, 16 * factor, 7 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 22 * factor, head.y - 8 * factor, bodyX + 12 * factor, head.y + 8 * factor, -0.08);
    targetCtx.fill();
    targetCtx.beginPath();
    targetCtx.ellipse(emitterX, head.y, 8 * factor, 8 * factor, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, emitterX - 8 * factor, head.y - 8 * factor, emitterX + 8 * factor, head.y + 8 * factor, 0.2);
    targetCtx.fill();
    drawGlowDisc(targetCtx, emitterX, head.y, 14 * factor, lightColor, 0.16);
    drawLensGlass(targetCtx, emitterX, head.y, 5 * factor, 5 * factor, { innerColor: withAlpha(lightColor, 0.34) });
  } else {
    roundRectPath(targetCtx, bodyX - 16 * factor, head.y - 11 * factor, 24 * factor, 22 * factor, 8 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, bodyX - 16 * factor, head.y - 11 * factor, bodyX + 8 * factor, head.y + 11 * factor, -0.08);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.1;
    targetCtx.stroke();
    targetCtx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let i = -1; i <= 1; i += 1) {
      targetCtx.fillRect(bodyX - 12 * factor, head.y + i * 4 * factor, 6 * factor, 1.4 * factor);
    }
    targetCtx.beginPath();
    targetCtx.ellipse(emitterX, head.y, 9 * factor, 8 * factor, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = createMetalGradient(targetCtx, emitterX - 9 * factor, head.y - 8 * factor, emitterX + 9 * factor, head.y + 8 * factor, 0.18);
    targetCtx.fill();
    drawGlowDisc(targetCtx, emitterX, head.y, 15 * factor, lightColor, 0.16);
    drawLensGlass(targetCtx, emitterX, head.y, 5.4 * factor, 5.4 * factor, { innerColor: withAlpha(lightColor, 0.34) });
  }
   targetCtx.fillStyle = lightColor;
  targetCtx.beginPath();
  targetCtx.arc(emitterX, head.y, 3.8 * factor, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = '#ffffff';
  targetCtx.beginPath();
  targetCtx.arc(emitterX - direction * 1.2 * factor, head.y - 1.1 * factor, 1.4 * factor, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
function drawLightViewModifierItem(targetCtx, item, width, height) {
  const family = getModifierFamily(item);
  const factor = getLightViewSizeFactor(item);
  const lightColor = getLightColor(item);
  const direction = Math.cos(degToRad(item.rotation || 0)) >= 0 ? 1 : -1;
  drawLightViewFloorShadow(targetCtx, item, width, height, family === 'strip-box' || family === 'flag' ? 14 * factor : 18 * factor, 6 * factor, 0.16);
  const stand = drawLightViewStand(targetCtx, item, width, height, { topHeight: Math.max(0.72, item.height - 0.04), spread: family === 'flag' ? 22 : 18 });
  const face = getLightViewHeadPoint(item, width, height, Math.max(0.72, item.height - 0.04));
  const mountX = face.x - direction * 12 * factor;
  targetCtx.save();
  targetCtx.strokeStyle = 'rgba(172,182,194,0.7)';
  targetCtx.lineWidth = 1.8;
  targetCtx.beginPath();
  targetCtx.moveTo(stand.head.x, stand.head.y);
  targetCtx.lineTo(mountX, face.y + 1.5 * factor);
  targetCtx.lineTo(face.x, face.y);
  targetCtx.stroke();
   if (item.mountLight) {
    roundRectPath(targetCtx, mountX - 9 * factor, face.y - 8 * factor, 18 * factor, 14 * factor, 4 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, mountX - 9 * factor, face.y - 8 * factor, mountX + 9 * factor, face.y + 6 * factor, -0.1);
    targetCtx.fill();
    drawGlowDisc(targetCtx, mountX + direction * 5 * factor, face.y, 12 * factor, lightColor, 0.12);
  }
   if (family === 'softbox' || family === 'strip-box' || family === 'flag' || family === 'grid' || family === 'gel' || family === 'barn-doors') {
    const widthPx = family === 'strip-box' ? 24 * factor : family === 'flag' ? 22 * factor : 40 * factor;
    const heightPx = family === 'strip-box' ? 66 * factor : family === 'flag' ? 58 * factor : 31 * factor;
    roundRectPath(targetCtx, face.x - widthPx / 2, face.y - heightPx / 2, widthPx, heightPx, 8 * factor);
    targetCtx.fillStyle = family === 'flag' ? 'rgba(13,16,20,0.98)' : createMetalGradient(targetCtx, face.x - widthPx / 2, face.y - heightPx / 2, face.x + widthPx / 2, face.y + heightPx / 2, -0.06);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    if (family !== 'flag' && family !== 'barn-doors') {
      roundRectPath(targetCtx, face.x - widthPx * 0.36, face.y - heightPx * 0.34, widthPx * 0.72, heightPx * 0.68, 6 * factor);
      const panel = targetCtx.createRadialGradient(face.x - direction * widthPx * 0.12, face.y - heightPx * 0.12, 0, face.x, face.y, Math.max(widthPx, heightPx) * 0.72);
      panel.addColorStop(0, item.mountLight ? withAlpha(lightColor, 0.18) : 'rgba(255,255,255,0.08)');
      panel.addColorStop(0.44, 'rgba(247,248,250,0.1)');
      panel.addColorStop(1, 'rgba(0,0,0,0.16)');
      targetCtx.fillStyle = panel;
      targetCtx.fill();
      drawGlossyPass(targetCtx, face.x - widthPx * 0.36, face.y - heightPx * 0.34, widthPx * 0.72, heightPx * 0.68, 6 * factor, 0.12);
    }
    if (family === 'grid') {
      targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
      targetCtx.lineWidth = 1;
      for (let i = -2; i <= 2; i += 1) {
        targetCtx.beginPath();
        targetCtx.moveTo(face.x + i * 5.8 * factor, face.y - heightPx * 0.34);
        targetCtx.lineTo(face.x + i * 5.8 * factor, face.y + heightPx * 0.34);
        targetCtx.moveTo(face.x - widthPx * 0.34, face.y + i * 5.6 * factor);
        targetCtx.lineTo(face.x + widthPx * 0.34, face.y + i * 5.6 * factor);
        targetCtx.stroke();
      }
    }
    if (family === 'gel') {
      const gelGradient = targetCtx.createLinearGradient(face.x - widthPx / 2, face.y - heightPx / 2, face.x + widthPx / 2, face.y + heightPx / 2);
      gelGradient.addColorStop(0, 'rgba(255,174,97,0.72)');
      gelGradient.addColorStop(0.5, 'rgba(163,84,245,0.64)');
      gelGradient.addColorStop(1, 'rgba(104,194,255,0.7)');
      roundRectPath(targetCtx, face.x - widthPx * 0.28, face.y - heightPx * 0.28, widthPx * 0.56, heightPx * 0.56, 5 * factor);
      targetCtx.fillStyle = gelGradient;
      targetCtx.fill();
    }
    if (family === 'barn-doors') {
      roundRectPath(targetCtx, face.x - widthPx * 0.18, face.y - heightPx * 0.16, widthPx * 0.36, heightPx * 0.32, 6 * factor);
      targetCtx.fillStyle = createMetalGradient(targetCtx, face.x - widthPx * 0.18, face.y - heightPx * 0.16, face.x + widthPx * 0.18, face.y + heightPx * 0.16, -0.14);
      targetCtx.fill();
      drawGlowDisc(targetCtx, face.x, face.y, 16 * factor, lightColor, item.mountLight ? 0.16 : 0.08);
      targetCtx.fillStyle = 'rgba(14,17,22,0.96)';
      targetCtx.beginPath();
      targetCtx.moveTo(face.x - widthPx * 0.18, face.y);
      targetCtx.lineTo(face.x - widthPx * 0.44, face.y - heightPx * 0.24);
      targetCtx.lineTo(face.x - widthPx * 0.44, face.y + heightPx * 0.24);
      targetCtx.closePath();
      targetCtx.fill();
      targetCtx.beginPath();
      targetCtx.moveTo(face.x + widthPx * 0.18, face.y);
      targetCtx.lineTo(face.x + widthPx * 0.44, face.y - heightPx * 0.24);
      targetCtx.lineTo(face.x + widthPx * 0.44, face.y + heightPx * 0.24);
      targetCtx.closePath();
      targetCtx.fill();
    }
  } else if (family === 'octobox') {
    octagonPath(targetCtx, face.x, face.y, 24 * factor, 20 * factor);
    targetCtx.fillStyle = createMetalGradient(targetCtx, face.x - 24 * factor, face.y - 20 * factor, face.x + 24 * factor, face.y + 20 * factor, -0.04);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    octagonPath(targetCtx, face.x, face.y, 18 * factor, 14 * factor);
    const inner = targetCtx.createRadialGradient(face.x - direction * 5 * factor, face.y - 4 * factor, 0, face.x, face.y, 22 * factor);
    inner.addColorStop(0, item.mountLight ? withAlpha(lightColor, 0.18) : 'rgba(255,255,255,0.08)');
    inner.addColorStop(0.5, 'rgba(246,248,250,0.08)');
    inner.addColorStop(1, 'rgba(0,0,0,0.16)');
    targetCtx.fillStyle = inner;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 8; i += 1) {
      const angle = Math.PI / 8 + i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(face.x, face.y);
      targetCtx.lineTo(face.x + Math.cos(angle) * 18 * factor, face.y + Math.sin(angle) * 14 * factor);
      targetCtx.stroke();
    }
  } else if (family === 'beauty-dish' || family === 'reflector' || family === 'parabolic' || family === 'ring-flash') {
    const radiusX = family === 'parabolic' ? 30 * factor : family === 'reflector' ? 24 * factor : 19 * factor;
    const radiusY = family === 'parabolic' ? 20 * factor : family === 'reflector' ? 14 * factor : 19 * factor;
    const bowl = targetCtx.createRadialGradient(face.x - radiusX * 0.16, face.y - radiusY * 0.24, 0, face.x, face.y, radiusX);
    bowl.addColorStop(0, family === 'reflector' ? 'rgba(255,255,255,0.42)' : 'rgba(174,184,194,0.18)');
    bowl.addColorStop(0.46, family === 'reflector' ? 'rgba(206,214,222,0.94)' : 'rgba(38,44,52,0.98)');
    bowl.addColorStop(1, family === 'reflector' ? 'rgba(128,137,149,0.96)' : 'rgba(14,18,24,1)');
    targetCtx.beginPath();
    targetCtx.ellipse(face.x, face.y, radiusX, radiusY, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = bowl;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    if (family === 'ring-flash') {
      targetCtx.strokeStyle = item.mountLight ? withAlpha(lightColor, 0.88) : 'rgba(255,229,184,0.84)';
      targetCtx.lineWidth = 6.8 * factor;
      targetCtx.beginPath();
      targetCtx.arc(face.x, face.y, 12 * factor, 0, Math.PI * 2);
      targetCtx.stroke();
    } else {
      targetCtx.beginPath();
      targetCtx.arc(face.x, face.y, family === 'parabolic' ? 5.5 * factor : 4.4 * factor, 0, Math.PI * 2);
      targetCtx.fillStyle = item.mountLight ? withAlpha(lightColor, 0.18) : 'rgba(12,16,20,0.96)';
      targetCtx.fill();
    }
    if (family === 'parabolic') {
      targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
      targetCtx.lineWidth = 1;
      for (let i = -2; i <= 2; i += 1) {
        targetCtx.beginPath();
        targetCtx.moveTo(face.x + i * 5 * factor, face.y - radiusY * 0.82);
        targetCtx.quadraticCurveTo(face.x + i * 1.2 * factor, face.y, face.x + i * 5 * factor, face.y + radiusY * 0.82);
        targetCtx.stroke();
      }
    }
  } else if (family === 'snoot') {
    targetCtx.beginPath();
    targetCtx.moveTo(face.x - 7 * factor, face.y - 11 * factor);
    targetCtx.lineTo(face.x + 5 * factor, face.y - 9 * factor);
    targetCtx.lineTo(face.x + 18 * factor, face.y + 8 * factor);
    targetCtx.lineTo(face.x - 16 * factor, face.y + 8 * factor);
    targetCtx.closePath();
    targetCtx.fillStyle = createMetalGradient(targetCtx, face.x - 16 * factor, face.y - 11 * factor, face.x + 18 * factor, face.y + 8 * factor, -0.08);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    drawGlowDisc(targetCtx, face.x + 12 * factor, face.y, 12 * factor, lightColor, item.mountLight ? 0.16 : 0.08);
  }
   if (item.mountLight) {
    drawGlowDisc(targetCtx, face.x, face.y, 26 * factor, lightColor, 0.12);
  }
  targetCtx.restore();
}
function drawLightViewCone(targetCtx, light, width, height) {
  if (!state.showLightCones || !isLightEmitter(light)) return;
  const projection = getLightViewProjection(width, height);
  const rotation = degToRad(light.rotation || 0);
  const coneAngle = getLightConeAngle(light);
  const reach = getLightConeReach(light);
  const targetZ = projection.subjectZ;
  const source = getLightViewHeadPoint(light, width, height, Math.max(0.45, light.height - 0.04));
  const centerPoint = projectLightViewPoint(light.x + Math.cos(rotation) * reach * 0.72, light.y + Math.sin(rotation) * reach * 0.72, targetZ, width, height);
  const leftPoint = projectLightViewPoint(light.x + Math.cos(rotation - coneAngle / 2) * reach, light.y + Math.sin(rotation - coneAngle / 2) * reach, targetZ, width, height);
  const rightPoint = projectLightViewPoint(light.x + Math.cos(rotation + coneAngle / 2) * reach, light.y + Math.sin(rotation + coneAngle / 2) * reach, targetZ, width, height);
  const innerLeft = projectLightViewPoint(light.x + Math.cos(rotation - coneAngle * 0.24) * reach * 0.56, light.y + Math.sin(rotation - coneAngle * 0.24) * reach * 0.56, targetZ + 0.1, width, height);
  const innerRight = projectLightViewPoint(light.x + Math.cos(rotation + coneAngle * 0.24) * reach * 0.56, light.y + Math.sin(rotation + coneAngle * 0.24) * reach * 0.56, targetZ + 0.1, width, height);
  const beamColor = getLightColor(light);
  const outerGradient = targetCtx.createLinearGradient(source.x, source.y, centerPoint.x, centerPoint.y);
  outerGradient.addColorStop(0, beamColor.replace(', 1)', ', 0.22)'));
  outerGradient.addColorStop(0.42, beamColor.replace(', 1)', ', 0.12)'));
  outerGradient.addColorStop(1, 'rgba(0,0,0,0)');
  const innerGradient = targetCtx.createLinearGradient(source.x, source.y, centerPoint.x, centerPoint.y);
  innerGradient.addColorStop(0, beamColor.replace(', 1)', ', 0.32)'));
  innerGradient.addColorStop(0.58, beamColor.replace(', 1)', ', 0.08)'));
  innerGradient.addColorStop(1, 'rgba(0,0,0,0)');
   targetCtx.save();
  targetCtx.fillStyle = outerGradient;
  targetCtx.beginPath();
  targetCtx.moveTo(source.x, source.y);
  targetCtx.lineTo(leftPoint.x, leftPoint.y);
  targetCtx.lineTo(rightPoint.x, rightPoint.y);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.fillStyle = innerGradient;
  targetCtx.beginPath();
  targetCtx.moveTo(source.x, source.y);
  targetCtx.lineTo(innerLeft.x, innerLeft.y);
  targetCtx.lineTo(innerRight.x, innerRight.y);
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.strokeStyle = beamColor.replace(', 1)', ', 0.28)');
  targetCtx.lineWidth = 1.1;
  targetCtx.setLineDash([10, 8]);
  targetCtx.beginPath();
  targetCtx.moveTo(source.x, source.y);
  targetCtx.lineTo(leftPoint.x, leftPoint.y);
  targetCtx.moveTo(source.x, source.y);
  targetCtx.lineTo(rightPoint.x, rightPoint.y);
  targetCtx.stroke();
  targetCtx.setLineDash([]);
  targetCtx.restore();
}
 function drawLightViewRigItems(targetCtx, width, height) {
  state.items.filter(item => item.type === 'backdrop').sort((a, b) => a.y - b.y).forEach(item => drawLightViewBackdropItem(targetCtx, item, width, height));
  const typeOrder = { light: 0, modifier: 1, camera: 2 };
  state.items
    .filter(item => item.type !== 'subject' && item.type !== 'backdrop')
    .sort((a, b) => (a.y - b.y) || ((typeOrder[a.type] || 9) - (typeOrder[b.type] || 9)))
    .forEach(item => {
      if (item.type === 'camera') drawLightViewCameraItem(targetCtx, item, width, height);
      else if (item.type === 'light') drawLightViewLightItem(targetCtx, item, width, height);
      else if (item.type === 'modifier') drawLightViewModifierItem(targetCtx, item, width, height);
    });
}
 function drawFrontPersonUnit(targetCtx, x, y, gender, scale, pose, lighting) {
  const palette = getSubjectPalette(gender);
  const build = getSubjectBuild(gender);
  const litBody = litColor(palette.outfit, lighting.facingKey, lighting.facingFill, lighting.facingBack);
  const litSkin = litColor(palette.skin, lighting.facingKey, lighting.facingFill, lighting.facingBack);
  const shadowBody = darken(litBody, 0.34);
  const shadowSkin = darken(litSkin, 0.28);
  const direction = clamp(lighting.directionX, -1, 1);
  const poseScale = pose === 'bust' ? 0.9 : pose === 'seated' ? 0.96 : 1;
  const figureScale = scale * poseScale * build.overall;
  const headR = 9.4 * figureScale * build.head * (pose === 'bust' ? 1.06 : 1);
  const shoulder = 22 * figureScale * build.shoulder * (pose === 'bust' ? 1.08 : 1);
  const rib = shoulder * 0.9;
  const waist = shoulder * build.waist;
  const hip = shoulder * build.hip;
  const neckW = headR * 0.58;
  const shoulderY = y - 26 * figureScale;
  const chestY = y - 8 * figureScale;
  const waistY = y + 14 * figureScale;
  const pelvisY = y + (pose === 'bust' ? 11 : pose === 'seated' ? 25 : 31) * figureScale;
  const kneeY = y + (pose === 'seated' ? 56 : 67) * figureScale * build.leg;
  const ankleY = y + (pose === 'seated' ? 76 : 92) * figureScale * build.leg;
  const footY = pose === 'bust' ? pelvisY + 8 * figureScale : pose === 'seated' ? ankleY + 4 * figureScale : ankleY + 6 * figureScale;
  const headY = y - (pose === 'bust' ? 44 : 50) * figureScale;
  const stance = 10 * figureScale * build.stance;
  const bodyGrad = targetCtx.createLinearGradient(x - shoulder * (1 + direction), y, x + shoulder * (1 - direction), y);
  bodyGrad.addColorStop(0, rgbString(direction > 0 ? shadowBody : litBody));
  bodyGrad.addColorStop(1, rgbString(direction > 0 ? litBody : shadowBody));
  const skinGrad = targetCtx.createLinearGradient(x - headR * (1 + direction), headY, x + headR * (1 - direction), headY);
  skinGrad.addColorStop(0, rgbString(direction > 0 ? shadowSkin : litSkin));
  skinGrad.addColorStop(1, rgbString(direction > 0 ? litSkin : shadowSkin));
  const headGrad = targetCtx.createRadialGradient(x - headR * 0.28, headY - headR * 0.36, headR * 0.16, x, headY, headR * 1.16);
  headGrad.addColorStop(0, rgbString(mixColor(litSkin, { r: 255, g: 242, b: 229 }, 0.22)));
  headGrad.addColorStop(1, rgbString(shadowSkin));
   targetCtx.save();
  drawShadowEllipse(targetCtx, x, footY + 3 * figureScale, (pose === 'bust' ? 18 : pose === 'seated' ? 28 : 26) * figureScale, (pose === 'bust' ? 6 : 9) * figureScale, 0.18, 14, 0);
   if (pose === 'seated') {
    const stoolGrad = targetCtx.createLinearGradient(x - 24 * figureScale, y + 18 * figureScale, x + 24 * figureScale, y + 30 * figureScale);
    stoolGrad.addColorStop(0, 'rgba(42,49,58,0.88)');
    stoolGrad.addColorStop(1, 'rgba(19,24,30,0.96)');
    targetCtx.fillStyle = stoolGrad;
    roundRectPath(targetCtx, x - 18 * figureScale, y + 17 * figureScale, 36 * figureScale, 8 * figureScale, 4 * figureScale);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(18,22,27,0.95)';
    targetCtx.lineWidth = 2 * figureScale;
    targetCtx.beginPath();
    targetCtx.moveTo(x - 11 * figureScale, y + 24 * figureScale);
    targetCtx.lineTo(x - 15 * figureScale, y + 57 * figureScale);
    targetCtx.moveTo(x + 11 * figureScale, y + 24 * figureScale);
    targetCtx.lineTo(x + 15 * figureScale, y + 57 * figureScale);
    targetCtx.stroke();
  }
   targetCtx.fillStyle = bodyGrad;
  targetCtx.beginPath();
  targetCtx.moveTo(x - shoulder, shoulderY);
  targetCtx.quadraticCurveTo(x - rib * 1.02, chestY - 3 * figureScale, x - waist, waistY);
  targetCtx.quadraticCurveTo(x - hip * 1.06, pelvisY - 5 * figureScale, x - hip, pelvisY);
  targetCtx.lineTo(x + hip, pelvisY);
  targetCtx.quadraticCurveTo(x + hip * 1.06, pelvisY - 5 * figureScale, x + waist, waistY);
  targetCtx.quadraticCurveTo(x + rib * 1.02, chestY - 3 * figureScale, x + shoulder, shoulderY);
  targetCtx.quadraticCurveTo(x + neckW * 0.72, shoulderY - 7 * figureScale, x, shoulderY - 6 * figureScale);
  targetCtx.quadraticCurveTo(x - neckW * 0.72, shoulderY - 7 * figureScale, x - shoulder, shoulderY);
  targetCtx.closePath();
  targetCtx.fill();
   targetCtx.fillStyle = rgbString(mixColor(litBody, { r: 255, g: 255, b: 255 }, 0.18), 0.28);
  targetCtx.beginPath();
  targetCtx.ellipse(x - direction * 6 * figureScale, y - 2 * figureScale, 6.6 * figureScale, 28 * figureScale, direction * 0.16, 0, Math.PI * 2);
  targetCtx.fill();
   targetCtx.fillStyle = skinGrad;
  roundRectPath(targetCtx, x - neckW * 0.46, headY + headR * 0.84, neckW * 0.92, headR * 0.46, 3 * figureScale);
  targetCtx.fill();
   const armColor = rgbString(darken(litBody, 0.08));
  targetCtx.strokeStyle = armColor;
  targetCtx.lineWidth = 6.4 * figureScale * build.arm;
  targetCtx.lineCap = 'round';
  targetCtx.lineJoin = 'round';
  targetCtx.beginPath();
  if (pose === 'bust') {
    targetCtx.moveTo(x - shoulder * 0.84, shoulderY + 6 * figureScale);
    targetCtx.quadraticCurveTo(x - shoulder * 1.04, chestY + 12 * figureScale, x - shoulder * 0.84, pelvisY - 6 * figureScale);
    targetCtx.moveTo(x + shoulder * 0.84, shoulderY + 6 * figureScale);
    targetCtx.quadraticCurveTo(x + shoulder * 1.04, chestY + 12 * figureScale, x + shoulder * 0.84, pelvisY - 6 * figureScale);
  } else if (pose === 'seated') {
    targetCtx.moveTo(x - shoulder * 0.72, shoulderY + 8 * figureScale);
    targetCtx.quadraticCurveTo(x - shoulder * 1.02, y + 4 * figureScale, x - 16 * figureScale, y + 27 * figureScale);
    targetCtx.moveTo(x + shoulder * 0.72, shoulderY + 8 * figureScale);
    targetCtx.quadraticCurveTo(x + shoulder * 1.02, y + 4 * figureScale, x + 16 * figureScale, y + 27 * figureScale);
  } else {
    targetCtx.moveTo(x - shoulder * 0.76, shoulderY + 7 * figureScale);
    targetCtx.quadraticCurveTo(x - shoulder * 1.04, y + 8 * figureScale, x - 18 * figureScale, y + 49 * figureScale);
    targetCtx.moveTo(x + shoulder * 0.76, shoulderY + 7 * figureScale);
    targetCtx.quadraticCurveTo(x + shoulder * 1.04, y + 8 * figureScale, x + 18 * figureScale, y + 49 * figureScale);
  }
  targetCtx.stroke();
   targetCtx.fillStyle = skinGrad;
  const handY = pose === 'bust' ? pelvisY - 6 * figureScale : pose === 'seated' ? y + 28 * figureScale : y + 49 * figureScale;
  const handX = pose === 'bust' ? shoulder * 0.84 : pose === 'seated' ? 16 * figureScale : 18 * figureScale;
  [-handX, handX].forEach(offset => {
    targetCtx.beginPath();
    targetCtx.arc(x + offset, handY, 3.1 * figureScale, 0, Math.PI * 2);
    targetCtx.fill();
  });
   targetCtx.strokeStyle = rgbString(darken(litBody, 0.16));
  targetCtx.lineWidth = 8 * figureScale;
  targetCtx.beginPath();
  if (pose === 'bust') {
    targetCtx.moveTo(x - hip * 0.3, pelvisY - 1 * figureScale);
    targetCtx.lineTo(x - hip * 0.22, pelvisY + 12 * figureScale);
    targetCtx.moveTo(x + hip * 0.3, pelvisY - 1 * figureScale);
    targetCtx.lineTo(x + hip * 0.22, pelvisY + 12 * figureScale);
  } else if (pose === 'seated') {
    targetCtx.moveTo(x - hip * 0.34, pelvisY);
    targetCtx.lineTo(x - stance * 1.26, kneeY - 6 * figureScale);
    targetCtx.lineTo(x - stance * 1.12, ankleY - 2 * figureScale);
    targetCtx.moveTo(x + hip * 0.34, pelvisY);
    targetCtx.lineTo(x + stance * 1.26, kneeY - 8 * figureScale);
    targetCtx.lineTo(x + stance * 1.12, ankleY - 4 * figureScale);
  } else {
    targetCtx.moveTo(x - hip * 0.22, pelvisY);
    targetCtx.lineTo(x - stance * 0.92, kneeY);
    targetCtx.lineTo(x - stance * 1.04, ankleY);
    targetCtx.moveTo(x + hip * 0.22, pelvisY);
    targetCtx.lineTo(x + stance * 0.92, kneeY);
    targetCtx.lineTo(x + stance * 1.04, ankleY);
  }
  targetCtx.stroke();
   if (pose !== 'bust') {
    targetCtx.fillStyle = palette.shoe;
    targetCtx.beginPath();
    targetCtx.ellipse(x - stance * 1.08, footY, 6.2 * figureScale, 2.8 * figureScale, 0, 0, Math.PI * 2);
    targetCtx.ellipse(x + stance * 1.08, footY, 6.2 * figureScale, 2.8 * figureScale, 0, 0, Math.PI * 2);
    targetCtx.fill();
  }
   targetCtx.fillStyle = headGrad;
  targetCtx.beginPath();
  targetCtx.ellipse(x, headY, headR * 0.94, headR * 1.08, 0, 0, Math.PI * 2);
  targetCtx.fill();
   targetCtx.fillStyle = palette.hair;
  targetCtx.beginPath();
  targetCtx.arc(x, headY - headR * 0.08, headR * 1.06, Math.PI, Math.PI * 2);
  targetCtx.lineTo(x + headR * 1.02, headY + headR * (gender === 'female' ? 0.34 : 0.14));
  targetCtx.quadraticCurveTo(x, headY + headR * (gender === 'female' ? 0.82 : 0.34), x - headR * 1.02, headY + headR * (gender === 'female' ? 0.34 : 0.14));
  targetCtx.closePath();
  targetCtx.fill();
  if (gender === 'female' || pose === 'bust') {
    targetCtx.beginPath();
    targetCtx.ellipse(x - headR * 0.76, headY + headR * 0.14, headR * 0.26, headR * 0.56, Math.PI / 12, 0, Math.PI * 2);
    targetCtx.ellipse(x + headR * 0.76, headY + headR * 0.14, headR * 0.26, headR * 0.56, -Math.PI / 12, 0, Math.PI * 2);
    targetCtx.fill();
  }
   targetCtx.fillStyle = rgbString(mixColor(litSkin, { r: 255, g: 255, b: 255 }, 0.16), 0.22);
  targetCtx.beginPath();
  targetCtx.ellipse(x - headR * 0.22, headY - headR * 0.24, headR * 0.24, headR * 0.16, -0.5, 0, Math.PI * 2);
  targetCtx.fill();
   targetCtx.fillStyle = '#101318';
  targetCtx.beginPath();
  targetCtx.arc(x - 3.8 * figureScale, headY - 1.8 * figureScale, 1.3 * figureScale, 0, Math.PI * 2);
  targetCtx.arc(x + 3.8 * figureScale, headY - 1.8 * figureScale, 1.3 * figureScale, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = 'rgba(255,255,255,0.92)';
  targetCtx.beginPath();
  targetCtx.arc(x - 3.2 * figureScale + direction * 0.7 * figureScale, headY - 2.2 * figureScale, 0.56 * figureScale, 0, Math.PI * 2);
  targetCtx.arc(x + 4.2 * figureScale + direction * 0.7 * figureScale, headY - 2.2 * figureScale, 0.56 * figureScale, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.strokeStyle = 'rgba(72,46,38,0.34)';
  targetCtx.lineWidth = 1 * figureScale;
  targetCtx.beginPath();
  targetCtx.moveTo(x, headY + 1.5 * figureScale);
  targetCtx.lineTo(x + direction * 1.6 * figureScale, headY + 5 * figureScale);
  targetCtx.moveTo(x - 3.1 * figureScale, headY + 7.2 * figureScale);
  targetCtx.quadraticCurveTo(x, headY + 9.2 * figureScale, x + 3.1 * figureScale, headY + 7.2 * figureScale);
  targetCtx.stroke();
   targetCtx.strokeStyle = rgbString(mixColor(litBody, { r: 255, g: 255, b: 255 }, 0.22), 0.34);
  targetCtx.lineWidth = 1.6 * figureScale;
  targetCtx.beginPath();
  targetCtx.moveTo(x, shoulderY + 6 * figureScale);
  targetCtx.lineTo(x, pelvisY - 6 * figureScale);
  targetCtx.stroke();
   if (lighting.facingBack > 0.12) {
    targetCtx.strokeStyle = 'rgba(255, 238, 210, ' + (0.28 + lighting.facingBack * 0.42).toFixed(2) + ')';
    targetCtx.lineWidth = 3 * figureScale;
    targetCtx.beginPath();
    targetCtx.arc(x - direction * 12 * figureScale, y - 8 * figureScale, 25 * figureScale, -Math.PI / 2, Math.PI / 2);
    targetCtx.stroke();
  }
  targetCtx.restore();
}
 function drawPersonFigure(targetCtx, x, y, gender, scale, options = {}) {
  const lighting = options.lighting || { directionX: 0.2, facingKey: 0.5, facingFill: 0.2, facingBack: 0 };
  const pose = options.pose || "standing";
  if (pose === "couple") {
    drawFrontPersonUnit(targetCtx, x - 19 * scale, y + 2 * scale, "female", scale * 0.96, "standing", lighting);
    drawFrontPersonUnit(targetCtx, x + 19 * scale, y, "male", scale, "standing", lighting);
    return;
  }
  drawFrontPersonUnit(targetCtx, x, y, gender === "mixed" ? "neutral" : gender, scale, pose, lighting);
}
 function drawBeamLines(targetCtx, width, height) {
  const subjects = getSubjectItems();
  if (!subjects.length) return;
  getLightItems().forEach(light => {
    const lightPos = getLightViewHeadPoint(light, width, height, Math.max(0.45, light.height - 0.04));
    subjects.forEach(subject => {
      const subjectPos = projectFrontal(subject, width, height);
      const distance = Math.max(0.6, Math.hypot(light.x - subject.x, light.y - subject.y));
      const alpha = clamp((light.power || 0) / Math.pow(distance, 2) / 70, 0.08, 0.55);
      targetCtx.save();
      targetCtx.strokeStyle = getLightColor(light).replace(', 1)', ', ' + alpha.toFixed(2) + ')');
      targetCtx.setLineDash([8, 8]);
      targetCtx.lineWidth = 1.2;
      targetCtx.beginPath();
      targetCtx.moveTo(lightPos.x, lightPos.y);
      targetCtx.lineTo(subjectPos.x, subjectPos.y - 32 * subjectPos.scale);
      targetCtx.stroke();
      targetCtx.restore();
    });
  });
}
 function drawLightBadges(targetCtx, width, height) {
  getLightItems().forEach(light => {
    const point = getLightViewHeadPoint(light, width, height, Math.max(0.45, light.height - 0.04));
    targetCtx.save();
    targetCtx.shadowColor = getLightColor(light).replace(', 1)', ', 0.44)');
    targetCtx.shadowBlur = 18;
    targetCtx.fillStyle = getLightColor(light);
    targetCtx.beginPath();
    targetCtx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.shadowBlur = 0;
    targetCtx.fillStyle = '#ffffff';
    targetCtx.beginPath();
    targetCtx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.fillStyle = 'rgba(255,255,255,0.88)';
    targetCtx.font = '12px Space Grotesk';
    targetCtx.textAlign = 'left';
    targetCtx.fillText(light.name + ' ' + Math.round(light.power || 0) + '%', point.x + 16, point.y + 4);
    const tempRgb = kelvinToRgb(light.colorTemp || 5600);
    targetCtx.fillStyle = rgbString(tempRgb, 0.95);
    roundRectPath(targetCtx, point.x + 14, point.y + 10, 52, 18, 9);
    targetCtx.fill();
    targetCtx.fillStyle = '#091016';
    targetCtx.font = '10px DM Mono';
    targetCtx.fillText((light.colorTemp || 5600) + 'K', point.x + 24, point.y + 23);
    targetCtx.restore();
  });
}
 function drawBackgroundShadows(targetCtx, width, height) {
  const key = getKeyLight();
  if (!key) return;
  const lightDirection = Math.sign((key.x - state.studio.w / 2) || 1);
  getSubjectItems().forEach(subject => {
    const projected = projectFrontal(subject, width, height);
    const offsetX = -lightDirection * 80;
    targetCtx.save();
    const shadowGrad = targetCtx.createRadialGradient(projected.x + offsetX, projected.y - 110, 0, projected.x + offsetX, projected.y - 110, 95);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.26)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    targetCtx.fillStyle = shadowGrad;
    targetCtx.beginPath();
    targetCtx.ellipse(projected.x + offsetX, projected.y - 110, 52, 92, 0, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.restore();
  });
}
 function drawLightView(targetCtx, width, height) {
  const wall = targetCtx.createLinearGradient(0, 0, 0, height);
  wall.addColorStop(0, '#202732');
  wall.addColorStop(0.62, '#151b23');
  wall.addColorStop(0.63, '#0b1016');
  wall.addColorStop(1, '#07090d');
  targetCtx.fillStyle = wall;
  targetCtx.fillRect(0, 0, width, height);
  drawBackgroundShadows(targetCtx, width, height);
  const floorGrad = targetCtx.createLinearGradient(0, height * 0.62, 0, height);
  floorGrad.addColorStop(0, 'rgba(255,255,255,0.03)');
  floorGrad.addColorStop(1, 'rgba(0,0,0,0.18)');
  targetCtx.fillStyle = floorGrad;
  targetCtx.fillRect(0, height * 0.62, width, height * 0.38);
  if (state.showLightCones) getLightItems().forEach(light => drawLightViewCone(targetCtx, light, width, height));
  drawLightViewRigItems(targetCtx, width, height);
  drawBeamLines(targetCtx, width, height);
  getSubjectItems().sort((a, b) => a.y - b.y).forEach(subject => {
    const projected = projectFrontal(subject, width, height);
    const lighting = computeLightingForSubject(subject);
    drawPersonFigure(targetCtx, projected.x, projected.y, subject.gender, projected.scale * 1.05, { lighting, pose: subject.pose });
  });
  drawLightBadges(targetCtx, width, height);
}
 function drawMeasurementOverlay(targetCtx, metrics, iso = false) {
  const first = state.items.find(item => item.id === state.measure.firstId);
  const second = state.items.find(item => item.id === state.measure.secondId);
  if (!first || !second) return;
  const a = iso ? isoProject(first.x, first.y, 0, metrics) : worldToScreen(first.x, first.y, metrics);
  const b = iso ? isoProject(second.x, second.y, 0, metrics) : worldToScreen(second.x, second.y, metrics);
  const distance = Math.hypot(first.x - second.x, first.y - second.y);
  targetCtx.save();
  targetCtx.strokeStyle = "rgba(91,168,245,0.92)";
  targetCtx.lineWidth = 1.8;
  targetCtx.setLineDash([8, 6]);
  targetCtx.beginPath();
  targetCtx.moveTo(a.x, a.y);
  targetCtx.lineTo(b.x, b.y);
  targetCtx.stroke();
  targetCtx.setLineDash([]);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  roundRectPath(targetCtx, midX - 38, midY - 14, 76, 28, 14);
  targetCtx.fillStyle = "rgba(15,20,28,0.94)";
  targetCtx.fill();
  targetCtx.fillStyle = "#8cc5ff";
  targetCtx.font = "12px DM Mono";
  targetCtx.textAlign = "center";
  targetCtx.fillText(distance.toFixed(2) + " m", midX, midY + 4);
  targetCtx.restore();
}
 function drawStudioMetrics(targetCtx, metrics) {
  targetCtx.save();
  targetCtx.fillStyle = "rgba(255,255,255,0.82)";
  targetCtx.font = "12px DM Mono";
  targetCtx.fillText(state.studio.w.toFixed(1) + "m", metrics.width / 2 - 18, metrics.centerY + state.studio.h * metrics.scale * state.zoom / 2 + 34);
  targetCtx.fillText(state.studio.h.toFixed(1) + "m", metrics.centerX + state.studio.w * metrics.scale * state.zoom / 2 + 16, metrics.height / 2 + 2);
  targetCtx.restore();
}
 function drawSetupView(targetCtx, width, height, metrics) {
  const bg = targetCtx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#0b0f14");
  bg.addColorStop(1, "#06070a");
  targetCtx.fillStyle = bg;
  targetCtx.fillRect(0, 0, width, height);
  withStudioTransform(targetCtx, metrics, () => {
    drawStudioBase(targetCtx, metrics);
    drawGrid(targetCtx, metrics);
    drawStudioShadows(targetCtx, metrics);
    getLightItems().forEach(light => drawLightFalloff(targetCtx, light, metrics));
    if (state.showLightCones) getLightItems().forEach(light => drawLightCone(targetCtx, light, metrics));
    state.items.forEach(item => drawFovCone(targetCtx, item, metrics));
    state.items.forEach(item => drawItemTopDown(targetCtx, item, metrics));
  });
  drawMeasurementOverlay(targetCtx, metrics);
  drawItemLabels(targetCtx, metrics);
  drawSelectionOverlay(targetCtx, metrics);
  drawStudioMetrics(targetCtx, metrics);
}
 function drawCameraView(targetCtx, width, height) {
  drawBackdropForView(targetCtx, width, height);
  getLightItems().forEach(light => {
    const point = getLightViewHeadPoint(light, width, height, Math.max(0.45, light.height - 0.04));
    const gradient = targetCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 190);
    gradient.addColorStop(0, getLightColor(light).replace(', 1)', ', 0.18)'));
    gradient.addColorStop(0.6, getLightColor(light).replace(', 1)', ', 0.05)'));
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    targetCtx.fillStyle = gradient;
    targetCtx.beginPath();
    targetCtx.arc(point.x, point.y, 190, 0, Math.PI * 2);
    targetCtx.fill();
  });
   drawLightViewRigItems(targetCtx, width, height);
   const frameGradient = targetCtx.createLinearGradient(0, height * 0.56, 0, height);
  frameGradient.addColorStop(0, 'rgba(0,0,0,0)');
  frameGradient.addColorStop(1, 'rgba(0,0,0,0.18)');
  targetCtx.fillStyle = frameGradient;
  targetCtx.fillRect(0, 0, width, height);
   targetCtx.save();
  targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
  targetCtx.lineWidth = 1;
  targetCtx.setLineDash([7, 7]);
  for (let i = 1; i < 3; i += 1) {
    targetCtx.beginPath();
    targetCtx.moveTo(width * i / 3, 28);
    targetCtx.lineTo(width * i / 3, height - 28);
    targetCtx.stroke();
    targetCtx.beginPath();
    targetCtx.moveTo(28, height * i / 3);
    targetCtx.lineTo(width - 28, height * i / 3);
    targetCtx.stroke();
  }
  targetCtx.setLineDash([]);
  targetCtx.strokeStyle = 'rgba(255,255,255,0.26)';
  roundRectPath(targetCtx, 28, 28, width - 56, height - 56, 18);
  targetCtx.stroke();
  targetCtx.restore();
   getSubjectItems().sort((a, b) => a.y - b.y).forEach(subject => {
    const projected = projectFrontal(subject, width, height);
    drawPersonFigure(targetCtx, projected.x, projected.y, subject.gender, projected.scale, { pose: subject.pose });
  });
}
function isoProject(x, y, z, metrics) {
  const base = metrics.scale * 0.48;
  return {
    x: metrics.width / 2 + state.panX + (x - y) * base * state.zoom,
    y: metrics.height * 0.62 + state.panY + ((x + y) * 0.5 - z) * base * 0.82 * state.zoom
  };
}
 function rotateOffset(dx, dy, angle) {
  return {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle)
  };
}
 function isoPointForItem(item, dx, dy, z, metrics, extraRotation = 0) {
  const rotated = rotateOffset(dx, dy, degToRad(item.rotation || 0) + extraRotation);
  return isoProject(item.x + rotated.x, item.y + rotated.y, z, metrics);
}
 function drawIsoPolygon(targetCtx, points, fillStyle, strokeStyle, lineWidth = 1.2) {
  if (!points || points.length < 2) return;
  targetCtx.beginPath();
  targetCtx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(point => targetCtx.lineTo(point.x, point.y));
  targetCtx.closePath();
  if (fillStyle) {
    targetCtx.fillStyle = fillStyle;
    targetCtx.fill();
  }
  if (strokeStyle) {
    targetCtx.strokeStyle = strokeStyle;
    targetCtx.lineWidth = lineWidth;
    targetCtx.stroke();
  }
}
 function drawIsoLine(targetCtx, a, b, strokeStyle, lineWidth = 1.6) {
  targetCtx.strokeStyle = strokeStyle;
  targetCtx.lineWidth = lineWidth;
  targetCtx.beginPath();
  targetCtx.moveTo(a.x, a.y);
  targetCtx.lineTo(b.x, b.y);
  targetCtx.stroke();
}
 function drawIsoShadow(targetCtx, item, metrics, radiusX, radiusY, alpha = 0.18) {
  const anchor = isoProject(item.x, item.y, 0, metrics);
  targetCtx.save();
  targetCtx.fillStyle = "rgba(0,0,0," + alpha + ")";
  targetCtx.beginPath();
  targetCtx.ellipse(anchor.x + radiusX * 0.06, anchor.y + radiusY * 0.22, radiusX, radiusY, -0.22, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
 function drawIsoPrism(targetCtx, item, metrics, options = {}) {
  const dx = options.dx || 0;
  const dy = options.dy || 0;
  const z = options.z || 0;
  const width = options.width || 0.3;
  const depth = options.depth || 0.18;
  const height = options.height || 0.18;
  const extraRotation = options.extraRotation || 0;
  const strokeStyle = options.strokeStyle || "rgba(255,255,255,0.18)";
  const p000 = isoPointForItem(item, dx - width / 2, dy - depth / 2, z, metrics, extraRotation);
  const p100 = isoPointForItem(item, dx + width / 2, dy - depth / 2, z, metrics, extraRotation);
  const p110 = isoPointForItem(item, dx + width / 2, dy + depth / 2, z, metrics, extraRotation);
  const p010 = isoPointForItem(item, dx - width / 2, dy + depth / 2, z, metrics, extraRotation);
  const p001 = isoPointForItem(item, dx - width / 2, dy - depth / 2, z + height, metrics, extraRotation);
  const p101 = isoPointForItem(item, dx + width / 2, dy - depth / 2, z + height, metrics, extraRotation);
  const p111 = isoPointForItem(item, dx + width / 2, dy + depth / 2, z + height, metrics, extraRotation);
  const p011 = isoPointForItem(item, dx - width / 2, dy + depth / 2, z + height, metrics, extraRotation);
  drawIsoPolygon(targetCtx, [p000, p100, p101, p001], options.sideColor || options.fillColor || "#314050", strokeStyle);
  drawIsoPolygon(targetCtx, [p100, p110, p111, p101], options.frontColor || options.fillColor || "#405267", strokeStyle);
  drawIsoPolygon(targetCtx, [p001, p101, p111, p011], options.topColor || options.fillColor || "#53677f", strokeStyle);
  return {
    center: isoPointForItem(item, dx, dy, z + height / 2, metrics, extraRotation),
    centerTop: isoPointForItem(item, dx, dy, z + height, metrics, extraRotation)
  };
}
 function drawIsoStand(targetCtx, item, metrics, topHeight, options = {}) {
  const spread = options.spread || 0.28;
  const standColor = options.color || 'rgba(151, 161, 174, 0.92)';
  const lowerCollar = isoPointForItem(item, 0, 0, Math.max(0.12, Math.min(topHeight * 0.22, 0.52)), metrics);
  const upperCollar = isoPointForItem(item, 0, 0, Math.max(0.28, Math.min(topHeight * 0.6, topHeight - 0.12)), metrics);
  const top = isoPointForItem(item, 0, 0, topHeight, metrics);
  const legs = [
    isoPointForItem(item, spread, 0, 0, metrics),
    isoPointForItem(item, -spread * 0.58, spread * 0.72, 0, metrics),
    isoPointForItem(item, -spread * 0.58, -spread * 0.72, 0, metrics)
  ];
  targetCtx.save();
  targetCtx.lineCap = 'round';
  legs.forEach(leg => drawIsoLine(targetCtx, lowerCollar, leg, 'rgba(9,12,16,0.48)', 4));
  drawIsoLine(targetCtx, lowerCollar, upperCollar, 'rgba(9,12,16,0.48)', 4.2);
  drawIsoLine(targetCtx, upperCollar, top, 'rgba(9,12,16,0.48)', 4.2);
  legs.forEach(leg => drawIsoLine(targetCtx, lowerCollar, leg, standColor, 2));
  drawIsoLine(targetCtx, lowerCollar, upperCollar, standColor, 2.3);
  drawIsoLine(targetCtx, upperCollar, top, standColor, 2.3);
  targetCtx.fillStyle = 'rgba(240,244,248,0.82)';
  targetCtx.beginPath();
  targetCtx.arc(top.x, top.y, 3.2, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = 'rgba(255,255,255,0.2)';
  targetCtx.beginPath();
  targetCtx.arc(top.x - 1, top.y - 1, 1.1, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.beginPath();
  targetCtx.ellipse(lowerCollar.x, lowerCollar.y, 3.8, 2.6, 0, 0, Math.PI * 2);
  targetCtx.fillStyle = 'rgba(82,92,104,0.9)';
  targetCtx.fill();
  targetCtx.beginPath();
  targetCtx.ellipse(upperCollar.x, upperCollar.y, 3.4, 2.4, 0, 0, Math.PI * 2);
  targetCtx.fillStyle = 'rgba(74,84,96,0.9)';
  targetCtx.fill();
  targetCtx.restore();
  return { collar: lowerCollar, upperCollar, top, legs };
}
function getBackdropColor(item) {
  if (item.background === "vinyl-white") return "rgba(244,246,249,0.96)";
  if (item.background === "paper-gray") return "rgba(162,170,181,0.94)";
  if (item.background === "muslin") return "rgba(168,146,122,0.94)";
  if (item.background === "chroma") return "rgba(84,186,110,0.92)";
  return "rgba(221,226,232,0.94)";
}
 function drawIsoSubjectUnit(targetCtx, item, metrics, offsetX, gender, pose) {
  const palette = getSubjectPalette(gender);
  const build = getSubjectBuild(gender);
  const totalHeight = pose === 'bust' ? Math.max(0.9, item.height * 0.74) : item.height;
  const shoulderWidth = (gender === 'child' ? 0.11 : 0.15) * build.shoulder;
  const waistWidth = shoulderWidth * build.waist;
  const hipWidth = shoulderWidth * build.hip;
  const shoulderZ = totalHeight * (pose === 'bust' ? 0.56 : pose === 'seated' ? 0.72 : 0.76);
  const chestZ = totalHeight * (pose === 'bust' ? 0.48 : 0.64);
  const waistZ = totalHeight * (pose === 'bust' ? 0.4 : 0.54);
  const hipZ = totalHeight * (pose === 'bust' ? 0.3 : pose === 'seated' ? 0.46 : 0.48);
  const headZ = totalHeight * (pose === 'bust' ? 0.82 : 0.92);
  const neckZ = totalHeight * (pose === 'bust' ? 0.72 : 0.8);
  const torso = [
    isoPointForItem(item, offsetX - shoulderWidth, 0, shoulderZ, metrics),
    isoPointForItem(item, offsetX - shoulderWidth * 0.86, 0, chestZ, metrics),
    isoPointForItem(item, offsetX - waistWidth, 0, waistZ, metrics),
    isoPointForItem(item, offsetX - hipWidth, 0, hipZ, metrics),
    isoPointForItem(item, offsetX + hipWidth, 0, hipZ, metrics),
    isoPointForItem(item, offsetX + waistWidth, 0, waistZ, metrics),
    isoPointForItem(item, offsetX + shoulderWidth * 0.86, 0, chestZ, metrics),
    isoPointForItem(item, offsetX + shoulderWidth, 0, shoulderZ, metrics)
  ];
  targetCtx.save();
  drawIsoPolygon(targetCtx, torso, rgbString(palette.outfit, 0.94), 'rgba(255,255,255,0.12)', 1.1);
  drawIsoPolygon(targetCtx, [
    isoPointForItem(item, offsetX - shoulderWidth * 0.14, 0.01, shoulderZ * 0.98, metrics),
    isoPointForItem(item, offsetX + shoulderWidth * 0.18, 0.01, shoulderZ * 0.98, metrics),
    isoPointForItem(item, offsetX + waistWidth * 0.32, 0.01, waistZ, metrics),
    isoPointForItem(item, offsetX - waistWidth * 0.22, 0.01, waistZ, metrics)
  ], 'rgba(255,255,255,0.08)', null, 0);
  drawIsoLine(targetCtx, isoPointForItem(item, offsetX - shoulderWidth * 0.9, 0, shoulderZ, metrics), isoPointForItem(item, offsetX - shoulderWidth * 1.18, 0.06, chestZ * 0.88, metrics), rgbString(darken(palette.outfit, 0.12)), 2.6);
  drawIsoLine(targetCtx, isoPointForItem(item, offsetX + shoulderWidth * 0.9, 0, shoulderZ, metrics), isoPointForItem(item, offsetX + shoulderWidth * 1.18, -0.06, chestZ * 0.88, metrics), rgbString(darken(palette.outfit, 0.12)), 2.6);
  if (pose === 'seated') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: offsetX,
      dy: 0,
      z: 0.42,
      width: 0.3,
      depth: 0.28,
      height: 0.04,
      sideColor: 'rgba(34,40,48,0.92)',
      frontColor: 'rgba(24,28,34,0.96)',
      topColor: 'rgba(58,66,76,0.9)',
      strokeStyle: 'rgba(255,255,255,0.08)'
    });
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX - hipWidth * 0.34, 0, hipZ, metrics), isoPointForItem(item, offsetX - 0.16, 0.12, 0.56, metrics), rgbString(darken(palette.outfit, 0.16)), 2.8);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX + hipWidth * 0.34, 0, hipZ, metrics), isoPointForItem(item, offsetX + 0.16, -0.12, 0.56, metrics), rgbString(darken(palette.outfit, 0.16)), 2.8);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX - 0.16, 0.12, 0.56, metrics), isoPointForItem(item, offsetX - 0.12, 0.16, 0.02, metrics), rgbString(darken(palette.outfit, 0.18)), 2.8);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX + 0.16, -0.12, 0.56, metrics), isoPointForItem(item, offsetX + 0.12, -0.16, 0.02, metrics), rgbString(darken(palette.outfit, 0.18)), 2.8);
  } else if (pose !== 'bust') {
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX - hipWidth * 0.22, 0, hipZ, metrics), isoPointForItem(item, offsetX - 0.08 * build.stance, 0.02, totalHeight * 0.24, metrics), rgbString(darken(palette.outfit, 0.16)), 3);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX - 0.08 * build.stance, 0.02, totalHeight * 0.24, metrics), isoPointForItem(item, offsetX - 0.1 * build.stance, 0.03, 0.02, metrics), rgbString(darken(palette.outfit, 0.18)), 3);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX + hipWidth * 0.22, 0, hipZ, metrics), isoPointForItem(item, offsetX + 0.08 * build.stance, -0.02, totalHeight * 0.24, metrics), rgbString(darken(palette.outfit, 0.16)), 3);
    drawIsoLine(targetCtx, isoPointForItem(item, offsetX + 0.08 * build.stance, -0.02, totalHeight * 0.24, metrics), isoPointForItem(item, offsetX + 0.1 * build.stance, -0.03, 0.02, metrics), rgbString(darken(palette.outfit, 0.18)), 3);
  }
  const head = isoPointForItem(item, offsetX, 0, headZ, metrics);
  const neck = isoPointForItem(item, offsetX, 0, neckZ, metrics);
  const headRadius = Math.max(4.8, metrics.scale * state.zoom * (gender === 'child' ? 0.044 : 0.05) * build.head);
  drawIsoLine(targetCtx, neck, isoPointForItem(item, offsetX, 0, shoulderZ, metrics), rgbString(palette.skin, 0.94), 3.2);
  if (gender === 'female' || pose === 'bust') {
    targetCtx.fillStyle = palette.hair;
    targetCtx.beginPath();
    targetCtx.ellipse(head.x, head.y + headRadius * 0.18, headRadius * 0.98, headRadius * 1.26, 0, 0, Math.PI * 2);
    targetCtx.fill();
  }
  targetCtx.fillStyle = rgbString(palette.skin, 0.96);
  targetCtx.beginPath();
  targetCtx.ellipse(head.x, head.y, headRadius * 0.94, headRadius * 1.08, 0, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = palette.hair;
  targetCtx.beginPath();
  targetCtx.arc(head.x, head.y - headRadius * 0.08, headRadius * 1.02, Math.PI, Math.PI * 2);
  targetCtx.lineTo(head.x + headRadius * 0.94, head.y + headRadius * (gender === 'female' ? 0.3 : 0.14));
  targetCtx.quadraticCurveTo(head.x, head.y + headRadius * (gender === 'female' ? 0.74 : 0.3), head.x - headRadius * 0.94, head.y + headRadius * (gender === 'female' ? 0.3 : 0.14));
  targetCtx.closePath();
  targetCtx.fill();
  targetCtx.fillStyle = 'rgba(255,255,255,0.18)';
  targetCtx.beginPath();
  targetCtx.ellipse(head.x - headRadius * 0.24, head.y - headRadius * 0.2, headRadius * 0.28, headRadius * 0.16, -0.3, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
 function drawIsoSubjectItem(targetCtx, item, metrics) {
  drawIsoShadow(targetCtx, item, metrics, Math.max(12, item.w * metrics.scale * 0.22 * state.zoom), Math.max(6, item.w * metrics.scale * 0.1 * state.zoom), 0.16);
  if (item.pose === "couple") {
    drawIsoSubjectUnit(targetCtx, item, metrics, -item.w * 0.18, "female", "standing");
    drawIsoSubjectUnit(targetCtx, item, metrics, item.w * 0.18, "male", "standing");
    return;
  }
  drawIsoSubjectUnit(targetCtx, item, metrics, 0, item.gender === "mixed" ? "neutral" : item.gender, item.pose);
}
 function drawIsoCameraItem(targetCtx, item, metrics) {
  drawIsoShadow(targetCtx, item, metrics, Math.max(16, item.w * metrics.scale * 0.42 * state.zoom), Math.max(8, item.h * metrics.scale * 0.18 * state.zoom), 0.18);
  const stand = drawIsoStand(targetCtx, item, metrics, Math.max(0.95, item.height - 0.12), { spread: 0.34, color: 'rgba(148,157,168,0.94)' });
  drawIsoPrism(targetCtx, item, metrics, {
    dx: 0.02,
    dy: 0,
    z: item.height - 0.17,
    width: Math.max(0.26, item.w * 0.56),
    depth: Math.max(0.2, item.h * 0.46),
    height: 0.18,
    sideColor: 'rgba(36,44,54,0.98)',
    frontColor: 'rgba(24,30,37,1)',
    topColor: 'rgba(82,94,108,0.92)'
  });
  drawIsoPrism(targetCtx, item, metrics, {
    dx: -0.12,
    dy: 0,
    z: item.height - 0.14,
    width: 0.14,
    depth: 0.16,
    height: 0.18,
    sideColor: 'rgba(44,53,64,0.98)',
    frontColor: 'rgba(28,33,41,1)',
    topColor: 'rgba(92,104,120,0.9)'
  });
  drawIsoPrism(targetCtx, item, metrics, {
    dx: -0.02,
    dy: 0,
    z: item.height + 0.01,
    width: 0.14,
    depth: 0.12,
    height: 0.08,
    sideColor: 'rgba(48,58,69,0.96)',
    frontColor: 'rgba(33,39,48,0.98)',
    topColor: 'rgba(98,110,126,0.9)'
  });
  drawIsoPrism(targetCtx, item, metrics, {
    dx: item.w * 0.34,
    dy: 0,
    z: item.height - 0.1,
    width: Math.max(0.24, item.w * 0.34),
    depth: Math.max(0.18, item.h * 0.26),
    height: 0.12,
    sideColor: 'rgba(18,24,30,0.98)',
    frontColor: 'rgba(12,16,22,1)',
    topColor: 'rgba(42,50,61,0.92)'
  });
  drawIsoPrism(targetCtx, item, metrics, {
    dx: item.w * 0.52,
    dy: 0,
    z: item.height - 0.08,
    width: Math.max(0.12, item.w * 0.18),
    depth: Math.max(0.16, item.h * 0.2),
    height: 0.11,
    sideColor: 'rgba(30,36,44,0.98)',
    frontColor: 'rgba(20,24,30,1)',
    topColor: 'rgba(74,84,96,0.88)'
  });
  const glass = isoPointForItem(item, item.w * 0.58, 0, item.height - 0.02, metrics);
  targetCtx.save();
  drawLensGlass(targetCtx, glass.x, glass.y, 8.2, 5.4, { innerColor: 'rgba(146,204,255,0.38)', ringAlpha: 0.14 });
  targetCtx.fillStyle = 'rgba(255,255,255,0.12)';
  targetCtx.beginPath();
  targetCtx.ellipse(glass.x - 4, glass.y - 3, 3.2, 1.6, -0.24, 0, Math.PI * 2);
  targetCtx.fill();
  const hotShoe = isoPointForItem(item, -0.02, 0, item.height + 0.12, metrics);
  targetCtx.fillStyle = 'rgba(12,16,22,0.96)';
  targetCtx.fillRect(hotShoe.x - 3, hotShoe.y - 1, 6, 2.4);
  const directionEnd = isoPointForItem(item, item.w * 1.28, 0, item.height - 0.03, metrics);
  drawIsoLine(targetCtx, glass, directionEnd, 'rgba(240,165,0,0.9)', 1.8);
  drawIsoLine(targetCtx, stand.top, isoPointForItem(item, 0, 0, item.height - 0.04, metrics), 'rgba(176,186,198,0.6)', 1.6);
  targetCtx.restore();
}
function drawIsoBackdropItem(targetCtx, item, metrics) {
  drawIsoShadow(targetCtx, item, metrics, Math.max(20, item.w * metrics.scale * 0.32 * state.zoom), Math.max(7, metrics.scale * state.zoom * 0.1), 0.12);
  const leftBase = isoPointForItem(item, -item.w / 2, 0, 0, metrics);
  const rightBase = isoPointForItem(item, item.w / 2, 0, 0, metrics);
  const leftTop = isoPointForItem(item, -item.w / 2, 0, item.height, metrics);
  const rightTop = isoPointForItem(item, item.w / 2, 0, item.height, metrics);
  const sweepLeft = isoPointForItem(item, -item.w / 2, 0.28, 0, metrics);
  const sweepRight = isoPointForItem(item, item.w / 2, 0.28, 0, metrics);
  const panelGradient = targetCtx.createLinearGradient((leftTop.x + rightTop.x) / 2, leftTop.y, (leftBase.x + rightBase.x) / 2, leftBase.y);
  const panelColor = getBackdropColor(item);
  panelGradient.addColorStop(0, panelColor.replace('0.94', '0.98').replace('0.96', '0.98').replace('0.92', '0.98'));
  panelGradient.addColorStop(0.66, panelColor);
  panelGradient.addColorStop(1, 'rgba(0,0,0,0.08)');
  const sweepGradient = targetCtx.createLinearGradient((leftBase.x + rightBase.x) / 2, leftBase.y, (sweepLeft.x + sweepRight.x) / 2, sweepLeft.y);
  sweepGradient.addColorStop(0, 'rgba(255,255,255,0.08)');
  sweepGradient.addColorStop(1, 'rgba(0,0,0,0.08)');
  targetCtx.save();
  drawIsoPolygon(targetCtx, [leftBase, rightBase, rightTop, leftTop], panelGradient, 'rgba(255,255,255,0.16)', 1.2);
  drawIsoPolygon(targetCtx, [leftBase, rightBase, sweepRight, sweepLeft], sweepGradient, 'rgba(255,255,255,0.06)', 1);
  drawIsoLine(targetCtx, leftBase, leftTop, 'rgba(214,220,226,0.92)', 2.4);
  drawIsoLine(targetCtx, rightBase, rightTop, 'rgba(214,220,226,0.92)', 2.4);
  drawIsoLine(targetCtx, leftTop, rightTop, 'rgba(228,234,240,0.92)', 2.8);
  drawIsoLine(targetCtx, isoPointForItem(item, -item.w / 2 - 0.12, 0.12, 0, metrics), leftTop, 'rgba(140,150,162,0.58)', 1.6);
  drawIsoLine(targetCtx, isoPointForItem(item, item.w / 2 + 0.12, -0.12, 0, metrics), rightTop, 'rgba(140,150,162,0.58)', 1.6);
  drawIsoPolygon(targetCtx, [
    isoPointForItem(item, -item.w * 0.26, 0.02, item.height * 0.72, metrics),
    isoPointForItem(item, item.w * 0.08, 0.02, item.height * 0.72, metrics),
    isoPointForItem(item, item.w * 0.12, 0.02, item.height * 0.22, metrics),
    isoPointForItem(item, -item.w * 0.22, 0.02, item.height * 0.22, metrics)
  ], 'rgba(255,255,255,0.08)', null, 0);
  targetCtx.restore();
}
function drawIsoLightItem(targetCtx, item, metrics) {
  const variant = getModifierFamily(item);
  const lightColor = getLightColor(item);
  if (variant === 'sun') {
    const sun = isoProject(item.x, item.y, item.height, metrics);
    targetCtx.save();
    drawGlowDisc(targetCtx, sun.x, sun.y, 30, lightColor, 0.24);
    targetCtx.fillStyle = 'rgba(255,210,112,0.96)';
    targetCtx.beginPath();
    targetCtx.arc(sun.x, sun.y, 14, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,220,144,0.88)';
    targetCtx.lineWidth = 2;
    for (let i = 0; i < 8; i += 1) {
      const angle = i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(sun.x + Math.cos(angle) * 18, sun.y + Math.sin(angle) * 18);
      targetCtx.lineTo(sun.x + Math.cos(angle) * 30, sun.y + Math.sin(angle) * 30);
      targetCtx.stroke();
    }
    targetCtx.restore();
    return;
  }
  if (variant === 'window') {
    const leftBase = isoPointForItem(item, -item.w / 2, 0, 0.28, metrics);
    const rightBase = isoPointForItem(item, item.w / 2, 0, 0.28, metrics);
    const leftTop = isoPointForItem(item, -item.w / 2, 0, 2.45, metrics);
    const rightTop = isoPointForItem(item, item.w / 2, 0, 2.45, metrics);
    targetCtx.save();
    const frame = targetCtx.createLinearGradient(leftBase.x, leftTop.y, rightBase.x, rightBase.y);
    frame.addColorStop(0, 'rgba(36,48,61,0.98)');
    frame.addColorStop(1, 'rgba(14,18,23,0.98)');
    drawIsoPolygon(targetCtx, [leftBase, rightBase, rightTop, leftTop], frame, 'rgba(233,244,255,0.34)', 1.4);
    const pane = targetCtx.createLinearGradient(leftBase.x, leftTop.y, rightBase.x, rightBase.y);
    pane.addColorStop(0, 'rgba(182,224,255,0.44)');
    pane.addColorStop(1, 'rgba(114,188,255,0.24)');
    drawIsoPolygon(targetCtx, [
      isoPointForItem(item, -item.w / 2 + 0.08, 0.01, 0.34, metrics),
      isoPointForItem(item, item.w / 2 - 0.08, 0.01, 0.34, metrics),
      isoPointForItem(item, item.w / 2 - 0.08, 0.01, 2.37, metrics),
      isoPointForItem(item, -item.w / 2 + 0.08, 0.01, 2.37, metrics)
    ], pane, null, 0);
    const midTop = isoPointForItem(item, 0, 0, 2.45, metrics);
    const midBase = isoPointForItem(item, 0, 0, 0.28, metrics);
    drawIsoLine(targetCtx, leftBase, leftTop, 'rgba(238,244,248,0.92)', 2);
    drawIsoLine(targetCtx, rightBase, rightTop, 'rgba(238,244,248,0.92)', 2);
    drawIsoLine(targetCtx, leftTop, rightTop, 'rgba(238,244,248,0.92)', 2.2);
    drawIsoLine(targetCtx, midBase, midTop, 'rgba(255,255,255,0.34)', 1.2);
    drawGlowDisc(targetCtx, (leftBase.x + rightBase.x) / 2, (leftBase.y + leftTop.y) / 2, 36, 'rgba(176,220,255,1)', 0.1);
    targetCtx.restore();
    return;
  }
  drawIsoShadow(targetCtx, item, metrics, Math.max(12, item.w * metrics.scale * 0.22 * state.zoom), Math.max(6, item.h * metrics.scale * 0.1 * state.zoom), 0.16);
  const stand = drawIsoStand(targetCtx, item, metrics, Math.max(0.95, item.height - 0.16), { spread: 0.3, color: 'rgba(146,156,168,0.92)' });
  drawIsoLine(targetCtx, stand.top, isoPointForItem(item, -0.04, 0, item.height - 0.12, metrics), 'rgba(178,188,200,0.68)', 1.8);
  if (variant === 'led-panel') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: -0.02,
      dy: 0,
      z: item.height - 0.56,
      width: Math.max(0.36, item.w * 0.92),
      depth: 0.09,
      height: 0.46,
      sideColor: 'rgba(33,39,47,0.98)',
      frontColor: 'rgba(20,26,32,1)',
      topColor: 'rgba(74,84,96,0.9)'
    });
  } else if (variant === 'fresnel') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: -0.04,
      dy: 0,
      z: item.height - 0.2,
      width: 0.24,
      depth: 0.18,
      height: 0.18,
      sideColor: 'rgba(42,48,56,0.98)',
      frontColor: 'rgba(30,35,42,1)',
      topColor: 'rgba(90,98,108,0.88)'
    });
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0.12,
      dy: 0,
      z: item.height - 0.16,
      width: 0.16,
      depth: 0.16,
      height: 0.14,
      sideColor: 'rgba(28,34,40,0.98)',
      frontColor: 'rgba(18,22,28,1)',
      topColor: 'rgba(72,82,94,0.88)'
    });
  } else if (variant === 'speedlight') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0,
      dy: 0,
      z: item.height - 0.24,
      width: 0.16,
      depth: 0.12,
      height: 0.22,
      sideColor: 'rgba(30,35,42,0.98)',
      frontColor: 'rgba(18,22,28,1)',
      topColor: 'rgba(82,90,102,0.88)'
    });
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0.16,
      dy: 0,
      z: item.height - 0.04,
      width: 0.2,
      depth: 0.12,
      height: 0.1,
      sideColor: 'rgba(42,48,56,0.98)',
      frontColor: 'rgba(28,34,40,1)',
      topColor: 'rgba(98,108,122,0.9)'
    });
  } else if (variant === 'torch') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0.08,
      dy: 0,
      z: item.height - 0.16,
      width: 0.34,
      depth: 0.12,
      height: 0.14,
      sideColor: 'rgba(28,34,40,0.98)',
      frontColor: 'rgba(16,20,27,1)',
      topColor: 'rgba(72,82,94,0.88)'
    });
  } else {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: -0.02,
      dy: 0,
      z: item.height - 0.22,
      width: Math.max(0.28, item.w * 0.68),
      depth: Math.max(0.18, item.h * 0.48),
      height: 0.22,
      sideColor: 'rgba(29,34,40,0.98)',
      frontColor: 'rgba(20,24,31,1)',
      topColor: 'rgba(78,88,101,0.9)'
    });
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0.18,
      dy: 0,
      z: item.height - 0.16,
      width: 0.16,
      depth: 0.16,
      height: 0.12,
      sideColor: 'rgba(24,29,35,0.98)',
      frontColor: 'rgba(16,20,26,1)',
      topColor: 'rgba(62,72,84,0.88)'
    });
  }
  const emitter = isoPointForItem(item, Math.max(item.w * 0.32, 0.16), 0, item.height - 0.02, metrics);
  targetCtx.save();
  drawGlowDisc(targetCtx, emitter.x, emitter.y, 24, lightColor, 0.16);
  drawLensGlass(targetCtx, emitter.x, emitter.y, 6.2, 4.8, { innerColor: withAlpha(lightColor, 0.36), ringAlpha: 0.14 });
  targetCtx.fillStyle = lightColor;
  targetCtx.beginPath();
  targetCtx.arc(emitter.x, emitter.y, 4.4, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.fillStyle = '#ffffff';
  targetCtx.beginPath();
  targetCtx.arc(emitter.x - 1.4, emitter.y - 1.2, 1.5, 0, Math.PI * 2);
  targetCtx.fill();
  targetCtx.restore();
}
function drawIsoModifierItem(targetCtx, item, metrics) {
  const family = getModifierFamily(item);
  const isEmitter = !!item.mountLight;
  const lightColor = getLightColor(item);
  drawIsoShadow(targetCtx, item, metrics, Math.max(12, item.w * metrics.scale * 0.24 * state.zoom), Math.max(6, item.h * metrics.scale * 0.1 * state.zoom), 0.16);
  const stand = drawIsoStand(targetCtx, item, metrics, Math.max(0.86, item.height - 0.12), { spread: family === 'flag' ? 0.34 : 0.28, color: 'rgba(146,156,168,0.92)' });
  if (isEmitter) {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: -0.1,
      dy: 0,
      z: item.height - 0.14,
      width: 0.18,
      depth: 0.14,
      height: 0.12,
      sideColor: 'rgba(22,28,34,0.98)',
      frontColor: 'rgba(14,18,24,1)',
      topColor: 'rgba(72,80,93,0.88)'
    });
  }
  const faceCenter = isoPointForItem(item, 0, 0, item.height - 0.16, metrics);
  drawIsoLine(targetCtx, stand.top, isoPointForItem(item, -0.04, 0, item.height - 0.12, metrics), 'rgba(180,190,202,0.72)', 1.8);
  targetCtx.save();
  if (family === 'softbox' || family === 'strip-box' || family === 'flag' || family === 'grid' || family === 'gel' || family === 'barn-doors') {
    const panelWidth = family === 'strip-box' ? Math.max(0.24, Math.min(item.w, item.h)) : Math.max(0.36, Math.max(item.w, item.h) * 0.74);
    const panelHeight = family === 'strip-box' ? Math.max(item.w, item.h) : family === 'flag' ? Math.max(item.w, item.h) * 0.9 : Math.max(item.w, item.h) * 0.78;
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0,
      dy: 0,
      z: item.height - panelHeight * 0.5 - 0.08,
      width: panelWidth,
      depth: 0.08,
      height: panelHeight,
      sideColor: family === 'flag' ? 'rgba(18,22,26,1)' : 'rgba(34,40,48,0.98)',
      frontColor: family === 'flag' ? 'rgba(12,16,20,1)' : 'rgba(24,29,35,1)',
      topColor: family === 'flag' ? 'rgba(28,33,38,0.98)' : 'rgba(74,82,94,0.9)'
    });
    if (family !== 'flag' && family !== 'barn-doors') {
      const inner = targetCtx.createRadialGradient(faceCenter.x - 5, faceCenter.y - 6, 0, faceCenter.x, faceCenter.y, family === 'strip-box' ? 24 : 30);
      inner.addColorStop(0, isEmitter ? withAlpha(lightColor, 0.18) : 'rgba(255,255,255,0.08)');
      inner.addColorStop(0.52, 'rgba(245,247,249,0.08)');
      inner.addColorStop(1, 'rgba(0,0,0,0.16)');
      targetCtx.fillStyle = inner;
      targetCtx.fillRect(faceCenter.x - (family === 'strip-box' ? 10 : 16), faceCenter.y - (family === 'strip-box' ? 22 : 14), family === 'strip-box' ? 20 : 32, family === 'strip-box' ? 44 : 28);
    }
    if (family === 'grid') {
      targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
      targetCtx.lineWidth = 1;
      for (let i = -2; i <= 2; i += 1) {
        targetCtx.beginPath();
        targetCtx.moveTo(faceCenter.x + i * 5, faceCenter.y - 16);
        targetCtx.lineTo(faceCenter.x + i * 5, faceCenter.y + 16);
        targetCtx.moveTo(faceCenter.x - 16, faceCenter.y + i * 5);
        targetCtx.lineTo(faceCenter.x + 16, faceCenter.y + i * 5);
        targetCtx.stroke();
      }
    }
    if (family === 'gel') {
      const gelGrad = targetCtx.createLinearGradient(faceCenter.x - 16, faceCenter.y - 18, faceCenter.x + 16, faceCenter.y + 18);
      gelGrad.addColorStop(0, 'rgba(255,174,97,0.78)');
      gelGrad.addColorStop(0.5, 'rgba(163,84,245,0.72)');
      gelGrad.addColorStop(1, 'rgba(104,194,255,0.76)');
      targetCtx.fillStyle = gelGrad;
      targetCtx.fillRect(faceCenter.x - 17, faceCenter.y - 18, 34, 36);
    }
    if (family === 'barn-doors') {
      drawIsoPolygon(targetCtx, [
        { x: faceCenter.x - 14, y: faceCenter.y - 4 },
        { x: faceCenter.x - 28, y: faceCenter.y - 16 },
        { x: faceCenter.x - 26, y: faceCenter.y + 12 }
      ], 'rgba(17,21,26,0.96)', 'rgba(255,255,255,0.08)', 1);
      drawIsoPolygon(targetCtx, [
        { x: faceCenter.x + 14, y: faceCenter.y - 4 },
        { x: faceCenter.x + 28, y: faceCenter.y - 16 },
        { x: faceCenter.x + 26, y: faceCenter.y + 12 }
      ], 'rgba(17,21,26,0.96)', 'rgba(255,255,255,0.08)', 1);
      drawGlowDisc(targetCtx, faceCenter.x, faceCenter.y, 20, lightColor, isEmitter ? 0.14 : 0.06);
    }
  } else if (family === 'octobox') {
    const radius = Math.max(18, Math.max(item.w, item.h) * metrics.scale * 0.22 * state.zoom);
    targetCtx.save();
    targetCtx.translate(faceCenter.x, faceCenter.y);
    octagonPath(targetCtx, 0, 0, radius, radius * 0.88);
    targetCtx.fillStyle = 'rgba(32,38,46,0.98)';
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    octagonPath(targetCtx, 0, 0, radius * 0.72, radius * 0.58);
    const inner = targetCtx.createRadialGradient(-radius * 0.14, -radius * 0.18, 0, 0, 0, radius * 0.82);
    inner.addColorStop(0, isEmitter ? withAlpha(lightColor, 0.18) : 'rgba(255,255,255,0.08)');
    inner.addColorStop(1, 'rgba(0,0,0,0.16)');
    targetCtx.fillStyle = inner;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 8; i += 1) {
      const angle = Math.PI / 8 + i * Math.PI / 4;
      targetCtx.beginPath();
      targetCtx.moveTo(0, 0);
      targetCtx.lineTo(Math.cos(angle) * radius * 0.72, Math.sin(angle) * radius * 0.58);
      targetCtx.stroke();
    }
    targetCtx.restore();
  } else if (family === 'beauty-dish' || family === 'reflector' || family === 'parabolic' || family === 'ring-flash') {
    const radiusX = family === 'parabolic' ? 24 : family === 'reflector' ? 20 : 18;
    const radiusY = family === 'parabolic' ? 18 : family === 'reflector' ? 14 : 18;
    const bowl = targetCtx.createRadialGradient(faceCenter.x - radiusX * 0.18, faceCenter.y - radiusY * 0.22, 0, faceCenter.x, faceCenter.y, radiusX);
    bowl.addColorStop(0, family === 'reflector' ? 'rgba(255,255,255,0.42)' : 'rgba(168,178,190,0.18)');
    bowl.addColorStop(0.46, family === 'reflector' ? 'rgba(198,206,214,0.94)' : 'rgba(31,36,43,0.98)');
    bowl.addColorStop(1, family === 'reflector' ? 'rgba(124,132,144,0.96)' : 'rgba(15,18,24,1)');
    targetCtx.beginPath();
    targetCtx.ellipse(faceCenter.x, faceCenter.y, radiusX, radiusY, 0, 0, Math.PI * 2);
    targetCtx.fillStyle = bowl;
    targetCtx.fill();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
    targetCtx.lineWidth = 1.2;
    targetCtx.stroke();
    if (family === 'ring-flash') {
      targetCtx.strokeStyle = isEmitter ? withAlpha(lightColor, 0.88) : 'rgba(255,229,184,0.84)';
      targetCtx.lineWidth = 7;
      targetCtx.beginPath();
      targetCtx.arc(faceCenter.x, faceCenter.y, 12, 0, Math.PI * 2);
      targetCtx.stroke();
    } else {
      targetCtx.fillStyle = isEmitter ? withAlpha(lightColor, 0.18) : 'rgba(14,18,23,0.92)';
      targetCtx.beginPath();
      targetCtx.arc(faceCenter.x, faceCenter.y, family === 'parabolic' ? 6 : 5, 0, Math.PI * 2);
      targetCtx.fill();
    }
  } else if (family === 'snoot') {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0.08,
      dy: 0,
      z: item.height - 0.18,
      width: 0.32,
      depth: 0.12,
      height: 0.14,
      sideColor: 'rgba(28,33,40,0.98)',
      frontColor: 'rgba(18,22,28,1)',
      topColor: 'rgba(68,76,87,0.88)'
    });
    drawGlowDisc(targetCtx, faceCenter.x + 10, faceCenter.y, 18, lightColor, isEmitter ? 0.14 : 0.06);
  } else {
    drawIsoPrism(targetCtx, item, metrics, {
      dx: 0,
      dy: 0,
      z: item.height - 0.24,
      width: Math.max(0.28, item.w * 0.6),
      depth: 0.08,
      height: Math.max(0.4, Math.max(item.w, item.h) * 0.6),
      sideColor: 'rgba(34,40,48,0.98)',
      frontColor: 'rgba(24,29,35,1)',
      topColor: 'rgba(74,82,94,0.9)'
    });
  }
  if (isEmitter) {
    drawGlowDisc(targetCtx, faceCenter.x, faceCenter.y, 28, lightColor, 0.14);
  }
  targetCtx.restore();
}
function drawIsoItem(targetCtx, item, metrics) {
  if (item.type === "camera") {
    drawIsoCameraItem(targetCtx, item, metrics);
    return;
  }
  if (item.type === "light") {
    drawIsoLightItem(targetCtx, item, metrics);
    return;
  }
  if (item.type === "modifier") {
    drawIsoModifierItem(targetCtx, item, metrics);
    return;
  }
  if (item.type === "backdrop") {
    drawIsoBackdropItem(targetCtx, item, metrics);
    return;
  }
  drawIsoSubjectItem(targetCtx, item, metrics);
}
 function drawIsoView(targetCtx, width, height, metrics) {
  const bg = targetCtx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#0d1218");
  bg.addColorStop(1, "#05070b");
  targetCtx.fillStyle = bg;
  targetCtx.fillRect(0, 0, width, height);
   const floor = [
    isoProject(0, 0, 0, metrics),
    isoProject(state.studio.w, 0, 0, metrics),
    isoProject(state.studio.w, state.studio.h, 0, metrics),
    isoProject(0, state.studio.h, 0, metrics)
  ];
  const wallA = [isoProject(0, 0, 0, metrics), isoProject(0, 0, 2.8, metrics), isoProject(state.studio.w, 0, 2.8, metrics), isoProject(state.studio.w, 0, 0, metrics)];
  const wallB = [isoProject(0, 0, 0, metrics), isoProject(0, state.studio.h, 0, metrics), isoProject(0, state.studio.h, 2.8, metrics), isoProject(0, 0, 2.8, metrics)];
   targetCtx.fillStyle = "rgba(24,30,38,0.95)";
  targetCtx.beginPath();
  targetCtx.moveTo(floor[0].x, floor[0].y);
  floor.slice(1).forEach(point => targetCtx.lineTo(point.x, point.y));
  targetCtx.closePath();
  targetCtx.fill();
   targetCtx.fillStyle = "rgba(35,42,52,0.95)";
  targetCtx.beginPath();
  targetCtx.moveTo(wallA[0].x, wallA[0].y);
  wallA.slice(1).forEach(point => targetCtx.lineTo(point.x, point.y));
  targetCtx.closePath();
  targetCtx.fill();
   targetCtx.fillStyle = "rgba(18,23,29,0.95)";
  targetCtx.beginPath();
  targetCtx.moveTo(wallB[0].x, wallB[0].y);
  wallB.slice(1).forEach(point => targetCtx.lineTo(point.x, point.y));
  targetCtx.closePath();
  targetCtx.fill();
   targetCtx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i <= state.studio.w; i += 1) {
    const a = isoProject(i, 0, 0, metrics);
    const b = isoProject(i, state.studio.h, 0, metrics);
    targetCtx.beginPath();
    targetCtx.moveTo(a.x, a.y);
    targetCtx.lineTo(b.x, b.y);
    targetCtx.stroke();
  }
  for (let i = 0; i <= state.studio.h; i += 1) {
    const a = isoProject(0, i, 0, metrics);
    const b = isoProject(state.studio.w, i, 0, metrics);
    targetCtx.beginPath();
    targetCtx.moveTo(a.x, a.y);
    targetCtx.lineTo(b.x, b.y);
    targetCtx.stroke();
  }
   [...state.items].sort((a, b) => (a.x + a.y) - (b.x + b.y)).forEach(item => drawIsoItem(targetCtx, item, metrics));
   drawMeasurementOverlay(targetCtx, metrics, true);
}
 function renderScene(targetCtx, width, height, viewOverride = state.view) {
  const metrics = getSceneMetrics(width, height);
  targetCtx.clearRect(0, 0, width, height);
  if (viewOverride === "setup") drawSetupView(targetCtx, width, height, metrics);
  else if (viewOverride === "camera") drawCameraView(targetCtx, width, height);
  else if (viewOverride === "light") drawLightView(targetCtx, width, height);
  else drawIsoView(targetCtx, width, height, metrics);
}
 function render() {
  renderScene(ctx, canvas.width, canvas.height, state.view);
  renderPropertyPanel();
  renderTips();
  syncToolButtons();
}
 function resizeCanvas() {
  const rect = canvasWrap.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width));
  canvas.height = Math.max(1, Math.floor(rect.height));
  render();
}  function renderSidebarTabs() {
  sidebarTabsEl.innerHTML = sidebarTabs.map(tab => '<button class="sidebar-tab ' + (state.sidebarTab === tab.id ? "active" : "") + '" data-sidebar-tab="' + tab.id + '">' + tab.label + '</button>').join("");
}
 function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
 function renderSidebarContent() {
  if (state.sidebarTab === "notes") {
    const preset = getCurrentPreset();
    const exposure = estimateExposure();
    const equipment = getEquipmentSummary();
    sidebarContentEl.innerHTML = `
      <div class="notes-card">
        <div class="asset-title">
          <span>Notes plateau</span>
          <span class="badge">${preset ? preset.name : "Sans preset"}</span>
        </div>
        <textarea id="notesTextarea" placeholder="Direction artistique, consignes client, variantes, retours maquillage...">${escapeHtml(state.notes)}</textarea>
      </div>
      <div class="notes-card notes-summary">
        <div class="tip-title"><span>Résumé actif</span><span class="badge">${state.items.length} éléments</span></div>
        <div class="summary-list"><strong>Preset</strong><span>${preset ? preset.desc : "Plateau libre"}</span></div>
        <div class="summary-list"><strong>Réglages suggérés</strong><span>ISO ${preset?.settings.iso || exposure.iso} • ${preset?.settings.aperture || exposure.aperture} • ${preset?.settings.speed || exposure.speed} • ${preset?.settings.focal || "50mm"}</span></div>
        ${equipment.map(entry => '<div class="summary-list"><strong>' + entry.label + '</strong><span>' + escapeHtml(entry.value) + '</span></div>').join("")}
      </div>
    `;
    const notesTextarea = document.getElementById("notesTextarea");
    notesTextarea.addEventListener("input", event => {
      state.notes = event.target.value;
      saveLocalState(false);
    });
    return;
  }
   const assets = templateCatalog[state.sidebarTab] || [];
  sidebarContentEl.innerHTML = assets.map(asset => `
    <div class="asset-card" draggable="true" data-template-id="${asset.id}">
      <div class="asset-title">
        <span>${asset.name}</span>
        <span class="badge">${asset.category}</span>
      </div>
      <div class="asset-meta">
        ${asset.lens ? "Optique " + asset.lens + "<br>" : ""}
        ${asset.sizeLabel ? "Taille " + asset.sizeLabel + "<br>" : ""}
        ${asset.mountLight ? "Source montée " + asset.mountLight + "<br>" : ""}
        ${asset.defaultPower ? "Puissance de départ " + asset.defaultPower + "%<br>" : ""}
        ${asset.mountLight && asset.colorTemp ? "Température " + asset.colorTemp + " K<br>" : ""}
        Encombrement ${asset.w.toFixed(2)} × ${asset.h.toFixed(2)} m
      </div>
      <div class="quick-inline">
        <button class="asset-action chip" data-add-template="${asset.id}">Ajouter au centre</button>
      </div>
    </div>
  `).join("");
}
 function renderPropertyPanel() {
  const item = getSelectedItem();
  if (!item) {
    propertyBadgeEl.textContent = "Aucune sélection";
    propertyPanelEl.innerHTML = '<div class="muted">Sélectionnez un élément du plateau pour ajuster sa position, sa rotation, sa puissance ou sa température.</div>';
    return;
  }
  propertyBadgeEl.textContent = item.name;
  propertyPanelEl.innerHTML = `
    <div class="field">
      <label><span>X</span><span class="range-readout">${item.x.toFixed(2)} m</span></label>
      <input type="range" min="0" max="${state.studio.w}" step="0.05" value="${item.x}" data-prop="x">
    </div>
    <div class="field">
      <label><span>Y</span><span class="range-readout">${item.y.toFixed(2)} m</span></label>
      <input type="range" min="0" max="${state.studio.h}" step="0.05" value="${item.y}" data-prop="y">
    </div>
    <div class="field">
      <label><span>Rotation</span><span class="range-readout">${Math.round(item.rotation)}°</span></label>
      <input type="range" min="-180" max="180" step="1" value="${item.rotation}" data-prop="rotation">
    </div>
    ${isLightEmitter(item) ? `
      <div class="field">
        <label><span>Puissance</span><span class="range-readout">${Math.round(item.power)} %</span></label>
        <input type="range" min="0" max="100" step="1" value="${item.power}" data-prop="power">
      </div>
      <div class="field">
        <label><span>Température</span><span class="range-readout">${item.colorTemp} K</span></label>
        <input type="range" min="2600" max="7500" step="100" value="${item.colorTemp}" data-prop="colorTemp">
      </div>
    ` : ""}
    <div class="muted">${item.type} • ${getModifierFamily(item) || item.variant}${item.sizeLabel ? " • " + item.sizeLabel : ""}${item.mountLight ? " • " + item.mountLight + " intégré" : ""}${item.lens ? " • " + item.lens : ""}</div>
  `;
  propertyPanelEl.querySelectorAll("input[data-prop]").forEach(input => {
    input.addEventListener("input", event => {
      const prop = event.target.dataset.prop;
      item[prop] = prop === "rotation" || prop === "power" || prop === "colorTemp" ? Number(event.target.value) : snapValue(Number(event.target.value));
      clampItemToStudio(item);
      render();
    });
    input.addEventListener("change", () => commitHistory("Propriété mise à jour"));
  });
}
 function renderTips() {
  const preset = getCurrentPreset();
  const exposure = estimateExposure();
  const selected = getSelectedItem();
  const first = state.items.find(item => item.id === state.measure.firstId);
  const second = state.items.find(item => item.id === state.measure.secondId);
  const distance = first && second ? Math.hypot(first.x - second.x, first.y - second.y).toFixed(2) + " m" : "Cliquez deux items";
  tipsBarEl.innerHTML = `
    <div class="tip-card">
      <div class="tip-title"><span>Preset & direction</span><span class="badge">${preset ? preset.category : "Libre"}</span></div>
      <div class="tip-row"><strong>${preset ? preset.name : "Plateau en construction"}</strong><span>${preset?.tips.eclairage || "Ajoutez un sujet et une ou plusieurs sources pour obtenir une fiche d’éclairage plus détaillée."}</span></div>
      <div class="quick-inline">
        <span class="badge">${state.studio.type === "outdoor" ? "Outdoor" : "Indoor"}</span>
        <span class="badge">${getSurfaceLabel(state.studio.surface)}</span>
        <span class="badge">${state.items.length} items</span>
      </div>
    </div>
    <div class="tip-card">
      <div class="tip-title"><span>Light Meter</span><span class="badge">EV ${exposure.ev.toFixed(1)}</span></div>
      <div class="tip-row"><strong>Réglages suggérés</strong><span>ISO ${preset?.settings.iso || exposure.iso} • ${preset?.settings.aperture || exposure.aperture} • ${preset?.settings.speed || exposure.speed} • ${preset?.settings.focal || "50mm"}</span></div>
      <div class="tip-row"><strong>Ratio key / fill</strong><span>${exposure.ratio}</span></div>
      <div class="meter"><div class="meter-fill" style="width:${(exposure.level * 100).toFixed(1)}%"></div></div>
    </div>
    <div class="tip-card">
      <div class="tip-title"><span>Contrôle scène</span><span class="badge">${state.measure.active ? "Mesure active" : state.tool}</span></div>
      <div class="tip-row"><strong>Sélection</strong><span>${selected ? selected.name + " • " + selected.x.toFixed(2) + " / " + selected.y.toFixed(2) + " m" : "Aucun élément sélectionné"}</span></div>
      <div class="tip-row"><strong>Distance</strong><span>${distance}</span></div>
      <div class="tip-row"><strong>Interactions</strong><span>Alt + drag pour pan, molette centrée curseur pour zoom, poignée orange pour rotation.</span></div>
    </div>
  `;
}  function renderTextureSelect() {
  const select = document.getElementById('textureSelect');
  if (!select) return;
  const current = state.studio.surface;
  select.innerHTML = getSurfaceGroups().map(group => `
    <optgroup label="${group.label}">
      ${group.palettes.map(palette => `<option value="${palette.key}">${group.label} · ${palette.name}</option>`).join('')}
    </optgroup>
  `).join('');
  select.value = SURFACE_PALETTE_LOOKUP[current] ? current : 'concrete';
}
 function renderStudioMenu() {
  studioMenuEl.innerHTML = `
    <div class="menu-section">
      <p class="menu-label">Tailles</p>
      ${STUDIO_SIZES.map(size => `<button class="menu-item" type="button" data-studio-size="${size.label}" onclick="return window.__menuBridgeStudio('${size.label}', event)"><span>${size.label}</span><small>${size.type}</small></button>`).join('')}
    </div>
    ${getSurfaceGroups().map(group => `
      <div class="menu-section">
        <p class="menu-label">${group.label}</p>
        ${group.palettes.map(palette => `<button class="menu-item" type="button" data-texture="${palette.key}" onclick="return window.__menuBridgeTexture('${palette.key}', event)"><span>${palette.name}</span><small>${state.studio.surface === palette.key ? 'active' : palette.materialLabel}</small></button>`).join('')}
      </div>
    `).join('')}
  `;
}
function renderPresetMenu() {
  const groups = PRESETS.reduce((acc, preset) => {
    acc[preset.category] = acc[preset.category] || [];
    acc[preset.category].push(preset);
    return acc;
  }, {});
  presetMenuEl.innerHTML = Object.entries(groups).map(([category, presets]) => `
    <div class="preset-group">
      <h4>${category}</h4>
      ${presets.map(preset => `<button class="preset-btn" type="button" data-preset="${preset.key}" onclick="return window.__menuBridgePreset('${preset.key}', event)">${preset.name}<small>${preset.desc}</small></button>`).join("")}
    </div>
  `).join("");
}
 function renderViewTabs() {
  document.getElementById("viewTabs").innerHTML = VIEWS.map(view => '<button class="view-tab ' + (state.view === view.id ? "active" : "") + '" data-view="' + view.id + '">' + view.label + '</button>').join("");
}
 function syncHistoryButtons() {
  const undoDisabled = state.historyIndex <= 0;
  const redoDisabled = state.historyIndex >= state.history.length - 1;
  document.getElementById("undoBtn").disabled = undoDisabled;
  document.getElementById("redoBtn").disabled = redoDisabled;
  document.getElementById("undoMenuBtn").disabled = undoDisabled;
  document.getElementById("redoMenuBtn").disabled = redoDisabled;
}
 function syncToolButtons() {
  document.getElementById("selectToolBtn").classList.toggle("active", state.tool === "select");
  document.getElementById("rotateToolBtn").classList.toggle("active", state.tool === "rotate");
  document.getElementById("measureToolBtn").classList.toggle("active", state.measure.active);
  document.getElementById("lightConesBtn").classList.toggle("active", state.showLightCones);
}
 function syncUI() {
  renderSidebarTabs();
  renderSidebarContent();
  renderTextureSelect();
  renderStudioMenu();
  renderPresetMenu();
  renderViewTabs();
  syncHistoryButtons();
  syncToolButtons();
  document.getElementById("snapSelect").value = String(state.gridSnap);
  document.getElementById("textureSelect").value = SURFACE_PALETTE_LOOKUP[state.studio.surface] ? state.studio.surface : "concrete";
  const presetQuickSelect = document.getElementById("presetQuickSelect");
  if (presetQuickSelect) presetQuickSelect.value = state.preset || "";
}
 function notify(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastStackEl.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
 function selectItem(itemId) {
  state.selected = itemId;
  render();
}
 function duplicateSelected() {
  const selected = getSelectedItem();
  if (!selected) return;
  const duplicate = normalizeItem({ ...selected, id: uid(), x: clamp(selected.x + 0.35, selected.w / 2, state.studio.w - selected.w / 2), y: clamp(selected.y + 0.35, selected.h / 2, state.studio.h - selected.h / 2) });
  state.items.push(duplicate);
  state.selected = duplicate.id;
  commitHistory("Élément dupliqué");
  render();
}
 function deleteSelected() {
  if (!state.selected) return;
  const deletedId = state.selected;
  state.items = state.items.filter(item => item.id !== deletedId);
  state.selected = null;
  if (state.measure.firstId === deletedId) state.measure.firstId = null;
  if (state.measure.secondId === deletedId) state.measure.secondId = null;
  commitHistory("Élément supprimé");
  render();
}
 function addTemplateToScene(templateId, x = state.studio.w / 2, y = state.studio.h / 2) {
  const item = createItemFromTemplate(templateId, x, y, { rotation: templateLookup[templateId].category === "camera" ? -90 : 0 });
  fitItemInsideStudio(item, { x, y });
  state.items.push(item);
  state.selected = item.id;
  commitHistory("Élément ajouté : " + item.name);
  render();
}
 function exportPng(view = state.view) {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = 1800;
  exportCanvas.height = 1100;
  const exportCtx = exportCanvas.getContext("2d");
  renderScene(exportCtx, exportCanvas.width, exportCanvas.height, view);
  const link = document.createElement("a");
  link.download = "lite-" + view + ".png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
  notify("PNG exporté : " + view);
}
 function exportAllPngs() {
  VIEWS.forEach((view, index) => setTimeout(() => exportPng(view.id), index * 180));
}
 function exportPdf() {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = 1800;
  exportCanvas.height = 1100;
  const exportCtx = exportCanvas.getContext("2d");
  renderScene(exportCtx, exportCanvas.width, exportCanvas.height, state.view);
  const preset = getCurrentPreset();
  const exposure = estimateExposure();
  const equipment = getEquipmentSummary();
  const image = exportCanvas.toDataURL("image/png");
  const win = window.open("", "_blank");
  if (!win) {
    notify("Popup bloquée pour le PDF");
    return;
  }
  win.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Fiche technique LITE</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#111}h1{margin:0 0 8px}.meta{color:#555;margin-bottom:18px}img{width:100%;border:1px solid #ddd;border-radius:12px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.card{border:1px solid #ddd;border-radius:12px;padding:14px}.card h2{margin:0 0 8px;font-size:16px}.card p{margin:6px 0;line-height:1.4}.mono{font-family:Consolas,monospace}</style></head><body><h1>Fiche technique — ${escapeHtml(preset?.name || "Plateau libre")}</h1><div class="meta">Vue ${escapeHtml(state.view)} • ${state.studio.w} × ${state.studio.h} m • ${state.studio.type}</div><img src="${image}" alt="Capture du setup"><div class="grid"><div class="card"><h2>Paramètres APN</h2><p class="mono">ISO ${preset?.settings.iso || exposure.iso}</p><p class="mono">${preset?.settings.aperture || exposure.aperture}</p><p class="mono">${preset?.settings.speed || exposure.speed}</p><p class="mono">${preset?.settings.focal || "50mm"}</p></div><div class="card"><h2>Éclairage</h2><p>${escapeHtml(preset?.tips.eclairage || "Configuration personnalisée.")}</p><p class="mono">Ratio key/fill ${exposure.ratio}</p><p class="mono">EV ${exposure.ev.toFixed(1)}</p></div><div class="card"><h2>Matériel</h2>${equipment.map(entry => '<p><strong>' + escapeHtml(entry.label) + '</strong> : ' + escapeHtml(entry.value) + '</p>').join("")}</div><div class="card"><h2>Notes</h2><p>${escapeHtml(state.notes || "Aucune note.")}</p></div></div><script>window.onload=()=>setTimeout(()=>window.print(),200);<\/script></body></html>`);
  win.document.close();
  notify("Fenêtre PDF ouverte");
}
 function saveJsonFile() {
  const blob = new Blob([JSON.stringify(serializeState(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.download = "lite-setup.json";
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 300);
  notify("JSON exporté");
}
 function importJsonObject(payload) {
  restoreSnapshot(payload);
  commitHistory("JSON chargé");
  render();
}
 function buildChecklistSections() {
  const cameraItems = state.items.filter(item => item.type === "camera");
  const lightItems = getLightItems();
  const backdrop = getBackdropItem();
  return [
    { key: "camera", title: "APN", items: cameraItems.length ? ["Boîtiers chargés et cartes formatées", "Objectifs nettoyés et bouchons rangés", "Réglages de base vérifiés sur le boîtier"] : ["Ajouter un boîtier ou préparer le matériel hors app"] },
    { key: "lighting", title: "Éclairage", items: lightItems.length ? lightItems.map(light => light.name + " réglé à " + Math.round(light.power || 0) + "% • " + (light.colorTemp || 5600) + "K") : ["Aucune source installée"] },
    { key: "studio", title: "Studio", items: ["Marquage au sol et zone de circulation dégagés", state.studio.type === "outdoor" ? "Vérifier météo, vent et autorisations" : "Alimentation, multiprises et sécurité contrôlées", backdrop ? "Fond installé : " + backdrop.name : "Pas de fond sélectionné"] },
    { key: "subject", title: "Sujet", items: getSubjectItems().length ? ["Brief pose et direction validés", "Retouches rapides maquillage / styling prêtes", "Distance de travail confortable autour du sujet"] : ["Aucun sujet placé sur le plateau"] },
    { key: "before", title: "Avant de commencer", items: ["Balance des blancs et expo testées", "Version de preset ou setup client confirmée", "Notes, variations et exports de sécurité prévus"] }
  ];
}
 function renderChecklist() {
  const sections = buildChecklistSections();
  checklistBodyEl.innerHTML = sections.map(section => `
    <section class="check-section">
      <h3>${section.title}</h3>
      ${section.items.map((item, index) => {
        const key = section.key + "-" + index;
        const checked = state.checklist[key] ? "checked" : "";
        return `<label class="check-item"><input type="checkbox" data-check="${key}" ${checked}><span>${escapeHtml(item)}</span></label>`;
      }).join("")}
    </section>
  `).join("");
}
 function toggleCheck(key, value) { state.checklist[key] = value; saveLocalState(false); }
function checkAll() { buildChecklistSections().forEach(section => section.items.forEach((item, index) => { state.checklist[section.key + "-" + index] = true; })); renderChecklist(); }
function uncheckAll() { state.checklist = {}; renderChecklist(); }
function openChecklist() { renderChecklist(); checklistModalEl.classList.remove("hidden"); }
function closeChecklist() { checklistModalEl.classList.add("hidden"); }  function toggleMeasureSelection(item) {
  if (!state.measure.firstId || state.measure.firstId === item.id) {
    state.measure.firstId = item.id;
    state.measure.secondId = null;
  } else if (!state.measure.secondId || state.measure.secondId === item.id) {
    state.measure.secondId = item.id;
  } else {
    state.measure.firstId = item.id;
    state.measure.secondId = null;
  }
  render();
}
 function handleWheel(event) {
  event.preventDefault();
  const pointer = getPointerPosition(event);
  const before = screenToWorld(pointer.x, pointer.y);
  const factor = event.deltaY < 0 ? 1.12 : 0.9;
  state.zoom = clamp(state.zoom * factor, 0.2, 4);
  const after = worldToScreen(before.x, before.y);
  state.panX += pointer.x - after.x;
  state.panY += pointer.y - after.y;
  saveLocalState(false);
  render();
}
 function handlePointerDown(event) {
  const pointer = getPointerPosition(event);
  const metrics = getSceneMetrics();
  if (event.button !== 0) return;
  if (event.altKey) {
    interaction.mode = "pan";
    interaction.startPointer = pointer;
    interaction.startPan = { x: state.panX, y: state.panY };
    canvas.style.cursor = "grabbing";
    return;
  }
  if (hitTestRotationHandle(pointer.x, pointer.y, metrics)) {
    interaction.mode = "rotate";
    interaction.itemId = state.selected;
    interaction.moved = false;
    canvas.style.cursor = "grabbing";
    return;
  }
  const hit = hitTestItem(pointer.x, pointer.y, metrics);
  if (hit) {
    selectItem(hit.id);
    if (state.measure.active) {
      toggleMeasureSelection(hit);
      return;
    }
    if (state.tool === "rotate") {
      interaction.mode = "rotate";
      interaction.itemId = hit.id;
    } else {
      interaction.mode = "drag";
      interaction.itemId = hit.id;
      const world = screenToWorld(pointer.x, pointer.y, metrics);
      interaction.offset = { x: world.x - hit.x, y: world.y - hit.y };
    }
    interaction.moved = false;
    canvas.style.cursor = "grabbing";
    return;
  }
  state.selected = null;
  render();
}
 function handlePointerMove(event) {
  const pointer = getPointerPosition(event);
  const metrics = getSceneMetrics();
  if (!interaction.mode) {
    if (hitTestRotationHandle(pointer.x, pointer.y, metrics)) canvas.style.cursor = "grab";
    else if (hitTestItem(pointer.x, pointer.y, metrics)) canvas.style.cursor = "pointer";
    else canvas.style.cursor = "crosshair";
    return;
  }
  if (interaction.mode === "pan") {
    interaction.moved = true;
    state.panX = interaction.startPan.x + (pointer.x - interaction.startPointer.x);
    state.panY = interaction.startPan.y + (pointer.y - interaction.startPointer.y);
    render();
    return;
  }
  const item = state.items.find(entry => entry.id === interaction.itemId);
  if (!item) return;
  if (interaction.mode === "drag") {
    interaction.moved = true;
    const world = screenToWorld(pointer.x, pointer.y, metrics);
    fitItemInsideStudio(item, { x: world.x - interaction.offset.x, y: world.y - interaction.offset.y });
    render();
  }
  if (interaction.mode === "rotate") {
    interaction.moved = true;
    const center = worldToScreen(item.x, item.y, metrics);
    item.rotation = Math.round(radToDeg(Math.atan2(pointer.y - center.y, pointer.x - center.x)));
    render();
  }
}
 function handlePointerUp() {
  if (interaction.mode === "drag" && interaction.moved) commitHistory("Élément déplacé");
  else if (interaction.mode === "rotate" && interaction.moved) commitHistory("Élément tourné");
  else if (interaction.mode === "pan" && interaction.moved) saveLocalState(false);
  interaction.mode = null;
  interaction.itemId = null;
  interaction.startPointer = null;
  interaction.startPan = null;
  interaction.offset = null;
  interaction.moved = false;
  canvas.style.cursor = "crosshair";
  render();
}
 function handleKeyDown(event) {
  const activeTag = document.activeElement?.tagName;
  const isTyping = activeTag === "TEXTAREA" || (activeTag === "INPUT" && document.activeElement.type !== "range");
  if (isTyping) return;
  const meta = event.ctrlKey || event.metaKey;
  if (meta && event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) redo(); else undo();
    render();
    return;
  }
  if (meta && event.key.toLowerCase() === "y") {
    event.preventDefault();
    redo();
    render();
    return;
  }
  if (meta && event.key.toLowerCase() === "d") {
    event.preventDefault();
    duplicateSelected();
    return;
  }
  if (event.key === "Delete") {
    event.preventDefault();
    deleteSelected();
    return;
  }
  const selected = getSelectedItem();
  if (!selected) return;
  const step = event.shiftKey ? 0.1 : 0.05;
  let changed = false;
  if (event.key === "ArrowLeft") { selected.x -= step; changed = true; }
  else if (event.key === "ArrowRight") { selected.x += step; changed = true; }
  else if (event.key === "ArrowUp") { selected.y -= step; changed = true; }
  else if (event.key === "ArrowDown") { selected.y += step; changed = true; }
  if (changed) {
    event.preventDefault();
    fitItemInsideStudio(selected, selected);
    commitHistory("Nudge " + step.toFixed(2) + "m");
    render();
  }
}
 function drawPresetThumbnail(preset) {
  const width = presetPreviewCanvas.width;
  const height = presetPreviewCanvas.height;
  presetPreviewCtx.clearRect(0, 0, width, height);
  const gradient = presetPreviewCtx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0d1117");
  gradient.addColorStop(1, "#06080c");
  presetPreviewCtx.fillStyle = gradient;
  presetPreviewCtx.fillRect(0, 0, width, height);
  const scale = Math.min((width - 30) / 8, (height - 30) / 8);
  const left = (width - 8 * scale) / 2;
  const top = (height - 8 * scale) / 2;
  presetPreviewCtx.fillStyle = "rgba(24, 31, 40, 0.95)";
  roundRectPath(presetPreviewCtx, left, top, 8 * scale, 8 * scale, 14);
  presetPreviewCtx.fill();
  presetPreviewCtx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i <= 8; i += 1) {
    presetPreviewCtx.beginPath();
    presetPreviewCtx.moveTo(left + i * scale, top);
    presetPreviewCtx.lineTo(left + i * scale, top + 8 * scale);
    presetPreviewCtx.stroke();
    presetPreviewCtx.beginPath();
    presetPreviewCtx.moveTo(left, top + i * scale);
    presetPreviewCtx.lineTo(left + 8 * scale, top + i * scale);
    presetPreviewCtx.stroke();
  }
  resolvePresetItems(preset).forEach(item => {
    const x = left + item.x * scale;
    const y = top + item.y * scale;
    presetPreviewCtx.fillStyle = item.type === "camera" ? "#5ba8f5" : item.type === "light" ? "#f0a500" : item.type === "modifier" ? "#84a9c0" : item.type === "backdrop" ? "#d4d7dc" : "#f2b792";
    presetPreviewCtx.beginPath();
    presetPreviewCtx.arc(x, y, item.type === "backdrop" ? 4 : 5, 0, Math.PI * 2);
    presetPreviewCtx.fill();
  });
}
 function showPresetPreview(presetKey, event) {
  clearTimeout(previewHideTimer);
  const preset = PRESETS.find(entry => entry.key === presetKey);
  if (!preset) return;
  presetPreviewTitleEl.textContent = preset.name;
  presetPreviewDescEl.textContent = preset.desc;
  presetPreviewMetaEl.innerHTML = `<span>ISO ${preset.settings.iso}</span><span>${preset.settings.aperture}</span><span>${preset.settings.speed}</span><span>${preset.settings.focal}</span>`;
  drawPresetThumbnail(preset);
  presetPreviewEl.classList.remove("hidden");
  presetPreviewEl.style.left = Math.min(window.innerWidth - 254, event.clientX + 18) + "px";
  presetPreviewEl.style.top = Math.min(window.innerHeight - 220, event.clientY + 18) + "px";
}
 function hidePresetPreviewSoon() {
  previewHideTimer = setTimeout(() => presetPreviewEl.classList.add("hidden"), 120);
}
 function closeAllMenus() {
  document.querySelectorAll("[data-menu]").forEach(menu => menu.classList.remove("open"));
}
 function handleMenuAction(action) {
  switch (action) {
    case "new-project": resetProject(); break;
    case "save-json": saveJsonFile(); break;
    case "load-json": loadJsonInputEl.click(); break;
    case "restore-local": loadLocalState(); break;
    case "export-png": exportPng(); break;
    case "export-png-all": exportAllPngs(); break;
    case "export-pdf": exportPdf(); break;
    case "undo": undo(); render(); break;
    case "redo": redo(); render(); break;
    case "duplicate": duplicateSelected(); break;
    case "delete": deleteSelected(); break;
    case "save-local": saveLocalState(); break;
    default: break;
  }
  closeAllMenus();
}
 function bindEvents() {
  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("wheel", handleWheel, { passive: false });
  canvas.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("keydown", handleKeyDown);
  canvas.addEventListener("dblclick", () => { const panel = propertyPanelEl.querySelector("input[data-prop]"); if (panel) panel.focus(); });
   canvasWrap.addEventListener("dragover", event => { event.preventDefault(); canvasWrap.classList.add("drag-over"); });
  canvasWrap.addEventListener("dragleave", () => canvasWrap.classList.remove("drag-over"));
  canvasWrap.addEventListener("drop", event => {
    event.preventDefault();
    canvasWrap.classList.remove("drag-over");
    const templateId = event.dataTransfer.getData("text/plain");
    if (!templateId) return;
    const pointer = getPointerPosition(event);
    const world = screenToWorld(pointer.x, pointer.y);
    addTemplateToScene(templateId, world.x, world.y);
  });
   sidebarTabsEl.addEventListener("click", event => {
    const button = event.target.closest("[data-sidebar-tab]");
    if (!button) return;
    state.sidebarTab = button.dataset.sidebarTab;
    renderSidebarTabs();
    renderSidebarContent();
  });
   sidebarContentEl.addEventListener("click", event => {
    const button = event.target.closest("[data-add-template]");
    if (button) addTemplateToScene(button.dataset.addTemplate);
  });
   sidebarContentEl.addEventListener("dragstart", event => {
    const card = event.target.closest("[data-template-id]");
    if (!card) return;
    event.dataTransfer.setData("text/plain", card.dataset.templateId);
  });   document.addEventListener("click", event => {
    const menuTrigger = event.target.closest(".menu-trigger");
    const actionButton = event.target.closest("[data-action]");
    const viewButton = event.target.closest("[data-view]");
    const presetButton = event.target.closest("[data-preset]");
    const studioButton = event.target.closest("[data-studio-size]");
    const textureButton = event.target.closest("[data-texture]");
    const closeModalButton = event.target.closest("[data-close-modal]");
     if (closeModalButton || event.target === checklistModalEl) closeChecklist();
    if (actionButton) { handleMenuAction(actionButton.dataset.action); return; }
    if (viewButton) { state.view = viewButton.dataset.view; renderViewTabs(); render(); return; }
    if (presetButton) { applyPreset(presetButton.dataset.preset); closeAllMenus(); return; }
    if (studioButton) {
      const size = STUDIO_SIZES.find(entry => entry.label === studioButton.dataset.studioSize);
      if (size) setStudioSize(size);
      closeAllMenus();
      return;
    }
    if (textureButton) {
      state.studio.surface = textureButton.dataset.texture;
      commitHistory("Palette " + getSurfaceLabel(state.studio.surface));
      render();
      closeAllMenus();
      return;
    }
    if (menuTrigger && menuTrigger.closest("[data-menu]")) {
      const menu = menuTrigger.closest("[data-menu]");
      const willOpen = !menu.classList.contains("open");
      closeAllMenus();
      if (willOpen) menu.classList.add("open");
      return;
    }
    if (!event.target.closest("[data-menu]")) closeAllMenus();
  });
   presetMenuEl.addEventListener("mouseover", event => {
    const button = event.target.closest("[data-preset]");
    if (button) showPresetPreview(button.dataset.preset, event);
  });
  presetMenuEl.addEventListener("mousemove", event => {
    const button = event.target.closest("[data-preset]");
    if (button) showPresetPreview(button.dataset.preset, event);
  });
  presetMenuEl.addEventListener("mouseout", hidePresetPreviewSoon);
  presetPreviewEl.addEventListener("mouseenter", () => clearTimeout(previewHideTimer));
  presetPreviewEl.addEventListener("mouseleave", hidePresetPreviewSoon);
   document.getElementById("openChecklistBtn").addEventListener("click", openChecklist);
  document.getElementById("checkAllBtn").addEventListener("click", checkAll);
  document.getElementById("uncheckAllBtn").addEventListener("click", uncheckAll);
  checklistBodyEl.addEventListener("change", event => {
    const checkbox = event.target.closest("[data-check]");
    if (checkbox) toggleCheck(checkbox.dataset.check, checkbox.checked);
  });
   document.getElementById("selectToolBtn").addEventListener("click", () => { state.tool = "select"; render(); });
  document.getElementById("rotateToolBtn").addEventListener("click", () => { state.tool = "rotate"; render(); });
  document.getElementById("measureToolBtn").addEventListener("click", () => {
    state.measure.active = !state.measure.active;
    if (!state.measure.active) {
      state.measure.firstId = null;
      state.measure.secondId = null;
    }
    render();
  });
  document.getElementById("lightConesBtn").addEventListener("click", () => {
    state.showLightCones = !state.showLightCones;
    saveLocalState(false);
    render();
  });
  document.getElementById("snapSelect").addEventListener("change", event => { state.gridSnap = Number(event.target.value); saveLocalState(false); });
  document.getElementById("textureSelect").addEventListener("change", event => {
    state.studio.surface = event.target.value;
    commitHistory("Palette " + getSurfaceLabel(state.studio.surface));
    render();
  });
   const presetQuickSelect = document.getElementById("presetQuickSelect");
  if (presetQuickSelect) {
    presetQuickSelect.addEventListener("change", event => {
      if (event.target.value) {
        applyPreset(event.target.value);
        event.target.value = event.target.value;
      }
    });
  }
   loadJsonInputEl.addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try { importJsonObject(JSON.parse(text)); } catch (error) { console.error(error); notify("JSON invalide"); }
    loadJsonInputEl.value = "";
  });
}
function init() {
  syncUI();
  bindEvents();
  resizeCanvas();
  const raw = localStorage.getItem(LOCAL_KEY);
  if (raw) {
    try { restoreSnapshot(JSON.parse(raw)); syncUI(); } catch (error) { console.warn("Autosave unreadable", error); }
  }
  if (!state.items.length) applyPreset("corporate-clean");
  else {
    commitHistory("Session restaurée");
    render();
  }
}
window.__liteLegacyInit = init;
window.__liteInternals = {
  state,
  interaction,
  refs: {
    canvas,
    ctx,
    canvasWrap,
    sidebarTabsEl,
    sidebarContentEl,
    propertyPanelEl,
    propertyBadgeEl,
    tipsBarEl,
    studioMenuEl,
    presetMenuEl,
    toastStackEl,
    checklistModalEl,
    checklistBodyEl,
    loadJsonInputEl,
    presetPreviewEl,
    presetPreviewCanvas,
    presetPreviewCtx,
    presetPreviewTitleEl,
    presetPreviewDescEl,
    presetPreviewMetaEl
  }
};
