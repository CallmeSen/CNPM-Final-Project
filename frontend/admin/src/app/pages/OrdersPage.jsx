"use client";
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/OrdersPage.css';
import { FaEye, FaSearch } from 'react-icons/fa';

const StatusBadge = ({ status }) => {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        
        // Fetch orders
        const ordersRes = await fetch('http://localhost:5005/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!ordersRes.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await ordersRes.json();
        
        // Fetch restaurants to map IDs to names
        const restaurantsRes = await fetch('http://localhost:5002/api/superadmin/restaurants', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        let restaurantMap = {};
        if (restaurantsRes.ok) {
          const restaurantsData = await restaurantsRes.json();
          // Create a map of restaurant ID to restaurant name
          restaurantMap = restaurantsData.reduce((map, restaurant) => {
            map[restaurant._id] = restaurant.name;
            return map;
          }, {});
        }

        // Format orders with restaurant names
        const formattedOrders = ordersData.map(order => ({
          id: order._id.slice(-6), // Short ID for display
          customer: order.customerId || 'N/A',
          restaurant: restaurantMap[order.restaurantId] || order.restaurantId || 'N/A',
          items: order.items.length,
          total: order.totalPrice || 0,
          status: order.status,
          date: new Date(order.createdAt).toLocaleString(),
        }));
        setOrders(formattedOrders);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(order => 
      statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase()
    );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Orders</h1>
        </div>
        <div className="content-area">
          <div className="filter-bar">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Delivering">Delivering</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="orders-table-container">
            {loading && <p>Loading orders...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.restaurant}</td>
                      <td>{order.items}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td>{order.date}</td>
                      <td>
                        <button className="view-btn">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
