import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { first, repeatWhen, scan, shareReplay, skip, switchMapTo, takeUntil, tap } from 'rxjs/operators';

import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-scoreboard-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnChanges {
  @Input() set selectedAnswer(value) { this.answer = value; }
  answer;
  timeLeft$: Observable<number>;
  timePerQuestion = 20;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) {
    this.countdownClock();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.selectedAnswer &&
      changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange
    ) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }

  countdownClock(): void {
    const start$ = this.timerService.isStart.asObservable().pipe(shareReplay(1));
    const reset$ = this.timerService.isReset.asObservable();
    const stop$ = this.timerService.isStop.asObservable();

    this.timeLeft$ = concat(start$.pipe(first()), reset$).pipe(
      switchMapTo(
        timer(0, 1000).pipe(
          scan((acc) => acc > 0 ? (acc - 1 >= 10 ? acc - 1 : `0${acc - 1}`)
                                                  : acc, this.timePerQuestion)
        )
      ),
      takeUntil(stop$.pipe(skip(1))),
      repeatWhen(completeSubj =>
        completeSubj.pipe(
          switchMapTo(
            start$.pipe(
              skip(1),
              first()
            )
          )
        )
      )
    ).pipe(tap((value: number) => this.timerService.setElapsed(this.timePerQuestion - value)));
  }
}
