import {Routes} from "@angular/router";
import {DemoComponent} from "./demo/demo.component";

export const AppRoutes:Routes = [
  {path: ':id', component: DemoComponent},
  {path: '**', component: DemoComponent}
];
