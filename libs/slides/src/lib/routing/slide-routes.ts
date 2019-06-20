export class SlidesRoutes {
  static get(Component: any) {
    return [
      { path: '', redirectTo: '0', pathMatch: 'full' },
      { path: ':id', component: Component },
      { path: '**', component: Component }
    ];
  }
}
