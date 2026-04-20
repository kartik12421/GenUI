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
  Card: () => Card,
  ProfileCard: () => ProfileCard
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.jsx
var import_react = __toESM(require("react"));
var Button = ({
  label = "Click Me",
  onClick = () => {
  },
  variant = "solid",
  // solid | outline | ghost | soft
  color = "primary",
  // primary | danger | success | warning | neutral
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null
}) => {
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const [pressed, setPressed] = (0, import_react.useState)(false);
  const colors = {
    primary: { base: "#111", text: "#fff" },
    danger: { base: "#e63946", text: "#fff" },
    success: { base: "#2a9d8f", text: "#fff" },
    warning: { base: "#f4a261", text: "#000" },
    neutral: { base: "#6c757d", text: "#fff" }
  };
  const c = colors[color] || colors.primary;
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13, radius: 8 },
    md: { padding: "12px 24px", fontSize: 15, radius: 10 },
    lg: { padding: "16px 36px", fontSize: 17, radius: 12 }
  };
  const s = sizes[size];
  const variants = {
    solid: {
      bg: c.base,
      text: c.text,
      border: "none"
    },
    outline: {
      bg: "transparent",
      text: c.base,
      border: `2px solid ${c.base}`
    },
    ghost: {
      bg: "transparent",
      text: c.base,
      border: "none"
    },
    soft: {
      bg: c.base + "20",
      text: c.base,
      border: "none"
    }
  };
  const v = variants[variant];
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
    transform: pressed ? "scale(0.96)" : hovered && !disabled ? "scale(1.04)" : "scale(1)",
    boxShadow: variant === "solid" && !disabled ? hovered ? `0 10px 25px ${c.base}55` : `0 4px 10px ${c.base}33` : "none",
    transition: "all 0.18s ease",
    position: "relative"
  };
  const shim = {
    position: "absolute",
    top: 0,
    left: hovered && !disabled ? "120%" : "-60%",
    width: "50%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.4s ease"
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      style,
      onClick: !disabled && !loading ? onClick : void 0,
      onMouseEnter: () => !disabled && setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => !disabled && setPressed(true),
      onMouseUp: () => setPressed(false),
      disabled: disabled || loading
    },
    /* @__PURE__ */ import_react.default.createElement("span", { style: shim }),
    loading ? /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 12 } }, "Loading...") : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, icon && /* @__PURE__ */ import_react.default.createElement("span", null, icon), label)
  );
};

