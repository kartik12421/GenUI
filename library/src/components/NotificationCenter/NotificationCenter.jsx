import React, { useState } from "react";

export const NotificationCenter = ({
  notifications = [
    {
      id: 1,
      title: "New Message",
      description: "You have received a new message from John Doe.",
      timestamp: "2h ago",
      read: false,
      icon: "💬"
    },
    {
      id: 2,
      title: "Payment Received",
      description: "Your payment of $29.99 has been received.",
      timestamp: "5h ago",
      read: true,
      icon: "💰"
    }
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  onNotificationClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "16px", padding: "12px", width: "320px", fontFamily: "system-ui,sans-serif", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
      <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "12px" }}>Notifications</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => onNotificationClick(notification)}
            style={{
              background: notification.read ? "rgba(255,255,255,0.03)" : alpha(accent, 0.08),
              borderRadius: "12px",
              padding: "12px",
              cursor: "pointer",
              border: "1px solid " + (notification.read ? "rgba(255,255,255,0.06)" : alpha(accent, 0.2)),
              transition: "transform 0.2s, box-shadow 0.2s",
              transform: "scale(1)",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: alpha(accent, 0.12), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>{notification.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: notification.read ? "rgba(255,255,255,0.6)" : "#fff" }}>{notification.title}</div>
            </div>
            <div style={{ fontSize: "12px", color: notification.read ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)", lineHeight: 1.4, marginBottom: "4px" }}>{notification.description}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{notification.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};