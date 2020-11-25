import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { QuizQuestionComponent } from '../question.component';

@Component({
  selector: "codelab-question-multiple-answer",
  templateUrl: "./multiple-answer.component.html",
  styleUrls: ["./multiple-answer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MultipleAnswerComponent extends QuizQuestionComponent implements OnInit {
  multipleAnswer = true;

  ngOnInit(): void {
    this.sendMultipleAnswerToQuizService(this.multipleAnswer);
  }
}
