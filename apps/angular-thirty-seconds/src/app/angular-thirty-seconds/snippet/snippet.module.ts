import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDemoModule } from '@codelab/code-demos';
import { MatButtonModule, MatCardModule, MatChipsModule } from '@angular/material';
import { SnippetComponent } from './snippet.component';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SnippetComponent],
  exports: [SnippetComponent],
  entryComponents: [SnippetComponent],
  imports: [
    CodeDemoModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatChipsModule,
    MatButtonModule,
    MarkdownModule.forRoot(),
    MatCardModule,
  ]
})
export class SnippetModule {
}
