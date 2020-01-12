import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answer: string;
  @Input() question: QuizQuestion;
  allQuestions: QuizQuestion[];
  totalQuestions: number;
  correctAnswersCount: number;
  percentage: number;
  completionTime: number;
  elapsedMinutes: number;
  elapsedSeconds: number;
  codelabUrl = 'https://www.codelab.fun';

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
  }
}
