# Kubernetes Jobs - Export Frontends & Monitoring

Thư mục này chứa các Kubernetes Jobs để export configurations và status của frontends và monitoring stack.

## Files

### 1. `exports-pvc.yaml`
PersistentVolumeClaim để lưu trữ các file export.
- **Size**: 5Gi
- **Access Mode**: ReadWriteOnce
- **Storage Class**: standard (điều chỉnh theo cluster của bạn)

### 2. `export-frontends-job.yaml`
Job để export tất cả frontend deployments, services, và configs.

**Exported Resources**:
- Client Frontend (port 3000)
- Admin Frontend (port 3001)
- Restaurant Frontend (port 3002)
- NGINX Gateway (LoadBalancer)

**Outputs**:
- YAML manifests của tất cả resources
- README.md với summary
- Tar archive (.tar.gz)

### 3. `export-monitoring-job.yaml`
Job để export monitoring stack (Prometheus, Grafana, Loki, Promtail).

**Exported Resources**:
- Prometheus deployment, configs, PVC
- Grafana deployment, dashboards, datasources, secrets
- Loki deployment, configs, PVC
- Promtail daemonset, configs
- ServiceMonitors và PrometheusRules (nếu có)

**Outputs**:
- Organized directory structure
- README.md với restore instructions
- Tar archive (.tar.gz)

## Deployment Instructions

### 1. Create PVC
```bash
kubectl apply -f infra/k8s/jobs/exports-pvc.yaml
```

### 2. Run Frontend Export Job
```bash
kubectl apply -f infra/k8s/jobs/export-frontends-job.yaml
```

Kiểm tra status:
```bash
kubectl get jobs -n cnpm-food-delivery
kubectl logs -f job/export-frontends -n cnpm-food-delivery
```

### 3. Run Monitoring Export Job
```bash
kubectl apply -f infra/k8s/jobs/export-monitoring-job.yaml
```

Kiểm tra status:
```bash
kubectl get jobs -n cnpm-food-delivery
kubectl logs -f job/export-monitoring -n cnpm-food-delivery
```

## Access Exported Files

### Method 1: Using kubectl cp
```bash
# List available archives
kubectl exec -n cnpm-food-delivery deployment/nginx-gateway -- ls -lh /exports/*.tar.gz

# Copy to local machine
kubectl cp cnpm-food-delivery/<pod-name>:/exports/frontends-export-YYYYMMDD-HHMMSS.tar.gz ./frontends-export.tar.gz
kubectl cp cnpm-food-delivery/<pod-name>:/exports/monitoring-export-YYYYMMDD-HHMMSS.tar.gz ./monitoring-export.tar.gz
```

### Method 2: Create a temporary pod to access PVC
```bash
kubectl run -n cnpm-food-delivery temp-exporter --image=busybox --restart=Never --rm -it \
  --overrides='
{
  "spec": {
    "containers": [{
      "name": "temp-exporter",
      "image": "busybox",
      "command": ["sh"],
      "stdin": true,
      "tty": true,
      "volumeMounts": [{
        "name": "exports",
        "mountPath": "/exports"
      }]
    }],
    "volumes": [{
      "name": "exports",
      "persistentVolumeClaim": {
        "claimName": "exports-pvc"
      }
    }]
  }
}' -- sh

# Inside the pod:
ls -lh /exports/
```

### Method 3: Mount PVC to a deployment
Create a simple nginx deployment with the PVC mounted to serve files via HTTP.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: export-server
  namespace: cnpm-food-delivery
spec:
  replicas: 1
  selector:
    matchLabels:
      app: export-server
  template:
    metadata:
      labels:
        app: export-server
    spec:
      containers:
        - name: nginx
          image: nginx:alpine
          ports:
            - containerPort: 80
          volumeMounts:
            - name: exports
              mountPath: /usr/share/nginx/html
      volumes:
        - name: exports
          persistentVolumeClaim:
            claimName: exports-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: export-server
  namespace: cnpm-food-delivery
spec:
  type: NodePort
  selector:
    app: export-server
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30090
```

Then access via browser: `http://<node-ip>:30090`

## Cleanup

Jobs tự động xóa sau 24 giờ (ttlSecondsAfterFinished: 86400).

Để xóa manual:
```bash
kubectl delete job export-frontends -n cnpm-food-delivery
kubectl delete job export-monitoring -n cnpm-food-delivery
```

Để xóa PVC (⚠️ sẽ mất tất cả exported files):
```bash
kubectl delete pvc exports-pvc -n cnpm-food-delivery
```

## Scheduling Exports

Để chạy exports định kỳ, sử dụng CronJob:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: scheduled-export-frontends
  namespace: cnpm-food-delivery
spec:
  schedule: "0 2 * * *"  # 2 AM daily
  jobTemplate:
    spec:
      # Copy content from export-frontends-job.yaml
```

## Notes

- Jobs chạy với `restartPolicy: OnFailure` để retry nếu fail
- Export files được lưu trong PVC nên persist sau khi job complete
- README.md trong mỗi export chứa detailed summary và restore instructions
- Tar archives giúp dễ dàng download và backup
