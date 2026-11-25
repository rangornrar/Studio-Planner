// Regenere les visuels du site a partir de l'application reelle :
//  - assets/landing/hero-scene.webp : scene 3D de la page d'accueil ;
//  - assets/og/lite-studio.jpg : apercu 1200 x 630 pour les messageries ;
//  - assets/landing/measure-<langue>.webp, mobile-<langue>.webp, labo.webp : captures de l'interface.
// Usage : npm run build:shots  (Playwright doit etre installe : npm install)
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { startServer, composeOgImage } from "./shot-helpers.mjs";

const ROOT = process.cwd();
const LANDING = path.join(ROOT, "assets", "landing");
const OG = path.join(ROOT, "assets", "og");
const LANGUAGES = ["fr", "en", "es", "de", "ar"];
const HERO_PRESET = "portrait-soft-45";

async function openApp(page, base, query) {
  // Pas de guide de premiere visite ni d'astuce dans les captures.
  await page.addInitScript(function () {
    localStorage.setItem("lite-studio-onboarded", "1");
    localStorage.setItem("lite-studio-rotate-hint", "1");
  });
  await page.goto(`${base}/app.html?${query}`);
  await page.waitForFunction(function () { return Boolean(window.LiteStudio); });
  await page.evaluate(function () {
    return document.fonts && document.fonts.ready;
  });
  await page.waitForTimeout(300);
}

async function toWebp(page, buffer, width, height, quality) {
  return page.evaluate(async function (args) {
    const image = new Image();
    image.src = `data:image/png;base64,${args.data}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = args.width;
    canvas.height = args.height;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, 0, 0, args.width, args.height);
    return canvas.toDataURL("image/webp", args.quality).split(",")[1];
  }, { data: buffer.toString("base64"), width: width, height: height, quality: quality });
}

async function main() {
  const server = await startServer(ROOT);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const errors = [];
  await fs.mkdir(OG, { recursive: true });

  // Scene d'accueil et apercu de partage du site.
  const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desk.on("pageerror", function (error) { errors.push(String(error)); });
  await openApp(desk, base, `lang=fr&preset=${HERO_PRESET}`);
  const hero = await desk.evaluate(function () {
    return window.LiteStudio.renderView("iso", 1600, 1000).toDataURL("image/webp", 0.82).split(",")[1];
  });
  await fs.writeFile(path.join(LANDING, "hero-scene.webp"), Buffer.from(hero, "base64"));
  await fs.writeFile(path.join(OG, "lite-studio.jpg"), await composeOgImage(desk, "Préparez la lumière avant d'allumer le studio."));

  // Mode Mesure, dans chaque langue.
  for (const language of LANGUAGES) {
    await openApp(desk, base, `lang=${language}&preset=${HERO_PRESET}`);
    await desk.click("#measureToggle");
    await desk.waitForTimeout(250);
    const shot = await desk.locator("#stageCanvasWrap").screenshot();
    const box = await desk.locator("#stageCanvasWrap").boundingBox();
    const height = Math.round(1200 * box.height / box.width);
    await fs.writeFile(path.join(LANDING, `measure-${language}.webp`), Buffer.from(await toWebp(desk, shot, 1200, height, 0.8), "base64"));
  }

  // Labo photo (comparaison), en francais.
  await openApp(desk, base, "lang=fr");
  await desk.click('[data-app-mode-target="photo-lab"]');
  await desk.waitForTimeout(400);
  await desk.click('[data-photo-compare="split"]');
  await desk.waitForTimeout(1200);
  const labShot = await desk.locator(".photo-lab-shell").screenshot();
  const labBox = await desk.locator(".photo-lab-shell").boundingBox();
  await fs.writeFile(path.join(LANDING, "labo.webp"), Buffer.from(await toWebp(desk, labShot, 1400, Math.round(1400 * labBox.height / labBox.width), 0.8), "base64"));
  await desk.close();

  // Deux telephones : le plan, puis la bibliotheque ouverte.
  for (const language of LANGUAGES) {
    const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    phone.on("pageerror", function (error) { errors.push(String(error)); });
    await openApp(phone, base, `lang=${language}&preset=boudoir-armchair-lowkey`);
    const planShot = (await phone.screenshot()).toString("base64");
    await phone.click("#libraryToggle");
    await phone.waitForTimeout(500);
    const libraryShot = (await phone.screenshot()).toString("base64");
    const composed = await phone.evaluate(async function (shots) {
      const load = async function (data) {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        return image;
      };
      const images = [await load(shots[0]), await load(shots[1])];
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 988;
      const ctx = canvas.getContext("2d");
      const w = 430;
      const h = Math.round(w * images[0].height / images[0].width);
      [[0, 0], [470, 60]].forEach(function (position, index) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(position[0], position[1], w, Math.min(h, 988 - position[1]), 34);
        ctx.clip();
        ctx.drawImage(images[index], position[0], position[1], w, h);
        ctx.restore();
      });
      return canvas.toDataURL("image/webp", 0.8).split(",")[1];
    }, [planShot, libraryShot]);
    await fs.writeFile(path.join(LANDING, `mobile-${language}.webp`), Buffer.from(composed, "base64"));
    await phone.close();
  }

  await browser.close();
  server.close();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
  console.log("Visuels du site regeneres : hero-scene, og/lite-studio, measure-*, mobile-*, labo.");
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
