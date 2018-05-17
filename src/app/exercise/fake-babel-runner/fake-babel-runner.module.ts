import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseModule } from '../exercise.module';
import { FakeBabelRunnerComponent } from './fake-babel-runner.component';
import { MatCardModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, ExerciseModule, MatCardModule, MatDividerModule],
  declarations: [FakeBabelRunnerComponent],
  exports: [FakeBabelRunnerComponent],
})
export class FakeBabelModule {
}
