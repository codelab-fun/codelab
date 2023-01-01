import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { OnlineIndicatorModule } from "../components/online-indicator/online-indicator.module";
import { SyncRegistrationModule } from "../components/registration/sync-registration.module";
import { SyncButtonComponent } from "./sync-button.component";
import { SyncDirectivesModule } from "../directives/sync-directives.module";

@NgModule({
  declarations: [SyncButtonComponent],
  exports: [SyncButtonComponent],
  imports: [
    CommonModule,
    OnlineIndicatorModule,
    MatButtonModule,
    SyncDirectivesModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    SyncRegistrationModule,
  ],
})
export class SyncButtonModule {}
