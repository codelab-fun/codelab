import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { CommonModule } from '@angular/common';
import { PresentationListComponent } from './content/presentation-list/presentation-list.component';
import { PreviewComponent } from './content/presentation-editor/preview/preview.component';
import { ContentComponent } from './content/presentation-editor/content.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'feedback', component: FeedbackComponent }
    ]
  },
  {
    path: 'content',
    children: [
      {
        path: '',
        component: PresentationListComponent
      },
      {
        path: ':presentation/:slide/preview',
        component: PreviewComponent
      },
      {
        path: ':presentation/:slide',
        component: ContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
