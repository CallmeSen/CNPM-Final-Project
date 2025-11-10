# Generate Grafana Dashboards ConfigMaps for K8s
# This script reads dashboard JSON files and creates K8s ConfigMaps

$dashboardsDir = "e:\GitHub\CNPM-Final-Project\monitoring\grafana\provisioning\dashboards\json"
$outputFile = "e:\GitHub\CNPM-Final-Project\infra\k8s\monitoring\grafana-dashboards.yaml"

$dashboards = @(
    @{Name = "backend"; File = "backend-overview.json"},
    @{Name = "frontend"; File = "frontend-overview.json"},
    @{Name = "system"; File = "system-overview.json"},
    @{Name = "loki"; File = "loki-docker.json"},
    @{Name = "nodejs"; File = "nodejs-application-dashboard.json"}
)

# Start with empty content
$yamlContent = @"
# Grafana Dashboards ConfigMaps
# Auto-generated from dashboard JSON files
# Run generate-dashboards.ps1 to regenerate

"@

foreach ($dashboard in $dashboards) {
    $dashboardPath = Join-Path $dashboardsDir $dashboard.File
    
    if (Test-Path $dashboardPath) {
        Write-Host "Adding dashboard: $($dashboard.Name)..." -ForegroundColor Cyan
        
        # Read JSON content and indent it
        $jsonContent = Get-Content $dashboardPath -Raw
        $indentedJson = ($jsonContent -split "`n" | ForEach-Object { "    $_" }) -join "`n"
        
        $yamlContent += @"

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboard-$($dashboard.Name)
  namespace: cnpm-food-delivery
  labels:
    grafana_dashboard: "1"
data:
  $($dashboard.File): |
$indentedJson
"@
    } else {
        Write-Host "Warning: Dashboard not found: $dashboardPath" -ForegroundColor Yellow
    }
}

# Write to output file
$yamlContent | Out-File -FilePath $outputFile -Encoding UTF8 -NoNewline

Write-Host "`nDashboards ConfigMap generated: $outputFile" -ForegroundColor Green
Write-Host "Total dashboards: $($dashboards.Count)" -ForegroundColor Green
