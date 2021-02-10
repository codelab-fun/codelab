import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PreviewModule } from '../preview/preview.module';
import { MultiSelectionService } from './multi-selection.service';

@NgModule({
  declarations: [SidePanelComponent],
  providers: [MultiSelectionService],
  exports: [SidePanelComponent],
  imports: [CommonModule, RouterModule, DragDropModule, PreviewModule]
})
export class SidePanelModule {}
