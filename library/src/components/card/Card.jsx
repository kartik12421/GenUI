import React , { useState } from "react";
 
export const Card = ({
  title = "",
  description = "",
  footer = null,
  image = null,
  imagePlaceholder = null,
  badge = null,
  badgeColor = "#e8f0fe",
  badgeTextColor = "#1a56db",
  avatar = null,
  avatarBg = "#e8f0fe",
  avatarColor = "#1a56db",
  role = "",
  stats = null,
  horizontal = false,
  aside = null,
  asideBg = "#f0fdf4",
  onClick = null,
  width = 220,
  variant = "default",
}) => {
  const [hovered, setHovered] = useState(false);
 
  const base = {
    background: "#ffffff",
    border: hovered ? "0.5px solid #aaa" : "0.5px solid #e0e0e0",
    borderRadius: 12,
    overflow: "hidden",
    transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1), border-color 0.15s ease",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    cursor: onClick ? "pointer" : "default",
    width: horizontal ? "100%" : width,
    display: horizontal ? "flex" : "block",
    maxWidth: horizontal ? 420 : undefined,
    fontFamily: "system-ui, sans-serif",
  };
 
  const bodyStyle = {
    padding: variant === "profile" ? "1.5rem 1.25rem" : "1.1rem 1.25rem",
    textAlign: variant === "profile" ? "center" : "left",
    flex: horizontal ? 1 : undefined,
  };
 
  const titleStyle = {
    fontSize: 15,
    fontWeight: 500,
    color: "#111",
    marginBottom: 6,
  };
 
  const descStyle = {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.6,
  };
 
  const footerStyle = {
    padding: "0.7rem 1.25rem",
    borderTop: "0.5px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
 
  const avatarStyle = {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: avatarBg,
    color: avatarColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: 18,
    margin: "0 auto 12px",
  };
 
  const badgeStyle = {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 99,
    marginTop: 10,
    background: badgeColor,
    color: badgeTextColor,
  };
 
  const asideStyle = {
    width: 80,
    minHeight: 80,
    background: asideBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
 
  return (
    <div
      style={base}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {horizontal && aside && <div style={asideStyle}>{aside}</div>}
      {!horizontal && image && (
        <img src={image} alt={title} style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
      )}
      {!horizontal && imagePlaceholder && (
        <div style={{ width: "100%", height: 110, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {imagePlaceholder}
        </div>
      )}
      <div style={bodyStyle}>
        {variant === "profile" && avatar && <div style={avatarStyle}>{avatar}</div>}
        {title && <div style={titleStyle}>{title}</div>}
        {variant === "profile" && role && <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{role}</div>}
        {description && <div style={descStyle}>{description}</div>}
        {stats && (
          <div>
            <div style={{ fontSize: 26, fontWeight: 500, color: "#111", marginTop: 4 }}>{stats.value}</div>
            {stats.delta && (
              <div style={{ fontSize: 12, color: stats.deltaColor || "#16a34a", marginTop: 4 }}>{stats.delta}</div>
            )}
          </div>
        )}
        {badge && <div style={badgeStyle}>{badge}</div>}
      </div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
};
 
export default Card;