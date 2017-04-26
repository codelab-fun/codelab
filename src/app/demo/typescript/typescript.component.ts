import {Component} from '@angular/core';

import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypescriptComponent {
  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ]
}

