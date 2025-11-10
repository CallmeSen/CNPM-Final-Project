"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SettingsPage from "@/app/pages/SettingsPage";

const SettingsRoute = () => {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
};

export default SettingsRoute;
