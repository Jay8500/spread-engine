import { Component, input, signal } from '@angular/core';
import { Icon } from './icon';

/** Dark code card with a file name and a Copy button. */
@Component({
  selector: 'se-code',
  imports: [Icon],
  host: { class: 'block' },
  template: `
    <div class="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] text-left shadow-xl">
      <div class="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2">
        <span class="flex items-center gap-2 truncate font-mono text-xs text-slate-400">
          <span class="flex gap-1" aria-hidden="true"><i class="size-2.5 rounded-full bg-rose-400/80"></i><i class="size-2.5 rounded-full bg-amber-300/80"></i><i class="size-2.5 rounded-full bg-emerald-400/80"></i></span>
          {{ file() }}
        </span>
        <button type="button" class="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white" (click)="copy()"
                [attr.aria-label]="'Copy ' + file()">
          <svg [lucideIcon]="copied() ? 'check' : 'copy'" [size]="14" /> {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <pre class="overflow-x-auto p-4 text-[12.5px] leading-relaxed text-slate-200"><code>{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlock {
  readonly file = input.required<string>();
  readonly code = input.required<string>();
  protected readonly copied = signal(false);

  async copy() {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard blocked — the text can still be selected */
    }
  }
}
