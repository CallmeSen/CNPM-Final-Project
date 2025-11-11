[![frontend-ci](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/frontend-ci.yml)[![backend-ci](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/backend-ci.yml)[![deploy-k8s](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/deploy-k8s.yml/badge.svg)](https://github.com/CallmeSen/CNPM-Final-Project/actions/workflows/deploy-k8s.yml)

# 🍕 Fastie.Saigon – Food Delivery Microservices Platform

A comprehensive **microservices-based food ordering and delivery platform** built with modern technologies. Supports four distinct user roles with real-time tracking, secure payments, and complete observability.

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-19+-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-7+-green) ![Kubernetes](https://img.shields.io/badge/Kubernetes-1.28+-blue)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📖 API Documentation](#-api-documentation)
- [🐳 Docker Deployment](#-docker-deployment)
- [☸️ Kubernetes Deployment](#️-kubernetes-deployment)
- [📊 Monitoring & Observability](#-monitoring--observability)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)

## 🎯 Overview

**Fastie.Saigon** is a full-featured food delivery platform that connects customers, restaurants, and delivery personnel through a seamless digital experience. The platform supports real-time order tracking, secure payment processing, and comprehensive analytics.

### 🎭 User Roles

- **👤 Customers**: Browse restaurants, place orders, track deliveries in real-time
- **🏪 Restaurant Admins**: Manage menus, process orders, update order statuses
- **🚴 Delivery Personnel**: Accept deliveries, update locations, manage assignments
- **👑 Super Admin**: Oversee all users, restaurants, and system operations

## ✨ Features

### 🍽️ Customer Features
- Browse restaurants and menus with rich media
- Advanced search and filtering by cuisine, price, rating
- Shopping cart with real-time updates
- Secure checkout with Stripe integration
- Real-time order tracking with delivery personnel location
- Order history and reordering
- Customer reviews and ratings

### 🏪 Restaurant Features
- Complete menu management (CRUD operations)
- Order management with status updates
- Real-time order notifications
- Sales analytics and reporting
- Customer feedback management
- Restaurant profile customization

### 🚴 Delivery Features
- Real-time delivery assignments
- GPS location sharing
- Order status updates
- Delivery history and earnings tracking
- Route optimization suggestions

### 👑 Admin Features
- User management across all roles
- Restaurant onboarding and approval
- System-wide analytics and monitoring
- Payment reconciliation
- Customer support tools

## 🏗️ Architecture

### Microservices Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend Apps │    │  API Gateway    │    │   Monitoring    │
│                 │    │   (Nginx)       │    │   Stack         │
│ • Client (3000) │◄──►│                 │    │ • Prometheus    │
│ • Admin (3001)  │    │ • Load Balance  │    │ • Grafana       │
│ • Restaurant    │    │ • SSL/TLS       │    │ • Loki          │
│   (3002)        │    │ • Rate Limiting │    │ • Promtail      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │ Order Service   │    │Payment Service  │
│   (Port 5001)   │    │  (Port 5005)    │    │  (Port 5004)    │
│ • JWT Auth      │    │ • WebSocket     │    │ • Stripe        │
│ • User Mgmt     │    │ • Real-time     │    │ • Webhooks      │
└─────────────────┘    │ • Order Logic   │    └─────────────────┘
                       └─────────────────┘             │
                              │                        │
                              ▼                        ▼
                   ┌─────────────────┐    ┌─────────────────┐
                   │Restaurant Service│    │Delivery Service │
                   │  (Port 5002)     │    │  (Port 5003)    │
                   │ • Menu Mgmt      │    │ • GPS Tracking  │
                   │ • File Upload    │    │ • Real-time     │
                   │ • Analytics      │    │ • Assignments   │
                   └─────────────────┘    └─────────────────┘
                              │
                              ▼
                   ┌─────────────────┐
                   │   Databases     │
                   │   (MongoDB)     │
                   │ • Auth DB       │
                   │ • Restaurant DB │
                   │ • Order DB      │
                   │ • Payment DB    │
                   │ • Delivery DB   │
                   └─────────────────┘
```

### Service Details

| Service | Port | Technology | Database | Description |
|---------|------|------------|----------|-------------|
| **Auth Service** | 5001 | NestJS + TypeScript | MongoDB | JWT authentication, user management |
| **Restaurant Service** | 5002 | Express.js | MongoDB | Menu management, file uploads |
| **Order Service** | 5005 | NestJS + WebSocket | MongoDB | Order processing, real-time updates |
| **Payment Service** | 5004 | Express.js | MongoDB | Stripe integration, webhooks |
| **Delivery Service** | 5003 | Express.js + Socket.IO | MongoDB | GPS tracking, delivery management |
| **Client Frontend** | 3000 | Next.js 15 + React 19 | - | Customer-facing application |
| **Admin Frontend** | 3001 | Next.js + React | - | Super admin dashboard |
| **Restaurant Frontend** | 3002 | Next.js + React | - | Restaurant management interface |

## 🛠️ Tech Stack

### Backend Services
- **Framework**: NestJS, Express.js
- **Language**: TypeScript, JavaScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **Real-time**: WebSocket (Socket.IO), Server-Sent Events
- **File Storage**: Multer for uploads, local storage

### Frontend Applications
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript, JavaScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS, Bootstrap 5
- **State Management**: React Context, Custom Hooks
- **HTTP Client**: Axios
- **Animations**: Framer Motion

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (K8s)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana + Loki
- **Load Balancing**: Nginx
- **Database**: MongoDB with StatefulSets

### External Services
- **Payment Processing**: Stripe
- **Email Service**: Resend
- **SMS Service**: Twilio
- **Container Registry**: Docker Hub

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Docker** and Docker Compose
- **MongoDB** (local or cloud)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/CallmeSen/CNPM-Final-Project.git
cd CNPM-Final-Project
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.template .env

# Edit .env with your configuration
# Required: MongoDB URIs, JWT secret, Stripe keys, etc.
```

### 3. Local Development with Docker
```bash
# Start all services
docker-compose up --build

# Or start individual services
docker-compose up mongodb auth-service restaurant-service
```

### 4. Manual Development Setup
```bash
# Install dependencies for all services
npm run install:all

# Start MongoDB (if not using Docker)
mongod

# Start backend services
npm run dev:auth        # Port 5001
npm run dev:restaurant  # Port 5002
npm run dev:order       # Port 5005
npm run dev:payment     # Port 5004
npm run dev:delivery    # Port 5003

# Start frontend applications
cd frontend/client && npm run dev      # Port 3000
cd frontend/admin && npm run dev       # Port 3001
cd frontend/restaurant && npm run dev  # Port 3002
```

### 5. Access the Application
- **Customer App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **Restaurant Dashboard**: http://localhost:3002
- **API Documentation**: http://localhost:5001/api (Auth Service)

## 📖 API Documentation

### Authentication Endpoints
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET  /api/auth/profile
```

### Restaurant Endpoints
```http
GET    /api/restaurant
POST   /api/restaurant
GET    /api/restaurant/:id
PUT    /api/restaurant/:id
DELETE /api/restaurant/:id

# Menu Management
GET    /api/food-items
POST   /api/food-items
PUT    /api/food-items/:id
DELETE /api/food-items/:id
```

### Order Endpoints
```http
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
WebSocket: /api/orders/events
```

### Payment Endpoints
```http
POST   /api/payment/create-session
POST   /api/payment/webhook
GET    /api/payment/status/:orderId
```

### Delivery Endpoints
```http
GET    /api/delivery/assignments
PUT    /api/delivery/:id/status
PUT    /api/delivery/:id/location
WebSocket: /api/delivery/tracking
```

## 🐳 Docker Deployment

### Development Environment
```bash
# Start complete development stack
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d
```

### Individual Service Management
```bash
# Start specific service
docker-compose up auth-service

# Rebuild and restart service
docker-compose up --build --force-recreate auth-service
```

## ☸️ Kubernetes Deployment

### Prerequisites
- **Kubernetes** cluster (Docker Desktop, Minikube, or cloud)
- **kubectl** configured
- **Docker Hub** account for image registry

### Automated Deployment (CI/CD)
```bash
# Push to main branch to trigger deployment
git add .
git commit -m "Deploy to production"
git push origin main
```

### Manual Deployment
```bash
# Set Docker Hub credentials
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=YOUR_EMAIL

# Deploy to Kubernetes
kubectl apply -f infra/k8s/

# Check deployment status
kubectl get pods -n cnpm-food-delivery
kubectl get services -n cnpm-food-delivery
```

### Access Deployed Application
```bash
# Port forward services
kubectl port-forward -n cnpm-food-delivery svc/nginx-gateway 8080:80
kubectl port-forward -n cnpm-food-delivery svc/grafana 3030:3000

# Access URLs
echo "Application: http://localhost:8080"
echo "Grafana: http://localhost:3030 (admin/admin123)"
```

## 📊 Monitoring & Observability

### Included Monitoring Stack
- **Prometheus**: Metrics collection and alerting
- **Grafana**: Visualization dashboards
- **Loki**: Log aggregation
- **Promtail**: Log shipping from containers

### Pre-configured Dashboards
1. **Backend Services Overview**: Monitor all microservices
2. **Frontend Services Overview**: Track frontend performance
3. **System Overview**: Infrastructure metrics
4. **Loki Logs Dashboard**: Centralized logging
5. **Node.js Application Dashboard**: Runtime metrics

### Access Monitoring
```powershell
# Run the monitoring access script
.\access-monitoring.ps1

# Or manually port-forward
kubectl port-forward -n cnpm-food-delivery svc/grafana 3030:3000
kubectl port-forward -n cnpm-food-delivery svc/prometheus 9090:9090
```

## 🧪 Testing

### Unit Tests
```bash
# Run tests for specific service
cd backend/auth-service && npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Integration Tests
```bash
# Test with Docker Compose
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

### Load Testing
```bash
# Install Artillery
npm install -g artillery

# Run load tests
artillery run tests/load-test.yml
```

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb config with React rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks for linting

### Commit Convention
```
feat: add new payment method
fix: resolve order status bug
docs: update API documentation
style: format code with Prettier
refactor: optimize database queries
test: add unit tests for auth service
```

## 📄 License

This project is licensed under the **GNU License** - see the [LICENSE](LICENSE) file for details.

## 👥 Team

### Core Contributors
- **👨‍💻 [CallmeSen](https://github.com/CallmeSen)** - *Lead Developer & Architect*
  - Backend microservices development
  - DevOps & infrastructure setup
  - CI/CD pipeline implementation

- **👨‍💻 [Nguyen Huynh Phuong Loc](https://github.com/nguyenhuynhphuongloc)** - *Frontend Developer*
  - React/Next.js application development
  - UI/UX design and implementation
  - User experience optimization

### Project Links
- **📊 [Project Board](https://github.com/CallmeSen/CNPM-Final-Project/projects)**
- **🐛 [Issue Tracker](https://github.com/CallmeSen/CNPM-Final-Project/issues)**
- **📖 [Documentation Wiki](https://github.com/CallmeSen/CNPM-Final-Project/wiki)**

---

<div align="center">

**Made with ❤️ in Saigon, Vietnam**

⭐ **Star this repository** if you found it helpful!

[⬆️ Back to Top](#-fastiesaigon--food-delivery-microservices-platform)

</div>

