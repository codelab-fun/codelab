import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImporterComponent} from './importer.component';
import {RouterModule} from "@angular/router";
import {TypeScriptComponent} from "../typescript/typescript/typescript.component";


const routes = [
  {
    path: '',
    component: ImporterComponent,
  }
];

@Component({
  selector: 'codelab-progress-bar, slide-arrows, slide-deck',
  template: ''
})
export class TrashComponent {
}
@Component({
  selector: 'slide-deck',
  template: '<ng-content></ng-content>'
})
export class FakeDeck {
}


@NgModule({
  declarations: [
    ImporterComponent,
    TypeScriptComponent,
    TrashComponent,
    FakeDeck,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ImporterModule {
}
