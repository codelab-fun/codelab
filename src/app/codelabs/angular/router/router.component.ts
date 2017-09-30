import { CodelabFile } from '../../../exercise/helpers/codelabFile';
import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../ng2ts/ng2ts';

declare const require;


@Component({
  selector: 'slides-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent {
  code = {
    config: [
      CodelabFile.TypeScriptFile('app.component').setCode(require('!!raw-loader!./exercises/simple-router/app.component.ts')),
      CodelabFile.TypeScriptFile('app.module')
        .setCode(require('!!raw-loader!./exercises/simple-router/app.module.ts'))
        .withHighlight(/const routes[\s\S]*?];[\s\S]/),
      CodelabFile.TypeScriptFile('components/kitten').setCode(require('!!raw-loader!./exercises/simple-router/components/kitten.ts')),
      CodelabFile.TypeScriptFile('components/puppy').setCode(require('!!raw-loader!./exercises/simple-router/components/puppy.ts')),
      CodelabFile.TypeScriptFile('bootstrap').setCode(require('!!raw-loader!./exercises/simple-router/main.ts')).makeBootstrappable(),
      CodelabFile.Html('app.component').setCode(require('!!raw-loader!./exercises/simple-router/app.component.html')),
      CodelabFile.Html('index').setCode(require('!!raw-loader!./exercises/simple-router/index.html'))
    ],
    config2: [
      CodelabFile.TypeScriptFile('app.component').setCode(require('!!raw-loader!./exercises/simple-router/app.component.ts')),
      CodelabFile.TypeScriptFile('app.module')
        .setCode(require('!!raw-loader!./exercises/simple-router/app.module.ts'))
        .withHighlight(/const/),
      CodelabFile.TypeScriptFile('components/kitten').setCode(require('!!raw-loader!./exercises/simple-router/components/kitten.ts')),
      CodelabFile.TypeScriptFile('components/puppy').setCode(require('!!raw-loader!./exercises/simple-router/components/puppy.ts')),
      CodelabFile.TypeScriptFile('bootstrap').setCode(require('!!raw-loader!./exercises/simple-router/main.ts')).makeBootstrappable(),
      CodelabFile.Html('app.component').setCode(require('!!raw-loader!./exercises/simple-router/app.component.html')),
      CodelabFile.Html('index').setCode(require('!!raw-loader!./exercises/simple-router/index.html'))
    ],
  };

  exercises = [
    ng2tsConfig.milestones[6].exercises[0]
  ];

//   constructor(private exercises: Ng2TsExercises) {
//     // this.exercise = exercises.getExercises(4, 1);
//     // this.exercise2 = exercises.getExercises(4, 2);
//   }
}
