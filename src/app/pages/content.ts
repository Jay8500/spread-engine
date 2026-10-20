/** All text and code samples for the Spread Engine landing page. */

export const STACK = [
  { icon: 'layers', label: 'Angular 22' },
  { icon: 'palette', label: 'Tailwind CSS v4' },
  { icon: 'database', label: 'Supabase' },
  { icon: 'cloud', label: 'Netlify' },
  { icon: 'mail', label: 'Resend emails' },
  { icon: 'smartphone', label: 'PWA' },
];

/** Engine stacks: one CLI, a separate versioned package per stack. */
export const STACKS = [
  {
    icon: 'layers', name: 'Web app', pkg: '@spreadapps/stack-angular', status: 'Building now', live: true,
    text: 'Full web apps with login, database, emails and deploy.',
    tech: ['Angular 22', 'Tailwind v4', 'Supabase', 'Netlify', 'Resend', 'PWA'],
  },
  {
    icon: 'server', name: 'Classic', pkg: '@spreadapps/stack-classic', status: 'Coming soon', live: false,
    text: 'For company and enterprise projects with your own API and SQL database.',
    tech: ['Angular', 'REST API', 'SQL Server', 'JWT auth'],
  },
  {
    icon: 'sparkles', name: 'Python ML', pkg: '@spreadapps/stack-python-ml', status: 'Coming soon', live: false,
    text: 'Train a model, serve it as an API and show it in a simple web page.',
    tech: ['Python', 'FastAPI', 'Notebook', 'Docker'],
  },
];

/** Open-source credits: the projects this site and the engine stand on. */
export const CREDITS = [
  { name: 'Angular', by: 'Google', license: 'MIT', url: 'https://angular.dev' },
  { name: 'Tailwind CSS', by: 'Tailwind Labs', license: 'MIT', url: 'https://tailwindcss.com' },
  { name: 'Supabase', by: 'Supabase Inc.', license: 'Apache-2.0', url: 'https://supabase.com' },
  { name: 'Lucide icons', by: 'Lucide contributors', license: 'ISC', url: 'https://lucide.dev' },
  { name: 'Inter & Plus Jakarta Sans', by: 'Google Fonts', license: 'OFL', url: 'https://fonts.google.com' },
  { name: 'Netlify & Resend', by: 'hosting and email', license: 'services', url: 'https://www.netlify.com' },
];

/** "Know the stack" cards: what each tool is, why it's here, and where to learn it. */
export const TECHS = [
  { icon: 'layers', name: 'Angular', by: 'by Google', what: 'A complete framework for web apps: routing, forms, SSR and signals built in.', why: 'Stable, typed, great for long-lived client projects and teams.', url: 'https://angular.dev' },
  { icon: 'palette', name: 'Tailwind CSS', by: 'v4', what: 'Utility-first styling right in your HTML. No more giant CSS files.', why: 'Fast to build, easy to keep a consistent brand.', url: 'https://tailwindcss.com' },
  { icon: 'database', name: 'Supabase', by: 'Postgres', what: 'A Postgres database with login, storage and realtime — open source.', why: 'Real SQL and Row Level Security, with a free tier to start.', url: 'https://supabase.com' },
  { icon: 'cloud', name: 'Netlify', by: 'hosting', what: 'Hosting with Git deploys, serverless functions, env vars and HTTPS.', why: 'Push to GitHub and it’s live. Previews for every change.', url: 'https://www.netlify.com' },
  { icon: 'mail', name: 'Resend', by: 'email', what: 'A simple email API for developers, sent from your own domain.', why: 'Contact forms, waitlists and alerts in a few lines.', url: 'https://resend.com' },
  { icon: 'smartphone', name: 'PWA', by: 'web standard', what: 'Install your web app on phones and desktops, like a store app.', why: 'No app store needed. Works on slow networks.', url: 'https://web.dev/explore/progressive-web-apps' },
];

