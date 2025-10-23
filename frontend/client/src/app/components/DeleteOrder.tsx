"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

type OrderItem = {
  foodId: string;
  quantity: number;
  price: number;
};

type Order = {
  customerId: string;
  restaurantId: string;
  deliveryAddress: string;
  items: OrderItem[];
};

const DeleteOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  useEffect(() => {
    if (!id) {
      alert("Order ID is missing.");
      setLoading(false);
      return;
    }

    axios
      .get<Order>(`/api/orders/${id}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      })
      .then((response) => setOrder(response.data))
      .catch((error) => {
        console.error("Error fetching order:", error);
        alert("Error fetching the order details.");
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleDelete = () => {
    if (!id) return;

    if (!token) {
      alert("Please login to delete an order.");
      navigate("/auth/login");
      return;
    }

    axios
      .delete(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Your order is canceled");
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        alert("Error deleting the order.");
      });
  };

  if (loading) {
    return (
      <div className="container" style={loadingStyle}>
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={loadingStyle}>
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Button variant="light" onClick={() => navigate("/orders")} style={backButtonStyle}>
          <FaArrowLeft size={24} />
        </Button>
      </div>

      <div className="container" style={cardContainerStyle}>
        <h2 style={headingStyle}>Delete Order</h2>
        <p style={textStyle}>Are you sure you want to delete the following order?</p>
        <ul style={orderDetailsStyle}>
          <li>
            <strong>Customer Name:</strong> {order.customerId}
          </li>
          <li>
            <strong>Restaurant Name:</strong> {order.restaurantId}
          </li>
          <li>
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </li>
        </ul>
        <div style={buttonContainerStyle}>
          <Button variant="danger" onClick={handleDelete} style={deleteButtonStyle}>
            Delete Order
          </Button>
        </div>
      </div>
    </div>
  );
};

const backgroundStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardContainerStyle: CSSProperties = {
  padding: "30px",
  maxWidth: "600px",
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headingStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
};

const textStyle: CSSProperties = {
  fontSize: "18px",
  marginBottom: "20px",
  color: "#555",
};

const orderDetailsStyle: CSSProperties = {
  textAlign: "left",
  listStyleType: "none",
  padding: 0,
  marginBottom: "30px",
};

const buttonContainerStyle: CSSProperties = {
  marginTop: "20px",
};

const deleteButtonStyle: CSSProperties = {
  width: "100%",
  padding: "12px",
  fontSize: "18px",
  backgroundColor: "#dc3545",
  borderColor: "#dc3545",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const loadingStyle: CSSProperties = {
  textAlign: "center",
  paddingTop: "50px",
};

const backButtonStyle: CSSProperties = {
  border: "none",
  background: "none",
  cursor: "pointer",
};

export default DeleteOrder;
