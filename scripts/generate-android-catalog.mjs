// Exporte le catalogue de l'application (materiel, couleurs, presets) dans les 5 langues,
// pour l'application Android LITE Studio, qui le lit tel quel.
// Usage : npm run build:catalog -- <dossier de sortie>   (par defaut : dist/android-catalog)
// Playwright doit etre installe (npm install).
import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { chromium } from "playwright";
import { startServer } from "./shot-helpers.mjs";

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, process.argv[2] || path.join("dist", "android-catalog"));
const LANGUAGES = ["fr", "en", "es", "de", "ar"];

async function main() {
  const server = await startServer(ROOT);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", function (error) { errors.push(String(error)); });
  await page.addInitScript(function () { localStorage.setItem("lite-studio-onboarded", "1"); });
  await page.goto(`${base}/app.html?lang=fr`);
  await page.waitForFunction(function () { return Boolean(window.LiteStudio && window.LiteStudio.catalogExport); });
  await fs.mkdir(OUT_DIR, { recursive: true });
  // Vues de dessus (plan) et vignettes (bibliotheque) de chaque element.
  const variantIds = await page.evaluate(function () { return Object.keys(window.LiteStudio.catalogExport("fr").variants); });
  await fs.mkdir(path.join(OUT_DIR, "sprites"), { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, "thumbs"), { recursive: true });
  const spriteSizes = {};
  for (const variantId of variantIds) {
    const sprite = await page.evaluate(function (id) { return window.LiteStudio.spriteExport(id, 160); }, variantId);
    spriteSizes[variantId] = Number(sprite.meters.toFixed(3));
    await fs.writeFile(path.join(OUT_DIR, "sprites", `${variantId}.png`), Buffer.from(sprite.png.split(",")[1], "base64"));
    const thumb = await page.evaluate(async function (id) {
      const src = window.LiteStudio.thumbnailExport(id);
      const image = new Image();
      image.src = src;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      return canvas.toDataURL("image/webp", 0.8);
    }, variantId);
    await fs.writeFile(path.join(OUT_DIR, "thumbs", `${variantId}.webp`), Buffer.from(thumb.split(",")[1], "base64"));
  }
  await fs.writeFile(path.join(OUT_DIR, "sprites.json"), JSON.stringify(spriteSizes, null, 1) + "\n", "utf8");

  // Origine du catalogue : version du site et commit, affichés dans « À propos » de l'appli.
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"));
  let commit = "";
  try {
    commit = execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim();
  } catch (error) {
    commit = "";
  }
  const source = { site: "lumierestudio.archi-it.fr", version: pkg.version || "", commit: commit };
  for (const language of LANGUAGES) {
    const catalog = await page.evaluate(function (lang) { return window.LiteStudio.catalogExport(lang); }, language);
    catalog.source = source;
    await fs.writeFile(path.join(OUT_DIR, `catalog-${language}.json`), JSON.stringify(catalog, null, 1) + "\n", "utf8");
  }
  await browser.close();
  server.close();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
  console.log(`Catalogue Android exporte dans ${path.relative(ROOT, OUT_DIR) || "."} (${LANGUAGES.length} langues).`);
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
