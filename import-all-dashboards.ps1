# Import all 7 dashboards with fixed queries
$grafanaUrl = "http://localhost:3030"
$auth = "admin:admin123"
$authBytes = [System.Text.Encoding]::UTF8.GetBytes($auth)
$authHeader = "Basic " + [Convert]::ToBase64String($authBytes)

Write-Host "`n=== IMPORTING DASHBOARDS ===" -ForegroundColor Cyan

# Import backend overview (after fixing queries)
Write-Host "`n1. Backend Services Overview..." -ForegroundColor Yellow
$content = Get-Content "dashboards\json\backend-overview.json" -Raw
$content = $content -replace 'job=\\"auth-service\\"', 'service=\\"auth-service\\"'
$content = $content -replace 'job=\\"order-service\\"', 'service=\\"order-service\\"'
$content = $content -replace 'job=\\"restaurant-service\\"', 'service=\\"restaurant-service\\"'
$content = $content -replace 'job=\\"payment-service\\"', 'service=\\"payment-service\\"'
try {
    $dashboard = $content | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Import Node Exporter
Write-Host "`n2. Node Exporter..." -ForegroundColor Yellow
try {
    $dashboard = Get-Content "dashboards\json\1860_rev42.json" -Raw | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Import NodeJS Application Dashboard (fix UID)
Write-Host "`n3. NodeJS Application Dashboard..." -ForegroundColor Yellow
$content = Get-Content "dashboards\json\nodejs-application-dashboard.json" -Raw
$content = $content -replace 'PBFA97CFB590B2093', 'prometheus'
try {
    $dashboard = $content | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Import System Overview (fix UID)
Write-Host "`n4. System Overview..." -ForegroundColor Yellow
$content = Get-Content "dashboards\json\system-overview.json" -Raw
$content = $content -replace 'PBFA97CFB590B2093', 'prometheus'
try {
    $dashboard = $content | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Import Loki Docker
Write-Host "`n5. Loki Logs - Docker..." -ForegroundColor Yellow
try {
    $dashboard = Get-Content "dashboards\json\loki-docker.json" -Raw | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Import Loki Stack Monitoring
Write-Host "`n6. Loki Stack Monitoring..." -ForegroundColor Yellow
try {
    $dashboard = Get-Content "dashboards\json\14055_rev5.json" -Raw | ConvertFrom-Json
    $payload = @{ dashboard = $dashboard; overwrite = $true } | ConvertTo-Json -Depth 100
    $result = Invoke-RestMethod -Uri "$grafanaUrl/api/dashboards/db" -Method Post -Headers @{ Authorization = $authHeader; "Content-Type" = "application/json" } -Body $payload
    Write-Host "  ✓ SUCCESS: http://localhost:3030$($result.url)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n✓ Import complete! Visit http://localhost:3030`n" -ForegroundColor Cyan
