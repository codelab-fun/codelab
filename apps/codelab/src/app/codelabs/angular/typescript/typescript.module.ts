import { NgModule } from '@angular/core';
import { TypeScriptComponent } from './typescript/typescript.component';
import { TypeScriptRoutingModule } from './typescript-routing.module';
import { TypeScriptSvgComponent } from './typescript/typescript-svg/typescript-svg.component';
import { SharedModule } from '../../../shared/shared.module';

// TypeScriptComponent
@NgModule({
  declarations: [TypeScriptSvgComponent],
  imports: [SharedModule, TypeScriptRoutingModule],
})
export class TypeScriptModule {}
