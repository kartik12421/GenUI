import React, { useState, useCallback } from "react";

export const FileUpload = ({
  accept = "image/*",
  maxSize = 5000000,
  label = "Drag & Drop",
  accent = "#6366f1",
  bg = "#0f172a",
  onUpload = () => {}
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else {
      setDragging(false);
    }
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);
  const handleFile = (file) => {
    if (file.size > maxSize) {
      setError("File size exceeds limit");
      return;
    }
    if (!file.type.match(accept)) {
      setError("Invalid file type");
      return;
    }
    setFile(file);
    setError(null);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onUpload(file);
          return prev;
        }
        return prev + 1;
      });
    }, 10);
  };
  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      style={{
        background: bg,
        borderRadius: "16px",
        border: "1px dashed " + (dragging ? accent : "rgba(255,255,255,0.12)"),
        padding: "20px",
        width: "280px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        transition: "border-color 0.2s",
        position: "relative"
      }}
    >
      {file ? (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "1px solid " + alpha(accent, 0.2)
            }}
          />
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "6px", wordBreak: "break-word" }}>{file.name}</div>
          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden", marginTop: "8px" }}>
            <div style={{ width: progress + "%", height: "100%", background: accent, borderRadius: "4px", transition: "width 0.1s" }} />
          </div>
        </>
      ) : (
        <>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: "500" }}>{label}</div>
          {error && (
            <div style={{ fontSize: "12px", color: "#e11d48", marginTop: "6px", textAlign: "center" }}>{error}</div>
          )}
        </>
      )}
    </div>
  );
};