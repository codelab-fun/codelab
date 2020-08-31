import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() set selectedAnswer(value) { this.answer = value; }
  answer;
  totalQuestions: number;
  badgeQuestionNumber: number;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => {
          if (params.questionIndex) {
            this.badgeQuestionNumber = params.questionIndex;
            this.timerService.resetTimer();
          }
    });

    this.totalQuestions = this.quizService.totalQuestions;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer &&
        changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }
}
