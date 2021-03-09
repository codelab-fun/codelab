import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SlidePreviewModule } from '../preview/slide-preview/slide-preview.module';

@NgModule({
  declarations: [SidePanelComponent],
  exports: [SidePanelComponent],
  imports: [CommonModule, RouterModule, DragDropModule, SlidePreviewModule]
})
export class SidePanelModule {}
