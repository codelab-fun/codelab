import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationListComponent } from './presentation-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PreviewModule } from '../presentation-editor/preview/preview.module';

@NgModule({
  declarations: [PresentationListComponent],
  exports: [PresentationListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    PreviewModule,
  ],
})
export class PresentationListModule {}
