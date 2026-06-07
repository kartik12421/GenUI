import React, { useState, useEffect, useRef } from "react";

export const AIChat = ({
  messages = [],
  accent = "#6366f1",
  bg = "#0f172a",
  userBg = "#1e293b",
  streaming = false,
  onSend = () => {},
  placeholder = "Ask me anything..."
}) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div style={{ background: bg, borderRadius: "20px", width: "400px", height: "500px", display: "flex", flexDirection: "column", fontFamily: "system-ui,sans-serif", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "12px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: msg.role === "user" ? userBg : alpha(accent, 0.12),
              borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
              padding: "10px 14px",
              maxWidth: "70%",
              color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
              fontSize: "14px",
              lineHeight: 1.5,
              border: msg.role === "user" ? "none" : "1px solid " + alpha(accent, 0.2)
            }}>{msg.content}</div>
          </div>
        ))}
        {streaming && (
          <div style={{ marginBottom: "12px", display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: alpha(accent, 0.12),
              borderRadius: "12px 12px 12px 0",
              padding: "10px 14px",
              maxWidth: "70%",
              color: "rgba(255,255,255,0.85)",
              fontSize: "14px",
              lineHeight: 1.5,
              border: "1px solid " + alpha(accent, 0.2),
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, animation: "pulse 1s infinite" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, animation: "pulse 1s infinite", animationDelay: "0.2s" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, animation: "pulse 1s infinite", animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSend(input)}
            placeholder={placeholder}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />
          <button
            onClick={() => onSend(input)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};