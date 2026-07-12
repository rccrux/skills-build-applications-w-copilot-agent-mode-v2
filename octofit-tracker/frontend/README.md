# OctoFit Tracker Frontend

This React 19 presentation tier uses `react-router-dom` to navigate between API-backed views for users, activities, teams, leaderboard entries, and workouts.

## Environment

Define `VITE_CODESPACE_NAME` before running the app in Codespaces. A typical local configuration is:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

Place that value in `octofit-tracker/frontend/.env.local` so Vite can expose it through `import.meta.env.VITE_CODESPACE_NAME`.

When `VITE_CODESPACE_NAME` is set, the frontend targets endpoints under:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is not set, the app falls back safely to `http://localhost:8000/api/[component]/` and never generates `https://undefined-8000...` URLs.

## Commands

```bash
npm install --prefix octofit-tracker/frontend
npm run --prefix octofit-tracker/frontend dev
npm run --prefix octofit-tracker/frontend build
```
