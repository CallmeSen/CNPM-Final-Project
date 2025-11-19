#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

: "${DOCKER_USERNAME:?Set DOCKER_USERNAME before running this script.}"
: "${DOCKER_PASSWORD:?Set DOCKER_PASSWORD before running this script.}"

IMAGE_NAMESPACE="${DOCKER_IMAGE_NAMESPACE:-$DOCKER_USERNAME}"
IMAGE_TAG="${IMAGE_TAG:-latest}"

if [[ -n "${DOCKER_REGISTRY:-}" ]]; then
  IMAGE_NAMESPACE="${DOCKER_REGISTRY}/${IMAGE_NAMESPACE}"
fi

services=(
  "auth-service:backend/auth-service"
  "order-service:backend/order-service"
  "payment-service:backend/payment-service"
  "restaurant-service:backend/restaurant-service"
  "client:frontend/client"
  "admin:frontend/admin"
  "restaurant:frontend/restaurant"
  "nginx:infra/nginx"
)

if [[ -n "${DOCKER_REGISTRY:-}" ]]; then
  printf '%s' "$DOCKER_PASSWORD" | docker login "$DOCKER_REGISTRY" --username "$DOCKER_USERNAME" --password-stdin
else
  printf '%s' "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
fi

for service in "${services[@]}"; do
  image="${service%%:*}"
  context="${service#*:}"
  context_path="$ROOT_DIR/$context"

  if [[ ! -f "$context_path/Dockerfile" ]]; then
    echo "Missing Dockerfile for $image at $context_path" >&2
    exit 1
  fi

  tag="${IMAGE_NAMESPACE}/${image}:${IMAGE_TAG}"
  echo "Building $tag from $context"
  docker build --network host -t "$tag" "$context_path"
  docker push "$tag"
done
