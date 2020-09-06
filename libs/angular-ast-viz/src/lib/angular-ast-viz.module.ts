import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AstTreeComponent } from './ast-tree/ast-tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AstTreeComponent],
  exports: [AstTreeComponent]
})
export class AngularAstVizModule {}
