import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidePanelComponent } from './side-panel.component';
import { SmallSlidePreviewModule } from '../../presentation-preview/slide-preview/small-slide-preview';
import { MultiselectModule } from '../../../../../multiselect/multiselect.module';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    MultiselectModule,
    MatListModule,
    SmallSlidePreviewModule
  ],
  declarations: [SidePanelComponent],
  exports: [SidePanelComponent],
})
export class SidePanelModule {}
