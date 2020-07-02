import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { QuizService } from '@shared/services/quiz.service';

@Component({
  selector: 'codelab-scoreboard-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  totalQuestions: number;
  correctAnswersCount$: Observable<number>;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.totalQuestions = this.quizService.numberOfQuestions();
    this.correctAnswersCount$ = this.quizService.correctAnswersCountSubject;
  }
}
