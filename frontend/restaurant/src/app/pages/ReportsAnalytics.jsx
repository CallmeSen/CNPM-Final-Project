"use client";
// @ts-nocheck

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useRouter } from 'next/navigation';
import RestaurantSidebar from '../components/RestaurantSidebar';
import '../styles/rdashboard.css';
import '../styles/reports.css';

const PERIOD_OPTIONS = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

function ReportsAnalytics() {
  const router = useRouter();
  const [period, setPeriod] = useState('week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenueData, setRevenueData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    averageRating: 0,
  });

  const fetchRestaurantProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/restaurant/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRestaurantName(data.name);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }, [router]);

  const fetchReportsData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      let queryParams = `?period=${period}`;
      if (startDate && endDate) {
        queryParams += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const [revenueRes, topItemsRes, reviewsRes, summaryRes] =
        await Promise.all([
          fetch(`/api/reports/revenue${queryParams}`, {
            headers,
          }),
          fetch(`/api/reports/top-items${queryParams}`, {
            headers,
          }),
          fetch(`/api/reports/reviews?limit=5`, {
            headers,
          }),
          fetch(`/api/reports/summary${queryParams}`, {
            headers,
          }),
        ]);

      if (!revenueRes.ok || !topItemsRes.ok || !reviewsRes.ok || !summaryRes.ok) {
        throw new Error('Failed to fetch reports data');
      }

      const revenueData = await revenueRes.json();
      const topItemsData = await topItemsRes.json();
      const reviewsData = await reviewsRes.json();
      const summaryData = await summaryRes.json();

      setRevenueData(revenueData ?? []);
      setTopItems(topItemsData ?? []);
      setReviews(reviewsData ?? []);
      setSummary(summaryData ?? {});
    } catch (error) {
      setRevenueData([]);
      setTopItems([]);
      setReviews([]);
      setSummary({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        averageRating: 0,
      });
    }
  }, [period, startDate, endDate, router]);

  useEffect(() => {
    fetchRestaurantProfile();
    fetchReportsData();
  }, [fetchRestaurantProfile, fetchReportsData]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    [],
  );

  const summaryCards = useMemo(
    () => [
      {
        key: 'revenue',
        label: 'Total Revenue',
        value: currencyFormatter.format(summary.totalRevenue ?? 0),
        tone: 'primary',
        icon: '💰',
        helper: 'Overall sales for the selected period',
      },
      {
        key: 'orders',
        label: 'Total Orders',
        value: summary.totalOrders ?? 0,
        tone: 'indigo',
        icon: '📦',
        helper: 'Completed transactions',
      },
      {
        key: 'avgOrder',
        label: 'Avg Order Value',
        value: currencyFormatter.format(summary.averageOrderValue ?? 0),
        tone: 'green',
        icon: '💵',
        helper: 'Average revenue per order',
      },
      {
        key: 'rating',
        label: 'Avg Rating',
        value: `${(summary.averageRating ?? 0).toFixed(1)}/5`,
        tone: 'amber',
        icon: '⭐',
        helper: 'Customer satisfaction',
      },
    ],
    [currencyFormatter, summary],
  );

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Revenue Report', 14, 20);

    doc.setFontSize(12);
    doc.text(`Period: ${period.toUpperCase()}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 37);

    doc.setFontSize(14);
    doc.text('Summary', 14, 50);
    doc.setFontSize(10);
    doc.text(
      `Total Revenue: ${currencyFormatter.format(summary.totalRevenue ?? 0)}`,
      14,
      58,
    );
    doc.text(`Total Orders: ${summary.totalOrders ?? 0}`, 14, 65);
    doc.text(
      `Average Order Value: ${currencyFormatter.format(
        summary.averageOrderValue ?? 0,
      )}`,
      14,
      72,
    );
    doc.text(
      `Average Rating: ${(summary.averageRating ?? 0).toFixed(1)} / 5`,
      14,
      79,
    );

    doc.setFontSize(14);
    doc.text('Revenue Breakdown', 14, 95);
    doc.autoTable({
      startY: 100,
      head: [['Date', 'Orders', 'Revenue']],
      body: revenueData.map((item) => [
        item.date,
        item.orders,
        currencyFormatter.format(item.revenue ?? 0),
      ]),
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Top Selling Items', 14, finalY);
    doc.autoTable({
      startY: finalY + 5,
      head: [['Item', 'Quantity', 'Revenue']],
      body: topItems.map((item) => [
        item.name,
        item.quantity,
        currencyFormatter.format(item.revenue ?? 0),
      ]),
    });

    doc.save('restaurant-report.pdf');
  };

  const exportToExcel = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Summary\n';
    csvContent += `Total Revenue,${summary.totalRevenue}\n`;
    csvContent += `Total Orders,${summary.totalOrders}\n`;
    csvContent += `Average Order Value,${summary.averageOrderValue}\n`;
    csvContent += `Average Rating,${summary.averageRating}\n\n`;

    csvContent += 'Revenue Breakdown\n';
    csvContent += 'Date,Orders,Revenue\n';
    revenueData.forEach((item) => {
      csvContent += `${item.date},${item.orders},${item.revenue}\n`;
    });

    csvContent += '\nTop Selling Items\n';
    csvContent += 'Item,Quantity,Revenue\n';
    topItems.forEach((item) => {
      csvContent += `${item.name},${item.quantity},${item.revenue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'restaurant-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxRevenue = useMemo(
    () =>
      Math.max(
        ...revenueData.map((item) => item.revenue || 0),
        1, // avoid division by zero
      ),
    [revenueData],
  );

  const formatDateLabel = (value) =>
    new Date(value).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'short',
    });

  return (
    <div className="dashboard-container reports-dashboard">
      <RestaurantSidebar activeKey="reports" userName={restaurantName} />

      <div className="dashboard-content reports-content">

        <div className="reports-container">
          <div className="reports-header">
            <div className="reports-title">
              <h1>Reports &amp; Analytics</h1>
              <p>Track performance and understand your restaurant at a glance.</p>
            </div>
            <div className="export-buttons">
              <button className="btn-export btn-excel" onClick={exportToExcel}>
                Export CSV
              </button>
              <button className="btn-export btn-pdf" onClick={exportToPDF}>
                Export PDF
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Preset</label>
              <div className="filter-pill-group">
                {PERIOD_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`filter-pill ${period === option.value ? 'is-active' : ''}`}
                    onClick={() => setPeriod(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>From</label>
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>To</label>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="summary-cards">
            {summaryCards.map((card) => (
              <div
                key={card.key}
                className={`summary-card summary-card--${card.tone}`}
              >
                <div className="card-icon-wrapper">
                  <span>{card.icon}</span>
                </div>
                <div className="card-content">
                  <h3>{card.label}</h3>
                  <p className="card-value">{card.value}</p>
                  <span className="card-helper">{card.helper}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chart-section">
            <div className="section-heading">
              <h2>Revenue Trend</h2>
              <span className="section-subheading">
                Daily performance for the selected period
              </span>
            </div>
            <div className="revenue-chart">
              {revenueData.length > 0 ? (
                revenueData.map((item, index) => {
                  const height = Math.max((item.revenue / maxRevenue) * 220, 8);
                  return (
                    <div key={index} className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{ height: `${height}px` }}
                        title={currencyFormatter.format(item.revenue ?? 0)}
                      >
                        <span className="bar-value">
                          {currencyFormatter.format(item.revenue ?? 0)}
                        </span>
                      </div>
                      <span className="chart-label">
                        {formatDateLabel(item.date)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="empty-state">
                  <p>No revenue data available for this window.</p>
                </div>
              )}
            </div>
          </div>

          <div className="top-items-section">
            <div className="section-heading">
              <h2>Top Selling Items</h2>
              <span className="section-subheading">
                Your best performing dishes ranked by revenue
              </span>
            </div>
            {topItems.length > 0 ? (
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
                          <strong>Revenue:</strong>{' '}
                          {currencyFormatter.format(item.revenue ?? 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No top items to display yet.</p>
              </div>
            )}
          </div>

          <div className="reviews-section">
            <div className="section-heading">
              <h2>Customer Reviews</h2>
              <span className="section-subheading">
                Latest feedback gathered from diners
              </span>
            </div>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {review.customer.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4>{review.customer}</h4>
                          <span className="review-date">
                            {new Date(review.date).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="review-rating">
                        {'?'.repeat(review.rating).padEnd(5, '?')}
                      </div>
                    </div>
                    <div className="review-content">
                      <p className="review-item">
                        Item: <strong>{review.item}</strong>
                      </p>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No customer reviews available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsAnalytics;







