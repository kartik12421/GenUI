import React, { useState } from "react";

export const NavBar = ({
  logo = "Astro",
  links = ["Home", "Services", "Pricing", "About"],
  user = { name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  accent = "#6366f1",
  bg = "#0f172a",
  onLinkClick = () => {},
  onProfileClick = () => {}
}) => {
  const [activeLink, setActiveLink] = useState(links[0]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <nav style={{ background: bg, borderBottom: "1px solid rgba(255,255,255,0.07)", width: "100%", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff" }}>{logo}</div>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} style={{ display: "none", background: "transparent", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {links.map(link => (
              <button key={link} onClick={() => { setActiveLink(link); onLinkClick(link); }} style={{ background: activeLink === link ? alpha(accent, 0.12) : "transparent", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: activeLink === link ? "700" : "500", color: activeLink === link ? accent : "rgba(255,255,255,0.5)", cursor: "pointer" }}>{link}</button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ background: "transparent", border: "none", padding: "4px", borderRadius: "50%", cursor: "pointer" }}>
              <img src={user.avatar} alt={user.name} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
            </button>
            {showProfileMenu && (
              <div style={{ position: "absolute", top: "40px", right: 0, background: bg, borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", width: "200px", padding: "8px 0" }}>
                <div style={{ padding: "12px", fontSize: "14px", fontWeight: "600", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{user.name}</div>
                <button onClick={onProfileClick} style={{ width: "100%", padding: "8px 12px", background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>Profile</button>
                <button style={{ width: "100%", padding: "8px 12px", background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>Settings</button>
                <button style={{ width: "100%", padding: "8px 12px", background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div style={{ position: "absolute", top: "64px", left: 0, right: 0, background: bg, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {links.map(link => (
            <button key={link} onClick={() => { setActiveLink(link); onLinkClick(link); }} style={{ width: "100%", padding: "12px", background: activeLink === link ? alpha(accent, 0.12) : "transparent", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: activeLink === link ? "700" : "500", color: activeLink === link ? accent : "rgba(255,255,255,0.5)", cursor: "pointer", marginBottom: "4px" }}>{link}</button>
          ))}
        </div>
      )}
    </nav>
  );
};