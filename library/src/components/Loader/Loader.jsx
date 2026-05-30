import React from "react";

export const Loader = ({ size = 40, color = "#6366f1", strokeWidth = 4, speed = 1.5 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "rotate " + speed + "s linear infinite" }}
      >
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stopColor={color} stopOpacity="0" offset="0%" />
            <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
            <stop stopColor={color} offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth={strokeWidth}>
            <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur={speed}
                repeatCount="indefinite"
              />
            </path>
            <circle cx="36" cy="18" r="1" fill={color} />
          </g>
        </g>
      </svg>
    </div>
  );
};