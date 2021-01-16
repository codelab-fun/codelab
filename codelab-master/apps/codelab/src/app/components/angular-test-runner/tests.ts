export function handleTestMessage(message, tests) {
  if (!message.data || !message.data.type) {
    return tests;
  }

  if (message.data.type === 'testList') {
    return message.data.tests.map(test => ({
      title: test
    }));
  }

  if (message.data.type === 'testEnd') {
    return tests;
  }

  if (message.data.type === 'testResult') {
    return tests.map(test => {
      if (test.title === message.data.test.title) {
        test.pass = message.data.pass;
        test.result = message.data.result;
      }
      return test;
    });
  }

  return tests;
}
