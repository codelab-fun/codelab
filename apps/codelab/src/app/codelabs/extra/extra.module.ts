import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';


@NgModule({
  imports: [
    ExtraRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ExtraModule {
}
