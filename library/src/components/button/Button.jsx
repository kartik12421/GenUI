import React from "react";

export const Button = ({ text = "Get Started", bg = "#7c3aed", color = "#fff", size = "md", disabled = false, loading = false, onClick = () => {} }) => {
  const sizes = { sm: "8px 16px", md: "11px 24px", lg: "14px 32px" };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: bg,
        color: color,
        padding: sizes[size],
        borderRadius: "10px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s"
      }}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};