# Kubernetes Deployment Guide

## Prerequisites

1. **Docker Hub Account**
   - Create account at https://hub.docker.com
   - Note your username

2. **GitHub Secrets**
   Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
   - `KUBE_CONFIG`: Your Kubernetes config file content (base64 encoded)

## Deployment Options

### Option 1: Deploy from Docker Hub (Recommended for Production)

1. **Update deployment manifests to use Docker Hub images:**

```bash
# In all deployment files, change image from:
image: auth-service:latest

# To:
image: your-dockerhub-username/auth-service:latest
```

2. **Push code to trigger GitHub Actions:**

```bash
git add .
git commit -m "Deploy to Kubernetes"
git push origin main
```

The workflow will:
- Build all Docker images
- Push to Docker Hub
- Deploy to Kubernetes cluster
- Verify deployment

### Option 2: Deploy with Local Images (Development)

1. **Build all images locally:**

```powershell
# Backend services
cd backend/auth-service
docker build -t auth-service:latest .

cd ../restaurant-service
docker build -t restaurant-service:latest .

cd ../order-service
docker build -t order-service:latest .

cd ../payment-service
docker build -t payment-service:latest .

# Frontend apps
cd ../../frontend/client
docker build -t client-frontend:latest .

cd ../admin
docker build -t admin-frontend:latest .

cd ../restaurant
docker build -t restaurant-frontend:latest .
```

2. **Deploy to Kubernetes:**

```powershell
cd infra/k8s
kubectl apply -f namespace.yaml
kubectl apply -f secrets.yaml
kubectl apply -f pvcs.yaml
kubectl apply -f .
```

3. **Access the application:**

```powershell
# Run the port-forward script
.\start-port-forward.ps1

# Or manually:
kubectl port-forward -n cnpm-food-delivery svc/nginx-gateway 8080:80
```

Then open: http://localhost:8080

## Updating Deployments

### Update specific service:

```bash
# Backend
kubectl set image deployment/auth-service auth-service=your-username/auth-service:latest -n cnpm-food-delivery

# Frontend
kubectl set image deployment/client-frontend client-frontend=your-username/client-frontend:latest -n cnpm-food-delivery
```

### Restart deployment:

```bash
kubectl rollout restart deployment/auth-service -n cnpm-food-delivery
```

### Check rollout status:

```bash
kubectl rollout status deployment/auth-service -n cnpm-food-delivery
```

## Monitoring

### Check pod status:

```powershell
kubectl get pods -n cnpm-food-delivery
```

### Check logs:

```powershell
# Specific pod
kubectl logs -n cnpm-food-delivery <pod-name>

# All pods of a deployment
kubectl logs -n cnpm-food-delivery -l app=auth-service --tail=50
```

### Check services:

```powershell
kubectl get svc -n cnpm-food-delivery
```

## Troubleshooting

### Pods not starting:

```powershell
kubectl describe pod <pod-name> -n cnpm-food-delivery
```

### ImagePullBackOff errors:

- Check if image exists on Docker Hub
- Verify image name matches deployment
- Check if repository is public or add imagePullSecrets

### Database connection issues:

```powershell
# Check MongoDB pods
kubectl get pods -n cnpm-food-delivery | Select-String "mongodb"

# Check MongoDB logs
kubectl logs -n cnpm-food-delivery mongodb-auth-0
```

### Service not accessible:

```powershell
# Check service endpoints
kubectl get endpoints -n cnpm-food-delivery

# Test service internally
kubectl run -it --rm debug --image=busybox --restart=Never -n cnpm-food-delivery -- wget -O- http://auth-service:5001
```

## Cleanup

### Delete all resources:

```powershell
kubectl delete namespace cnpm-food-delivery
```

### Delete specific deployment:

```powershell
kubectl delete deployment auth-service -n cnpm-food-delivery
```

## CI/CD Workflow

The GitHub Actions workflow (`.github/workflows/deploy-k8s.yml`) automatically:

1. Builds Docker images when code changes in `backend/`, `frontend/`, or `infra/k8s/`
2. Pushes images to Docker Hub
3. Updates Kubernetes deployments
4. Waits for rollout completion
5. Verifies deployment status

**Trigger manually:**

Go to GitHub → Actions → Deploy to Kubernetes → Run workflow

## Environment Variables

Update secrets in `infra/k8s/secrets.yaml`:

```yaml
stringData:
  MONGO_AUTH_URL: "mongodb://admin:admin123@mongodb-auth:27017/auth_db"
  JWT_SECRET: "your-secret-key"
  STRIPE_SECRET_KEY: "sk_test_your_key"
  # ... etc
```

Then apply:

```powershell
kubectl apply -f infra/k8s/secrets.yaml
kubectl rollout restart deployment/auth-service -n cnpm-food-delivery
```
