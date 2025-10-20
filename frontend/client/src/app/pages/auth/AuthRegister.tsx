"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "../../styles/auth-register.css";
const AuthRegister = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        ...form,
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      };
      const res = await axios.post("/api/auth/register/customer", payload);
      const { token, data } = res.data ?? {};
      const customer = data?.customer ?? res.data?.customer;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (customer) {
        const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(" ").trim();
        const displayName = fullName || customer.email || "";
        if (displayName) {
          localStorage.setItem("customerName", displayName);
        } else {
          localStorage.removeItem("customerName");
        }
      } else {
        localStorage.removeItem("customerName");
      }
      window.dispatchEvent(new Event("storage"));
      
      // Check if there's a redirect parameter
      const redirectPath = searchParams.get("redirect");
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-register-wrapper">
      <div className="auth-register-brand">
        <div className="auth-register-brand-content">
          <div className="auth-register-logo">
            <div className="auth-register-logo-icon">FD</div>
            <h1 className="auth-register-logo-text">FoodDelivery</h1>
          </div>
          <h2 className="auth-register-brand-title">Start Your Journey With Us</h2>
          <p className="auth-register-brand-subtitle">
            Create an account to order from your favorite restaurants, track deliveries in real time, and enjoy member-only perks.
          </p>

          <ul className="auth-register-benefits">
            <li>
              <span className="auth-register-benefits-bullet" aria-hidden="true">
                +
              </span>
              <span>Personalized restaurant suggestions crafted for you</span>
            </li>
            <li>
              <span className="auth-register-benefits-bullet" aria-hidden="true">
                +
              </span>
              <span>Faster checkout with saved addresses and payment methods</span>
            </li>
            <li>
              <span className="auth-register-benefits-bullet" aria-hidden="true">
                +
              </span>
              <span>Exclusive offers, loyalty rewards, and seasonal bundles</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="auth-register-form-side">
        <div className="auth-register-form-container">
          <div className="auth-register-back-link">
            <Link href="/" className="auth-register-back-btn">
              Back to Home
            </Link>
          </div>

          <div className="auth-register-form-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          {error && (
            <div className="auth-register-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-register-form">
            <div className="auth-register-grid">
              <div className="auth-register-input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  value={form.firstName}
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="auth-register-input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                  value={form.lastName}
                  required
                  autoComplete="family-name"
                />
              </div>
              <div className="auth-register-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={form.email}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="auth-register-input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={form.phone}
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="auth-register-input-group auth-register-password-group">
                <label htmlFor="password">Password</label>
                <div className="auth-register-password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-register-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="auth-register-input-group">
                <label htmlFor="location">Delivery Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City or neighborhood"
                  onChange={handleChange}
                  value={form.location}
                  autoComplete="address-level2"
                />
              </div>
            </div>

            <div className="auth-register-helper">
              By creating an account you agree to our{" "}
              <Link href="/legal/terms" className="auth-register-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="auth-register-link">
                Privacy Policy
              </Link>
              .
            </div>

            <button type="submit" className="auth-register-submit-btn" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-register-login-link">
            Already have an account?{" "}
            <Link 
              href={`/auth/login${searchParams.get("redirect") ? `?redirect=${searchParams.get("redirect")}` : ""}`} 
              className="auth-register-link"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
