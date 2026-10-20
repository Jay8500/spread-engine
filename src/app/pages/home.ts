import { Component, afterNextRender, computed, signal } from '@angular/core';
import { AdSlot } from '../shared/ad-slot';
import { CodeBlock } from '../shared/code-block';
import { Icon } from '../shared/icon';
import { EngineLogo, EngineMark } from '../shared/logo';
import { Waitlist } from '../shared/waitlist';
import { AUDIENCE, CODE, FAQ, FEATURES, PREREQS, PRESETS, SAFETY, STACK, STACKS, STEPS, TECHS, VERSIONS } from './content';

/** Cover page for engine.spreadapps.in — what the engine does, setup steps, code, versions + waitlist. */
@Component({
  selector: 'se-home',
  imports: [Icon, EngineLogo, EngineMark, Waitlist, CodeBlock, AdSlot],
  template: `
    <!-- Nav -->
    <header class="sticky top-0 z-30 border-b border-line/70 bg-white/85 backdrop-blur">
      <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" aria-label="Spread Engine home"><se-logo [size]="30" /></a>
        <div class="hidden items-center gap-6 text-sm font-semibold text-muted md:flex">
          <a href="#stacks" class="hover:text-brand">Stacks</a>
          <a href="#demo" class="hover:text-brand">Demo</a>
          <a href="#features" class="hover:text-brand">What it does</a>
          <a href="#steps" class="hover:text-brand">Steps</a>
          <a href="#code" class="hover:text-brand">Code</a>
          <a href="#versions" class="hover:text-brand">Versions</a>
          <a href="#faq" class="hover:text-brand">FAQ</a>
        </div>
        <a href="#join" class="btn btn-primary min-h-10 px-4 text-sm">Join waitlist</a>
      </nav>
    </header>

    <main id="top">
      <!-- Hero -->
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_10%,#ccfbf1_0%,transparent_70%),radial-gradient(40%_40%_at_0%_80%,#f0fdfa_0%,transparent_70%)]"></div>
        <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 md:grid-cols-[1fr_1fr] md:pt-16 md:pb-24">
          <div>
            <p class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold text-brand">
              <span class="relative flex size-2"><span class="absolute inline-flex size-full animate-ping rounded-full bg-brand-2 opacity-70"></span><span class="relative inline-flex size-2 rounded-full bg-brand"></span></span>
              Coming soon · Made with <span class="text-rose-500">❤️</span> for India
            </p>
            <h1 class="mt-5 text-4xl leading-[1.08] font-extrabold sm:text-5xl md:text-[3.4rem]">
              Your next Angular app, <span class="bg-gradient-to-r from-brand to-brand-3 bg-clip-text text-transparent">ready in 10 minutes.</span>
            </h1>
            <p class="mt-5 max-w-xl text-base text-muted sm:text-lg">
              Answer a few questions and get a working app with <b class="text-ink">login, database, emails and deploy</b> already set up.
              Angular, Tailwind, Supabase and Netlify, wired together the right way.
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <a href="#join" class="btn btn-primary">Join the waitlist <svg lucideIcon="chevron-right" [size]="18" /></a>
              <a href="#demo" class="btn btn-ghost"><span class="text-xs">▶</span> Watch the demo</a>
              <a href="downloads/spread-engine-setup-steps.md" download class="btn btn-ghost"><svg lucideIcon="download" [size]="18" /> Setup steps</a>
            </div>
            <p class="mt-4 text-xs text-muted">Free core · Your accounts, your keys · Plain code, no lock-in</p>
          </div>

          <!-- Terminal mock -->
          <div class="relative">
            <div class="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-100 to-white blur-2xl"></div>
            <div class="overflow-hidden rounded-2xl border border-ink/10 bg-[#0b1220] shadow-2xl">
              <div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
                <i class="size-2.5 rounded-full bg-rose-400/80"></i><i class="size-2.5 rounded-full bg-amber-300/80"></i><i class="size-2.5 rounded-full bg-emerald-400/80"></i>
                <span class="ml-2 font-mono text-[11px] text-slate-500">~/projects</span>
              </div>
              <div class="space-y-1 p-4 font-mono text-[12.5px] leading-relaxed text-slate-300 sm:p-5">
                <p><span class="text-brand-3">$</span> npm create spread-app my-app</p>
                <p class="pt-1"><span class="text-brand-4">?</span> What are you building? <span class="text-white">SaaS</span></p>
                <p><span class="text-brand-4">?</span> Features <span class="text-white">Login · Emails · Devices · Admin</span></p>
                <p><span class="text-brand-4">?</span> Payments <span class="text-white">Razorpay</span></p>
                <p class="pt-1 text-emerald-400">✔ Angular 22 + Tailwind v4</p>
                <p class="text-emerald-400">✔ Supabase connected · RLS on</p>
                <p class="text-emerald-400">✔ Netlify site + env vars</p>
                <p class="text-emerald-400">✔ Resend emails from mail.my-app.in</p>
                <p class="pt-1"><span class="text-brand-3">$</span> git push <span class="text-slate-500"># live in ~1 min</span><span class="caret"></span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stack -->
      <section class="border-y border-line bg-brand-50/40">
        <div class="mx-auto max-w-6xl px-4 py-8">
          <p class="text-center text-sm font-semibold text-muted">The stack Indian freelancers already trust, set up for you</p>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            @for (s of stack; track s.label) {
              <span class="chip"><svg [lucideIcon]="s.icon" [size]="15" class="text-brand" /> {{ s.label }}</span>
            }
          </div>
        </div>
      </section>

      <!-- Stacks -->
      <section id="stacks" class="mx-auto max-w-6xl px-4 pt-16">
        <p class="eyebrow">Stacks</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">One engine. Your choice of stack.</h2>
        <p class="mt-2 max-w-2xl text-muted">Pick a stack when you create a project. Each stack is its own package with its own versions, so new stacks never break old ones.</p>
        <div class="card mt-6 overflow-hidden bg-[#0b1220] font-mono text-[12.5px] leading-relaxed text-slate-300">
          <div class="p-4 sm:p-5">
            <p><span class="text-brand-3">$</span> npx create-spread-app my-app</p>
            <p class="pt-1"><span class="text-brand-4">?</span> Choose a stack</p>
            @for (s of stacks; track s.name; let first = $first) {
              <p class="pl-3" [class]="first ? 'text-white' : 'text-slate-500'">{{ first ? '●' : '○' }} {{ s.name }} <span class="text-slate-500">– {{ s.tech.slice(0, 3).join(' + ') }}</span>@if (!s.live) { <span class="text-slate-600"> (coming soon)</span> }</p>
            }
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          @for (s of stacks; track s.name) {
            <div class="card relative flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-lg" [class]="s.live ? '!border-brand-3 ring-4 ring-brand-50' : 'hover:border-brand-3'">
              <span class="absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold" [class]="s.live ? 'bg-brand text-white' : 'bg-slate-100 text-muted'">{{ s.status }}</span>
              <span class="grid size-11 place-items-center rounded-xl" [class]="s.live ? 'bg-gradient-to-br from-brand to-brand-2 text-white' : 'bg-brand-50 text-brand'"><svg [lucideIcon]="s.icon" [size]="22" /></span>
              <h3 class="mt-4 text-lg font-bold">{{ s.name }}</h3>
              <p class="mt-1 text-sm text-muted">{{ s.text }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (t of s.tech; track t) { <span class="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand">{{ t }}</span> }
              </div>
              <code class="mt-auto block truncate pt-4 text-[11px] text-muted">{{ s.pkg }}</code>
              <a href="#join" class="mt-3 text-sm font-semibold text-brand hover:underline">{{ s.live ? 'Get early access →' : 'Notify me →' }}</a>
            </div>
          }
          <a href="#join" class="card grid place-items-center border-dashed p-5 text-center text-sm text-muted transition hover:border-brand-3 hover:text-brand md:col-span-3">
            <span><b class="text-ink">Want another stack?</b> Tell us on the waitlist what you build with — the most requested stack comes next.</span>
          </a>
        </div>
      </section>

      <!-- Demo -->
      <section id="demo" class="mx-auto max-w-6xl px-4 pt-16">
        <p class="eyebrow">Watch it work</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">From npm to a live app, in one short demo.</h2>
        <p class="mt-2 max-w-2xl text-muted">Create, connect, start and stop on your own machine with a local preview, then push it online. Tap any chapter to jump.</p>
        <div class="mt-8 overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl shadow-brand/10">
          <video class="block aspect-[1120/460] w-full bg-slate-50" src="demo/how-it-works.mp4" poster="demo/how-it-works.jpg"
                 controls playsinline muted loop preload="none" aria-label="Spread Engine how-it-works video: create, connect, start, stop, go live"></video>
        </div>
        <p class="mt-3 text-xs text-muted">Walkthrough of the planned workflow (34 s, no sound). A recording of the real tool comes with the first release.</p>
      </section>

      <!-- Features -->
      <section id="features" class="mx-auto max-w-6xl px-4 py-16">
        <p class="eyebrow">What it does</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Everything you set up again and again. Done once.</h2>
        <p class="mt-2 max-w-2xl text-muted">Turn on only what you need. Every part is plain Angular code in your repo that you can read and change.</p>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          @for (f of features; track f.title) {
            <div class="card relative p-5 transition hover:-translate-y-1 hover:border-brand-3 hover:shadow-lg">
              <span class="absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    [class]="f.tag === 'Pro' ? 'bg-ink text-white' : 'bg-brand-50 text-brand'">{{ f.tag }}</span>
              <span class="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand"><svg [lucideIcon]="f.icon" [size]="20" /></span>
              <h3 class="mt-4 font-bold">{{ f.title }}</h3>
              <p class="mt-1 text-sm text-muted">{{ f.text }}</p>
            </div>
          }
        </div>
      </section>

      <se-ad-slot slot="afterFeatures" />

      <!-- Audience -->
      <section class="border-t border-line bg-brand-50/40">
        <div class="mx-auto max-w-6xl px-4 py-16">
          <p class="eyebrow">Who it's for</p>
          <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Built for people who build.</h2>
          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            @for (a of audience; track a.title) {
              <div class="card flex gap-4 p-5">
                <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand ring-1 ring-brand-100"><svg [lucideIcon]="a.icon" [size]="22" /></span>
                <div><h3 class="font-bold">{{ a.title }}</h3><p class="mt-1 text-sm text-muted">{{ a.text }}</p></div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Know the stack -->
      <section id="stack" class="mx-auto max-w-6xl px-4 py-16">
        <p class="eyebrow">Know the stack</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Modern tools. New to them? Start here.</h2>
        <p class="mt-2 max-w-2xl text-muted">Coming from PHP, WordPress or plain HTML? Every tool the engine uses is popular, well documented and free to start.</p>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          @for (t of techs; track t.name) {
            <div class="card flex flex-col p-5 transition hover:-translate-y-1 hover:border-brand-3 hover:shadow-lg">
              <div class="flex items-center gap-3">
                <span class="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand"><svg [lucideIcon]="t.icon" [size]="20" /></span>
                <div><h3 class="font-bold leading-tight">{{ t.name }}</h3><p class="text-xs text-muted">{{ t.by }}</p></div>
              </div>
              <p class="mt-3 text-sm">{{ t.what }}</p>
              <p class="mt-1 text-sm text-muted">{{ t.why }}</p>
              <a [href]="t.url" target="_blank" rel="noopener" class="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand hover:underline">Official docs <svg lucideIcon="chevron-right" [size]="14" /></a>
            </div>
          }
        </div>
      </section>

      <!-- Steps -->
      <section id="steps" class="mx-auto max-w-6xl px-4 py-16">
        <p class="eyebrow">How it works</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Five easy steps. No guesswork.</h2>
        <ol class="mt-8 space-y-4">
          @for (s of steps; track s.title; let i = $index) {
            <li class="card grid gap-4 p-5 md:grid-cols-[auto_1fr_1.1fr] md:items-center">
              <span class="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-lg font-extrabold text-white">{{ i + 1 }}</span>
              <div><h3 class="font-bold">{{ s.title }}</h3><p class="mt-1 text-sm text-muted">{{ s.text }}</p></div>
              <pre class="overflow-x-auto rounded-xl bg-[#0b1220] px-4 py-3 font-mono text-[12px] leading-relaxed text-slate-200">{{ s.cmd }}</pre>
            </li>
          }
        </ol>
      </section>

      <!-- Requirements -->
      <section id="requirements" class="border-y border-line bg-brand-50/40">
        <div class="mx-auto max-w-6xl px-4 py-16">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="eyebrow">Before you start</p>
              <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Requirements checklist.</h2>
              <p class="mt-2 text-muted">All free to start. Tick them off as you go — your ticks stay on this device.</p>
            </div>
            <a href="downloads/spread-engine-setup-steps.md" download class="btn btn-primary"><svg lucideIcon="download" [size]="18" /> Download full steps</a>
          </div>
          <div class="mt-6 h-2 overflow-hidden rounded-full bg-white ring-1 ring-line" role="progressbar" [attr.aria-valuenow]="doneCount()" aria-valuemin="0" [attr.aria-valuemax]="prereqs.length" aria-label="Checklist progress">
            <div class="h-full rounded-full bg-gradient-to-r from-brand to-brand-3 transition-all" [style.width.%]="(doneCount() / prereqs.length) * 100"></div>
          </div>
          <p class="mt-2 text-xs font-semibold text-muted">{{ doneCount() }} of {{ prereqs.length }} ready</p>
          <ul class="mt-4 grid gap-3 md:grid-cols-3">
            @for (p of prereqs; track p.title; let i = $index) {
              <li>
                <label class="card flex h-full cursor-pointer gap-3 p-4 transition hover:border-brand-3" [class.!border-brand-3]="done()[i]">
                  <input type="checkbox" class="mt-0.5 size-5 shrink-0 accent-[#0d9488]" [checked]="done()[i]" (change)="toggle(i)" />
                  <span>
                    <span class="flex flex-wrap items-center gap-1.5 font-bold" [class.line-through]="done()[i]" [class.text-muted]="done()[i]">
                      {{ p.title }}
                      @if (!p.must) { <span class="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-muted ring-1 ring-line">optional</span> }
                    </span>
                    <span class="mt-0.5 block text-sm text-muted">{{ p.text }}</span>
                  </span>
                </label>
              </li>
            }
          </ul>
        </div>
      </section>

      <!-- Presets -->
      <section class="mx-auto max-w-6xl px-4 py-16">
        <p class="eyebrow">Presets</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Not sure what you need? Pick a preset.</h2>
        <div class="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-6">
          @for (p of presets; track p.title) {
            <div class="card p-4 text-center transition hover:-translate-y-1 hover:border-brand-3">
              <span class="mx-auto grid size-10 place-items-center rounded-xl bg-brand-50 text-brand"><svg [lucideIcon]="p.icon" [size]="20" /></span>
              <h3 class="mt-3 text-sm font-bold">{{ p.title }}</h3>
              <p class="mt-1 text-xs text-muted">{{ p.text }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Code -->
      <section id="code" class="bg-ink text-white">
        <div class="mx-auto max-w-6xl px-4 py-16">
          <p class="eyebrow !text-brand-4">See the code</p>
          <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Integrate it in minutes.</h2>
          <p class="mt-2 max-w-2xl text-slate-300">New project or existing one — this is all the code you write. The engine handles the rest.</p>
          <div class="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Code samples">
            @for (c of code; track c.id) {
              <button type="button" role="tab" class="shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition"
                      [class]="tab() === c.id ? 'border-brand-3 bg-brand text-white' : 'border-white/15 text-slate-300 hover:border-white/40'"
                      [attr.aria-selected]="tab() === c.id" (click)="tab.set(c.id)">{{ c.label }}</button>
            }
          </div>
          <se-code class="mt-4" [file]="active().file" [code]="active().code" />
          <p class="mt-3 text-xs text-slate-400">Preview of the planned API — names may change slightly before launch.</p>
        </div>
      </section>

      <se-ad-slot slot="afterCode" />

      <!-- Versions -->
      <section id="versions" class="mx-auto max-w-6xl px-4 py-16">
        <p class="eyebrow">Versions</p>
        <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">Always in step with Angular.</h2>
        <p class="mt-2 max-w-2xl text-muted">Engine major = Angular major. Fix once, then every project gets it with <code class="rounded bg-brand-50 px-1.5 py-0.5 text-sm text-brand">npm update</code>.</p>
        <div class="card mt-6 overflow-x-auto">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead class="bg-brand-50/60 text-xs tracking-wide text-muted uppercase">
              <tr><th class="px-4 py-3">Engine</th><th class="px-4 py-3">Angular</th><th class="px-4 py-3">Tailwind</th><th class="px-4 py-3">supabase-js</th><th class="px-4 py-3">Node.js</th><th class="px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              @for (v of versions; track v.engine; let first = $first) {
                <tr class="border-t border-line">
                  <td class="px-4 py-3 font-bold text-brand">{{ v.engine }}</td><td class="px-4 py-3">{{ v.angular }}</td><td class="px-4 py-3">{{ v.tailwind }}</td>
                  <td class="px-4 py-3">{{ v.supabase }}</td><td class="px-4 py-3">{{ v.node }}</td>
                  <td class="px-4 py-3"><span class="rounded-full px-2 py-0.5 text-xs font-bold" [class]="first ? 'bg-brand-50 text-brand' : 'bg-slate-100 text-muted'">{{ v.status }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          <div class="card p-4 text-sm"><b>Peer dependencies</b><p class="mt-1 text-muted">Your app controls Angular, Supabase and Tailwind versions. No surprise upgrades.</p></div>
          <div class="card p-4 text-sm"><b>Upgrade guides</b><p class="mt-1 text-muted">Every major release comes with a short step-by-step upgrade note.</p></div>
          <div class="card p-4 text-sm"><b>Safe migrations</b><p class="mt-1 text-muted">Database changes are versioned and safe to run twice.</p></div>
        </div>
      </section>

      <!-- Safety -->
      <section class="border-t border-line bg-brand-50/40">
        <div class="mx-auto max-w-6xl px-4 py-16">
          <p class="eyebrow">Safe by design</p>
          <h2 class="mt-2 text-3xl font-extrabold sm:text-4xl">You stay in control.</h2>
          <div class="mt-8 grid gap-3 md:grid-cols-2">
            @for (s of safety; track s.title) {
              <div class="card flex gap-4 p-5">
                <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand ring-1 ring-brand-100"><svg [lucideIcon]="s.icon" [size]="20" /></span>
                <div><h3 class="font-bold">{{ s.title }}</h3><p class="mt-1 text-sm text-muted">{{ s.text }}</p></div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="mx-auto max-w-3xl px-4 py-16">
        <p class="eyebrow text-center">FAQ</p>
        <h2 class="mt-2 text-center text-3xl font-extrabold sm:text-4xl">Questions, answered.</h2>
        <div class="mt-8 space-y-2">
          @for (f of faq; track f.q) {
            <details class="card group p-4 open:border-brand-3">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                {{ f.q }}
                <svg lucideIcon="chevron-right" [size]="18" class="text-brand transition group-open:rotate-90" />
              </summary>
              <p class="mt-2 text-sm text-muted">{{ f.a }}</p>
            </details>
          }
        </div>
      </section>

      <!-- Join -->
      <section id="join" class="mx-auto max-w-6xl px-4 pb-16">
        <div class="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-brand to-brand-2 p-6 text-white sm:p-10 md:grid-cols-2">
          <div>
            <se-mark [size]="56" [light]="true" />
            <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">Be the first to build with it.</h2>
            <p class="mt-2 text-brand-100">Join the waitlist and we'll email you when Spread Engine opens. Early members get the Pro kit at the launch price.</p>
            <ul class="mt-4 space-y-1.5 text-sm text-brand-50">
              <li class="flex items-center gap-2"><svg lucideIcon="circle-check" [size]="16" /> Early access to the free core</li>
              <li class="flex items-center gap-2"><svg lucideIcon="circle-check" [size]="16" /> Launch price on Pro</li>
              <li class="flex items-center gap-2"><svg lucideIcon="circle-check" [size]="16" /> No spam. One email when it's ready.</li>
            </ul>
          </div>
          <se-waitlist />
        </div>
      </section>
    </main>

    <footer class="border-t border-line">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <se-logo [size]="26" />
        <p>A <a href="https://spreadapps.in" class="font-semibold text-ink hover:text-brand">Spread Apps™</a> product · Made with <span class="text-rose-500">❤️</span> for India · © {{ year }}</p>
        <div class="flex gap-4">
          <a href="https://tools.spreadapps.in" class="font-semibold hover:text-brand">Free tools</a>
          <a href="https://setu.spreadapps.in" class="font-semibold hover:text-brand">Setu</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .caret { display: inline-block; width: 7px; height: 14px; margin-left: 4px; vertical-align: -2px; background: #2dd4bf; animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
  `,
})
export class Home {
  protected readonly year = new Date().getFullYear();
  protected readonly stack = STACK;
  protected readonly techs = TECHS;
  protected readonly stacks = STACKS;
  protected readonly features = FEATURES;
  protected readonly audience = AUDIENCE;
  protected readonly steps = STEPS;
  protected readonly prereqs = PREREQS;
  protected readonly presets = PRESETS;
  protected readonly code = CODE;
  protected readonly versions = VERSIONS;
  protected readonly safety = SAFETY;
  protected readonly faq = FAQ;

  protected readonly tab = signal(CODE[0].id);
  protected readonly active = computed(() => CODE.find((c) => c.id === this.tab()) ?? CODE[0]);

  protected readonly done = signal<boolean[]>(PREREQS.map(() => false));
  protected readonly doneCount = computed(() => this.done().filter(Boolean).length);

  constructor() {
    // Restore ticks after hydration (the prerendered HTML always starts empty).
    afterNextRender(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('se-checklist') ?? '[]') as boolean[];
        if (Array.isArray(saved)) this.done.set(PREREQS.map((_, i) => saved[i] === true));
      } catch {
        /* storage blocked */
      }
    });
  }

  protected toggle(i: number) {
    this.done.update((d) => d.map((v, j) => (j === i ? !v : v)));
    try {
      localStorage.setItem('se-checklist', JSON.stringify(this.done()));
    } catch {
      /* not remembered */
    }
  }
}
