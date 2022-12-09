import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { CommonModule } from '@angular/common';
import { NAVIGATION_BASE_URL } from "./content/presentation-editor/services/navigation.service";


const routes = [
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
    loadChildren: () => import('./content/presentation-editor/content.module').then(m => m.ContentModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [

    {provide: NAVIGATION_BASE_URL, useValue: 'admin/content'},
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
