import { NgModule } from '@angular/core';
import { NewProgressBarComponent } from './new-progress-bar.component';
import { CommonModule } from '@angular/common';
import { SizePickerModule } from '../size-picker/size-picker.module';

@NgModule({
  imports: [CommonModule, SizePickerModule],
  declarations: [NewProgressBarComponent],
  exports: [NewProgressBarComponent]
})
export class NewProgressBarModule {}
