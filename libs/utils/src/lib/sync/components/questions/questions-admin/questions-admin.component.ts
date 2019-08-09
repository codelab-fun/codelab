import { Component } from '@angular/core';
import { QuestionsService, QuestionStatus } from '@codelab/utils/src/lib/sync/components/questions/questions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'slides-questions-admin',
  templateUrl: './questions-admin.component.html',
  styleUrls: ['./questions-admin.component.css'],
  providers: [QuestionsService],
})
export class QuestionsAdminComponent {
  statuses = [QuestionStatus.NEW, QuestionStatus.APPROVED, QuestionStatus.ARCHIVED, QuestionStatus.DELETED];

  public readonly questionsByStatus$ = this.questionsService.questions$.pipe(map(questions => {
    return questions.reduce((result, question) => {
      result[question.status] = result[question.status] || [];
      result[question.status].push(question);
      return result;
    }, {});
  }));


  constructor(public readonly questionsService: QuestionsService) {
  }
}
