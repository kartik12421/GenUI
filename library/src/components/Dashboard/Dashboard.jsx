import React from "react";

export const Dashboard = ({
  username = "John Doe",
  profilePhoto = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80",
  stats = [{
    label: "Total Users",
    value: 1280,
    change: 12,
    accent: "#6366f1"
  }],
  activities = [{
    timestamp: "2 hours ago",
    description: "New user registered",
    accent: "#059669"
  }],
  analyticsData = [{
    label: "January",
    value: 65
  }],
  accent = "#6366f1",
  bg = "#0f172a"
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, minHeight: "400px", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <img src={profilePhoto} alt={username} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{username}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>Admin</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid " + alpha(stat.accent, 0.2) }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>{stat.label}</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: stat.change > 0 ? "#059669" : "#e11d48" }}>{stat.change > 0 ? "+" : ""}{stat.change}%</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
        <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid " + alpha(accent, 0.2) }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Analytics</div>
          <div style={{ height: "200px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }} />
        </div>
        <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid " + alpha(accent, 0.2) }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>Activity Feed</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activities.map((activity, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: activity.accent }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{activity.description}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginLeft: "auto" }}>{activity.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};