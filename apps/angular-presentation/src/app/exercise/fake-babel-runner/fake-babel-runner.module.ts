import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseModule } from '../exercise.module';
import { FakeBabelRunnerComponent } from './fake-babel-runner.component';
import { MatCardModule, MatDividerModule } from '@angular/material';
import { SimpleFakeBabelRunnerComponent } from './simple-fake-babel-runner.component';
import { AstPreviewRunnerModule } from '../../../../../kirjs/src/app/modules/ast/ast-preview-runner/ast-preview-runner.module';
import { SizePickerModule } from '../../../../../kirjs/src/app/modules/ast/size-picker/size-picker.module';

@NgModule({
  imports: [CommonModule, ExerciseModule, MatCardModule, MatDividerModule, AstPreviewRunnerModule, SizePickerModule,],
  declarations: [FakeBabelRunnerComponent, SimpleFakeBabelRunnerComponent],
  exports: [FakeBabelRunnerComponent, SimpleFakeBabelRunnerComponent],
})
export class FakeBabelModule {
}
