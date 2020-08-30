import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  @Input() answer: number;
  @Input() question: QuizQuestion;
  allQuestions: QuizQuestion[];

  quizMetadata: {
    totalQuestions: number;
    completionTime: number;
    correctAnswersCount: number;
    percentage: number;
  };

  elapsedMinutes: number;
  elapsedSeconds: number;
  codelabUrl = 'https://www.codelab.fun';

  CONGRATULATIONS = '../../../assets/images/ng-trophy.jpg';
  NOT_BAD = '../../../assets/images/not-bad.jpg';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';

  constructor(private router: Router) {
    this.quizMetadata.totalQuestions = this.router.getCurrentNavigation().extras.state.totalQuestions;
    this.quizMetadata.completionTime = this.router.getCurrentNavigation().extras.state.completionTime;
    this.quizMetadata.correctAnswersCount = this.router.getCurrentNavigation().extras.state.correctAnswersCount;
    this.quizMetadata.percentage = this.router.getCurrentNavigation().extras.state.percentage;
  }

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.quizMetadata.completionTime / 60);
    this.elapsedSeconds = this.quizMetadata.completionTime % 60;
  }
}
