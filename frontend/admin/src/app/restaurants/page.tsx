"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import RestaurantsPage from "@/app/pages/RestaurantsPage";

const RestaurantsRoute = () => {
  return (
    <ProtectedRoute>
      <RestaurantsPage />
    </ProtectedRoute>
  );
};

export default RestaurantsRoute;
