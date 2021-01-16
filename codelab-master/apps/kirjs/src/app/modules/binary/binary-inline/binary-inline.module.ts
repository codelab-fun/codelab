import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinaryInlineComponent } from './binary-inline.component';
import { BinaryDisplayComponent } from './binary-display/binary-display.component';

@NgModule({
  declarations: [BinaryInlineComponent, BinaryDisplayComponent],
  exports: [BinaryInlineComponent],
  imports: [CommonModule]
})
export class BinaryInlineModule {}
