import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/presentation-editor/content.module';
import { PreviewModule } from './content/presentation-editor/preview/preview.module';
import { PresentationListModule } from './content/presentation-list/presentation-list.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ContentModule,
    FeedbackModule,
    PreviewModule,
    PresentationListModule,
    UsersModule,
    MatCardModule,
    MatTabsModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {
}
