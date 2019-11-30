import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './quiz/src/app/containers/introduction/introduction.component';
import { QuestionComponent } from './quiz/src/app/containers/question/question.component';
import * as QuestionComponent2 from './quiz/src/app/components/question/question.component';
import { ResultsComponent } from './quiz/src/app/containers/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    QuestionComponent,
    QuestionComponent2.QuestionComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    AccordionModule.forRoot()
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }],
  bootstrap: [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
