"use client";

import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeCardNumberElementChangeEvent } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildAuthServiceUrl } from "@/config/api";
import styles from "../../styles/checkout.module.css";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const ORDER_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL ?? "http://localhost:5005";
const PAYMENT_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL ?? "http://localhost:5004";

type PaymentMethodOption = "stripe" | "cash";

type PendingOrderItem = {
  foodId?: string;
  quantity?: number;
  price?: number;
  name?: string;
};

type PendingOrder = {
  customerId?: string;
  restaurantId?: string;
  items?: PendingOrderItem[];
  deliveryAddress?: string;
  totalPrice?: number;
};

type CustomerProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

const formatCurrency = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

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
  } catch (tokenError) {
    console.error("Failed to decode auth token", tokenError);
    return null;
  }
};

const decodeCustomerIdFromToken = (token: string | null): string => {
  const payload = decodeJwtPayload(token);

  if (!payload) {
    return "";
  }

  const candidate =
    payload.id ??
    payload._id ??
    payload.sub ??
    payload.userId ??
    payload.user_id ??
    payload.userID;

  if (!candidate) {
    return "";
  }

  return String(candidate).trim();
};

type OrderSubmissionItem = {
  foodId: string;
  quantity: number;
  price: number;
};

type OrderSubmissionPayload = {
  customerId: string;
  restaurantId: string;
  items: OrderSubmissionItem[];
  deliveryAddress: string;
  totalPrice: number;
};

const buildOrderSubmissionPayload = (
  order: PendingOrder | null | undefined,
  token: string | null,
): { payload?: OrderSubmissionPayload; error?: string } => {
  if (!order) {
    return { error: "No order data available." };
  }

  const decodedIdFromToken = decodeCustomerIdFromToken(token);
  let resolvedCustomerId = decodedIdFromToken;

  if (!resolvedCustomerId) {
    resolvedCustomerId = typeof order?.customerId === "string" ? order.customerId.trim() : "";
  }

  if (!resolvedCustomerId) {
    return {
      error: "We could not validate your account for this order. Please sign in again and retry.",
    };
  }

  const restaurantId = String(order.restaurantId ?? "").trim();
  if (!restaurantId) {
    return {
      error: "We could not determine the restaurant for this order. Please return to your cart and try again.",
    };
  }

  const deliveryAddress = String(order.deliveryAddress ?? "").trim();
  if (!deliveryAddress) {
    return {
      error: "Your delivery address is missing. Please update it in your cart and try again.",
    };
  }

  const sanitizedItems =
    order.items?.reduce<OrderSubmissionItem[]>((acc, item) => {
      const foodId = String(item.foodId ?? "").trim();
      if (!foodId) {
        return acc;
      }

      const rawQuantity = Number(item.quantity ?? 0);
      const quantity = Number.isFinite(rawQuantity) ? Math.max(1, Math.floor(rawQuantity)) : 0;
      const rawPrice = Number(item.price ?? 0);
      const price = Number.isFinite(rawPrice) ? Math.round(rawPrice * 100) / 100 : 0;

      if (quantity <= 0 || price <= 0) {
        return acc;
      }

      acc.push({ foodId, quantity, price });
      return acc;
    }, []) ?? [];

  if (sanitizedItems.length === 0) {
    return {
      error: "We could not find any items in your order. Please add items to your cart and try again.",
    };
  }

  const totalPrice = sanitizedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return {
    payload: {
      customerId: resolvedCustomerId,
      restaurantId,
      items: sanitizedItems,
      deliveryAddress,
      totalPrice,
    },
  };
};

const usePendingOrder = (): PendingOrder | null => {
  const searchParams = useSearchParams();
  const orderPayloadRaw = searchParams.get("order");

  if (orderPayloadRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(orderPayloadRaw));
      if (parsed && typeof parsed === "object") {
        return parsed as PendingOrder;
      }
    } catch (error) {
      console.error("Failed to parse order payload from URL", error);
    }
  }

  if (typeof window === "undefined") {
    return null;
  }

  const saved = localStorage.getItem("pendingOrder");
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? (parsed as PendingOrder) : null;
  } catch (error) {
    console.error("Failed to parse pendingOrder from storage", error);
    return null;
  }
};

