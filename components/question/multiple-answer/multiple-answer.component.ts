import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Option, QuizQuestion } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: "codelab-question-multiple-answer",
  templateUrl: "./multiple-answer.component.html",
  styleUrls: ["./multiple-answer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MultipleAnswerComponent implements OnInit, OnChanges {
  @Output() answer = new EventEmitter<number>();
  @Input() question: QuizQuestion;
  currentQuestion: QuizQuestion;
  formGroup: FormGroup;
  optionSelected: Option;
  correctAnswers: Option[] = [];
  correctMessage = "";
  quizStarted: boolean;
  alreadyAnswered: boolean;
  multipleAnswer = true;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    this.question = this.currentQuestion;
    this.currentQuestion = this.quizService.currentQuestion;
    this.sendMultipleAnswerToQuizService();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.question &&
      changes.question.currentValue !== changes.question.firstChange
    ) {
      this.currentQuestion = changes.question.currentValue;
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
      this.correctMessage = this.quizService.correctMessage;

      if (this.formGroup) {
        this.formGroup.patchValue({ answer: "" });
        this.alreadyAnswered = false;
      }
    }
  }

  setSelected(optionIndex: number): void {
    this.quizStarted = true;
    this.alreadyAnswered = true;
    this.answer.emit(optionIndex);

    if (this.correctAnswers.length === 1) {
      this.currentQuestion.options.forEach(option => {
        option.selected = false;
        option.className = "";
      });
    }
    this.currentQuestion.options[optionIndex].selected = true;
    this.optionSelected = this.currentQuestion.options[optionIndex];

    if (
      optionIndex >= 0 &&
      this.currentQuestion &&
      this.currentQuestion.options &&
      this.currentQuestion.options[optionIndex]["correct"]
    ) {
      this.optionSelected.className = "correct";
      this.timerService.stopTimer();
      this.quizService.correctSound.play();
      optionIndex = null;
    } else {
      this.optionSelected.className = "incorrect";
      this.quizService.incorrectSound.play();
    }
  }

  private sendMultipleAnswerToQuizService(): void {
    this.quizService.setMultipleAnswer(this.multipleAnswer);
  }
}
