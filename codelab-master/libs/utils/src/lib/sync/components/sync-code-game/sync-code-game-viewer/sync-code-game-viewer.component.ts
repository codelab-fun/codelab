import { Component, OnInit } from '@angular/core';
import { SyncCodeGameService } from '@codelab/utils/src/lib/sync/components/sync-code-game/sync-code-game.service';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

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
      code: `export function result(): number {
      return 0;
}
`,
      tests: `
    import {result} from './main';

    describe('result', () => {
      it('Function "result" exists', () => {
        chai.expect(typeof result).to.equal('function');
      });

      it('Is greater than 0', () => { chai.expect(result()).to.be.gte(0);});
      it('Is greater than 1', () => { chai.expect(result()).to.be.gte(1); });
      it('Is greater than 2', () => { chai.expect(result()).to.be.gte(2); });
      it('Is greater than 3', () => { chai.expect(result()).to.be.gte(3); });
      it('Is greater than 4', () => { chai.expect(result()).to.be.gte(4); });
      it('Is greater than 5', () => { chai.expect(result()).to.be.gte(5); });
      it('Is greater than 6', () => { chai.expect(result()).to.be.gte(6); });
      it('Is greater than 7', () => { chai.expect(result()).to.be.gte(7); });
      it('Is greater than 8', () => { chai.expect(result()).to.be.gte(8); });
      it('Is greater than 9', () => { chai.expect(result()).to.be.gte(9); });
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

  maxScore = 0;

  update(result: TestRunResult) {
    const score = result.error ? 0 : result.tests.filter(t => t.pass).length;

    const maxScore = Math.max(this.maxScore, score);
    this.maxScore = maxScore;

    this.codeGameService.viewerStatus.set({
      score,
      maxScore,
      code: this.questions[0].code
    });
  }

  constructor(private readonly codeGameService: SyncCodeGameService) {}

  ngOnInit() {}
}
