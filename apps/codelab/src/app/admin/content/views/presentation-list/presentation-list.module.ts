import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { PresentationListComponent } from './presentation-list.component';
import { SmallSlidePreviewModule } from '../presentation-preview/slide-preview/small-slide-preview';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatMenuModule,
    SmallSlidePreviewModule,
  ],
  declarations: [PresentationListComponent],
})
export class PresentationListModule {
}
