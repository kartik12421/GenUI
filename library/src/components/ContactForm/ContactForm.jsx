import React, { useState } from "react";

export const ContactForm = ({
  title = "Contact Us",
  description = "We're here to help with any questions.",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {},
  buttonText = "Send Message"
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "28px", width: "400px", fontFamily: "system-ui,sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>{title}</h2>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>{description}</p>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, email, message }); }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "#1e293b", color: "#fff", fontSize: "14px", outline: "none" }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "#1e293b", color: "#fff", fontSize: "14px", outline: "none" }}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            style={{ padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "#1e293b", color: "#fff", fontSize: "14px", outline: "none", resize: "none" }}
          />
        </div>
        <button
          type="submit"
          style={{ marginTop: "24px", width: "100%", padding: "12px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
        >{buttonText}</button>
      </form>
    </div>
  );
};