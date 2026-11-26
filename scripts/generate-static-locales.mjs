import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const DOMAIN = "https://lumierestudio.archi-it.fr";
const PUBLIC_PAGE_LINKS = {
  home: "index.html",
  app: "app.html",
  guide: "guide.html",
  presets: "presets.html",
  faq: "faq.html",
  portraitSchema: "schema-eclairage-portrait.html",
  boudoirPlan: "plan-studio-boudoir.html",
  interviewLighting: "lighting-diagram-interview.html"
};

const PRIMARY_NAV_KEYS = ["home", "app", "guide", "presets", "faq"];

const LANGUAGES = {
  fr: { dir: "ltr", locale: "fr_FR", folder: "", code: "FR", flag: "🇫🇷", label: "Français" },
  en: { dir: "ltr", locale: "en_US", folder: "en", code: "EN", flag: "🇺🇸", label: "English" },
  es: { dir: "ltr", locale: "es_ES", folder: "es", code: "ES", flag: "🇪🇸", label: "Español" },
  de: { dir: "ltr", locale: "de_DE", folder: "de", code: "DE", flag: "🇩🇪", label: "Deutsch" },
  ar: { dir: "rtl", locale: "ar_SA", folder: "ar", code: "AR", flag: "🇸🇦", label: "العربية" }
};

