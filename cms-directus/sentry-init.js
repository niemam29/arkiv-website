import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Initialize Sentry
Sentry.init({
  dsn: "http://a0a48d00d6e34a368d23c0cb751c8b02@arkiv.network:8888/2",

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,

  // Set profilesSampleRate to 1.0 to profile every transaction
  profilesSampleRate: 1.0,

  environment: process.env.NODE_ENV || "production",

  integrations: [
    nodeProfilingIntegration(),
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,
});

console.log("Sentry initialized for Directus CMS");

export default Sentry;
