import React, { useState } from "react";

export const ProfileCard = ({
  name = "John Doe",
  role = "Web Developer",
  bio = "Building modern Websites",

  avatar = "https://i.pravatar.cc/150?img=12",
  cover = null,

  stats = [
    { label: "Projects", value: 24 },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: 180 },
  ],

  variant = "elevated",   // default | outlined | elevated | filled
  color = "primary",      // primary | danger | success | warning | neutral
  size = "md",

  selectable = false,
  onSelect = () => {},

  style = {},
  className = "",
}) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [followed, setFollowed] = useState(false);

  // ---------------- COLORS ----------------
  const colors = {
    primary: { base: "#111", text: "#fff" },
    danger: { base: "#e63946", text: "#fff" },
    success: { base: "#2a9d8f", text: "#fff" },
    warning: { base: "#f4a261", text: "#000" },
    neutral: { base: "#6c757d", text: "#fff" },
  };
  const c = colors[color];

  // ---------------- VARIANTS ----------------
  const variants = {
    default: {
      bg: "#fff",
      border: "1px solid #e0e0e0",
      text: "#111",
      shadow: "none",
    },
    outlined: {
      bg: "transparent",
      border: `1px solid ${c.base}`,
      text: c.base,
      shadow: "none",
    },
    elevated: {
      bg: "#fff",
      border: "none",
      text: "#111",
      shadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    filled: {
      bg: c.base,
      border: "none",
      text: c.text,
      shadow: "none",
    },
  };

  const v = variants[variant];

  // ---------------- SIZE ----------------
  const sizes = {
    sm: {
      pad: cover ? "80px 16px 20px" : "70px 16px 20px",
      name: 16,
      role: 12,
    },
    md: {
      pad: cover ? "90px 24px 28px" : "80px 24px 28px",
      name: 20,
      role: 13,
    },
    lg: {
      pad: cover ? "100px 28px 32px" : "90px 28px 32px",
      name: 24,
      role: 14,
    },
  };

  const s = sizes[size];

  const handleClick = () => {
    if (!selectable) return;
    setSelected((prev) => !prev);
    onSelect(!selected);
  };

  // ---------------- TEXT FIX ----------------
  const secondaryText =
    variant === "filled" ? "rgba(255,255,255,0.85)" : "#666";

  // ---------------- CARD STYLE ----------------
  const cardStyle = {
    width: 300,
    borderRadius: 20,
    background: v.bg,
    color: v.text,
    border: selected ? "2px solid #000" : v.border,
    boxShadow: hovered ? "0 12px 35px rgba(0,0,0,0.12)" : v.shadow,
    textAlign: "center",
    position: "relative",
    overflow: cover ? "hidden" : "visible",
    cursor: selectable ? "pointer" : "default",
    transition: "all 0.2s ease",
    ...style,
  };

  // ---------------- AVATAR ----------------
  const avatarStyle = {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    top: cover ? 60 : 0,
    left: "50%",
    transform: cover
      ? "translateX(-50%)"
      : "translate(-50%, -50%)",
    border: `4px solid ${v.bg}`,
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* COVER */}
      {cover && (
        <div
          style={{
            height: 120,
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* CONTENT */}
      <div style={{ padding: s.pad }}>
        {/* Avatar */}
        <img src={avatar} alt="avatar" style={avatarStyle} />

        {/* Name */}
        <h3 style={{ fontSize: s.name, margin: "10px 0 4px" }}>
          {name}
        </h3>

        {/* Role */}
        <p style={{ fontSize: s.role, color: secondaryText, margin: 0 }}>
          {role}
        </p>

        {/* Bio */}
        <p style={{ fontSize: 13, marginTop: 10, color: secondaryText }}>
          {bio}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontWeight: 600 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: secondaryText }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          style={{
            marginTop: 20,
            padding: "10px 22px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: followed ? "#ccc" : c.base,
            color: followed ? "#111" : "#fff",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setFollowed((f) => !f);
          }}
        >
          {followed ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};