import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetComponent } from './create-snippet.component';
import { SnippetInfoComponent } from './snippet-info/snippet-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MarkdownModule } from 'ngx-markdown';
import { CodeDemoModule } from '@codelab/code-demos';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { SnippetSpinnerComponent } from './snippet-spinner/snippet-spinner.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    CreateSnippetComponent,
    SnippetInfoComponent,
    SnippetOverviewComponent,
    SnippetSpinnerComponent,
  ],
  imports: [
    ...MAT_MODULES,
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot(),
    CodeDemoModule,
    RouterModule,
  ],
})
export class CreateSnippetModule {}
