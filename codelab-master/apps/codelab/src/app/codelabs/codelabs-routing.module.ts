import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../components/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'angular',
    loadChildren: () =>
      import('./angular/angular.module').then(m => m.AngularModule)
  },
  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module').then(m => m.ExtraModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelabsRoutingModule {}
