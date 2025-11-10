"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import UsersPage from "@/app/pages/UsersPage";

const UsersRoute = () => {
  return (
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  );
};

export default UsersRoute;
