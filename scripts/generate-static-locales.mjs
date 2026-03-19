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

const LANGUAGES = {
  fr: { dir: "ltr", locale: "fr_FR", folder: "", code: "FR", flag: "🇫🇷", label: "Francais" },
  en: { dir: "ltr", locale: "en_US", folder: "en", code: "EN", flag: "🇺🇸", label: "English" },
  es: { dir: "ltr", locale: "es_ES", folder: "es", code: "ES", flag: "🇪🇸", label: "Espanol" },
  de: { dir: "ltr", locale: "de_DE", folder: "de", code: "DE", flag: "🇩🇪", label: "Deutsch" },
  ar: { dir: "rtl", locale: "ar_SA", folder: "ar", code: "AR", flag: "🇸🇦", label: "العربية" }
};

const LANGUAGE_UI_COPY = {
  fr: {
    selector: "Langues",
    switcherAria: "Choisir la langue de la page",
    versionsTitle: "Versions",
    versionsText: "Cette page est disponible dans les langues suivantes."
  },
  en: {
    selector: "Languages",
    switcherAria: "Choose the page language",
    versionsTitle: "Versions",
    versionsText: "This page is available in the following languages."
  },
  es: {
    selector: "Idiomas",
    switcherAria: "Elegir el idioma de la pagina",
    versionsTitle: "Versiones",
    versionsText: "Esta pagina esta disponible en los siguientes idiomas."
  },
  de: {
    selector: "Sprachen",
    switcherAria: "Seitensprache auswahlen",
    versionsTitle: "Versionen",
    versionsText: "Diese Seite ist in den folgenden Sprachen verfugbar."
  },
  ar: {
    selector: "اللغات",
    switcherAria: "اختر لغة الصفحة",
    versionsTitle: "النسخ",
    versionsText: "هذه الصفحة متوفرة باللغات التالية."
  }
};

const PAGE_CONFIGS = [
  { pageId: "index", file: "index.html", kind: "index", image: "docs/screenshots/studio-portrait.png", ogType: "website", priority: "1.0" },
  { pageId: "guide", file: "guide.html", kind: "guide", image: "docs/screenshots/studio-portrait.png", ogType: "article", priority: "0.8" },
  { pageId: "presets", file: "presets.html", kind: "presets", image: "docs/screenshots/studio-boudoir.png", ogType: "website", priority: "0.8" },
  { pageId: "faq", file: "faq.html", kind: "faq", image: "docs/screenshots/studio-video.png", ogType: "website", priority: "0.7" },
  { pageId: "portraitSchema", file: "schema-eclairage-portrait.html", kind: "seo", image: "docs/screenshots/studio-portrait.png", ogType: "article", priority: "0.8" },
  { pageId: "boudoirPlan", file: "plan-studio-boudoir.html", kind: "seo", image: "docs/screenshots/studio-boudoir.png", ogType: "article", priority: "0.8" },
  { pageId: "interviewLighting", file: "lighting-diagram-interview.html", kind: "seo", image: "docs/screenshots/studio-video.png", ogType: "article", priority: "0.8" }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function relativePrefix(languageId) {
  return languageId === "fr" ? "" : "../";
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

  return key === "home" ? "index.html" : fileName;
}

function rewriteAttributeValue(value, languageId, prefix) {
  if (/^(https?:|mailto:|tel:|#)/i.test(value)) {
    return value;
  }

  if (value.startsWith("css/") || value.startsWith("docs/")) {
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
    return `${fileName}${query}${hash}`;
  }

  return value;
}

function rewriteInlineHtml(html, languageId) {
  const prefix = relativePrefix(languageId);
  return String(html).replace(/(href|src)="([^"]+)"/g, function (_, attribute, value) {
    return `${attribute}="${rewriteAttributeValue(value, languageId, prefix)}"`;
  });
}

function renderNav(copy, page, languageId) {
  return page.navItems.map(function (key) {
    return `<a href="${localizedHref(languageId, key, relativePrefix(languageId))}">${escapeHtml(copy.common.links[key])}</a>`;
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

    return `<a class="language-chip${activeClass}" href="${absoluteUrl(targetLanguageId, fileName)}" hreflang="${targetLanguageId}" lang="${targetLanguageId}" title="${escapeHtml(language.label)}" aria-label="${escapeHtml(language.label)}"${stateAttributes}>
      <span class="language-chip-flag" aria-hidden="true">${language.flag}</span>
    </a>`;
  }).join("");

  return `<nav class="language-switcher" aria-label="${escapeHtml(uiCopy.switcherAria)}">
    <div class="language-switcher-list">
      ${items}
    </div>
  </nav>`;
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
  return String(value || "").replace(/\s+\|\s+Lumiere Studio$/, "").trim();
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
      name: "Lumiere Studio",
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
      name: "Lumiere Studio"
    },
    publisher: {
      "@type": "Organization",
      name: "Lumiere Studio"
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
  const cssHref = `${relativePrefix(languageId)}css/site.css`;

  return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#07111f">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  ${renderAlternateLinks(config.file)}
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta property="og:type" content="${config.ogType}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:site_name" content="Lumiere Studio">
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssHref}">
  <script type="application/ld+json">
