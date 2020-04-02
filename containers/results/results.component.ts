import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quiz } from '../../models/Quiz';
import { QUIZ_DATA } from '../../quiz';
import { QuizService } from '../../services/quiz.service';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  quizData: Quiz = QUIZ_DATA;
  quizMetadata: QuizMetadata = {
    completionTime: null,
    correctAnswersCount: null,
    percentage: null,
    totalQuestions: null
  };

  elapsedMinutes: number;
  elapsedSeconds: number;
  codelabUrl = 'https://www.codelab.fun';

  // check if paths are still correct
  CONGRATULATIONS = '../../../assets/images/ng-trophy.jpg';
  NOT_BAD = '../../../assets/images/not-bad.jpg';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {

    console.log(this.router.getCurrentNavigation());
    this.quizMetadata.totalQuestions = this.router.getCurrentNavigation().extras.state.totalQuestions;
    this.quizMetadata.completionTime = this.router.getCurrentNavigation().extras.state.completionTime;
    this.quizMetadata.correctAnswersCount = this.router.getCurrentNavigation().extras.state.correctAnswersCount;
    this.quizMetadata.percentage = this.router.getCurrentNavigation().extras.state.percentage;
  }

  ngOnInit() {
    console.log(this.quizMetadata);
    this.elapsedMinutes = Math.floor(this.quizMetadata.completionTime / 60);
    this.elapsedSeconds = this.quizMetadata.completionTime % 60;
  }

  restart() {
    this.router.navigate(['/intro']);
    this.quizService.resetAll();
  }
}

export class QuizMetadata {
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount: number;
  percentage: number;
}
