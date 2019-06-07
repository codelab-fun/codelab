import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';

@Component({
  selector: 'codelab-slides-dependency-injection',
  templateUrl: './dependency-injection.component.html',
  styleUrls: ['./dependency-injection.component.css']
})
export class DependencyInjectionComponent implements OnInit {
  t: { [key: string]: string };
  exercise;

  // TODO(kirjs): we can't access tanslation in OnInit hook iwht static set to false
  // need to consider changing how we set code
  @ViewChild('translations', { static: true }) translation;
  code = {};

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(3, 1);
  }

  ngOnInit() {
    this.t = extractMessages(this.translation);

    this.code = {
      withOutDI: {
        code: `export class Person {
  profession: Job;

  constructor() {
    this.profession = new Job();
  }
}`,
        code2: `import {ProfessionsEnum} from './professions';

export class Person {
  profession: Job;

  constructor() {
    const Schedule = new Schedule(ProfessionsEnum.ENGINEER);
    this.profession = new Job(ProfessionsEnum.ENGINEER, Schedule, /* TODO: Find how to inject salary*/);
  }
}`,

        matches: {
          noDI: /this.*/
        },
        readonly: true,
        path: 'person-noDI.ts',
        type: 'typescript'
      },

      withDI: {
        code: `export class Person {
  /**
   ${this.t.shorthandMakesProfessionAvailable}
   */
  constructor(public profession: Job) {}
}`,
        matches: {
          constructor: /constructor.*/
        },
        readonly: true,
        path: 'personDI.ts',
        type: 'typescript'
      },
      withDITesting: {
        code: `const mockProfession = new Job('lawyer');
it('should create a Person with the right profession', () => {
  const person = new Person(mockProfession);
  // ${this.t.assumingJobHasPropTitle}
  expect(person.profession.title).toEqual('lawyer');
});
`,
        matches: {
          constructor: /constructor.*/
        },
        readonly: true,
        path: 'personDI.spec.ts',
        type: 'typescript'
      },

      classAsInjectable: {
        code: `import { Injectable } from '@angular/core';

@Injectable()
export class UnitConverterService {
  // ...
}`,
        matches: {
          injectable: /@I[^]*?\)[^]/
        },
        readonly: true,
        type: 'typescript'
      },

      provideInjectable: {
        code: `import { NgModule } from '@angular/core';
import { UnitConverterService } from '../services/unit-converter.service';
import { UnitConversionComponent } from './unit-conversion.component';

@NgModule({
  declarations: [ UnitConversionComponent ],
  providers: [ UnitConverterService ]
})
export class AppModule {}`,
        matches: {
          providers: /providers.*/
        },
        readonly: true,
        type: 'typescript'
      },

      consumeInjectable: {
        code: `import { Component } from '@angular/core';
import { UnitConverterService } from '../services/unit-converter.service';

@Component({...})
export class UnitConversionComponent {
  constructor(private converter: UnitConverterService) {}
}`,
        matches: {
          constructor: /constructor.*/
        }
      }
    };
  }
}
