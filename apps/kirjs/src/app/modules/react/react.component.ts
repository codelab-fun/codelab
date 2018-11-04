import { Component } from '@angular/core';
import { reactExercise } from '../../../../../angular-presentation/src/app/exercise/helpers/helpers';


@Component({
  selector: 'slides-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.css']
})
export class ReactComponent {

  code = {
    basic: {
      ...reactExercise(
        `ReactDOM.render(
  <h1>Hello</h1>,
  document.querySelector('#app')
);`),
      runner: 'React'
    }
  };

  constructor() {
  }

}
