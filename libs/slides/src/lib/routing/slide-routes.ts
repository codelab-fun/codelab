import { Routes } from '@angular/router';

export class SlidesRoutes {
  static get(Component: any): Routes {
    return [
      { path: '', redirectTo: '0', pathMatch: 'full' },
      { path: ':id', component: Component },
      { path: '**', component: Component },
    ];
  }
}
