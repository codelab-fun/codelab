import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContentComponent } from './content/content.component';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './content/preview/preview.component';

const routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'feedback', component: FeedbackComponent }
    ]
  },
  {
    path: 'content/:milestone/:id/preview',
    component: PreviewComponent
  },
  {
    path: 'content/:milestone/:id',
    component: ContentComponent,
    children: [{ path: '', ContentComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
