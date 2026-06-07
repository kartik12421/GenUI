import React from "react";

export const FeatureSections = ({
  title = "Features",
  description = "Everything you need to build modern apps",
  accent = "#6366f1",
  bg = "#0f172a",
  features = [
    {
      icon: "🚀",
      title: "Fast Performance",
      description: "Blazingly fast speeds for your applications"
    },
    {
      icon: "⚡",
      title: "Developer Friendly",
      description: "Designed with developers in mind"
    },
    {
      icon: "✨",
      title: "Modern Designs",
      description: "Cutting-edge designs for your projects"
    }
  ],
  layout = "grid"
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const layouts = {
    grid: {
      container: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" },
      item: { padding: "24px", borderRadius: "20px", background: alpha(accent, 0.05), border: "1px solid " + alpha(accent, 0.15) }
    },
    bento: {
      container: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
      item: { padding: "24px", borderRadius: "20px", background: alpha(accent, 0.05), border: "1px solid " + alpha(accent, 0.15), height: "200px" }
    },
    timeline: {
      container: { display: "flex", flexDirection: "column", gap: "20px", position: "relative" },
      item: { padding: "24px", borderRadius: "20px", background: alpha(accent, 0.05), border: "1px solid " + alpha(accent, 0.15), width: "100%", position: "relative", marginLeft: "40px" }
    },
    alternating: {
      container: { display: "flex", flexDirection: "column", gap: "20px" },
      item: { padding: "24px", borderRadius: "20px", background: alpha(accent, 0.05), border: "1px solid " + alpha(accent, 0.15), width: "100%" }
    }
  };
  const selectedLayout = layouts[layout] || layouts.grid;
  return (
    <div style={{ background: bg, padding: "40px 20px", fontFamily: "system-ui,sans-serif", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#fff", marginBottom: "10px" }}>{title}</h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>{description}</p>
      </div>
      <div style={selectedLayout.container}>
        {features.map((feature, i) => (
          <div key={i} style={selectedLayout.item}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{feature.icon}</div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>{feature.title}</h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};