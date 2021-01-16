import produce from 'immer';
import { TestRunResult } from '../test-results/common';

interface TestAction {
  type: 'terminate' | 'reset' | 'result' | 'error';
  data: any;
}

export const testReducer = produce(
  (data: TestRunResult = { tests: [] }, action: TestAction): TestRunResult => {
    if (action.type === 'reset') {
      return {
        tests: action.data.map(name => ({
          name,
          pass: undefined
        }))
      };
    }
    if (action.type === 'result') {
      const index = data.tests.findIndex(
        test => action.data.name === test.name
      );
      if (index === -1) {
        throw new Error('Test missing');
      }

      data.tests[index] = { ...data.tests[index], ...action.data };
      return data;
    }

    if (action.type === 'error') {
      data.error = action.data;
      return data;
    }

    return data;
  }
);
