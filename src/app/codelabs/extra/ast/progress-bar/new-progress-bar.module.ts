import { NgModule } from '@angular/core';
import { NewProgressBarComponent } from './progress-bar.component';
import { CommonModule } from '@angular/common';
import { SizePickerModule } from '../size-picker/size-picker.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, SizePickerModule, FlexLayoutModule],
  declarations: [NewProgressBarComponent],
  exports: [NewProgressBarComponent],
})
export class NewProgreessBarModule {
}
