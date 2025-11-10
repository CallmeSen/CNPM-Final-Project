"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaEye } from "react-icons/fa";
import axios from "axios";

import styles from "../../styles/customerOrders.module.css";

type OrderItem = {
  foodId: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  restaurantId: string;
  deliveryAddress: string;
  status: string;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  items: OrderItem[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return currencyFormatter.format(0);
  }
  return currencyFormatter.format(Number(value));
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Date not available";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch (error) {
    console.error("Failed to format date", error);
    return value;
  }
};

const statusClassMap = {
  pending: styles.statusPending,
  confirmed: styles.statusConfirmed,
  preparing: styles.statusPreparing,
  "out for delivery": styles.statusOutForDelivery,
  delivered: styles.statusDelivered,
  canceled: styles.statusCanceled,
};

const resolveStatusClass = (status?: string) => {
  if (!status) {
    return styles.statusDefault;
  }
  const key = status.toLowerCase() as keyof typeof statusClassMap;
  return statusClassMap[key] ?? styles.statusDefault;
};

const CustomerOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/auth/login");
          return;
        }

        const response = await axios.get<Order[]>(
          "/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const sortedOrders = [...response.data].sort((a, b) => {
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        });

        setOrders(sortedOrders);
      } catch (fetchError) {
        console.error("Error fetching orders:", fetchError);
        if (axios.isAxiosError(fetchError)) {
          setError(
            fetchError.response?.data?.message ??
              "Failed to load orders. Please try again.",
          );
        } else {
          setError("Failed to load orders. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, [navigate]);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return orders;
    }

    return orders.filter((order) => {
      const restaurantMatch = order.restaurantId
        ?.toLowerCase()
        .includes(query);
      const addressMatch = order.deliveryAddress
        ?.toLowerCase()
        .includes(query);
      const orderIdMatch = order._id?.toLowerCase().includes(query);
      return restaurantMatch || addressMatch || orderIdMatch;
    });
  }, [orders, searchQuery]);

  const totalSpent = useMemo(
    () =>
      filteredOrders.reduce(
        (sum, order) => sum + (Number(order.totalPrice) || 0),
        0,
      ),
    [filteredOrders],
  );

  const completedOrders = useMemo(
    () =>
      filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "delivered",
      ).length,
    [filteredOrders],
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
          aria-label="Go back"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className={styles.titleGroup}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.subtitle}>
            Track every order and revisit your favourite meals whenever you
            want.
          </p>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryBadge}>
            <strong>{filteredOrders.length}</strong> orders
          </span>
          <span className={styles.summaryBadge}>
            <strong>{completedOrders}</strong> delivered
          </span>
          <span className={styles.summaryBadge}>
            <strong>{formatCurrency(totalSpent)}</strong> spent
          </span>

          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={styles.searchInput}
              placeholder="Search by restaurant, address, or order ID"
              aria-label="Search orders"
            />
          </div>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {loading ? (
          <div className={styles.loading}>Loading your orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No orders found</p>
            <p>
              {searchQuery
                ? "Try a different search term."
                : "You have not placed any orders yet. Explore restaurants to get started."}
            </p>
            <Link to="/">
              <button type="button" className={styles.primaryButton}>
                Explore Restaurants
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {filteredOrders.map((order) => (
              <article key={order._id} className={styles.orderCard}>
                <header className={styles.cardHeader}>
                  <div className={styles.cardMeta}>
                    <h2 className={styles.cardTitle}>
                      Order #{order._id?.slice(-8).toUpperCase()}
                    </h2>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <span className={`${styles.statusChip} ${resolveStatusClass(order.status)}`}>
                    {order.status ?? "Pending"}
                  </span>
                </header>

                <section className={styles.cardBody}>
                  <div>
                    <span className={styles.metaLabel}>Restaurant</span>
                    <span>{order.restaurantId || "Not specified"}</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Delivery address</span>
                    <span>{order.deliveryAddress || "Not provided"}</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Items</span>
                    <span>
                      {order.items?.length
                        ? `${order.items.length} item${
                            order.items.length > 1 ? "s" : ""
                          }`
                        : "No items recorded"}
                    </span>
                  </div>
                </section>

                {!!order.items?.length && (
                  <table className={styles.itemsTable}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={`${order._id}-item-${index}`}>
                          <td>{item.foodId || "Item"}</td>
                          <td>{item.quantity ?? 0}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <footer className={styles.cardFooter}>
                  <span className={styles.total}>
                    Total {formatCurrency(order.totalPrice)}
                  </span>
                  <Link to={`/customer/order-details/${order._id}`}>
                    <button type="button" className={styles.primaryButton}>
                      <FaEye />
                      View details
                    </button>
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderHistory;
