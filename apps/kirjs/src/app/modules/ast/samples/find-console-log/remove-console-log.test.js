function testThings(findConsoleLog, callback, args) {
  const log = args.log;
  const tests = [
    {
      code: `console.log('🐶🐶🐶')`,
      expected: ''
    },
    {
      code: `lolconsole.log();`,
      expected: 'lolconsole.log();'
    },
    {
      code: `console.lol();`,
      expected: `console.lol();`
    },
    {
      code: `// don't use console.log();`,
      expected: `// don't use console.log();`
    },
    {
      code: `'console.log()';`,
      expected: `'console.log()';`
    },
    {
      code: `'hi'; console.log(123); 'bye';`,
      expected: `'hi';\n'bye';`
    },
    {
      code: `console
      .log()`,
      expected: ``
    },
    {
      code: `"console.log(123)";`,
      expected: `"console.log(123)";`
    },
    {
      code: `\`
       console.log(1234)\`;`,
      expected: `\`
       console.log(1234)\`;`
    },
    {
      code: `' \\' console.log(123)';`,
      expected: `' \\' console.log(123)';`
    },
    {
      code: `/* \` 
       */ console.log(123); \`
        \` + '';`,
      expected: `\`
        \` + ''; /* \` 
                       */`
    },
    {
      code: `hello(console.log);`,
      expected: `hello(console.log);`
    }
  ];

  let results = [];
  let failed = false;
  for (let i in tests) {
    if (tests.hasOwnProperty(i)) {
      let test = tests[i];
      if (!failed) {
        const logs = [];
        args.log = value => {
          logs.push(value);
        };

        let result = false;

        let error;
        try {
          result = findConsoleLog(test.code, args);
        } catch (e) {
          error = e;
        }

        const pass = result === test.expected;

        results.push({
          code: test.code,
          expected: test.expected,
          result,
          pass,
          error
        });
        if (!pass) {
          failed = true;
          logs.map(log);
        }
      } else {
        results.push({ code: test.code, pass: false });
      }
    }
  }

  callback(results);
}

/**

 return code
 .replace(/\/\/.*|'.*?[^\\]'|".*"|`[\s\S]+`/)
 .match(/\bdebugger\b/)
 */
