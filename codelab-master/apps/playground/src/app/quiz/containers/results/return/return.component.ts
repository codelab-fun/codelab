import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';


@Component({
  selector: 'codelab-results-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnComponent implements OnInit {
  quizId: string;
  indexOfQuizId: number;
  codelabUrl = "https://www.codelab.fun";

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizId = this.quizService.quizId;
  }

  restartQuiz(): void {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.router.navigate(["/quiz/intro/", this.quizId]).then();
  }

  selectQuiz(): void {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.quizId = '';
    this.indexOfQuizId = 0;
    this.router.navigate(["/quiz/select/"]).then();
  }
}
