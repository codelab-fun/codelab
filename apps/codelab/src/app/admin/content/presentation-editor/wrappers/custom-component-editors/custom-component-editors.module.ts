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
import { CodelabCodeDemoConsoleComponent } from './codelab-code-demo-console/codelab-code-demo-console.component';
import { CodelabImageEditorComponent } from './codelab-image-editor/codelab-image-editor.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatSelectModule } from '@angular/material/select';
import { CodelabExerciseEditorComponent } from './codelab-exercise-preview-editor/codelab-exercise-editor.component';
import { CodelabComponentsModule } from '../../../../../components/codelab-components.module';

@NgModule({
  declarations: [
    CodeDemoEditorEditorComponent,
    CodelabTitleSlideEditorComponent,
    CodelabCodeDemoFilePathEditorComponent,
    CodelabPresetComponent,
    CodelabCodeDemoConsoleComponent,
    CodelabImageEditorComponent,
    CodelabExerciseEditorComponent
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
    AngularFireStorageModule
  ]
})
export class CustomComponentEditorsModule {}
