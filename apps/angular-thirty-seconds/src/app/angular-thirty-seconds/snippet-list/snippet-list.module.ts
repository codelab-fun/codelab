import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetListComponent } from './snippet-list.component';
import { SnippetDemoComponent } from '../snippet-demo/snippet-demo.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SnippetListComponent, SnippetDemoComponent],
  exports: [SnippetListComponent],
  entryComponents: [SnippetListComponent],
  imports: [
    CodeDemoModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ]
})
export class SnippetListModule {
}
