// Genere la galerie de presets du site : une vignette WebP par preset
// (assets/presets/<id>.webp) et les libelles localises (scripts/preset-gallery.json),
// lus ensuite par generate-static-locales.mjs.
// Usage : npm run build:presets  (Playwright doit etre installe : npm install)
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "assets", "presets");
const DATA_FILE = path.join(ROOT, "scripts", "preset-gallery.json");
const LANGUAGES = ["fr", "en", "es", "de", "ar"];
const THUMB = { width: 640, height: 400, quality: 0.74 };
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".json": "application/json"
};

function startServer() {
  const server = http.createServer(async function (request, response) {
    const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filePath = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
    if (!filePath.startsWith(ROOT)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await fs.readFile(filePath);
      response.writeHead(200, { "Content-Type": TYPES[path.extname(filePath)] || "application/octet-stream" });
      response.end(body);
    } catch (error) {
      response.writeHead(404).end();
    }
  });
  return new Promise(function (resolve) {
    server.listen(0, "127.0.0.1", function () {
      resolve(server);
    });
  });
}

async function main() {
  const server = await startServer();
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
  const ids = languages.fr.flatMap(function (category) {
    return category.presets.map(function (preset) { return preset.id; });
  });
  for (const id of ids) {
    await page.goto(`${base}/app.html?lang=fr&preset=${encodeURIComponent(id)}`);
    await page.waitForFunction(function () { return Boolean(window.LiteStudio); });
    await page.evaluate(function () { return document.fonts && document.fonts.ready; });
    const dataUrl = await page.evaluate(function (size) {
      return window.LiteStudio.renderView("iso", size.width, size.height).toDataURL("image/webp", size.quality);
    }, THUMB);
    await fs.writeFile(path.join(OUT_DIR, `${id}.webp`), Buffer.from(dataUrl.split(",")[1], "base64"));
  }

  await fs.writeFile(DATA_FILE, `${JSON.stringify({ thumbnails: "assets/presets", width: THUMB.width, height: THUMB.height, languages }, null, 2)}\n`);
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
