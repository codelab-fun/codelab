import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../apps/codelab/src/environments/environment';
import { FormService } from './form.service';
import { FeedComponent } from './feed/feed.component';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

// debugger;

@NgModule({
  declarations: [AppComponent, FormComponent, FeedComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    angularFire
  ],
  providers: [FormService],
  bootstrap: [AppComponent],
  exports: [FormComponent]
})
export class AppModule {}
