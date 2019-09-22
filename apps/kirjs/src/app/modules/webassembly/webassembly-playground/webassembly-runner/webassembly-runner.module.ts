import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebassemblyRunnerComponent } from './webassembly-runner.component';

@NgModule({
  declarations: [WebassemblyRunnerComponent],
  exports: [WebassemblyRunnerComponent],
  imports: [CommonModule]
})
export class WebassemblyRunnerModule {}
