import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveMockComponent } from './live-mock.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LiveMockComponent],
  exports: [LiveMockComponent]
})
export class LiveMockModule {}
