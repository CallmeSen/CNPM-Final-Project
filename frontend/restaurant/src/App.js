import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Restaurant components
import RestaurantRegister from './components/RestaurantRegister';
import RestaurantLogin from './components/RestaurantLogin';
import RestaurantDashboard from './pages/RestaurantDashboard';
import ReportsAnalytics from './pages/ReportsAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Restaurant routes */}
        <Route path="/" element={<RestaurantLogin />} />
        <Route path="/register" element={<RestaurantRegister />} />
        <Route path="/login" element={<RestaurantLogin />} />
        <Route path="/dashboard" element={<RestaurantDashboard />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
