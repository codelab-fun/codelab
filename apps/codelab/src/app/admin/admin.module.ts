import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ContentModule,
    FeedbackModule,
    UsersModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
