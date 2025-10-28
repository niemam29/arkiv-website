#!/bin/sh

# Initialize Sentry and start Next.js
echo "Loading Sentry SDK for Usecases..."
export NODE_OPTIONS="--import /sentry/sentry-init.js"
exec bun start
