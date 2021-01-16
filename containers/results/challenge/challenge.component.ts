import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quiz, QuizMetadata } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';


@Component({
  selector: 'codelab-results-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;
  quizName$: Observable<string>;
  quizMetadata: Partial<QuizMetadata> = {
    totalQuestions: this.quizService.totalQuestions,
    totalQuestionsAttempted: this.quizService.totalQuestions,
    correctAnswersCount$: this.quizService.correctAnswersCountSubject,
    percentage: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
    completionTime: this.timerService.calculateTotalElapsedTime(this.timerService.elapsedTimes)
  };
  codelabUrl = "https://www.codelab.fun";

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.quizName$ = this.activatedRoute.url.pipe(map((segments) => segments[1].toString()));
  }

  calculatePercentageOfCorrectlyAnsweredQuestions(): number {
    return Math.ceil(100 * this.quizService.correctAnswersCountSubject.getValue() / this.quizService.totalQuestions);
  }
}
