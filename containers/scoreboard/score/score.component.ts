import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

<<<<<<< HEAD
import { QuizService } from '@shared/services/quiz.service';
=======
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
>>>>>>> quiz-holder

@Component({
  selector: 'codelab-scoreboard-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  totalQuestions: number;
  correctAnswersCount$: Observable<number>;

  constructor(private quizService: QuizService) { }

<<<<<<< HEAD
  ngOnInit() {
    this.totalQuestions = this.quizService.numberOfQuestions();
    this.correctAnswersCount$ = this.quizService.correctAnswersCountSubject;
=======
  ngOnInit(): void {
    this.correctAnswersCount$ = this.quizService.correctAnswersCountSubject;
    this.totalQuestions = this.quizService.totalQuestions;
>>>>>>> quiz-holder
  }
}
