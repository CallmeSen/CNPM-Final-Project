# Monitoring Stack for CNPM Food Delivery

## Components

### 1. **Prometheus** (Metrics)
- **Port**: 9090 (NodePort: 30900)
- **URL**: http://localhost:9090
- **Purpose**: Collects and stores time-series metrics from all services
- **Features**:
  - Service health monitoring
  - Request rates and latencies
  - Resource usage (CPU, memory)
  - Custom business metrics

### 2. **Grafana** (Visualization)
- **Port**: 3000 (NodePort: 30300)
- **URL**: http://localhost:3000
- **Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Purpose**: Unified dashboard for metrics and logs
- **Features**:
  - Pre-configured Prometheus and Loki datasources
  - Create custom dashboards
  - Set up alerts
  - Explore metrics and logs in one place

### 3. **Loki** (Logs)
- **Port**: 3100 (ClusterIP)
- **URL**: http://localhost:3100 (via port-forward)
- **Purpose**: Aggregates logs from all Kubernetes pods
- **Features**:
  - Centralized log storage
  - Label-based log filtering
  - Integration with Grafana

### 4. **Promtail** (Log Shipper)
- **Purpose**: Collects logs from Kubernetes pods and ships to Loki
- **Features**:
  - Automatic Kubernetes pod discovery
  - Label extraction from pod metadata
  - Real-time log streaming

## Quick Start

### Deploy Monitoring Stack

The monitoring stack is automatically deployed by the CI/CD workflow:

```bash
# Workflow will deploy monitoring after app deployment
git push origin source
```

Or deploy manually:

```bash
# Create monitoring namespace
kubectl apply -f infra/k8s/monitoring/namespace.yaml

# Deploy Prometheus
kubectl apply -f infra/k8s/monitoring/prometheus.yaml

# Deploy Grafana
kubectl apply -f infra/k8s/monitoring/grafana.yaml

# Deploy Loki & Promtail
kubectl apply -f infra/k8s/monitoring/loki.yaml
```

### Access Monitoring

#### Option 1: Use PowerShell script (Recommended)
```powershell
.\access-monitoring.ps1
```

#### Option 2: Manual port-forward
```bash
# Grafana
kubectl port-forward -n monitoring svc/grafana 3000:3000

# Prometheus
kubectl port-forward -n monitoring svc/prometheus 9090:9090
```

#### Option 3: NodePort (if on cloud with external IP)
- Grafana: http://<node-ip>:30300
- Prometheus: http://<node-ip>:30900

## Using Grafana

### 1. First Login
1. Open http://localhost:3000
2. Login with `admin` / `admin123`
3. Datasources are pre-configured (Prometheus + Loki)

### 2. View Logs (Loki)
1. Go to **Explore** (compass icon)
2. Select **Loki** datasource
3. Query logs by service:
   ```
   {namespace="cnpm-food-delivery", app="auth-service"}
   ```
4. Filter by log level:
   ```
   {namespace="cnpm-food-delivery", app="auth-service"} |= "ERROR"
   ```

### 3. View Metrics (Prometheus)
1. Go to **Explore**
2. Select **Prometheus** datasource
3. Example queries:
   ```promql
   # CPU usage per pod
   rate(container_cpu_usage_seconds_total{namespace="cnpm-food-delivery"}[5m])
   
   # Memory usage per pod
   container_memory_usage_bytes{namespace="cnpm-food-delivery"}
   
   # Pod restart count
   kube_pod_container_status_restarts_total{namespace="cnpm-food-delivery"}
   ```

### 4. Create Dashboard
1. Click **+** → **Dashboard**
2. Add panel
3. Select metric from Prometheus
4. Customize visualization
5. Save dashboard

## Pre-built Dashboards (Import)

Import popular Kubernetes dashboards:

1. Go to **Dashboards** → **Import**
2. Enter dashboard ID:
   - **315**: Kubernetes cluster monitoring
   - **6417**: Kubernetes cluster monitoring (Prometheus)
   - **12114**: Kubernetes pod monitoring
3. Select Prometheus datasource
4. Click Import

## Monitoring Services

To enable Prometheus scraping for your services, add annotations:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: auth-service
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "5001"
    prometheus.io/path: "/api/metrics"
spec:
  # ... rest of service config
```

## Troubleshooting

### Monitoring pods not starting
```bash
# Check pod status
kubectl get pods -n monitoring

# Check logs
kubectl logs -n monitoring deployment/prometheus
kubectl logs -n monitoring deployment/grafana
kubectl logs -n monitoring deployment/loki
```

### Can't access Grafana
```bash
# Check service
kubectl get svc -n monitoring

# Check pod is running
kubectl get pods -n monitoring -l app=grafana

# Force restart
kubectl rollout restart deployment/grafana -n monitoring
```

### No metrics in Prometheus
```bash
# Check Prometheus targets
# Open http://localhost:9090/targets
# Services should have annotations set correctly

# Check Prometheus config
kubectl describe configmap prometheus-config -n monitoring
```

## Cleanup

Remove monitoring stack:

```bash
kubectl delete -f infra/k8s/monitoring/loki.yaml
kubectl delete -f infra/k8s/monitoring/grafana.yaml
kubectl delete -f infra/k8s/monitoring/prometheus.yaml
kubectl delete namespace monitoring
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│            Grafana (Visualization)              │
│         http://localhost:3000                   │
└────────────┬────────────────────┬───────────────┘
             │                    │
             │                    │
    ┌────────▼────────┐  ┌────────▼────────┐
    │   Prometheus    │  │      Loki       │
    │   (Metrics)     │  │     (Logs)      │
    └────────┬────────┘  └────────▲────────┘
             │                    │
             │                    │
    ┌────────▼────────────────────┴────────┐
    │     Kubernetes Services & Pods       │
    │  (cnpm-food-delivery namespace)      │
    │  - auth-service                      │
    │  - restaurant-service                │
    │  - order-service                     │
    │  - payment-service                   │
    │  - frontends                         │
    └──────────────────────────────────────┘
```
