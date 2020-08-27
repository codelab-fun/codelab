import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'codelab-root',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizAppComponent {
}

