"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/customerProfile.module.css";
import { buildAuthServiceUrl } from "../../../config/api";

type Customer = {
  firstName: string;
  email: string;
  phone: string;
  location?: string;
};

const CustomerProfile = () => {
  const [profile, setProfile] = useState<Customer | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("token");
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Please login to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          buildAuthServiceUrl("/api/auth/customer/profile"),
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProfile(res.data.data.customer);
      } catch (err) {
        console.error("Could not fetch profile", err);
        setError("Could not fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const renderContent = () => {
    if (loading) {
      return (
        <section className={styles.statusCard} aria-live="polite">
          <div className={styles.spinner} aria-hidden="true" />
          <h2 className={styles.statusTitle}>Loading profile</h2>
          <p className={styles.statusText}>Fetching your latest account details.</p>
        </section>
      );
    }

    if (error) {
      return (
        <section className={`${styles.statusCard} ${styles.statusCardError}`} role="alert">
          <h2 className={styles.statusTitle}>Something went wrong</h2>
          <p className={styles.statusText}>{error}</p>
        </section>
      );
    }

    if (!profile) {
      return null;
    }

    return (
      <div className={styles.layout}>
        <aside className={styles.hero}>
          <div>
            <h1 className={styles.heroTitle}>Hello, {profile.firstName}</h1>
            <p className={styles.heroSubtitle}>
              This dashboard keeps your account details in one place so you can manage deliveries, track orders, and update
              preferences whenever you need.
            </p>

            <ul className={styles.heroList}>
              <li className={styles.heroItem}>
                <span className={styles.heroDot} aria-hidden="true">
                  •
                </span>
                Real-time updates on your orders
              </li>
              <li className={styles.heroItem}>
                <span className={styles.heroDot} aria-hidden="true">
                  •
                </span>
                Save favourite addresses for faster checkout
              </li>
              <li className={styles.heroItem}>
                <span className={styles.heroDot} aria-hidden="true">
                  •
                </span>
                Earn rewards every time you order
              </li>
            </ul>
          </div>
        </aside>

        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div>
              <h2>Account Overview</h2>
              <p>Review and confirm your contact information below.</p>
            </div>
          </header>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email address</span>
              <span className={styles.detailValue}>{profile.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone number</span>
              <span className={styles.detailValue}>{profile.phone}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Preferred location</span>
              <span className={styles.detailValue}>
                {profile.location && profile.location.trim() !== "" ? profile.location : "Not set yet"}
              </span>
            </div>
          </div>

          <footer className={styles.cardFooter}>
            <p>
              Need to make changes? Reach out to our support team or head to settings once profile editing is available.
            </p>
          </footer>
        </section>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.wrapper}>{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default CustomerProfile;
