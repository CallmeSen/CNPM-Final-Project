"use client";
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import { FaUtensils, FaClipboardList, FaUsers, FaDollarSign, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ backgroundColor: color }}>{icon}</div>
    <div className="stat-card-info">
      <p>{label}</p>
      <h3>{value}</h3>
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
          <h1>Dashboard - Báo cáo Toàn hệ thống</h1>
          <div className="user-profile">
            <strong>Welcome, {superAdminName} 👋</strong>
          </div>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <>
            {/* Main Statistics */}
            <div className="stats-grid">
              <StatCard
                icon={<FaDollarSign />}
                label="Tổng Doanh Thu"
                value={`$${stats.totalRevenue.toFixed(2)}`}
                color="var(--accent-color)"
              />
              <StatCard
                icon={<FaClipboardList />}
                label="Tổng Đơn Hàng"
                value={stats.totalOrders}
                color="var(--secondary-color)"
              />
              <StatCard
                icon={<FaUtensils />}
                label="Tổng Nhà Hàng"
                value={stats.totalRestaurants}
                color="#f7b731"
              />
              <StatCard
                icon={<FaUsers />}
                label="Tổng Khách Hàng"
                value={stats.totalCustomers}
                color="#8e44ad"
              />
            </div>

            {/* Secondary Statistics */}
            <div className="stats-grid-secondary">
               <StatCard
                icon={<FaChartLine />}
                label="Đơn Đang Xử Lý"
                value={stats.pendingOrders}
                color="var(--warning-color)"
              />
              <StatCard
                icon={<FaCheckCircle />}
                label="Đơn Hoàn Thành"
                value={stats.completedOrders}
                color="var(--success-color)"
              />
            </div>

            {/* Analysis Section */}
            <div className="analysis-section">
              {/* Top Performing Restaurants */}
              <div className="content-area">
                <h2>🏆 Top 5 Nhà Hàng Doanh Thu Cao Nhất</h2>
                <table className="analysis-table">
                  <thead>
                    <tr>
                      <th>Nhà Hàng</th>
                      <th>Số Đơn Hàng</th>
                      <th>Doanh Thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRestaurants.map((rest, idx) => (
                      <tr key={idx}>
                        <td>{rest.name}</td>
                        <td>{rest.orders}</td>
                        <td>${rest.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Orders */}
              <div className="content-area">
                <h2>📋 Đơn Hàng Gần Đây</h2>
                <table className="analysis-table">
                  <thead>
                    <tr>
                      <th>Mã Đơn</th>
                      <th>Trạng Thái</th>
                      <th>Giá Trị</th>
                      <th>Thời Gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order._id.slice(-6)}</td>
                        <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights Section */}
            <div className="content-area insights-section">
              <h2>📊 Phân Tích & Xu Hướng</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <h4>Tỷ Lệ Hoàn Thành</h4>
                  <p className="insight-value">
                    {stats.totalOrders > 0 
                      ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) 
                      : 0}%
                  </p>
                  <span className="insight-description">Đơn hàng được hoàn thành thành công</span>
                </div>
                <div className="insight-card">
                  <h4>Doanh Thu Trung Bình/Đơn</h4>
                  <p className="insight-value">
                    ${stats.totalOrders > 0 
                      ? (stats.totalRevenue / stats.totalOrders).toFixed(2) 
                      : 0}
                  </p>
                  <span className="insight-description">Giá trị trung bình mỗi đơn hàng</span>
                </div>
                <div className="insight-card">
                  <h4>Đơn/Nhà Hàng</h4>
                  <p className="insight-value">
                    {stats.totalRestaurants > 0 
                      ? (stats.totalOrders / stats.totalRestaurants).toFixed(1) 
                      : 0}
                  </p>
                  <span className="insight-description">Số đơn trung bình mỗi nhà hàng</span>
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

