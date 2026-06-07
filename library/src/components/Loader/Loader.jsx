import React, { useRef, useEffect } from "react";

export const Loader = ({ size = 48, color = "#6366f1", thickness = 4, duration = 1.4 }) => {
  const spinnerRef = useRef(null);
  useEffect(() => {
    if (spinnerRef.current) {
      const animation = spinnerRef.current.animate(
        [{
          transform: "rotate(0deg)"
        }, {
          transform: "rotate(360deg)"
        }],
        {
          duration: duration * 1000,
          iterations: Infinity
        }
      );
      return () => animation.cancel();
    }
  }, [duration]);
  return (
    <div
      ref={spinnerRef}
      style={{
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        border: thickness + "px solid " + color,
        borderTopColor: "transparent",
        animation: "spin " + duration + "s linear infinite",
        boxSizing: "border-box"
      }}
    />
  );
};