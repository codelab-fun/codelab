import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayConfigComponent } from './overlay-config/overlay-config.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OverlayComponent
      },
      {
        path: 'config',
        component: OverlayConfigComponent
      }
    ]),
    CommonModule
  ]
})
export class StreamingModule {}
