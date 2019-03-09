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
    path: 'angular/30-seconds',
    loadChildren: './angular-thirty-seconds/angular-thirty-seconds.module#AngularThirtySecondsModule'
  },
  {
    path: 'extra',
    loadChildren: './extra/extra.module#ExtraModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CodelabsRoutingModule {}
