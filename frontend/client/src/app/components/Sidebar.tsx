"use client";

import { MouseEvent, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import styles from "../styles/layoutShell.module.css";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string | null;
};

type NavItem = {
  label: string;
  to: string;
};

const primaryLinks: NavItem[] = [
  { label: "Orders", to: "/customer/order-history" },
  { label: "Wallet", to: "/wallet" },
  { label: "Restaurants", to: "/restaurants" },
];

const communityLinks: NavItem[] = [
  { label: "Partner with us", to: "/add-restaurant" },
  { label: "Join as delivery partner", to: "/signup-delivery" },
];

const Sidebar = ({ isOpen, onClose, isLoggedIn, onLogout, userName }: SidebarProps) => {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.overlay === "true") {
      onClose();
    }
  };

  const displayName = useMemo(() => {
    if (!userName) return "Valued guest";
    const trimmed = userName.trim();
    return trimmed.length ? trimmed : "Valued guest";
  }, [userName]);

  const initials = useMemo(() => {
    if (!userName) return "VG";
    const parts = userName
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (!parts.length) return "VG";
    const firstTwo = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
    return firstTwo.join("") || "VG";
  }, [userName]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.sidebarOverlay} data-overlay="true" onClick={handleOverlayClick}>
      <motion.aside
        className={styles.sidebarPanel}
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
      >
        <header className={styles.sidebarHeader}>
          <div className={styles.sidebarTitle}>
            <span className={styles.sidebarLogo}>Fastie Saigon</span>
            <span className={styles.sidebarSubtitle}>Good food. Great moments.</span>
          </div>
          <button type="button" className={styles.sidebarClose} onClick={onClose} aria-label="Close navigation">
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        {isLoggedIn ? (
          <>
            <section className={styles.sidebarCard}>
              <div className={styles.sidebarAvatar} aria-hidden="true">
                {initials}
              </div>
              <div className={styles.sidebarProfileText}>
                <p className={styles.sidebarProfileName}>{displayName}</p>
                <p className={styles.sidebarProfileCaption}>Welcome back</p>
              </div>
              <Link to="/customer/profile" className={styles.sidebarProfileLink} onClick={onClose}>
                Dashboard
              </Link>
            </section>

            <nav className={styles.sidebarSection} aria-label="Your shortcuts">
              <h3 className={styles.sidebarSectionHeading}>Quick access</h3>
              <ul className={styles.sidebarList}>
                {primaryLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={styles.sidebarLink} onClick={onClose}>
                      <span>{link.label}</span>
                      <FaArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.sidebarSection} aria-label="Grow with us">
              <h3 className={styles.sidebarSectionHeading}>Opportunities</h3>
              <ul className={styles.sidebarList}>
                {communityLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={styles.sidebarLink} onClick={onClose}>
                      <span>{link.label}</span>
                      <FaArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className={styles.sidebarSignOut}
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <div className={styles.sidebarGuest}>
            <div>
              <p className={styles.sidebarGuestTitle}>Join the community</p>
              <p className={styles.sidebarGuestSubtitle}>
                Save favourites, track orders, and unlock exclusive perks tailored to your taste.
              </p>
            </div>

            <div className={styles.sidebarGuestActions}>
              <Link to="/auth/login" onClick={onClose} className={`${styles.sidebarAction} ${styles.sidebarActionOutline}`}>
                Log in
              </Link>
              <Link to="/auth/register" onClick={onClose} className={`${styles.sidebarAction} ${styles.sidebarActionFilled}`}>
                Sign up for free
              </Link>
            </div>

            <div className={styles.sidebarDivider}>
              <span />
              <p>or explore</p>
              <span />
            </div>

            <ul className={styles.sidebarList}>
              {communityLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.sidebarLink} onClick={onClose}>
                    <span>{link.label}</span>
                    <FaArrowRight size={12} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.aside>
    </div>
  );
};

export default Sidebar;
