import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  QUIZ_TOPIC_IMAGE = '../../../assets/images/dependency-injection-diagram.png';

  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigateByUrl('/question/1');
  }
}
