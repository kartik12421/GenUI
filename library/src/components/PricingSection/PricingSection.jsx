import React, { useState } from "react";

export const PricingSection = ({
  accent = "#6366f1",
  bg = "#0f172a",
  monthlyPlans = [
    {
      name: "Basic",
      price: 19,
      period: "per month",
      features: ["Up to 5 projects", "Basic support", "Limited analytics"]
    },
    {
      name: "Pro",
      price: 49,
      period: "per month",
      features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom integrations"]
    }
  ],
  yearlyPlans = [
    {
      name: "Basic",
      price: 190,
      period: "per year",
      features: ["Up to 5 projects", "Basic support", "Limited analytics"]
    },
    {
      name: "Pro",
      price: 490,
      period: "per year",
      features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom integrations"]
    }
  ],
  enterpriseText = "Need more? Contact us for enterprise plans.",
  onEnterpriseClick = () => {}
}) => {
  const [isMonthly, setIsMonthly] = useState(true);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, padding: "40px 20px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", width: "720px", margin: "0 auto", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
        <button
          onClick={() => setIsMonthly(true)}
          style={{
            padding: "8px 24px",
            borderRadius: "12px",
            border: "none",
            background: isMonthly ? accent : "transparent",
            color: isMonthly ? "#fff" : "rgba(255,255,255,0.5)",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >Monthly</button>
        <button
          onClick={() => setIsMonthly(false)}
          style={{
            padding: "8px 24px",
            borderRadius: "12px",
            border: "none",
            background: !isMonthly ? accent : "transparent",
            color: !isMonthly ? "#fff" : "rgba(255,255,255,0.5)",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >Yearly</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
        {(isMonthly ? monthlyPlans : yearlyPlans).map((plan, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid " + alpha(accent, 0.15),
            color: "#fff",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>{plan.name}</div>
            <div style={{ fontSize: "32px", fontWeight: "800", marginBottom: "4px" }}>$ {plan.price}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>{plan.period}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: alpha(accent, 0.18), border: "1px solid " + alpha(accent, 0.4), flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,6 4.5,9 10.5,3" /></svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" ,
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit"
            }}>Get Started</button>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={onEnterpriseClick}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1px solid " + alpha(accent, 0.3),
            background: "transparent",
            color: accent,
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >{enterpriseText}</button>
      </div>
    </div>
  );
};