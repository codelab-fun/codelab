import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NgModule } from '@angular/core';
import { CanActivateChildGuard } from './services/can-activate-child.guard';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';

const routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [CanActivateChildGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    FeedbackModule,
    UsersModule,
    LoginModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule {}
