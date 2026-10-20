import { Component, input } from '@angular/core';

/** Spread Engine mark: the three Spread dots joined by a power line, with a heart for India. */
@Component({
  selector: 'se-mark',
  host: { class: 'inline-block shrink-0' },
  template: `
    <svg viewBox="0 0 64 64" [attr.width]="size()" [attr.height]="size()" aria-hidden="true">
      <rect width="64" height="64" rx="16" [attr.fill]="light() ? '#fff' : '#0D9488'" />
      <path d="M17 47 L32 32 L46 18" [attr.stroke]="light() ? '#99D8D0' : '#5EEAD4'" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 5" fill="none" class="flow" />
      <circle cx="17" cy="47" r="6" [attr.fill]="light() ? '#99D8D0' : '#CCFBF1'" />
      <circle cx="32" cy="32" r="7.5" [attr.fill]="light() ? '#45B8AA' : '#5EEAD4'" />
      <circle cx="46" cy="18" r="9.5" [attr.fill]="light() ? '#0D9488' : '#fff'" />
      <path class="beat" d="M46 22.4c-4-2.9-4.4-6.6-2.1-7.3 1-.3 1.7.3 2.1 1 .4-.7 1.1-1.3 2.1-1 2.3.7 1.9 4.4-2.1 7.3z" [attr.fill]="light() ? '#fff' : '#F43F5E'" />
    </svg>
  `,
  styles: `
    .beat { transform-origin: 46px 18px; animation: beat 2.4s ease-in-out infinite; }
    .flow { animation: flow 1.6s linear infinite; }
    @keyframes beat { 0%, 70%, 100% { transform: scale(1); } 80% { transform: scale(1.2); } 90% { transform: scale(0.95); } }
    @keyframes flow { to { stroke-dashoffset: -16; } }
  `,
})
export class EngineMark {
  readonly size = input(32);
  readonly light = input(false);
}

/** Full logo: mark + "spread engine" wordmark (+ optional "by Spread Apps™"). */
@Component({
  selector: 'se-logo',
  imports: [EngineMark],
  host: { class: 'inline-flex items-center gap-2' },
  template: `
    <se-mark [size]="size()" [light]="light()" />
    <span class="leading-none">
      <span class="block font-[family-name:var(--font-display)] font-extrabold tracking-tight" [style.font-size.px]="size() * 0.6" [class.text-white]="light()">
        spread<span [class]="light() ? 'text-brand-100' : 'text-brand'">engine</span>
      </span>
      @if (byline()) { <span class="mt-0.5 block text-[10px] font-semibold tracking-wide" [class]="light() ? 'text-brand-100' : 'text-muted'">by Spread Apps™</span> }
    </span>
  `,
})
export class EngineLogo {
  readonly size = input(32);
  readonly light = input(false);
  readonly byline = input(true);
}
