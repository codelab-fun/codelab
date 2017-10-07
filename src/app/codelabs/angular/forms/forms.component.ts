import { CodelabFile } from '../../../exercise/helpers/codelabFile';
import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../ng2ts/ng2ts';

declare const require;


@Component({
  selector: 'slides-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  code = {};

  exercises = [
    ng2tsConfig.milestones[6].exercises[0]
  ];

}
