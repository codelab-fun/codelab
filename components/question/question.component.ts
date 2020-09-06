<<<<<<< HEAD
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuizQuestion } from '@shared/models/QuizQuestion.model';
import { QuizService } from '@shared/services/quiz.service';
import { TimerService } from '@shared/services/timer.service';


@Component({
  selector: 'codelab-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizQuestionComponent implements OnInit, OnChanges {
  currentQuestion: QuizQuestion;
  @Output() answer = new EventEmitter<number>();
  @Input() set question(value: QuizQuestion) { this.currentQuestion = value; }
  formGroup: FormGroup;
  quizStarted: boolean;
  multipleAnswer: boolean;
  alreadyAnswered = false;
  correctAnswers = [];
  correctMessage: string;
  isCorrectAnswerSelected = false;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue !== changes.question.firstChange) {
      this.currentQuestion = changes.question.currentValue;
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
      this.multipleAnswer = this.correctAnswers.length > 1;

      if (this.formGroup) {
        this.formGroup.patchValue({answer: ''});
        this.alreadyAnswered = false;
      }
    }
  }

  isCorrect(correct: boolean, optionIndex: number): boolean {
    return correct === this.currentQuestion.options[optionIndex].correct;
  }

  setSelected(optionIndex: number): void {
    this.quizStarted = true;
    this.correctMessage = this.quizService.correctMessage;
    this.isCorrectAnswerSelected = this.isCorrect(this.currentQuestion.options[optionIndex].correct, optionIndex);
    this.answer.emit(optionIndex);

    if (this.correctAnswers.length === 1) {
      this.currentQuestion.options.forEach(o => o.selected = false);
    }
    this.currentQuestion.options[optionIndex].selected = true;

    if (
      optionIndex >= 0 &&
      this.currentQuestion &&
      this.currentQuestion.options &&
      this.currentQuestion.options[optionIndex]['correct']
    ) {
      this.timerService.stopTimer();
      this.quizService.correctSound.play();
      optionIndex = null;
    } else {
      this.quizService.incorrectSound.play();
    }

    this.alreadyAnswered = true;
  }
}
=======
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  @Output() answer = new EventEmitter<number>();
  @Output() formGroup: FormGroup;
  @Input() question: QuizQuestion;
  option: number;
  selectedOption: number;
  grayBorder = '2px solid #979797';

  ngOnInit() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({answer: ''});
    }
  }

  radioChange(answer: number) {
    this.selectedOption = answer;
    this.answer.emit(answer);
    this.displayExplanation();
  }

  displayExplanation(): void {
    const questionElem = document.getElementById('question');
    if (questionElem !== null) {
      questionElem.innerHTML = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
      questionElem.style.border = this.grayBorder;
    }
  }

  // mark the correct answer regardless of which option is selected once answered
  isCorrect(option: number): boolean {
    return this.selectedOption && option === this.question.answer;
  }

  // mark incorrect answer if selected
  isIncorrect(option: number): boolean {
    return option !== this.question.answer && option === this.selectedOption;
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }
}
>>>>>>> 970bc9feaf1792343871197b517f495f0567e967
