import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {

  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigateByUrl('/quiz/question/1');
  }
}
