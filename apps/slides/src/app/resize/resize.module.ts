import { NgModule } from '@angular/core';
import { ResizeComponent } from './resize.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeComponent],
  exports: [ResizeComponent]
})
export class ResizeModule {
}
