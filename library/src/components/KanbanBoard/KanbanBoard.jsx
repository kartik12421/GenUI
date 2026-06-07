import React, { useState } from "react";

export const KanbanBoard = ({ columns = ["To Do", "In Progress", "Done"], tasks = [], accent = "#6366f1", bg = "#0f172a" }) => {
  const [board, setBoard] = useState(tasks);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, column) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = board.map(task => {
      if (task.id === taskId) {
        return { ...task, column };
      }
      return task;
    });
    setBoard(updatedTasks);
  };
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", width: "100%", minHeight: "400px", background: bg, borderRadius: "20px", fontFamily: "system-ui,sans-serif" }}>
      {columns.map(column => (
        <div key={column} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column)} style={{ flex: 1, background: alpha(accent, 0.07), borderRadius: "12px", padding: "12px", border: "1px solid " + alpha(accent, 0.1) }}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>{column}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {board.filter(task => task.column === column).map(task => (
              <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)} style={{ background: alpha(accent, 0.12), padding: "12px", borderRadius: "8px", border: "1px solid " + alpha(accent, 0.2), cursor: "move" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff", marginBottom: "4px" }}>{task.title}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{task.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};