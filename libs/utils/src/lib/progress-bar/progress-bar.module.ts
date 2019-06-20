import { NgModule } from '@angular/core';
import { CircleProgressBarComponent } from './progress-bar.component';
import { CommonModule } from '@angular/common';
import { SizePickerModule } from '../codelabs/extra/ast/size-picker/size-picker.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SizePickerModule,
    FlexLayoutModule
  ],
  declarations: [CircleProgressBarComponent],
  exports: [CircleProgressBarComponent]
})
export class CircleProgressBarModule {
}
