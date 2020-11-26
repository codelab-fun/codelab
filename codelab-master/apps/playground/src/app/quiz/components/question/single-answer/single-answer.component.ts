import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { QuizQuestionComponent } from '../question.component';

@Component({
  selector: "codelab-question-single-answer",
  templateUrl: "./single-answer.component.html",
  styleUrls: ["./single-answer.component.scss",
              "../question.component.scss"
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SingleAnswerComponent extends QuizQuestionComponent {}
