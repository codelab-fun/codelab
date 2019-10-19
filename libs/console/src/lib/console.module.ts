import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { SharedPipeModule } from '../../../utils/src/lib/pipes/pipes.module';
import { DisplayDynamicComponent } from './display-dynamic.component/display-dynamic-component.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [SharedPipeModule, CommonModule, FormsModule, MatAutocompleteModule],
  declarations: [ConsoleComponent, DisplayDynamicComponent],
  exports: [ConsoleComponent]
})
export class ConsoleModule {}
