import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load root .env file
config({ path: resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment
  turbopack: {
    root: __dirname,
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "http://localhost:5005",
    NEXT_PUBLIC_PAYMENT_SERVICE_URL: process.env.PAYMENT_SERVICE_URL || "http://localhost:5004",
    NEXT_PUBLIC_AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    NEXT_PUBLIC_RESTAURANT_SERVICE_URL: process.env.RESTAURANT_SERVICE_URL || "http://localhost:5002",
  },
};

export default nextConfig;
