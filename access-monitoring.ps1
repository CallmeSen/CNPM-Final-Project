# Access Monitoring Stack
Write-Host "Starting port-forward for Monitoring Stack..." -ForegroundColor Cyan

# Start Grafana port-forward in background
Start-Job -ScriptBlock {
    kubectl port-forward -n cnpm-food-delivery svc/grafana 3030:3000
} -Name "Grafana"

# Start Prometheus port-forward in background
Start-Job -ScriptBlock {
    kubectl port-forward -n cnpm-food-delivery svc/prometheus 9090:9090
} -Name "Prometheus"

Start-Sleep -Seconds 3

Write-Host "`nMonitoring Stack is now accessible:" -ForegroundColor Green
Write-Host "   Grafana:    http://localhost:3030 (admin/admin123)" -ForegroundColor Yellow
Write-Host "   Prometheus: http://localhost:9090" -ForegroundColor Yellow
Write-Host "`nPress Ctrl+C to stop port-forwarding`n" -ForegroundColor Gray

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host "`nStopping port-forwards..." -ForegroundColor Red
    Get-Job | Stop-Job
    Get-Job | Remove-Job
}
