import {Component} from '@angular/core';
import {TypescriptExercises} from './typescript.exercises';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypescriptComponent {
  readonly exercises = TypescriptExercises;

  readonly sampleCode =
`export class Hello {
  constructor(private readonly name: string){}
  
  hello(): string {
     const greeting = 'Hello';
		 return \`\${greeting} \${name}!\`;
  }
}`;
  
}
