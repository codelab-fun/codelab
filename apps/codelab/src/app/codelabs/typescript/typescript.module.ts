import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript/typescript.component';

import { TypescriptRoutingModule } from './typescript-routing.module';

import { TypescriptSvgComponent } from './typescript/typescript-svg/typescript-svg.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TypescriptComponent,
    TypescriptSvgComponent
  ],
  imports: [
    SharedModule,
    TypescriptRoutingModule
  ],

})
export class TypescriptModule {
}
