import { Component } from '@angular/core';
import { displayAngularComponent } from '../../../shared/helpers/helpers';

@Component({
  selector: 'codelab-slides-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent {
  code = {
    chainedPipesExample: {
      template: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Salvador's Dali DOB</h1>
  <p>{{ dob }}</p>\`
})
export class AppComponent {
  dob = new Date(1904, 4, 11);
}`)
    },
    workingPipes: {
      template: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Salvador's Dali DOB</h1>
  <p>{{dob}}</p>
  <p>{{ dob | date }}</p>\`
})
export class AppComponent {
  dob = new Date(1904, 4, 11);
}`),
      matches: {
        pipeOperator: '|'
      }
    },
    argumentPipes: {
      template: `<p>Your budget is {{budget | currency:'AUD'}}</p>
<p>Your truncated name is {{name | substring:1:4}}</p>
<!-- Maryanne -> Mary -->`,
      readonly: true,
      path: 'argument.pipe.html'
    },
    filterPipes: {
      template: `<!-- Here we pipe team.roster through
  a custom “notInjured” pipe,
  then render each player that isn't injured. -->
<ul>
  <li *ngFor="let player of (team.roster | notInjured)">
    {{player.name}}
  </li>
</ul>`,
      readonly: true,
      path: 'filter.pipe.html'
    },
    creatingAPipe: {
      template: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'substring'})
export class SubstringPipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return (value || '').slice(start, end);
  }
}`,
      matches: {
        exportClass: /export.*/,
        decorator: /@Pipe/,
        pipeTransform: /PipeTransform/,
        method: /transform[^]*?\)[^]/
      },
      readonly: true,
      path: 'substring.pipe.ts',
      type: 'typescript'
    }
  };

  constructor() {}
}
