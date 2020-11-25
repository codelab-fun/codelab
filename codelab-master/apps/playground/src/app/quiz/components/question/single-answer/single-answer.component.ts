import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { QuizQuestionComponent } from '../question.component';

@Component({
  selector: "codelab-question-single-answer",
  templateUrl: "./single-answer.component.html",
  styleUrls: ["./single-answer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SingleAnswerComponent extends QuizQuestionComponent implements OnInit {
  multipleAnswer = false;

  ngOnInit(): void {
    this.sendMultipleAnswerToQuizService(this.multipleAnswer);
  }
}