const LANGUAGE_UI_COPY = {
  fr: {
    selector: "Langues",
    menuLabel: "Menu",
    closeMenuLabel: "Fermer le menu",
    switcherAria: "Choisir la langue de la page",
    versionsTitle: "Versions",
    versionsText: "Cette page est disponible dans les langues suivantes.",
    galleryEyebrow: "Galerie",
    galleryTitle: "Les {count} presets, prêts à ouvrir",
    galleryIntro: "Chaque preset s'ouvre directement dans l'application : déplacez, ajustez, puis exportez ou enregistrez votre version.",
    galleryNav: "Catégories de presets",
    openPreset: "Ouvrir ce preset",
    itemsCount: "{count} éléments",
    resumeTitle: "Reprendre « {name} »",
    resumeMeta: "Modifié le {date} · {count} éléments",
    resumeAction: "Reprendre",
    resumeAll: "Mes plateaux ({count})",
    presetDetails: "Voir le preset",
    presetsLabel: "Presets",
    breadcrumbAria: "Fil d'Ariane",
    studioSize: "Studio 8 × 6 m",
    presetOpen: "Ouvrir dans le studio",
    presetShare: "Partager ce preset",
    linkCopied: "Lien copié",
    presetSceneAlt: "Vue 3D du preset « {name} » : sujet, appareil et sources de lumière en place",
    presetPlanAlt: "Vue de dessus du preset « {name} » avec la position de chaque élément",
    presetPlan: "Vue de dessus, plateau de 8 × 6 m",
    presetGear: "Matériel",
    presetGearHint: "Ouvrez le preset pour déplacer le matériel, mesurer les distances et imprimer la feuille de plateau.",
    presetMore: "Dans la même catégorie",
    presetAll: "Voir tous les presets",
    presetMetaTitle: "{name} : schéma d'éclairage {category} | LITE Studio",
    presetMetaDescription: "{summary} Plan à l'échelle, vue 3D et liste du matériel ({count} éléments), à ouvrir et adapter gratuitement dans LITE Studio.",
    presetOgTitle: "{name} – schéma d'éclairage | LITE Studio",
    presetTopCopy: "Un plateau prêt à ouvrir, à adapter et à partager avec l'équipe.",
    brandTagline: "Planificateur de lumière",
    presetFooter: "LITE Studio · presets d'éclairage photo et vidéo à ouvrir gratuitement dans le navigateur."
  },
  en: {
    selector: "Languages",
    menuLabel: "Menu",
    closeMenuLabel: "Close menu",
    switcherAria: "Choose the page language",
    versionsTitle: "Versions",
    versionsText: "This page is available in the following languages.",
    galleryEyebrow: "Gallery",
    galleryTitle: "All {count} presets, ready to open",
    galleryIntro: "Each preset opens straight in the app: move things around, adjust, then export or save your version.",
    galleryNav: "Preset categories",
    openPreset: "Open this preset",
    itemsCount: "{count} items",
    resumeTitle: "Pick up “{name}”",
    resumeMeta: "Edited {date} · {count} items",
    resumeAction: "Resume",
    resumeAll: "My sets ({count})",
    presetDetails: "View preset",
    presetsLabel: "Presets",
    breadcrumbAria: "Breadcrumb",
    studioSize: "8 × 6 m studio",
    presetOpen: "Open in the studio",
    presetShare: "Share this preset",
    linkCopied: "Link copied",
    presetSceneAlt: "3D view of the “{name}” preset: subject, camera and light sources in place",
    presetPlanAlt: "Top view of the “{name}” preset showing where each item goes",
    presetPlan: "Top view, 8 × 6 m set",
    presetGear: "Gear",
    presetGearHint: "Open the preset to move the gear, measure distances and print the set sheet.",
    presetMore: "In the same category",
    presetAll: "See all presets",
    presetMetaTitle: "{name}: {category} lighting diagram | LITE Studio",
    presetMetaDescription: "{summary} Scaled plan, 3D view and gear list ({count} items), free to open and adapt in LITE Studio.",
    presetOgTitle: "{name} – lighting diagram | LITE Studio",
    presetTopCopy: "A set ready to open, adapt and share with your crew.",
    brandTagline: "Lighting planner",
    presetFooter: "LITE Studio · photo and video lighting presets you can open for free in your browser."
  },
  es: {
    selector: "Idiomas",
    menuLabel: "Menu",
    closeMenuLabel: "Cerrar menú",
    switcherAria: "Elegir el idioma de la página",
    versionsTitle: "Versiones",
    versionsText: "Esta página está disponible en los siguientes idiomas.",
    galleryEyebrow: "Galería",
    galleryTitle: "Los {count} presets, listos para abrir",
    galleryIntro: "Cada preset se abre directamente en la aplicación: muévelo, ajústalo y luego expórtalo o guárdalo.",
    galleryNav: "Categorías de presets",
    openPreset: "Abrir este preset",
    itemsCount: "{count} elementos",
    resumeTitle: "Retomar «{name}»",
    resumeMeta: "Modificado el {date} · {count} elementos",
    resumeAction: "Retomar",
    resumeAll: "Mis platós ({count})",
    presetDetails: "Ver el preset",
    presetsLabel: "Presets",
    breadcrumbAria: "Ruta de navegación",
    studioSize: "Estudio de 8 × 6 m",
    presetOpen: "Abrir en el estudio",
    presetShare: "Compartir este preset",
    linkCopied: "Enlace copiado",
    presetSceneAlt: "Vista 3D del preset «{name}»: sujeto, cámara y fuentes de luz en su sitio",
    presetPlanAlt: "Vista superior del preset «{name}» con la posición de cada elemento",
    presetPlan: "Vista superior, plató de 8 × 6 m",
    presetGear: "Material",
    presetGearHint: "Abre el preset para mover el material, medir las distancias e imprimir la hoja de plató.",
    presetMore: "En la misma categoría",
    presetAll: "Ver todos los presets",
    presetMetaTitle: "{name}: esquema de iluminación {category} | LITE Studio",
    presetMetaDescription: "{summary} Plano a escala, vista 3D y lista de material ({count} elementos), para abrir y adaptar gratis en LITE Studio.",
    presetOgTitle: "{name} – esquema de iluminación | LITE Studio",
    presetTopCopy: "Un plató listo para abrir, adaptar y compartir con el equipo.",
    brandTagline: "Planificador de iluminación",
    presetFooter: "LITE Studio · presets de iluminación para foto y vídeo, gratis en el navegador."
  },
  de: {
    selector: "Sprachen",
    menuLabel: "Menü",
    closeMenuLabel: "Menü schließen",
    switcherAria: "Seitensprache auswählen",
    versionsTitle: "Versionen",
    versionsText: "Diese Seite ist in den folgenden Sprachen verfügbar.",
    galleryEyebrow: "Galerie",
    galleryTitle: "Alle {count} Presets, sofort zu öffnen",
    galleryIntro: "Jedes Preset öffnet sich direkt in der App: verschieben, anpassen, dann exportieren oder speichern.",
    galleryNav: "Preset-Kategorien",
    openPreset: "Dieses Preset öffnen",
    itemsCount: "{count} Elemente",
    resumeTitle: "„{name}“ fortsetzen",
    resumeMeta: "Geändert am {date} · {count} Elemente",
    resumeAction: "Fortsetzen",
    resumeAll: "Meine Sets ({count})",
    presetDetails: "Preset ansehen",
    presetsLabel: "Presets",
    breadcrumbAria: "Brotkrumen-Navigation",
    studioSize: "Studio 8 × 6 m",
    presetOpen: "Im Studio öffnen",
    presetShare: "Preset teilen",
    linkCopied: "Link kopiert",
    presetSceneAlt: "3D-Ansicht des Presets „{name}“: Motiv, Kamera und Lichtquellen an ihrem Platz",
    presetPlanAlt: "Draufsicht des Presets „{name}“ mit der Position jedes Elements",
    presetPlan: "Draufsicht, Set 8 × 6 m",
    presetGear: "Ausrüstung",
    presetGearHint: "Öffnen Sie das Preset, um die Ausrüstung zu verschieben, Abstände zu messen und das Set-Blatt zu drucken.",
    presetMore: "In derselben Kategorie",
    presetAll: "Alle Presets ansehen",
    presetMetaTitle: "{name}: Lichtaufbau {category} | LITE Studio",
    presetMetaDescription: "{summary} Maßstäblicher Plan, 3D-Ansicht und Ausrüstungsliste ({count} Elemente), kostenlos in LITE Studio öffnen und anpassen.",
    presetOgTitle: "{name} – Lichtaufbau | LITE Studio",
    presetTopCopy: "Ein Set, bereit zum Öffnen, Anpassen und Teilen mit dem Team.",
    brandTagline: "Lichtplaner",
    presetFooter: "LITE Studio · Licht-Presets für Foto und Video, kostenlos im Browser."
  },
  ar: {
    selector: "اللغات",
    menuLabel: "القائمة",
    closeMenuLabel: "إغلاق القائمة",
    switcherAria: "اختر لغة الصفحة",
    versionsTitle: "النسخ",
    versionsText: "هذه الصفحة متوفرة باللغات التالية.",
    galleryEyebrow: "المعرض",
    galleryTitle: "الإعدادات الجاهزة الـ{count}، جاهزة للفتح",
    galleryIntro: "يُفتح كل إعداد جاهز مباشرة في التطبيق: حرّك العناصر واضبطها، ثم صدّر نسختك أو احفظها.",
    galleryNav: "فئات الإعدادات الجاهزة",
    openPreset: "فتح هذا الإعداد",
    itemsCount: "{count} عناصر",
    resumeTitle: "متابعة «{name}»",
    resumeMeta: "عُدِّل في {date} · {count} عناصر",
    resumeAction: "متابعة",
    resumeAll: "مواقع التصوير ({count})",
    presetDetails: "عرض الإعداد",
    presetsLabel: "الإعدادات الجاهزة",
    breadcrumbAria: "مسار التنقل",
    studioSize: "استوديو 8 × 6 م",
    presetOpen: "الفتح في الاستوديو",
    presetShare: "مشاركة هذا الإعداد",
    linkCopied: "تم نسخ الرابط",
    presetSceneAlt: "منظر ثلاثي الأبعاد للإعداد «{name}»: الموضوع والكاميرا ومصادر الضوء في أماكنها",
    presetPlanAlt: "منظر علوي للإعداد «{name}» مع موضع كل عنصر",
    presetPlan: "منظر علوي، موقع تصوير 8 × 6 م",
    presetGear: "المعدات",
    presetGearHint: "افتح الإعداد لتحريك المعدات وقياس المسافات وطباعة ورقة موقع التصوير.",
    presetMore: "في الفئة نفسها",
    presetAll: "عرض كل الإعدادات الجاهزة",
    presetMetaTitle: "{name}: مخطط إضاءة {category} | LITE Studio",
    presetMetaDescription: "{summary} مخطط بمقياس رسم ومنظر ثلاثي الأبعاد وقائمة معدات ({count} عناصر)، للفتح والتعديل مجانًا في LITE Studio.",
    presetOgTitle: "{name} – مخطط إضاءة | LITE Studio",
    presetTopCopy: "موقع تصوير جاهز للفتح والتعديل والمشاركة مع الفريق.",
    brandTagline: "مخطط الإضاءة",
    presetFooter: "LITE Studio · إعدادات إضاءة جاهزة للتصوير والفيديو، مجانًا في المتصفح."
  }
};

