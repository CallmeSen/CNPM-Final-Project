# PowerShell script to deploy CNPM Food Delivery to Kubernetes
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "staging", "prod")]
    [string]$Environment = "dev",
    
    [Parameter(Mandatory=$true)]
    [string]$DockerUser,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipPush
)

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Green "🚀 Starting CNPM Food Delivery K8s Deployment"
Write-ColorOutput Yellow "Environment: $Environment"
Write-ColorOutput Yellow "Docker User: $DockerUser"
Write-Host ""

# Check if kubectl is installed
try {
    kubectl version --client | Out-Null
    Write-ColorOutput Green "✅ kubectl is installed"
} catch {
    Write-ColorOutput Red "❌ kubectl is not installed. Please install it first."
    exit 1
}

# Define services
$backendServices = @(
    "auth-service",
    "order-service", 
    "payment-service",
    "restaurant-service"
)

$frontendServices = @(
    "client",
    "admin",
    "restaurant"
)

# Build Docker images
if (-not $SkipBuild) {
    Write-ColorOutput Yellow "`n📦 Building Docker images..."
    
    foreach ($service in $backendServices) {
        Write-Host "Building backend/$service..."
        docker build -t "${DockerUser}/cnpm-${service}:latest" -t "${DockerUser}/cnpm-${service}:${Environment}" "./backend/$service"
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput Red "❌ Failed to build $service"
            exit 1
        }
    }
    
    foreach ($service in $frontendServices) {
        Write-Host "Building frontend/$service..."
        docker build -t "${DockerUser}/cnpm-${service}:latest" -t "${DockerUser}/cnpm-${service}:${Environment}" "./frontend/$service"
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput Red "❌ Failed to build $service"
            exit 1
        }
    }
    
    Write-ColorOutput Green "✅ All images built successfully"
} else {
    Write-ColorOutput Yellow "⏭️  Skipping build step"
}

# Push Docker images
if (-not $SkipPush) {
    Write-ColorOutput Yellow "`n📤 Pushing Docker images to Docker Hub..."
    
    # Login to Docker Hub
    Write-Host "Logging in to Docker Hub..."
    docker login
    
    foreach ($service in $backendServices) {
        Write-Host "Pushing cnpm-${service}..."
        docker push "${DockerUser}/cnpm-${service}:latest"
        docker push "${DockerUser}/cnpm-${service}:${Environment}"
    }
    
    foreach ($service in $frontendServices) {
        Write-Host "Pushing cnpm-${service}..."
        docker push "${DockerUser}/cnpm-${service}:latest"
        docker push "${DockerUser}/cnpm-${service}:${Environment}"
    }
    
    Write-ColorOutput Green "✅ All images pushed successfully"
} else {
    Write-ColorOutput Yellow "⏭️  Skipping push step"
}

# Update image names in K8s manifests
Write-ColorOutput Yellow "`n🔧 Updating K8s manifests with Docker Hub username..."

# Update skaffold.yaml
$skaffoldPath = ".\skaffold.yaml"
if (Test-Path $skaffoldPath) {
    (Get-Content $skaffoldPath) -replace 'yashwanthjavvaji', $DockerUser | Set-Content $skaffoldPath
    Write-Host "Updated skaffold.yaml"
}

# Create namespace
Write-ColorOutput Yellow "`n🏗️  Creating Kubernetes namespace..."
kubectl create namespace cnpm-food-delivery --dry-run=client -o yaml | kubectl apply -f -

# Create secrets
Write-ColorOutput Yellow "`n🔐 Creating Kubernetes secrets..."
if (Test-Path ".env.docker") {
    kubectl create secret generic cnpm-secrets `
        --from-env-file=.env.docker `
        --namespace=cnpm-food-delivery `
        --dry-run=client -o yaml | kubectl apply -f -
    Write-ColorOutput Green "✅ Secrets created from .env.docker"
} else {
    Write-ColorOutput Red "⚠️  .env.docker file not found. Please create secrets manually."
}

# MongoDB credentials
kubectl create secret generic mongodb-credentials `
    --from-literal=username=admin `
    --from-literal=password=admin123 `
    --namespace=cnpm-food-delivery `
    --dry-run=client -o yaml | kubectl apply -f -

# Deploy to Kubernetes
Write-ColorOutput Yellow "`n🚀 Deploying to Kubernetes..."
kubectl apply -f infra/k8s/ --namespace=cnpm-food-delivery

# Wait for deployments
Write-ColorOutput Yellow "`n⏳ Waiting for deployments to be ready..."
Start-Sleep -Seconds 5

$deployments = kubectl get deployments -n cnpm-food-delivery -o name
foreach ($deployment in $deployments) {
    Write-Host "Waiting for $deployment..."
    kubectl wait --for=condition=available --timeout=300s $deployment -n cnpm-food-delivery
}

# Show status
Write-ColorOutput Green "`n✅ Deployment complete!"
Write-ColorOutput Yellow "`n📊 Current cluster status:"
Write-Host ""

Write-Host "=== PODS ==="
kubectl get pods -n cnpm-food-delivery

Write-Host "`n=== SERVICES ==="
kubectl get svc -n cnpm-food-delivery

Write-Host "`n=== INGRESS ==="
kubectl get ingress -n cnpm-food-delivery

Write-Host "`n=== PERSISTENT VOLUME CLAIMS ==="
kubectl get pvc -n cnpm-food-delivery

# Show access information
Write-ColorOutput Green "`n🌐 Access Information:"
Write-Host "Add this to your hosts file (C:\Windows\System32\drivers\etc\hosts):"
$ingressIP = kubectl get ingress -n cnpm-food-delivery -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}'
if ($ingressIP) {
    Write-ColorOutput Yellow "$ingressIP food-delivery.yourdomain.com"
    Write-ColorOutput Yellow "$ingressIP admin.food-delivery.yourdomain.com"
    Write-ColorOutput Yellow "$ingressIP restaurant.food-delivery.yourdomain.com"
} else {
    Write-ColorOutput Yellow "Run 'minikube tunnel' or check your LoadBalancer for IP address"
}

Write-Host ""
Write-ColorOutput Green "🎉 Deployment script completed successfully!"
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  kubectl get all -n cnpm-food-delivery"
Write-Host "  kubectl logs -f deployment/auth-service -n cnpm-food-delivery"
Write-Host "  kubectl describe pod <pod-name> -n cnpm-food-delivery"
Write-Host "  kubectl exec -it <pod-name> -n cnpm-food-delivery -- /bin/sh"
