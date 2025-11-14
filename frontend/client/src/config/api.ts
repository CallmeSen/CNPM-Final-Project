const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const DEFAULT_RESTAURANT_BASE_URL = "http://localhost:5002";
const DEFAULT_AUTH_BASE_URL = "http://localhost:5001";
const DEFAULT_ORDER_BASE_URL = "http://localhost:5005";
const DEFAULT_PAYMENT_BASE_URL = "http://localhost:5004";

const shouldProxyApi =
  (process.env.NEXT_PUBLIC_USE_API_PROXY ?? "true").toLowerCase() === "true";

const RESTAURANT_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_RESTAURANT_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_RESTAURANT_BASE_URL,
);

const AUTH_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_AUTH_BASE_URL,
);

const ORDER_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_ORDER_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_ORDER_BASE_URL,
);

const PAYMENT_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_PAYMENT_BASE_URL,
);

const buildServiceUrl = (baseUrl: string, path: string) => {
  if (!path) {
    return baseUrl;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Use proxy for /api/* paths
  if (shouldProxyApi && normalizedPath.startsWith("/api/")) {
    return normalizedPath;
  }

  // Handle /uploads/* paths
  if (normalizedPath.startsWith("/uploads/")) {
    // When using API proxy (Docker/production with NGINX), always use relative path
    // NGINX will route to correct backend service based on filename pattern
    if (shouldProxyApi) {
      return normalizedPath; // Let NGINX handle routing
    }
    
    // When NOT using proxy (local development), use direct backend URLs
    // Profile pictures (profilePicture-*) are in auth-service
    // Food item images (image-*) are in restaurant-service
    if (normalizedPath.includes("profilePicture-")) {
      return `${AUTH_SERVICE_BASE_URL}${normalizedPath}`;
    }
    // Default to restaurant-service for food items and other uploads
    return `${RESTAURANT_SERVICE_BASE_URL}${normalizedPath}`;
  }

  return `${baseUrl}${normalizedPath}`;
};

export const buildRestaurantServiceUrl = (path: string) =>
  buildServiceUrl(RESTAURANT_SERVICE_BASE_URL, path);

export const buildAuthServiceUrl = (path: string) =>
  buildServiceUrl(AUTH_SERVICE_BASE_URL, path);

export const buildOrderServiceUrl = (path: string) =>
  buildServiceUrl(ORDER_SERVICE_BASE_URL, path);

export const buildPaymentServiceUrl = (path: string) =>
  buildServiceUrl(PAYMENT_SERVICE_BASE_URL, path);
