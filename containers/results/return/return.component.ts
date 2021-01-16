import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';


@Component({
  selector: 'codelab-results-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnComponent implements OnInit, OnDestroy {
  quizId: string;
  indexOfQuizId: number;
  codelabUrl = "https://www.codelab.fun";
  unsubscribe$ = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => this.quizId = params.get('quizId'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  restartQuiz(): void {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.router.navigate(["/quiz/intro/", this.quizId]).then();
  }

  selectQuiz(): void {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.quizId = '';
    this.indexOfQuizId = 0;
    this.router.navigate(["/quiz/select/"]).then();
  }
}
