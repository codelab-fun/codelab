export class SlidesRoutes {
  static get(Component: any) {
    return [
      {path: `:id`, component: Component},
      {path: `**`, component: Component}
    ];
  }
}
