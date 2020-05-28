import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@ng360/slides';
import { TypeScriptComponent } from './typescript/typescript.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ignored',
  template: '<router-outlet></router-outlet>'
})
export class EmptyTypeScriptComponent {}

const routes = [
  {
    path: '',
    component: EmptyTypeScriptComponent,
    children: [...SlidesRoutes.get(TypeScriptComponent)]
  }
];

@NgModule({
  declarations: [EmptyTypeScriptComponent],
  entryComponents: [EmptyTypeScriptComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeScriptRoutingModule {}
