import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSmartRunnerComponent } from './new-smart-runner.component';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src';

@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule
  ],
  declarations: [NewSmartRunnerComponent],
  exports: [NewSmartRunnerComponent]
})
export class NewSmartRunnerModule {
}
