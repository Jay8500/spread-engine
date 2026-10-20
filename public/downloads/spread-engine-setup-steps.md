# Spread Engine — setup steps

Made with ❤️ for India by Spread Apps™ · https://engine.spreadapps.in

Spread Engine sets up an Angular app with Tailwind, Supabase (login + database), Resend emails, PWA and Netlify deploy.
This guide gets your computer and accounts ready. Do it once, then every new project takes about 10 minutes.

> Status: coming soon. The commands below show how the engine will work at launch. Join the waitlist to get it first.

---

## 1. Requirements (about 15 minutes, once)

| ✔ | What | Where | Needed? |
|---|------|-------|---------|
| ☐ | Node.js 22.12 or newer (24 LTS recommended) | https://nodejs.org | Yes |
| ☐ | Git | https://git-scm.com | Yes |
| ☐ | VS Code (or any editor) | https://code.visualstudio.com | Yes |
| ☐ | GitHub account | https://github.com | Yes |
| ☐ | Supabase account (free) | https://supabase.com | Yes |
| ☐ | Netlify account (free) | https://netlify.com | Yes |
| ☐ | Resend account (free) | https://resend.com | For emails |
| ☐ | Your own domain | Any registrar | Optional |
| ☐ | Razorpay account | https://razorpay.com | Only for payments (Pro) |

Check your computer:

```bash
node -v        # v22.12.0 or newer
npm -v
git --version
```

## 2. Create your project

```bash
npm create spread-app@latest my-app
```

Answer the questions. Not sure? Pick a preset:

- **Blank** — login + theme + deploy
- **SaaS** — login, payments, admin, active devices
- **Booking** — slots, bookings, email confirmations
- **Mini store** — products, cart, Razorpay checkout
- **College project** — guided build with docs for your report and viva
- **Custom** — tick only what you need

Already have an Angular app? Run this inside it instead:

```bash
ng add @spreadapps/engine
```

## 3. Connect your accounts

```bash
cd my-app
npx spread connect
```

- A browser opens for **Supabase** and **Netlify** login. Your keys go into *your* accounts — Spread Apps never sees them.
- The engine creates the starter tables with Row Level Security on.
- Secret keys (Supabase service role, Resend, Razorpay secret) are saved only as **Netlify environment variables**.

## 4. Emails with Resend (optional)

1. In Resend, add and verify a **sub-domain** like `mail.myapp.in` (add the DNS records it shows).
2. Create an API key (one key per site is best).
3. In Netlify → Site configuration → Environment variables, add `RESEND_API_KEY` (mark it secret).
4. Always send *from* an address on the verified domain, e.g. `hello@mail.myapp.in`. Other domains are refused.

## 5. Run and go live

```bash
npm start                 # http://localhost:4200
git add . && git commit -m "First version"
git push                  # Netlify builds and deploys automatically
```

Add your own domain in Netlify → Domain management (optional).

## 6. Versions

| Engine | Angular | Tailwind | supabase-js | Node.js |
|--------|---------|----------|-------------|---------|
| 22.x   | 22      | 4.x      | 2.x         | 22.12+ / 24 LTS |

The engine's major version follows Angular's. Update with `npm update` and follow the short upgrade note for each major release.

## 7. Safety checklist

- ☐ Never commit `.env` files or secret keys to GitHub.
- ☐ Only the Supabase **anon** key goes in the browser app. The **service role** key stays in Netlify env.
- ☐ Keep Row Level Security ON for every table.
- ☐ In Netlify, keep "Netlify badge" off and security headers on (already in `netlify.toml`).

---

Questions? Join the waitlist at https://engine.spreadapps.in — we read every message.
