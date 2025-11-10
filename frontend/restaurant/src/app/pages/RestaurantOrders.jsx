"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantSidebar from '../components/RestaurantSidebar';
import '../styles/rdashboard.css';
import '../styles/orders.css';

const ORDER_STATUS_OPTIONS = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Canceled',
];

const PAYMENT_STATUS_MAP = {
  Pending: { color: '#ff9800', label: 'Pending' },
  Paid: { color: '#4CAF50', label: 'Paid' },
  Failed: { color: '#f44336', label: 'Failed' },
};

function RestaurantOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, delivered
  const [restaurantName, setRestaurantName] = useState('');

  const fetchRestaurantProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5002/api/restaurant/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRestaurantName(data.name);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5005/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurantProfile();
    fetchOrders();
  }, [fetchRestaurantProfile, fetchOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5005/api/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      await fetchOrders(); // Refresh
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5005/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }

      await fetchOrders(); // Refresh
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment status');
    }
  };

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    if (filter === 'pending')
      return orders.filter((o) => o.status === 'Pending');
    if (filter === 'confirmed')
      return orders.filter((o) => o.status === 'Confirmed');
    if (filter === 'delivered')
      return orders.filter((o) => o.status === 'Delivered');
    return orders;
  }, [orders, filter]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    []
  );

  return (
    <div className="dashboard-container orders-dashboard">
      <RestaurantSidebar activeKey="orders" userName={restaurantName} />

      <div className="dashboard-content orders-content">
        <div className="orders-container">
          <div className="orders-header">
            <div className="orders-title">
              <h1>Restaurant Orders</h1>
              <p>Manage and track all your restaurant orders</p>
            </div>
            <button className="btn-refresh" onClick={fetchOrders}>
              🔄 Refresh
            </button>
          </div>

          <div className="filters-section">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({orders.length})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({orders.filter((o) => o.status === 'Pending').length})
            </button>
            <button
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({orders.filter((o) => o.status === 'Confirmed').length})
            </button>
            <button
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered ({orders.filter((o) => o.status === 'Delivered').length})
            </button>
          </div>

          {loading ? (
            <div className="loading-state">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>📦 No orders found</p>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order._id.slice(-8)}</h3>
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="order-badges">
                      <span className="badge status-badge">{order.status}</span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="order-items">
                      <strong>Items:</strong>
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.quantity}x - {currencyFormatter.format(item.price)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-info-row">
                      <div>
                        <strong>Delivery Address:</strong>
                        <p>{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <strong>Total:</strong>
                        <p className="order-total">
                          {currencyFormatter.format(order.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="order-actions">
                    <div className="action-group">
                      <label>Order Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="status-select"
                      >
                        {ORDER_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantOrders;
