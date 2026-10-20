import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EngineLogo } from '../shared/logo';

/** Privacy notice for engine.spreadapps.in, written for India's DPDP Act 2023. */
@Component({
  selector: 'se-privacy',
  imports: [RouterLink, EngineLogo],
  template: `
    <header class="border-b border-line">
      <nav class="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <a routerLink="/" aria-label="Spread Engine home"><se-logo [size]="28" /></a>
        <a routerLink="/" class="text-sm font-semibold text-muted hover:text-brand">← Back</a>
      </nav>
    </header>
    <main class="mx-auto max-w-3xl px-4 py-12">
      <p class="eyebrow">Privacy</p>
      <h1 class="mt-2 text-3xl font-extrabold sm:text-4xl">Privacy notice</h1>
      <p class="mt-2 text-sm text-muted">Last updated: {{ updated }} · Written for India’s Digital Personal Data Protection Act, 2023 (DPDP Act).</p>

      <div class="prose-se mt-8 space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2>Who we are</h2>
          <p>Spread Engine is a Spread Apps™ product run by <b>Lakkoju Jaya Krishna</b> (Spread Apps, Udyam-registered micro enterprise, Hyderabad, Telangana, India). For this site we are the <b>Data Fiduciary</b>.</p>
        </section>
        <section>
          <h2>What we collect, and why</h2>
          <ul>
            <li><b>Waitlist form:</b> your name, email, role (Freelancer, Student…) and an optional note about what you want to build. <b>Purpose:</b> to email you when Spread Engine launches and to decide which stack to build next. Nothing else.</li>
            <li><b>Requirements checklist:</b> your ticks are saved only in your own browser (localStorage). They never reach us.</li>
            <li>We do <b>not</b> sell your data, use it for profiling, or share it for others’ marketing.</li>
          </ul>
        </section>
        <section>
          <h2>Consent</h2>
          <p>We use your data only after you tick the consent box on the waitlist form. You can <b>withdraw consent</b> at any time by emailing us; we then delete your entry. Withdrawing is as easy as giving consent.</p>
        </section>
        <section>
          <h2>Where it is stored, and who helps us</h2>
          <ul>
            <li><b>Netlify</b> (hosting and storage of the waitlist list).</li>
            <li><b>Resend</b> (sends us a notification email when someone joins, and the launch email).</li>
          </ul>
          <p>These services act as our Data Processors and may store data outside India, as the DPDP Act allows unless a country is restricted by the Government of India.</p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p>Until Spread Engine launches plus 12 months, or until you ask us to delete it, whichever comes first.</p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p>Under the DPDP Act you can ask us to: <b>see</b> what we hold about you, <b>correct</b> or <b>update</b> it, <b>delete</b> it, and <b>nominate</b> someone to act for you. You can also raise a <b>grievance</b>. We reply within 7 days.</p>
        </section>
        <section>
          <h2>Ads (later)</h2>
          <p>We may show a few Google AdSense ads in marked spaces. Before that, Google’s consent message will ask you, and this notice will be updated. There are no ads or ad cookies today.</p>
        </section>
        <section>
          <h2>Children</h2>
          <p>The waitlist is meant for people aged 18 and above. We do not knowingly collect data from children.</p>
        </section>
        <section>
          <h2>Grievance officer / contact</h2>
          <p><b>Lakkoju Jaya Krishna</b>, Spread Apps, Hyderabad, Telangana, India<br />Email: <a href="mailto:jay.lakkoju@gmail.com?subject=Spread%20Engine%20privacy">jay.lakkoju&#64;gmail.com</a> (subject “Spread Engine privacy”)</p>
          <p>If you are not satisfied with our reply, you may complain to the Data Protection Board of India.</p>
        </section>
      </div>
    </main>
  `,
  styles: `
    .prose-se h2 { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.4rem; }
    .prose-se ul { list-style: disc; padding-left: 1.25rem; display: grid; gap: 0.35rem; }
    .prose-se p + p { margin-top: 0.5rem; }
    .prose-se a { color: var(--color-brand); font-weight: 600; text-decoration: underline; }
  `,
})
export class Privacy {
  protected readonly updated = '21 October 2026';
}
