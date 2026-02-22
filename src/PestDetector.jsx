import { useState, useRef, useCallback } from "react";

const PEST_MODES = [
  {
    id: "identify",
    label: "Identify Pest",
    icon: "🔬",
    prompt: `You are a senior entomologist and certified pest management professional (CMP) with 20+ years of field experience. Analyze this image with scientific rigor.

PEST IDENTIFICATION REPORT
══════════════════════════

1. SPECIES IDENTIFICATION
   • Common Name:
   • Scientific Name (binomial):
   • Order / Family:
   • Life Stage Observed: (egg / larva / nymph / pupa / adult)
   • Confidence Level: (High / Medium / Low) — explain why

2. MORPHOLOGICAL ANALYSIS
   • Key identifying features observed (antennae, wings, legs, color patterns, body segments)
   • Estimated specimen size
   • Distinguishing marks from similar species
   • Sexual dimorphism indicators if visible

3. BEHAVIORAL PROFILE
   • Activity pattern: (diurnal / nocturnal / crepuscular)
   • Social structure: (solitary / colonial / gregarious)
   • Flight capability
   • Typical harborage and nesting preferences
   • Reproduction rate and lifecycle duration
   • Seasonal activity peaks

4. RISK CLASSIFICATION
   ┌─────────────────────────────────────┐
   │ Health Risk:    ▓▓▓░░ [rate 1-5]    │
   │ Property Risk:  ▓▓░░░ [rate 1-5]    │
   │ Food Safety:    ▓░░░░ [rate 1-5]    │
   │ Spread Risk:    ▓▓▓▓░ [rate 1-5]    │
   └─────────────────────────────────────┘
   • Diseases / pathogens vectored
   • Allergen risk (frass, shed skin, saliva)
   • Structural damage potential
   • Contamination pathways

5. URGENCY LEVEL: [ROUTINE / PROMPT / URGENT / EMERGENCY]
   • Immediate action required: Yes/No
   • Brief recommended next step

If NO pest is detected, state clearly and instead analyze the environment for conditions that could attract or harbor pests (moisture, cracks, food sources, clutter).`,
  },
  {
    id: "infestation",
    label: "Infestation Analysis",
    icon: "📊",
    prompt: `You are a certified pest control inspector performing a detailed infestation assessment. Analyze this image thoroughly.

INFESTATION SEVERITY REPORT
════════════════════════════

1. EVIDENCE CLASSIFICATION
   What type of evidence is visible:
   □ Live specimens — count estimate
   □ Dead specimens — freshness assessment
   □ Droppings / frass — quantity and distribution pattern
   □ Shed skins / exuviae — number of molts
   □ Egg cases / oothecae — count and viability
   □ Nesting material — size and maturity of nest
   □ Damage marks — gnaw marks, bore holes, trails
   □ Body smears / track marks
   □ Webbing / silk
   □ Odor indicators (describe if relevant)

2. INFESTATION SEVERITY SCALE
   ╔══════════════════════════════════════════╗
   ║  □ Level 1 - EARLY     (isolated signs)  ║
   ║  □ Level 2 - MODERATE  (multiple signs)   ║
   ║  □ Level 3 - SEVERE    (widespread)       ║
   ║  □ Level 4 - CRITICAL  (structural risk)  ║
   ╚══════════════════════════════════════════╝
   Justification for rating:

3. SPREAD ASSESSMENT
   • Estimated area affected
   • Colony size estimate (if applicable)
   • Duration estimate (how long has this been active)
   • Direction of spread
   • Multiple species present: Yes/No

4. ENTRY POINT ANALYSIS
   • Likely entry points visible in image
   • Harborage locations identified
   • Environmental conducive conditions:
     - Moisture sources
     - Food sources
     - Shelter/clutter
     - Temperature conditions
     - Structural gaps/cracks

5. POPULATION DYNAMICS
   • Breeding potential in current conditions
   • Expected population growth trajectory if untreated
   • Peak activity prediction

6. PRIORITY RATING: [LOW / MEDIUM / HIGH / CRITICAL]
   • Time-to-action recommendation`,
  },
  {
    id: "damage",
    label: "Damage Assessment",
    icon: "🏚️",
    prompt: `You are a structural pest damage assessor and building inspector. Analyze this image for pest-related damage.

PEST DAMAGE ASSESSMENT REPORT
══════════════════════════════

1. DAMAGE IDENTIFICATION
   • Type of damage observed:
     □ Structural wood damage (beams, joists, framing)
     □ Surface wood damage (furniture, trim, flooring)
     □ Fabric / textile damage
     □ Paper / book / document damage
     □ Electrical wiring damage (FIRE RISK FLAG)
     □ Insulation damage
     □ Food product contamination
     □ Plumbing / pipe damage
     □ Drywall / plaster damage
     □ Garden / landscape damage

2. DAMAGE SEVERITY
   ┌──────────────────────────────────────────┐
   │ Structural Integrity:  [rate 1-10]       │
   │ Cosmetic Damage:       [rate 1-10]       │
   │ Safety Hazard:         [rate 1-10]       │
   │ Financial Impact:      [rate 1-10]       │
   └──────────────────────────────────────────┘

3. CAUSAL PEST ANALYSIS
   • Most likely pest causing this damage
   • Evidence supporting pest identification
   • Active vs. old/inactive damage assessment
   • Duration estimate of damage progression

4. AFFECTED MATERIALS
   • Material types damaged
   • Depth of penetration
   • Salvageability assessment:
     - Repairable
     - Requires partial replacement
     - Total replacement needed

5. SAFETY CONCERNS
   ⚠️ Flag any immediate safety hazards:
   • Structural collapse risk
   • Electrical fire risk (gnawed wiring)
   • Water damage / mold risk
   • Health hazards from contamination

6. COST IMPACT ESTIMATE
   • Damage classification: Minor / Moderate / Major / Severe
   • Repair urgency: Routine / Soon / Immediate
   • Areas requiring professional structural inspection

7. DOCUMENTATION NOTES
   • Recommended follow-up photos needed
   • Areas to investigate further
   • Insurance claim relevance`,
  },
  {
    id: "treatment",
    label: "Treatment Plan",
    icon: "💊",
    prompt: `You are an Integrated Pest Management (IPM) specialist and licensed pest control operator. Based on this image, create a comprehensive treatment plan.

INTEGRATED PEST MANAGEMENT PLAN
════════════════════════════════

1. PEST IDENTIFIED (from image)
   • Species:
   • Life stage:
   • Infestation level:

2. IMMEDIATE ACTIONS (within 24 hours)
   • Safety precautions for occupants
   • Containment measures
   • Sanitation requirements
   • Emergency steps if health risk is high

3. IPM TREATMENT STRATEGY

   Level 1 — CULTURAL CONTROLS
   • Sanitation improvements
   • Moisture elimination
   • Food source removal
   • Clutter reduction
   • Waste management changes

   Level 2 — PHYSICAL / MECHANICAL CONTROLS
   • Exclusion methods (sealing, caulking, screening)
   • Trapping recommendations (type, placement, quantity)
   • Physical removal methods
   • Habitat modification
   • Temperature treatments (heat/cold)

   Level 3 — BIOLOGICAL CONTROLS
   • Natural predators applicable
   • Biological agents (Bt, nematodes, etc.)
   • Pheromone-based solutions

   Level 4 — CHEMICAL CONTROLS (last resort)
   • Recommended active ingredients
   • Application method: (bait / spray / dust / gel / fumigation)
   • Target areas for application
   • Safety precautions and PPE required
   • Re-entry interval
   • Environmental precautions
   • Pet and child safety notes

4. TREATMENT TIMELINE
   ┌─────────────┬──────────────────────────┐
   │ Day 1       │ [immediate actions]      │
   │ Week 1      │ [initial treatment]      │
   │ Week 2-4    │ [follow-up treatment]    │
   │ Month 2-3   │ [monitoring phase]       │
   │ Ongoing     │ [prevention protocol]    │
   └─────────────┴──────────────────────────┘

5. MONITORING PLAN
   • Inspection schedule
   • Monitoring devices to install
   • Success metrics / thresholds
   • When to escalate treatment

6. PREVENTION PROTOCOL (long-term)
   • Structural modifications
   • Ongoing sanitation requirements
   • Seasonal preventive treatments
   • Staff/occupant education points
   • Regular inspection schedule`,
  },
  {
    id: "safety",
    label: "Health & Safety",
    icon: "⚕️",
    prompt: `You are a public health entomologist and occupational health specialist. Analyze this image for health and safety risks related to pest presence.

HEALTH & SAFETY RISK ASSESSMENT
════════════════════════════════

1. PEST IDENTIFICATION (from image)
   • Species identified:
   • Known disease vector status:

2. HEALTH RISK ANALYSIS

   DISEASE TRANSMISSION
   • Diseases this pest is known to vector or carry:
     (list each with transmission method)
   • Bacterial pathogens:
   • Viral pathogens:
   • Parasitic organisms:
   • Fungal associations:

   ALLERGENIC RISKS
   • Allergen sources: (frass, shed skin, saliva, body parts)
   • Asthma trigger potential
   • Contact dermatitis risk
   • Respiratory sensitization risk

   BITE / STING ASSESSMENT
   • Bite/sting capability
   • Venom profile (if applicable)
   • Typical reaction severity
   • Anaphylaxis risk
   • Secondary infection risk from bites

3. VULNERABLE POPULATIONS AT RISK
   ⚠️ Elevated risk for:
   • Infants and young children
   • Elderly individuals
   • Immunocompromised persons
   • Pregnant women
   • Persons with respiratory conditions
   • Persons with allergies
   • Pets and animals

4. FOOD SAFETY IMPACT
   • Contamination risk to food products
   • Cross-contamination pathways
   • Food safety regulation implications
   • Required disposal of contaminated items

5. OCCUPATIONAL SAFETY
   • PPE requirements for handling
   • Worker exposure limits
   • First aid procedures for exposure/bites
   • When to seek medical attention

6. REGULATORY & COMPLIANCE
   • Reportable condition: Yes/No
   • Relevant health codes
   • Documentation requirements
   • Authority notification requirements

7. IMMEDIATE SAFETY ACTIONS
   • Evacuation needed: Yes/No
   • Area isolation requirements
   • Decontamination procedures
   • Medical monitoring recommendations`,
  },
  {
    id: "prevention",
    label: "Prevention Audit",
    icon: "🛡️",
    prompt: `You are a pest prevention consultant performing a site vulnerability audit. Analyze this image of the space/environment.

PEST PREVENTION AUDIT REPORT
═════════════════════════════

1. ENVIRONMENT ASSESSMENT
   • Location type: (residential / commercial / warehouse / food service / healthcare / other)
   • Area photographed: (interior / exterior / specific room)
   • Overall cleanliness rating: [1-10]
   • Overall pest vulnerability rating: [1-10]

2. VULNERABILITY ANALYSIS

   STRUCTURAL VULNERABILITIES
   □ Gaps around doors/windows — describe
   □ Cracks in walls/foundation — describe
   □ Pipe/utility penetrations unsealed — describe
   □ Damaged weather stripping — describe
   □ Missing/damaged screens — describe
   □ Roof/eave gaps — describe
   □ Drainage issues — describe

   SANITATION VULNERABILITIES
   □ Exposed food/waste — describe
   □ Standing water — describe
   □ Grease buildup — describe
   □ Clutter providing harborage — describe
   □ Improper food storage — describe
   □ Organic debris — describe

   LANDSCAPING VULNERABILITIES
   □ Vegetation touching structure — describe
   □ Mulch against foundation — describe
   □ Standing water sources — describe
   □ Wood-to-soil contact — describe
   □ Overgrown areas — describe

3. PEST RISK MATRIX
   ┌──────────────────┬────────┬──────────────────┐
   │ Pest Type        │ Risk   │ Key Factor       │
   ├──────────────────┼────────┼──────────────────┤
   │ Rodents          │ H/M/L  │                  │
   │ Cockroaches      │ H/M/L  │                  │
   │ Ants             │ H/M/L  │                  │
   │ Termites         │ H/M/L  │                  │
   │ Stored Product   │ H/M/L  │                  │
   │ Flying Insects   │ H/M/L  │                  │
   │ Spiders          │ H/M/L  │                  │
   │ Birds            │ H/M/L  │                  │
   └──────────────────┴────────┴──────────────────┘

4. PRIORITY RECOMMENDATIONS
   Rank by impact and feasibility:
   🔴 Critical (do immediately):
   🟡 Important (within 1 week):
   🟢 Recommended (within 1 month):
   ⚪ Best practice (ongoing):

5. EXCLUSION PLAN
   • Specific sealing/screening recommendations
   • Materials needed
   • DIY vs professional required

6. MONITORING RECOMMENDATIONS
   • Trap/monitor placement locations
   • Inspection frequency
   • Record-keeping requirements`,
  },
  {
    id: "full_report",
    label: "Full Report",
    icon: "📋",
    prompt: `You are a senior pest management consultant generating a formal inspection report for a commercial client. Analyze this image and produce a complete professional report.

═══════════════════════════════════════════
  PROFESSIONAL PEST INSPECTION REPORT
  Powered by AI Vision Analysis
═══════════════════════════════════════════

SECTION A: EXECUTIVE SUMMARY
• One-paragraph overview of findings
• Overall risk rating: [LOW / MODERATE / HIGH / CRITICAL]
• Immediate action required: Yes / No
• Key finding highlights (3-5 bullet points)

SECTION B: PEST IDENTIFICATION
• Species: (common + scientific name)
• Classification certainty: High / Medium / Low
• Life stage: egg / larva / nymph / pupa / adult
• Key morphological features observed
• Estimated population based on evidence

SECTION C: INFESTATION ASSESSMENT
• Evidence type and quantity
• Severity level: 1-4 scale with justification
• Estimated duration of infestation
• Active vs. historical evidence
• Affected area scope

SECTION D: RISK ANALYSIS
• Human health risks (diseases, allergens, bites)
• Structural/property damage risks
• Food safety / contamination risks
• Business continuity / reputation risks
• Regulatory compliance risks
• Overall risk score with breakdown

SECTION E: ROOT CAUSE ANALYSIS
• Contributing environmental factors
• Structural deficiencies enabling entry
• Sanitation gaps
• Previous treatment failures (if evidence suggests)

SECTION F: TREATMENT RECOMMENDATIONS
• Immediate containment actions
• IPM strategy (cultural → physical → biological → chemical)
• Product/method recommendations with justification
• Treatment timeline and phases
• Expected outcomes and timelines
• Cost-impact classification: Minor / Moderate / Significant

SECTION G: PREVENTION STRATEGY
• Short-term exclusion measures
• Long-term structural improvements
• Sanitation protocol changes
• Monitoring program design
• Staff training recommendations
• Inspection schedule

SECTION H: FOLLOW-UP REQUIREMENTS
• Re-inspection date recommendation
• Monitoring milestones
• Success criteria
• Escalation triggers
• Documentation requirements

DISCLAIMER: This AI-assisted analysis is based on visual assessment only and should be validated by an on-site licensed pest management professional. It does not replace a physical inspection.`,
  },
  {
    id: "custom_pest",
    label: "Custom Query",
    icon: "✨",
    prompt: "",
  },
];

