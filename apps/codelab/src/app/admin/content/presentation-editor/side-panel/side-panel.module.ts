import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PreviewModule } from '../preview/preview.module';
import { MultiselectModule } from '../../../../multiselect/multiselect.module';
import { MatListModule } from "@angular/material/list";
import { SmallSlidePreviewComponent } from "../preview/slide-preview/small-slide-preview/small-slide-preview/small-slide-preview.component";

@NgModule({
  declarations: [SidePanelComponent],
  exports: [SidePanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    PreviewModule,
    MultiselectModule,
    MatListModule,
    SmallSlidePreviewComponent
  ],
})
export class SidePanelModule {}
