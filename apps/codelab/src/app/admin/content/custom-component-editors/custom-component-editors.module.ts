import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePlaygroundEditorComponent } from './exercise-playground-editor/exercise-playground-editor.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

@NgModule({
  declarations: [ExercisePlaygroundEditorComponent],
  exports: [ExercisePlaygroundEditorComponent],
  imports: [CommonModule, CodelabComponentsModule]
})
export class CustomComponentEditorsModule {}
