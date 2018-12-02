import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAngularRunnerComponent } from './simple-angular-runner/simple-angular-runner.component';

import { SimpleAngularPlaygroundComponent } from './simple-angular-runner/simple-angular-playground.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { SimpleEditorModule } from './editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../../libs/browser/src/lib/browser.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule,
    MatSelectModule,
    MatButtonModule,
    SimpleEditorModule,
    FormsModule,
  ],
  declarations: [
    SimpleAngularRunnerComponent,
    SimpleAngularPlaygroundComponent,
  ],
  exports: [
    SimpleAngularRunnerComponent,
    SimpleAngularPlaygroundComponent,
  ],
})
export class CodeDemosModule {
}
