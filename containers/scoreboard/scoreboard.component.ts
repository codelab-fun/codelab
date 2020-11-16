import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

<<<<<<< HEAD
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';
=======
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';

>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnChanges, OnDestroy {
<<<<<<< HEAD
  @Input() selectedAnswer: number;
  answer: number;
  totalQuestions: number;
  badgeQuestionNumber: number;
  unsubscribe$ = new Subject<void>();
=======
  @Input() set selectedAnswer(value) { this.answer = value; }
  answer;
  totalQuestions: number;
  badgeQuestionNumber: number;
  private unsubscribe$ = new Subject<void>();
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.selectedAnswer = this.answer;
    this.totalQuestions = this.quizService.totalQuestions;

=======
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => {
          if (params.questionIndex) {
            this.badgeQuestionNumber = params.questionIndex;
            this.timerService.resetTimer();
          }
    });
<<<<<<< HEAD
=======

    this.totalQuestions = this.quizService.totalQuestions;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer &&
        changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }
<<<<<<< HEAD

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
=======
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
}
