import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnChanges {
  @Input() set selectedAnswer(value) { this.answer = value; }
  answer;
  totalQuestions: number;
  badgeQuestionNumber: number;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.questionIndex) {
        this.badgeQuestionNumber = params.questionIndex;
        this.timerService.resetTimer();
      }
    });

    this.totalQuestions = this.quizService.totalQuestions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer &&
        changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }
}
