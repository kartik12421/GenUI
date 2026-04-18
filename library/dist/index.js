var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card
});
module.exports = __toCommonJS(index_exports);

// src/components/button/Button.jsx
var import_react = __toESM(require("react"));
var Button = ({
  label = "Click Me",
  onClick = () => {
  },
  color = "#0f0f0f",
  textColor = "#ffffff",
  size = "md",
  variant = "solid",
  disabled = false,
  icon = null
}) => {
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const [pressed, setPressed] = (0, import_react.useState)(false);
  const sizes = {
    sm: { padding: "8px 18px", fontSize: "13px", borderRadius: "8px" },
    md: { padding: "12px 28px", fontSize: "15px", borderRadius: "10px" },
    lg: { padding: "16px 40px", fontSize: "17px", borderRadius: "12px" }
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
    boxShadow: variant === "solid" && !disabled ? hovered ? `0 8px 24px ${color}55, 0 2px 8px ${color}33` : `0 2px 8px ${color}22` : "none",
    transform: pressed ? "scale(0.96) translateY(1px)" : hovered && !disabled ? "scale(1.03) translateY(-1px)" : "scale(1) translateY(0)",
    backgroundColor: variant === "solid" ? hovered && !disabled ? color + "dd" : color : hovered && !disabled ? color + "15" : "transparent",
    color: variant === "solid" ? textColor : color
  };
  const shimStyle = {
    position: "absolute",
    top: 0,
    left: hovered && !disabled ? "110%" : "-60%",
    width: "50%",
    height: "100%",
    background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
    transition: "left 0.45s ease",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    "link",
    {
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap",
      rel: "stylesheet"
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      style: baseStyle,
      onClick: !disabled ? onClick : void 0,
      onMouseEnter: () => !disabled && setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => !disabled && setPressed(true),
      onMouseUp: () => setPressed(false),
      disabled,
      "aria-disabled": disabled
    },
    /* @__PURE__ */ import_react.default.createElement("span", { style: shimStyle }),
    icon && /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "flex", alignItems: "center" } }, icon),
    label
  ));
};

// src/components/card/Card.jsx
var import_react2 = __toESM(require("react"));
var Card = ({
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
  variant = "default"
}) => {
  const [hovered, setHovered] = (0, import_react2.useState)(false);
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
    maxWidth: horizontal ? 420 : void 0,
    fontFamily: "system-ui, sans-serif"
  };
  const bodyStyle = {
    padding: variant === "profile" ? "1.5rem 1.25rem" : "1.1rem 1.25rem",
    textAlign: variant === "profile" ? "center" : "left",
    flex: horizontal ? 1 : void 0
  };
  const titleStyle = {
    fontSize: 15,
    fontWeight: 500,
    color: "#111",
    marginBottom: 6
  };
  const descStyle = {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.6
  };
  const footerStyle = {
    padding: "0.7rem 1.25rem",
    borderTop: "0.5px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
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
    margin: "0 auto 12px"
  };
  const badgeStyle = {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 99,
    marginTop: 10,
    background: badgeColor,
    color: badgeTextColor
  };
  const asideStyle = {
    width: 80,
    minHeight: 80,
    background: asideBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  };
  return /* @__PURE__ */ import_react2.default.createElement(
    "div",
    {
      style: base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick
    },
    horizontal && aside && /* @__PURE__ */ import_react2.default.createElement("div", { style: asideStyle }, aside),
    !horizontal && image && /* @__PURE__ */ import_react2.default.createElement("img", { src: image, alt: title, style: { width: "100%", height: 110, objectFit: "cover", display: "block" } }),
    !horizontal && imagePlaceholder && /* @__PURE__ */ import_react2.default.createElement("div", { style: { width: "100%", height: 110, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" } }, imagePlaceholder),
    /* @__PURE__ */ import_react2.default.createElement("div", { style: bodyStyle }, variant === "profile" && avatar && /* @__PURE__ */ import_react2.default.createElement("div", { style: avatarStyle }, avatar), title && /* @__PURE__ */ import_react2.default.createElement("div", { style: titleStyle }, title), variant === "profile" && role && /* @__PURE__ */ import_react2.default.createElement("div", { style: { fontSize: 12, color: "#999", marginTop: 2 } }, role), description && /* @__PURE__ */ import_react2.default.createElement("div", { style: descStyle }, description), stats && /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { style: { fontSize: 26, fontWeight: 500, color: "#111", marginTop: 4 } }, stats.value), stats.delta && /* @__PURE__ */ import_react2.default.createElement("div", { style: { fontSize: 12, color: stats.deltaColor || "#16a34a", marginTop: 4 } }, stats.delta)), badge && /* @__PURE__ */ import_react2.default.createElement("div", { style: badgeStyle }, badge)),
    footer && /* @__PURE__ */ import_react2.default.createElement("div", { style: footerStyle }, footer)
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card
});
