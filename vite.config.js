import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env and .env.local manually for the dev API proxy
function loadEnv() {
  const vars = {};
  for (const file of [".env", ".env.local"]) {
    try {
      const content = readFileSync(resolve(process.cwd(), file), "utf-8");
      for (const line of content.split("\n")) {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const val = match[2].trim().replace(/^["']|["']$/g, "");
          if (key) vars[key] = val;
        }
      }
    } catch {}
  }
  return vars;
}

let redisClient;
async function getRedis(env) {
  if (redisClient) return redisClient;
  if (!env.REDIS_URL) return null;
  try {
    const { default: Redis } = await import("ioredis");
    redisClient = new Redis(env.REDIS_URL, { maxRetriesPerRequest: 1 });
    return redisClient;
  } catch {
    return null;
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "api-proxy",
      configureServer(server) {
        // Admin endpoint
        server.middlewares.use("/api/admin", async (req, res) => {
          const env = loadEnv();
          const adminKey = env.ADMIN_KEY || "shaai2024";
          if (req.headers["x-admin-key"] !== adminKey) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
          }

          const redis = await getRedis(env);
          if (!redis) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Redis not configured" }));
            return;
          }

          try {
            if (req.method === "DELETE") {
              await redis.del("analytics");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ message: "Analytics cleared" }));
              return;
            }

            const url = new URL(req.url, "http://localhost");
            const limit = parseInt(url.searchParams.get("limit")) || 100;
            const raw = await redis.lrange("analytics", 0, limit - 1);
            const logs = raw.map((e) => { try { return JSON.parse(e); } catch { return null; } }).filter(Boolean);

            const total = logs.length;
            const byTab = {}, byMode = {}, byCountry = {}, byDay = {};
            let totalInputTokens = 0, totalOutputTokens = 0;

            for (const log of logs) {
              byTab[log.tab] = (byTab[log.tab] || 0) + 1;
              byMode[log.mode] = (byMode[log.mode] || 0) + 1;
              byCountry[log.country] = (byCountry[log.country] || 0) + 1;
              totalInputTokens += log.inputTokens || 0;
              totalOutputTokens += log.responseTokens || 0;
              const day = log.timestamp?.split("T")[0] || "unknown";
              byDay[day] = (byDay[day] || 0) + 1;
            }

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ total, totalInputTokens, totalOutputTokens, byTab, byMode, byCountry, byDay, logs }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Redis error: " + err.message }));
          }
        });

        // Analyze endpoint
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
              const parsed = JSON.parse(body);
              const { model, max_tokens, messages, _mode, _tab } = parsed;
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
              const dataJson = JSON.parse(data);

              // Log to Redis
              try {
                const redis = await getRedis(env);
                if (redis) {
                  const entry = {
                    timestamp: new Date().toISOString(),
                    mode: _mode || "unknown",
                    tab: _tab || "unknown",
                    model: model || "unknown",
                    maxTokens: max_tokens || 0,
                    status: response.status,
                    responseTokens: dataJson?.usage?.output_tokens || 0,
                    inputTokens: dataJson?.usage?.input_tokens || 0,
                    ip: req.headers["x-forwarded-for"] || "localhost",
                    country: "local",
                    city: "local",
                    userAgent: req.headers["user-agent"] || "unknown",
                  };
                  await redis.lpush("analytics", JSON.stringify(entry));
                  await redis.ltrim("analytics", 0, 999);
                }
              } catch {}

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
