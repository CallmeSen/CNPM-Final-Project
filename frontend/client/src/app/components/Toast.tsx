"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error" | "info" | "warning";
}

const Toast = ({ message, isVisible, onClose, duration = 2000, type = "success" }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "error":
        return "linear-gradient(135deg, #ff4d4d 0%, #f93838 100%)";
      case "warning":
        return "linear-gradient(135deg, #f7b731 0%, #f39c12 100%)";
      case "info":
        return "linear-gradient(135deg, #3498db 0%, #2980b9 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "✅";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        background: getBackgroundColor(),
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        zIndex: 10000,
        fontSize: "16px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "slideInRight 0.3s ease, fadeOut 0.3s ease 1.7s forwards",
        minWidth: "250px",
        maxWidth: "400px",
      }}
    >
      <span style={{ fontSize: "24px" }}>{getIcon()}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "none",
          color: "white",
          fontSize: "18px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
