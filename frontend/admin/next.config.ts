import type { NextConfig } from "next";

// In Docker, env vars are injected at runtime, not from .env files
// For local dev, dotenv loads from ../../.env
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  const { config } = require("dotenv");
  const { resolve } = require("path");
  config({ path: resolve(__dirname, "../../.env") });
}

// In Docker, rewrites should go through NGINX (nginx:80)
// For local dev, they can go directly to services
const NGINX_URL = process.env.NGINX_URL ?? "http://localhost";
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL ?? "http://localhost:5001";
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL ?? "http://localhost:5002";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL ?? "http://localhost:5005";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL ?? "http://localhost:5004";

// Use NGINX in Docker, direct services for local dev
const USE_NGINX_PROXY = process.env.USE_NGINX_PROXY === "true";

const nextConfig: NextConfig = {
  // Removed standalone to enable rewrites in production
  // Do NOT expose service URLs to browser - use relative URLs + rewrites instead
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  env: {
    NEXT_PUBLIC_USE_API_PROXY: process.env.NEXT_PUBLIC_USE_API_PROXY ?? "true",
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/auth/:path*` : `${AUTH_SERVICE_URL}/api/auth/:path*`,
      },
      {
        source: "/api/management/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/management/:path*` : `${AUTH_SERVICE_URL}/api/management/:path*`,
      },
      {
        source: "/api/superadmin/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/superadmin/:path*` : `${RESTAURANT_SERVICE_URL}/api/superAdmin/:path*`,
      },
      {
        source: "/api/superAdmin/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/superAdmin/:path*` : `${RESTAURANT_SERVICE_URL}/api/superAdmin/:path*`,
      },
      {
        source: "/api/restaurant/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/restaurant/:path*` : `${RESTAURANT_SERVICE_URL}/api/restaurant/:path*`,
      },
      {
        source: "/api/food-items/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/food-items/:path*` : `${RESTAURANT_SERVICE_URL}/api/food-items/:path*`,
      },
      // /api/orders is handled by API route handler
      {
        source: "/api/payment/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/api/payment/:path*` : `${PAYMENT_SERVICE_URL}/api/payment/:path*`,
      },
      // All uploads go to NGINX (or respective services in local dev)
      // NGINX will route based on filename pattern (profilePicture-* vs image-*)
      {
        source: "/uploads/:path*",
        destination: USE_NGINX_PROXY ? `${NGINX_URL}/uploads/:path*` : `${RESTAURANT_SERVICE_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