// src/components/Card/Card.jsx
var import_react2 = __toESM(require("react"));
var Card = ({
  subtitle = "Subtitle",
  title = "Card Title",
  description = "Description",
  tag = null,
  disabled = false,
  selectable = false,
  onSelect = () => {
  },
  showActions = false,
  variant = "default",
  // default | outlined | elevated | ghost | filled
  color = "blue",
  // blue | red | green | yellow | gray
  size = "md",
  // sm | md | lg
  width = 260
}) => {
  const [hovered, setHovered] = (0, import_react2.useState)(false);
  const [pressed, setPressed] = (0, import_react2.useState)(false);
  const [selected, setSelected] = (0, import_react2.useState)(false);
  const [liked, setLiked] = (0, import_react2.useState)(false);
  const [bookmarked, setBookmarked] = (0, import_react2.useState)(false);
  const sizes = {
    sm: { padding: "1rem", title: 14, desc: 12 },
    md: { padding: "1.5rem", title: 18, desc: 13 },
    lg: { padding: "2rem", title: 22, desc: 15 }
  };
  const currentSize = sizes[size];
  const colors = {
    blue: {
      bg: "#1a56db",
      text: "#ffffff",
      border: "#1a56db"
    },
    red: {
      bg: "#e63946",
      text: "#ffffff",
      border: "#e63946"
    },
    green: {
      bg: "#2a9d8f",
      text: "#ffffff",
      border: "#2a9d8f"
    },
    yellow: {
      bg: "#f4a261",
      text: "#000000",
      border: "#f4a261"
    },
    gray: {
      bg: "#f1f1f1",
      text: "#111111",
      border: "#dddddd"
    }
  };
  const currentColor = colors[color] || colors.blue;
  const variants = {
    default: {
      bg: "#ffffff",
      border: "0.5px solid #e0e0e0",
      text: "#111",
      shadow: "none"
    },
    outlined: {
      bg: "transparent",
      border: `1px solid ${currentColor.border}`,
      text: currentColor.border,
      shadow: "none"
    },
    elevated: {
      bg: "#ffffff",
      border: "none",
      text: "#111",
      shadow: "0 8px 20px rgba(0,0,0,0.08)"
    },
    ghost: {
      bg: "transparent",
      border: "none",
      text: "#111",
      shadow: "none"
    },
    filled: {
      bg: currentColor.bg,
      border: `1px solid ${currentColor.border}`,
      text: currentColor.text,
      shadow: "none"
    }
  };
  const currentVariant = variants[variant];
  const handleClick = () => {
    if (disabled) return;
    if (selectable) {
      setSelected((s) => !s);
      onSelect(!selected);
    }
  };
  const cardStyle = {
    background: currentVariant.bg,
    color: currentVariant.text,
    border: selected ? "2px solid #000" : hovered ? "1px solid #aaa" : currentVariant.border,
    boxShadow: variant === "elevated" ? hovered ? "0 12px 30px rgba(0,0,0,0.12)" : currentVariant.shadow : "none",
    borderRadius: 16,
    padding: currentSize.padding,
    width,
    fontFamily: "monospace",
    cursor: selectable && !disabled ? "pointer" : "default",
    transform: pressed ? "scale(0.97)" : hovered && !disabled ? "translateY(-4px)" : "none",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.2s ease"
  };
  const subtitleStyle = {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 6
  };
  const titleStyle = {
    fontSize: currentSize.title,
    margin: "6px 0",
    fontWeight: 500
  };
  const descStyle = {
    fontSize: currentSize.desc,
    opacity: 0.85,
    lineHeight: 1.6
  };
  const footerStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  const tagStyle = {
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 20,
    background: variant === "filled" ? "rgba(255,255,255,0.2)" : "#eee"
  };
  const iconBtn = (active, color2) => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: active ? color2 : "#888",
    background: "#f5f5f5"
  });
  return /* @__PURE__ */ import_react2.default.createElement(
    "div",
    {
      style: cardStyle,
      onClick: handleClick,
      onMouseEnter: () => !disabled && setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => !disabled && setPressed(true),
      onMouseUp: () => setPressed(false)
    },
    /* @__PURE__ */ import_react2.default.createElement("p", { style: subtitleStyle }, subtitle),
    /* @__PURE__ */ import_react2.default.createElement("h2", { style: titleStyle }, title),
    /* @__PURE__ */ import_react2.default.createElement("p", { style: descStyle }, description),
    (tag || showActions) && /* @__PURE__ */ import_react2.default.createElement("div", { style: footerStyle }, tag && /* @__PURE__ */ import_react2.default.createElement("span", { style: tagStyle }, tag), showActions && /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        style: iconBtn(bookmarked, "#1a56db"),
        onClick: (e) => {
          e.stopPropagation();
          setBookmarked((b) => !b);
        }
      },
      "\u{1F516}"
    ), /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        style: iconBtn(liked, "#e63946"),
        onClick: (e) => {
          e.stopPropagation();
          setLiked((l) => !l);
        }
      },
      "\u2764\uFE0F"
    )))
  );
};

