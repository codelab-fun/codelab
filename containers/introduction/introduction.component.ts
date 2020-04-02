import { Component, ChangeDetectionStrategy } from '@angular/core';

import { QUIZ_DATA } from '../../quiz';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionComponent {
  quizData: Quiz = QUIZ_DATA;
}
