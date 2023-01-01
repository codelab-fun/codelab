import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Question,
  QuestionStatus,
  statuses,
} from '../common';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'codelab-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: Question;
  @Input() showControls = true;
  @Output() vote = new EventEmitter<number>();
  readonly statuses = statuses;
  readonly QuestionStatus = QuestionStatus;

  constructor(public readonly questionsService: QuestionsService) {}
}
