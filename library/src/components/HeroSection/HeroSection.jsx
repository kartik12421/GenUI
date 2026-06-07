import React from "react";

export const HeroSection = ({
  title = "Transform Your Business",
  subtitle = "Leverage our cutting-edge AI solutions to streamline operations and boost productivity.",
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0f172a",
  image = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  onCtaClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, color: "#fff", fontFamily: "system-ui,sans-serif", borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "60px", maxWidth: "1100px", margin: "20px auto", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ maxWidth: "500px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", margin: "0 0 20px", lineHeight: 1.2 }}>{title}</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", margin: "0 0 30px", lineHeight: 1.6 }}>{subtitle}</p>
        <button onClick={onCtaClick} style={{ padding: "14px 28px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>{ctaText}</button>
      </div>
      <div style={{ width: "450px", height: "350px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
        <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
      </div>
    </div>
  );
};