// Main checkout content component
const CheckoutContent = ({ stripeEnabled }: { stripeEnabled: boolean }) => {
  const router = useRouter();
  const order = usePendingOrder();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);

  // Check authentication and redirect to login if not authenticated
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      // Save current path to return after login
      router.push("/auth/login?redirect=/checkout");
    }
  }, [router]);

  const totalPrice = useMemo(() => {
    const amount = order?.totalPrice ?? 0;
    return Number.isFinite(amount) ? amount : 0;
  }, [order]);

  const billingDetails = useMemo(() => {
    const firstName = customerProfile?.firstName ?? "Customer";
    const lastName = customerProfile?.lastName ?? "";
    const email = customerProfile?.email ?? "customer@example.com";
    const phone = customerProfile?.phone ?? "";

    return {
      firstName,
      lastName,
      fullName: [firstName, lastName].filter(Boolean).join(" "),
      email,
      phone,
    };
  }, [customerProfile]);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      if (typeof window === "undefined") {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(buildAuthServiceUrl("/api/auth/customer/profile"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile =
          response.data?.data?.customer ?? response.data?.data ?? response.data?.customer ?? {};
        setCustomerProfile(profile);
      } catch (profileError) {
        console.error("Failed to fetch customer profile", profileError);
      }
    };

    fetchCustomerProfile();
  }, []);

  const handleMethodSelect = (method: PaymentMethodOption) => {
    setSelectedMethod(method);
  };

  if (!order || !order.items || order.items.length === 0) {
    return (
      <div className={styles.checkoutFallback}>
        <h1>No Order Found</h1>
        <p>Please add items to your cart before checking out.</p>
        <Link href="/" className={styles.backLink}>
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/customer/cart" className={styles.breadcrumbLink}>
          Cart
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>Checkout</span>
      </nav>

      <div className={styles.checkoutGrid}>
        <OrderSummary order={order} totalPrice={totalPrice} billingDetails={billingDetails} />
        {selectedMethod === null && <PaymentMethodSelection stripeEnabled={stripeEnabled} onSelect={handleMethodSelect} />}
        {selectedMethod === "cash" && (
          <CashPaymentSection order={order} totalPrice={totalPrice} onBack={() => setSelectedMethod(null)} />
        )}
        {selectedMethod === "stripe" && stripeEnabled && (
          <StripePaymentSection
            order={order}
            totalPrice={totalPrice}
            billingDetails={billingDetails}
            onBack={() => setSelectedMethod(null)}
          />
        )}
        {selectedMethod === "stripe" && !stripeEnabled && (
          <section className={styles.methodSection}>
            <p className={styles.methodNotice}>
              Card payments are unavailable right now. Please select cash on delivery.
            </p>
            <button type="button" className={styles.secondaryButton} onClick={() => setSelectedMethod(null)}>
              Go back
            </button>
          </section>
        )}
      </div>

      <footer className={styles.checkoutFooter}>
        <p>Secure checkout with flexible payment options.</p>
        <p>
          Need to make changes? <button onClick={() => router.back()}>Go back</button>
        </p>
      </footer>
    </div>
  );
};

