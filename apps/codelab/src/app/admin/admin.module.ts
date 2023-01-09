import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent, UsersModule } from './pages/users';
import { FeedbackComponent, FeedbackModule } from './pages/feedback';
import { AdminLayoutComponent, AdminLayoutModule } from './admin-layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'feedback', component: FeedbackComponent},
    ],
  },
  {
    path: 'content',
    loadChildren: () => import('./pages/content').then(m => m.ContentModule)
  },
];


@NgModule({
  imports: [
    AdminLayoutModule,
    UsersModule,
    FeedbackModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {
}
