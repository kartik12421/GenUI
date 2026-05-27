import React, { useState, useEffect } from "react";

export const Navbar = ({
  logo = "VirtualAI",
  links = ["Home", "Features", "Pricing", "Blog"],
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0f172a",
  onCtaClick = () => {},
  onLinkClick = () => {}
}) => {
  const [active, setActive] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <nav style={{ background: bg, borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "system-ui,sans-serif", width: "100%", boxSizing: "border-box", borderRadius: "12px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo}</span>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: "2px" }}>
            {links.map(link => (
              <button key={link} onClick={() => { setActive(link); onLinkClick(link); }} style={{ background: active === link ? alpha(accent, 0.12) : "transparent", border: "none", padding: "7px 16px", borderRadius: "9px", fontSize: "14px", fontWeight: active === link ? "700" : "500", color: active === link ? accent : "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit" }}>{link}</button>
            ))}
          </div>
        )}
        <button onClick={onCtaClick} style={{ padding: "8px 18px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.75) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>{ctaText}</button>
      </div>
    </nav>
  );
};