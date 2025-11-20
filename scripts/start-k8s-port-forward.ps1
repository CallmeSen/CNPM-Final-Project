# K8s Port Forward Script - CNPM Food Delivery
# Forward all frontend and monitoring services to localhost

Write-Host "=== Starting K8s Port Forward for All Services ===" -ForegroundColor Cyan
Write-Host ""

# Check if kubectl is available
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: kubectl not found. Please install kubectl first." -ForegroundColor Red
    exit 1
}

# Check if namespace exists
$namespace = "cnpm-food-delivery"
$nsCheck = kubectl get namespace $namespace 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Namespace '$namespace' not found." -ForegroundColor Red
    exit 1
}

Write-Host "Namespace: $namespace" -ForegroundColor Green
Write-Host ""

# Kill any existing port-forward processes
Write-Host "Cleaning up existing port-forward processes..." -ForegroundColor Yellow
Get-Process -Name kubectl -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*port-forward*"
} | Stop-Process -Force
Start-Sleep -Seconds 2

# Array to store background jobs
$jobs = @()

# Function to start port-forward in background
function Start-PortForward {
    param(
        [string]$ServiceName,
        [string]$LocalPort,
        [string]$RemotePort,
        [string]$Description,
        [string]$Namespace = "cnpm-food-delivery"
    )
    
    Write-Host "Forwarding $Description..." -ForegroundColor Cyan
    Write-Host "  Service: $ServiceName" -ForegroundColor Gray
    Write-Host "  Local:   http://localhost:$LocalPort" -ForegroundColor Green
    Write-Host "  Remote:  ${ServiceName}:${RemotePort}" -ForegroundColor Gray
    
    $job = Start-Job -ScriptBlock {
        param($ns, $svc, $lp, $rp)
        kubectl port-forward -n $ns "svc/$svc" "${lp}:${rp}"
    } -ArgumentList $Namespace, $ServiceName, $LocalPort, $RemotePort
    
    Write-Host "  Job ID:  $($job.Id)" -ForegroundColor Gray
    Write-Host ""
    
    return $job
}

Write-Host "=== Frontend Services ===" -ForegroundColor Cyan
Write-Host ""

# Client Frontend (Port 3000)
$jobs += Start-PortForward -ServiceName "client-frontend" `
    -LocalPort "3000" `
    -RemotePort "3000" `
    -Description "Client Frontend (Customer App)"

# Admin Frontend (Port 3001)
$jobs += Start-PortForward -ServiceName "admin-frontend" `
    -LocalPort "3001" `
    -RemotePort "3001" `
    -Description "Admin Frontend (Admin Dashboard)"

# Restaurant Frontend (Port 3002)
$jobs += Start-PortForward -ServiceName "restaurant-frontend" `
    -LocalPort "3002" `
    -RemotePort "3002" `
    -Description "Restaurant Frontend (Restaurant Dashboard)"

Write-Host "=== NGINX Gateway ===" -ForegroundColor Cyan
Write-Host ""

# NGINX Gateway (Port 80 -> 8080)
$jobs += Start-PortForward -ServiceName "nginx-gateway" `
    -LocalPort "8080" `
    -RemotePort "80" `
    -Description "NGINX Gateway (API Proxy)"

Write-Host "=== Backend Services (Optional - for debugging) ===" -ForegroundColor Cyan
Write-Host ""

# Auth Service (Port 5001)
$jobs += Start-PortForward -ServiceName "auth-service" `
    -LocalPort "5001" `
    -RemotePort "5001" `
    -Description "Auth Service API"

# Restaurant Service (Port 5002)
$jobs += Start-PortForward -ServiceName "restaurant-service" `
    -LocalPort "5002" `
    -RemotePort "5002" `
    -Description "Restaurant Service API"

# Order Service (Port 5005)
$jobs += Start-PortForward -ServiceName "order-service" `
    -LocalPort "5005" `
    -RemotePort "5005" `
    -Description "Order Service API"

# Payment Service (Port 5004)
$jobs += Start-PortForward -ServiceName "payment-service" `
    -LocalPort "5004" `
    -RemotePort "5004" `
    -Description "Payment Service API"

Write-Host "=== Monitoring Services ===" -ForegroundColor Cyan
Write-Host ""

# Check if monitoring namespace and services exist
$monitoringNamespace = "monitoring"
$monitoringNsExists = kubectl get namespace $monitoringNamespace 2>$null

