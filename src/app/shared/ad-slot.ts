import { isPlatformBrowser } from '@angular/common';
import { Component, DOCUMENT, PLATFORM_ID, afterNextRender, inject, input, isDevMode } from '@angular/core';
import { SITE } from './site.config';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * One quiet AdSense unit between sections, with reserved height (no layout shift), never inside
 * the steps, code or forms. Without a slot ID nothing renders (dev builds show a dashed placeholder).
 * The AdSense script loads once, only when a slot is filled, after the page is idle.
 */
@Component({
  selector: 'se-ad-slot',
  template: `
    @if (slotId) {
      <aside class="mx-auto max-w-4xl px-4 py-6 text-center" [style.min-height.px]="minHeight()" aria-label="Advertisement">
        <span class="mb-1 block text-[10px] tracking-wider text-muted/70 uppercase">Advertisement</span>
        <ins class="adsbygoogle block" [attr.data-ad-client]="client" [attr.data-ad-slot]="slotId" data-ad-format="auto" data-full-width-responsive="true"></ins>
      </aside>
    } @else if (dev) {
      <div class="mx-auto my-6 grid max-w-4xl place-items-center rounded-xl border-2 border-dashed border-line text-xs text-muted" [style.min-height.px]="minHeight()">
        Ad slot: {{ slot() }}
      </div>
    }
  `,
})
export class AdSlot {
  readonly slot = input.required<string>();
  readonly minHeight = input(120);
  protected readonly client = SITE.adsenseClient;
  protected readonly dev = isDevMode();
  private static loaded = false;

  protected get slotId() {
    return this.client ? (SITE.adSlots[this.slot()] ?? '') : '';
  }

  constructor() {
    const browser = isPlatformBrowser(inject(PLATFORM_ID));
    const doc = inject(DOCUMENT);
    afterNextRender(() => {
      if (!browser || !this.slotId) return;
      const push = () => {
        if (!AdSlot.loaded) {
          AdSlot.loaded = true;
          const s = doc.createElement('script');
          s.async = true;
          s.crossOrigin = 'anonymous';
          s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.client}`;
          doc.head.appendChild(s);
        }
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          /* ad blockers — ignore */
        }
      };
      'requestIdleCallback' in window ? requestIdleCallback(push, { timeout: 4000 }) : setTimeout(push, 2500);
    });
  }
}
