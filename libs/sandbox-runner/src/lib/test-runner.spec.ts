import { ScriptLoaderService } from "./script-loader/script-loader.service";
import { TestRunner } from "./test-runner";
import { Runner } from "./runners/runner";


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
