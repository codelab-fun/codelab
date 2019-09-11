import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';

const MATERIAL_MODULES = [MatCardModule, MatTabsModule];

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FeedbackModule,
    UsersModule,
    MATERIAL_MODULES
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
