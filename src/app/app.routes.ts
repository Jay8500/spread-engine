import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  // Not linked anywhere: the player that public/demo/how-it-works.mp4 is recorded from.
  { path: 'record', title: 'Demo recorder', loadComponent: () => import('./shared/demo-player').then((m) => m.DemoPlayer) },
  { path: '**', redirectTo: '' },
];