if ($monitoringNsExists) {
    $prometheusExists = kubectl get svc prometheus -n $monitoringNamespace 2>$null
    $grafanaExists = kubectl get svc grafana -n $monitoringNamespace 2>$null
    $lokiExists = kubectl get svc loki -n $monitoringNamespace 2>$null

    if ($prometheusExists) {
        $jobs += Start-PortForward -ServiceName "prometheus" `
            -LocalPort "9090" `
            -RemotePort "9090" `
            -Description "Prometheus (Metrics)" `
            -Namespace $monitoringNamespace
    } else {
        Write-Host "  Prometheus service not found (skipping)" -ForegroundColor Yellow
    }

    if ($grafanaExists) {
        $jobs += Start-PortForward -ServiceName "grafana" `
            -LocalPort "3030" `
            -RemotePort "3000" `
            -Description "Grafana (Dashboards)" `
            -Namespace $monitoringNamespace
    } else {
        Write-Host "  Grafana service not found (skipping)" -ForegroundColor Yellow
    }

    if ($lokiExists) {
        $jobs += Start-PortForward -ServiceName "loki" `
            -LocalPort "3100" `
            -RemotePort "3100" `
            -Description "Loki (Logs)" `
            -Namespace $monitoringNamespace
    } else {
        Write-Host "  Loki service not found (skipping)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  Monitoring namespace not found (skipping all monitoring services)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Waiting for port-forwards to initialize... ===" -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Check job status
Write-Host ""
Write-Host "=== Port Forward Status ===" -ForegroundColor Cyan
Write-Host ""

$runningCount = 0
$failedCount = 0

foreach ($job in $jobs) {
    $jobInfo = Get-Job -Id $job.Id
    if ($jobInfo.State -eq "Running") {
        $runningCount++
    } else {
        $failedCount++
        Write-Host "  Job $($job.Id): $($jobInfo.State)" -ForegroundColor Red
    }
}

Write-Host "Running: $runningCount" -ForegroundColor Green
if ($failedCount -gt 0) {
    Write-Host "Failed:  $failedCount" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Access URLs ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "FRONTEND APPS (Direct Access - No NGINX):" -ForegroundColor Yellow
Write-Host "  Client App:      http://localhost:3000" -ForegroundColor Green
Write-Host "  Admin Dashboard: http://localhost:3001" -ForegroundColor Green
Write-Host "  Restaurant App:  http://localhost:3002" -ForegroundColor Green
Write-Host ""
Write-Host "NGINX GATEWAY (API Proxy):" -ForegroundColor Yellow
Write-Host "  Gateway:         http://localhost:8080" -ForegroundColor Green
Write-Host "  API Base:        http://localhost:8080/api/*" -ForegroundColor Green
Write-Host ""
Write-Host "BACKEND SERVICES (Direct Access - for debugging):" -ForegroundColor Yellow
Write-Host "  Auth Service:    http://localhost:5001/api/auth/*" -ForegroundColor Green
Write-Host "  Restaurant API:  http://localhost:5002/api/restaurant/*" -ForegroundColor Green
Write-Host "  Order API:       http://localhost:5005/api/orders/*" -ForegroundColor Green
Write-Host "  Payment API:     http://localhost:5004/api/payment/*" -ForegroundColor Green
Write-Host ""

if ($prometheusExists -or $grafanaExists -or $lokiExists) {
    Write-Host "MONITORING STACK:" -ForegroundColor Yellow
    if ($prometheusExists) {
        Write-Host "  Prometheus:      http://localhost:9090" -ForegroundColor Green
    }
    if ($grafanaExists) {
        Write-Host "  Grafana:         http://localhost:3030" -ForegroundColor Green
    }
    if ($lokiExists) {
        Write-Host "  Loki:            http://localhost:3100" -ForegroundColor Green
    }
    Write-Host ""
}

Write-Host "=== Open in Browser ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening frontend apps in default browser..." -ForegroundColor Yellow

Start-Sleep -Seconds 2

# Open frontends in browser
Start-Process "http://localhost:3000"  # Client
Start-Sleep -Seconds 1
Start-Process "http://localhost:3001"  # Admin
Start-Sleep -Seconds 1
Start-Process "http://localhost:3002"  # Restaurant

if ($grafanaExists) {
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:3030"  # Grafana
}

Write-Host ""
Write-Host "=== Port Forward Running ===" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop all port-forwards" -ForegroundColor Yellow
Write-Host ""

# Keep script running and monitor jobs
try {
    while ($true) {
        Start-Sleep -Seconds 10
        
        # Check if any jobs failed
        $failedJobs = Get-Job | Where-Object { $_.State -eq "Failed" }
        if ($failedJobs) {
            Write-Host ""
            Write-Host "WARNING: Some port-forwards failed:" -ForegroundColor Red
            foreach ($job in $failedJobs) {
                Write-Host "  Job $($job.Id): $($job.State)" -ForegroundColor Red
                $job | Receive-Job 2>&1 | Write-Host -ForegroundColor Gray
            }
        }
    }
} finally {
    Write-Host ""
    Write-Host "=== Stopping all port-forwards ===" -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "All port-forwards stopped." -ForegroundColor Green
}
