import { Component } from '@angular/core';
import { QuestionsService } from '@codelab/utils/src/lib/sync/components/questions/common/questions.service';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';

@Component({
  selector: 'codelab-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionsService, SyncDataService]
})
export class QuestionsComponent {
  constructor(public readonly questionsService: QuestionsService) {}
}
