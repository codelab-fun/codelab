import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetComponent } from './create-snippet.component';
import { SnippetInfoComponent } from './snippet-info/snippet-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    SnippetInfoComponent,
    SnippetOverviewComponent,
    SnippetSpinnerComponent
  ],
  entryComponents: [SnippetOverviewComponent],
  imports: [
    ...MAT_MODULES,
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot(),
    CodeDemoModule,
    RouterModule
  ]
})
export class CreateSnippetModule {}
