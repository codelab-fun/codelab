import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AstTreeComponent } from './ast-tree/ast-tree.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [AstTreeComponent],
  exports: [AstTreeComponent]
})
export class AngularAstVizModule {}
