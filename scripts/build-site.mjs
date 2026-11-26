// Prépare le dossier « a-mettre-en-ligne » : uniquement ce qui doit être envoyé sur l'hébergement.
// Usage : npm run build:site   (puis copier le contenu du dossier sur lumierestudio.archi-it.fr)
//
// Le code, les scripts, les tests, la doc et les fichiers de travail restent à côté, dans le dépôt.
// Le script vérifie ensuite que chaque fichier appelé par une page existe bien dans le dossier.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "a-mettre-en-ligne");

// Fichiers et dossiers publics. Tout le reste (scripts/, tests/, docs/ hors captures, README, package.json…) reste hors ligne.
const PUBLIC = [
  "*.html",
  "manifest.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "en", "es", "de", "ar",
  "presets",
  "css",
  "fonts",
  "assets",
  "js",
  "docs/screenshots"
];

// Dans js/, les textes des pages servent seulement à générer le HTML (npm run build:locales).
const EXCLUDED = [/^js\/site-copy/, /^js\/site-i18n\.js$/, /\.bak$/, /(^|\/)\.DS_Store$/, /(^|\/)Thumbs\.db$/];

function excluded(relative) {
  return EXCLUDED.some(function (pattern) { return pattern.test(relative.split(path.sep).join("/")); });
}

async function copy(relative) {
  const source = path.join(ROOT, relative);
  const stat = await fs.stat(source);
  if (stat.isDirectory()) {
    for (const entry of await fs.readdir(source)) await copy(path.join(relative, entry));
    return;
  }
  if (excluded(relative)) return;
  const target = path.join(OUT, relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function listFiles(dir, base = dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(full, base));
    else files.push(path.relative(base, full));
  }
  return files;
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });
  for (const item of PUBLIC) {
    if (item === "*.html") {
      for (const entry of await fs.readdir(ROOT)) if (entry.endsWith(".html")) await copy(entry);
    } else {
      await copy(item);
    }
  }

  // Vérification : chaque ressource locale citée par une page ou un module doit être présente.
  const files = await listFiles(OUT);
  const present = new Set(files.map(function (file) { return file.split(path.sep).join("/"); }));
  const missing = new Set();
  for (const file of files.filter(function (f) { return /\.(html|mjs|css)$/.test(f); })) {
    const text = await fs.readFile(path.join(OUT, file), "utf8");
    const pattern = /(?:src|href)="([^"]+)"|url\(["']?([^"')]+)["']?\)|from "(\.[^"]+)"/g;
    let match;
    while ((match = pattern.exec(text))) {
      const ref = (match[1] || match[2] || match[3]).split(/[?#]/)[0];
      if (!ref || /^(https?:|mailto:|data:|javascript:|\/\/)/.test(ref)) continue;
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file.split(path.sep).join("/")), ref));
      const candidates = [resolved, resolved.replace(/\/$/, "") + "/index.html"];
      if (!candidates.some(function (c) { return present.has(c); })) missing.add(`${file} → ${ref}`);
    }
  }
  const size = (await Promise.all(files.map(async function (f) { return (await fs.stat(path.join(OUT, f))).size; }))).reduce(function (a, b) { return a + b; }, 0);
  console.log(`a-mettre-en-ligne : ${files.length} fichiers, ${(size / 1048576).toFixed(1)} Mo.`);
  if (missing.size) {
    console.error(`Ressources introuvables (${missing.size}) :\n` + [...missing].slice(0, 40).join("\n"));
    process.exitCode = 1;
  }
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
