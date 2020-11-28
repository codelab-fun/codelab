import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quiz, QuizMetadata, Score } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-results-summary',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryReportComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;
  quizName$: Observable<string>;
  quizId: string;
  quizMetadata: Partial<QuizMetadata> = {
    totalQuestions: this.quizService.totalQuestions,
    totalQuestionsAttempted: this.quizService.totalQuestions,
    correctAnswersCount$: this.quizService.correctAnswersCountSubject,
    percentage: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
    completionTime: this.timerService.calculateTotalElapsedTime(this.timerService.elapsedTimes)
  };
  elapsedMinutes: number;
  elapsedSeconds: number;
  checkedShuffle: boolean;

  score: Score;
  highScoresLocal = JSON.parse(localStorage.getItem("highScoresLocal")) || [];
  highScores: Score[];

  codelabUrl = "https://www.codelab.fun";

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.quizName$ = this.activatedRoute.url.pipe(map((segments) => segments[1].toString()));
    this.quizId = this.quizService.quizId;
    this.checkedShuffle = this.quizService.checkedShuffle;
    this.calculateElapsedTime();
    this.saveHighScores();
  }

  calculatePercentageOfCorrectlyAnsweredQuestions(): number {
    return Math.ceil(100 * this.quizService.correctAnswersCountSubject.getValue() / this.quizService.totalQuestions);
  }

  calculateElapsedTime(): void {
    this.elapsedMinutes = Math.floor(this.quizMetadata.completionTime / 60);
    this.elapsedSeconds = this.quizMetadata.completionTime % 60;
  }

  saveHighScores(): void {
    this.score = {
      quizId: this.quizService.quizId,
      attemptDateTime: new Date(),
      score: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
      totalQuestions: this.quizService.totalQuestions
    };

    const MAX_HIGH_SCORES = 10;            // show results of the last 10 quizzes
    this.highScoresLocal.push(this.score);
    this.highScoresLocal.sort((a, b) => b.attemptDateTime - a.attemptDateTime);
    this.highScoresLocal.reverse();        // show high scores from most recent to latest
    this.highScoresLocal.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(this.highScoresLocal));
    this.highScores = this.highScoresLocal;
  }
}
