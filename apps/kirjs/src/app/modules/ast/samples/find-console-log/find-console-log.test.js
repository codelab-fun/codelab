function testThings(findConsoleLog, callback, args) {
  const log = args.log;
  const tests = [
    {
      code: `console.log('🐶🐶🐶')`,
      expected: true
    },
    {
      code: `lolconsole.log()`,
      expected: false
    },
    {
      code: `// don't use console.log();`,
      expected: false
    },
    {
      code: `'console.log()'`,
      expected: false
    },
    {
      code: `'hi'; console.log(123); 'bye'`,
      expected: true
    },
    {
      code: `console
      .log()`,
      expected: true
    },
    {
      code: `'Fake //'; console.log(123); `,
      expected: true
    },
    {
      code: `"console.log(123)"`,
      expected: false
    },
    {
      code: `\`
       console.log(123)\``,
      expected: false
    },
    {
      code: `' \\' console.log(123)'`,
      expected: false
    },
    {
      code: `console.lol()`,
      expected: false
    },
    {
      code: `"hello".log()`,
      expected: false
    },
    {
      code: `/* \` 
       */ console.log(123); \`
        \` + ''`,
      expected: true
    },
    {
      code: `function hello() {
   console.log(123);
 }`,
      expected: true
    },
    {
      code: `console.log({
        hello: 123
      })`,
      expected: true
    },
    {
      code: `console.log`,
      expected: false
    },
    {
      code: `hello(console.log)`,
      expected: false
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

        const result = !!findConsoleLog(test.code, args);
        const pass = result === test.expected;

        results.push({
          code: test.code,
          expected: test.expected,
          result,
          pass
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
