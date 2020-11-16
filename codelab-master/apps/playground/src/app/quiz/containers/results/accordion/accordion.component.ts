import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { QuizQuestion, Result } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-results-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit {
  questions: QuizQuestion[];
  correctAnswers: number[] = [];
  results: Result = {
    userAnswers: this.quizService.userAnswers,
    elapsedTimes: this.timerService.elapsedTimes
  };

  @ViewChild('accordion', { static: false }) accordion: MatAccordion;
  panelOpenState = false;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    this.questions = this.quizService.questions;
    this.correctAnswers = this.quizService.correctAnswers;
  }

  checkIfAnswersAreCorrect(correctAnswers: any, userAnswers: any, index: number): boolean {
    return !(!userAnswers[index] ||
             userAnswers[index].length === 0 ||
             userAnswers[index].find((answer) => correctAnswers[index].answers[0].indexOf(answer) === -1));
  }

  openAllPanels(): void {
    this.accordion.openAll();
  }
  closeAllPanels(): void {
    this.accordion.closeAll();
  }
}
