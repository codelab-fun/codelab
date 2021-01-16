import { TestRunner } from '@codelab/utils/src/lib/sandbox-runner/test-runner';
import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import { Runner } from '@codelab/utils/src/lib/sandbox-runner/runners/runner';

describe('Test runner', () => {
  it('sets initial state', () => {
    const scriptLoaderService = jasmine.createSpyObj<ScriptLoaderService>(
      'ScriptLoaderService',
      ['getScript']
    );
    const runner = jasmine.createSpyObj<Runner>('ScriptLoaderService', ['run']);

    const testRunner = new TestRunner(scriptLoaderService, runner);

    testRunner.run(
      'console.log(lol)',
      `
    describe('tests', () => {
      it('no tests have been setup!', () => {
        chai.expect(true).to.be.ok;
      });

      it('I will fail', () => {
        chai.expect(false).to.be.ok;
      });
    });

      `
    );
  });
});
