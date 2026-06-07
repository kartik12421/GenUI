import React, { useState } from "react";

export const AuthForm = ({
  mode = "login",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {},
  onForgotPassword = () => {},
  onSocialLogin = () => {},
  onModeChange = () => {}
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "28px", width: "320px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={() => onModeChange("login")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: mode === "login" ? alpha(accent, 0.12) : "transparent",
            color: mode === "login" ? accent : "rgba(255,255,255,0.5)",
            fontWeight: mode === "login" ? "700" : "500",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          Login
        </button>
        <button
          onClick={() => onModeChange("signup")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: mode === "signup" ? alpha(accent, 0.12) : "transparent",
            color: mode === "signup" ? accent : "rgba(255,255,255,0.5)",
            fontWeight: mode === "signup" ? "700" : "500",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          Signup
        </button>
      </div>
      <form onSubmit={e => { e.preventDefault(); onSubmit({ email, password }); }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "inherit"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "inherit"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "13px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" ,
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
          {mode === "login" && (
            <button
              onClick={onForgotPassword}
              style={{
                background: "transparent",
                border: "none",
                color: accent,
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "center"
              }}
            >
              Forgot Password?
            </button>
          )}
        </div>
      </form>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0 12px" }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>OR</div>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={() => onSocialLogin("google")}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          Continue with Google
        </button>
        <button
          onClick={() => onSocialLogin("github")}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};