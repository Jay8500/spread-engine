import { getStore } from '@netlify/blobs';

/**
 * Spread Engine waitlist (Netlify Blobs, no database).
 *  POST /api/waitlist { name, email, need?, role, consent, website (honeypot) } → { ok, count }
 *  GET  /api/waitlist?key=STATS_KEY                                          → private list for the owner
 * One entry per email (re-joining just updates it). Owner email via Resend:
 * env RESEND_API_KEY + WAITLIST_EMAIL_TO; sender must be on mail.spreadapps.in (the domain verified in Resend).
 */
const ROLES = ['Freelancer', 'Agency', 'Student', 'Startup', 'Developer'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

declare const Netlify: { env: { get(k: string): string | undefined } };

interface Entry {
  name: string;
  email: string;
  need: string;
  role: string;
  at: string;
}

export default async (req: Request) => {
  const store = getStore({ name: 'waitlist', consistency: 'strong' });
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const secret = Netlify.env.get('STATS_KEY') ?? '';
    if (!secret || (await sha256(url.searchParams.get('key') ?? '')) !== (await sha256(secret))) return json({ error: 'Wrong key' }, 401);
    const { blobs } = await store.list({ prefix: 'w/' });
    const list = (await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' }) as Promise<Entry | null>))).filter(Boolean) as Entry[];
    list.sort((a, b) => a.at.localeCompare(b.at));
    return json({ count: list.length, list });
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const origin = req.headers.get('origin') ?? '';
  if (origin && !/^https:\/\/(engine\.spreadapps\.in|[a-z0-9-]+\.netlify\.app)$/.test(origin)) return json({ error: 'Forbidden' }, 403);

  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  if (clean(b['website'], 100)) return json({ ok: true }); // bots fill the hidden field
  const name = clean(b['name'], 80);
  const email = clean(b['email'], 120).toLowerCase();
  const need = clean(b['need'], 120);
  const role = ROLES.includes(String(b['role'])) ? String(b['role']) : 'Developer';
  if (name.length < 2 || !EMAIL_RE.test(email) || b['consent'] !== true) return json({ error: 'Please fill your name, a valid email and tick the consent box.' }, 400);

  const key = `w/${await sha256(email)}`;
  const isNew = !(await store.get(key));
  await store.setJSON(key, { name, email, need, role, at: new Date().toISOString() } satisfies Entry);
  const count = Number((await store.get('count')) ?? 0) + (isNew ? 1 : 0);
  if (isNew) await store.set('count', String(count));

  const resend = Netlify.env.get('RESEND_API_KEY')?.trim();
  const to = Netlify.env.get('WAITLIST_EMAIL_TO')?.trim();
  if (isNew && resend && to) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resend}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: 'Spread Engine <engine@mail.spreadapps.in>',
        to: [to],
        subject: `⚙️ Engine waitlist #${count}: ${name} (${role})`,
        html: `<p><b>${esc(name)}</b> joined the Spread Engine waitlist as <b>${esc(role)}</b>.</p>${need ? `<p>Wants to build: ${esc(need)}</p>` : ''}<p>Email: ${esc(email)}<br>Total: ${count}</p>`,
      }),
      signal: AbortSignal.timeout(8000),
    }).catch((e) => console.error('resend', e));
  }
  return json({ ok: true, count });
};

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (x) => x.toString(16).padStart(2, '0')).join('');
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'Cache-Control': 'no-store' } });
}

export const config = { path: '/api/waitlist' };
