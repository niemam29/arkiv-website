import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization - use internal Docker network
    Sentry.init({
      dsn: "http://b85b559c23c7496db975df981f58a2de@glitchtip-web-1:8000/1",
      tracesSampleRate: 1.0,
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization
    Sentry.init({
      dsn: "http://b85b559c23c7496db975df981f58a2de@glitchtip-web-1:8000/1",
      tracesSampleRate: 1.0,
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
      debug: false,
    });
  }
}
