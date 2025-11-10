"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import OrdersPage from "@/app/pages/OrdersPage";

const OrdersRoute = () => {
  return (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  );
};

export default OrdersRoute;
