"use client";

import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle, BsArrowLeftCircle } from "react-icons/bs";
import type { OrderFormState, OrderItemForm, OrderItemPayload } from "./types";

type ItemErrors = Partial<Record<keyof OrderItemForm, string>>;

type FormErrors = {
  customerId?: string;
  restaurantId?: string;
  deliveryAddress?: string;
  items?: ItemErrors[];
};

type OrderFormProps = {
  addOrder?: (order: OrderFormState) => void;
};

const defaultItem: OrderItemForm = {
  foodId: "",
  quantity: "1",
  price: "0",
};

const initialState: OrderFormState = {
  customerId: "",
  restaurantId: "",
  items: [defaultItem],
  totalPrice: 0,
  deliveryAddress: "",
};

const OrderForm = ({ addOrder }: OrderFormProps) => {
  const [order, setOrder] = useState<OrderFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "customerId":
      case "restaurantId":
      case "foodId":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Only letters allowed.";
        }
        break;
      case "quantity":
      case "price":
        if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
          return "Must be a positive number.";
        }
        break;
      case "deliveryAddress":
        if (!value.trim()) {
          return "Delivery Address is required.";
        }
        if (value.trim().length < 10) {
          return "Address must be at least 10 characters long.";
        }
        if (!/^[A-Za-z0-9\s,.-]+$/.test(value)) {
          return "Address can only contain letters, numbers, commas, dots, and spaces.";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newItems = [...order.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setOrder({ ...order, items: newItems });

    const error = validateField(name, value);
    const newErrors: FormErrors = { ...errors };
    if (!newErrors.items) newErrors.items = [];

    newErrors.items[index] = {
      ...newErrors.items[index],
      [name]: error,
    };
    setErrors(newErrors);
  };

  const handleAddItem = () => {
    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, { ...defaultItem }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));

    if (errors.items) {
      const newErrors: FormErrors = { ...errors };
      newErrors.items = newErrors.items.filter((_, itemIndex) => itemIndex !== index);
      setErrors(newErrors);
    }
  };

  const toPayloadItems = (items: OrderItemForm[]): OrderItemPayload[] =>
    items.map((item) => ({
      foodId: item.foodId,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let formValid = true;
    const newErrors: FormErrors = {};

    if (!/^[A-Za-z\s]+$/.test(order.customerId)) {
      newErrors.customerId = "Only letters allowed.";
      formValid = false;
    }

    if (!/^[A-Za-z\s]+$/.test(order.restaurantId)) {
      newErrors.restaurantId = "Only letters allowed.";
      formValid = false;
    }

    const deliveryAddressError = validateField("deliveryAddress", order.deliveryAddress);
    if (deliveryAddressError) {
      newErrors.deliveryAddress = deliveryAddressError;
      formValid = false;
    }

    newErrors.items = [];
    order.items.forEach((item, index) => {
      const itemErrors: ItemErrors = {};
      if (!/^[A-Za-z\s]+$/.test(item.foodId)) {
        itemErrors.foodId = "Only letters allowed.";
        formValid = false;
      }
      if (!/^\d+$/.test(item.quantity) || parseInt(item.quantity, 10) <= 0) {
        itemErrors.quantity = "Must be a positive number.";
        formValid = false;
      }
      if (!/^\d+$/.test(item.price) || parseInt(item.price, 10) <= 0) {
        itemErrors.price = "Must be a positive number.";
        formValid = false;
      }
      newErrors.items![index] = itemErrors;
    });

    setErrors(newErrors);

    if (!formValid) {
      setLoading(false);
      return;
    }

    if (!token) {
      alert("Please login to create an order.");
      navigate("/auth/login");
      setLoading(false);
      return;
    }

    const payloadItems = toPayloadItems(order.items);
    const totalPrice = payloadItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const payload = {
      customerId: order.customerId,
      restaurantId: order.restaurantId,
      items: payloadItems,
      totalPrice,
      deliveryAddress: order.deliveryAddress,
    };

    try {
      await axios.post("/api/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      addOrder?.({ ...order, totalPrice });
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...storedOrders, payload]));

      alert("Your Order Is Successfully Created 🎉");
      navigate("/orders");
      setOrder(initialState);
      setErrors({});
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error creating your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "16px",
          color: "#333",
          marginBottom: "20px",
          textDecoration: "none",
        }}
      >
        <BsArrowLeftCircle size={22} />
      </Button>

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create New Order</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group style={{ marginBottom: "20px" }}>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={order.customerId}
              onChange={(e) => {
                setOrder({ ...order, customerId: e.target.value });
                setErrors({
                  ...errors,
                  customerId: validateField("customerId", e.target.value),
                });
              }}
              required
            />
            {errors.customerId && (
              <div style={{ color: "red", fontSize: "14px" }}>{errors.customerId}</div>
            )}
          </Form.Group>

          <Form.Group style={{ marginBottom: "20px" }}>
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              value={order.restaurantId}
              onChange={(e) => {
                setOrder({ ...order, restaurantId: e.target.value });
                setErrors({
                  ...errors,
                  restaurantId: validateField("restaurantId", e.target.value),
                });
              }}
              required
            />
            {errors.restaurantId && (
              <div style={{ color: "red", fontSize: "14px" }}>{errors.restaurantId}</div>
            )}
          </Form.Group>

          {order.items.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h5 style={{ margin: 0 }}>Item {index + 1}</h5>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {index === order.items.length - 1 && (
                    <span
                      onClick={handleAddItem}
                      style={{ cursor: "pointer", color: "#4CAF50" }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          handleAddItem();
                        }
                      }}
                    >
                      <BsPlusCircle size={26} />
                    </span>
                  )}
                  {order.items.length > 1 && (
                    <span
                      onClick={() => handleRemoveItem(index)}
                      style={{ cursor: "pointer", color: "#f44336" }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          handleRemoveItem(index);
                        }
                      }}
                    >
                      <BsDashCircle size={26} />
                    </span>
                  )}
                </div>
              </div>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Food</Form.Label>
                <Form.Control
                  type="text"
                  name="foodId"
                  value={item.foodId}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
                {errors.items && errors.items[index]?.foodId && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.items[index]?.foodId}
                  </div>
                )}
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
                {errors.items && errors.items[index]?.quantity && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.items[index]?.quantity}
                  </div>
                )}
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
                {errors.items && errors.items[index]?.price && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.items[index]?.price}
                  </div>
                )}
              </Form.Group>
            </div>
          ))}

          <Form.Group style={{ marginBottom: "20px" }}>
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              value={order.deliveryAddress}
              onChange={(e) => {
                setOrder({ ...order, deliveryAddress: e.target.value });
                setErrors({
                  ...errors,
                  deliveryAddress: validateField("deliveryAddress", e.target.value),
                });
              }}
              required
            />
            {errors.deliveryAddress && (
              <div style={{ color: "red", fontSize: "14px" }}>{errors.deliveryAddress}</div>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              backgroundColor: "#dd7f32",
              borderColor: "#dd7f32",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Creating Order...
              </>
            ) : (
              "Create Order"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default OrderForm;
