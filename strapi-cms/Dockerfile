# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install build dependencies for sharp
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev \
    fftw-dev \
    build-base \
    --virtual .build-deps

# Copy package files from strapi-cms directory
COPY strapi-cms/package*.json ./

# Install dependencies
RUN npm install

# Copy source from strapi-cms directory
COPY strapi-cms/ .

# Build admin panel
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install runtime dependencies for sharp
RUN apk add --no-cache vips vips-cpp fftw

ENV NODE_ENV=production

# Copy built application
COPY --from=build /app ./

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 204 ? 0 : 1)})"

# Start Strapi in production mode (serves pre-built admin panel)
CMD ["npm", "run", "start"]
