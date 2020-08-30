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
