# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` before running the app so the frontend can call the backend through the forwarded Codespaces URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, place it in `.env.local` in this directory. API requests are sent to:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app shows a configuration warning and skips API requests to avoid invalid `https://undefined-8000...` URLs.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
