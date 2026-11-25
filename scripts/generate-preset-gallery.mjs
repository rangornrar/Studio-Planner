// Genere la galerie de presets du site, lue ensuite par generate-static-locales.mjs :
//  - assets/presets/<id>.webp : vignette 3D ;
//  - assets/presets/plan/<id>.webp : vue de dessus pour la page publique du preset ;
//  - assets/og/presets/<id>.jpg : apercu 1200 x 630 pour les messageries ;
//  - scripts/preset-gallery.json : libelles et liste du materiel dans les 5 langues.
// Usage : npm run build:presets  (Playwright doit etre installe : npm install)
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { startServer, composeOgImage } from "./shot-helpers.mjs";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "assets", "presets");
const PLAN_DIR = path.join(ROOT, "assets", "presets", "plan");
const OG_DIR = path.join(ROOT, "assets", "og", "presets");
const DATA_FILE = path.join(ROOT, "scripts", "preset-gallery.json");
const LANGUAGES = ["fr", "en", "es", "de", "ar"];
const THUMB = { width: 640, height: 400, quality: 0.74 };

async function main() {
  const server = await startServer(ROOT);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", function (error) {
    errors.push(String(error));
  });

  await page.goto(`${base}/app.html?lang=fr`);
  await page.waitForFunction(function () { return Boolean(window.LiteStudio); });
  const languages = {};
  for (const language of LANGUAGES) {
    languages[language] = await page.evaluate(function (lang) {
      return window.LiteStudio.presetCatalog(lang);
    }, language);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(PLAN_DIR, { recursive: true });
  await fs.mkdir(OG_DIR, { recursive: true });
  const gear = {};
  const ids = languages.fr.flatMap(function (category) {
    return category.presets.map(function (preset) { return preset.id; });
  });
  for (const id of ids) {
    await page.goto(`${base}/app.html?lang=fr&preset=${encodeURIComponent(id)}`);
    await page.waitForFunction(function () { return Boolean(window.LiteStudio); });
    await page.evaluate(function () {
      localStorage.clear();
      return document.fonts && document.fonts.ready;
    });
    const dataUrl = await page.evaluate(function (size) {
      return window.LiteStudio.renderView("iso", size.width, size.height).toDataURL("image/webp", size.quality);
    }, THUMB);
    await fs.writeFile(path.join(OUT_DIR, `${id}.webp`), Buffer.from(dataUrl.split(",")[1], "base64"));
    const planUrl = await page.evaluate(function () {
      return window.LiteStudio.renderView("plan", 1200, 840).toDataURL("image/webp", 0.8);
    });
    await fs.writeFile(path.join(PLAN_DIR, `${id}.webp`), Buffer.from(planUrl.split(",")[1], "base64"));
    await fs.writeFile(path.join(OG_DIR, `${id}.jpg`), await composeOgImage(page, ""));
    gear[id] = {};
    for (const language of LANGUAGES) {
      gear[id][language] = await page.evaluate(function (lang) { return window.LiteStudio.gearList(lang); }, language);
    }
  }

  await fs.writeFile(DATA_FILE, `${JSON.stringify({ thumbnails: "assets/presets", width: THUMB.width, height: THUMB.height, plans: "assets/presets/plan", og: "assets/og/presets", languages, gear }, null, 2)}\n`);
  await browser.close();
  server.close();

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
  console.log(`Galerie : ${ids.length} vignettes dans assets/presets, libellés dans scripts/preset-gallery.json.`);
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
