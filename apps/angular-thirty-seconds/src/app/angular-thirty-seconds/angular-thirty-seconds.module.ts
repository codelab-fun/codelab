import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';

import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlugifyPipe } from '../shared/slugify.pipe';
import { CreateSnippetComponent } from '../create-snippet/create-snippet.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MarkdownModule } from 'ngx-markdown';
import { SnippetOverviewComponent } from '../create-snippet/snippet-modal/snippet-overview.component';
import { SnippetInfoComponent } from '../create-snippet/snippet-info/snippet-info.component';
import { SnippetSpinnerComponent } from '../create-snippet/snippet-spinner/snippet-spinner.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../codelab/src/environments/environment';


export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  declarations: [
    AngularThirtySecondsComponent,
    SlugifyPipe,
    CreateSnippetComponent,
    SnippetOverviewComponent,
    SnippetInfoComponent,
    SnippetSpinnerComponent
  ],
  imports: [
    angularFire,
    CommonModule,
    SlidesModule,
    FormsModule,
    CodeDemoModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    SlugifyPipe,
    AngularFireAuth
  ],
  entryComponents: [
    SnippetOverviewComponent
  ]
})
export class AngularThirtySecondsModule {
}


