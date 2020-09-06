import { Component } from '@angular/core';
import {
  bootstrap,
  builder,
  exercise,
  stylesheet
} from '../../../../../codelab/src/app/shared/helpers/helpers';

declare const require;

@Component({
  selector: 'kirjs-svg-race',
  templateUrl: './svg-race.component.html',
  styleUrls: ['./svg-race.component.css']
})
export class SvgRaceComponent {
  fontSize = 20;

  tracks = {
    advanced: `M50 450 Q -50 -60 300 50
Q 380 75 400 150
Q 450 350 300 150
Q 250 50 150 120
Q 50 250 150 320
Q 250 420 450 320

`
  };
  input = 'hi';
  input2: any;

  constructor() {}
}
