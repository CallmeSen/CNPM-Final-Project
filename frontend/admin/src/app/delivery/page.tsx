"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import DeliveryPage from "@/app/pages/DeliveryPage";

const DeliveryRoute = () => {
  return (
    <ProtectedRoute>
      <DeliveryPage />
    </ProtectedRoute>
  );
};

export default DeliveryRoute;
