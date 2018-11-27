import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAngularRunnerComponent } from '@angular-presentation/code-demos/src/lib/simple-angular-runner/simple-angular-runner.component';
import { BrowserWindowModule } from '@angular-presentation/browser';

@NgModule({
  imports: [CommonModule, BrowserWindowModule],
  exports: [SimpleAngularRunnerComponent],
  declarations: [SimpleAngularRunnerComponent],
})
export class CodeDemosModule {
}
