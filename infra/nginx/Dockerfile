# Dockerfile for NGINX reverse proxy
FROM nginx:alpine

# Copy nginx configuration
COPY staging.conf /etc/nginx/conf.d/default.conf

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Create log directory
RUN mkdir -p /var/log/nginx

# Expose ports
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]