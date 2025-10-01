# frontend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Site health check

Run the automated crawl to verify published pages do not return `4xx`/`5xx` responses:

```bash
bun run test:site
```

Pass a different origin if you need to target another environment:

```bash
bun run tests/site-health.ts https://staging.arkiv.network
```
