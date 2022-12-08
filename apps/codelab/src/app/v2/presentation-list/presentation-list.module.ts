import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationListComponent } from './presentation-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PreviewModule } from '../../admin/content/presentation-editor/preview/preview.module';
import { MatListModule } from "@angular/material/list";
import { SmallSlidePreviewComponent } from "../../admin/content/presentation-editor/preview/slide-preview/small-slide-preview/small-slide-preview/small-slide-preview.component";

@NgModule({
  declarations: [PresentationListComponent],
  exports: [PresentationListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    PreviewModule,
    MatListModule,
    SmallSlidePreviewComponent,
  ],
})
export class PresentationListModule {}
