# Monitoring & Logging Stack

This project uses a complete observability stack for monitoring metrics and logs:

## Components

### 1. **Prometheus** (Metrics)
- **Port**: 9090
- **URL**: http://localhost:9090
- **Purpose**: Collects and stores time-series metrics from all services
- **Features**:
  - Service health monitoring
  - Request rates and latencies
  - Resource usage (CPU, memory)
  - Custom business metrics

### 2. **Loki** (Logs)
- **Port**: 3100
- **URL**: http://localhost:3100
- **Purpose**: Aggregates logs from all Docker containers
- **Features**:
  - Centralized log storage
  - Log retention (31 days default)
  - Label-based log filtering
  - Integration with Grafana

### 3. **Promtail** (Log Shipper)
- **Purpose**: Collects logs from Docker containers and ships to Loki
- **Features**:
  - Automatic Docker service discovery
  - JSON log parsing for NestJS services
  - Label extraction from container metadata

### 4. **Grafana** (Visualization)
- **Port**: 3030 (mapped from 3000)
- **URL**: http://localhost:3030
- **Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Purpose**: Unified dashboard for metrics and logs
- **Features**:
  - Pre-configured Prometheus and Loki datasources
  - Create custom dashboards
  - Set up alerts
  - Explore metrics and logs in one place

### 5. **Node Exporter** (System Metrics)
- **Port**: 9100
- **Purpose**: Exports host system metrics (CPU, memory, disk, network)

## Quick Start

### Start the monitoring stack:
```bash
docker-compose up -d prometheus grafana loki promtail node-exporter
```

### Access the dashboards:

1. **Grafana**: http://localhost:3030
   - Login with admin/admin123
   - Browse pre-configured datasources
   - Create dashboards

2. **Prometheus**: http://localhost:9090
   - Query metrics directly
   - Check service targets: http://localhost:9090/targets
   - Example query: `up{job="payment-service"}`

3. **Loki (via Grafana)**:
   - Open Grafana → Explore → Select Loki datasource
   - Query logs by service: `{service="payment-service"}`
   - Filter by log level: `{service="payment-service"} |= "ERROR"`

## Monitoring Backend Services

Each NestJS service should expose metrics at `/metrics` endpoint:

### Installation (for each service):
```bash
npm install @willsoto/nestjs-prometheus prom-client
```

### Configuration:
Add to your NestJS `app.module.ts`:
```typescript
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
      path: '/metrics',
    }),
    // ... other imports
  ],
})
```

## Useful Queries

### Prometheus Metrics:
```promql
# Request rate per service
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m])

# Memory usage
process_resident_memory_bytes / 1024 / 1024

# CPU usage
rate(process_cpu_seconds_total[5m])
```

### Loki Logs:
```logql
# All logs from payment service
{service="payment-service"}

# Errors only
{service="payment-service"} |= "ERROR"

# Webhook logs
{service="payment-service"} |= "webhook"

# Filter by context
{service="payment-service", context="PaymentController"}

# Count errors per minute
sum(rate({service="payment-service"} |= "ERROR" [1m]))
```

## Grafana Dashboard Examples

### 1. Service Health Dashboard
- Uptime of all services
- Request rates
- Error rates
- Response times

### 2. Payment Service Dashboard
- Payment success rate
- Stripe webhook events
- Payment processing time
- Failed payments

### 3. Order Service Dashboard
- Orders created per minute
- Order status distribution
- Average order value
- Order processing pipeline

### 4. Logs Dashboard
- Real-time log stream
- Error trends
- Log volume by service
- Search and filter capabilities

## Troubleshooting

### Check if services are being scraped:
```bash
curl http://localhost:9090/api/v1/targets
```

### Check if logs are being collected:
```bash
curl http://localhost:3100/ready
```

### View Promtail status:
```bash
docker logs cnpm-promtail
```

### Test metrics endpoint:
```bash
curl http://localhost:5004/metrics  # Payment service
curl http://localhost:5001/metrics  # Auth service
```

## Best Practices

1. **Label Consistency**: Use consistent labels across services
2. **Log Levels**: Use appropriate log levels (INFO, WARN, ERROR)
3. **Retention**: Adjust Loki retention based on storage capacity
4. **Alerting**: Set up Grafana alerts for critical metrics
5. **Security**: Change default Grafana password in production

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Grafana (3030)                    │
│            Visualization & Dashboards               │
└──────────────────┬──────────────────┬───────────────┘
                   │                  │
         ┌─────────▼─────────┐ ┌─────▼────────┐
         │ Prometheus (9090) │ │  Loki (3100) │
         │    (Metrics)      │ │   (Logs)     │
         └─────────┬─────────┘ └─────▲────────┘
                   │                  │
       ┌───────────┼──────────────────┼────────────┐
       │           │                  │            │
   ┌───▼───┐   ┌──▼───┐   ┌─────▼────────┐   ┌───▼────┐
   │ Auth  │   │Order │   │   Promtail   │   │Payment │
   │Service│   │Service   │(Log Shipper) │   │Service │
   └───────┘   └──────┘   └──────────────┘   └────────┘
```

## Port Summary

| Service        | Port | Purpose                    |
|----------------|------|----------------------------|
| Grafana        | 3030 | Dashboards & Visualization |
| Prometheus     | 9090 | Metrics storage & queries  |
| Loki           | 3100 | Log aggregation            |
| Node Exporter  | 9100 | System metrics             |
| Auth Service   | 5001 | + /metrics endpoint        |
| Restaurant     | 5002 | + /metrics endpoint        |
| Payment        | 5004 | + /metrics endpoint        |
| Order          | 5005 | + /metrics endpoint        |

## Next Steps

1. ✅ Install Prometheus client in NestJS services
2. ✅ Configure structured logging (JSON format)
3. ✅ Create Grafana dashboards for each service
4. ✅ Set up alerts for critical metrics
5. ✅ Add custom business metrics (payment success rate, order completion, etc.)
