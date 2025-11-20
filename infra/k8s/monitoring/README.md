# Monitoring Stack for CNPM Food Delivery

This monitoring stack is deployed in a **separate `monitoring` namespace** and is configured to monitor services across **all namespaces** in the cluster.

## Architecture

The monitoring stack uses:
- **Separate namespace**: `monitoring` (isolated from application namespaces)
- **Cross-namespace monitoring**: Prometheus scrapes metrics from all namespaces
- **Cross-namespace logging**: Promtail collects logs from all namespaces
- **ClusterRole RBAC**: Allows monitoring components to discover resources cluster-wide

## Components

### 1. **Prometheus** (Metrics)
- **Namespace**: `monitoring`
- **Port**: 9090 (NodePort: 30900)
- **URL**: http://localhost:9090
- **Purpose**: Collects and stores time-series metrics from all services
- **Cross-namespace**: Uses ClusterRole to discover and scrape services in any namespace
- **Features**:
  - Service health monitoring across all namespaces
  - Request rates and latencies
  - Resource usage (CPU, memory)
  - Custom business metrics
  - Automatic service discovery via annotations

### 2. **Grafana** (Visualization)
- **Namespace**: `monitoring`
- **Port**: 3000 (NodePort: 30300)
- **URL**: http://localhost:3000
- **Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Purpose**: Unified dashboard for metrics and logs
- **Features**:
  - Pre-configured Prometheus and Loki datasources (FQDN)
  - Create custom dashboards
  - Set up alerts
  - Explore metrics and logs in one place

### 3. **Loki** (Logs)
- **Namespace**: `monitoring`
- **Port**: 3100 (ClusterIP)
- **URL**: http://localhost:3100 (via port-forward)
- **Purpose**: Aggregates logs from all Kubernetes pods
- **Features**:
  - Centralized log storage
  - Label-based log filtering
  - Integration with Grafana

### 4. **Promtail** (Log Shipper)
- **Namespace**: `monitoring`
- **Deployment**: DaemonSet (runs on every node)
- **Purpose**: Collects logs from Kubernetes pods and ships to Loki
- **Cross-namespace**: Uses ClusterRole to collect logs from all namespaces
- **Features**:
  - Automatic Kubernetes pod discovery cluster-wide
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
3. Query logs by namespace and service:
   ```
   {namespace="cnpm-food-delivery", app="auth-service"}
   ```
4. Query logs from any namespace:
   ```
   {namespace="production", app="payment-service"}
   ```
5. Filter by log level:
   ```
   {namespace="cnpm-food-delivery", app="auth-service"} |= "ERROR"
   ```

### 3. View Metrics (Prometheus)
1. Go to **Explore**
2. Select **Prometheus** datasource
3. Example queries for cross-namespace monitoring:
   ```promql
   # CPU usage per pod (all namespaces)
   rate(container_cpu_usage_seconds_total[5m])
   
   # Memory usage per pod in specific namespace
   container_memory_usage_bytes{namespace="cnpm-food-delivery"}
   
   # Pod restart count across all namespaces
   kube_pod_container_status_restarts_total
   
   # Service health by namespace
   up{namespace=~"cnpm-food-delivery|staging|production"}
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
# Check pod status in monitoring namespace
kubectl get pods -n monitoring

# Check logs
kubectl logs -n monitoring deployment/prometheus
kubectl logs -n monitoring deployment/grafana
kubectl logs -n monitoring deployment/loki

# Check RBAC permissions
kubectl get clusterrole prometheus
kubectl get clusterrolebinding prometheus
```

### Can't access Grafana
```bash
# Check service in monitoring namespace
kubectl get svc -n monitoring

# Check pod is running
kubectl get pods -n monitoring -l app=grafana

# Force restart
kubectl rollout restart deployment/grafana -n monitoring

# Check if port-forward is working
kubectl port-forward -n monitoring svc/grafana 3000:3000
```

### No metrics in Prometheus
```bash
# Check Prometheus targets (should show services from all namespaces)
# Open http://localhost:9090/targets

# Check Prometheus config
kubectl describe configmap prometheus-config -n monitoring

# Verify services have correct annotations in their namespace
kubectl get svc -n cnpm-food-delivery -o yaml | grep prometheus

# Check ClusterRole permissions
kubectl describe clusterrole prometheus
```

### No logs in Loki
```bash
# Check Promtail DaemonSet (should run on all nodes)
kubectl get daemonset -n monitoring promtail

# Check Promtail logs
kubectl logs -n monitoring daemonset/promtail

# Verify Promtail has cross-namespace access
kubectl describe clusterrole promtail
```

## Cross-Namespace Monitoring

The monitoring stack is configured to monitor resources across **all namespaces**:

### How it works:
1. **Prometheus**: Uses `ClusterRole` with permissions to discover services, pods, endpoints across all namespaces
2. **Promtail**: Runs as `DaemonSet` with `ClusterRole` to collect logs from pods in any namespace
3. **Service Discovery**: Prometheus automatically discovers services with `prometheus.io/scrape: "true"` annotation in any namespace

### To add monitoring to a new namespace:
1. Deploy your services to the new namespace (e.g., `staging`, `production`)
2. Add Prometheus annotations to service manifests:
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       prometheus.io/scrape: "true"
       prometheus.io/port: "5001"
       prometheus.io/path: "/api/metrics"
   ```
3. Prometheus will automatically discover and scrape the service

## Cleanup

Remove monitoring stack:

```bash
kubectl delete -f infra/k8s/monitoring/loki.yaml
kubectl delete -f infra/k8s/monitoring/grafana.yaml
kubectl delete -f infra/k8s/monitoring/prometheus.yaml
kubectl delete namespace monitoring
```

## Security Considerations

- ClusterRole grants read-only access to resources across all namespaces
- Monitoring components cannot modify application resources
- Grafana access is protected with admin credentials
- Consider using NetworkPolicies to restrict monitoring namespace traffic

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