export const FEATURES = [
  { icon: 'terminal', title: 'One-command project', text: 'Angular 22 with SSR and prerender, strict TypeScript, clean folders. Ready to run.', tag: 'Free' },
  { icon: 'palette', title: 'Tailwind ready', text: 'Tailwind v4 wired in, plus a theme with your brand colour and light/dark mode.', tag: 'Free' },
  { icon: 'database', title: 'Supabase connected', text: 'Client set up, starter tables and Row Level Security switched on from day one.', tag: 'Free' },
  { icon: 'key', title: 'Login & guards', text: 'Email OTP or Google login, route guards, and profile pages that just work.', tag: 'Free' },
  { icon: 'cloud', title: 'Netlify deploy', text: 'netlify.toml, security headers, SPA redirects and functions folder. One push and it’s live.', tag: 'Free' },
  { icon: 'mail', title: 'Emails via Resend', text: 'Contact form, waitlist and alerts sent from your own domain. No database needed.', tag: 'Free' },
  { icon: 'smartphone', title: 'PWA & update prompt', text: 'Installable like an app, works on slow net, shows “new version available”.', tag: 'Free' },
  { icon: 'devices', title: 'Active devices', text: 'See and sign out logged-in devices, like banking apps do.', tag: 'Pro' },
  { icon: 'dashboard', title: 'Admin panel', text: 'Users, roles and settings, protected by Supabase policies.', tag: 'Pro' },
  { icon: 'credit-card', title: 'Payments', text: 'Razorpay checkout with a webhook that verifies every payment.', tag: 'Pro' },
  { icon: 'building', title: 'Multi-tenant', text: 'One codebase for many clients, each on its own sub-domain.', tag: 'Pro' },
  { icon: 'shield-check', title: 'Security basics', text: 'Rate limits, honeypots, safe headers and secrets kept on the server.', tag: 'Free' },
];

export const AUDIENCE = [
  { icon: 'briefcase', title: 'Freelancers & agencies', text: 'Stop rebuilding login, emails and deploy for every client. Start each project on day 3, not day 15.' },
  { icon: 'rocket', title: 'Startups & indie makers', text: 'Go from idea to a live, installable app in a weekend and spend your time on what makes it different.' },
  { icon: 'graduation-cap', title: 'Final-year students', text: 'A guided learning kit: build your own project on a real stack, with docs that explain every line for your viva.' },
  { icon: 'code', title: 'Developers learning', text: 'See how a production Angular + Supabase app is wired together, step by step, and reuse it in your projects.' },
];

export const STEPS = [
  {
    title: 'Check the requirements',
    text: 'Install Node.js and Git, and create free accounts on Supabase, Netlify and Resend. Takes about 15 minutes, once.',
    cmd: 'node -v   # 22.12 or newer\ngit --version',
  },
  {
    title: 'Create your project',
    text: 'One command. The engine asks a few simple questions — no need to know everything up front.',
    cmd: 'npm create spread-app@latest my-app',
  },
  {
    title: 'Pick a preset or features',
    text: 'Choose Blank, SaaS, Booking, Store or College project — or tick features one by one.',
    cmd: '? What are you building?  › SaaS (login + payments + admin)',
  },
  {
    title: 'Connect your accounts',
    text: 'Log in to Supabase and Netlify in your browser. Your keys go into your own accounts, never to us.',
    cmd: 'npx spread connect\n✔ Supabase linked · tables + security created\n✔ Netlify site created · env vars set',
  },
  {
    title: 'Run, build, go live',
    text: 'Start locally, push to GitHub, and Netlify deploys it. Your app is live on your own domain.',
    cmd: 'npm start\ngit push   # Netlify deploys automatically',
  },
];

export const PREREQS = [
  { title: 'Node.js 22.12+ (24 LTS recommended)', text: 'nodejs.org → download the LTS version.', must: true },
  { title: 'Git', text: 'git-scm.com → install with default options.', must: true },
  { title: 'A code editor', text: 'VS Code is free and works great with Angular.', must: true },
  { title: 'GitHub account', text: 'To keep your code and auto-deploy to Netlify.', must: true },
  { title: 'Supabase account (free)', text: 'supabase.com → database, login and storage.', must: true },
  { title: 'Netlify account (free)', text: 'netlify.com → hosting, functions and env vars.', must: true },
  { title: 'Resend account (free)', text: 'resend.com → emails. Verify a sub-domain like mail.yoursite.in.', must: false },
  { title: 'Your own domain', text: 'Optional. A free .netlify.app address works to start.', must: false },
  { title: 'Razorpay account', text: 'Only if you need payments (Pro). KYC takes a few days.', must: false },
];

export const PRESETS = [
  { icon: 'zap', title: 'Blank', text: 'Login + theme + deploy. The cleanest start.' },
  { icon: 'dashboard', title: 'SaaS', text: 'Login, payments, admin and active devices.' },
  { icon: 'calendar-check', title: 'Booking', text: 'Slots, bookings and email confirmations.' },
  { icon: 'store', title: 'Mini store', text: 'Products, cart and Razorpay checkout.' },
  { icon: 'graduation-cap', title: 'College project', text: 'Guided build with docs for your report and viva.' },
  { icon: 'list-checks', title: 'Custom', text: 'Tick only the features you want.' },
];

export const VERSIONS = [
  { engine: '22.x', angular: '22', tailwind: '4.x', supabase: '2.x', node: '22.12+ / 24 LTS', status: 'Building now' },
  { engine: '23.x', angular: '23', tailwind: '4.x', supabase: '2.x', node: '24 LTS', status: 'After Angular 23' },
];

