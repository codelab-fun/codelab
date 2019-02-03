import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';

@Component({
  selector: 'codelab-slides-custom-events',
  templateUrl: './custom-events.component.html',
  styleUrls: ['./custom-events.component.css']
})
export class CustomEventsComponent {
  code = {
    exercise1a: {
      // parent
      code: `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'parent',
                    template: \`
                        <child (childDidSomething)="parentDoSomething()"></child>
                    \`
                })
                export class ParentComponent {
                    parentDoSomething() {
                        console.log('child did something');
                    }
                }
            `,
      path: 'test.ts',
      type: 'typescript',
      match: /childDidSomething/
    },
    exercise1b: {
      // child
      code: `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'child',
                    template: \`
                        <button (click)="buttonClicked()"></button>
                    \`
                })
                export class ChildComponent {
                    @Output() childDidSomething = new EventEmitter<any>();

                    buttonClicked() {
                        this.childDidSomething.emit();
                    }
                }
            `,
      path: 'test.ts',
      type: 'typescript',
      match: ``
    }
  };

  exercises = [ng2tsConfig.milestones[5].exercises[1]];

  //   constructor(private exercises: Ng2TsExercises) {
  //     // this.exercise = exercises.getExercises(4, 1);
  //     // this.exercise2 = exercises.getExercises(4, 2);
  //   }
}