export default function PestDetector() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMode, setSelectedMode] = useState("identify");
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
    handleFile(e.dataTransfer.files[0]);
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
    if (!image) { setError("Upload an image first!"); return; }
    const mode = PEST_MODES.find((m) => m.id === selectedMode);
    const prompt = selectedMode === "custom_pest" ? customPrompt : mode.prompt;
    if (!prompt.trim()) { setError("Enter a custom prompt first!"); return; }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          _mode: mode.label,
          _tab: "pest",
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: image.mediaType, data: image.base64 } },
              { type: "text", text: prompt },
            ],
          }],
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
          ...prev.slice(0, 19),
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

  const exportReport = () => {
    if (!result) return;
    const mode = PEST_MODES.find((m) => m.id === selectedMode);
    const report = `PEST DETECTION REPORT\nGenerated: ${new Date().toLocaleString()}\nAnalysis Mode: ${mode?.label || "Custom"}\n${"═".repeat(50)}\n\n${result}\n\n${"═".repeat(50)}\nGenerated by Pest Detect Pro — AI-Powered Pest Analysis\nDISCLAIMER: This AI analysis should be validated by a licensed pest management professional.`;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pest-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const severityColor = (level) => {
    const colors = { routine: "#22c55e", prompt: "#eab308", urgent: "#f97316", emergency: "#ef4444" };
    return colors[level] || "#6b7280";
  };

  return (
    <div onPaste={handlePaste}>
      {/* Pest Detection Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8,
          background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(251,146,60,0.1))",
          border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "8px 20px",
        }}>
          <span style={{ fontSize: 22 }}>🔬</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#fca5a5" }}>
            Enterprise Pest Intelligence
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 700,
          background: "linear-gradient(135deg, #e8e6e3 0%, #fca5a5 50%, #fb923c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "12px 0 8px", lineHeight: 1.1,
        }}>
          Pest Detect Pro
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
          Upload pest evidence — Get expert-grade identification, risk analysis & treatment plans
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !imagePreview && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#f87171" : imagePreview ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 16, padding: imagePreview ? 0 : 48, textAlign: "center",
          cursor: imagePreview ? "default" : "pointer", transition: "all 0.3s ease",
          background: dragOver ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.02)",
          position: "relative", overflow: "hidden", marginBottom: 24, minHeight: imagePreview ? "auto" : 180,
          display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
        }}
      >
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])} />

        {imagePreview ? (
          <div style={{ position: "relative", width: "100%" }}>
            <img src={imagePreview} alt="Pest evidence" style={{
              width: "100%", maxHeight: 400, objectFit: "contain", display: "block", borderRadius: 14,
            }} />
            <button onClick={(e) => { e.stopPropagation(); clearAll(); }} style={{
              position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e8e6e3",
              padding: "6px 14px", cursor: "pointer", fontSize: 13, backdropFilter: "blur(8px)",
            }}>✕ Remove</button>
            <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} style={{
              position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e8e6e3",
              padding: "6px 14px", cursor: "pointer", fontSize: 13, backdropFilter: "blur(8px)",
            }}>🔄 Replace</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.6 }}>🪲</div>
            <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 6px" }}>
              Upload pest photo, damage evidence, or site inspection image
            </p>
            <p style={{ color: "#4b5563", fontSize: 12, margin: 0 }}>
              <strong style={{ color: "#f87171" }}>Camera</strong> supported on mobile •
              Drag & drop • <strong style={{ color: "#f87171" }}>Paste</strong> from clipboard
            </p>
          </>
        )}
      </div>

      {/* Analysis Mode Selector */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: "#6b7280", marginBottom: 10, paddingLeft: 4,
        }}>
          Analysis Mode
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
          {PEST_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              style={{
                background: selectedMode === mode.id
                  ? "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(251,146,60,0.15))"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedMode === mode.id ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10, padding: "12px 14px", cursor: "pointer",
                color: selectedMode === mode.id ? "#fecaca" : "#9ca3af",
                fontSize: 13, fontWeight: 500, transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 18 }}>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Description */}
      {selectedMode !== "custom_pest" && (
        <div style={{
          background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 12, color: "#d1d5db",
        }}>
          {{
            identify: "🔬 Full species identification with morphological analysis, risk classification, and behavioral profiling.",
            infestation: "📊 Evidence-based infestation severity scoring with population dynamics and spread assessment.",
            damage: "🏚️ Structural and property damage evaluation with repair urgency and cost impact classification.",
            treatment: "💊 Complete IPM treatment plan with 4-level strategy (cultural → physical → biological → chemical).",
            safety: "⚕️ Health risk assessment covering disease vectors, allergens, vulnerable populations, and regulatory compliance.",
            prevention: "🛡️ Site vulnerability audit with pest risk matrix and priority-ranked prevention recommendations.",
            full_report: "📋 Comprehensive professional inspection report — all sections combined for client delivery.",
          }[selectedMode]}
        </div>
      )}

      {/* Custom Prompt */}
      {selectedMode === "custom_pest" && (
        <div style={{ marginBottom: 24 }}>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ask anything about the pest/image... e.g., 'Is this a German or American cockroach?', 'What termite species causes this wood damage pattern?', 'Are these bed bug bites or flea bites?'"
            style={{
              width: "100%", minHeight: 80, background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16,
              color: "#e8e6e3", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
              resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(239,68,68,0.5)"}
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
          background: loading ? "rgba(239,68,68,0.2)" : !image ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #dc2626, #ea580c, #d97706)",
          border: "none", borderRadius: 12, color: !image ? "#4b5563" : "#fff",
          fontSize: 16, fontWeight: 700, cursor: loading || !image ? "not-allowed" : "pointer",
          fontFamily: "'Space Mono', monospace", letterSpacing: 1,
          transition: "all 0.3s ease", marginBottom: 24,
          boxShadow: image && !loading ? "0 4px 24px rgba(239,68,68,0.3)" : "none",
        }}
      >
        {loading ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{
              display: "inline-block", width: 18, height: 18,
              border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
            }} />
            Analyzing pest evidence...
          </span>
        ) : "🔬 Run Pest Analysis"}
      </button>

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
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 16, padding: 24, marginBottom: 24, position: "relative",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8,
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
              textTransform: "uppercase", color: "#f87171",
            }}>
              {PEST_MODES.find((m) => m.id === selectedMode)?.icon} Pest Analysis Result
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigator.clipboard?.writeText(result)} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "4px 12px", color: "#9ca3af", cursor: "pointer", fontSize: 12,
              }}>📋 Copy</button>
              <button onClick={exportReport} style={{
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 6, padding: "4px 12px", color: "#fca5a5", cursor: "pointer", fontSize: 12,
              }}>📥 Export Report</button>
            </div>
          </div>
          <div style={{
            color: "#d1d5db", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {result}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
              textTransform: "uppercase", color: "#6b7280",
            }}>
              📜 Inspection History ({history.length})
            </span>
            <button onClick={() => setHistory([])} style={{
              background: "none", border: "none", color: "#4b5563", cursor: "pointer", fontSize: 12,
            }}>Clear All</button>
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
                  <img src={item.preview} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#fecaca" }}>{item.mode}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
    </div>
  );
}
