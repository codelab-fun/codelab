import { Component } from '@angular/core';
import { vueJsExercise } from '../../exercise/helpers/helpers';

@Component({
  selector: 'slides-vue',
  templateUrl: './vue.component.html',
  styleUrls: ['./vue.component.css']
})
export class VueComponent {

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
