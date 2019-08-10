import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Question, statuses } from '@codelab/utils/src/lib/sync/components/questions/common/common';
import { QuestionsService } from '@codelab/utils/src/lib/sync/components/questions/common/questions.service';

@Component({
  selector: 'slides-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() question: Question;
  @Output() vote = new EventEmitter<number>();
  statuses = statuses;

  constructor(public readonly questionsService: QuestionsService) {
  }

}
