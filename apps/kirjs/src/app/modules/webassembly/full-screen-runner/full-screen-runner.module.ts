import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenRunnerComponent } from './full-screen-runner.component';
import { WebassemblyRunnerModule } from '../webassembly-playground/webassembly-runner/webassembly-runner.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CellularAutomationModule } from '../../cellular-automation/cellular-automation.module';

@NgModule({
  declarations: [FullScreenRunnerComponent],
  exports: [FullScreenRunnerComponent],
  imports: [
    CommonModule,
    WebassemblyRunnerModule,
    MatInputModule,
    FormsModule,
    CellularAutomationModule
  ]
})
export class FullScreenRunnerModule {}
