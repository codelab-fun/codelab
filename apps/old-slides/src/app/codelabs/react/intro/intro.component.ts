import { Component } from '@angular/core';
import { reactExercise } from '../../../../../../../libs/exercise/src/helpers/helpers';

@Component({
  selector: 'slides-react',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  code = {
    basic: {
      ...reactExercise(`ReactDOM.render(React.createElement('div', null, 'Hello world'), document.querySelector('#app'))`),
      runner: 'React'
    }
  };

  constructor() {
  }

}
