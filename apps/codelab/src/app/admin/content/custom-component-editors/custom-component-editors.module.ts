import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePlaygroundEditorComponent } from './exercise-playground-editor/exercise-playground-editor.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { CodeDemoEditorEditorComponent } from './code-demo-editor-editor/code-demo-editor.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ExercisePlaygroundEditorComponent,
    CodeDemoEditorEditorComponent
  ],
  exports: [ExercisePlaygroundEditorComponent, CodeDemoEditorEditorComponent],
  imports: [
    CommonModule,
    CodelabComponentsModule,
    CodeDemoModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class CustomComponentEditorsModule {}
