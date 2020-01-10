import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      this.totalQuestions = +params['totalQuestions'];
      this.correctAnswersCount = +params['correctAnswersCount'];
      this.completionTime = +params['completionTime'];
      this.allQuestions = JSON.parse(params['allQuestions']);
    });
  }

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;
    this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);
  }
}
