import React, { useState, useEffect } from "react";

export const CustomCursor = ({
  size = 32,
  accent = "#6366f1",
  bg = "rgba(255,255,255,0.1)",
  borderColor = "#6366f1",
  borderWidth = 2,
  opacity = 0.9
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        background: bg,
        border: borderWidth + "px solid " + borderColor,
        boxShadow: "0 0 20px " + alpha(accent, 0.4),
        opacity: opacity,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.08s ease-out, opacity 0.2s",
        zIndex: 9999
      }}
    />
  );
};