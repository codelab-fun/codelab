import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LiveMockComponent } from './live-mock.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LiveMockComponent],
  exports: [LiveMockComponent]
})
export class LiveMockModule {
}
