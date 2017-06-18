import { Component } from '@angular/core';
import { vueJsExercise } from '../../../exercise/helpers/helpers';

@Component({
  selector: 'slides-vue',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  code = {
    basic: {
      ...vueJsExercise(`var app = new Vue({
  el: '#app',
  template: '<h1>Hello {{name}}!</h1>',
  data: {
    name: 'Vue'
  }
  

})`),
      runner: 'Vue'
    }
  };

  constructor() {
  }

}
