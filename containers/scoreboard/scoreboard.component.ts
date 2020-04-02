import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz.service';


@Component({
  selector: 'codelab-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [QuizService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent implements OnInit, OnChanges {
  answer;
  @Input() set selectedAnswer(value) {
    this.answer = value;
  }
  totalQuestions: number;
  badgeQuestionNumber: number;

  constructor(private quizService: QuizService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    let questionIndex;
    this.route.params.subscribe(params => {
      if (params.questionIndex) {
        questionIndex = params.questionIndex;
        this.badgeQuestionNumber = questionIndex;
      }
    });

    this.totalQuestions = this.quizService.numberOfQuestions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer && changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }
}
