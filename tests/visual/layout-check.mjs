// Controles visuels automatiques de app.html (Playwright).
//
//   npm install           (installe Playwright, une seule fois)
//   npx playwright install chromium
//   npm run test:visual
//
// Le script sert le depot en local, ouvre l'application sur trois tailles d'ecran
// et trois presets, puis verifie :
//   1. qu'aucun bloc ne deborde horizontalement de la fenetre ;
//   2. que chaque menu deroulant reste entierement dans la fenetre ;
//   3. qu'aucune erreur JavaScript n'est levee.
// Les captures sont enregistrees dans tests/visual/output/ pour une relecture a l'oeil.

import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outputDir = join(root, "tests", "visual", "output");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "tablet", width: 1024, height: 768, isMobile: false, hasTouch: true },
  { name: "desktop", width: 1440, height: 900, isMobile: false, hasTouch: false }
];
const PRESETS = ["portrait-soft-45", "boudoir-parabolic", "interview-led"];
const MENUS = ["file", "color", "presets", "language"];
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function startServer() {
  const server = createServer(async (request, response) => {
    const path = normalize(decodeURIComponent(new URL(request.url, "http://localhost").pathname));
    const file = join(root, path === "/" ? "app.html" : path);
    if (!file.startsWith(root)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}

// Elements qui depassent le bord droit de la fenetre, hors zones a defilement horizontal voulu.
function findHorizontalOverflow() {
  const width = document.documentElement.clientWidth;
  const offenders = [];
  document.querySelectorAll(".page *").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (!rect.width || rect.right <= width + 1) return;
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      const overflowX = getComputedStyle(parent).overflowX;
      if (overflowX === "auto" || overflowX === "scroll" || overflowX === "hidden") return;
      if (parent.classList.contains("menu-panel")) return;
    }
    offenders.push(`${element.tagName.toLowerCase()}#${element.id}.${String(element.className).split(" ")[0]} -> ${Math.round(rect.right)}px`);
  });
  if (document.documentElement.scrollWidth > width + 1) {
    offenders.unshift(`page scrollWidth ${document.documentElement.scrollWidth}px > ${width}px`);
  }
  return offenders;
}

function menuPanelBounds(menuId) {
  const panel = document.querySelector(`.menu[data-menu="${menuId}"] .menu-panel`);
  const rect = panel.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: window.innerHeight
  };
}

const failures = [];
const server = await startServer();
const base = `http://127.0.0.1:${server.address().port}/app.html`;
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();

try {
  for (const viewport of VIEWPORTS) {
    for (const preset of PRESETS) {
      const label = `${viewport.name}/${preset}`;
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.isMobile,
        hasTouch: viewport.hasTouch
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`${base}?lang=fr&preset=${preset}`);
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(findHorizontalOverflow);
      if (overflow.length) failures.push(`${label} : debordement horizontal\n    ${overflow.slice(0, 8).join("\n    ")}`);
      await page.screenshot({ path: join(outputDir, `${viewport.name}-${preset}.png`) });

      if (preset === PRESETS[0]) {
        for (const menu of MENUS) {
          await page.click(`[data-menu-trigger="${menu}"]`);
          await page.waitForTimeout(150);
          const bounds = await page.evaluate(menuPanelBounds, menu);
          if (bounds.left < 0 || bounds.right > bounds.viewportWidth + 1 || bounds.bottom > bounds.viewportHeight + 1) {
            failures.push(`${label} : menu "${menu}" hors de la fenetre (${Math.round(bounds.left)}..${Math.round(bounds.right)} / ${bounds.viewportWidth}px, bas ${Math.round(bounds.bottom)} / ${bounds.viewportHeight}px)`);
          }
          await page.screenshot({ path: join(outputDir, `${viewport.name}-menu-${menu}.png`) });
          await page.click(`[data-menu-trigger="${menu}"]`);
        }
      }

      if (errors.length) failures.push(`${label} : erreur JavaScript\n    ${errors.join("\n    ")}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`\n${failures.length} probleme(s) :\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`OK : ${VIEWPORTS.length * PRESETS.length} combinaisons verifiees, captures dans tests/visual/output/`);
