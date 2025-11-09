# Simple script to access the application
Write-Host "Starting port-forwards to access CNPM Food Delivery..." -ForegroundColor Green
Write-Host "Starting background jobs..." -ForegroundColor Yellow
Write-Host ""

# Start port-forwards in background jobs
$jobs = @()
$jobs += Start-Job -ScriptBlock { kubectl port-forward -n cnpm-food-delivery svc/client-frontend 3000:3000 }
$jobs += Start-Job -ScriptBlock { kubectl port-forward -n cnpm-food-delivery svc/admin-frontend 3001:3001 }
$jobs += Start-Job -ScriptBlock { kubectl port-forward -n cnpm-food-delivery svc/restaurant-frontend 3002:3002 }

Start-Sleep 3

Write-Host "Access the apps at:" -ForegroundColor Cyan
Write-Host "  Client:     http://localhost:3000" -ForegroundColor White
Write-Host "  Admin:      http://localhost:3001" -ForegroundColor White  
Write-Host "  Restaurant: http://localhost:3002" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all port-forwards" -ForegroundColor Yellow
Write-Host ""

# Keep script running
try {
    while ($true) {
        Start-Sleep 5
    }
}
finally {
    Write-Host "Stopping port-forwards..." -ForegroundColor Yellow
    $jobs | Stop-Job
    $jobs | Remove-Job
    Write-Host "Done" -ForegroundColor Green
}
