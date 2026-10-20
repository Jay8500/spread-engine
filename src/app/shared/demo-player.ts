import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { Icon } from './icon';

type Line = { k: 'cmd' | 'ask' | 'ok' | 'out' | 'dim'; t: string };
type Preview = 'empty' | 'connect' | 'local' | 'stopped' | 'live';
interface Scene {
  title: string;
  caption: string;
  url: string;
  preview: Preview;
  lines: Line[];
}

const SCENES: Scene[] = [
  {
    title: 'Create',
    caption: 'One command creates the project. Pick a preset — no need to know everything up front.',
    url: '',
    preview: 'empty',
    lines: [
      { k: 'cmd', t: 'npm create spread-app@latest my-app' },
      { k: 'ask', t: '? What are you building?  SaaS' },
      { k: 'ask', t: '? Features  Login · Emails · Devices · Admin' },
      { k: 'ask', t: '? Brand colour  #0d9488' },
      { k: 'ok', t: '✔ Angular 22 project created' },
      { k: 'ok', t: '✔ Tailwind v4 + theme added' },
      { k: 'ok', t: '✔ Supabase client + migrations added' },
      { k: 'ok', t: '✔ netlify.toml + functions added' },
    ],
  },
  {
    title: 'Connect',
    caption: 'Log in to your own Supabase and Netlify in the browser. Keys go to your accounts, never to us.',
    url: '',
    preview: 'connect',
    lines: [
      { k: 'cmd', t: 'cd my-app && npx spread connect' },
      { k: 'dim', t: '→ Opening browser for Supabase login…' },
      { k: 'ok', t: '✔ Supabase linked · tables + RLS created' },
      { k: 'dim', t: '→ Opening browser for Netlify login…' },
      { k: 'ok', t: '✔ Netlify site created · env vars set' },
    ],
  },
  {
    title: 'Start',
    caption: 'npm start runs your app on your own machine. Every save shows up instantly in the preview.',
    url: 'localhost:4200',
    preview: 'local',
    lines: [
      { k: 'cmd', t: 'npm start' },
      { k: 'dim', t: 'Building…' },
      { k: 'ok', t: '✔ Application bundle generation complete.' },
      { k: 'out', t: '➜  Local:   http://localhost:4200/' },
      { k: 'dim', t: 'Watching for file changes…' },
    ],
  },
  {
    title: 'Stop',
    caption: 'Press Ctrl + C to stop the local server. Run npm start again any time.',
    url: 'localhost:4200',
    preview: 'stopped',
    lines: [
      { k: 'cmd', t: '^C' },
      { k: 'dim', t: 'Server stopped.' },
      { k: 'cmd', t: 'npm start   # start again whenever you like' },
    ],
  },
  {
    title: 'Go live',
    caption: 'Push to GitHub and Netlify builds it. Your app is online — share the link or add your domain.',
    url: 'my-app.netlify.app',
    preview: 'live',
    lines: [
      { k: 'cmd', t: 'git add . && git commit -m "First version"' },
      { k: 'cmd', t: 'git push' },
      { k: 'dim', t: 'Netlify: building my-app…' },
      { k: 'ok', t: '✔ Deploy live in 58s' },
      { k: 'out', t: '➜  https://my-app.netlify.app' },
    ],
  },
];

/**
 * "Video" walkthrough of the engine: a scripted terminal + browser preview that plays like a video
 * (chapters, play/pause, progress). The prerendered HTML shows the first chapter complete;
 * playback starts when the player scrolls into view (not with reduced motion).
 */
