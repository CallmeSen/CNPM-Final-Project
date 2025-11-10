"use client";
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import { FaUtensils, FaClipboardList, FaUsers, FaDollarSign, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const StatCard = ({ icon, label, value, color, trend, trendValue }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className="stat-card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      {trend && (
        <span className={`stat-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
      )}
    </div>
    <div className="stat-card-body">
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

function SuperAdminDashboard() {
  const [superAdminName, setSuperAdminName] = useState('');
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem('superAdminName');
    if (name) setSuperAdminName(name);

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Fetch all orders
      const ordersRes = await fetch('http://localhost:5005/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      // Fetch all restaurants
      const restaurantsRes = await fetch('http://localhost:5002/api/superadmin/restaurants', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      let ordersData = [];
      let restaurantsData = [];
      let totalRevenue = 0;
      let pendingCount = 0;
      let completedCount = 0;

      if (ordersRes.ok) {
        ordersData = await ordersRes.json();
        
        // Calculate statistics
        totalRevenue = ordersData.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        pendingCount = ordersData.filter(o => o.status === 'Pending').length;
        completedCount = ordersData.filter(o => o.status === 'Delivered' || o.status === 'Completed').length;
        
        // Get recent orders (last 5)
        const recent = ordersData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentOrders(recent);
      }

      if (restaurantsRes.ok) {
        restaurantsData = await restaurantsRes.json();
        
        // Calculate orders per restaurant for top performers
        const restaurantOrderCounts = {};
        const restaurantRevenue = {};
        
        ordersData.forEach(order => {
          const restId = order.restaurantId;
          restaurantOrderCounts[restId] = (restaurantOrderCounts[restId] || 0) + 1;
          restaurantRevenue[restId] = (restaurantRevenue[restId] || 0) + (order.totalPrice || 0);
        });
        
        // Create top restaurants list
        const topRest = restaurantsData
          .map(rest => ({
            name: rest.name,
            orders: restaurantOrderCounts[rest._id] || 0,
            revenue: restaurantRevenue[rest._id] || 0,
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);
        
        setTopRestaurants(topRest);
      }

      setStats({
        totalRestaurants: restaurantsData.length,
        totalOrders: ordersData.length,
        totalRevenue: totalRevenue,
        totalCustomers: new Set(ordersData.map(o => o.customerId)).size, // Unique customers
        pendingOrders: pendingCount,
        completedOrders: completedCount,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="dashboard-subtitle">Welcome back, {superAdminName} 👋</p>
          </div>
          <button className="refresh-btn" onClick={fetchDashboardData}>
            <FaChartLine /> Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Main Statistics */}
            <div className="stats-grid">
              <StatCard
                icon={<FaDollarSign />}
                label="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                color="#10b981"
                trend="up"
                trendValue="12.5%"
              />
              <StatCard
                icon={<FaClipboardList />}
                label="Total Orders"
                value={stats.totalOrders.toLocaleString()}
                color="#6366f1"
                trend="up"
                trendValue="8.2%"
              />
              <StatCard
                icon={<FaUtensils />}
                label="Restaurants"
                value={stats.totalRestaurants}
                color="#f59e0b"
              />
              <StatCard
                icon={<FaUsers />}
                label="Customers"
                value={stats.totalCustomers.toLocaleString()}
                color="#8e44ad"
                trend="up"
                trendValue="5.1%"
              />
            </div>

            {/* Secondary Statistics */}
            <div className="stats-grid-secondary">
               <StatCard
                icon={<FaChartLine />}
                label="Pending Orders"
                value={stats.pendingOrders}
                color="#f59e0b"
              />
              <StatCard
                icon={<FaCheckCircle />}
                label="Completed Orders"
                value={stats.completedOrders}
                color="#22c55e"
              />
            </div>

            {/* Analysis Section */}
            <div className="analysis-section">
              {/* Top Performing Restaurants */}
              <div className="content-area">
                <h2>🏆 Top Performing Restaurants</h2>
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Restaurant</th>
                        <th>Orders</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topRestaurants.map((rest, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="restaurant-cell">
                              <span className="rank-badge">#{idx + 1}</span>
                              {rest.name}
                            </div>
                          </td>
                          <td><span className="badge badge-blue">{rest.orders}</span></td>
                          <td className="revenue-cell">${rest.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="content-area">
                <h2>📋 Recent Orders</h2>
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td><code>#{order._id.slice(-6)}</code></td>
                          <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                          <td className="revenue-cell">${order.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="date-cell">{new Date(order.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="content-area insights-section">
              <h2>📊 Business Insights</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-icon">✅</div>
                  <h4>Completion Rate</h4>
                  <p className="insight-value">
                    {stats.totalOrders > 0 
                      ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) 
                      : 0}%
                  </p>
                  <span className="insight-description">Successfully completed orders</span>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">💰</div>
                  <h4>Average Order Value</h4>
                  <p className="insight-value">
                    ${stats.totalOrders > 0 
                      ? (stats.totalRevenue / stats.totalOrders).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                      : 0}
                  </p>
                  <span className="insight-description">Revenue per order</span>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">📈</div>
                  <h4>Orders per Restaurant</h4>
                  <p className="insight-value">
                    {stats.totalRestaurants > 0 
                      ? (stats.totalOrders / stats.totalRestaurants).toFixed(1) 
                      : 0}
                  </p>
                  <span className="insight-description">Average orders per restaurant</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default SuperAdminDashboard;

