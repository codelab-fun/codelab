import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizRoutingModule } from './routing/quiz-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBackToTopModule } from 'ng-back-to-top';

import { QuizAppComponent } from './quiz-app.component';

import { MultipleAnswerComponent, SingleAnswerComponent, QuizQuestionComponent } from '@codelab-quiz/components/*';
import { IntroductionComponent } from '@codelab-quiz/containers/introduction';
import { QuizComponent } from '@codelab-quiz/containers/quiz';
import { QuizSelectionComponent } from '@codelab-quiz/containers/quiz-selection';
import { AccordionComponent, ChallengeComponent, ResultsComponent,
         ReturnComponent, StatisticsComponent, SummaryReportComponent } from '@codelab-quiz/containers/results';
import { ScoreboardComponent, ScoreComponent, TimerComponent } from '@codelab-quiz/containers/scoreboard/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/';
import { JoinPipe } from '@codelab-quiz/pipes/join.pipe';


@NgModule({
  declarations: [
    QuizAppComponent,
    IntroductionComponent,
    QuizComponent,
    QuizQuestionComponent,
    QuizSelectionComponent,
    AccordionComponent,
    ChallengeComponent,
    ResultsComponent,
    ReturnComponent,
    StatisticsComponent,
    SummaryReportComponent,
    ScoreboardComponent,
    ScoreComponent,
    TimerComponent,
    SingleAnswerComponent,
    MultipleAnswerComponent,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbModule,
    NgBackToTopModule
  ],
  bootstrap: [QuizAppComponent],
  providers: [QuizService, TimerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizAppModule { }
