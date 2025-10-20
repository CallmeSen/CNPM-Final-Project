"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "../../styles/auth-login.css";

const AuthLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const payload = {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      };
      const res = await axios.post("/api/auth/login", payload);
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
        setError(err.response?.data?.message ?? "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-login-wrapper">
      {/* Left Side - Branding */}
      <div className="auth-login-brand">
        <div className="auth-login-brand-content">
          <div className="auth-login-logo">
            <div className="auth-login-logo-icon">🍔</div>
            <h1 className="auth-login-logo-text">FoodDelivery</h1>
          </div>
          <h2 className="auth-login-brand-title">Welcome Back!</h2>
          <p className="auth-login-brand-subtitle">
            Sign in to continue to your account and enjoy delicious meals delivered to your door.
          </p>
          <div className="auth-login-brand-features">
            <div className="auth-login-feature">
              <span className="auth-login-feature-icon">🚀</span>
              <span>Fast Delivery</span>
            </div>
            <div className="auth-login-feature">
              <span className="auth-login-feature-icon">🍕</span>
              <span>Wide Selection</span>
            </div>
            <div className="auth-login-feature">
              <span className="auth-login-feature-icon">💳</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-login-form-side">
        <div className="auth-login-form-container">
          <div className="auth-login-back-link">
            <Link href="/" className="auth-login-back-btn">
              ← Back to Home
            </Link>
          </div>

          <div className="auth-login-form-header">
            <h2 className="auth-login-form-title">Sign In</h2>
            <p className="auth-login-form-subtitle">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="auth-login-error">
              <span className="auth-login-error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-login-form">
            <div className="auth-login-input-group">
              <label htmlFor="email" className="auth-login-label">
                Email Address
              </label>
              <div className="auth-login-input-wrapper">
                <span className="auth-login-input-icon">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="auth-login-input"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={credentials.email}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-login-input-group">
              <label htmlFor="password" className="auth-login-label">
                Password
              </label>
              <div className="auth-login-input-wrapper">
                <span className="auth-login-input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="auth-login-input"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={credentials.password}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="auth-login-options">
              <label className="auth-login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="auth-login-forgot">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="auth-login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="auth-login-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="auth-login-divider">
            <span>OR</span>
          </div>

          <div className="auth-login-social">
            <button type="button" className="auth-login-social-btn auth-login-google">
              <span>🔍</span>
              Continue with Google
            </button>
            <button type="button" className="auth-login-social-btn auth-login-facebook">
              <span>📘</span>
              Continue with Facebook
            </button>
          </div>

          <p className="auth-login-signup-link">
            Don&apos;t have an account?{" "}
            <Link 
              href={`/auth/register${searchParams.get("redirect") ? `?redirect=${searchParams.get("redirect")}` : ""}`} 
              className="auth-login-link"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
