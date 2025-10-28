#!/bin/sh

# Initialize Sentry and start Directus
echo "Loading Sentry SDK..."
export NODE_OPTIONS="--import /sentry/sentry-init.js"
exec npx directus start
