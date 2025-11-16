# Script to import all dashboards với queries đã fix

$grafanaUrl = "http://localhost:3030"
$auth = "admin:admin123"
$authBytes = [System.Text.Encoding]::UTF8.GetBytes($auth)
$authHeader = "Basic " + [Convert]::ToBase64String($authBytes)

Write-Host "`n=== IMPORTING DASHBOARDS WITH FIXED QUERIES ===" -ForegroundColor Cyan

# Test connection
try {
    $null = Invoke-RestMethod -Uri "$grafanaUrl/api/health" -Method Get -ErrorAction Stop
    Write-Host "✓ Grafana connection OK" -ForegroundColor Green
} catch {
    Write-Host "✗ Grafana not accessible at $grafanaUrl" -ForegroundColor Red
    Write-Host "  Run: kubectl port-forward -n cnpm-food-delivery svc/grafana 3030:3000" -ForegroundColor Yellow
    exit 1
}

# Function to import dashboard with JSON fix
function Import-DashboardWithFix {
    param(
        [string]$FilePath,
        [hashtable]$QueryReplacements = @{}
    )
    
    try {
        $content = Get-Content $FilePath -Raw
        
        # Apply query replacements
        foreach ($old in $QueryReplacements.Keys) {
            $new = $QueryReplacements[$old]
            $content = $content.Replace($old, $new)
        }
        
        $dashboard = $content | ConvertFrom-Json
        $payload = @{
            dashboard = $dashboard
            overwrite = $true
            message = "Auto-imported with fixed queries"
        } | ConvertTo-Json -Depth 100
        
        $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{
            Authorization = $authHeader
            "Content-Type" = "application/json"
        } -Body $payload
        
        Write-Host "  ✓ $(Split-Path $FilePath -Leaf)" -ForegroundColor Green
        Write-Host "    URL: http://localhost:3030$($result.url)" -ForegroundColor Gray
        return $true
    } catch {
        Write-Host "  ✗ $(Split-Path $FilePath -Leaf): $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$successCount = 0
$totalCount = 0

# 1. Backend Overview - fix job to service
Write-Host "`n1. Backend Services Overview:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\backend-overview.json" -QueryReplacements @{
    'job=\"auth-service\"' = 'service=\"auth-service\"'
    'job=\"order-service\"' = 'service=\"order-service\"'
    'job=\"restaurant-service\"' = 'service=\"restaurant-service\"'
    'job=\"payment-service\"' = 'service=\"payment-service\"'
}) { $successCount++ }

# 2. Frontend Overview - skip for now (no metrics)
Write-Host "`n2. Frontend Services Overview: SKIPPED (no metrics endpoints)" -ForegroundColor Yellow
$totalCount++
# Frontend apps don't expose /metrics endpoints

# 3. Node Exporter (1860) - no changes needed
Write-Host "`n3. Node Exporter Full:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\1860_rev42.json") { $successCount++ }

# 4. Loki Stack - fix datasource references
Write-Host "`n4. Loki Stack Monitoring:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\14055_rev5.json" -QueryReplacements @{
    '"datasource": "Prometheus"' = '"datasource": {"type": "prometheus", "uid": "prometheus"}'
    '"datasource": "Loki"' = '"datasource": {"type": "loki", "uid": "loki"}'
}) { $successCount++ }

# 5. NodeJS Application Dashboard - fix UID
Write-Host "`n5. NodeJS Application Dashboard:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\nodejs-application-dashboard.json" -QueryReplacements @{
    'PBFA97CFB590B2093' = 'prometheus'
}) { $successCount++ }

# 6. System Overview - fix UID
Write-Host "`n6. System Overview:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\system-overview.json" -QueryReplacements @{
    'PBFA97CFB590B2093' = 'prometheus'
}) { $successCount++ }

# 7. Loki Docker - no changes needed
Write-Host "`n7. Loki Logs - Docker:" -ForegroundColor Yellow
$totalCount++
if (Import-DashboardWithFix -FilePath "dashboards\json\loki-docker.json") { $successCount++ }

# Summary
Write-Host "`n════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " IMPORT SUMMARY" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Success: $successCount/$totalCount" -ForegroundColor Green
Write-Host "`n  Grafana: http://localhost:3030" -ForegroundColor White
Write-Host "  Login: admin/admin123`n" -ForegroundColor Gray
