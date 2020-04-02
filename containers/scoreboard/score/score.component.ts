import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../../services/quiz.service';


@Component({
  selector: 'codelab-scoreboard-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  providers: [QuizService]
})
export class ScoreComponent implements OnInit {
  public correctAnswersCount: number;
  public totalQuestions: number;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.totalQuestions = this.quizService.numberOfQuestions();
    this.quizService.correctAnswer$.subscribe(data => {
      this.correctAnswersCount = data;
      console.log('correctAnswersCount: ', this.correctAnswersCount);
    });
  }
}
