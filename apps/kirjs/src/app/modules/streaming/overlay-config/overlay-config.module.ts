import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayConfigComponent } from './overlay-config.component';
import { SessionConfigComponent } from './session-config/session-config.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OverlayConfigComponent, SessionConfigComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class OverlayConfigModule {}
