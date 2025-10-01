# Blue-Green Deployment Guide

## Architecture

- **Production**: `arkiv.network` → `moonplkr/arkiv-frontend:production`
- **Staging**: `staging.arkiv.network` → `moonplkr/arkiv-frontend:latest`

## Workflow

### 1. Deploy to Staging
```bash
./scripts/deploy-staging.sh
```

**What it does:**
- Builds latest frontend code
- Pushes to `moonplkr/arkiv-frontend:latest`
- Deploys to staging.arkiv.network
- Staging is ready for testing

**Test on:** https://staging.arkiv.network

### 2. Promote to Production
```bash
./scripts/promote-to-production.sh
```

**What it does:**
- Tags staging image as production
- Deploys to arkiv.network
- Both environments running simultaneously
- Zero downtime deployment

**Live on:** https://arkiv.network

### 3. Rollback (if needed)
```bash
./scripts/rollback-production.sh
```

**What it does:**
- Reverts production to previous version
- Instant rollback

## Manual Deployment

### Deploy Staging Only
```bash
docker buildx build --platform linux/amd64 --push \
  -t moonplkr/arkiv-frontend:latest \
  -f frontend/Dockerfile .

ssh moon@arkiv.dev.golem.network \
  "cd /home/moon/projects/arkiv && \
   docker compose -f docker-compose.production.yml pull frontend-staging && \
   docker compose -f docker-compose.production.yml up -d frontend-staging"
```

### Promote to Production
```bash
docker pull moonplkr/arkiv-frontend:latest
docker tag moonplkr/arkiv-frontend:latest moonplkr/arkiv-frontend:production
docker push moonplkr/arkiv-frontend:production

ssh moon@arkiv.dev.golem.network \
  "cd /home/moon/projects/arkiv && \
   docker compose -f docker-compose.production.yml pull frontend-production && \
   docker compose -f docker-compose.production.yml up -d frontend-production"
```

## Environment Differences

| Feature | Staging | Production |
|---------|---------|------------|
| Domain | staging.arkiv.network | arkiv.network |
| Image | :latest | :production |
| Analytics | ❌ No Umami | ✅ Umami enabled |
| Purpose | Testing | Live users |
| Updates | Automatic on push | Manual promotion |

## Best Practices

1. **Always test on staging first**
2. **Check staging.arkiv.network before promoting**
3. **Keep production tag stable**
4. **Use rollback if issues detected**

## Container Names

- `arkiv-frontend-production` - Production container
- `arkiv-frontend-staging` - Staging container
- `arkiv-execution-service` - Shared backend service

## Status Check

```bash
ssh moon@arkiv.dev.golem.network "docker ps --filter name=arkiv-frontend"
```

## Logs

### Production
```bash
ssh moon@arkiv.dev.golem.network "docker logs -f arkiv-frontend-production"
```

### Staging
```bash
ssh moon@arkiv.dev.golem.network "docker logs -f arkiv-frontend-staging"
```
