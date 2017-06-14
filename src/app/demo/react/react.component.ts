import { Component } from '@angular/core';
import { reactExercise } from '../../exercise/helpers/helpers';

@Component({
  selector: 'slides-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.css']
})
export class ReactComponent {

  code = {
    basic: {
      ...reactExercise(`ReactDOM.render(React.createElement('div', null, 'Hello world'), document.querySelector('#app'))`),
      runner: 'React'
    }
  };

  constructor() {
  }

}
