import { Component } from '@angular/core';
import { QuestionsService } from './common/questions.service';
import { SyncDataService } from '../../services/sync-data.service';

@Component({
  selector: 'codelab-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionsService, SyncDataService],
})
export class QuestionsComponent {
  constructor(public readonly questionsService: QuestionsService) {}
}
