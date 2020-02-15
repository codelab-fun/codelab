import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../components/index';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'angular',
    loadChildren: () => import('./angular').then(m => m.AngularModule)
  },
  {
    path: 'extra',
    loadChildren: () => import('./extra').then(m => m.ExtraModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelabsRoutingModule {}
