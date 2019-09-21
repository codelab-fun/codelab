import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExtraRoutingModule } from './extra-routing.module';
import { FullLayoutModule } from '../../containers/full-layout/full-layout.module';

@NgModule({
  imports: [
    SharedModule,
    ExtraRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    FullLayoutModule
  ]
})
export class ExtraModule {}
