import React, { useState } from "react";

export const ProductPage = ({
  image = "https://images.unsplash.com/photo-1523275337444-6fea5f4a7e7f?w=600&q=80",
  title = "Wireless Noise Cancelling Headphones",
  price = 299,
  currency = "$",
  description = "Experience premium sound quality with active noise cancellation and long-lasting battery life.",
  rating = 4.5,
  reviewsCount = 1200,
  colors = ["#0ea5e9", "#1e293b", "#e11d48"],
  onAddToCart = () => {},
  onBuyNow = () => {},
  accent = "#6366f1"
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ display: "flex", gap: "40px", maxWidth: "800px", margin: "0 auto", padding: "24px", fontFamily: "system-ui,sans-serif", color: "#fff" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", overflow: "hidden", background: "#1e293b" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>{title}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < rating ? "#facc15" : "rgba(255,255,255,0.1)"} stroke="#facc15" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>({reviewsCount} reviews)</span>
        </div>
        <div style={{ fontSize: "48px", fontWeight: "800", color: accent }}>{currency}{price}</div>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{description}</p>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", color: "rgba(255,255,255,0.8)" }}>Color: {selectedColor}</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {colors.map(color => (
              <button key={color} onClick={() => setSelectedColor(color)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: color, border: "2px solid " + (selectedColor === color ? accent : "transparent"), cursor: "pointer" }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button onClick={onAddToCart} style={{ flex: 1, padding: "16px", borderRadius: "12px", border: "1px solid " + accent, background: "transparent", color: accent, fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Add to Cart</button>
          <button onClick={onBuyNow} style={{ flex: 1, padding: "16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};