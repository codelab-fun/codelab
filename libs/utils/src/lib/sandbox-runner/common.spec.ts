import { testReducer } from '../sandbox-runner/common';

fdescribe('Test reducer', () => {
  const data = {
    tests: [
      {
        name: 'hi',
        pass: undefined
      },
      {
        name: 'bye',
        pass: undefined
      }
    ]
  };

  it('sets initial state', () => {
    const result = testReducer(
      { tests: [] },
      {
        type: 'reset',
        data: ['hi', 'bye']
      }
    );

    expect(result).toEqual(data);
  });

  it('sets passed state', () => {
    const result = testReducer(data, {
      type: 'result',
      data: {
        name: 'hi',
        pass: true
      }
    });

    expect(result.tests[0].pass).toEqual(true);
    expect(result.tests[1].pass).toEqual(undefined);
  });

  it('sets an error', () => {
    const result = testReducer(data, {
      type: 'error',
      data: 'lol'
    });

    expect(result.tests).toEqual(data.tests);
    expect(result.error).toEqual('lol');
  });
});