// Order summary component
const OrderSummary = ({
  order,
  totalPrice,
  billingDetails,
}: {
  order: PendingOrder;
  totalPrice: number;
  billingDetails: { fullName: string };
}) => (
  <section className={styles.summarySection}>
    <header className={styles.summaryHeader}>
      <div className={styles.summaryIcon}>🧾</div>
      <div>
        <h2 className={styles.summaryTitle}>Order Summary</h2>
        {billingDetails.fullName && <p className={styles.summarySubtitle}>{billingDetails.fullName}</p>}
      </div>
    </header>
    <div className={styles.summaryItems}>
      {order?.items?.map((item, index) => (
        <div key={`${item.foodId ?? `item-${index}`}`} className={styles.summaryItem}>
          <div className={styles.summaryItemBody}>
            <span className={styles.summaryItemName}>{item.name ?? "Food Item"}</span>
            <span className={styles.summaryItemQuantity}>Qty: {item.quantity ?? 1}</span>
          </div>
          <span className={styles.summaryItemPrice}>{formatCurrency(item.price ?? 0)}</span>
        </div>
      ))}
    </div>
    <div className={styles.summaryFooter}>
      <span>Total</span>
      <strong>{formatCurrency(totalPrice)}</strong>
    </div>
    {order?.deliveryAddress && (
      <div className={styles.summaryAddress}>
        <span className={styles.summaryAddressLabel}>Delivery Address</span>
        <p>{order.deliveryAddress}</p>
      </div>
    )}
  </section>
);

// Payment method selection component
const PaymentMethodSelection = ({
  stripeEnabled,
  onSelect,
}: {
  stripeEnabled: boolean;
  onSelect: (method: PaymentMethodOption) => void;
}) => (
  <section className={styles.methodSection}>
    <header className={styles.paymentHeader}>
      <div className={styles.paymentIcon}>💰</div>
      <div>
        <h2 className={styles.paymentTitle}>Choose Payment Method</h2>
        <p className={styles.paymentSubtitle}>Select how you would like to pay for this order</p>
      </div>
    </header>

    <div className={styles.methodOptions}>
      <button type="button" className={styles.methodOption} onClick={() => onSelect("cash")}>
        <span className={styles.methodEmoji}>💵</span>
        <span className={styles.methodTitle}>Cash on Delivery</span>
        <span className={styles.methodDescription}>Pay when your food arrives</span>
      </button>
      <button
        type="button"
        className={styles.methodOption}
        onClick={() => onSelect("stripe")}
        disabled={!stripeEnabled}
      >
        <span className={styles.methodEmoji}>💳</span>
        <span className={styles.methodTitle}>Pay with Card</span>
        <span className={styles.methodDescription}>
          {stripeEnabled ? "Secure online payment via Stripe" : "Card payments unavailable"}
        </span>
      </button>
    </div>

    {!stripeEnabled && (
      <div className={styles.methodNotice}>
        Card payments are currently unavailable. Please choose cash on delivery.
      </div>
    )}
  </section>
);

