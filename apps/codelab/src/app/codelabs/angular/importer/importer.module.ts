import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImporterComponent } from './importer.component';
import { RouterModule } from '@angular/router';
import { TypeScriptComponent } from '../typescript/typescript/typescript.component';
import { TypeScriptModule } from '../typescript/typescript-routing.module';

const routes = [
  {
    path: '',
    component: ImporterComponent,
  },
];

@Component({
  selector: 'codelab-progress-bar, slide-arrows, slide-deck',
  template: '',
})
export class TrashComponent {}
@Component({
  selector: 'slide-deck',
  template: '<ng-content></ng-content>',
})
export class FakeDeck {}

@NgModule({
  declarations: [ImporterComponent, TrashComponent, FakeDeck],
  imports: [CommonModule, RouterModule.forChild(routes), TypeScriptModule],
})
export class ImporterModule {}
