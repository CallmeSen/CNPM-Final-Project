# Grafana Dashboards for Kubernetes

Tất cả các dashboard Grafana được tự động load vào Grafana khi deploy lên Kubernetes.

## 📊 Available Dashboards

### 1. **Backend Services Overview** (`backend-overview.json`)
- **Mô tả**: Monitoring cho các backend microservices
- **Metrics**:
  - Service status (Auth, Order, Restaurant, Payment)
  - Memory usage
  - CPU usage
  - Heap usage (%)
  - Event loop lag

### 2. **Frontend Services Overview** (`frontend-overview.json`)
- **Mô tả**: Monitoring cho các frontend applications
- **Metrics**:
  - Event loop lag (P50, P90, P99)
  - Heap memory usage (%)
  - Resident memory
  - CPU usage
  - Garbage collection duration
  - Active handles & requests

### 3. **System Overview** (`system-overview.json`)
- **Mô tả**: Tổng quan hệ thống và infrastructure
- **Metrics**:
  - Total services UP
  - Service health status
  - System CPU usage
  - System memory usage
  - Network traffic
  - Disk usage

### 4. **Loki Logs - Docker** (`loki-docker.json`)
- **Mô tả**: Dashboard xem logs từ Loki
- **Features**:
  - All container logs
  - Error logs filter
  - Warning logs filter
  - Backend services logs
  - Frontend services logs

### 5. **Node.js Application Dashboard** (`nodejs-application-dashboard.json`)
- **Mô tả**: Chi tiết về Node.js runtime metrics
- **Metrics**:
  - Process CPU usage
  - Event loop lag
  - Node.js version
  - Process restart times
  - Process memory usage (heap, RSS, external)
  - Active handlers/requests
  - Heap total/used/available detail

### 6. **Loki Stack Monitoring** (`14055_rev5.json`)
- **Mô tả**: Monitoring Loki và Promtail stack
- **Features**:
  - Alerts summary
  - Error/warning messages from Loki
  - Error/warning messages from Promtail
  - Resource usage monitoring

### 7. **Kubernetes Cluster** (`1860_rev42.json`)
- **Mô tả**: Kubernetes cluster monitoring dashboard

## 🚀 Deployment

### Automatic Deployment (via CI/CD)

Khi bạn push code lên GitHub, workflow sẽ tự động:

1. Generate dashboard ConfigMaps từ JSON files
2. Deploy ConfigMaps lên K8s cluster
3. Grafana tự động load tất cả dashboards

### Manual Deployment

```powershell
# Generate dashboard ConfigMaps
cd infra/k8s/monitoring
.\generate-dashboards.ps1

# Apply to cluster
kubectl apply -f grafana-dashboards.yaml
kubectl apply -f grafana.yaml

# Restart Grafana to reload dashboards
kubectl rollout restart deployment/grafana -n cnpm-food-delivery
```

## 🔄 Update Dashboards

### Cách 1: Sửa trực tiếp trong Grafana UI
1. Truy cập Grafana: http://localhost:3030
2. Login: admin/admin123
3. Chỉnh sửa dashboard
4. Save dashboard
5. Export JSON → Copy vào thư mục `json/`
6. Re-generate ConfigMaps và deploy lại

### Cách 2: Sửa file JSON
1. Edit file trong `monitoring/grafana/provisioning/dashboards/json/`
2. Run script generate:
   ```powershell
   cd infra/k8s/monitoring
   .\generate-dashboards.ps1
   ```
3. Commit và push → CI/CD tự động deploy

## 📁 File Structure

```
monitoring/grafana/provisioning/dashboards/
├── json/                          # Dashboard JSON files (source)
│   ├── backend-overview.json
│   ├── frontend-overview.json
│   ├── system-overview.json
│   ├── loki-docker.json
│   ├── nodejs-application-dashboard.json
│   ├── 14055_rev5.json
│   └── 1860_rev42.json
│
infra/k8s/monitoring/
├── generate-dashboards.ps1        # Script to generate K8s ConfigMaps
├── grafana-dashboards.yaml        # Generated ConfigMaps (auto-generated)
└── grafana.yaml                   # Grafana deployment with dashboard mounts
```

## 🎯 Dashboard UID Reference

Sử dụng UID để tạo direct link đến dashboard:

- **backend-overview**: `uid=backend-overview`
- **frontend-overview**: `uid=frontend-overview`
- **system-overview**: `uid=system-overview`
- **loki-docker**: `uid=loki-docker`
- **nodejs-application-dashboard**: `uid=PTSqcpJWk`
- **loki-stack-monitoring**: `uid=loki_stack_monitoring_quortex`

Example: `http://localhost:3030/d/backend-overview/backend-services-overview`

## 🔍 Troubleshooting

### Dashboard không hiển thị?

```powershell
# Check ConfigMaps
kubectl get configmaps -n cnpm-food-delivery | grep dashboard

# Check Grafana logs
kubectl logs -n cnpm-food-delivery deployment/grafana

# Restart Grafana
kubectl rollout restart deployment/grafana -n cnpm-food-delivery
```

### Dashboard có lỗi "No data"?

- Kiểm tra datasource đã được cấu hình đúng chưa (Prometheus, Loki)
- Kiểm tra services có đang expose metrics không
- Verify Prometheus đang scrape metrics: http://localhost:9090/targets

## 📚 Import Dashboard từ Grafana.com

Grafana cung cấp nhiều dashboard template miễn phí:

1. Truy cập https://grafana.com/grafana/dashboards/
2. Tìm dashboard phù hợp (ví dụ: Node Exporter, Kubernetes)
3. Copy dashboard ID hoặc download JSON
4. Import vào Grafana UI hoặc thêm vào thư mục `json/`

**Popular dashboards:**
- Node Exporter Full: 1860
- Kubernetes Cluster Monitoring: 7249
- Loki Stack Monitoring: 14055
- Docker and System Monitoring: 893
