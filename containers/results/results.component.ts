import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { QUIZ_DATA, QUIZ_RESOURCES } from '@quiz-data';
import { Quiz } from '@shared/models/Quiz.model';
import { QuizMetadata } from '@shared/models/model';
import { Result } from '@shared/models/Result.model';
import { QuizService } from '@shared/services/quiz.service';
import { TimerService } from '@shared/services/timer.service';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  quizData: Quiz = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizResources = QUIZ_RESOURCES;
  quizMetadata: Partial<QuizMetadata> = {
    totalQuestions: this.quizService.totalQuestions,
    correctAnswersCount$: this.quizService.correctAnswersCountSubject,
    percentage: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
    completionTime: this.timerService.calculateTotalElapsedTime(this.timerService.elapsedTimes)
  };
  results: Result = {
    userAnswers: this.quizService.userAnswers,
    elapsedTimes: this.timerService.elapsedTimes
  };
  correctAnswers: number[] = [];
  elapsedMinutes: number;
  elapsedSeconds: number;

  @ViewChild('accordion', { static: false }) Accordion: MatAccordion;
  panelOpenState = false;

  CONGRATULATIONS = '../../assets/images/congratulations.jpg';
  NOT_BAD = '../../assets/images/not-bad.jpg';
  TRY_AGAIN = '../../assets/images/try-again.jpeg';
  codelabUrl = 'https://www.codelab.fun';

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private router: Router
  ) {
    this.calculateElapsedTime();
  }

  ngOnInit() {
    this.correctAnswers = this.quizService.correctAnswers;
  }

  calculateElapsedTime() {
    this.elapsedMinutes = Math.floor(this.quizMetadata.completionTime / 60);
    this.elapsedSeconds = this.quizMetadata.completionTime % 60;
  }

  calculatePercentageOfCorrectlyAnsweredQuestions(): number {
    return Math.ceil(100 * this.quizService.correctAnswersCountSubject.value / this.quizService.totalQuestions);
  }

  checkIfAnswersAreCorrect(correctAnswers, userAnswers, index: number): boolean {
    return !(!userAnswers[index] || userAnswers[index].length === 0 ||
             userAnswers[index].find((answer) => correctAnswers[index][0].indexOf(answer) === -1));
  }

  openAllPanels() {
    this.Accordion.openAll();
  }
  closeAllPanels() {
    this.Accordion.closeAll();
  }

  restart() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.router.navigate(['/quiz/intro']);
  }
}
