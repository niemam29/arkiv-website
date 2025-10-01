#!/bin/bash
# Rollback production to previous version

set -e

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "⚠️  Rolling back production..."

# Pull previous production image (keep backups on Docker Hub)
echo "⬇️  Pulling previous production image..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml pull frontend-production"

echo "🔄 Restarting production with previous version..."
ssh moon@arkiv.dev.golem.network "cd /home/moon/projects/arkiv && docker compose -f docker-compose.production.yml up -d frontend-production"

echo "✅ Rollback complete! Check: https://arkiv.network"
