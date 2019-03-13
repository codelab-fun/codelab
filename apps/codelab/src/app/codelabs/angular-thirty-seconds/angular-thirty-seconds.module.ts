import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';
import { SnippetComponent } from './snippet/snippet.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlugifyPipe } from './slugify.pipe';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
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
import { SnippetOverviewComponent } from './create-snippet/snippet-modal/snippet-overview.component';
import { SnippetInfoComponent } from './create-snippet/snippet-info/snippet-info.component';
import { HttpClientModule } from '@angular/common/http';
import { SnippetService } from './shared/services/snippet.service';
import { SnippetSpinnerComponent } from './create-snippet/snippet-spinner/snippet-spinner.component';

const routes = RouterModule.forChild(
  [
    {path: 'new', component: CreateSnippetComponent},
    ...SlidesRoutes.get(AngularThirtySecondsComponent)
  ]
);


@NgModule({
  declarations: [
    AngularThirtySecondsComponent,
    SnippetComponent,
    SlugifyPipe,
    CreateSnippetComponent,
    SnippetOverviewComponent,
    SnippetInfoComponent,
    SnippetSpinnerComponent
  ],
  imports: [
    HttpClientModule,
    CodeDemoModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    SlidesModule,
    MarkdownModule.forRoot(),
    routes
  ],
  providers: [
    SlugifyPipe,
    SnippetService
  ],
  entryComponents: [
    SnippetOverviewComponent
  ]
})
export class AngularThirtySecondsModule {
}


