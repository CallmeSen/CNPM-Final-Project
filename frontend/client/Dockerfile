# Multi-stage build for client frontend (Next.js)
FROM node:24.8.0 AS deps

# Install dependencies only when needed
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with retry config
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm ci

# Builder stage
FROM node:24.8.0 AS builder

WORKDIR /app

# Accept build arguments for service URLs
ARG AUTH_SERVICE_URL=http://localhost:5001
ARG RESTAURANT_SERVICE_URL=http://localhost:5002
ARG ORDER_SERVICE_URL=http://localhost:5005
ARG PAYMENT_SERVICE_URL=http://localhost:5004
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY

# Set as environment variables for next.config.ts
ENV AUTH_SERVICE_URL=${AUTH_SERVICE_URL}
ENV RESTAURANT_SERVICE_URL=${RESTAURANT_SERVICE_URL}
ENV ORDER_SERVICE_URL=${ORDER_SERVICE_URL}
ENV PAYMENT_SERVICE_URL=${PAYMENT_SERVICE_URL}
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=${REACT_APP_STRIPE_PUBLISHABLE_KEY}

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all files
COPY . .

# Set environment variable for production build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application
RUN npm run build

# Production stage
FROM node:24.8.0 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

# Copy necessary files
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start Next.js application
CMD ["node", "server.js"]

