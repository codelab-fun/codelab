import { Component } from '@angular/core';
import { QuestionsService } from '../common/questions.service';

@Component({
  selector: 'codelab-questions-presenter',
  templateUrl: './questions-presenter.component.html',
  styleUrls: ['./questions-presenter.component.css'],
})
export class QuestionsPresenterComponent {
  constructor(public readonly questionsService: QuestionsService) {}
}
