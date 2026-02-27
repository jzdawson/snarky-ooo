# CLAUDE.md

## Project Overview

SnarkyOOO is an out-of-office message generator web app. Users provide context about their time off, set a snark level, and get a unique AI-generated OOO auto-reply message.

## Architecture

- **Frontend**: React 19 + Vite (`src/`)
- **Local API**: Express server (`server.js`) on port 3001
- **Production API**: Vercel serverless function (`api/generate.js`)
- **AI**: Anthropic Claude Haiku 4.5 for message generation

The Vite dev server proxies `/api` requests to the Express server on port 3001 (configured in `vite.config.js`).

## Key Files

- `src/App.jsx` — Main layout, state management, API call orchestration
- `src/components/OOOForm.jsx` — Input form (name, dates, reason, destination, contact, instructions)
- `src/components/SnarkMeter.jsx` — Snark level slider (0-100) with 5 tiers
- `src/components/MessageDisplay.jsx` — Generated message output, copy button, regenerate button
- `src/index.css` — All styling (dark theme, responsive)
- `server.js` — Express dev server with Claude API integration
- `api/generate.js` — Vercel serverless function (mirrors server.js logic)

## How Message Generation Works

1. User fills form and submits
2. Frontend POSTs to `/api/generate` with form data + snark level (0-100)
3. Backend maps snark level to a tone description (Professional → Scorched Earth)
4. A random "style seed" is picked from 15 options (e.g., "nature documentary narrator", "medieval knight") for variety
5. A random hash is appended as a uniqueness seed
6. Claude Haiku generates the message and returns it

## Commands

```bash
npm run dev          # Run both servers (concurrently)
npm run dev:api      # Express API server only
npm run dev:client   # Vite dev server only
npm run build        # Production build
```

## Environment Variables

- `ANTHROPIC_API_KEY` — Required. Set in `.env` locally, in Vercel dashboard for production.

## Conventions

- Functional React components with hooks
- CSS in a single `index.css` file (no CSS modules or styled-components)
- Dark theme with CSS custom properties (see `:root` in index.css)
- ES modules throughout (`"type": "module"` in package.json)
