import React from "react";

export const Footer = ({
  logo = "ShinyApp",
  accent = "#6366f1",
  bg = "#0f172a",
  links = [{"title": "Features", "url": "#"}, {"title": "Pricing", "url": "#"}, {"title": "Docs", "url": "#"}, {"title": "Contact", "url": "#"}],
  socialLinks = [{"icon": "M22.46 6.57a8.43 8.43 0 01-2.42.66 4.23 4.23 0 001.85-2.33 8.43 8.43 0 01-2.67 1.02 4.2 4.2 0 00-7.18 3.82 11.93 11.93 0 01-8.65-4.39 4.2 4.2 0 001.3 5.6 4.2 4.2 0 01-1.9-.52v.05a4.2 4.2 0 003.37 4.12 4.2 4.2 0 01-1.9.07 4.2 4.2 0 003.92 2.92 8.43 8.43 0 01-5.22 1.8c-.34 0-.68-.02-1.02-.06a11.93 11.93 0 006.46 1.89c7.76 0 12-6.44 12-12v-.54c.82-.6 1.53-1.34 2.1-2.18z", "url": "#"}, {"icon": "M22.23 5.924c-.736.326-1.527.547-2.357.646.847-.508 1.498-1.312 1.804-2.27-.793.47-1.67.81-2.605.992-.748-.797-1.813-1.292-2.993-1.292-2.266 0-4.102 1.837-4.102 4.102 0 .322.036.636.107.937-3.41-.171-6.433-1.805-8.457-4.29-.353.606-.554 1.312-.554 2.064 0 1.424.724 2.68 1.825 3.415-.673-.022-1.305-.206-1.86-.512v.052c0 1.988 1.414 3.645 3.292 4.023-.344.094-.707.143-1.08.143-.264 0-.52-.025-.77-.074.52 1.623 2.03 2.805 3.82 2.838-1.4 1.097-3.16 1.752-5.076 1.752-.33 0-.656-.02-.977-.058 1.814 1.162 3.967 1.84 6.28 1.84 7.536 0 11.66-6.24 11.66-11.66 0-.178-.004-.355-.012-.53.8-.58 1.5-1.3 2.05-2.12z", "url": "#"}],
  copyrightText = "© 2024 ShinyApp. All rights reserved."
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <footer style={{ background: bg, padding: "40px 20px", borderTop: "1px solid " + alpha(accent, 0.1), fontFamily: "system-ui,sans-serif", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid " + alpha(accent, 0.1), paddingBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
            <span style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo}</span>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", background: alpha(accent, 0.1), cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
          {links.map((group, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href={group.url} style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>{group.title}</a>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", textAlign: "center", paddingTop: "32px", borderTop: "1px solid " + alpha(accent, 0.1) }}>{copyrightText}</div>
      </div>
    </footer>
  );
};