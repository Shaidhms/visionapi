import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env manually for the dev API proxy
function loadEnv() {
  try {
    const env = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
    const vars = {};
    for (const line of env.split("\n")) {
      const [key, ...val] = line.split("=");
      if (key && val.length) vars[key.trim()] = val.join("=").trim();
    }
    return vars;
  } catch {
    return {};
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "api-proxy",
      configureServer(server) {
        server.middlewares.use("/api/analyze", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          const env = loadEnv();
          const apiKey = env.ANTHROPIC_API_KEY;
          if (!apiKey || apiKey === "your_api_key_here") {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: { message: "Add your ANTHROPIC_API_KEY to .env file" } }));
            return;
          }

          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { model, max_tokens, messages } = JSON.parse(body);
              const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": apiKey,
                  "anthropic-version": "2023-06-01",
                },
                body: JSON.stringify({ model, max_tokens, messages }),
              });
              const data = await response.text();
              res.statusCode = response.status;
              res.setHeader("Content-Type", "application/json");
              res.end(data);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: { message: "Server error: " + err.message } }));
            }
          });
        });
      },
    },
  ],
});
