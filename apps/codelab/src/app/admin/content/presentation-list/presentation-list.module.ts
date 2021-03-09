import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationListComponent } from './presentation-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SlidePreviewModule } from '../presentation-editor/preview/slide-preview/slide-preview.module';

@NgModule({
  declarations: [PresentationListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SlidePreviewModule
  ]
})
export class PresentationListModule {}