const PAGE_CONFIGS = [
  { pageId: "index", file: "index.html", kind: "index", image: "assets/og/lite-studio.jpg", ogType: "website", priority: "1.0" },
  { pageId: "guide", file: "guide.html", kind: "guide", image: "assets/og/lite-studio.jpg", ogType: "article", priority: "0.8" },
  { pageId: "presets", file: "presets.html", kind: "presets", image: "assets/og/lite-studio.jpg", ogType: "website", priority: "0.8" },
  { pageId: "faq", file: "faq.html", kind: "faq", image: "assets/og/lite-studio.jpg", ogType: "website", priority: "0.7" },
  { pageId: "portraitSchema", file: "schema-eclairage-portrait.html", kind: "seo", image: "assets/og/presets/portrait-soft-45.jpg", ogType: "article", priority: "0.8" },
  { pageId: "boudoirPlan", file: "plan-studio-boudoir.html", kind: "seo", image: "assets/og/presets/boudoir-armchair-lowkey.jpg", ogType: "article", priority: "0.8" },
  { pageId: "interviewLighting", file: "lighting-diagram-interview.html", kind: "seo", image: "assets/og/presets/interview-led.jpg", ogType: "article", priority: "0.8" }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Pages de preset : un dossier plus bas (presets/<id>.html), d'ou PAGE_DEPTH.
let PAGE_DEPTH = 0;

function pagePrefix() {
  return "../".repeat(PAGE_DEPTH);
}

function relativePrefix(languageId) {
  return (languageId === "fr" ? "" : "../") + pagePrefix();
}

function absoluteUrl(languageId, fileName) {
  if (languageId === "fr") {
    return fileName === "index.html" ? `${DOMAIN}/` : `${DOMAIN}/${fileName}`;
  }

  const folder = LANGUAGES[languageId].folder;
  return fileName === "index.html" ? `${DOMAIN}/${folder}/` : `${DOMAIN}/${folder}/${fileName}`;
}

function localizedHref(languageId, key, prefix) {
  const fileName = PUBLIC_PAGE_LINKS[key];
  if (key === "app") {
    return languageId === "fr"
      ? `${prefix}app.html`
      : `${prefix}app.html?lang=${languageId}`;
  }

  return pagePrefix() + (key === "home" ? "index.html" : fileName);
}

function rewriteAttributeValue(value, languageId, prefix) {
  if (/^(https?:|mailto:|tel:|#)/i.test(value)) {
    return value;
  }

  if (value.startsWith("css/") || value.startsWith("docs/") || value.startsWith("assets/") || value.startsWith("fonts/")) {
    return `${prefix}${value}`;
  }

  const match = value.match(/^([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!match) {
    return value;
  }

  const fileName = match[1];
  const query = match[2] || "";
  const hash = match[3] || "";

  if (fileName === "app.html") {
    if (languageId === "fr") {
      return `${prefix}app.html${query}${hash}`;
    }

    const params = new URLSearchParams(query.replace(/^\?/, ""));
    params.set("lang", languageId);
    const serialized = params.toString();
    return `${prefix}app.html${serialized ? `?${serialized}` : ""}${hash}`;
  }

  if (Object.values(PUBLIC_PAGE_LINKS).includes(fileName)) {
    return `${pagePrefix()}${fileName}${query}${hash}`;
  }

  return value;
}

function rewriteInlineHtml(html, languageId) {
  const prefix = relativePrefix(languageId);
  return String(html).replace(/(href|src|srcset)="([^"]+)"/g, function (_, attribute, value) {
    return `${attribute}="${rewriteAttributeValue(value, languageId, prefix)}"`;
  });
}

function renderNav(copy, page, languageId, currentKey) {
  const keys = PRIMARY_NAV_KEYS.filter(function (key) {
    return page.navItems.includes(key) || key === currentKey;
  });

  return keys.map(function (key) {
    const isActive = key === currentKey;
    const activeClass = isActive ? ' class="active"' : "";
    const currentAttribute = isActive ? ' aria-current="page"' : "";
    return `<a${activeClass} href="${localizedHref(languageId, key, relativePrefix(languageId))}"${currentAttribute}>${escapeHtml(copy.common.links[key])}</a>`;
  }).join("");
}

function renderFooterLinks(copy, page, languageId) {
  return page.footerItems.map(function (key) {
    return `<a href="${localizedHref(languageId, key, relativePrefix(languageId))}">${escapeHtml(copy.common.links[key])}</a>`;
  }).join("");
}

function renderLanguageSwitcher(fileName, languageId) {
  const uiCopy = LANGUAGE_UI_COPY[languageId];
  const items = Object.entries(LANGUAGES).map(function ([targetLanguageId, language]) {
    const isActive = targetLanguageId === languageId;
    const stateAttributes = isActive ? ' aria-current="page"' : "";
    const activeClass = isActive ? " active" : "";

    return `<a class="language-chip${activeClass}" href="${absoluteUrl(targetLanguageId, fileName)}" hreflang="${targetLanguageId}" lang="${targetLanguageId}" title="${escapeHtml(language.label)}" aria-label="${escapeHtml(language.code + " – " + language.label)}"${stateAttributes}>
      <span class="language-chip-code" aria-hidden="true">${language.code}</span>
    </a>`;
  }).join("");

  return `<div class="language-switcher" role="group" aria-label="${escapeHtml(uiCopy.switcherAria)}">
    <div class="language-switcher-list">
      ${items}
    </div>
  </div>`;
}

function renderTranslationPanel(fileName, languageId) {
  const uiCopy = LANGUAGE_UI_COPY[languageId];
  const items = Object.entries(LANGUAGES).map(function ([targetLanguageId, language]) {
    const isActive = targetLanguageId === languageId;
    const activeClass = isActive ? " active" : "";
    const stateAttributes = isActive ? ' aria-current="page"' : "";

    return `<a class="translation-chip${activeClass}" href="${absoluteUrl(targetLanguageId, fileName)}" hreflang="${targetLanguageId}" lang="${targetLanguageId}" title="${escapeHtml(language.label)}"${stateAttributes}>
      <span class="translation-code">${escapeHtml(language.code)}</span>
      <span>${escapeHtml(language.label)}</span>
    </a>`;
  }).join("");

  return `<div class="site-shell translation-panel">
    <div class="translation-copy">
      <strong>${escapeHtml(uiCopy.versionsTitle)}</strong>
      <span>${escapeHtml(uiCopy.versionsText)}</span>
    </div>
    <nav class="translation-links" aria-label="${escapeHtml(uiCopy.switcherAria)}">
      ${items}
    </nav>
  </div>`;
}

function renderAlternateLinks(fileName) {
  const items = Object.keys(LANGUAGES).map(function (languageId) {
    return `<link rel="alternate" hreflang="${languageId}" href="${absoluteUrl(languageId, fileName)}">`;
  });
  items.push(`<link rel="alternate" hreflang="x-default" href="${absoluteUrl("fr", fileName)}">`);
  return items.join("\n  ");
}

function normalizeHeadline(value) {
  return String(value || "").replace(/\s+\|\s+LITE Studio$/, "").trim();
}

function extractFaqEntries(page) {
  const faqHtml = String(page.sections.faqGridContent || "");
  const entries = [];
  const regex = /<article class="faq-item"><h3>(.*?)<\/h3><p>(.*?)<\/p><\/article>/g;
  let match = regex.exec(faqHtml);
  while (match) {
    entries.push({
      "@type": "Question",
      name: match[1].replace(/<[^>]+>/g, "").trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: match[2].replace(/<[^>]+>/g, "").trim()
      }
    });
    match = regex.exec(faqHtml);
  }
  return entries;
}

