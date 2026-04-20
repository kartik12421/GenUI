import React, { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},

  variant = "solid",   // solid | outline | ghost | soft
  color = "primary",   // primary | danger | success | warning | neutral
  size = "md",

  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // ---------------- COLORS (DESIGN TOKENS) ----------------
  const colors = {
    primary: { base: "#111", text: "#fff" },
    danger: { base: "#e63946", text: "#fff" },
    success: { base: "#2a9d8f", text: "#fff" },
    warning: { base: "#f4a261", text: "#000" },
    neutral: { base: "#6c757d", text: "#fff" },
  };

  const c = colors[color] || colors.primary;

  // ---------------- SIZE ----------------
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13, radius: 8 },
    md: { padding: "12px 24px", fontSize: 15, radius: 10 },
    lg: { padding: "16px 36px", fontSize: 17, radius: 12 },
  };

  const s = sizes[size];

  // ---------------- VARIANTS ----------------
  const variants = {
    solid: {
      bg: c.base,
      text: c.text,
      border: "none",
    },
    outline: {
      bg: "transparent",
      text: c.base,
      border: `2px solid ${c.base}`,
    },
    ghost: {
      bg: "transparent",
      text: c.base,
      border: "none",
    },
    soft: {
      bg: c.base + "20",
      text: c.base,
      border: "none",
    },
  };

  const v = variants[variant];

  // ---------------- STYLE ----------------
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    width: fullWidth ? "100%" : "auto",
    padding: s.padding,
    fontSize: s.fontSize,
    borderRadius: s.radius,

    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",

    background: v.bg,
    color: v.text,
    border: v.border,

    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,

    transform: pressed
      ? "scale(0.96)"
      : hovered && !disabled
      ? "scale(1.04)"
      : "scale(1)",

    boxShadow:
      variant === "solid" && !disabled
        ? hovered
          ? `0 10px 25px ${c.base}55`
          : `0 4px 10px ${c.base}33`
        : "none",

    transition: "all 0.18s ease",
    position: "relative",
  };

  // ---------------- SHIM EFFECT ----------------
  const shim = {
    position: "absolute",
    top: 0,
    left: hovered && !disabled ? "120%" : "-60%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.4s ease",
  };

  return (
    <button
      style={style}
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled || loading}
    >
      <span style={shim} />

      {loading ? (
        <span style={{ fontSize: 12 }}>Loading...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};
