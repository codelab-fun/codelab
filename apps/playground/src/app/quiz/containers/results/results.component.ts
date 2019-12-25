import { Component, OnInit, Input } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answer: string;
  @Input() question: QuizQuestion;
  @Input() allQuestions: QuizQuestion[];
  @Input() totalQuestions: number;
  @Input() correctAnswersCount: number;
  @Input() percentage: number;
  @Input() completionTime: number;

  elapsedMinutes: number;
  elapsedSeconds: number;

  codelabUrl = 'https://www.codelab.fun';

  constructor() {}

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;
    this.checkBounds();
  }

  checkBounds() {
    // make sure the percentage is within bounds
    if (this.percentage < 0) {
      this.percentage = 0;
    }
    if (this.percentage > 100) {
      this.percentage = 100;
    }

    // check if correct answer count is somehow greater than the total number of questions
    if (this.correctAnswersCount > this.totalQuestions) {
      this.correctAnswersCount = this.totalQuestions;
    }
  }
}
