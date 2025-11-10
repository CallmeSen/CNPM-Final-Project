"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SuperAdminDashboard from "@/app/pages/SuperAdminDashboard";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <SuperAdminDashboard />
    </ProtectedRoute>
  );
};

export default DashboardPage;
