"use client";

/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, MouseEvent, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftCircle } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { buildAuthServiceUrl, buildRestaurantServiceUrl } from "@/config/api";

type OrderData = {
  customerId: string;
  restaurantId: string;
  deliveryAddress: string;
};

type CartItem = {
  _id?: string;
  restaurantId?: string | null;
  quantity?: number;
  price?: unknown;
  image?: unknown;
  name?: unknown;
  category?: unknown;
};

const decodeJwtPayload = (token: string | null): Record<string, unknown> | null => {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length < 2) {
      return null;
    }

    let base64 = parts[1] ?? "";
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }

    const payloadJson = atob(base64);
    return JSON.parse(payloadJson) as Record<string, unknown>;
  } catch (error) {
    console.error("Error decoding token payload", error);
    return null;
  }
};

const CreateOrderFromCart = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<OrderData>({
    customerId: "",
    restaurantId: "",
    deliveryAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);

  const token = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("token");
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity =
        typeof item.quantity === "number" && item.quantity > 0
          ? Math.floor(item.quantity)
          : 1;
      const priceValue =
        typeof item.price === "number"
          ? item.price
          : Number.parseFloat(String(item.price ?? 0)) || 0;
      return total + priceValue * quantity;
    }, 0);
  }, [cartItems]);

  const firstRestaurantId = useMemo(() => {
    if (cartItems.length > 0) {
      return String((cartItems[0] as CartItem).restaurantId ?? "");
    }
    return "";
  }, [cartItems]);

  const displayRestaurantName = restaurantName || "Loading restaurant...";

  useEffect(() => {
    const getCustomerName = async () => {
      setIsLoadingCustomer(true);
      try {
        if (!token) {
          setCustomerName("No Token Found");
          setIsLoadingCustomer(false);
          return;
        }

        const tokenPayload = decodeJwtPayload(token) ?? {};
        const rawCustomerId =
          tokenPayload.id ??
          tokenPayload._id ??
          tokenPayload.userId ??
          tokenPayload.user_id ??
          tokenPayload.userID ??
          tokenPayload.sub;
        const customerId = rawCustomerId ? String(rawCustomerId) : "";

        const possibleEndpoints = [
          buildAuthServiceUrl("/api/auth/customer/profile"),
          customerId ? buildAuthServiceUrl(`/api/auth/customer/${customerId}`) : null,
          customerId ? buildAuthServiceUrl(`/api/customers/${customerId}`) : null,
          customerId ? buildAuthServiceUrl(`/api/auth/customers/${customerId}`) : null,
          customerId ? buildAuthServiceUrl(`/api/users/${customerId}`) : null,
        ].filter(Boolean) as string[];

        let customerData: Record<string, unknown> | null = null;

        for (const endpoint of possibleEndpoints) {
          try {
            const response = await axios.get(endpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response?.data) {
              customerData = response.data;
              break;
            }
          } catch {
            continue;
          }
        }

        let resolvedCustomerName = "";

        if (customerData) {
          const nested =
            (customerData.data as Record<string, unknown> | undefined)?.customer ??
            customerData.customer ??
            customerData;

          const firstName = String((nested as Record<string, unknown>).firstName ?? "");
          const lastName = String((nested as Record<string, unknown>).lastName ?? "");

          if (firstName || lastName) {
            resolvedCustomerName = `${firstName} ${lastName}`.trim();
          } else {
            resolvedCustomerName =
              String((nested as Record<string, unknown>).name ?? "") ||
              String((nested as Record<string, unknown>).fullName ?? "") ||
              String((nested as Record<string, unknown>).username ?? "") ||
              String((nested as Record<string, unknown>).email ?? "") ||
              "Customer";
          }
        }

        if (!resolvedCustomerName) {
          const firstName = String(tokenPayload.firstName ?? "");
          const lastName = String(tokenPayload.lastName ?? "");

          if (firstName || lastName) {
            resolvedCustomerName = `${firstName} ${lastName}`.trim();
          } else {
            resolvedCustomerName =
              String(tokenPayload.name ?? "") ||
              String(tokenPayload.username ?? "") ||
              String(tokenPayload.email ?? "") ||
              (customerId ? `Customer_${customerId.slice(0, 8)}` : "Customer");
          }
        }

        setCustomerName(resolvedCustomerName);
        setOrderData((prev) => ({
          ...prev,
          customerId: customerId || "",
        }));
      } catch (err) {
        console.error("Error resolving customer name", err);
        setCustomerName("Token Error");
      } finally {
        setIsLoadingCustomer(false);
      }
    };

    const getRestaurantDetails = async () => {
      const restaurantId = firstRestaurantId;

      if (!restaurantId) {
        setRestaurantName("No Restaurant Selected");
        return;
      }

      try {
        const response = await axios.get(
          buildRestaurantServiceUrl(`/api/restaurant/details/${restaurantId}`),
        );

        const matchedRestaurant = response.data?.restaurant as
          | CartItem
          | undefined
          | null;

        if (matchedRestaurant) {
          setRestaurantName(String(matchedRestaurant.name ?? ""));
          setOrderData((prev) => ({
            ...prev,
            restaurantId: String(matchedRestaurant._id ?? ""),
          }));
        } else {
          setRestaurantName("Unknown Restaurant");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          try {
            const fallback = await axios.get(
              buildRestaurantServiceUrl("/api/restaurant/all"),
            );

            const restaurants = (fallback.data?.restaurants ?? []) as CartItem[];
            const matchedRestaurant = restaurants.find(
              (restaurant) => String(restaurant._id) === restaurantId,
            );

            if (matchedRestaurant) {
              setRestaurantName(String(matchedRestaurant.name ?? ""));
              setOrderData((prev) => ({
                ...prev,
                restaurantId: String(matchedRestaurant._id ?? ""),
              }));
              return;
            }
          } catch (fallbackError) {
            console.error("Fallback restaurant lookup failed", fallbackError);
          }
        } else {
          console.error("Error fetching restaurant details", err);
        }

        setRestaurantName("Unknown Restaurant");
      }
    };

    getCustomerName();
    getRestaurantDetails();
  }, [cartItems, firstRestaurantId, token]);

  const validateForm = () => {
    if (!orderData.customerId.trim()) {
      setError("Customer account is required. Please sign in again.");
      return false;
    }
    if (!orderData.deliveryAddress.trim()) {
      setError("Delivery address is required");
      return false;
    }
    if (cartItems.length === 0) {
      setError("Cart is empty. Please add items to cart first.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const orderItems = cartItems.map((item) => {
        const priceValue =
          typeof item.price === "number"
            ? item.price
            : Number.parseFloat(String(item.price ?? 0)) || 0;
        const quantity =
          typeof item.quantity === "number" && item.quantity > 0
            ? Math.floor(item.quantity)
            : 1;

        return {
          foodId: item._id,
          quantity,
          price: priceValue,
        };
      });

      const calculatedTotalPrice = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      const orderPayload = {
        customerId: orderData.customerId,
        restaurantId: orderData.restaurantId || firstRestaurantId,
        items: orderItems,
        deliveryAddress: orderData.deliveryAddress,
        totalPrice: calculatedTotalPrice,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("pendingOrder", JSON.stringify(orderPayload));
      }

      navigate("/checkout", {
        state: {
          orderData: orderPayload,
          fromCart: true,
        },
      });
    } catch (err) {
      console.error("Error preparing order", err);
      setError("Failed to prepare order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    event.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleBackMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    event.currentTarget.style.transform = "translateY(0)";
  };

  const handleSubmitMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (!loading && cartItems.length > 0) {
      event.currentTarget.style.backgroundColor = "#ff5722";
      event.currentTarget.style.transform = "translateY(-2px)";
      event.currentTarget.style.boxShadow = "0 15px 30px rgba(255, 127, 80, 0.4)";
    }
  };

  const handleSubmitMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    if (!loading && cartItems.length > 0) {
      event.currentTarget.style.backgroundColor = "#ff7f50";
      event.currentTarget.style.transform = "translateY(0)";
      event.currentTarget.style.boxShadow = "0 10px 20px rgba(255, 127, 80, 0.3)";
    }
  };

  const isSmallScreen =
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <button
          onClick={() => navigate("/customer/cart")}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "50px",
            padding: "12px 20px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={handleBackMouseEnter}
          onMouseLeave={handleBackMouseLeave}
        >
          <BsArrowLeftCircle size={20} />
          Back to Cart
        </button>
      </div>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmallScreen ? "1fr" : "1.2fr 1fr",
            gap: isSmallScreen ? "20px" : "40px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#ff7f50",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                }}
              >
                <span style={{ fontSize: "24px" }}>🛒</span>
              </div>
              <h2 style={{ color: "#333", fontSize: "28px", fontWeight: 700, margin: 0 }}>
                Order Summary
              </h2>
            </div>

            <div style={{ marginBottom: "30px" }}>
              {cartItems.map((item, index) => {
                const priceValue =
                  typeof item.price === "number"
                    ? item.price
                    : Number.parseFloat(String(item.price ?? 0)) || 0;

                return (
                  <div
                    key={item._id ? `${item._id}-${index}` : `idx-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom:
                        index < cartItems.length - 1 ? "1px solid #eee" : "none",
                    }}
                  >
                    <img
                      src={
                        item.image
                          ? buildRestaurantServiceUrl(String(item.image ?? ""))
                          : "https://placehold.co/60x60?text=Food"
                      }
                      alt={String(item.name ?? "Food Item")}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                      onError={(event) => {
                        event.currentTarget.src = "https://placehold.co/60x60?text=Food";
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          color: "#333",
                          fontSize: "16px",
                          fontWeight: 600,
                          margin: "0 0 5px 0",
                        }}
                      >
                        {String(item.name ?? "Food Item")}
                      </h4>
                      <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
                        {String(item.category ?? "Unknown")}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          color: "#ff7f50",
                          fontSize: "18px",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {priceValue.toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "15px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 600, color: "#333" }}>
                Total Amount:
              </span>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "#ff7f50" }}>
                {totalPrice.toLocaleString()} VND
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              minHeight: "600px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#667eea",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                }}
              >
                <span style={{ fontSize: "24px" }}>📝</span>
              </div>
              <h2 style={{ color: "#333", fontSize: "28px", fontWeight: 700, margin: 0 }}>
                Delivery Details
              </h2>
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: "#fee",
                  color: "#c33",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  border: "1px solid #fcc",
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                style={{
                  backgroundColor: "#efe",
                  color: "#3c3",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  border: "1px solid #cfc",
                }}
              >
                {success}
              </div>
            )}

            <div style={{ height: "100%" }}>
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  👤 Customer Name
                </label>
                <div
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #eee",
                    borderRadius: "12px",
                    fontSize: "16px",
                    backgroundColor: "#f8f9fa",
                    color: "#666",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    minHeight: "54px",
                  }}
                >
                  {isLoadingCustomer
                    ? "Loading customer name..."
                    : customerName || "Customer name not available"}
                </div>
                {!isLoadingCustomer && !customerName && (
                  <div style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
                    Debug: Check browser console for detailed logs
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  🏪 Restaurant Name
                </label>
                <div
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #eee",
                    borderRadius: "12px",
                    fontSize: "16px",
                    backgroundColor: "#f8f9fa",
                    color: "#666",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    minHeight: "54px",
                  }}
                >
                  {displayRestaurantName}
                </div>
                <input
                  type="hidden"
                  name="restaurantId"
                  value={orderData.restaurantId || firstRestaurantId}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  📍 Delivery Address
                </label>
                <textarea
                  name="deliveryAddress"
                  value={orderData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your complete delivery address..."
                  required
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #eee",
                    borderRadius: "12px",
                    fontSize: "16px",
                    color: "#111827",
                    fontWeight: 400,
                    transition: "border-color 0.3s ease",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    lineHeight: "1.4",
                  }}
                  onFocus={(event) => {
                    event.currentTarget.style.borderColor = "#667eea";
                  }}
                  onBlur={(event) => {
                    event.currentTarget.style.borderColor = "#eee";
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || cartItems.length === 0}
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: loading ? "#ccc" : "#ff7f50",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  fontSize: "18px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 20px rgba(255, 127, 80, 0.3)",
                  boxSizing: "border-box",
                  marginTop: "auto",
                }}
                onMouseEnter={handleSubmitMouseEnter}
                onMouseLeave={handleSubmitMouseLeave}
              >
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid transparent",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Creating Order...
                  </span>
                ) : (
                  `🍽️ Place Order • ${totalPrice.toLocaleString()} VND`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CreateOrderFromCart;
