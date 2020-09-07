import { NgModule } from '@angular/core';
import { TypeScriptComponent } from './typescript/typescript.component';
import { TypeScriptRoutingModule } from './typescript-routing.module';
import { TypeScriptSvgComponent } from './typescript/typescript-svg/typescript-svg.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [TypeScriptComponent, TypeScriptSvgComponent],
  imports: [SharedModule, TypeScriptRoutingModule]
})
export class TypeScriptModule {}
