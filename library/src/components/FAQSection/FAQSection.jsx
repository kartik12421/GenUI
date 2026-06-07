import React, { useState } from "react";

export const FAQSection = ({
  questions = [
    { question: "How do I get started?", answer: "Simply sign up and follow the onboarding process." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards and PayPal." },
    { question: "Can I cancel my subscription?", answer: "Yes, you can cancel anytime from your account settings." }
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  searchPlaceholder = "Search FAQs..."
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "24px", fontFamily: "system-ui,sans-serif", width: "600px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "#fff",
          fontSize: "14px",
          marginBottom: "20px",
          fontFamily: "inherit"
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {filteredQuestions.map((q, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{q.question}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: activeIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {activeIndex === i && (
              <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{q.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};