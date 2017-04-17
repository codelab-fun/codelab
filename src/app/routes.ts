//routes generator
export function getSlidesRoutes(SlidesComponent, route?:string){
  if(route){
    return [
      {path: `${route}/:id`, component: SlidesComponent},
      {path: `${route}/**`, component: SlidesComponent}
    ];
  }
  return [
    {path: ':id', component: SlidesComponent},
    {path: '**', component: SlidesComponent}
  ];
}


export class SlidesRouter {
  static getRoutes(Component: any) {
    return [
      {path: `:id`, component: Component},
      {path: `**`, component: Component}
    ];
  }
}
