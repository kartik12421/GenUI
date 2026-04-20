import React, { useState } from "react";

export const Card = ({
  subtitle = "Subtitle",
  title = "Card Title",
  description = "Description",
  tag = null,

  disabled = false,
  selectable = false,
  onSelect = () => {},
  showActions = false,

  variant = "default",   // default | outlined | elevated | ghost | filled
  color = "blue",        // blue | red | green | yellow | gray
  size = "md",           // sm | md | lg
  width = 260,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ---------------- SIZE ----------------
  const sizes = {
    sm: { padding: "1rem", title: 14, desc: 12 },
    md: { padding: "1.5rem", title: 18, desc: 13 },
    lg: { padding: "2rem", title: 22, desc: 15 },
  };
  const currentSize = sizes[size];

  // ---------------- COLORS ----------------
  const colors = {
    blue: {
      bg: "#1a56db",
      text: "#ffffff",
      border: "#1a56db",
    },
    red: {
      bg: "#e63946",
      text: "#ffffff",
      border: "#e63946",
    },
    green: {
      bg: "#2a9d8f",
      text: "#ffffff",
      border: "#2a9d8f",
    },
    yellow: {
      bg: "#f4a261",
      text: "#000000",
      border: "#f4a261",
    },
    gray: {
      bg: "#f1f1f1",
      text: "#111111",
      border: "#dddddd",
    },
  };
  const currentColor = colors[color] || colors.blue;

  // ---------------- VARIANTS ----------------
  const variants = {
    default: {
      bg: "#ffffff",
      border: "0.5px solid #e0e0e0",
      text: "#111",
      shadow: "none",
    },
    outlined: {
      bg: "transparent",
      border: `1px solid ${currentColor.border}`,
      text: currentColor.border,
      shadow: "none",
    },
    elevated: {
      bg: "#ffffff",
      border: "none",
      text: "#111",
      shadow: "0 8px 20px rgba(0,0,0,0.08)",
    },
    ghost: {
      bg: "transparent",
      border: "none",
      text: "#111",
      shadow: "none",
    },
    filled: {
      bg: currentColor.bg,
      border: `1px solid ${currentColor.border}`,
      text: currentColor.text,
      shadow: "none",
    },
  };

  const currentVariant = variants[variant];

  const handleClick = () => {
    if (disabled) return;
    if (selectable) {
      setSelected((s) => !s);
      onSelect(!selected);
    }
  };

  // ---------------- MAIN STYLE ----------------
  const cardStyle = {
    background: currentVariant.bg,
    color: currentVariant.text,

    border: selected
      ? "2px solid #000"
      : hovered
      ? "1px solid #aaa"
      : currentVariant.border,

    boxShadow:
      variant === "elevated"
        ? hovered
          ? "0 12px 30px rgba(0,0,0,0.12)"
          : currentVariant.shadow
        : "none",

    borderRadius: 16,
    padding: currentSize.padding,
    width,
    fontFamily: "monospace",

    cursor: selectable && !disabled ? "pointer" : "default",
    transform: pressed
      ? "scale(0.97)"
      : hovered && !disabled
      ? "translateY(-4px)"
      : "none",

    opacity: disabled ? 0.4 : 1,
    transition: "all 0.2s ease",
  };

  // ---------------- STYLES ----------------
  const subtitleStyle = {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 6,
  };

  const titleStyle = {
    fontSize: currentSize.title,
    margin: "6px 0",
    fontWeight: 500,
  };

  const descStyle = {
    fontSize: currentSize.desc,
    opacity: 0.85,
    lineHeight: 1.6,
  };

  const footerStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const tagStyle = {
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 20,
    background:
      variant === "filled" ? "rgba(255,255,255,0.2)" : "#eee",
  };

  const iconBtn = (active, color) => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: active ? color : "#888",
    background: "#f5f5f5",
  });

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <p style={subtitleStyle}>{subtitle}</p>
      <h2 style={titleStyle}>{title}</h2>
      <p style={descStyle}>{description}</p>

      {(tag || showActions) && (
        <div style={footerStyle}>
          {tag && <span style={tagStyle}>{tag}</span>}

          {showActions && (
            <div style={{ display: "flex", gap: 6 }}>
              {/* Bookmark */}
              <div
                style={iconBtn(bookmarked, "#1a56db")}
                onClick={(e) => {
                  e.stopPropagation();
                  setBookmarked((b) => !b);
                }}
              >
                🔖
              </div>

              {/* Like */}
              <div
                style={iconBtn(liked, "#e63946")}
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked((l) => !l);
                }}
              >
                ❤️
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};