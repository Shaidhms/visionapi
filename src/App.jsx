import { useState, useRef, useCallback } from "react";

const ANALYSIS_MODES = [
  { id: "describe", label: "Describe", icon: "👁️", prompt: "Describe this image in rich detail. What do you see? Cover the main subjects, colors, composition, mood, and any notable details." },
  { id: "extract", label: "Extract Text", icon: "📝", prompt: "Extract ALL text visible in this image. Format it cleanly and preserve the structure as much as possible. If there's no text, say so." },
  { id: "code", label: "Read Code", icon: "💻", prompt: "If this image contains code, extract it accurately with proper formatting. Identify the programming language. If it's not code, describe what you see instead." },
  { id: "roast", label: "Roast It", icon: "🔥", prompt: "Give a funny, witty roast of this image. Be creative and humorous but keep it light-hearted. Max 3-4 sentences." },
  { id: "alt", label: "Alt Text", icon: "♿", prompt: "Generate a concise, descriptive alt text for this image suitable for screen readers. Keep it under 125 characters if possible, otherwise keep it brief." },
  { id: "colors", label: "Color Palette", icon: "🎨", prompt: "Analyze the dominant colors in this image. List the top 5-6 colors with their approximate hex codes. Describe the overall color mood/harmony." },
  { id: "custom", label: "Custom", icon: "✨", prompt: "" },
];

export default function VisionApp() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMode, setSelectedMode] = useState("describe");
  const [customPrompt, setCustomPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, GIF, WebP)");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Image must be under 20MB");
      return;
    }
    setError("");
    setResult("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(",")[1];
      setImage({ base64, mediaType: file.type });
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        handleFile(item.getAsFile());
        return;
      }
    }
  }, [handleFile]);

  const analyzeImage = async () => {
    if (!image) {
      setError("Upload an image first!");
      return;
    }
    const mode = ANALYSIS_MODES.find((m) => m.id === selectedMode);
    const prompt = selectedMode === "custom" ? customPrompt : mode.prompt;
    if (!prompt.trim()) {
      setError("Enter a custom prompt first!");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: image.mediaType,
                    data: image.base64,
                  },
                },
                { type: "text", text: prompt },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error.message || "API error occurred");
      } else {
        const text = data.content?.map((c) => c.text || "").join("\n") || "No response";
        setResult(text);
        setHistory((prev) => [
          { mode: mode.label, prompt, result: text, timestamp: new Date(), preview: imagePreview },
          ...prev.slice(0, 9),
        ]);
      }
    } catch (err) {
      setError("Failed to connect to API: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImage(null);
    setImagePreview(null);
    setResult("");
    setError("");
    setCustomPrompt("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e8e6e3",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
      onPaste={handlePaste}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(236,72,153,0.06) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))",
            border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "8px 20px",
          }}>
            <span style={{ fontSize: 22 }}>🔮</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#a5b4fc" }}>
              Powered by Claude Vision
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700,
            background: "linear-gradient(135deg, #e8e6e3 0%, #a5b4fc 50%, #f0abfc 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "12px 0 8px", lineHeight: 1.1,
          }}>
            Vision Analyzer
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
            Drop an image • Pick a mode • Get instant AI analysis
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#818cf8" : imagePreview ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 16, padding: imagePreview ? 0 : 48, textAlign: "center",
            cursor: imagePreview ? "default" : "pointer", transition: "all 0.3s ease",
            background: dragOver ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
            position: "relative", overflow: "hidden", marginBottom: 24, minHeight: imagePreview ? "auto" : 180,
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
          }}
        >
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])} />

          {imagePreview ? (
            <div style={{ position: "relative", width: "100%" }}>
              <img src={imagePreview} alt="Preview" style={{
                width: "100%", maxHeight: 400, objectFit: "contain", display: "block",
                borderRadius: 14,
              }} />
              <button onClick={(e) => { e.stopPropagation(); clearAll(); }} style={{
                position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e8e6e3",
                padding: "6px 14px", cursor: "pointer", fontSize: 13, backdropFilter: "blur(8px)",
              }}>
                ✕ Remove
              </button>
              <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} style={{
                position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e8e6e3",
                padding: "6px 14px", cursor: "pointer", fontSize: 13, backdropFilter: "blur(8px)",
              }}>
                🔄 Replace
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.6 }}>📸</div>
              <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 6px" }}>
                Drag & drop an image here, or click to browse
              </p>
              <p style={{ color: "#4b5563", fontSize: 12, margin: 0 }}>
                You can also <strong style={{ color: "#818cf8" }}>paste</strong> from clipboard • PNG, JPG, GIF, WebP up to 20MB
              </p>
            </>
          )}
        </div>

        {/* Mode Selector */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
          }}>
            {ANALYSIS_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                style={{
                  background: selectedMode === mode.id
                    ? "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(236,72,153,0.15))"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedMode === mode.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 10, padding: "10px 16px", cursor: "pointer",
                  color: selectedMode === mode.id ? "#c7d2fe" : "#9ca3af",
                  fontSize: 13, fontWeight: 500, transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span>{mode.icon}</span> {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        {selectedMode === "custom" && (
          <div style={{ marginBottom: 24 }}>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask anything about the image... e.g., 'What brand logos are visible?' or 'Estimate the calories in this meal'"
              style={{
                width: "100%", minHeight: 80, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16,
                color: "#e8e6e3", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={analyzeImage}
          disabled={loading || !image}
          style={{
            width: "100%", padding: "16px 24px",
            background: loading ? "rgba(99,102,241,0.2)" : !image ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
            border: "none", borderRadius: 12, color: !image ? "#4b5563" : "#fff",
            fontSize: 16, fontWeight: 700, cursor: loading || !image ? "not-allowed" : "pointer",
            fontFamily: "'Space Mono', monospace", letterSpacing: 1,
            transition: "all 0.3s ease", marginBottom: 24,
            boxShadow: image && !loading ? "0 4px 24px rgba(99,102,241,0.3)" : "none",
          }}
        >
          {loading ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Analyzing...
            </span>
          ) : "⚡ Analyze Image"}
        </button>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 12, padding: "14px 18px", marginBottom: 24, color: "#fca5a5", fontSize: 14,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 16, padding: 24, marginBottom: 24, position: "relative",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase", color: "#818cf8",
              }}>
                {ANALYSIS_MODES.find((m) => m.id === selectedMode)?.icon} Analysis Result
              </span>
              <button onClick={() => navigator.clipboard?.writeText(result)} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "4px 12px", color: "#9ca3af", cursor: "pointer", fontSize: 12,
              }}>
                📋 Copy
              </button>
            </div>
            <div style={{
              color: "#d1d5db", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {result}
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase", color: "#6b7280",
              }}>
                📜 Recent Analyses
              </span>
              <button onClick={() => setHistory([])} style={{
                background: "none", border: "none", color: "#4b5563", cursor: "pointer", fontSize: 12,
              }}>
                Clear
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setResult(item.result)}
                  style={{
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10, padding: "12px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  {item.preview && (
                    <img src={item.preview} alt="" style={{
                      width: 40, height: 40, borderRadius: 6, objectFit: "cover",
                    }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#c7d2fe" }}>{item.mode}</div>
                    <div style={{
                      fontSize: 12, color: "#6b7280", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {item.result.substring(0, 80)}...
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", whiteSpace: "nowrap" }}>
                    {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 48, paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p style={{ color: "#374151", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
            Built with Claude Vision API • Images are sent to Anthropic for analysis
          </p>
        </div>
      </div>
    </div>
  );
}
