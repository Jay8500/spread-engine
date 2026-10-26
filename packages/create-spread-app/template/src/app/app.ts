import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly name = '__NAME__';
  protected readonly steps = [
    { title: 'Edit this page', text: 'Open src/app/app.html — the browser updates as soon as you save.', code: 'src/app/app.html' },
    { title: 'Add a page', text: 'Create a component and add it to src/app/app.routes.ts.', code: 'npx ng generate component pages/about' },
    { title: 'Build', text: 'Every route is prerendered to plain HTML — fast and good for Google.', code: 'npm run build' },
    { title: 'Go live', text: 'Push to GitHub, then add the repo on netlify.com. netlify.toml has the settings.', code: 'git push' },
  ];
}
