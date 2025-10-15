"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import type { OrderItemForm, OrderFormState } from "./types";

type UpdateOrderProps = {
  addOrder?: (order: OrderFormState) => void;
};

type FetchOrderResponse = OrderFormState & {
  _id?: string;
  status?: string;
  createdAt?: string;
};

type ErrorState = Record<string, string>;

const defaultItem: OrderItemForm = {
  foodId: "",
  quantity: "1",
  price: "0",
};

const defaultOrderState: OrderFormState = {
  customerId: "",
  restaurantId: "",
  items: [{ ...defaultItem }],
  totalPrice: 0,
  deliveryAddress: "",
};

const UpdateOrder = ({ addOrder }: UpdateOrderProps) => {
  const [order, setOrder] = useState<FetchOrderResponse>(defaultOrderState);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorState>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        alert("Order ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<FetchOrderResponse>(`http://localhost:5005/api/orders/${id}`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });
        const fetchedOrder = response.data;

        setOrder({
          customerId: fetchedOrder.customerId,
          restaurantId: fetchedOrder.restaurantId,
          items: fetchedOrder.items
            ? fetchedOrder.items.map((item) => ({
                foodId: item.foodId,
                quantity: String(item.quantity),
                price: String(item.price),
              }))
            : [{ ...defaultItem }],
          totalPrice: fetchedOrder.totalPrice ?? 0,
          deliveryAddress: fetchedOrder.deliveryAddress || "",
        });
      } catch (error) {
        console.error("Error fetching order:", error);
        alert("Error fetching the order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  const validate = () => {
    const newErrors: ErrorState = {};

    const onlyLetters = /^[A-Za-z\s]+$/;
    const addressRegex = /^[A-Za-z0-9\s,.]+$/;

    if (!order.customerId.trim() || !onlyLetters.test(order.customerId)) {
      newErrors.customerId = "Customer name must contain only letters.";
    }

    if (!order.restaurantId.trim() || !onlyLetters.test(order.restaurantId)) {
      newErrors.restaurantId = "Restaurant name must contain only letters.";
    }

    order.items.forEach((item, index) => {
      if (!item.foodId.trim() || !onlyLetters.test(item.foodId)) {
        newErrors[`foodId_${index}`] = "Food name must contain only letters.";
      }
      if (Number(item.quantity) <= 0) {
        newErrors[`quantity_${index}`] = "Quantity must be a positive number.";
      }
      if (Number(item.price) <= 0) {
        newErrors[`price_${index}`] = "Price must be a positive number.";
      }
    });

    if (!order.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address must not be empty.";
    } else if (order.deliveryAddress.trim().length < 10) {
      newErrors.deliveryAddress = "Delivery address must be at least 10 characters.";
    } else if (!addressRegex.test(order.deliveryAddress)) {
      newErrors.deliveryAddress =
        "Delivery address can only contain letters, numbers, commas, dots, and spaces.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newItems = [...order.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setOrder({ ...order, items: newItems });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!token) {
      alert("Please login to update your order.");
      navigate("/auth/login");
      return;
    }

    const payloadItems = order.items.map((item) => ({
      foodId: item.foodId,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const totalPrice = payloadItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const updatedOrder = {
      customerId: order.customerId,
      restaurantId: order.restaurantId,
      items: payloadItems,
      totalPrice,
      deliveryAddress: order.deliveryAddress,
    };

    try {
      const response = await axios.patch(`http://localhost:5005/api/orders/${id}`, updatedOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addOrder?.({ ...order, totalPrice });
      alert("Your Order Is Successfully Updated!");
      navigate("/orders");
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      alert("There was an error updating the order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: "50px" }}>
        <Spinner animation="border" />
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f4f8", padding: "20px", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Button
          variant="light"
          onClick={() => navigate("/orders")}
          style={{ border: "none", background: "none", fontSize: "30px" }}
        >
          <FaArrowLeft />
        </Button>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px", fontWeight: "bold", color: "#333" }}>
        Edit Order
      </h2>

      <Form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          width: "500px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={order.customerId}
            onChange={(e) => setOrder({ ...order, customerId: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
          />
          {errors.customerId && <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors.customerId}</div>}
        </Form.Group>

        <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            value={order.restaurantId}
            onChange={(e) => setOrder({ ...order, restaurantId: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
          />
          {errors.restaurantId && <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors.restaurantId}</div>}
        </Form.Group>

        {order.items.map((item, index) => (
          <div key={index}>
            <Form.Group style={{ marginBottom: "15px" }}>
              <Form.Label>Food</Form.Label>
              <Form.Control
                type="text"
                name="foodId"
                value={item.foodId}
                onChange={(e) => handleItemChange(index, e)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
              />
              {errors[`foodId_${index}`] && (
                <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors[`foodId_${index}`]}</div>
              )}
            </Form.Group>
            <Form.Group style={{ marginBottom: "15px" }}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
              />
              {errors[`quantity_${index}`] && (
                <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors[`quantity_${index}`]}</div>
              )}
            </Form.Group>
            <Form.Group style={{ marginBottom: "15px" }}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
              />
              {errors[`price_${index}`] && (
                <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors[`price_${index}`]}</div>
              )}
            </Form.Group>
          </div>
        ))}

        <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            type="text"
            value={order.deliveryAddress}
            onChange={(e) => setOrder({ ...order, deliveryAddress: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
          />
          {errors.deliveryAddress && (
            <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors.deliveryAddress}</div>
          )}
        </Form.Group>

        <Button type="submit" style={{ backgroundColor: "#dd7f32", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
          Update Order
        </Button>
      </Form>
    </div>
  );
};

export default UpdateOrder;
