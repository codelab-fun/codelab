import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeDemoEditorEditorComponent } from './codelab-code-demo-editor-editor/code-demo-editor.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CodelabTitleSlideEditorComponent } from './codelab-title-slide-editor/codelab-title-slide-editor.component';
import { CodelabCodeDemoFilePathEditorComponent } from './codelab-code-demo-file-path-editor/codelab-code-demo-file-path-editor.component';
import { CodelabPresetComponent } from './codelab-preset/codelab-preset.component';
import { CodelabCodeDemoConsoleEditorComponent } from './codelab-code-demo-console-editor/codelab-code-demo-console-editor.component';
import { CodelabImageEditorComponent } from './codelab-image-editor/codelab-image-editor.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatSelectModule } from '@angular/material/select';
import { CodelabExerciseEditorComponent } from './codelab-exercise-preview-editor/codelab-exercise-editor.component';
import { CodelabComponentsModule } from '../../../../../components/codelab-components.module';
import { MatButtonModule } from '@angular/material/button';
import { InputMatchesTextValidatorDirective } from './codelab-code-demo-console-editor/input-matches-text-validator';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    InputMatchesTextValidatorDirective,
    CodeDemoEditorEditorComponent,
    CodelabTitleSlideEditorComponent,
    CodelabCodeDemoFilePathEditorComponent,
    CodelabPresetComponent,
    CodelabCodeDemoConsoleEditorComponent,
    CodelabImageEditorComponent,
    CodelabExerciseEditorComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    CodelabComponentsModule,
    CodeDemoModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    NgxFileDropModule,
    MatSelectModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class CustomComponentEditorsModule {}
