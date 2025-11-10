"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "./Sidebar";
import CartModal from "./CartModal";
import { CartContext } from "../pages/contexts/CartContext";
import styles from "../styles/layoutShell.module.css";

const join = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

const Header = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useContext(CartContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("token");
    const storedName = window.localStorage.getItem("customerName");
    setLoggedIn(Boolean(token));
    setCustomerName(storedName);

    const syncAuthState = () => {
      const latestToken = window.localStorage.getItem("token");
      const latestName = window.localStorage.getItem("customerName");
      setLoggedIn(Boolean(latestToken));
      setCustomerName(latestName);
    };

    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const avatarInitials = useMemo(() => {
    if (!customerName) return "U";
    const parts = customerName
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (!parts.length) return "U";
    const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
    return initials.join("") || parts[0][0]?.toUpperCase() || "U";
  }, [customerName]);

  const displayName = useMemo(() => {
    if (!customerName) return "Guest";
    const trimmed = customerName.trim();
    return trimmed.length ? trimmed : "Guest";
  }, [customerName]);

  const handleLogout = () => {
    clearCart();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("customerName");
      const keys = Object.keys(window.localStorage);
      keys.forEach((key) => {
        if (key.startsWith("cart_")) {
          window.localStorage.removeItem(key);
        }
      });
    }
    setLoggedIn(false);
    setCustomerName(null);
    setShowMenu(false);
    router.push("/");
  };

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <FaBars size={18} />
            </button>

            <Link href="/" className={styles.logo}>
              <span className={styles.logoTitle}>Fastie Saigon</span>
              <span className={styles.logoTagline}>Fresh bites, fast delivery</span>
            </Link>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setCartOpen(true)}
              aria-label="View cart"
            >
              <FaShoppingCart size={18} />
              {isMounted && cartItems.length > 0 && <span className={styles.cartBadge}>{cartItems.length}</span>}
            </button>

            {!isLoggedIn ? (
              <>
                <Link href="/auth/login" className={join(styles.primaryButton, styles.loginButton)}>
                  Log in
                </Link>
                <Link href="/auth/register" className={join(styles.primaryButton, styles.signupButton)}>
                  Sign up
                </Link>
              </>
            ) : (
              <div className={styles.profileWrapper} ref={menuRef}>
                <button
                  type="button"
                  className={styles.profileButton}
                  onClick={() => setShowMenu((value) => !value)}
                  aria-haspopup="menu"
                  aria-expanded={showMenu}
                >
                  <span className={styles.profileAvatar} aria-hidden="true">
                    {avatarInitials}
                  </span>
                  <span className={styles.profileName}>{displayName}</span>
                </button>

                {showMenu && (
                  <div className={styles.profileMenu} role="menu">
                    <Link href="/customer/profile" onClick={() => setShowMenu(false)}>
                      My profile
                    </Link>
                    <button type="button" onClick={handleLogout}>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userName={customerName}
      />

      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
