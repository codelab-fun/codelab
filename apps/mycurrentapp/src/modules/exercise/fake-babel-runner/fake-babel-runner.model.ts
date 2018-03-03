import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseModule } from '../exercise.module';
import { FakeBabelRunnerComponent } from './fake-babel-runner.component';

@NgModule({
  imports: [CommonModule, ExerciseModule],
  declarations: [FakeBabelRunnerComponent],
  exports: [FakeBabelRunnerComponent]
})
export class FakeBabelModule {}
