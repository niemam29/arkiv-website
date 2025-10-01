#!/bin/bash
# Deploy to staging environment

set -e

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "🚀 Deploying to staging.arkiv.network..."

# Build and push latest image
echo "📦 Building latest image..."
docker buildx build --platform linux/amd64 --push \
  -t moonplkr/arkiv-frontend:latest \
  -f frontend/Dockerfile .

echo "⬇️  Pulling on server..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml pull frontend-staging"

echo "🔄 Restarting staging container..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml up -d frontend-staging"

echo "✅ Staging deployed! Check: https://staging.arkiv.network"
