// Outils partages par les scripts qui photographient l'application (Playwright).
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json"
};

export function startServer(root) {
  const server = http.createServer(async function (request, response) {
    const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);
    if (!filePath.startsWith(root)) {
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

// Apercu 1200 x 630 pour les messageries : la scene 3D en cours, la marque en bas a gauche
// et, si fourni, une ligne de texte. La page doit etre l'application avec la scene chargee.
export async function composeOgImage(page, caption) {
  const data = await page.evaluate(async function (text) {
    const width = 1200;
    const height = 630;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0e0d0c";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(window.LiteStudio.renderView("iso", width, height), 0, 0);
    await document.fonts.ready;
    const pillHeight = 64;
    const x = 36;
    const y = height - pillHeight - 32;
    ctx.font = "700 28px 'Bricolage Grotesque', 'Inter', sans-serif";
    const brandWidth = ctx.measureText("LITE Studio").width;
    let captionWidth = 0;
    if (text) {
      ctx.font = "500 22px 'Inter', sans-serif";
      captionWidth = ctx.measureText(text).width + 32;
    }
    const pillWidth = 32 + 30 + 14 + brandWidth + captionWidth + 28;
    ctx.fillStyle = "rgba(14, 13, 12, 0.88)";
    ctx.beginPath();
    ctx.roundRect(x, y, pillWidth, pillHeight, pillHeight / 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(242, 166, 90, 0.45)";
    ctx.lineWidth = 2;
    ctx.stroke();
    const cx = x + 32 + 15;
    const cy = y + pillHeight / 2;
    ctx.strokeStyle = "#f2a65a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f2a65a";
    ctx.beginPath();
    ctx.moveTo(cx, cy - 13);
    ctx.lineTo(cx + 13, cy);
    ctx.lineTo(cx, cy + 13);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#f3eee7";
    ctx.textBaseline = "middle";
    ctx.font = "700 28px 'Bricolage Grotesque', 'Inter', sans-serif";
    ctx.fillText("LITE Studio", cx + 15 + 14, cy + 1);
    if (text) {
      ctx.fillStyle = "#bdb4a8";
      ctx.font = "500 22px 'Inter', sans-serif";
      ctx.fillText(text, cx + 15 + 14 + brandWidth + 24, cy + 1);
    }
    return canvas.toDataURL("image/jpeg", 0.84).split(",")[1];
  }, caption || "");
  return Buffer.from(data, "base64");
}
