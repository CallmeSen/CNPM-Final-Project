"use client";

import { useEffect } from "react";

export default function AuthLayout() {
  useEffect(() => {
    // Redirect to root, React Router will handle the actual routing
    const currentPath = window.location.pathname;
    if (currentPath !== "/") {
      window.location.href = "/" + currentPath;
    }
  }, []);

  return null;
}
