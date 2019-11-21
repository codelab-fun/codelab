import produce from 'immer';

interface TestAction {
  type: 'terminate' | 'reset' | 'result' | 'error';
  data: any;
}

interface TestResult {
  pass: boolean;
  name: string;
  error?: string;
}

export interface TestRunResult {
  tests: TestResult[];
  error?: string;
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
