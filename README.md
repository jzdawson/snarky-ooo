# SnarkyOOO

Out-of-office message generator that creates unique, AI-powered auto-reply messages with adjustable snark levels. Because "I'm out of office" is never enough.

## Features

- **AI-Generated Messages** — Every message is unique, powered by Claude AI
- **Snark Meter** — Slide from Professional (0) to Scorched Earth (100)
- **Copy to Clipboard** — One click to grab your message
- **Regenerate** — Don't like it? Get a fresh one with the same inputs
- **Vercel-Ready** — Deploy in minutes with serverless API routes

## Snark Levels

| Level | Range | Vibe |
|-------|-------|------|
| Professional | 0-20 | Warm, courteous, HR-approved |
| Cheeky | 21-40 | Playful with a wink |
| Snarky | 41-60 | Passive-aggressive, "per my last email" energy |
| Unhinged | 61-80 | Stopped caring about professional norms |
| Scorched Earth | 81-100 | Maximum hostility dressed up as an auto-reply |

## Tech Stack

- **Frontend**: React + Vite
- **AI**: Anthropic Claude API (Haiku 4.5)
- **Backend**: Express (local dev) / Vercel Serverless Functions (production)

## Local Development

```bash
# Install dependencies
npm install

# Create .env with your Anthropic API key
cp .env.example .env
# Edit .env and add your key

# Run both API server and Vite dev server
npm run dev
```

App runs at `http://localhost:5173` with the API proxied from port 3001.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` as an environment variable in Vercel project settings
4. Deploy — Vercel picks up `vercel.json` and the `/api` directory automatically

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API server + Vite dev server |
| `npm run dev:api` | Start API server only |
| `npm run dev:client` | Start Vite dev server only |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Cost

Uses Claude Haiku 4.5 (~$0.00125 per message). Roughly **4,000 messages per $5**.
