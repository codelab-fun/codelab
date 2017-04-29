import {Component} from '@angular/core';


@Component({
  selector: 'app-dependency-injection',
  templateUrl: './dependency-injection.component.html',
  styleUrls: ['./dependency-injection.component.css']
})
export class DependencyInjectionComponent {
  title = 'Dependency Injection';
  description = '';
  prereqs = 'Components, Dependency Injection';

  code = {
    withOutDI: {
      code: `export class Person {
  profession: Profession;

  constructor() {
    this.profession = new Profession();
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
   * Typescript shorthand makes 'profession'
   * available to component instance.
   */
  constructor(public profession: Profession) {}
}`,
      matches: {
        constructor: /constructor.*/
      },
      readonly: true,
      path: 'personDI.ts',
      type: 'typescript'
    },

    classAsInjectable: {
      code: `import { Injectable } from '@angular/core';

@Injectable()
export class MyService {
  ...
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
  providers: [ UnitConverterService ],
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
  constructor(converter: UnitConverterService) {}
}`,
      matches: {
        constructor: /constructor.*/
      }
    }
  };

}