function buildStructuredData(config, page, languageId) {
  const url = absoluteUrl(languageId, config.file);
  const image = `${DOMAIN}/${config.image}`;
  const title = normalizeHeadline(page.meta.ogTitle || page.meta.title);
  const description = page.meta.ogDescription || page.meta.description;

  if (config.kind === "index") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "LITE Studio",
      applicationCategory: "PhotographyApplication",
      applicationSubCategory: "Photo Studio Planner",
      operatingSystem: "Web",
      url,
      image,
      description,
      inLanguage: languageId,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR"
      }
    };
  }

  if (config.kind === "preset") {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: config.entry.preset.name,
      description,
      url,
      image,
      inLanguage: languageId,
      genre: config.entry.category.label,
      isPartOf: { "@type": "CollectionPage", url: absoluteUrl(languageId, "presets.html") },
      creator: { "@type": "Organization", name: "LITE Studio" }
    };
  }

  if (config.kind === "presets") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url,
      image,
      inLanguage: languageId
    };
  }

  if (config.kind === "faq") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: languageId,
      mainEntity: extractFaqEntries(page).slice(0, 6)
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image,
    inLanguage: languageId,
    author: {
      "@type": "Organization",
      name: "LITE Studio"
    },
    publisher: {
      "@type": "Organization",
      name: "LITE Studio"
    }
  };
}

