import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedAnswer: number;
  answer: number;
  totalQuestions: number;
  badgeQuestionNumber: number;
  unsubscribe$ = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.selectedAnswer = this.answer;
    this.totalQuestions = this.quizService.totalQuestions;

    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => {
          if (params.questionIndex) {
            this.badgeQuestionNumber = params.questionIndex;
            this.timerService.resetTimer();
          }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer &&
        changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
