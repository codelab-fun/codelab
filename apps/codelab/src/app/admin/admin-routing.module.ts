import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent, UsersModule } from './users';
import { FeedbackComponent, FeedbackModule } from './feedback';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'feedback', component: FeedbackComponent},
    ],
  },
  {
    path: 'content',
    loadChildren: () => import('./content').then(m => m.ContentModule)
  },
];

const RoutesModules = [
  UsersModule,
  FeedbackModule
];

@NgModule({
  imports: [RouterModule.forChild(routes), RoutesModules],
  exports: [RouterModule, RoutesModules]
})
export class AdminRoutingModule {
}
