# Install Prometheus client for all NestJS backend services
# Run this script from project root

Write-Host "Installing Prometheus client for backend services..." -ForegroundColor Green

# Services list
$services = @(
    "backend/auth-service",
    "backend/order-service", 
    "backend/payment-service",
    "backend/restaurant-service"
)

foreach ($service in $services) {
    Write-Host "`nInstalling for $service..." -ForegroundColor Cyan
    
    if (Test-Path $service) {
        Set-Location $service
        npm install @willsoto/nestjs-prometheus prom-client
        Set-Location ../..
        Write-Host "✓ Completed $service" -ForegroundColor Green
    } else {
        Write-Host "✗ Directory $service not found" -ForegroundColor Red
    }
}

Write-Host "`nAll services updated! Next steps:" -ForegroundColor Yellow
Write-Host "1. Add PrometheusModule to each service's app.module.ts"
Write-Host "2. Restart services"
Write-Host "3. Check metrics: curl http://localhost:PORT/metrics"
