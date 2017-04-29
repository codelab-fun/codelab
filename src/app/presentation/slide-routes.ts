//routes generator

export class SlidesRoutes {
  static get(Component: any) {
    return [
      {path: `:id`, component: Component},
      {path: `milestone/:milestone/:id`, component: Component},
      {path: `**`, component: Component}
    ];
  }
}
