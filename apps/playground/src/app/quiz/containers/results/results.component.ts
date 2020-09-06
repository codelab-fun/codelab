<<<<<<< HEAD
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
>>>>>>> 970bc9feaf1792343871197b517f495f0567e967
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

<<<<<<< HEAD
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
=======
  constructor(private router: Router) {
    this.totalQuestions = this.router.getCurrentNavigation().extras.state.totalQuestions;
    this.correctAnswersCount = this.router.getCurrentNavigation().extras.state.correctAnswersCount;
    this.completionTime = this.router.getCurrentNavigation().extras.state.completionTime;
    this.allQuestions = this.router.getCurrentNavigation().extras.state.allQuestions;
  }

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;
    this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);
>>>>>>> 970bc9feaf1792343871197b517f495f0567e967
  }
}
