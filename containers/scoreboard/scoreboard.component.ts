<<<<<<< HEAD
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@shared/services/quiz.service';
import { TimerService } from '@shared/services/timer.service';
=======
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';
>>>>>>> quiz-holder

@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
<<<<<<< HEAD
export class ScoreboardComponent implements OnInit, OnChanges {
  @Input() set selectedAnswer(value) { this.answer = value; }
  answer;
  totalQuestions: number;
  badgeQuestionNumber: number;
=======
export class ScoreboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() set selectedAnswer(value: number) { this.answer = value; }
  answer: number;
  totalQuestions: number;
  badgeQuestionNumber: number;
  unsubscribe$ = new Subject<void>();
>>>>>>> quiz-holder

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
<<<<<<< HEAD
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.questionIndex) {
        this.badgeQuestionNumber = params.questionIndex;
        this.timerService.resetTimer();
      }
    });

    this.totalQuestions = this.quizService.numberOfQuestions();
=======
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
>>>>>>> quiz-holder
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer &&
        changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }
}
