import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SyncModule } from '../modules/sync/sync.module';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'angular',
    loadChildren: () => import('./angular/angular.module').then(m => m.AngularModule)
  },
  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module').then(m => m.ExtraModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'sync',
    loadChildren: () => import('../modules/sync/sync.module').then(m => m.SyncAdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SyncModule
  ],
  exports: [RouterModule]
})
export class CodelabsRoutingModule {
}