export const CODE = [
  {
    id: 'create',
    label: 'New project',
    file: 'terminal',
    code: `npm create spread-app@latest my-app

? What are you building?   SaaS (login + payments + admin)
? Backend                  Supabase
? Hosting                  Netlify
? Payments                 Razorpay
? Brand colour             #0d9488

✔ Angular 22 project created
✔ Tailwind v4 + theme added
✔ Supabase client + migrations added
✔ netlify.toml + functions added
→ cd my-app && npx spread connect`,
  },
  {
    id: 'add',
    label: 'Existing project',
    file: 'terminal',
    code: `# Already have an Angular app? Add the engine to it:
ng add @spreadapps/engine

✔ Tailwind v4 configured (styles.css + .postcssrc.json)
✔ netlify.toml created (redirects, headers, functions)
✔ src/environments: Supabase URL + anon key placeholders
✔ provideSpreadEngine() added to app.config.ts
✔ supabase/migrations copied (profiles, devices, roles + RLS)`,
  },
  {
    id: 'config',
    label: 'app.config.ts',
    file: 'src/app/app.config.ts',
    code: `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSpreadEngine } from '@spreadapps/engine';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideSpreadEngine({
      supabase: { url: environment.supabaseUrl, anonKey: environment.supabaseAnonKey },
      features: { auth: true, devices: true, theme: true, admin: true, pwaUpdate: true },
    }),
  ],
};`,
  },
  {
    id: 'auth',
    label: 'Login & guards',
    file: 'src/app/app.routes.ts',
    code: `import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@spreadapps/engine';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('@spreadapps/engine/login').then((m) => m.Login) },
  { path: 'app', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard') },
  { path: 'admin', canActivate: [roleGuard('admin')], loadChildren: () => import('@spreadapps/engine/admin') },
];

// In any component:
// readonly auth = inject(AuthService);
// auth.user()         → signal with the logged-in user
// auth.signOutDevice(id)  → sign out one device`,
  },
  {
    id: 'netlify',
    label: 'netlify.toml',
    file: 'netlify.toml',
    code: `[build]
  command = "npm run build"
  publish = "dist/my-app/browser"
  functions = "netlify/functions"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"`,
  },
  {
    id: 'email',
    label: 'Email (Resend)',
    file: 'netlify/functions/contact.mts',
    code: `import { sendEmail } from '@spreadapps/engine/server';

// Netlify env: RESEND_API_KEY (secret) + CONTACT_EMAIL_TO
export default async (req: Request) => {
  const { name, email, message } = await req.json();
  await sendEmail({
    from: 'My App <hello@mail.myapp.in>',   // a domain verified in Resend
    to: Netlify.env.get('CONTACT_EMAIL_TO')!,
    subject: \`New message from \${name}\`,
    text: \`\${message}\\n\\nReply to: \${email}\`,
  });
  return Response.json({ ok: true });
};

export const config = { path: '/api/contact' };`,
  },
];

export const SAFETY = [
  { icon: 'key', title: 'Your accounts, your keys', text: 'Supabase, Netlify and Resend accounts are yours. The engine never sees or stores your keys.' },
  { icon: 'lock', title: 'Secrets stay on the server', text: 'Service keys live only in Netlify env vars and functions — never in the browser bundle.' },
  { icon: 'shield-check', title: 'Security on by default', text: 'Row Level Security on every table, safe headers, rate limits and bot checks on forms.' },
  { icon: 'eye', title: 'Readable code, no lock-in', text: 'Everything it adds is plain Angular code in your repo. Remove the engine any time.' },
];

export const FAQ = [
  { q: 'Is it free?', a: 'The core (project setup, Tailwind, Supabase, login, Netlify, emails, PWA) will be free. Pro features like payments, admin, active devices and multi-tenant will be a one-time paid kit. Waitlist members get the launch price first.' },
  { q: 'Do I need to know exactly what I want before starting?', a: 'No. Pick a preset like Blank or SaaS and add features later with one command.' },
  { q: 'Do I have to give you my Supabase or Netlify keys?', a: 'Never. You log in to your own accounts in your browser and the keys go straight into your project and your Netlify settings.' },
  { q: 'Can students use it for a final-year project?', a: 'Yes, as a learning kit. You build your own features on top, and the docs explain every part so you can present and answer viva questions with confidence.' },
  { q: 'What happens when Angular releases a new version?', a: 'The engine’s major version follows Angular’s (engine 22 → Angular 22). After each Angular release we publish a matching version and an upgrade guide.' },
  { q: 'Only Angular? What about Python, React or others?', a: 'The engine works with stacks. The Angular web app stack comes first; Classic (API + SQL Server) and Python ML stacks are planned next. Each stack is its own package, so one never breaks another. Tell us on the waitlist which stack you want.' },
];
