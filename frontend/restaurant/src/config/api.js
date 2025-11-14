/**
 * API configuration for Restaurant Frontend
 * Handles URL building with proxy awareness for Docker/production deployment
 */

const stripTrailingSlash = (value) => value.replace(/\/+$/, "");

const DEFAULT_RESTAURANT_BASE_URL = "http://localhost:5002";
const DEFAULT_AUTH_BASE_URL = "http://localhost:5001";

const shouldProxyApi =
  (process.env.NEXT_PUBLIC_USE_API_PROXY ?? "true").toLowerCase() === "true";

const RESTAURANT_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_RESTAURANT_SERVICE_URL ?? DEFAULT_RESTAURANT_BASE_URL
);

const AUTH_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? DEFAULT_AUTH_BASE_URL
);

/**
 * Build image URL with proxy awareness
 * @param {string} imagePath - Image path from database (e.g., "/uploads/image-xxx.png")
 * @returns {string|null} - Full URL or relative path depending on environment
 */
export const buildImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If already full URL, return as-is
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  // When using proxy (Docker with NGINX), use relative paths
  // Next.js rewrites will forward to NGINX, which routes to correct backend
  if (shouldProxyApi && normalizedPath.startsWith("/uploads/")) {
    return normalizedPath; // NGINX will route to correct backend based on filename
  }

  // Local development: direct backend URLs
  // Profile pictures (profilePicture-*) are in auth-service
  if (normalizedPath.includes("profilePicture-")) {
    return `${AUTH_SERVICE_BASE_URL}${normalizedPath}`;
  }
  
  // Food item images (image-*) and other uploads are in restaurant-service
  return `${RESTAURANT_SERVICE_BASE_URL}${normalizedPath}`;
};

/**
 * Build API URL for restaurant service
 * @param {string} path - API path
 * @returns {string} - Full URL or relative path
 */
export const buildRestaurantServiceUrl = (path) => {
  if (!path) return RESTAURANT_SERVICE_BASE_URL;
  
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Use proxy for /api/* paths
  if (shouldProxyApi && normalizedPath.startsWith("/api/")) {
    return normalizedPath;
  }

  return `${RESTAURANT_SERVICE_BASE_URL}${normalizedPath}`;
};

/**
 * Build API URL for auth service
 * @param {string} path - API path
 * @returns {string} - Full URL or relative path
 */
export const buildAuthServiceUrl = (path) => {
  if (!path) return AUTH_SERVICE_BASE_URL;
  
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (shouldProxyApi && normalizedPath.startsWith("/api/")) {
    return normalizedPath;
  }

  return `${AUTH_SERVICE_BASE_URL}${normalizedPath}`;
};
