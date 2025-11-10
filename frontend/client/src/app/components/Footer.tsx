"use client";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../styles/layoutShell.module.css";

const Footer = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <h3>Fastie Saigon</h3>
          <p className={styles.footerText}>
            Handpicked restaurants, reliable riders, and a checkout experience designed for moments that matter.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <p className={styles.footerLinksTitle}>Navigate</p>
          <Link to="/" className={styles.footerLink}>
            Home
          </Link>
          <Link to="/about" className={styles.footerLink}>
            About
          </Link>
          <Link to="/contact" className={styles.footerLink}>
            Contact &amp; Feedback
          </Link>
          <Link to="/privacy" className={styles.footerLink}>
            Privacy Policy
          </Link>
        </div>

        <div className={styles.footerLinks}>
          <p className={styles.footerLinksTitle}>Connect</p>
          <div className={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        <div className={styles.footerNewsletter}>
          <p className={styles.footerLinksTitle}>Stay updated</p>
          <p className={styles.footerText}>Get curated restaurant launches and limited-time offers in your inbox.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input type="email" name="newsletter-email" placeholder="Enter your email" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>&copy; {new Date().getFullYear()} Fastie Saigon. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
