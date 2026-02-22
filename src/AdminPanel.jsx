import { useState, useEffect } from "react";

function StatBox({ label, value, color, sub }) {
  return (
    <div style={{
      flex: "1 1 160px", padding: "20px 16px", textAlign: "center",
      background: "rgba(255,255,255,0.02)", border: `1px solid ${color}20`,
      borderRadius: 14,
    }}>
      <div style={{
        fontSize: 32, fontWeight: 700, fontFamily: "'Space Mono', monospace",
        color, marginBottom: 4,
      }}>{value}</div>
      <div style={{ color: "#6b7280", fontSize: 11, fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>
        {label}
      </div>
      {sub && <div style={{ color: "#4b5563", fontSize: 10, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, color, label }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map((e) => e[1]), 1);
  if (entries.length === 0) return null;

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: 20, flex: "1 1 300px",
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
        textTransform: "uppercase", color, marginBottom: 16,
      }}>{label}</div>
      {entries.slice(0, 10).map(([key, count]) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", marginBottom: 4,
            fontSize: 12, fontFamily: "'Space Mono', monospace",
          }}>
            <span style={{ color: "#9ca3af" }}>{key}</span>
            <span style={{ color }}>{count}</span>
          </div>
          <div style={{
            height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${(count / max) * 100}%`,
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
              borderRadius: 3, transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPanel() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (key) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin?limit=500", {
        headers: { "x-admin-key": key || adminKey },
      });
      if (res.status === 401) {
        setError("Invalid admin key");
        setAuthenticated(false);
        return;
      }
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
        setAuthenticated(true);
      }
    } catch (err) {
      setError("Failed to connect: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearData = async () => {
    if (!confirm("Clear all analytics data? This cannot be undone.")) return;
    try {
      await fetch("/api/admin", {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      fetchData();
    } catch {
      setError("Failed to clear data");
    }
  };

  const exportCSV = () => {
    if (!data?.logs?.length) return;
    const headers = ["Timestamp", "Tab", "Mode", "Country", "City", "Model", "Input Tokens", "Output Tokens", "Status", "IP"];
    const rows = data.logs.map((l) => [
      l.timestamp, l.tab, l.mode, l.country, l.city, l.model,
      l.inputTokens, l.responseTokens, l.status, l.ip,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(adminKey);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(() => fetchData(), 30000);
    return () => clearInterval(interval);
  }, [authenticated, adminKey]);

  if (!authenticated) {
    return (
      <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#x1F512;</div>
        <h2 style={{
          fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700,
          color: "#e8e6e3", marginBottom: 8,
        }}>Admin Panel</h2>
        <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>
          Enter admin key to access analytics dashboard
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin key..."
            style={{
              width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
              color: "#e8e6e3", fontSize: 14, fontFamily: "'Space Mono', monospace",
              outline: "none", marginBottom: 12, boxSizing: "border-box",
            }}
          />
          <button type="submit" disabled={!adminKey || loading} style={{
            width: "100%", padding: "14px 24px",
            background: adminKey ? "linear-gradient(135deg, #6366f1, #a855f7)" : "rgba(255,255,255,0.05)",
            border: "none", borderRadius: 12, color: adminKey ? "#fff" : "#4b5563",
            fontSize: 14, fontWeight: 700, cursor: adminKey ? "pointer" : "not-allowed",
            fontFamily: "'Space Mono', monospace",
          }}>
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
        {error && (
          <div style={{
            marginTop: 16, padding: "10px 14px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8,
            color: "#fca5a5", fontSize: 13,
          }}>{error}</div>
        )}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700,
            background: "linear-gradient(135deg, #e8e6e3, #a5b4fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: 0,
          }}>Analytics Dashboard</h2>
          <p style={{ color: "#4b5563", fontSize: 11, fontFamily: "'Space Mono', monospace", margin: "4px 0 0" }}>
            Auto-refreshes every 30s
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => fetchData()} style={{
            padding: "8px 16px", background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8,
            color: "#a5b4fc", fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}>Refresh</button>
          <button onClick={exportCSV} style={{
            padding: "8px 16px", background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.3)", borderRadius: 8,
            color: "#4ade80", fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}>Export CSV</button>
          <button onClick={clearData} style={{
            padding: "8px 16px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8,
            color: "#f87171", fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}>Clear All</button>
          <button onClick={() => { setAuthenticated(false); setData(null); setAdminKey(""); }} style={{
            padding: "8px 16px", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            color: "#6b7280", fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}>Logout</button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: "10px 14px", background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8,
          color: "#fca5a5", fontSize: 13, marginBottom: 16,
        }}>{error}</div>
      )}

      {/* Stats Overview */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatBox label="TOTAL ANALYSES" value={data.total} color="#818cf8" />
        <StatBox label="INPUT TOKENS" value={data.totalInputTokens.toLocaleString()} color="#34d399" />
        <StatBox label="OUTPUT TOKENS" value={data.totalOutputTokens.toLocaleString()} color="#fbbf24" />
        <StatBox
          label="COUNTRIES"
          value={Object.keys(data.byCountry).filter((c) => c !== "unknown").length}
          color="#f472b6"
        />
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <BarChart data={data.byTab} color="#818cf8" label="By Product" />
        <BarChart data={data.byMode} color="#f87171" label="By Mode" />
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <BarChart data={data.byCountry} color="#34d399" label="By Country" />
        <BarChart data={data.byDay} color="#fbbf24" label="By Day" />
      </div>

      {/* Recent Activity Log */}
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14, overflow: "hidden",
      }}>
        <div style={{
          padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
          textTransform: "uppercase", color: "#818cf8",
        }}>
          Recent Activity ({data.logs.length} entries)
        </div>
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Time", "Tab", "Mode", "Country", "Tokens", "Status"].map((h) => (
                  <th key={h} style={{
                    padding: "10px 14px", textAlign: "left", color: "#6b7280",
                    fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1,
                    position: "sticky", top: 0, background: "#0a0a0f",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.logs.slice(0, 100).map((log, i) => {
                const time = log.timestamp ? new Date(log.timestamp) : null;
                const timeStr = time ? time.toLocaleString([], {
                  month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                }) : "—";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td style={{ padding: "8px 14px", color: "#6b7280" }}>{timeStr}</td>
                    <td style={{ padding: "8px 14px" }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 6, fontSize: 10,
                        background: log.tab === "pest" ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)",
                        color: log.tab === "pest" ? "#fca5a5" : "#a5b4fc",
                        fontFamily: "'Space Mono', monospace",
                      }}>{log.tab}</span>
                    </td>
                    <td style={{ padding: "8px 14px", color: "#9ca3af" }}>{log.mode}</td>
                    <td style={{ padding: "8px 14px", color: "#9ca3af" }}>{log.country}</td>
                    <td style={{ padding: "8px 14px", color: "#6b7280", fontFamily: "'Space Mono', monospace" }}>
                      {(log.inputTokens || 0) + (log.responseTokens || 0)}
                    </td>
                    <td style={{ padding: "8px 14px" }}>
                      <span style={{
                        color: log.status === 200 ? "#4ade80" : "#f87171", fontSize: 11,
                      }}>{log.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
