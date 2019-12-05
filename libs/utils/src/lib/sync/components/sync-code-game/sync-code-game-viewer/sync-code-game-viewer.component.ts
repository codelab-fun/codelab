import { Component, OnInit } from '@angular/core';
declare const require;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-sync-code-game-viewer',
  templateUrl: './sync-code-game-viewer.component.html',
  styleUrls: ['./sync-code-game-viewer.component.css']
})
export class SyncCodeGameViewerComponent implements OnInit {
  questions = [
    {
      title: 'Write an add function',
      code: `export function add(a,b){

}
console.log('hi');
`,
      tests: `
    import {add} from './main';
    describe('tests', () => {
      it('Function add exists', () => {
        chai.expect(typeof add).to.equal('function');
      });

      it('Function add adds two numbers', () => {
        chai.expect(add(2,2)).to.equal(4);
      });

      it('Function add adds two other numbers', () => {
        chai.expect(add(24,66)).to.equal(90);
      });
    });`
    },
    {
      title: 'Write an subtract function',
      code: `function subtract(a,b){

}`,
      tests: `
    describe('tests', () => {
      it('Function subtract exists', () => {
        chai.expect(typeof subtract).to.equal('function');
      });

      it('Subtracts two numbers', () => {
        chai.expect(subtract(2,2)).to.equal(0);
      });

      it('subtracts two other numbers', () => {
        chai.expect(subtract(24,66)).to.equal(-42);
      });
    });`
    }
  ];
  code = `function add(a,b){
    return a+b;
}`;
  tests = require('!!raw-loader!../tests.ts');

  update(info) {
    console.log(JSON.stringify(info));
  }

  constructor() {}

  ngOnInit() {}
}
