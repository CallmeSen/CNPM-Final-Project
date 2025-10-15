const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const DEFAULT_RESTAURANT_BASE_URL = 'http://localhost:5002';
const DEFAULT_AUTH_BASE_URL = 'http://localhost:5001';

export const RESTAURANT_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_RESTAURANT_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_RESTAURANT_BASE_URL,
);

export const AUTH_SERVICE_BASE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_AUTH_BASE_URL,
);

export const buildRestaurantServiceUrl = (path: string) => {
  if (!path) {
    return RESTAURANT_SERVICE_BASE_URL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${RESTAURANT_SERVICE_BASE_URL}${normalizedPath}`;
};

export const buildAuthServiceUrl = (path: string) => {
  if (!path) {
    return AUTH_SERVICE_BASE_URL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${AUTH_SERVICE_BASE_URL}${normalizedPath}`;
};