function renderHead(copy, page, config, languageId) {
  const meta = page.meta;
  const locale = LANGUAGES[languageId].locale;
  const description = meta.description;
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || description;
  const twitterTitle = meta.twitterTitle || ogTitle;
  const twitterDescription = meta.twitterDescription || ogDescription;
  const imageUrl = `${DOMAIN}/${config.image}`;
  const imageAlt = meta.ogImageAlt || description;
  const canonical = absoluteUrl(languageId, config.file);
  const structuredData = JSON.stringify(buildStructuredData(config, page, languageId), null, 2);
  const prefix = relativePrefix(languageId);
  const cssHref = `${prefix}css/site.css?v=4.0`;

  return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0e0d0c">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  ${renderAlternateLinks(config.file)}
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta property="og:type" content="${config.ogType}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:site_name" content="LITE Studio">
  <meta property="og:title" content="${escapeHtml(ogTitle)}">
  <meta property="og:description" content="${escapeHtml(ogDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(twitterTitle)}">
  <meta name="twitter:description" content="${escapeHtml(twitterDescription)}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">
  <link rel="preload" href="${relativePrefix(languageId)}fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="icon" href="${prefix}assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="${prefix}assets/icons/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${prefix}assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="${prefix}manifest.webmanifest">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <link rel="stylesheet" href="${prefix}css/fonts.css?v=4.0">
  <link rel="stylesheet" href="${cssHref}">
  <script src="${prefix}js/site-nav.js?v=3.2" defer></script>
  <script src="${prefix}js/site-extras.js?v=4.0" defer></script>
  <script type="application/ld+json">
${structuredData}
  </script>
</head>`;
}

function renderTopStrip(copy, page) {
  return `<aside class="top-strip" aria-label="${escapeHtml(copy.common.kofiAlt)}">
    <div class="site-shell top-strip-inner">
      <div class="top-copy" id="topCopy">${escapeHtml(page.topCopy)}</div>
      <a class="top-kofi" href="https://ko-fi.com/D1D21VSKW5" target="_blank" rel="noreferrer noopener">${escapeHtml(copy.common.kofiAlt)}</a>
    </div>
  </aside>`;
}

function renderHeader(copy, page, languageId, fileName) {
  const currentKey = Object.entries(PUBLIC_PAGE_LINKS).find(function ([, value]) {
    return value === fileName;
  })?.[0] || (fileName.startsWith("presets/") ? "presets" : "home");
  const uiCopy = LANGUAGE_UI_COPY[languageId];

  return `<header class="site-nav">
    <div class="site-shell site-nav-inner">
      <a class="brand" href="${pagePrefix()}index.html">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-copy">
          <strong>LITE Studio</strong>
          <span id="brandTagline">${escapeHtml(page.brandTagline)}</span>
        </span>
      </a>
      <a class="site-primary-cta" href="${localizedHref(languageId, "app", relativePrefix(languageId))}">${escapeHtml(copy.common.links.app)}</a>
      <button class="site-menu-toggle" type="button" aria-label="${escapeHtml(uiCopy.menuLabel)}" aria-controls="siteNavTools" aria-expanded="false">
        <span>${escapeHtml(uiCopy.menuLabel)}</span>
      </button>
      <button class="site-nav-backdrop" type="button" aria-label="${escapeHtml(uiCopy.closeMenuLabel)}" hidden></button>
      <div class="site-nav-tools" id="siteNavTools">
        <div class="site-drawer-head">
          <strong>LITE Studio</strong>
          <button class="site-menu-close" type="button" aria-label="${escapeHtml(uiCopy.closeMenuLabel)}">${escapeHtml(uiCopy.closeMenuLabel)}</button>
        </div>
        <nav class="nav-links" id="siteNavLinks" aria-label="${escapeHtml(copy.common.navAriaLabel)}">
          ${renderNav(copy, page, languageId, currentKey)}
        </nav>
        ${renderLanguageSwitcher(fileName, languageId)}
      </div>
    </div>
  </header>`;
}

function renderFooter(copy, page, languageId, fileName) {
  return `<footer class="footer">
    ${renderTranslationPanel(fileName, languageId)}
    <div class="site-shell footer-inner">
      <div id="footerCopy">${escapeHtml(page.footerCopy)}</div>
      <div class="footer-links" id="footerLinks">
        ${renderFooterLinks(copy, page, languageId)}
      </div>
    </div>
  </footer>`;
}

function renderIndexMain(page, languageId) {
  const html = function (key) {
    return rewriteInlineHtml(page.sections[key] || "", languageId);
  };
  // Parcours de la page d'accueil : promesse, fonctionnement, atouts illustres,
  // presets, appel a l'action, puis ressources pour aller plus loin.
  return `<main>
    <section class="hero hero-landing">
      <div class="site-shell hero-landing-grid">
        <div class="hero-landing-copy" id="heroCopyContent">${html("heroCopyContent")}${renderResumeCard(languageId)}</div>
        <div class="hero-landing-shot" id="heroVisualContent">${html("heroVisualContent")}</div>
      </div>
    </section>
    <section class="section landing-steps" id="how">
      <div class="site-shell" data-reveal>
        <div class="section-head is-centered" id="stepsHeadContent">${html("stepsHeadContent")}</div>
        <ol class="step-list" id="stepsContent">${html("stepsContent")}</ol>
      </div>
    </section>
    <section class="section landing-features">
      <div class="site-shell">
        <div class="section-head is-centered" id="featuresHeadContent" data-reveal>${html("featuresHeadContent")}</div>
        <div class="feature-row" id="featureModelsContent" data-reveal>${html("featureModelsContent")}</div>
        <div class="feature-row is-reversed" id="featureMeasureContent" data-reveal>${html("featureMeasureContent")}</div>
        <div class="feature-row" id="featureLabContent" data-reveal>${html("featureLabContent")}</div>
        <div class="feature-row is-reversed feature-row-mobile" id="featureMobileContent" data-reveal>${html("featureMobileContent")}</div>
      </div>
    </section>
    <section class="section landing-android" id="android">
      <div class="site-shell">
        <div class="feature-row feature-row-android" id="androidAppContent" data-reveal>${html("androidAppContent")}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell" data-reveal>
        <div class="section-head" id="presetsHeadContent">${html("presetsHeadContent")}</div>
        <div class="preset-showcase" id="presetsShowcaseContent">${html("presetsShowcaseContent")}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell" data-reveal>
        <div class="cta-panel cta-landing" id="ctaPanelContent">${html("ctaPanelContent")}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell" data-reveal>
        <div class="section-head" id="resourcesHeadContent">${html("resourcesHeadContent")}</div>
        <div class="resource-grid" id="resourcesGridContent">${html("resourcesGridContent")}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell" data-reveal>
        <div class="section-head" id="seoPagesHeadContent">${html("seoPagesHeadContent")}</div>
        <div class="card-grid" id="seoPagesCardsContent">${html("seoPagesCardsContent")}</div>
      </div>
    </section>
  </main>`;
}

// Rempli par js/site-extras.js depuis les plateaux enregistres dans ce navigateur.
function renderResumeCard(languageId) {
  const ui = LANGUAGE_UI_COPY[languageId];
  const app = rewriteAttributeValue("app.html", languageId, relativePrefix(languageId));
  return `<div class="resume-card" data-resume hidden data-app="${app}" data-lang="${languageId}" data-title="${escapeHtml(ui.resumeTitle)}" data-meta="${escapeHtml(ui.resumeMeta)}" data-all="${escapeHtml(ui.resumeAll)}"><img class="resume-thumb" alt="" width="96" height="60" hidden><div class="resume-copy"><strong class="resume-name"></strong><span class="resume-meta"></span></div><div class="resume-actions"><a class="button-link primary resume-open" href="${app}">${escapeHtml(ui.resumeAction)}</a><a class="resume-all" href="${app}"></a></div></div>`;
}

function renderGuideMain(page, languageId) {
  return `<main>
    <section class="hero">
      <div class="site-shell article-card" id="heroCardContent">${rewriteInlineHtml(page.sections.heroCardContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="guideFirstGridContent">${rewriteInlineHtml(page.sections.guideFirstGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="guideSecondGridContent">${rewriteInlineHtml(page.sections.guideSecondGridContent, languageId)}</div>
    </section>
  </main>`;
}

// Galerie generee par scripts/generate-preset-gallery.mjs (npm run build:presets).
let PRESET_GALLERY = null;

function fillCopy(template, values) {
  return Object.keys(values).reduce(function (text, key) {
    return text.split(`{${key}}`).join(String(values[key]));
  }, template);
}

function renderPresetGallery(languageId) {
  if (!PRESET_GALLERY) return "";
  const categories = PRESET_GALLERY.languages[languageId] || PRESET_GALLERY.languages.fr;
  const uiCopy = LANGUAGE_UI_COPY[languageId];
  const total = categories.reduce(function (sum, category) { return sum + category.presets.length; }, 0);
  const nav = categories.map(function (category) {
    return `<a class="preset-gallery-chip" href="#preset-cat-${category.id}">${escapeHtml(category.label)} <span>${category.presets.length}</span></a>`;
  }).join("");
  const groups = categories.map(function (category) {
    const cards = category.presets.map(function (preset) {
      return `<li><a class="preset-card-link" href="${presetPageHref(preset.id)}"><img src="${PRESET_GALLERY.thumbnails}/${preset.id}.webp" width="${PRESET_GALLERY.width}" height="${PRESET_GALLERY.height}" alt="" loading="lazy" decoding="async"><span class="preset-card-body"><strong>${escapeHtml(preset.name)}</strong><span class="preset-card-summary">${escapeHtml(preset.summary)}</span><span class="preset-card-meta"><span>${escapeHtml(fillCopy(uiCopy.itemsCount, { count: preset.count }))}</span><span class="preset-card-cta">${escapeHtml(uiCopy.openPreset)}</span></span></span></a></li>`;
    }).join("");
    return `<section class="preset-gallery-group" id="preset-cat-${category.id}" aria-labelledby="preset-cat-${category.id}-title"><div class="preset-gallery-head"><h3 id="preset-cat-${category.id}-title">${escapeHtml(category.label)}</h3><p>${escapeHtml(category.description)}</p></div><ul class="preset-gallery-grid">${cards}</ul></section>`;
  }).join("");
  const html = `<div class="section-head preset-gallery-intro"><p class="eyebrow">${escapeHtml(uiCopy.galleryEyebrow)}</p><h2>${escapeHtml(fillCopy(uiCopy.galleryTitle, { count: total }))}</h2><p>${escapeHtml(uiCopy.galleryIntro)}</p></div><nav class="preset-gallery-nav" aria-label="${escapeHtml(uiCopy.galleryNav)}">${nav}</nav>${groups}`;
  return `<section class="section preset-gallery" id="gallery"><div class="site-shell">${rewriteInlineHtml(html, languageId)}</div></section>`;
}

function presetPageHref(presetId) {
  return PAGE_DEPTH ? `${presetId}.html` : `presets/${presetId}.html`;
}

function presetCards(presets, languageId) {
  const uiCopy = LANGUAGE_UI_COPY[languageId];
  const prefix = relativePrefix(languageId);
  return presets.map(function (preset) {
    return `<li><a class="preset-card-link" href="${presetPageHref(preset.id)}"><img src="${prefix}${PRESET_GALLERY.thumbnails}/${preset.id}.webp" width="${PRESET_GALLERY.width}" height="${PRESET_GALLERY.height}" alt="" loading="lazy" decoding="async"><span class="preset-card-body"><strong>${escapeHtml(preset.name)}</strong><span class="preset-card-summary">${escapeHtml(preset.summary)}</span><span class="preset-card-meta"><span>${escapeHtml(fillCopy(uiCopy.itemsCount, { count: preset.count }))}</span><span class="preset-card-cta">${escapeHtml(uiCopy.presetDetails)}</span></span></span></a></li>`;
  }).join("");
}

function presetGearMarkup(groups, languageId) {
  if (!groups || !groups.length) return "";
  return groups.map(function (group) {
    const rows = group.rows.map(function (row) {
      return `<li><span class="gear-count">${row.count} ×</span><span class="gear-name">${escapeHtml(row.title)}</span><span class="gear-size"><bdi>${escapeHtml(row.size || "")}</bdi></span></li>`;
    }).join("");
    return `<section class="preset-gear-group"><h3>${escapeHtml(group.label)}</h3><ul>${rows}</ul></section>`;
  }).join("");
}

function renderPresetPageMain(entry, languageId) {
  const ui = LANGUAGE_UI_COPY[languageId];
  const prefix = relativePrefix(languageId);
  const { preset, category } = entry;
  const app = rewriteAttributeValue(`app.html?preset=${encodeURIComponent(preset.id)}`, languageId, prefix);
  const presetsPage = `${pagePrefix()}presets.html`;
  const gear = (PRESET_GALLERY.gear && PRESET_GALLERY.gear[preset.id] && PRESET_GALLERY.gear[preset.id][languageId]) || [];
  const gearCount = gear.reduce(function (sum, group) {
    return sum + group.rows.reduce(function (total, row) { return total + row.count; }, 0);
  }, 0);
  const siblings = category.presets.filter(function (candidate) { return candidate.id !== preset.id; }).slice(0, 3);
  return `<main>
    <section class="hero preset-hero">
      <div class="site-shell preset-hero-grid">
        <div class="preset-hero-copy">
          <nav class="breadcrumb" aria-label="${escapeHtml(ui.breadcrumbAria)}"><a href="${presetsPage}">${escapeHtml(ui.presetsLabel)}</a><span aria-hidden="true">›</span><a href="${presetsPage}#preset-cat-${category.id}">${escapeHtml(category.label)}</a></nav>
          <h1>${escapeHtml(preset.name)}</h1>
          <p class="hero-lead">${escapeHtml(preset.summary)}</p>
          <ul class="preset-facts">
            <li>${escapeHtml(fillCopy(ui.itemsCount, { count: preset.count }))}</li>
            <li>${escapeHtml(category.label)}</li>
            <li>${escapeHtml(ui.studioSize)}</li>
          </ul>
          <div class="hero-actions">
            <a class="button-link primary" href="${app}">${escapeHtml(ui.presetOpen)}</a>
            <button class="button-link secondary" type="button" data-share-page data-share-title="${escapeHtml(preset.name)} · LITE Studio" data-share-text="${escapeHtml(preset.summary)}" data-copied="${escapeHtml(ui.linkCopied)}">${escapeHtml(ui.presetShare)}</button>
          </div>
        </div>
        <figure class="preset-hero-shot shot-frame"><img src="${prefix}${PRESET_GALLERY.og}/${preset.id}.jpg" width="1200" height="630" alt="${escapeHtml(fillCopy(ui.presetSceneAlt, { name: preset.name }))}" fetchpriority="high" decoding="async"></figure>
      </div>
    </section>
    <section class="section">
      <div class="site-shell preset-detail-grid">
        <figure class="preset-plan shot-frame"><img src="${prefix}${PRESET_GALLERY.plans}/${preset.id}.webp" width="1200" height="840" alt="${escapeHtml(fillCopy(ui.presetPlanAlt, { name: preset.name }))}" loading="lazy" decoding="async"><figcaption>${escapeHtml(ui.presetPlan)}</figcaption></figure>
        <section class="preset-gear-card" aria-labelledby="presetGearTitle">
          <h2 id="presetGearTitle">${escapeHtml(ui.presetGear)} <span>${gearCount}</span></h2>
          ${presetGearMarkup(gear, languageId)}
          <p class="preset-gear-hint">${escapeHtml(ui.presetGearHint)}</p>
        </section>
      </div>
    </section>
    ${siblings.length ? `<section class="section">
      <div class="site-shell">
        <div class="section-head"><h2>${escapeHtml(ui.presetMore)}</h2></div>
        <ul class="preset-gallery-grid">${presetCards(siblings, languageId)}</ul>
        <p class="preset-all-link"><a href="${presetsPage}#gallery">${escapeHtml(ui.presetAll)}</a></p>
      </div>
    </section>` : ""}
  </main>`;
}

function presetPageEntries(languageId) {
  if (!PRESET_GALLERY) return [];
  const categories = PRESET_GALLERY.languages[languageId] || PRESET_GALLERY.languages.fr;
  return categories.flatMap(function (category) {
    return category.presets.map(function (preset) { return { preset, category }; });
  });
}

function presetPageConfig(entry, languageId) {
  const ui = LANGUAGE_UI_COPY[languageId];
  const { preset, category } = entry;
  return {
    pageId: `preset-${preset.id}`,
    file: `presets/${preset.id}.html`,
    kind: "preset",
    image: `${PRESET_GALLERY.og}/${preset.id}.jpg`,
    ogType: "article",
    priority: "0.6",
    entry: entry,
    page: {
      meta: {
        title: fillCopy(ui.presetMetaTitle, { name: preset.name, category: category.label }),
        description: fillCopy(ui.presetMetaDescription, { summary: preset.summary, count: preset.count }),
        ogTitle: fillCopy(ui.presetOgTitle, { name: preset.name }),
        ogDescription: fillCopy(ui.presetMetaDescription, { summary: preset.summary, count: preset.count }),
        ogImageAlt: fillCopy(ui.presetSceneAlt, { name: preset.name })
      },
      topCopy: ui.presetTopCopy,
      brandTagline: ui.brandTagline,
      navItems: ["home", "app", "guide", "faq"],
      footerItems: ["home", "app", "guide", "presets", "faq"],
      footerCopy: ui.presetFooter,
      sections: {}
    }
  };
}

function renderPresetsMain(page, languageId) {
  return `<main>
    <section class="hero">
      <div class="site-shell article-card" id="heroCardContent">${rewriteInlineHtml(page.sections.heroCardContent, languageId)}</div>
    </section>
    ${renderPresetGallery(languageId)}
    <section class="section">
      <div class="site-shell preset-grid" id="presetTopGridContent">${rewriteInlineHtml(page.sections.presetTopGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="presetDetailsGridContent">${rewriteInlineHtml(page.sections.presetDetailsGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell cta-panel" id="ctaPanelContent">${rewriteInlineHtml(page.sections.ctaPanelContent, languageId)}</div>
    </section>
  </main>`;
}

function renderFaqMain(page, languageId) {
  return `<main>
    <section class="hero">
      <div class="site-shell article-card" id="heroCardContent">${rewriteInlineHtml(page.sections.heroCardContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell faq-grid" id="faqGridContent">${rewriteInlineHtml(page.sections.faqGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell cta-panel" id="ctaPanelContent">${rewriteInlineHtml(page.sections.ctaPanelContent, languageId)}</div>
    </section>
  </main>`;
}

function renderSeoMain(page, languageId) {
  return `<main>
    <section class="hero">
      <div class="site-shell">
        <article class="hero-copy hero-panel">
          <div class="hero-panel-main" id="heroCopyContent">${rewriteInlineHtml(page.sections.heroCopyContent, languageId)}</div>
          <div class="hero-inline-media" id="heroVisualContent">${rewriteInlineHtml(page.sections.heroVisualContent, languageId)}</div>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="firstGridContent">${rewriteInlineHtml(page.sections.firstGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="secondGridContent">${rewriteInlineHtml(page.sections.secondGridContent, languageId)}</div>
    </section>
  </main>`;
}

function renderMain(page, config, languageId) {
  if (config.kind === "preset") return renderPresetPageMain(config.entry, languageId);
  if (config.kind === "index") return renderIndexMain(page, languageId);
  if (config.kind === "guide") return renderGuideMain(page, languageId);
  if (config.kind === "presets") return renderPresetsMain(page, languageId);
  if (config.kind === "faq") return renderFaqMain(page, languageId);
  return renderSeoMain(page, languageId);
}

function renderPage(copy, config, languageId) {
  const page = config.page || copy.pages[config.pageId];
  return `<!DOCTYPE html>
<html lang="${languageId}" dir="${LANGUAGES[languageId].dir}" data-page="${config.pageId}">
${renderHead(copy, page, config, languageId)}
<body>
  ${renderTopStrip(copy, page)}
  ${renderHeader(copy, page, languageId, config.file)}
  ${renderMain(page, config, languageId)}
  ${renderFooter(copy, page, languageId, config.file)}
</body>
</html>
`;
}

async function loadPublicCopy() {
  const context = vm.createContext({ window: { SitePublicCopy: {} } });
  const files = [
    "js/site-copy-fr.js",
    "js/site-copy-en.js",
    "js/site-copy-es.js",
    "js/site-copy-de.js",
    "js/site-copy-ar.js",
    "js/site-copy-seo-fr.js",
    "js/site-copy-seo-en.js",
    "js/site-copy-seo-es.js",
    "js/site-copy-seo-de.js",
    "js/site-copy-seo-ar.js"
  ];

  for (const file of files) {
    const source = await fs.readFile(path.join(ROOT, file), "utf8");
    vm.runInContext(source, context, { filename: file });
  }

  return context.window.SitePublicCopy;
}

async function writeLocalizedPages(copy) {
  for (const languageId of Object.keys(LANGUAGES)) {
    const folder = LANGUAGES[languageId].folder;
    const outputDir = folder ? path.join(ROOT, folder) : ROOT;

    if (folder) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    for (const config of PAGE_CONFIGS) {
      const html = renderPage(copy[languageId], config, languageId);
      const targetPath = path.join(outputDir, config.file);
      await fs.writeFile(targetPath, html, "utf8");
    }

    const entries = presetPageEntries(languageId);
    if (entries.length) {
      await fs.mkdir(path.join(outputDir, "presets"), { recursive: true });
      PAGE_DEPTH = 1;
      try {
        for (const entry of entries) {
          const config = presetPageConfig(entry, languageId);
          await fs.writeFile(path.join(outputDir, config.file), renderPage(copy[languageId], config, languageId), "utf8");
        }
      } finally {
        PAGE_DEPTH = 0;
      }
    }
  }
}

function renderSitemap() {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  for (const config of PAGE_CONFIGS) {
    for (const languageId of Object.keys(LANGUAGES)) {
      lines.push("  <url>");
      lines.push(`    <loc>${absoluteUrl(languageId, config.file)}</loc>`);
      lines.push("    <lastmod>2026-11-25</lastmod>");
      lines.push("    <changefreq>weekly</changefreq>");
      lines.push(`    <priority>${config.priority}</priority>`);
      for (const alternateLanguage of Object.keys(LANGUAGES)) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alternateLanguage}" href="${absoluteUrl(alternateLanguage, config.file)}" />`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl("fr", config.file)}" />`);
      lines.push("  </url>");
    }
  }

  presetPageEntries("fr").forEach(function (entry) {
    const file = `presets/${entry.preset.id}.html`;
    for (const languageId of Object.keys(LANGUAGES)) {
      lines.push("  <url>");
      lines.push(`    <loc>${absoluteUrl(languageId, file)}</loc>`);
      lines.push("    <lastmod>2026-11-25</lastmod>");
      lines.push("    <changefreq>monthly</changefreq>");
      lines.push("    <priority>0.6</priority>");
      for (const alternateLanguage of Object.keys(LANGUAGES)) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alternateLanguage}" href="${absoluteUrl(alternateLanguage, file)}" />`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl("fr", file)}" />`);
      lines.push("  </url>");
    }
  });

  lines.push("  <url>");
  lines.push(`    <loc>${DOMAIN}/app.html</loc>`);
  lines.push("    <lastmod>2026-11-25</lastmod>");
  lines.push("    <changefreq>weekly</changefreq>");
  lines.push("    <priority>0.9</priority>");
  lines.push("  </url>");
  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

async function main() {
  try {
    PRESET_GALLERY = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "preset-gallery.json"), "utf8"));
  } catch (error) {
    PRESET_GALLERY = null;
    console.warn("Galerie de presets absente : lancez npm run build:presets.");
  }
  const copy = await loadPublicCopy();
  await writeLocalizedPages(copy);
  await fs.writeFile(path.join(ROOT, "sitemap.xml"), renderSitemap(), "utf8");
  console.log("Generated root FR pages and localized static pages for en/es/de/ar.");
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
