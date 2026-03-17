(() => {
  const STORAGE_KEY_LANGUAGE = "lite-studio-language";
  const LANGUAGE_OPTIONS = {
    fr: { dir: "ltr", ogLocale: "fr_FR" },
    en: { dir: "ltr", ogLocale: "en_US" },
    es: { dir: "ltr", ogLocale: "es_ES" },
    de: { dir: "ltr", ogLocale: "de_DE" },
    ar: { dir: "rtl", ogLocale: "ar_SA" }
  };

  const PAGE_LINKS = {
    home: "index.html",
    app: "app.html",
    guide: "guide.html",
    presets: "presets.html",
    faq: "faq.html",
    portraitSchema: "schema-eclairage-portrait.html",
    boudoirPlan: "plan-studio-boudoir.html",
    interviewLighting: "lighting-diagram-interview.html"
  };

  function normalizeLanguage(candidate) {
    const value = String(candidate || "").slice(0, 2).toLowerCase();
    return Object.prototype.hasOwnProperty.call(LANGUAGE_OPTIONS, value) ? value : "";
  }

  function persistLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY_LANGUAGE, language);
    } catch (error) {
      // Ignore storage issues.
    }
  }

  function detectPreferredLanguage() {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryLanguage = normalizeLanguage(params.get("lang"));
      if (queryLanguage) {
        persistLanguage(queryLanguage);
        return queryLanguage;
      }
    } catch (error) {
      // Ignore invalid URL parameters.
    }

    try {
      const storedLanguage = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY_LANGUAGE));
      if (storedLanguage) {
        return storedLanguage;
      }
    } catch (error) {
      // Ignore storage issues.
    }

    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "fr"];

    for (let index = 0; index < browserLanguages.length; index += 1) {
      const normalized = normalizeLanguage(browserLanguages[index]);
      if (normalized) {
        persistLanguage(normalized);
        return normalized;
      }
    }

    return "fr";
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function setHtml(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = value;
    }
  }

  function setMetaContent(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.setAttribute("content", value);
    }
  }

  function buildLinkGroupHtml(copy, itemKeys) {
    return itemKeys.map(function (key) {
      return `<a href="${PAGE_LINKS[key]}">${copy.common.links[key]}</a>`;
    }).join("");
  }

  function localizeInternalLinks(language) {
    document.querySelectorAll('a[href]').forEach(function (anchor) {
      const href = anchor.getAttribute('href');
      if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href) || /^https?:\/\//i.test(href)) {
        return;
      }

      const match = href.match(/^(index\.html|app\.html|guide\.html|presets\.html|faq\.html|schema-eclairage-portrait\.html|plan-studio-boudoir\.html|lighting-diagram-interview\.html)(\?.*)?(#.*)?$/i);
      if (!match) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        url.searchParams.set('lang', language);
        anchor.setAttribute('href', `${match[1]}${url.search}${url.hash}`);
      } catch (error) {
        anchor.setAttribute('href', `${match[1]}?lang=${language}`);
      }
    });
  }

  function applySiteLanguage() {
    const language = detectPreferredLanguage();
    const dictionaries = window.SitePublicCopy || {};
    const copy = dictionaries[language] || dictionaries.fr;
    if (!copy) {
      return;
    }

    const pageId = document.documentElement.getAttribute('data-page');
    const page = copy.pages && copy.pages[pageId];
    if (!page) {
      return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = LANGUAGE_OPTIONS[language].dir;
    document.body.setAttribute('data-language', language);

    document.title = page.meta.title;
    setMetaContent('meta[name="description"]', page.meta.description);
    setMetaContent('meta[property="og:title"]', page.meta.ogTitle || page.meta.title);
    setMetaContent('meta[property="og:description"]', page.meta.ogDescription || page.meta.description);
    setMetaContent('meta[property="og:locale"]', LANGUAGE_OPTIONS[language].ogLocale);
    setMetaContent('meta[name="twitter:title"]', page.meta.twitterTitle || page.meta.ogTitle || page.meta.title);
    setMetaContent('meta[name="twitter:description"]', page.meta.twitterDescription || page.meta.ogDescription || page.meta.description);
    setMetaContent('meta[property="og:image:alt"]', page.meta.ogImageAlt || page.meta.description);
    setMetaContent('meta[name="twitter:image:alt"]', page.meta.twitterImageAlt || page.meta.ogImageAlt || page.meta.description);

    setText('topCopy', page.topCopy);
    setText('brandTagline', page.brandTagline);
    setText('footerCopy', page.footerCopy);

    const nav = document.getElementById('siteNavLinks');
    if (nav) {
      nav.innerHTML = buildLinkGroupHtml(copy, page.navItems);
      nav.setAttribute('aria-label', copy.common.navAriaLabel);
    }

    const footerLinks = document.getElementById('footerLinks');
    if (footerLinks) {
      footerLinks.innerHTML = buildLinkGroupHtml(copy, page.footerItems);
    }

    const kofiImage = document.querySelector('.top-kofi img');
    if (kofiImage) {
      kofiImage.setAttribute('alt', copy.common.kofiAlt);
    }

    Object.keys(page.sections).forEach(function (sectionId) {
      setHtml(sectionId, page.sections[sectionId]);
    });

    localizeInternalLinks(language);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteLanguage, { once: true });
  } else {
    applySiteLanguage();
  }
})();
