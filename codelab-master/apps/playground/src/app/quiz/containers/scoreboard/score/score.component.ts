import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: "codelab-scoreboard-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.scss"]
})
export class ScoreComponent implements OnInit {
  score: string;
  score$: Observable<string>;
  correctAnswersCount: number;
  correctAnswersCount$: Observable<number>;
  correctAnswersCountSubscription: Subscription;
  totalQuestions: number;
  unsubscribe$ = new Subject<void>();

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.correctAnswersCount$ = this.quizService.correctAnswersCountSubject;
    this.totalQuestions = this.quizService.totalQuestions;
    this.numericalScore();
  }

  numericalScore(): void {
    this.correctAnswersCountSubscription = this.correctAnswersCount$
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((correctAnswersCount) => {
          this.correctAnswersCount = correctAnswersCount;
          this.score =
            this.correctAnswersCount.toString() +
            "/" +
            this.totalQuestions.toString();
          this.score$ = of(this.score);
        });
  }

  percentageScore(): void {
    this.correctAnswersCountSubscription = this.correctAnswersCount$
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((correctAnswersCount) => {
          this.correctAnswersCount = correctAnswersCount;
          this.score =
            Math.ceil(
              (this.correctAnswersCount / this.totalQuestions) * 100
            ).toString() + "%";
          this.score$ = of(this.score);
      });
  }
}

