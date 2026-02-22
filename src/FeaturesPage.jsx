const VISION_FEATURES = [
  {
    icon: "👁️",
    title: "Describe",
    desc: "Rich, detailed image descriptions covering subjects, colors, composition, mood, and context.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/600px-Sunflower_from_Silesia2.jpg",
    imageAlt: "Sunflower — sample input for Describe mode",
    mock: `A vibrant sunflower in full bloom dominates the frame against a soft blue sky. The golden-yellow petals radiate outward from the dark brown, seed-packed center disc. Individual florets are visible in a mesmerizing Fibonacci spiral pattern. The stem and a few broad, textured green leaves are partially visible. Composition: close-up, slightly off-center. Mood: warm, uplifting, high summer. Dominant tones: golden yellow (#F4C430), deep brown (#3B2F2F), sky blue (#87CEEB).`,
    color: "#818cf8",
  },
  {
    icon: "📝",
    title: "Extract Text",
    desc: "OCR-grade text extraction from photos, screenshots, documents — preserving structure and formatting.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Receipt.jpg/400px-Receipt.jpg",
    imageAlt: "Receipt — sample input for Extract Text mode",
    mock: `INVOICE #2024-0847
━━━━━━━━━━━━━━━━━━
Bill To: Acme Corp
Date: March 15, 2024

│ Item              │ Qty │ Price   │
│ Widget Pro X      │  50 │ $24.99  │
│ Connector Kit     │ 100 │  $3.50  │
│ Mounting Bracket  │  50 │  $7.25  │
━━━━━━━━━━━━━━━━━━
Subtotal:  $2,111.50
Tax (8%):    $168.92
TOTAL:     $2,280.42`,
    color: "#34d399",
  },
  {
    icon: "💻",
    title: "Read Code",
    desc: "Extract code from screenshots with syntax detection, proper formatting, and language identification.",
    mock: `Language: Python 3

def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence."""
    if n <= 0:
        return []
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[:n]

# Usage
print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Python_code_example.png/600px-Python_code_example.png",
    imageAlt: "Python code — sample input for Read Code mode",
    color: "#60a5fa",
  },
  {
    icon: "🔥",
    title: "Roast It",
    desc: "Witty, light-hearted AI roasts for any image. Perfect for laughs and social media engagement.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Golden_Retriever_puppy.jpg/500px-Golden_Retriever_puppy.jpg",
    imageAlt: "Golden retriever puppy — sample input for Roast mode",
    mock: `That cactus on your desk has survived 3 years of your "care" — which really just means benign neglect. It's the only living thing in that room with any backbone. Also, is that a monitor or a portal to 2008? The sticky notes around it look like a cry for help written in hieroglyphics. 🌵`,
    color: "#f472b6",
  },
  {
    icon: "🎨",
    title: "Color Palette",
    desc: "Dominant color analysis with hex codes, harmony type, and mood assessment for designers.",
    mock: `Dominant Colors:
● #2D1B69  Deep Royal Purple    (28%)
● #E8475F  Coral Rose           (22%)
● #F4C542  Saffron Gold         (18%)
● #1A1A2E  Midnight Navy        (16%)
● #F0E6D3  Warm Cream           (10%)
● #4ECDC4  Teal Accent          ( 6%)

Harmony: Split-complementary
Mood: Luxurious, bold, modern
Best for: Premium branding, editorial design`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/600px-Sunflower_from_Silesia2.jpg",
    imageAlt: "Sunflower — sample input for Color Palette mode",
    color: "#c084fc",
  },
  {
    icon: "♿",
    title: "Alt Text",
    desc: "WCAG-compliant alt text generation for accessibility. Screen-reader optimized, concise descriptions.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Golden_Retriever_puppy.jpg/500px-Golden_Retriever_puppy.jpg",
    imageAlt: "Golden retriever puppy — sample input for Alt Text mode",
    mock: `"Golden retriever puppy sitting on autumn leaves in a park, looking up with tongue out, warm sunlight filtering through orange maple trees"

Character count: 128 ✓
Screen reader optimized ✓`,
    color: "#fbbf24",
  },
];

