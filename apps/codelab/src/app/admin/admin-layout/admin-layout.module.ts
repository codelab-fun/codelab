import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    RouterModule
  ],
  declarations: [AdminLayoutComponent]
})
export class AdminLayoutModule {
}
