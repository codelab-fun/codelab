import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizMetadata } from '@codelab-quiz/shared/models/QuizMetadata.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { Result } from '@codelab-quiz/shared/models/Result.model';
import { Score } from '@codelab-quiz/shared/models/Score.model';
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  // quizResources: QuizResource[] = JSON.parse(JSON.stringify(QUIZ_RESOURCES));
  quizMetadata: Partial<QuizMetadata> = {
    totalQuestions: this.quizService.totalQuestions,
    totalQuestionsAttempted: this.quizService.totalQuestions, // should be same as totalQuestions since next button is disabled
    correctAnswersCount$: this.quizService.correctAnswersCountSubject,
    percentage: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
    completionTime: this.timerService.calculateTotalElapsedTime(this.timerService.elapsedTimes)
  };
  results: Result = {
    answer: this.quizService.userAnswers,
    elapsedTimes: this.timerService.elapsedTimes
  };
  questions: QuizQuestion[];
  quizName = '';
  quizId: string;
  indexOfQuizId: number;
  status: string;
  correctAnswers: number[] = [];
  previousUserAnswers: any[] = [];
  numberOfCorrectAnswers: number[] = [];
  elapsedMinutes: number;
  elapsedSeconds: number;
  checkedShuffle: boolean;
  highScores: Score[] = [];
  score: Score;
  private unsubscribe$ = new Subject<void>();

  @ViewChild('accordion', { static: false }) accordion: MatAccordion;
  panelOpenState = false;

  CONGRATULATIONS = '../../assets/images/congrats.gif';
  NOT_BAD = '../../assets/images/not-bad.jpg';
  TRY_AGAIN = '../../assets/images/try-again.jpeg';
  codelabUrl = 'https://www.codelab.fun';

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.indexOfQuizId = this.quizData.findIndex(el => el.quizId === this.quizId);
    this.quizData[this.indexOfQuizId].status = 'completed';

    this.sendQuizStatusToQuizService();
    this.sendCompletedQuizIdToQuizService();
    this.sendPreviousUserAnswersToQuizService();
    this.calculateElapsedTime();
    this.saveHighScores();
  }

  ngOnInit(): void {
    this.activatedRoute.url
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe(segments => {
          this.quizName = segments[1].toString();
        });

    this.questions = this.quizService.questions;
    this.correctAnswers = this.quizService.correctAnswers;
    this.numberOfCorrectAnswers = this.quizService.numberOfCorrectAnswersArray;
    this.checkedShuffle = this.quizService.checkedShuffle;
    this.previousUserAnswers = this.quizService.userAnswers;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private sendQuizStatusToQuizService(): void {
    this.status = this.quizData[this.indexOfQuizId].status;
    this.quizService.setQuizStatus(this.status);
  }

  private sendCompletedQuizIdToQuizService(): void {
    this.quizService.setCompletedQuizId(this.quizId);
  }

  private sendPreviousUserAnswersToQuizService(): void {
    this.quizService.setPreviousUserAnswers(this.previousUserAnswers);
  }

  calculateElapsedTime(): void {
    this.elapsedMinutes = Math.floor(this.quizMetadata.completionTime / 60);
    this.elapsedSeconds = this.quizMetadata.completionTime % 60;
  }

  calculatePercentageOfCorrectlyAnsweredQuestions(): number {
    return Math.ceil(100 * this.quizService.correctAnswersCountSubject.getValue() / this.quizService.totalQuestions);
  }

  checkIfAnswersAreCorrect(correctAnswers: any, answer: any, index: number): boolean {
    return !(!answer[index] ||
             answer[index].length === 0 ||
             answer[index].find((answer) => correctAnswers[index][0].indexOf(answer) === -1));
  }

  saveHighScores(): void {
    this.score = {
      quizId: this.quizId,
      score: this.quizService.correctAnswersCountSubject.getValue(),
      datetime: new Date()
    };

    const MAX_LENGTH = 2;
    if (this.quizId === this.quizName) {
      this.highScores = new Array(MAX_LENGTH);
    }

    // TODO: checked, error doesn't get thrown if quiz is taken more than 2 times; maybe need to use localstorage
    if (this.quizId && this.highScores.length > MAX_LENGTH) {
      console.log('ERROR: ' + this.quizData[this.indexOfQuizId].milestone + ' can only be taken ' + MAX_LENGTH + ' times');
    }
    this.highScores.push(this.score);
    console.log('High Scores:', this.highScores);
  }

  openAllPanels(): void {
    this.accordion.openAll();
  }
  closeAllPanels(): void {
    this.accordion.closeAll();
  }

  restartQuiz() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.router.navigate(['/quiz/intro/', this.quizId]).then();
  }

  selectQuiz() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.quizId = '';
    this.indexOfQuizId = 0;
    this.router.navigate(['/quiz/select/']).then();
  }
}
