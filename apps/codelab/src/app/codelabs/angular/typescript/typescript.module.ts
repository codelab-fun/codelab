import { ConsoleLogComponent } from './console-log/console-log.component';
import { RenderInViewportModule } from './render-in-viewport/render-in-viewport.module';
import { NgModule } from '@angular/core';
import { TypeScriptComponent } from './typescript/typescript.component';
import { TypeScriptRoutingModule } from './typescript-routing.module';
import { TypeScriptSvgComponent } from './typescript/typescript-svg/typescript-svg.component';
import { SharedModule } from '../../../shared/shared.module';
import { IntersectionObserverDirective } from './intersection-observer.directive';



@NgModule({
  declarations: [TypeScriptComponent, TypeScriptSvgComponent, ConsoleLogComponent, IntersectionObserverDirective],
  imports: [SharedModule, TypeScriptRoutingModule, RenderInViewportModule]
})
export class TypeScriptModule {}