${structuredData}
  </script>
</head>`;
}

function renderTopStrip(copy, page) {
  return `<div class="top-strip">
    <div class="site-shell top-strip-inner">
      <div class="top-copy" id="topCopy">${escapeHtml(page.topCopy)}</div>
      <a class="top-kofi" href="https://ko-fi.com/D1D21VSKW5" target="_blank" rel="noreferrer noopener">
        <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="${escapeHtml(copy.common.kofiAlt)}">
      </a>
    </div>
  </div>`;
}

function renderHeader(copy, page, languageId, fileName) {
  return `<header class="site-nav">
    <div class="site-shell site-nav-inner">
      <a class="brand" href="index.html">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-copy">
          <strong>Lumiere Studio</strong>
          <span id="brandTagline">${escapeHtml(page.brandTagline)}</span>
        </span>
      </a>
      <div class="site-nav-tools">
        <nav class="nav-links" id="siteNavLinks" aria-label="${escapeHtml(copy.common.navAriaLabel)}">
          ${renderNav(copy, page, languageId)}
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
  return `<main>
    <section class="hero">
      <div class="site-shell">
        <article class="hero-copy hero-panel">
          <div class="hero-panel-main" id="heroCopyContent">${rewriteInlineHtml(page.sections.heroCopyContent, languageId)}</div>
          <div class="hero-inline-media" id="heroVisualContent">${rewriteInlineHtml(page.sections.heroVisualContent, languageId)}</div>
        </article>
      </div>
    </section>
    <section class="section section-tight">
      <div class="site-shell">
        <div class="intro-panel" id="introPanelContent">${rewriteInlineHtml(page.sections.introPanelContent, languageId)}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell">
        <div class="section-head" id="featuresHeadContent">${rewriteInlineHtml(page.sections.featuresHeadContent, languageId)}</div>
        <div class="card-grid" id="featureCardsContent">${rewriteInlineHtml(page.sections.featureCardsContent, languageId)}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell">
        <div class="section-head" id="capturesHeadContent">${rewriteInlineHtml(page.sections.capturesHeadContent, languageId)}</div>
        <div class="screenshot-grid" id="screenshotGridContent">${rewriteInlineHtml(page.sections.screenshotGridContent, languageId)}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell article-grid" id="resourcesGridContent">${rewriteInlineHtml(page.sections.resourcesGridContent, languageId)}</div>
    </section>
    <section class="section">
      <div class="site-shell">
        <div class="cta-panel" id="ctaPanelContent">${rewriteInlineHtml(page.sections.ctaPanelContent, languageId)}</div>
      </div>
    </section>
    <section class="section">
      <div class="site-shell">
        <div class="section-head" id="seoPagesHeadContent">${rewriteInlineHtml(page.sections.seoPagesHeadContent, languageId)}</div>
        <div class="card-grid" id="seoPagesCardsContent">${rewriteInlineHtml(page.sections.seoPagesCardsContent, languageId)}</div>
      </div>
    </section>
  </main>`;
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

function renderPresetsMain(page, languageId) {
  return `<main>
    <section class="hero">
      <div class="site-shell article-card" id="heroCardContent">${rewriteInlineHtml(page.sections.heroCardContent, languageId)}</div>
    </section>
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
  if (config.kind === "index") return renderIndexMain(page, languageId);
  if (config.kind === "guide") return renderGuideMain(page, languageId);
  if (config.kind === "presets") return renderPresetsMain(page, languageId);
  if (config.kind === "faq") return renderFaqMain(page, languageId);
  return renderSeoMain(page, languageId);
}

function renderPage(copy, config, languageId) {
  const page = copy.pages[config.pageId];
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
      lines.push("    <lastmod>2026-03-17</lastmod>");
      lines.push("    <changefreq>weekly</changefreq>");
      lines.push(`    <priority>${config.priority}</priority>`);
      for (const alternateLanguage of Object.keys(LANGUAGES)) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alternateLanguage}" href="${absoluteUrl(alternateLanguage, config.file)}" />`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl("fr", config.file)}" />`);
      lines.push("  </url>");
    }
  }

  lines.push("  <url>");
  lines.push(`    <loc>${DOMAIN}/app.html</loc>`);
  lines.push("    <lastmod>2026-03-17</lastmod>");
  lines.push("    <changefreq>weekly</changefreq>");
  lines.push("    <priority>0.9</priority>");
  lines.push("  </url>");
  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const copy = await loadPublicCopy();
  await writeLocalizedPages(copy);
  await fs.writeFile(path.join(ROOT, "sitemap.xml"), renderSitemap(), "utf8");
  console.log("Generated root FR pages and localized static pages for en/es/de/ar.");
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
