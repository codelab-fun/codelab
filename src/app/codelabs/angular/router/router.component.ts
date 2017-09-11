// import {Ng2TsExercises} from '../../../../ng2ts/ng2ts';

import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../ng2ts/ng2ts';

@Component({
    selector: 'slides-router',
    templateUrl: './router.component.html',
    styleUrls: ['./router.component.css']
})
export class RouterComponent {
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

    exercises = [
        ng2tsConfig.milestones[6].exercises[0]
    ];

//   constructor(private exercises: Ng2TsExercises) {
//     // this.exercise = exercises.getExercises(4, 1);
//     // this.exercise2 = exercises.getExercises(4, 2);
//   }
}
