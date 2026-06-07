import React, { useState, useEffect } from "react";

export const CommandPalette = ({
  items = ["Create Project", "Open Settings", "View Documentation", "Toggle Theme"],
  placeholder = "Search commands...",
  accent = "#6366f1",
  bg = "#0f172a",
  onSelect = () => {}
}) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  useEffect(() => {
    setFilteredItems(items.filter(item => item.toLowerCase().includes(search.toLowerCase())));
  }, [search, items]);
  return (
    <div style={{ background: alpha(bg, 0.95), borderRadius: "12px", width: "500px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", overflow: "hidden", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            fontFamily: "inherit"
          }}
        />
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {filteredItems.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect(item)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.85)",
              fontSize: "14px",
              transition: "all 0.2s",
              background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
              borderBottom: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
        Press Esc to close
      </div>
    </div>
  );
};