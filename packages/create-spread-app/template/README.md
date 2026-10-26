# __NAME__

Created with [Spread Engine](https://engine.spreadapps.in) (`create-spread-app`) — Angular, Tailwind CSS v4, prerendering and Netlify.

## Run it

```bash
npm start          # http://localhost:4200 — Ctrl + C to stop
npm run build      # static site in dist/__NAME__/browser
```

## Go live on Netlify

1. Push this folder to a GitHub repository.
2. On [netlify.com](https://www.netlify.com): **Add new project → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` (build command, publish folder, security headers). Every push to `main` deploys again.

## What's inside

| File | What it does |
| --- | --- |
| `src/styles.css` | Tailwind CSS + your brand colour (`--color-brand`). Use `bg-brand`, `text-brand-700`… |
| `src/app/app.html` | The starter page — replace it with your app |
| `src/app/app.routes.ts` | Your pages (routes) |
| `src/app/app.routes.server.ts` | Prerenders every route to HTML at build time |
| `netlify.toml` | Netlify build settings, security headers, SPA fallback |

© __YEAR__ · Made with ❤ for India by Spread Apps
