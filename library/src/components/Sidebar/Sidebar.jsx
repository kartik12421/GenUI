import React, { useState } from "react";

export const Sidebar = ({
  logo = "Sidebar",
  links = ["Dashboard", "Analytics", "Settings", "Support", "Profile", "Billing"],
  accent = "#6366f1",
  bg = "#0f172a",
  onLinkClick = () => {},
  collapsedWidth = "80px",
  expandedWidth = "240px"
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, height: "100vh", width: isCollapsed ? collapsedWidth : expandedWidth, borderRight: "1px solid rgba(255,255,255,0.06)", fontFamily: "system-ui,sans-serif", transition: "width 0.3s", position: "relative" }}>
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
          {!isCollapsed && <span style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo}</span>}
        </div>
      </div>
      <div style={{ padding: "20px 0" }}>
        {links.map(link => (
          <button key={link} onClick={() => { setActive(link); onLinkClick(link); }} style={{ width: "100%", background: active === link ? alpha(accent, 0.12) : "transparent", border: "none", padding: "10px 20px", borderRadius: "0", fontSize: "14px", fontWeight: active === link ? "700" : "500", color: active === link ? accent : "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active === link ? accent : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            {!isCollapsed && link}
          </button>
        ))}
      </div>
      <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ position: "absolute", bottom: "20px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
      </button>
    </div>
  );
};