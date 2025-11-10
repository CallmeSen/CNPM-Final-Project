import type { NextConfig } from "next";

// In Docker, env vars are injected at runtime, not from .env files
// For local dev, dotenv loads from ../../.env
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  const { config } = require("dotenv");
  const { resolve } = require("path");
  config({ path: resolve(__dirname, "../../.env") });
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL ?? "http://localhost:5001";
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL ?? "http://localhost:5002";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL ?? "http://localhost:5005";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL ?? "http://localhost:5004";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment
  env: {
    NEXT_PUBLIC_ORDER_SERVICE_URL: ORDER_SERVICE_URL,
    NEXT_PUBLIC_PAYMENT_SERVICE_URL: PAYMENT_SERVICE_URL,
    NEXT_PUBLIC_AUTH_SERVICE_URL: AUTH_SERVICE_URL,
    NEXT_PUBLIC_RESTAURANT_SERVICE_URL: RESTAURANT_SERVICE_URL,
    NEXT_PUBLIC_USE_API_PROXY: process.env.NEXT_PUBLIC_USE_API_PROXY ?? "true",
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${AUTH_SERVICE_URL}/api/auth/:path*`,
      },
      {
        source: "/api/restaurant/:path*",
        destination: `${RESTAURANT_SERVICE_URL}/api/restaurant/:path*`,
      },
      {
        source: "/api/food-items/:path*",
        destination: `${RESTAURANT_SERVICE_URL}/api/food-items/:path*`,
      },
      {
        source: "/api/reports/:path*",
        destination: `${RESTAURANT_SERVICE_URL}/api/reports/:path*`,
      },
      {
        source: "/api/orders/:path*",
        destination: `${ORDER_SERVICE_URL}/api/orders/:path*`,
      },
      {
        source: "/api/payment/:path*",
        destination: `${PAYMENT_SERVICE_URL}/api/payment/:path*`,
      },
    ];
  },
};

export default nextConfig;
