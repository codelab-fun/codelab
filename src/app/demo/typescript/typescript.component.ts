import {Component} from '@angular/core';

import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})

export class TypescriptComponent {
  title = 'TypeScript';
  description = 'Human give me attention meow ask to go outside and ask to come inside and ask to go outside and ask to come inside so playing with balls of wool.';
  prereqs = 'Components, Dependency Injection';

  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ]
}

