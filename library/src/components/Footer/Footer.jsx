import React from "react";

export const Footer = ({
  logo = "GenUI",
  copyrightText = "© 2023 GenUI. All rights reserved.",
  links = ["Home", "Features", "Pricing", "Blog"],
  socialLinks = ["Twitter", "Github", "LinkedIn"],
  accent = "#6366f1",
  bg = "#0f172a",
  onLinkClick = () => {},
  onSocialLinkClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <footer style={{ background: bg, borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "system-ui,sans-serif", width: "100%", boxSizing: "border-box", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo}</span>
        </div>
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>Links</span>
            {links.map(link => (
              <button key={link} onClick={() => onLinkClick(link)} style={{ background: "transparent", border: "none", padding: "4px 0", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{link}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>Social</span>
            {socialLinks.map(link => (
              <button key={link} onClick={() => onSocialLinkClick(link)} style={{ background: "transparent", border: "none", padding: "4px 0", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{link}</button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "24px" }}>{copyrightText}</div>
      </div>
    </footer>
  );
};