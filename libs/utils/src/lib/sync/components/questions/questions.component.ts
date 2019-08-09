import { Component } from '@angular/core';
import { QuestionsService } from '@codelab/utils/src/lib/sync/components/questions/questions.service';




@Component({
  selector: 'slides-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionsService],
})
export class QuestionsComponent {
  constructor(public readonly questionsService: QuestionsService) {
  }

}
