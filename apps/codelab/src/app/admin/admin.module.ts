import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { PreviewModule } from './content/preview/preview.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ContentModule,
    FeedbackModule,
    PreviewModule,
    UsersModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
