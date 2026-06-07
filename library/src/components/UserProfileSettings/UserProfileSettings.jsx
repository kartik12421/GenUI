import React, { useState } from "react";

const alpha = (hex, op) => {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return "rgba(" + r + "," + g + "," + b + "," + op + ")";
};

export const UserProfileSettings = ({
  user = {
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Engineer passionate about building scalable systems.",
    location: "San Francisco, CA"
  },
  accent = "#6366f1",
  bg = "#0f172a",
  onSave = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);

  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "24px", width: "320px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <img src={user.avatar} alt={user.name} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: 0 }}>{user.name}</h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{user.email}</p>
          </div>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
            <path d="M12.22 2h-3.44a3 3 0 0 0-3 3v3.44a1 1 0 0 0 .29.7l7 7a1 1 0 0 0 1.42 0l3.44-3.44a1 1 0 0 0 0-1.42l-7-7a1 1 0 0 0-.7-.29z"/>
            <path d="M16 5l2 2"/>
            <path d="M15 1l4 4"/>
          </svg>
        </button>
      </div>
      {isEditing ? (
        <div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "4px", display: "block" }}>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", minHeight: "80px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "4px", display: "block" }}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px" }}
            />
          </div>
          <button
            onClick={() => { setIsEditing(false); onSave({ bio, location }); }}
            style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: "16px" }}>{bio}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {location}
          </div>
        </div>
      )}
    </div>
  );
};