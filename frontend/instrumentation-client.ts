import * as Sentry from "@sentry/nextjs";

// Client-side Sentry initialization
Sentry.init({
  dsn: "http://b85b559c23c7496db975df981f58a2de@arkiv.network:8888/1",
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  debug: false,
});
