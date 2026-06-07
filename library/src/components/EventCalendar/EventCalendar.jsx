import React, { useState } from "react";

export const EventCalendar = ({
  accent = "#6366f1",
  bg = "#0f172a",
  initialDate = new Date(),
  events = [],
  onDateSelect = () => {},
  onEventClick = () => {}
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ width: "14.28%" }} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = date.toDateString() === new Date().toDateString();
      const hasEvent = events.some(event => event.date.toDateString() === date.toDateString());
      days.push(
        <div
          key={i}
          onClick={() => onDateSelect(date)}
          style={{
            width: "14.28%",
            padding: "8px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            background: isToday ? alpha(accent, 0.2) : "transparent",
            color: isToday ? accent : hasEvent ? "#fff" : "rgba(255,255,255,0.7)",
            fontWeight: isToday ? "700" : "500",
            position: "relative"
          }}
        >
          {i}
          {hasEvent && (
            <div style={{ position: "absolute", bottom: "2px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: accent }} />
          )}
        </div>
      );
    }
    return days;
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "20px", width: "320px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={handlePrevMonth} style={{ background: "transparent", border: "none", color: accent, cursor: "pointer", fontSize: "18px", fontWeight: "700" }}>‹</button>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} style={{ background: "transparent", border: "none", color: accent, cursor: "pointer", fontSize: "18px", fontWeight: "700" }}>›</button>
      </div>
      <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} style={{ width: "14.28%", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{day}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {renderCalendar()}
      </div>
      <div style={{ marginTop: "20px" }}>
        {events.map((event, i) => (
          <div
            key={i}
            onClick={() => onEventClick(event)}
            style={{
              background: alpha(accent, 0.1),
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "8px",
              cursor: "pointer",
              border: "1px solid " + alpha(accent, 0.2),
              color: "#fff",
              fontSize: "13px"
            }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};