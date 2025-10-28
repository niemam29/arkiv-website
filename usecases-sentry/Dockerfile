FROM moonplkr/usecases:latest

USER root

# Create sentry directory and install packages
RUN mkdir -p /sentry
WORKDIR /sentry
COPY package.json /sentry/package.json
RUN npm install --production

# Copy Sentry initialization script
COPY sentry-init.js /sentry/sentry-init.js

# Copy custom entrypoint
COPY docker-entrypoint-sentry.sh /app/docker-entrypoint-sentry.sh
RUN chmod +x /app/docker-entrypoint-sentry.sh

WORKDIR /app

ENTRYPOINT ["/app/docker-entrypoint-sentry.sh"]
