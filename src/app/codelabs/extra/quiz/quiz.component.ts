import { Component } from '@angular/core';
import { displayAngularComponentWithHtml } from '../../../exercise/helpers/helpers';


@Component({
  selector: 'slides-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  title = 'Quiz';
  description = '';
  prereqs = '';

  constructor() {
    console.log(123);
  }

}


