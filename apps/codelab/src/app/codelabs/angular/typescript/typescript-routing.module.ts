import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { TypeScriptComponent } from './typescript/typescript.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FeedbackModule } from '@codelab/feedback';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { FormsModule } from '@angular/forms';

// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'ignored',
//   template: '<router-outlet></router-outlet>',
// })
// export class EmptyTypeScriptComponent {}

const routes = RouterModule.forChild([
  ...SlidesRoutes.get(TypeScriptComponent),
]);

@NgModule({
  declarations: [TypeScriptComponent],
  exports: [TypeScriptComponent],
  imports: [
    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule,
  ],
})
export class TypeScriptModule {}

@NgModule({
  declarations: [],
  imports: [routes, TypeScriptModule],
  exports: [RouterModule],
})
export class TypeScriptRoutingModule {}
