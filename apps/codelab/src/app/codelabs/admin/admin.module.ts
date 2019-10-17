import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatTabsModule,
    RouterModule
  ]
})
export class AdminModule {}
