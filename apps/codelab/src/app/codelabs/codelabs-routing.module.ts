import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'angular',
    loadChildren: './angular/angular.module#AngularModule'
  },
  {
    path: 'extra',
    loadChildren: './extra/extra.module#ExtraModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: 'ROUTES',
      useValue: routes
    }
  ],
  exports: [RouterModule]
})
export class CodelabsRoutingModule {
}
