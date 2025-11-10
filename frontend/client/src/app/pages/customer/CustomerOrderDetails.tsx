"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import axios from "axios";

import styles from "../../styles/customerOrders.module.css";

type OrderItem = {
  foodId: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  customerId: string;
  restaurantId: string;
  deliveryAddress: string;
  totalPrice: number;
  status: string;
  paymentStatus?: string;
  paymentMethod?: string;
  paymentIntentId?: string;
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
    return "Not available";
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

const paymentStatusClassMap = {
  paid: styles.statusDelivered,
  pending: styles.statusPending,
  failed: styles.statusCanceled,
  refunded: styles.statusConfirmed,
};

const resolvePaymentClass = (status?: string) => {
  if (!status) {
    return styles.statusDefault;
  }
  const key = status.toLowerCase() as keyof typeof paymentStatusClassMap;
  return paymentStatusClassMap[key] ?? styles.statusDefault;
};

const CustomerOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError("We could not find that order. Please try again.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth/login");
          return;
        }

        const response = await axios.get<Order>(
          `/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrder(response.data);
      } catch (fetchError) {
        console.error("Failed to load order", fetchError);
        if (axios.isAxiosError(fetchError)) {
          setError(
            fetchError.response?.data?.message ??
              "We could not load this order. Please try again later.",
          );
        } else {
          setError(
            "Something went wrong while loading the order. Please try again.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const itemsTotal = useMemo(() => {
    if (!order?.items?.length) {
      return 0;
    }
    return order.items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (item.quantity ?? 0),
      0,
    );
  }, [order]);

  const itemCount = useMemo(
    () => order?.items?.reduce((count, item) => count + (item.quantity ?? 0), 0) ?? 0,
    [order],
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const displayId = order?._id ?? id ?? "";

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.detailHeader}>
          <button
            type="button"
            onClick={handleBack}
            className={styles.backButton}
            aria-label="Back to previous page"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <div className={styles.detailTitleBlock}>
            <h1 className={styles.title}>Order Details</h1>
            <span className={styles.detailId}>
              Order #{displayId.slice(-8).toUpperCase()}
            </span>
            <div className={styles.pillGroup}>
              <span
                className={`${styles.statusChip} ${resolveStatusClass(
                  order?.status,
                )}`}
              >
                {order?.status ?? "Pending"}
              </span>
              {order?.paymentStatus && (
                <span
                  className={`${styles.statusChip} ${resolvePaymentClass(
                    order.paymentStatus,
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              )}
            </div>
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              onClick={handleGoHome}
              className={styles.primaryButton}
            >
              <FaHome />
              Back to home
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading order details...</div>
        ) : error ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Something went wrong</p>
            <p>{error}</p>
            <div className={styles.actionsRow}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.primaryButton}
              >
                Try again
              </button>
              <button
                type="button"
                onClick={handleGoHome}
                className={styles.backButton}
              >
                Back home
              </button>
            </div>
          </div>
        ) : !order ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Order not found</p>
            <p>
              We could not find details for this order. It may have been removed
              or you might not have access to it.
            </p>
            <button
              type="button"
              onClick={handleBack}
              className={styles.primaryButton}
            >
              View order history
            </button>
          </div>
        ) : (
          <>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Order placed</span>
                <span className={styles.infoValue}>
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Last updated</span>
                <span className={styles.infoValue}>
                  {formatDate(order.updatedAt ?? order.createdAt)}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Restaurant</span>
                <span className={styles.infoValue}>
                  {order.restaurantId || "Not specified"}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Delivery address</span>
                <span className={styles.infoValue}>
                  {order.deliveryAddress || "Not provided"}
                </span>
              </div>
            </div>

            <section className={styles.section}>
              <header>
                <h2 className={styles.sectionTitle}>Order items</h2>
                <p className={styles.muted}>
                  {order.items?.length
                    ? `${order.items.length} unique item${
                        order.items.length > 1 ? "s" : ""
                      } - ${itemCount} total`
                    : "No items recorded for this order."}
                </p>
              </header>

              {order.items?.length ? (
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
              ) : null}

              <div className={styles.sectionFooter}>
                <span className={styles.muted}>Item total</span>
                <span className={styles.priceEmphasis}>
                  {formatCurrency(itemsTotal)}
                </span>
              </div>
            </section>

            <section className={styles.section}>
              <header>
                <h2 className={styles.sectionTitle}>Delivery &amp; payment</h2>
                <p className={styles.muted}>
                  Keep an eye on this space for live delivery updates.
                </p>
              </header>

              <div className={styles.twoColumn}>
                <div className={styles.metaBlock}>
                  <strong>Delivery address</strong>
                  <span>{order.deliveryAddress || "Not provided"}</span>
                </div>
                <div className={styles.metaBlock}>
                  <strong>Payment status</strong>
                  <span>{order.paymentStatus ?? "Pending"}</span>
                </div>
                <div className={styles.metaBlock}>
                  <strong>Payment method</strong>
                  <span>{order.paymentMethod ?? "Not specified"}</span>
                </div>
                <div className={styles.metaBlock}>
                  <strong>Payment reference</strong>
                  <span>{order.paymentIntentId ?? "Not provided"}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <header>
                <h2 className={styles.sectionTitle}>Total due</h2>
                <p className={styles.muted}>
                  The amount charged includes all taxes and delivery fees (if
                  applicable).
                </p>
              </header>
              <div className={styles.sectionFooter}>
                <span className={styles.muted}>Grand total</span>
                <span className={styles.priceEmphasis}>
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderDetails;
