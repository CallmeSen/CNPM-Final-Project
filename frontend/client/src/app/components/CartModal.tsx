"use client";

/* eslint-disable @next/next/no-img-element */

import { useContext, useEffect, SyntheticEvent } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../pages/contexts/CartContext";
import styles from "../styles/layoutShell.module.css";
import { buildRestaurantServiceUrl } from "../../config/api";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGE = "https://placehold.co/96x96?text=Food";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalStyle = document.body.getAttribute("style");

    document.body.style.setProperty("overflow", "hidden", "important");
    document.body.style.setProperty("touch-action", "none", "important");

    return () => {
      if (originalStyle) {
        document.body.setAttribute("style", originalStyle);
      } else {
        document.body.removeAttribute("style");
      }
    };
  }, [isOpen]);

  const handleProceed = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      onClose();
      navigate("/auth/login");
      return;
    }

    onClose();
    navigate("/orders/create-from-cart");
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => {
      const quantity = typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1;
      const priceValue =
        typeof item.price === "number" ? item.price : Number.parseFloat(String(item.price ?? 0)) || 0;
      return total + priceValue * quantity;
    }, 0);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.cartOverlay} onClick={onClose} />
      <div
        className={styles.cartDrawer}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.cartHeader}>
          <div className={styles.cartTitleGroup}>
            <FaShoppingBag size={20} aria-hidden="true" />
            <h2>Cart</h2>
            <span className={styles.cartBadge}>{cartItems.length}</span>
          </div>
          <button type="button" className={styles.cartClose} onClick={onClose} aria-label="Close cart">
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div className={styles.cartBody}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>Your cart is empty</h3>
              <p>Add items from a restaurant to get started.</p>
            </div>
          ) : (
            <div className={styles.cartList}>
              {cartItems.map((item, index) => {
                const quantity =
                  typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1;
                const priceValue =
                  typeof item.price === "number" ? item.price : Number.parseFloat(String(item.price ?? 0)) || 0;
                const lineTotal = priceValue * quantity;

                return (
                  <div key={item._id ? `${item._id}-${index}` : `cart-item-${index}`} className={styles.cartItem}>
                    <img
                      src={
                        item.image ? buildRestaurantServiceUrl(String(item.image ?? "")) : FALLBACK_IMAGE
                      }
                      alt={String(item.name ?? "Food item")}
                      className={styles.cartImage}
                      onError={handleImageError}
                    />
                    <div className={styles.cartDetails}>
                      <div className={styles.cartItemHeader}>
                        <div>
                          <h4 className={styles.cartName}>{String(item.name ?? "Food item")}</h4>
                          <p className={styles.cartMeta}>{String(item.category ?? "Freshly prepared")}</p>
                        </div>
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() => item._id && removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className={styles.cartControls}>
                        <div className={styles.quantityGroup} role="group" aria-label="Update item quantity">
                          <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => item._id && updateQuantity(item._id, quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className={styles.quantityValue}>{quantity}</span>
                          <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => item._id && updateQuantity(item._id, quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className={styles.cartPrice}>{currencyFormatter.format(priceValue)}</span>
                      </div>
                    </div>
                    <div className={styles.cartLineTotal}>{currencyFormatter.format(lineTotal)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className={styles.cartFooter}>
            <div className={styles.cartSummary}>
              <span>Total</span>
              <span>{currencyFormatter.format(calculateTotal())}</span>
            </div>
            <button type="button" className={styles.checkoutButton} onClick={handleProceed}>
              Proceed to checkout
            </button>
          </footer>
        )}
      </div>
    </>
  );
};

export default CartModal;
