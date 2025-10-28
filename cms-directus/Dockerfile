FROM directus/directus:11

USER root

# Create sentry directory and install packages
RUN mkdir -p /sentry
WORKDIR /sentry
COPY package.json /sentry/package.json
RUN npm install --production

# Copy Sentry initialization script
COPY sentry-init.js /sentry/sentry-init.js

# Create custom entrypoint that loads Sentry
COPY docker-entrypoint-sentry.sh /directus/docker-entrypoint-sentry.sh
RUN chmod +x /directus/docker-entrypoint-sentry.sh

WORKDIR /directus
USER node

ENTRYPOINT ["/directus/docker-entrypoint-sentry.sh"]
