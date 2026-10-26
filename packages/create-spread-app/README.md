# create-spread-app

**Spread Engine** — create an Angular app with Tailwind CSS, prerendering and Netlify deploy in one command.

```bash
npx create-spread-app my-app
cd my-app
npm start
```

## What you get

- **Angular 22** with prerendering to static HTML (fast, good for SEO, no server needed)
- **Tailwind CSS v4** with your brand colour (`bg-brand`, `text-brand-700`…)
- **netlify.toml** with build settings, security headers and SPA fallback
- A starter page with next steps, a README and a first git commit

## Options

```text
npx create-spread-app [project-name] [options]

  --preset <id>     blank (SaaS, Booking and College project presets coming soon)
  --brand <#hex>    brand colour, e.g. #0d9488
  -y, --yes         use defaults, ask nothing
  --skip-install    don't run npm install
  --skip-git        don't create a git repository
```

Needs **Node.js 22.12+** and an internet connection.

## Coming next

Login with Supabase, Resend emails, PWA and `ng add` for existing projects. Join the waitlist at **https://engine.spreadapps.in**.

---

MIT · Made with ❤ for India by Spread Apps™
