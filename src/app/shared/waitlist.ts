import { Component, signal } from '@angular/core';

type State = 'idle' | 'sending' | 'done' | 'error';

/** Waitlist form (stored in Netlify Blobs by netlify/functions/waitlist.mts, owner email via Resend). */
@Component({
  selector: 'se-waitlist',
  template: `
    @if (state() === 'done') {
      <div class="rounded-3xl bg-white p-6 text-ink shadow-xl" role="status">
        <p class="text-3xl">🎉</p>
        <h3 class="mt-2 text-xl font-extrabold">You're on the list, {{ first() }}!</h3>
        <p class="mt-1 text-sm text-muted">We'll email {{ email().trim() }} when Spread Engine opens. Thank you for backing a Made in India dev tool ❤️</p>
      </div>
    } @else {
      <form class="space-y-3 rounded-3xl bg-white p-5 text-ink shadow-xl sm:p-6" (submit)="send($event)" novalidate>
        <div class="flex flex-wrap gap-1.5" role="group" aria-label="I am a">
          @for (r of roles; track r) {
            <button type="button" class="chip transition" [class.!border-brand]="role() === r" [class.!bg-brand]="role() === r" [class.!text-white]="role() === r"
                    [attr.aria-pressed]="role() === r" (click)="role.set(r)">{{ r }}</button>
          }
        </div>
        <div>
          <label class="sr-only" for="w-name">Your name</label>
          <input id="w-name" class="input" placeholder="Your name" autocomplete="name" maxlength="80" [value]="name()" (input)="name.set(val($event))"
                 [class.!border-rose-400]="touched() && nameErr()" [attr.aria-invalid]="touched() && nameErr()" />
          @if (touched() && nameErr()) { <p class="mt-1 text-xs text-rose-600" role="alert">Please enter your name</p> }
        </div>
        <div>
          <label class="sr-only" for="w-email">Email</label>
          <input id="w-email" class="input" type="email" inputmode="email" placeholder="Email" autocomplete="email" maxlength="120" [value]="email()" (input)="email.set(val($event))"
                 [class.!border-rose-400]="touched() && emailErr()" [attr.aria-invalid]="touched() && emailErr()" />
          @if (touched() && emailErr()) { <p class="mt-1 text-xs text-rose-600" role="alert">Please enter a valid email</p> }
        </div>
        <div>
          <label class="sr-only" for="w-need">What will you build? (optional)</label>
          <input id="w-need" class="input" placeholder="What will you build? (optional)" maxlength="120" [value]="need()" (input)="need.set(val($event))" />
        </div>
        <label class="flex items-start gap-2 text-xs text-muted">
          <input type="checkbox" class="mt-0.5 size-4 accent-[#0d9488]" [checked]="agree()" (change)="agree.set(!agree())" />
          <span>I agree that Spread Apps may email me about Spread Engine's launch. I can unsubscribe any time.</span>
        </label>
        @if (touched() && !agree()) { <p class="-mt-1 text-xs text-rose-600" role="alert">Please tick the box to join</p> }
        <!-- Hidden from people; bots fill it -->
        <input class="absolute -left-[9999px] size-px opacity-0" tabindex="-1" autocomplete="off" aria-hidden="true" [value]="honey()" (input)="honey.set(val($event))" />
        @if (state() === 'error') { <p class="text-xs text-rose-600" role="alert">Couldn't join right now. Please try again in a minute.</p> }
        <button type="submit" class="btn btn-primary w-full" [disabled]="state() === 'sending'">{{ state() === 'sending' ? 'Joining…' : 'Join the waitlist' }}</button>
      </form>
    }
  `,
})
export class Waitlist {
  protected readonly roles = ['Freelancer', 'Agency', 'Student', 'Startup', 'Developer'];
  protected readonly role = signal('Freelancer');
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly need = signal('');
  protected readonly honey = signal('');
  protected readonly agree = signal(false);
  protected readonly touched = signal(false);
  protected readonly state = signal<State>('idle');

  protected val(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
  protected first() {
    return this.name().trim().split(' ')[0];
  }
  protected nameErr() {
    return this.name().trim().length < 2;
  }
  protected emailErr() {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email().trim());
  }

  async send(e: Event) {
    e.preventDefault();
    this.touched.set(true);
    if (this.nameErr() || this.emailErr() || !this.agree()) return;
    this.state.set('sending');
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: this.name(), email: this.email(), need: this.need(), role: this.role(), consent: true, website: this.honey() }),
      });
      if (!r.ok) throw new Error(String(r.status));
      this.state.set('done');
    } catch {
      this.state.set('error');
    }
  }
}
