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

async function logAnalytics(req, body, status, responseData) {
  try {
    const r = getRedis();
    if (!r) return;
    await r.connect().catch(() => {});

    const entry = {
      timestamp: new Date().toISOString(),
      mode: body._mode || "unknown",
      tab: body._tab || "unknown",
      model: body.model || "unknown",
      maxTokens: body.max_tokens || 0,
      status,
      responseTokens: responseData?.usage?.output_tokens || 0,
      inputTokens: responseData?.usage?.input_tokens || 0,
      ip: req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown",
      country: req.headers["x-vercel-ip-country"] || "unknown",
      city: req.headers["x-vercel-ip-city"] || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
    };

    await r.lpush("analytics", JSON.stringify(entry));
    await r.ltrim("analytics", 0, 999);
  } catch {
    // silently fail — analytics should never break the main flow
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: "API key not configured" } });
  }

  try {
    const { model, max_tokens, messages, _mode, _tab } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens, messages }),
    });

    const data = await response.json();

    // Log analytics in the background (don't await to avoid slowing response)
    logAnalytics(req, { _mode, _tab, model, max_tokens }, response.status, data);

    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: "Server error: " + err.message } });
  }
}