// src/components/ProfileCard/ProfileCard.jsx
var import_react3 = __toESM(require("react"));
var ProfileCard = ({
  name = "John Doe",
  role = "Web Developer",
  bio = "Building modern Websites",
  avatar = "https://i.pravatar.cc/150?img=12",
  cover = null,
  stats = [
    { label: "Projects", value: 24 },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: 180 }
  ],
  variant = "elevated",
  // default | outlined | elevated | filled
  color = "primary",
  // primary | danger | success | warning | neutral
  size = "md",
  selectable = false,
  onSelect = () => {
  },
  style = {},
  className = ""
}) => {
  const [hovered, setHovered] = (0, import_react3.useState)(false);
  const [selected, setSelected] = (0, import_react3.useState)(false);
  const [followed, setFollowed] = (0, import_react3.useState)(false);
  const colors = {
    primary: { base: "#111", text: "#fff" },
    danger: { base: "#e63946", text: "#fff" },
    success: { base: "#2a9d8f", text: "#fff" },
    warning: { base: "#f4a261", text: "#000" },
    neutral: { base: "#6c757d", text: "#fff" }
  };
  const c = colors[color];
  const variants = {
    default: {
      bg: "#fff",
      border: "1px solid #e0e0e0",
      text: "#111",
      shadow: "none"
    },
    outlined: {
      bg: "transparent",
      border: `1px solid ${c.base}`,
      text: c.base,
      shadow: "none"
    },
    elevated: {
      bg: "#fff",
      border: "none",
      text: "#111",
      shadow: "0 10px 30px rgba(0,0,0,0.08)"
    },
    filled: {
      bg: c.base,
      border: "none",
      text: c.text,
      shadow: "none"
    }
  };
  const v = variants[variant];
  const sizes = {
    sm: {
      pad: cover ? "80px 16px 20px" : "70px 16px 20px",
      name: 16,
      role: 12
    },
    md: {
      pad: cover ? "90px 24px 28px" : "80px 24px 28px",
      name: 20,
      role: 13
    },
    lg: {
      pad: cover ? "100px 28px 32px" : "90px 28px 32px",
      name: 24,
      role: 14
    }
  };
  const s = sizes[size];
  const handleClick = () => {
    if (!selectable) return;
    setSelected((prev) => !prev);
    onSelect(!selected);
  };
  const secondaryText = variant === "filled" ? "rgba(255,255,255,0.85)" : "#666";
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
    ...style
  };
  const avatarStyle = {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    top: cover ? 60 : 0,
    left: "50%",
    transform: cover ? "translateX(-50%)" : "translate(-50%, -50%)",
    border: `4px solid ${v.bg}`
  };
  return /* @__PURE__ */ import_react3.default.createElement(
    "div",
    {
      style: cardStyle,
      className,
      onClick: handleClick,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    },
    cover && /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          height: 120,
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
      }
    ),
    /* @__PURE__ */ import_react3.default.createElement("div", { style: { padding: s.pad } }, /* @__PURE__ */ import_react3.default.createElement("img", { src: avatar, alt: "avatar", style: avatarStyle }), /* @__PURE__ */ import_react3.default.createElement("h3", { style: { fontSize: s.name, margin: "10px 0 4px" } }, name), /* @__PURE__ */ import_react3.default.createElement("p", { style: { fontSize: s.role, color: secondaryText, margin: 0 } }, role), /* @__PURE__ */ import_react3.default.createElement("p", { style: { fontSize: 13, marginTop: 10, color: secondaryText } }, bio), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20
        }
      },
      stats.map((s2, i) => /* @__PURE__ */ import_react3.default.createElement("div", { key: i }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontWeight: 600 } }, s2.value), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 11, color: secondaryText } }, s2.label)))
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        style: {
          marginTop: 20,
          padding: "10px 22px",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          background: followed ? "#ccc" : c.base,
          color: followed ? "#111" : "#fff"
        },
        onClick: (e) => {
          e.stopPropagation();
          setFollowed((f) => !f);
        }
      },
      followed ? "Following" : "Follow"
    ))
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  ProfileCard
});
