import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetComponent } from './create-snippet.component';
import { SnippetInfoComponent } from './snippet-info/snippet-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { MarkdownModule } from 'ngx-markdown';
import { CodeDemoModule } from '@codelab/code-demos';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { SnippetSpinnerComponent } from './snippet-spinner/snippet-spinner.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CreateSnippetComponent,
    SnippetInfoComponent,
    SnippetOverviewComponent,
    SnippetSpinnerComponent
  ],
  entryComponents: [
    SnippetOverviewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AngularFireAuthModule,
    MatChipsModule,
    MarkdownModule.forRoot(),
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    CodeDemoModule,
    MatDialogModule,
    RouterModule
  ]
})
export class CreateSnippetModule {
}
