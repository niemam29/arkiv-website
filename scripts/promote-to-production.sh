#!/bin/bash
# Promote staging to production (blue-green deployment)

set -e

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "🔵→🟢 Promoting staging to production..."

# Tag current latest as production
echo "🏷️  Tagging staging image as production..."
docker pull moonplkr/arkiv-frontend:latest
docker tag moonplkr/arkiv-frontend:latest moonplkr/arkiv-frontend:production
docker push moonplkr/arkiv-frontend:production

echo "⬇️  Pulling production image on server..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml pull frontend-production"

echo "🔄 Deploying to production..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml up -d frontend-production"

echo "✅ Production deployed! Check: https://arkiv.network"
echo "📊 Staging still running at: https://staging.arkiv.network"
