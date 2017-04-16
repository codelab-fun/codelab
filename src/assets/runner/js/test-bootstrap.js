function mochaBefore() {
  mocha.setup('bdd').reporter(function () {
  });
}
System.register("initTestBed", ['@angular/core/testing', '@angular/platform-browser-dynamic/testing'], function () {
  "use strict";
  var testing_1, testing_2;
  return {
    setters: [
      function (testing_1_1) {
        testing_1 = testing_1_1;
      },
      function (testing_2_1) {
        testing_2 = testing_2_1;
      }],
    execute: function () {
      testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
    }
  }
});

function flattenTests(suite) {
  const result = [];

  function extractSuite(suite) {
    suite.suites.forEach(function (suite) {
      extractSuite(suite);
    });
    suite.tests.forEach(function (test) {
      result.push(test.title);
    });
  }

  extractSuite(suite);
  return result;
}

function mochaAfter(runId) {
  window.top.postMessage({
    type: 'testList',
    tests: flattenTests(mocha.suite)
  }, '*');

  mocha.run()
    .on('pass', function (test, result) {
      window.top.postMessage({
        type: 'testResult',
        test: {
          title: test.title
        },
        result: result,
        pass: true,
        runId: runId
      }, '*');
    })
    .on('fail', function (test, error) {
      window.top.postMessage({
        type: 'testResult',
        test: {
          title: test.title
        },
        result: error.message,
        pass: false,
        runId: runId
      }, '*');
    })
    .on('end', function () {
      window.top.postMessage({
        type: 'testEnd'
      }, '*');
    });
}
