import { Component, OnInit } from '@angular/core';

declare const require;

@Component({
  selector: 'sync-code-editor',
  templateUrl: './sync-code-editor.component.html',
  styleUrls: ['./sync-code-editor.component.css']
})
export class SyncCodeEditorComponent implements OnInit {
  questions = [
    {
      title: 'Write an add function',
      code: `function add(a,b){

}`,
      tests: `
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
  tests = require('!!raw-loader!./tests.ts');

  constructor() {}

  ngOnInit() {}

  update(q: any, $event: any) {}
}
