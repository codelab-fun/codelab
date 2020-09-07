import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './shared/services/guards/admin-guard';
import { LoginGuard } from './shared/services/guards/login-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./codelabs/codelabs.module').then(m => m.CodelabsModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'sync',
    loadChildren: () =>
      import('./sync/sync.module').then(m => m.SyncAdminModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