const PEST_FEATURES = [
  {
    icon: "🔬",
    title: "Identify Pest",
    desc: "Scientific-grade species identification with morphological analysis, behavioral profiling, and 5-axis risk scoring.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Cockroach_closeup.jpg/500px-Cockroach_closeup.jpg",
    imageAlt: "Cockroach close-up — sample input for pest identification",
    mock: `PEST IDENTIFICATION REPORT
══════════════════════════

1. SPECIES IDENTIFICATION
   • Common Name: German Cockroach
   • Scientific Name: Blattella germanica
   • Order / Family: Blattodea / Ectobiidae
   • Life Stage: Adult female (with ootheca)
   • Confidence: HIGH — two dark parallel
     stripes on pronotum are diagnostic

2. RISK CLASSIFICATION
   ┌─────────────────────────────────┐
   │ Health Risk:    ▓▓▓▓░  4/5     │
   │ Property Risk:  ▓▓░░░  2/5     │
   │ Food Safety:    ▓▓▓▓▓  5/5     │
   │ Spread Risk:    ▓▓▓▓▓  5/5     │
   └─────────────────────────────────┘

3. URGENCY: 🔴 URGENT
   Female carrying ootheca = 30-40 nymphs
   imminent. Immediate treatment required.`,
    color: "#f87171",
  },
  {
    icon: "📊",
    title: "Infestation Analysis",
    desc: "Evidence-based severity scoring with population dynamics, colony estimation, and spread trajectory prediction.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fire_ants.jpg/500px-Fire_ants.jpg",
    imageAlt: "Fire ants colony — sample input for infestation analysis",
    mock: `INFESTATION SEVERITY REPORT
════════════════════════════

EVIDENCE FOUND:
  ✓ Live specimens — 12+ visible
  ✓ Droppings — heavy concentration
  ✓ Egg cases — 3 oothecae visible
  ✓ Body smears along baseboard

SEVERITY: ██████████ LEVEL 3 - SEVERE

POPULATION ESTIMATE: 500-800 individuals
  (visible count × 10 multiplier for
   nocturnal species)

DURATION: 3-6 months active
SPREAD DIRECTION: Kitchen → Bathroom
GROWTH: Exponential if untreated
  Week 4:  ~1,200
  Week 8:  ~3,000+`,
    color: "#fb923c",
  },
  {
    icon: "🏚️",
    title: "Damage Assessment",
    desc: "Structural integrity scoring, material salvageability analysis, safety hazard flagging, and repair cost classification.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Termite_damage.JPG/500px-Termite_damage.JPG",
    imageAlt: "Termite-damaged wood — sample input for damage assessment",
    mock: `PEST DAMAGE ASSESSMENT
══════════════════════

DAMAGE TYPE: Structural wood — subterranean
termite galleries in floor joist

SEVERITY SCORES:
  Structural Integrity:  ████░░░░░░  4/10
  Safety Hazard:         ████████░░  8/10
  Financial Impact:      ███████░░░  7/10

CAUSAL PEST: Coptotermes formosanus
  (Formosan subterranean termite)
  Status: ACTIVE — fresh mud tubes visible

⚠️ SAFETY FLAG: Load-bearing joist
  compromised. Immediate shoring required.

REPAIR: Total joist replacement needed
COST IMPACT: MAJOR — structural engineer
  inspection required before remediation`,
    color: "#ef4444",
  },
  {
    icon: "💊",
    title: "Treatment Plan",
    desc: "4-tier IPM strategy from cultural controls through chemical intervention, with timeline and monitoring protocols.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg/500px-Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg",
    imageAlt: "Formosan termites — sample input for treatment planning",
    mock: `IPM TREATMENT STRATEGY
══════════════════════

Level 1 — CULTURAL CONTROLS
  • Eliminate moisture under sinks
  • Store food in sealed containers
  • Daily waste removal protocol

Level 2 — PHYSICAL CONTROLS
  • Seal 14 identified entry points
  • Install door sweeps (3 doors)
  • Sticky monitors: 24 placement points

Level 3 — BIOLOGICAL CONTROLS
  • Not applicable for this species

Level 4 — CHEMICAL CONTROLS
  • Gel bait: Advion (Indoxacarb 0.6%)
  • Placement: 47 bait points mapped
  • IGR: Gentrol (Hydroprene)
  • Re-entry interval: 2 hours

TIMELINE:
  Day 1    │ Sanitation + exclusion
  Week 1   │ Bait + IGR application
  Week 2-4 │ Monitor + reapply
  Month 2  │ 85% reduction expected
  Month 3  │ Maintenance phase`,
    color: "#a78bfa",
  },
  {
    icon: "⚕️",
    title: "Health & Safety",
    desc: "Disease vector analysis, allergen profiling, vulnerable population risks, and regulatory compliance checking.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bed_bug%2C_Cimex_lectularius.jpg/500px-Bed_bug%2C_Cimex_lectularius.jpg",
    imageAlt: "Bed bug specimen — sample input for health risk analysis",
    mock: `HEALTH & SAFETY RISK ASSESSMENT
════════════════════════════════

DISEASE TRANSMISSION:
  • Salmonellosis — mechanical vector
  • E. coli — fecal contamination
  • Dysentery — contact with food
  • Allergens — frass, shed skin, saliva

ALLERGENIC RISK: HIGH
  • Cockroach allergen Bla g 1 detected
    in environments with this species
  • Triggers: Asthma (38% of cases),
    rhinitis, dermatitis

⚠️ VULNERABLE POPULATIONS:
  • Children under 5 — elevated asthma risk
  • Immunocompromised — infection risk
  • Food handlers — contamination liability

REGULATORY:
  • Health code violation: YES
  • Food service shutdown risk: IMMEDIATE
  • Documentation required for compliance`,
    color: "#f472b6",
  },
  {
    icon: "🛡️",
    title: "Prevention Audit",
    desc: "Site vulnerability scanning with pest risk matrix, entry point mapping, and priority-ranked prevention protocols.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ants_eating_fruit.jpg/500px-Ants_eating_fruit.jpg",
    imageAlt: "Ants on food — sample input for prevention audit",
    mock: `PREVENTION AUDIT REPORT
═══════════════════════

VULNERABILITY RATING: 7.2 / 10

PEST RISK MATRIX:
  ┌──────────────┬──────┬──────────────┐
  │ Pest Type    │ Risk │ Key Factor   │
  ├──────────────┼──────┼──────────────┤
  │ Rodents      │ HIGH │ Gap under    │
  │              │      │ loading dock │
  │ Cockroaches  │ MED  │ Grease traps │
  │ Ants         │ HIGH │ Landscaping  │
  │ Stored Prod. │ LOW  │ Good storage │
  └──────────────┴──────┴──────────────┘

🔴 CRITICAL (immediately):
  • Seal 3" gap under dock door
  • Fix leaking pipe in break room

🟡 IMPORTANT (within 1 week):
  • Install mesh on 4 floor drains
  • Trim vegetation 18" from walls

🟢 RECOMMENDED (within 1 month):
  • Replace worn door sweeps (2)
  • Add LED fly traps at entries`,
    color: "#22d3ee",
  },
  {
    icon: "📋",
    title: "Full Inspection Report",
    desc: "Complete professional-grade inspection report — from executive summary through treatment plan to follow-up protocols. Client-delivery ready.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Brown_rat.jpg/500px-Brown_rat.jpg",
    imageAlt: "Brown rat — sample input for full inspection report",
    mock: `═══════════════════════════════════════
  PROFESSIONAL PEST INSPECTION REPORT
═══════════════════════════════════════

EXECUTIVE SUMMARY:
  Active German cockroach infestation
  identified in commercial kitchen.
  Severity Level 3 (Severe). Immediate
  IPM intervention required. Estimated
  population 500-800. Multiple life
  stages present indicating established
  breeding colony. Health code compliance
  at risk.

  Overall Risk: ████████░░ HIGH

SECTIONS INCLUDED:
  ✓ B: Species Identification
  ✓ C: Infestation Assessment
  ✓ D: Risk Analysis
  ✓ E: Root Cause Analysis
  ✓ F: Treatment Recommendations
  ✓ G: Prevention Strategy
  ✓ H: Follow-up Requirements

  [Full 2000+ word report generated]`,
    color: "#4ade80",
  },
];

