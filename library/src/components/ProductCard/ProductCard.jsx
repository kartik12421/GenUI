import React, { useState } from "react";

export const ProductCard = ({
  image = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name = "Wireless Headphones",
  price = 129.99,
  currency = "$",
  rating = 4.5,
  accent = "#06b6d4",
  bg = "#0f172a",
  onAddToCart = () => {},
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        overflow: "hidden",
        width: "260px",
        border:
          "1px solid " +
          (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            padding: "4px 10px",
            borderRadius: "20px",
            background: alpha(accent, 0.85),
            fontSize: "10px",
            fontWeight: "700",
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {rating} ★
        </div>
      </div>
      <div style={{ padding: "18px" }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 8px",
            lineHeight: 1.4,
          }}
        >
          {name}
        </h3>
        <div
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.65,
            margin: "0 0 18px",
          }}
        >
          {currency}
          {price.toFixed(2)}
        </div>
        <button
          onClick={onAddToCart}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: "12px",
            border: "none",
            background:
              "linear-gradient(135deg, " +
              accent +
              ", " +
              alpha(accent, 0.7) +
              ")",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
