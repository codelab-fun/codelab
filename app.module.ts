import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizRoutingModule } from './routing/quiz-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '@quiz/app.component';
import { QuizQuestionComponent } from '@quiz/components/question/question.component';
import { IntroductionComponent } from '@quiz/containers/introduction/introduction.component';
import { DependencyInjectionQuizComponent } from '@quiz/containers/dependency-injection-quiz/dependency-injection-quiz.component';
import { ResultsComponent } from '@quiz/containers/results/results.component';
import { ScoreboardComponent } from '@quiz/containers/scoreboard/scoreboard.component';
import { ScoreComponent } from '@quiz/containers/scoreboard/score/score.component';
import { TimeComponent } from '@quiz/containers/scoreboard/time/time.component';
import { JoinPipe } from './pipes/join.pipe';


@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    QuizQuestionComponent,
    DependencyInjectionQuizComponent,
    ResultsComponent,
    ScoreboardComponent,
    ScoreComponent,
    TimeComponent,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    OverlayModule,
    NgbModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