@Component({
  selector: 'se-demo-player',
  imports: [Icon],
  host: { class: 'block' },
  template: `
    <div class="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl shadow-brand/10">
      <!-- Chapters -->
      <div class="flex gap-1 overflow-x-auto border-b border-line bg-brand-50/50 p-2" role="tablist" aria-label="Demo chapters">
        @for (s of scenes; track s.title; let i = $index) {
          <button type="button" role="tab" class="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition sm:text-sm"
                  [class]="i === scene() ? 'bg-brand text-white shadow' : 'text-muted hover:bg-white hover:text-ink'"
                  [attr.aria-selected]="i === scene()" (click)="jump(i)">
            <span class="grid size-5 place-items-center rounded-full text-[10px]" [class]="i === scene() ? 'bg-white/25' : 'bg-white ring-1 ring-line'">{{ i + 1 }}</span>
            {{ s.title }}
          </button>
        }
      </div>

      <div class="grid md:grid-cols-2">
        <!-- Terminal -->
        <div class="min-h-[230px] bg-[#0b1220] p-4 md:min-h-[300px] font-mono text-[12px] leading-relaxed sm:p-5 sm:text-[12.5px]" aria-live="polite">
          <div class="mb-3 flex items-center gap-1.5" aria-hidden="true">
            <i class="size-2.5 rounded-full bg-rose-400/80"></i><i class="size-2.5 rounded-full bg-amber-300/80"></i><i class="size-2.5 rounded-full bg-emerald-400/80"></i>
            <span class="ml-2 text-[11px] text-slate-500">{{ scene() === 0 ? '~/projects' : '~/projects/my-app' }}</span>
          </div>
          @for (l of shown(); track $index; let last = $last) {
            <p class="break-words"
               [class]="l.k === 'ok' ? 'text-emerald-400' : l.k === 'ask' ? 'text-brand-4' : l.k === 'dim' ? 'text-slate-500' : l.k === 'out' ? 'text-white' : 'text-slate-200'">
              @if (l.k === 'cmd') { <span class="text-brand-3">$ </span> }{{ l.t }}@if (last && playing()) { <span class="caret"></span> }
            </p>
          }
        </div>

        <!-- Browser preview -->
        <div class="flex min-h-[300px] flex-col bg-slate-50 p-3 sm:p-4">
          <div class="flex flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div class="flex items-center gap-2 border-b border-line px-3 py-2">
              <span class="flex gap-1" aria-hidden="true"><i class="size-2 rounded-full bg-slate-300"></i><i class="size-2 rounded-full bg-slate-300"></i><i class="size-2 rounded-full bg-slate-300"></i></span>
              <span class="flex flex-1 items-center gap-1.5 truncate rounded-md bg-slate-100 px-2 py-1 text-[11px] text-muted">
                @if (cur().preview === 'live' && done()) { <svg lucideIcon="lock" [size]="11" class="text-emerald-600" /> }
                {{ cur().url || 'New tab' }}
              </span>
              @if (cur().preview === 'live' && done()) { <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">● Live</span> }
              @if (cur().preview === 'local' && done()) { <span class="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand">● Local</span> }
            </div>

            <div class="grid flex-1 place-items-center p-4">
              @switch (view()) {
                @case ('empty') {
                  <div class="text-center text-sm text-muted"><svg lucideIcon="terminal" [size]="28" class="mx-auto text-slate-300" /><p class="mt-2">Your app will appear here after <b>npm start</b></p></div>
                }
                @case ('connect') {
                  <div class="w-full max-w-[240px] space-y-2">
                    @for (c of connectCards(); track c.name) {
                      <div class="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-sm">
                        <span class="flex items-center gap-2 font-semibold"><svg [lucideIcon]="c.icon" [size]="16" class="text-brand" /> {{ c.name }}</span>
                        <span class="text-xs font-bold" [class]="c.ok ? 'text-emerald-600' : 'text-muted'">{{ c.ok ? '✓ Connected' : 'Waiting…' }}</span>
                      </div>
                    }
                  </div>
                }
                @case ('loading') {
                  <div class="text-center text-sm text-muted"><span class="mx-auto block size-7 animate-spin rounded-full border-2 border-brand-100 border-t-brand"></span><p class="mt-2">Building…</p></div>
                }
                @case ('stopped') {
                  <div class="text-center"><p class="text-3xl">🔌</p><p class="mt-2 text-sm font-bold">This site can’t be reached</p><p class="text-xs text-muted">localhost refused to connect — the server is stopped.</p></div>
                }
                @case ('app') {
                  <!-- Mini sample app -->
                  <div class="w-full max-w-[280px] text-left">
                    <div class="flex items-center justify-between">
                      <span class="flex items-center gap-1.5 text-sm font-extrabold"><span class="size-3 rounded bg-brand"></span> My App</span>
                      <span class="grid size-6 place-items-center rounded-full bg-brand-50 text-[10px] font-bold text-brand">SR</span>
                    </div>
                    <p class="mt-3 text-xs text-muted">Welcome back, Sita 👋</p>
                    <div class="mt-2 grid grid-cols-3 gap-1.5">
                      <div class="rounded-lg bg-brand-50 p-2"><p class="text-[9px] text-muted">Users</p><p class="text-sm font-extrabold text-brand">128</p></div>
                      <div class="rounded-lg bg-brand-50 p-2"><p class="text-[9px] text-muted">Orders</p><p class="text-sm font-extrabold text-brand">42</p></div>
                      <div class="rounded-lg bg-brand-50 p-2"><p class="text-[9px] text-muted">Devices</p><p class="text-sm font-extrabold text-brand">2</p></div>
                    </div>
                    <div class="mt-2 space-y-1.5">
                      <div class="flex items-center gap-2 rounded-lg border border-line p-2 text-[11px]"><svg lucideIcon="mail" [size]="13" class="text-brand" /> Welcome email sent</div>
                      <div class="flex items-center gap-2 rounded-lg border border-line p-2 text-[11px]"><svg lucideIcon="shield-check" [size]="13" class="text-brand" /> Logged in on 2 devices</div>
                    </div>
                    @if (cur().preview === 'live') {
                      <p class="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 p-2 text-[11px] font-semibold text-emerald-700"><svg lucideIcon="smartphone" [size]="13" /> Install on phone · Share link</p>
                    }
                  </div>
                }
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3 border-t border-line px-4 py-3">
        <button type="button" class="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white shadow transition hover:bg-[#0b7f75]" (click)="toggle()"
                [attr.aria-label]="ended() ? 'Replay demo' : playing() ? 'Pause demo' : 'Play demo'">
          @if (ended()) { <span class="text-base leading-none">↺</span> } @else if (playing()) { <span class="text-xs leading-none font-black tracking-tighter">▮▮</span> } @else { <span class="ml-0.5 text-sm leading-none">▶</span> }
        </button>
        <div class="min-w-0 flex-1">
          <p class="line-clamp-2 text-sm font-semibold sm:truncate"><span class="text-brand">{{ scene() + 1 }}/{{ scenes.length }} · {{ cur().title }}</span> — <span class="text-muted">{{ cur().caption }}</span></p>
          <div class="mt-1.5 flex gap-1" aria-hidden="true">
            @for (s of scenes; track s.title; let i = $index) {
              <div class="h-1 flex-1 overflow-hidden rounded-full bg-line">
                <div class="h-full rounded-full bg-brand transition-[width] duration-300" [style.width.%]="i < scene() ? 100 : i === scene() ? progress() : 0"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .caret { display: inline-block; width: 7px; height: 13px; margin-left: 3px; vertical-align: -2px; background: #2dd4bf; animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
  `,
})
export class DemoPlayer {
  protected readonly scenes = SCENES;
  protected readonly scene = signal(0);
  /** Lines fully shown in the current scene; the next one is being typed when it's a command. */
  private readonly count = signal(SCENES[0].lines.length);
  private readonly typed = signal(0);
  protected readonly playing = signal(false);
  protected readonly ended = signal(false);

  protected readonly cur = computed(() => SCENES[this.scene()]);
  protected readonly done = computed(() => this.count() >= this.cur().lines.length);
  protected readonly progress = computed(() => (this.count() / this.cur().lines.length) * 100);
  protected readonly shown = computed(() => {
    const lines = this.cur().lines.slice(0, this.count());
    const next = this.cur().lines[this.count()];
    if (next?.k === 'cmd' && this.playing()) lines.push({ k: 'cmd', t: next.t.slice(0, this.typed()) });
    return lines;
  });
  protected readonly connectCards = computed(() => [
    { name: 'Supabase', icon: 'database', ok: this.count() >= 3 },
    { name: 'Netlify', icon: 'cloud', ok: this.count() >= 5 },
  ]);
  protected readonly view = computed(() => {
    const p = this.cur().preview;
    if (p === 'local' || p === 'live') return this.count() >= (p === 'local' ? 3 : 4) ? 'app' : 'loading';
    if (p === 'stopped') return this.count() >= 2 ? 'stopped' : 'app';
    return p;
  });

  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement;
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      if (!this.browser || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          this.jump(0);
        }
      }, { threshold: 0.35 });
      io.observe(host);
    });
  }

  protected jump(i: number) {
    clearTimeout(this.timer);
    this.scene.set(i);
    this.ended.set(false);
    this.count.set(0);
    this.typed.set(0);
    this.play();
  }

  protected toggle() {
    if (this.ended()) return this.jump(0);
    if (this.playing()) {
      clearTimeout(this.timer);
      this.playing.set(false);
    } else this.play();
  }

  private play() {
    this.playing.set(true);
    this.tick();
  }

  private tick() {
    const lines = this.cur().lines;
    const next = lines[this.count()];
    if (!next) {
      // Scene finished: hold, then move on (or stop at the end).
      this.timer = setTimeout(() => {
        if (this.scene() === SCENES.length - 1) {
          this.playing.set(false);
          this.ended.set(true);
          return;
        }
        this.scene.update((s) => s + 1);
        this.count.set(0);
        this.typed.set(0);
        this.tick();
      }, 2200);
      return;
    }
    if (next.k === 'cmd' && this.typed() < next.t.length) {
      this.typed.update((t) => t + 1);
      this.timer = setTimeout(() => this.tick(), 38);
      return;
    }
    this.count.update((c) => c + 1);
    this.typed.set(0);
    this.timer = setTimeout(() => this.tick(), next.k === 'cmd' ? 450 : next.k === 'dim' ? 700 : 380);
  }
}
