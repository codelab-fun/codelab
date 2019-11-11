import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { environment } from '../../../../apps/codelab/src/environments/environment';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FormComponent } from './form/form.component';
import { PostService } from './post.service';
import { PostComponent } from './post/post.component';
import { SinglePostComponent } from './single-post/single-post.component';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

const appRoutes: Routes = [
  { path: 'post/:id', component: PostComponent },
  { path: '', component: FeedComponent },
  { path: 'form', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FeedComponent,
    PostComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    angularFire,
    MatCardModule,
    AngularFireAuthModule,
    MatSnackBarModule,

    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
  exports: [FormComponent]
})
export class AppModule {}
