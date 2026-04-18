import React , { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},
  color = "#0f0f0f",
  textColor = "#ffffff",
  size = "md",
  variant = "solid",
  disabled = false,
  icon = null,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: "8px 18px", fontSize: "13px", borderRadius: "8px" },
    md: { padding: "12px 28px", fontSize: "15px", borderRadius: "10px" },
    lg: { padding: "16px 40px", fontSize: "17px", borderRadius: "12px" },
  };

  const { padding, fontSize, borderRadius } = sizes[size] || sizes.md;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding,
    fontSize,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.01em",
    borderRadius,
    border: variant === "outline" ? `2px solid ${color}` : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    userSelect: "none",
    transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
    opacity: disabled ? 0.45 : 1,
    position: "relative",
    overflow: "hidden",
    boxShadow:
      variant === "solid" && !disabled
        ? hovered
          ? `0 8px 24px ${color}55, 0 2px 8px ${color}33`
          : `0 2px 8px ${color}22`
        : "none",
    transform: pressed
      ? "scale(0.96) translateY(1px)"
      : hovered && !disabled
      ? "scale(1.03) translateY(-1px)"
      : "scale(1) translateY(0)",
    backgroundColor:
      variant === "solid"
        ? hovered && !disabled
          ? color + "dd"
          : color
        : hovered && !disabled
        ? color + "15"
        : "transparent",
    color: variant === "solid" ? textColor : color,
  };

  const shimStyle = {
    position: "absolute",
    top: 0,
    left: hovered && !disabled ? "110%" : "-60%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
    transition: "left 0.45s ease",
    pointerEvents: "none",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <button
        style={baseStyle}
        onClick={!disabled ? onClick : undefined}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <span style={shimStyle} />
        {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
        {label}
      </button>
    </>
  );
};

export default Button;

// --- Demo ---
export const ButtonDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        background: "#f5f4f0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <p style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>Clicked: {count}</p>

      <Button label="Primary" color="#111" onClick={() => setCount(c => c + 1)} />
      <Button label="Accent" color="#e63946" textColor="#fff" onClick={() => setCount(c => c + 1)} />
      <Button label="Outline" color="#111" variant="outline" onClick={() => setCount(c => c + 1)} />
      <Button label="Large" color="#2d6a4f" size="lg" onClick={() => setCount(c => c + 1)} />
      <Button label="Small" color="#457b9d" size="sm" onClick={() => setCount(c => c + 1)} />
      <Button label="Disabled" color="#888" disabled />
    </div>
  );
};