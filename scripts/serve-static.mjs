import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = process.cwd();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4177);

// Serveur statique minimal : necessaire pour le Labo photo (modules JavaScript),
// que les navigateurs refusent de charger depuis un fichier ouvert par double-clic.
//   npm run serve   puis   http://127.0.0.1:4177/app.html

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${HOST}:${PORT}`).pathname);
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const target = path.resolve(ROOT, `.${cleanPath}`);
  if (!target.startsWith(ROOT)) return null;
  return target;
}

const server = createServer(async (request, response) => {
  const target = resolveRequestPath(request.url || "/");
  if (!target) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(target);
    if (!stat.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": MIME_TYPES[path.extname(target).toLowerCase()] || "application/octet-stream"
    });
    createReadStream(target).pipe(response);
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Serving ${ROOT} at http://${HOST}:${PORT}/`);
});
