"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/reports.css';

function ReportsAnalytics() {
  const [period, setPeriod] = useState('week'); // day, week, month
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenueData, setRevenueData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    averageRating: 0
  });

  const fetchReportsData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      // Build query params
      let queryParams = `?period=${period}`;
      if (startDate && endDate) {
        queryParams += `&startDate=${startDate}&endDate=${endDate}`;
      }

      // Fetch all data in parallel
      const [revenueRes, topItemsRes, reviewsRes, summaryRes] = await Promise.all([
        fetch(`http://localhost:5002/api/reports/revenue${queryParams}`, { headers }),
        fetch(`http://localhost:5002/api/reports/top-items${queryParams}`, { headers }),
        fetch(`http://localhost:5002/api/reports/reviews?limit=5`, { headers }),
        fetch(`http://localhost:5002/api/reports/summary${queryParams}`, { headers })
      ]);

      if (!revenueRes.ok || !topItemsRes.ok || !reviewsRes.ok || !summaryRes.ok) {
        throw new Error('Failed to fetch reports data');
      }

      const revenueData = await revenueRes.json();
      const topItemsData = await topItemsRes.json();
      const reviewsData = await reviewsRes.json();
      const summaryData = await summaryRes.json();

      setRevenueData(revenueData);
      setTopItems(topItemsData);
      setReviews(reviewsData);
      setSummary(summaryData);

    } catch (error) {
      console.error('Error fetching reports:', error);
      // Fallback to empty data on error
      setRevenueData([]);
      setTopItems([]);
      setReviews([]);
      setSummary({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        averageRating: 0
      });
    }
  }, [period, startDate, endDate]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData, period, startDate, endDate]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Revenue Report', 14, 20);
    
    // Period info
    doc.setFontSize(12);
    doc.text(`Period: ${period.toUpperCase()}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 37);
    
    // Summary
    doc.setFontSize(14);
    doc.text('Summary', 14, 50);
    doc.setFontSize(10);
    doc.text(`Total Revenue: $${summary.totalRevenue.toFixed(2)}`, 14, 58);
    doc.text(`Total Orders: ${summary.totalOrders}`, 14, 65);
    doc.text(`Average Order Value: $${summary.averageOrderValue.toFixed(2)}`, 14, 72);
    doc.text(`Average Rating: ${summary.averageRating.toFixed(1)} ⭐`, 14, 79);
    
    // Revenue table
    doc.setFontSize(14);
    doc.text('Revenue Breakdown', 14, 95);
    doc.autoTable({
      startY: 100,
      head: [['Date', 'Orders', 'Revenue ($)']],
      body: revenueData.map(item => [
        item.date,
        item.orders,
        item.revenue.toFixed(2)
      ])
    });
    
    // Top items table
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Top Selling Items', 14, finalY);
    doc.autoTable({
      startY: finalY + 5,
      head: [['Item', 'Quantity', 'Revenue ($)']],
      body: topItems.map(item => [
        item.name,
        item.quantity,
        item.revenue.toFixed(2)
      ])
    });
    
    doc.save('restaurant-report.pdf');
  };

  const exportToExcel = () => {
    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Summary section
    csvContent += 'SUMMARY\n';
    csvContent += `Total Revenue,$${summary.totalRevenue.toFixed(2)}\n`;
    csvContent += `Total Orders,${summary.totalOrders}\n`;
    csvContent += `Average Order Value,$${summary.averageOrderValue.toFixed(2)}\n`;
    csvContent += `Average Rating,${summary.averageRating.toFixed(1)}\n\n`;
    
    // Revenue section
    csvContent += 'REVENUE BREAKDOWN\n';
    csvContent += 'Date,Orders,Revenue\n';
    revenueData.forEach(item => {
      csvContent += `${item.date},${item.orders},${item.revenue.toFixed(2)}\n`;
    });
    
    csvContent += '\n';
    
    // Top items section
    csvContent += 'TOP SELLING ITEMS\n';
    csvContent += 'Item,Quantity,Revenue\n';
    topItems.forEach(item => {
      csvContent += `${item.name},${item.quantity},${item.revenue.toFixed(2)}\n`;
    });
    
    // Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'restaurant-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>📊 Reports & Analytics</h1>
        <div className="export-buttons">
          <button onClick={exportToPDF} className="btn-export btn-pdf">
            📄 Export PDF
          </button>
          <button onClick={exportToExcel} className="btn-export btn-excel">
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Period:</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>From:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>
        
        <div className="filter-group">
          <label>To:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card card-revenue">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="card-value">${summary.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="summary-card card-orders">
          <div className="card-icon">🛒</div>
          <div className="card-content">
            <h3>Total Orders</h3>
            <p className="card-value">{summary.totalOrders}</p>
          </div>
        </div>
        
        <div className="summary-card card-average">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Avg Order Value</h3>
            <p className="card-value">${summary.averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="summary-card card-rating">
          <div className="card-icon">⭐</div>
          <div className="card-content">
            <h3>Avg Rating</h3>
            <p className="card-value">{summary.averageRating.toFixed(1)}/5</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="chart-section">
        <h2>📈 Revenue Trend</h2>
        <div className="revenue-chart">
          {revenueData.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${(item.revenue / Math.max(...revenueData.map(d => d.revenue))) * 200}px` 
                }}
                title={`$${item.revenue}`}
              >
                <span className="bar-value">${item.revenue}</span>
              </div>
              <span className="chart-label">{item.date.split('-')[2]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="top-items-section">
        <h2>🔥 Top Selling Items</h2>
        <div className="top-items-grid">
          {topItems.map((item, index) => (
            <div key={index} className="top-item-card">
              <div className="item-rank">#{index + 1}</div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <div className="item-stats">
                  <span className="stat">
                    <strong>Quantity:</strong> {item.quantity}
                  </span>
                  <span className="stat">
                    <strong>Revenue:</strong> ${item.revenue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="reviews-section">
        <h2>💬 Customer Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <h4>{review.customer}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              <div className="review-content">
                <p className="review-item">Item: <strong>{review.item}</strong></p>
                <p className="review-comment">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