// Cash payment component (no Stripe hooks)
const CashPaymentSection = ({
  order,
  totalPrice,
  onBack,
}: {
  order: PendingOrder;
  totalPrice: number;
  onBack: () => void;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCashPayment = async () => {
    if (!order) {
      setError("No order data available.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const { payload, error: payloadError } = buildOrderSubmissionPayload(order, token);

    if (!payload) {
      setError(payloadError ?? "Unable to prepare your order. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        `${ORDER_SERVICE_BASE_URL}/api/orders`,
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      // Clear cart
      if (typeof window !== "undefined") {
        ["pendingOrder", "cart", "cart_guest"].forEach((key) => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.error(`Failed to remove ${key}`, e);
          }
        });
      }

      setSuccess("Order placed successfully with cash payment on delivery.");
      setTimeout(() => {
        router.push("/customer/order-history");
      }, 2000);
    } catch (cashError) {
      if (axios.isAxiosError(cashError)) {
        console.error("Failed to place cash order", {
          status: cashError.response?.status,
          data: cashError.response?.data,
          message: cashError.message,
          payload,
        });
      } else {
        console.error("Failed to place cash order", cashError);
      }
      setError("Unable to place order. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className={styles.cashSection}>
      <header className={styles.paymentHeader}>
        <div className={styles.paymentIcon}>🧾</div>
        <div>
          <h2 className={styles.paymentTitle}>Cash on Delivery</h2>
          <p className={styles.paymentSubtitle}>Confirm your order and pay when it arrives</p>
        </div>
      </header>

      <p className={styles.cashDescription}>
        A confirmation will be sent to your email. Please prepare exact change totaling{" "}
        {formatCurrency(totalPrice)}.
      </p>

      <div className={styles.cashActions}>
        <button type="button" className={styles.secondaryButton} onClick={onBack} disabled={isSubmitting}>
          Choose another method
        </button>
        <button type="button" className={styles.submitButton} onClick={handleCashPayment} disabled={isSubmitting}>
          {isSubmitting ? "Placing order…" : "Confirm Cash Order"}
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}
    </section>
  );
};

// Stripe payment component (MUST be inside Elements provider)
const StripePaymentSection = ({
  order,
  totalPrice,
  billingDetails,
  onBack,
}: {
  order: PendingOrder;
  totalPrice: number;
  billingDetails: { firstName: string; lastName: string; fullName: string; email: string; phone: string };
  onBack: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [cardBrand, setCardBrand] = useState<string>("");
  const [isPaymentDisabled, setPaymentDisabled] = useState(false);
  const hasInitialised = useRef(false);

  const amountInCents = useMemo(() => Math.round(totalPrice * 100), [totalPrice]);

  const paymentPayload = useMemo(() => {
    let resolvedCustomerId = "";

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      resolvedCustomerId = decodeCustomerIdFromToken(storedToken);
    }

    if (!resolvedCustomerId) {
      const baseCustomerId =
        typeof order?.customerId === "string" ? order.customerId.trim() : "";
      resolvedCustomerId = baseCustomerId;
    }

    if (!resolvedCustomerId) {
      resolvedCustomerId = billingDetails.fullName || "guest";
    }

    return {
      orderId: `ORDER-${Date.now()}`,
      userId: resolvedCustomerId,
      amount: amountInCents / 100,
      currency: "usd",
      firstName: billingDetails.firstName,
      lastName: billingDetails.lastName,
      email: billingDetails.email,
      phone: billingDetails.phone ?? "+1234567890",
    };
  }, [amountInCents, billingDetails, order?.customerId]);

  useEffect(() => {
    const initialisePaymentIntent = async () => {
      if (!order || !order.items || order.items.length === 0) {
        return;
      }

      if (hasInitialised.current || clientSecret) {
        return;
      }

      hasInitialised.current = true;

      try {
        const response = await axios.post(`${PAYMENT_SERVICE_BASE_URL}/api/payment/process`, paymentPayload);

        if (response.data?.paymentStatus === "Paid" || response.data?.disablePayment) {
          setSuccess("This order has already been paid.");
          setPaymentDisabled(true);
          return;
        }

        if (response.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          setError("Unable to initialise payment. Please try again later.");
        }
      } catch (intentError) {
        console.error("Failed to create payment intent", intentError);
        setError("Unable to initialise payment. Please try again later.");
      }
    };

    initialisePaymentIntent();
  }, [clientSecret, order, paymentPayload]);

  const handleCardNumberChange = (event: StripeCardNumberElementChangeEvent) => {
    if (event.brand) {
      setCardBrand(event.brand);
    }
    setError(event.error?.message ?? "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!stripe || !elements || !clientSecret) {
      setError("Payment is not ready yet. Please wait a moment and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setError("Unable to access card details. Please reload and try again.");
        setIsSubmitting(false);
        return;
      }

      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingDetails.fullName,
          email: billingDetails.email,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message ?? "Unable to process payment method.");
        setIsSubmitting(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.id,
      });

      if (confirmError) {
        setError(confirmError.message ?? "Payment confirmation failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        setSuccess("Payment successful! Creating your order...");
        setPaymentDisabled(true);

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const { payload, error: payloadError } = buildOrderSubmissionPayload(order, token);

        if (!payload) {
          setPaymentDisabled(false);
          setIsSubmitting(false);
          setError(payloadError ?? "Payment succeeded but we could not prepare your order. Please try again.");
          return;
        }

        try {
          await axios.post(
            `${ORDER_SERVICE_BASE_URL}/api/orders`,
            payload,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
              },
            }
          );

          // Clear cart
          if (typeof window !== "undefined") {
            ["pendingOrder", "cart", "cart_guest"].forEach((key) => {
              try {
                localStorage.removeItem(key);
              } catch (e) {
                console.error(`Failed to remove ${key}`, e);
              }
            });
          }

          setSuccess("Payment successful! Your order has been placed.");
          setTimeout(() => {
            router.push("/customer/order-history");
          }, 2000);
        } catch (orderError) {
          if (axios.isAxiosError(orderError)) {
            console.error("Failed to create order", {
              status: orderError.response?.status,
              data: orderError.response?.data,
              message: orderError.message,
              payload,
            });
          } else {
            console.error("Failed to create order", orderError);
          }
          setError(
            `Payment succeeded but we could not create your order. Please contact support with payment id ${paymentIntent.id}.`
          );
        }
      } else {
        setError("Payment did not complete. Please try again.");
      }
    } catch (submitError) {
      console.error("Unexpected checkout error", submitError);
      setError("An unexpected error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className={styles.paymentSection}>
      <header className={styles.paymentHeader}>
        <div className={styles.paymentIcon}>💳</div>
        <div>
          <h2 className={styles.paymentTitle}>Card Details</h2>
          <p className={styles.paymentSubtitle}>Secure payments powered by Stripe</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div className={styles.cardFieldWrapper}>
          <label htmlFor="card-number-element" className={styles.cardLabel}>
            Card number
          </label>
          <div className={styles.cardElementContainer}>
            <CardNumberElement
              id="card-number-element"
              className={styles.cardElement}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1f2933",
                    "::placeholder": {
                      color: "#9aa5b1",
                    },
                  },
                  invalid: {
                    color: "#d64545",
                  },
                },
                showIcon: true,
              }}
              onChange={handleCardNumberChange}
            />
            {cardBrand && <span className={styles.cardBrand}>{cardBrand}</span>}
          </div>
        </div>

        <div className={styles.cardDetailsGrid}>
          <div className={styles.cardFieldWrapper}>
            <label htmlFor="card-expiry-element" className={styles.cardLabel}>
              Expiration
            </label>
            <div className={styles.cardElementContainer}>
              <CardExpiryElement
                id="card-expiry-element"
                className={styles.cardElement}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2933",
                      "::placeholder": {
                        color: "#9aa5b1",
                      },
                    },
                    invalid: {
                      color: "#d64545",
                    },
                  },
                }}
                onChange={(event) => setError(event.error?.message ?? "")}
              />
            </div>
          </div>

          <div className={styles.cardFieldWrapper}>
            <label htmlFor="card-cvc-element" className={styles.cardLabel}>
              CVC
            </label>
            <div className={styles.cardElementContainer}>
              <CardCvcElement
                id="card-cvc-element"
                className={styles.cardElement}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2933",
                      "::placeholder": {
                        color: "#9aa5b1",
                      },
                    },
                    invalid: {
                      color: "#d64545",
                    },
                  },
                }}
                onChange={(event) => setError(event.error?.message ?? "")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || isPaymentDisabled || !stripe || !elements}
        >
          {isSubmitting ? "Processing…" : `Pay ${formatCurrency(totalPrice)}`}
        </button>

        <button type="button" className={styles.secondaryButton} onClick={onBack} disabled={isSubmitting}>
          Choose another method
        </button>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
      </form>

      <div className={styles.supportBox}>
        <p>Need help? Contact our support team at</p>
        <a href="mailto:support@fooddelivery.local">support@fooddelivery.local</a>
      </div>
    </section>
  );
};

export default function CheckoutPage() {
  // Always wrap in Elements provider, but pass stripeEnabled flag
  // Elements provider can handle null stripe gracefully
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent stripeEnabled={!!stripePromise} />
    </Elements>
  );
}
