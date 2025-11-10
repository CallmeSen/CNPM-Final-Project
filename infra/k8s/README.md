# Kubernetes Deployment Guide - CNPM Food Delivery

## Cấu trúc thư mục

```
infra/k8s/
├── secrets.yaml                          # SECRET CHUNG cho tất cả services
├── namespace.yaml                        # Namespace cnpm-food-delivery
├── pvcs.yaml                             # PersistentVolumeClaims cho uploads
├── README.md                             # Hướng dẫn deploy chi tiết
│
├── auth-service-deployment.yaml          # Auth service deployment
├── auth-service-service.yaml             # Auth service ClusterIP
├── auth-service-mongo.yaml               # MongoDB StatefulSet cho Auth
│
├── restaurant-service-deployment.yaml
├── restaurant-service-service.yaml
├── restaurant-service-mongo.yaml
│
├── order-service-deployment.yaml
├── order-service-service.yaml
├── order-service-mongo.yaml
│
├── payment-service-deployment.yaml
├── payment-service-service.yaml
├── payment-service-mongo.yaml
│
├── delivery-service-deployment.yaml
└── delivery-service-service.yaml
```

## Thứ tự Deploy

### 1. Tạo Namespace
```powershell
kubectl apply -f namespace.yaml
```

### 2. Tạo Secrets (QUAN TRỌNG!)
```powershell
kubectl apply -f secrets.yaml
```

**⚠️ LƯU Ý:** File `secrets.yaml` chứa credentials được base64-encode. Trong production:
- KHÔNG commit file này vào git
- Sử dụng tools như Sealed Secrets hoặc External Secrets Operator
- Hoặc tạo secrets trực tiếp bằng kubectl:

```powershell
kubectl create secret generic cnpm-secrets `
  --namespace=cnpm-food-delivery `
  --from-literal=MONGO_AUTH_URL='mongodb://admin:admin123@mongodb-auth:27017/Auth?authSource=admin' `
  --from-literal=JWT_SECRET='your-jwt-secret'
```

### 3. Tạo PersistentVolumeClaims
```powershell
kubectl apply -f pvcs.yaml
```

### 4. Deploy MongoDB cho từng service

```powershell
kubectl apply -f auth-service-mongo.yaml
kubectl apply -f restaurant-service-mongo.yaml
kubectl apply -f order-service-mongo.yaml
kubectl apply -f payment-service-mongo.yaml
```

Chờ tất cả MongoDB pods READY:
```powershell
kubectl get statefulsets -n cnpm-food-delivery -w
```

### 5. Deploy Backend Services

```powershell
# Deploy tất cả deployments
kubectl apply -f auth-service-deployment.yaml
kubectl apply -f restaurant-service-deployment.yaml
kubectl apply -f order-service-deployment.yaml
kubectl apply -f payment-service-deployment.yaml
kubectl apply -f delivery-service-deployment.yaml

# Deploy tất cả services
kubectl apply -f auth-service-service.yaml
kubectl apply -f restaurant-service-service.yaml
kubectl apply -f order-service-service.yaml
kubectl apply -f payment-service-service.yaml
kubectl apply -f delivery-service-service.yaml
```

### 6. Verify Deployment

```powershell
# Xem tất cả pods
kubectl get pods -n cnpm-food-delivery

# Xem services
kubectl get svc -n cnpm-food-delivery

# Xem logs của một pod
kubectl logs -f <pod-name> -n cnpm-food-delivery

# Describe pod để debug
kubectl describe pod <pod-name> -n cnpm-food-delivery
```

## Truy cập Services (Development)

### Port Forward để test local

```powershell
# Auth Service
kubectl port-forward -n cnpm-food-delivery svc/auth-service 5001:5001

# Restaurant Service
kubectl port-forward -n cnpm-food-delivery svc/restaurant-service 5002:5002

# Order Service
kubectl port-forward -n cnpm-food-delivery svc/order-service 5005:5005

# Payment Service
kubectl port-forward -n cnpm-food-delivery svc/payment-service 5004:5004

# Delivery Service
kubectl port-forward -n cnpm-food-delivery svc/delivery-service 5003:5003
```

## Docker Images

Trước khi deploy, bạn cần:

1. Build images cho tất cả services:
```powershell
cd backend/auth-service
docker build -t your-dockerhub-username/auth-service:latest .

cd ../restaurant-service
docker build -t your-dockerhub-username/restaurant-service:latest .

# Tương tự cho các services khác...
```

2. Push images lên Docker Hub:
```powershell
docker push your-dockerhub-username/auth-service:latest
docker push your-dockerhub-username/restaurant-service:latest
# ...
```

3. Update `image:` trong các deployment.yaml với username thật của bạn

## Troubleshooting

### Pod không start được

```powershell
# Xem events
kubectl get events -n cnpm-food-delivery --sort-by='.lastTimestamp'

# Xem logs chi tiết
kubectl logs <pod-name> -n cnpm-food-delivery --previous

# Exec vào pod để debug
kubectl exec -it <pod-name> -n cnpm-food-delivery -- /bin/sh
```

### MongoDB connection failed

```powershell
# Kiểm tra MongoDB pods
kubectl get pods -n cnpm-food-delivery | grep mongodb

# Test connection từ một pod khác
kubectl run -it --rm debug --image=mongo:8.0.4-noble --restart=Never -n cnpm-food-delivery -- mongosh mongodb://admin:admin123@mongodb-auth:27017/Auth?authSource=admin
```

### Secret không được mount

```powershell
# Xem secret có tồn tại không
kubectl get secrets -n cnpm-food-delivery

# Xem nội dung secret (base64 encoded)
kubectl get secret cnpm-secrets -n cnpm-food-delivery -o yaml

# Decode một giá trị
kubectl get secret cnpm-secrets -n cnpm-food-delivery -o jsonpath='{.data.JWT_SECRET}' | base64 -d
```

## Production Considerations

1. **Secrets Management**: Sử dụng Sealed Secrets, Vault, hoặc cloud provider secrets
2. **Monitoring**: Thêm Prometheus + Grafana stack
3. **Logging**: Sử dụng EFK (Elasticsearch, Fluentd, Kibana) hoặc Loki
4. **Ingress**: Thêm Ingress Controller (nginx, traefik) thay vì port-forward
5. **Auto-scaling**: Thêm HorizontalPodAutoscaler
6. **Resource Limits**: Điều chỉnh requests/limits phù hợp với workload thật
7. **Health Checks**: Đảm bảo tất cả services có health endpoints
8. **Backup**: Setup MongoDB backup strategies (Velero, custom cronjobs)

## Cleanup

Xóa toàn bộ deployment:

```powershell
kubectl delete namespace cnpm-food-delivery
```

Hoặc xóa từng resource:

```powershell
# Xóa tất cả deployment và service files
kubectl delete -f delivery-service-deployment.yaml
kubectl delete -f delivery-service-service.yaml
kubectl delete -f payment-service-deployment.yaml
kubectl delete -f payment-service-service.yaml
kubectl delete -f payment-service-mongo.yaml
kubectl delete -f order-service-deployment.yaml
kubectl delete -f order-service-service.yaml
kubectl delete -f order-service-mongo.yaml
kubectl delete -f restaurant-service-deployment.yaml
kubectl delete -f restaurant-service-service.yaml
kubectl delete -f restaurant-service-mongo.yaml
kubectl delete -f auth-service-deployment.yaml
kubectl delete -f auth-service-service.yaml
kubectl delete -f auth-service-mongo.yaml
kubectl delete -f pvcs.yaml
kubectl delete -f secrets.yaml
kubectl delete -f namespace.yaml
```
