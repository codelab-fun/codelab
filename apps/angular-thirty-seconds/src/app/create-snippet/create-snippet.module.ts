import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetComponent } from './create-snippet.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { MarkdownModule } from 'ngx-markdown';
import { CodeDemoModule } from '@codelab/code-demos';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { SnippetSpinnerComponent } from './snippet-spinner/snippet-spinner.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [
    CreateSnippetComponent,
    SnippetOverviewComponent,
    SnippetSpinnerComponent
  ],
  entryComponents: [
    SnippetOverviewComponent
  ],
  imports: [
    ...MAT_MODULES,
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot(),
    CodeDemoModule,
    RouterModule,
    MatExpansionModule
  ]
})
export class CreateSnippetModule {
}
