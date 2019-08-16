import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    FeedbackModule,
    UsersModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule {

}


