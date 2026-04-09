import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Use PORT from environment ONLY in user's Cloud Run, otherwise default to 3000 (AI Studio)
  const isAIStudio = process.env.K_SERVICE && process.env.K_SERVICE.startsWith('ais-');
  const PORT = !isAIStudio && process.env.PORT ? Number(process.env.PORT) : 3000;
  console.log(`Starting server. isAIStudio: ${isAIStudio}, PORT: ${PORT}`);

  // Health check for Cloud Run
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use(express.json());

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      // SPA fallback: serve Vite-transformed index.html for all unmatched routes
      app.use(async (req, res, next) => {
        try {
          const template = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
          const html = await vite.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
      console.log("Vite middleware enabled");
    } catch (e) {
      console.warn("Vite not found, falling back to static serving");
      app.use(express.static(path.join(__dirname, "dist")));
      app.use((req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
      });
    }
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.use((req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
