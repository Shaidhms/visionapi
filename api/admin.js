import Redis from "ioredis";

let redis;
function getRedis() {
  if (!redis) {
    const url = process.env.REDIS_URL;
    if (url) {
      redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
    }
  }
  return redis;
}

export default async function handler(req, res) {
  // Simple password protection
  const adminKey = process.env.ADMIN_KEY || "shaai2024";
  const authHeader = req.headers["x-admin-key"];

  if (authHeader !== adminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const r = getRedis();
  if (!r) {
    return res.status(500).json({ error: "Redis not configured" });
  }

  try {
    await r.connect().catch(() => {});

    if (req.method === "GET") {
      const limit = parseInt(req.query?.limit) || 100;
      const raw = await r.lrange("analytics", 0, limit - 1);
      const logs = raw.map((entry) => {
        try { return JSON.parse(entry); } catch { return null; }
      }).filter(Boolean);

      // Compute summary stats
      const total = logs.length;
      const byTab = {};
      const byMode = {};
      const byCountry = {};
      const byDay = {};
      let totalInputTokens = 0;
      let totalOutputTokens = 0;

      for (const log of logs) {
        byTab[log.tab] = (byTab[log.tab] || 0) + 1;
        byMode[log.mode] = (byMode[log.mode] || 0) + 1;
        byCountry[log.country] = (byCountry[log.country] || 0) + 1;
        totalInputTokens += log.inputTokens || 0;
        totalOutputTokens += log.responseTokens || 0;

        const day = log.timestamp?.split("T")[0] || "unknown";
        byDay[day] = (byDay[day] || 0) + 1;
      }

      return res.status(200).json({
        total,
        totalInputTokens,
        totalOutputTokens,
        byTab,
        byMode,
        byCountry,
        byDay,
        logs,
      });
    }

    if (req.method === "DELETE") {
      await r.del("analytics");
      return res.status(200).json({ message: "Analytics cleared" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: "Redis error: " + err.message });
  }
}
