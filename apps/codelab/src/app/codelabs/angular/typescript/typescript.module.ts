import { NgModule } from '@angular/core';
import { TypeScriptComponent } from './typescript/typescript.component';
import { TypeScriptRoutingModule } from './typescript-routing.module';
import { TypeScriptSvgComponent } from './typescript/typescript-svg/typescript-svg.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConsoleLogComponent } from './console-log/console-log.component';
import { RenderInViewportComponent } from './render-in-viewport/render-in-viewport.component';

@NgModule({
  declarations: [TypeScriptComponent, TypeScriptSvgComponent, ConsoleLogComponent, RenderInViewportComponent],
  imports: [SharedModule, TypeScriptRoutingModule]
})
export class TypeScriptModule {}