function FeatureCard({ feature, index, side }) {
  const isLeft = side === "left";
  return (
    <div style={{
      display: "flex", flexDirection: isLeft ? "row" : "row-reverse",
      gap: 24, marginBottom: 56, alignItems: "stretch",
      flexWrap: "wrap",
    }}>
      {/* Description + Input Image Side */}
      <div style={{ flex: "1 1 280px", minWidth: 280 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
        }}>
          <span style={{
            fontSize: 32, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
            background: `${feature.color}15`, borderRadius: 12, border: `1px solid ${feature.color}30`,
          }}>{feature.icon}</span>
          <div>
            <h3 style={{
              margin: 0, fontSize: 20, fontWeight: 700, color: "#e8e6e3",
              fontFamily: "'Space Mono', monospace",
            }}>{feature.title}</h3>
          </div>
        </div>
        <p style={{
          color: "#9ca3af", fontSize: 15, lineHeight: 1.7, margin: "0 0 16px",
        }}>{feature.desc}</p>

        {/* Input Image */}
        {feature.image && (
          <div style={{
            borderRadius: 12, overflow: "hidden", border: `1px solid ${feature.color}20`,
            position: "relative", marginBottom: 12,
          }}>
            <div style={{
              position: "absolute", top: 8, left: 8, zIndex: 1,
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
              borderRadius: 6, padding: "3px 10px",
              fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2,
              textTransform: "uppercase", color: feature.color,
            }}>
              Input Image
            </div>
            <img
              src={feature.image}
              alt={feature.imageAlt}
              loading="lazy"
              style={{
                width: "100%", height: 180, objectFit: "cover", display: "block",
                filter: "brightness(0.9)",
              }}
            />
          </div>
        )}

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${feature.color}15`, border: `1px solid ${feature.color}30`,
          borderRadius: 100, padding: "4px 14px", fontSize: 11, color: feature.color,
          fontFamily: "'Space Mono', monospace", letterSpacing: 1,
        }}>
          AI-POWERED
        </div>
      </div>

      {/* Mock Result Side */}
      <div style={{
        flex: "1 1 340px", minWidth: 300,
        background: "rgba(255,255,255,0.02)", border: `1px solid ${feature.color}25`,
        borderRadius: 14, padding: 20, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
        }} />
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: feature.color, marginBottom: 12,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>{feature.icon}</span>
          <span>AI Output</span>
          <span style={{
            marginLeft: "auto", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 100, padding: "2px 8px", fontSize: 9, color: "#4ade80",
          }}>LIVE RESULT</span>
        </div>
        <pre style={{
          color: "#c7d2cd", fontSize: 12, lineHeight: 1.6, margin: 0,
          whiteSpace: "pre-wrap", fontFamily: "'Space Mono', monospace",
          maxHeight: 300, overflow: "hidden",
          maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}>
          {feature.mock}
        </pre>
      </div>
    </div>
  );
}

function StatCard({ number, label, color }) {
  return (
    <div style={{
      flex: "1 1 140px", textAlign: "center", padding: "24px 16px",
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14,
    }}>
      <div style={{
        fontSize: 36, fontWeight: 700, fontFamily: "'Space Mono', monospace",
        background: `linear-gradient(135deg, ${color}, #e8e6e3)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 4,
      }}>{number}</div>
      <div style={{ color: "#6b7280", fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>
        {label}
      </div>
    </div>
  );
}

export default function FeaturesPage({ onTryApp }) {
  return (
    <div>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: 64, paddingTop: 20 }}>
        <h1 style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700,
          background: "linear-gradient(135deg, #e8e6e3 0%, #a5b4fc 40%, #f87171 70%, #fb923c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: "16px 0", lineHeight: 1.1, letterSpacing: -1,
        }}>
          See Everything.<br />Understand Everything.
        </h1>

        <p style={{
          color: "#6b7280", fontSize: 17, maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6,
        }}>
          Two powerful AI vision tools in one platform — general-purpose image intelligence
          and enterprise-grade pest detection & analysis.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onTryApp("vision")} style={{
            padding: "14px 32px", background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
            border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: 1,
            boxShadow: "0 4px 24px rgba(99,102,241,0.3)",
          }}>
            🔮 Try Vision Analyzer
          </button>
          <button onClick={() => onTryApp("pest")} style={{
            padding: "14px 32px", background: "linear-gradient(135deg, #dc2626, #ea580c, #d97706)",
            border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: 1,
            boxShadow: "0 4px 24px rgba(239,68,68,0.3)",
          }}>
            🔬 Try Pest Detect Pro
          </button>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(239,68,68,0.08))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "6px 18px",
        }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3,
            textTransform: "uppercase", color: "#a5b4fc",
          }}>
            Vision API Powered
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 64, flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <StatCard number="13" label="ANALYSIS MODES" color="#818cf8" />
        <StatCard number="4096" label="MAX TOKENS" color="#f87171" />
        <StatCard number="<3s" label="AVG RESPONSE" color="#34d399" />
        <StatCard number="20MB" label="MAX IMAGE" color="#fbbf24" />
      </div>

      {/* Divider */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
          marginBottom: 24,
        }} />
      </div>

      {/* ===== VISION ANALYZER SECTION ===== */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))",
            border: "1px solid rgba(99,102,241,0.25)", borderRadius: 100, padding: "8px 20px",
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 20 }}>🔮</span>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3,
              textTransform: "uppercase", color: "#a5b4fc",
            }}>
              Product One
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700,
            background: "linear-gradient(135deg, #e8e6e3, #a5b4fc, #f0abfc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "12px 0 8px",
          }}>
            Vision Analyzer
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, margin: 0, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            General-purpose AI vision for text extraction, code reading, color analysis, accessibility, and more.
          </p>
        </div>

        {/* How it works */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { step: "1", title: "Upload", desc: "Drag, paste, or browse for any image", icon: "📸" },
            { step: "2", title: "Choose Mode", desc: "Pick from 7 analysis modes", icon: "🎯" },
            { step: "3", title: "Get Results", desc: "Instant AI-powered analysis", icon: "⚡" },
          ].map((s) => (
            <div key={s.step} style={{
              flex: "1 1 200px", maxWidth: 260, textAlign: "center", padding: "28px 20px",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: 14, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace",
              }}>{s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e8e6e3", marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Vision Feature Cards */}
        {VISION_FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>

      {/* ===== DIVIDER ===== */}
      <div style={{ textAlign: "center", margin: "64px 0" }}>
        <div style={{
          height: 1, background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)",
          marginBottom: 32,
        }} />
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 100, padding: "6px 16px", fontSize: 11,
          fontFamily: "'Space Mono', monospace", letterSpacing: 2, color: "#fca5a5",
        }}>
          ENTERPRISE SOLUTION
        </div>
      </div>

      {/* ===== PEST DETECT PRO SECTION ===== */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(251,146,60,0.1))",
            border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "8px 20px",
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 20 }}>🔬</span>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3,
              textTransform: "uppercase", color: "#fca5a5",
            }}>
              Product Two
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700,
            background: "linear-gradient(135deg, #e8e6e3, #fca5a5, #fb923c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "12px 0 8px",
          }}>
            Pest Detect Pro
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, margin: 0, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Enterprise-grade pest intelligence — from field photo to professional inspection report in seconds.
            Built for pest control companies, property managers, and food safety teams.
          </p>
        </div>

        {/* Enterprise Use Cases */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12, marginBottom: 48,
        }}>
          {[
            { icon: "🏭", title: "Pest Control Companies", desc: "Instant field identification, generate client reports on-site" },
            { icon: "🏢", title: "Property Management", desc: "Document infestations, track treatment progress, compliance records" },
            { icon: "🍽️", title: "Food Service / HACCP", desc: "Health code compliance, contamination risk assessment, audit-ready reports" },
            { icon: "🏥", title: "Healthcare Facilities", desc: "Infection control, vulnerable population risk flagging, regulatory documentation" },
          ].map((uc) => (
            <div key={uc.title} style={{
              padding: "20px 18px", background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.12)", borderRadius: 12,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{uc.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fecaca", marginBottom: 4 }}>{uc.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{uc.desc}</div>
            </div>
          ))}
        </div>

        {/* Pest Workflow */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap", justifyContent: "center",
          alignItems: "center",
        }}>
          {[
            { icon: "📸", text: "Snap Photo" },
            { icon: "→", text: "" },
            { icon: "🔬", text: "AI Analyzes" },
            { icon: "→", text: "" },
            { icon: "📋", text: "Get Report" },
            { icon: "→", text: "" },
            { icon: "💊", text: "Treatment Plan" },
            { icon: "→", text: "" },
            { icon: "📥", text: "Export & Share" },
          ].map((s, i) => (
            s.text === "" ? (
              <span key={i} style={{ color: "#4b5563", fontSize: 20, padding: "0 4px" }}>→</span>
            ) : (
              <div key={i} style={{
                textAlign: "center", padding: "14px 16px",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(239,68,68,0.12)",
                borderRadius: 10, minWidth: 90,
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Space Mono', monospace" }}>{s.text}</div>
              </div>
            )
          ))}
        </div>

        {/* Pest Feature Cards */}
        {PEST_FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>

      {/* ===== COMPARISON TABLE ===== */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{
          textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700,
          color: "#e8e6e3", marginBottom: 24,
        }}>
          Platform Capabilities
        </h2>
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <th style={{ padding: "14px 18px", textAlign: "left", color: "#6b7280", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2 }}>FEATURE</th>
                <th style={{ padding: "14px 18px", textAlign: "center", color: "#818cf8", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2 }}>🔮 VISION</th>
                <th style={{ padding: "14px 18px", textAlign: "center", color: "#f87171", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2 }}>🔬 PEST PRO</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Image Upload (drag/paste/browse)", "✓", "✓"],
                ["Mobile Camera Capture", "—", "✓"],
                ["AI-Powered Analysis", "✓", "✓"],
                ["Custom Prompts", "✓", "✓"],
                ["Analysis History", "10 items", "20 items"],
                ["Report Export", "—", "✓"],
                ["Species Identification", "—", "✓"],
                ["Risk Scoring (5-axis)", "—", "✓"],
                ["IPM Treatment Plans", "—", "✓"],
                ["Health & Safety Compliance", "—", "✓"],
                ["Prevention Audits", "—", "✓"],
                ["Professional Reports", "—", "✓"],
                ["Max Response Tokens", "1,000", "4,096"],
                ["Analysis Modes", "7", "8"],
              ].map(([feature, vision, pest], i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 18px", color: "#9ca3af" }}>{feature}</td>
                  <td style={{ padding: "10px 18px", textAlign: "center", color: vision === "✓" ? "#818cf8" : vision === "—" ? "#374151" : "#9ca3af" }}>{vision}</td>
                  <td style={{ padding: "10px 18px", textAlign: "center", color: pest === "✓" ? "#f87171" : pest === "—" ? "#374151" : "#9ca3af" }}>{pest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div style={{
        textAlign: "center", padding: "48px 24px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(239,68,68,0.04))",
        border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 32,
      }}>
        <h2 style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700,
          color: "#e8e6e3", margin: "0 0 12px",
        }}>
          Ready to see what AI can see?
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, margin: "0 0 28px" }}>
          Upload your first image and experience the power of Claude Vision.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onTryApp("vision")} style={{
            padding: "14px 32px", background: "linear-gradient(135deg, #6366f1, #a855f7)",
            border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: 1,
          }}>
            🔮 Launch Vision Analyzer
          </button>
          <button onClick={() => onTryApp("pest")} style={{
            padding: "14px 32px", background: "linear-gradient(135deg, #dc2626, #ea580c)",
            border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: 1,
          }}>
            🔬 Launch Pest Detect Pro
          </button>
        </div>
        <div style={{
          marginTop: 20, padding: "12px 20px",
          background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)",
          borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 14 }}>&#x2699;&#xFE0F;</span>
          <span style={{ color: "#6b7280", fontSize: 12, fontFamily: "'Space Mono', monospace", lineHeight: 1.5 }}>
            Fully customizable platform — integrates with any Vision API
          </span>
        </div>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "#4b5563", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>crafted by</span>
          <a href="https://ai.shaid360.com/" target="_blank" rel="noopener noreferrer"
            style={{
              textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: 12,
              fontWeight: 700, letterSpacing: 2,
              background: "linear-gradient(135deg, #a5b4fc, #f0abfc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
            S.H.A.A.I Solutions
          </a>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </div>
  );
}
