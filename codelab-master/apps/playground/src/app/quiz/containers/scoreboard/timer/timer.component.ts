import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { first, repeatWhen, scan, skip, switchMapTo, take, takeUntil, tap } from 'rxjs/operators';

import { TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-scoreboard-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() selectedAnswer: number;
  answer: number;
  timePerQuestion = 30;
  time$: Observable<number>;
  start$: Observable<number>;
  reset$: Observable<number>;
  stop$: Observable<number>;
  concat$: Observable<number>;

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    this.selectedAnswer = this.answer;
    this.start$ = this.timerService.start$;
    this.reset$ = this.timerService.reset$;
    this.stop$ = this.timerService.stop$;
    this.concat$ = concat(this.start$.pipe(first()), this.reset$);
    this.countdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedAnswer &&
      changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange
    ) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }

  countdown(): void {
    this.time$ = this.concat$.pipe(
      switchMapTo(
        timer(0, 1000).pipe(
          scan((acc) => acc > 0 ? (acc - 1 >= 10 ? acc - 1 : `0${acc - 1}`)
                                                 : acc, this.timePerQuestion)
        )
      ),
      takeUntil(this.stop$.pipe(skip(1))),
      repeatWhen(completeSubj =>
        completeSubj.pipe(
          switchMapTo(
            this.start$.pipe(
              skip(1),
              first()
            )
          )
        )
      )
    ).pipe(tap((value: number) => this.timerService.setElapsed(this.timePerQuestion - value)));
  }

  stopwatch(): void {
    this.time$ = this.concat$.pipe(
      switchMapTo(
        timer(0, 1000)
          .pipe(scan(acc => acc + 1, 0),
                take(this.timePerQuestion))),
      takeUntil(this.stop$.pipe(skip(1))),
      repeatWhen(completeSubj =>
        completeSubj.pipe(
          switchMapTo(
            this.start$.pipe(
              skip(1),
              first()
            )
          )
        )
      )
    )
    .pipe(tap((value) => this.timerService.setElapsed(value)));
  }
}
