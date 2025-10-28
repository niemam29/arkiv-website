import * as Sentry from "@sentry/nextjs";

// Initialize Sentry
Sentry.init({
  dsn: "http://30da3c588b764488b45adff40a815356@arkiv.network:8888/3",

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,

  environment: process.env.NODE_ENV || "production",

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,
});

console.log("Sentry initialized for Usecases service");

export default Sentry;
