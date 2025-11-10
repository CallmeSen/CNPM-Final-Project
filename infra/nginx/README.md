# 🚀 NGINX Reverse Proxy for CNPM Food Delivery

## 📋 Tổng quan

Project này sử dụng **NGINX** làm reverse proxy và load balancer cho tất cả services:

- ✅ **Reverse Proxy**: Route requests đến đúng backend services
- ✅ **Load Balancing**: Phân tải giữa multiple instances
- ✅ **SSL/TLS**: HTTPS support cho production
- ✅ **Security**: Rate limiting, CORS, security headers
- ✅ **Caching**: Cache static assets để tăng performance
- ✅ **Health Checks**: Monitor service health

## 🏗️ Cấu trúc NGINX

```
infra/nginx/
├── Dockerfile          # Build nginx container
├── staging.conf        # Config cho staging environment
├── production.conf     # Config cho production environment
└── switch-nginx.ps1    # Script switch config
```

## 🎯 Cách sử dụng

### **1. Chạy với Docker Compose**

```bash
# Build và start tất cả services (bao gồm nginx)
docker-compose up -d

# Hoặc chỉ start nginx
docker-compose up -d nginx
```

### **2. Switch giữa Staging/Production**

```powershell
# Switch sang staging config
.\switch-nginx.ps1 -Environment staging

# Switch sang production config
.\switch-nginx.ps1 -Environment production

# Rebuild nginx container
docker-compose up -d --build nginx
```

### **3. Access URLs**

#### **Staging Environment:**
- **Main App**: http://localhost
- **Admin Panel**: http://admin.staging.food-delivery.local
- **Restaurant Panel**: http://restaurant.staging.food-delivery.local

#### **Production Environment:**
- **Main App**: https://food-delivery.yourdomain.com
- **Admin Panel**: https://admin.food-delivery.yourdomain.com
- **Restaurant Panel**: https://restaurant.food-delivery.yourdomain.com

### **4. API Endpoints**

Tất cả API calls đều qua nginx:

```
GET  /api/auth/*     → auth-service:5001
GET  /api/restaurant/* → restaurant-service:5002
GET  /api/orders/*   → order-service:5005
GET  /api/payment/*  → payment-service:5004
```

## 🔧 Tính năng NGINX

### **Security Features:**
- ✅ Rate limiting (10-50 req/s tùy endpoint)
- ✅ CORS headers
- ✅ Security headers (XSS, CSRF protection)
- ✅ SSL/TLS encryption
- ✅ Block suspicious requests

### **Performance Features:**
- ✅ Gzip compression
- ✅ Static asset caching (1 year)
- ✅ HTTP/2 support
- ✅ Connection pooling

### **Monitoring:**
- ✅ Health check endpoint: `/health`
- ✅ Access logs
- ✅ Error logs

## 📊 Architecture

```
Internet
    ↓
[ NGINX Reverse Proxy ]
    ↓
[ Load Balancer ]
    ↓
├── auth-service:5001
├── restaurant-service:5002
├── order-service:5005
├── payment-service:5004
├── client:3000
├── admin:3001
└── restaurant:3002
```

## 🐛 Troubleshooting

### **Check nginx logs:**
```bash
docker-compose logs -f nginx
```

### **Test nginx config:**
```bash
docker exec cnpm-nginx nginx -t
```

### **Reload nginx config:**
```bash
docker exec cnpm-nginx nginx -s reload
```

### **Check service health:**
```bash
curl http://localhost/health
```

## 🔒 Production Setup

### **SSL Certificate:**
1. Thay thế SSL cert trong `production.conf`
2. Update domain names
3. Enable HTTP/2
4. Setup cert renewal (Let's Encrypt)

### **Security Hardening:**
- Rate limiting zones
- GeoIP blocking
- Fail2ban integration
- ModSecurity WAF

## 📚 Resources

- [NGINX Documentation](https://nginx.org/en/docs/)
- [NGINX Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [NGINX Security Best Practices](https://nginx.org/en/docs/http/configuring_https_servers.html)