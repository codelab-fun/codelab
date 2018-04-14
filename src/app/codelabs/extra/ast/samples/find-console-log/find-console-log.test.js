function testThings(findConsoleLog, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `console.log('123')`,
      shouldPass: true,
      test(func, args) {
        return !!func(this.title, args);
      }
    },
    {
      title: `lolconsole.log()`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `// don't use console.log();`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `'console.log()'`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `'hi'; console.log(123); 'bye'`,
      shouldPass: true,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `console
      .log()`,
      shouldPass: true,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `'Fake //'; console.log(123); `,
      shouldPass: true,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `"console.log(123)"`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `\`
       console.log(123)\``,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `' \\' console.log(123)'`,
      test(func, args) {
        return !func(this.title, args);
      },
      shouldPass: false,
    },
    {
      title: `/* \` 
       */ console.log(123); \`
        \` + ''`,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `function hello() {
   console.log(123);
 }`,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `console.log({
        hello: 123
      })`,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `console.log`,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `hello(console.log)`,
      test(func, args) {
        return !func(this.title, args);
      }
    }
  ];


  let results = [];
  let failed = false;
  for (let i in tests) {
    if (tests.hasOwnProperty(i)) {
      let test = tests[i];
      if (!failed) {
        const logs = [];
        args.log = (value) => {
          logs.push(value);
        };
        let pass = test.test(findConsoleLog, args);
        results.push(({shouldPass: test.shouldPass, title: test.title, pass: pass}));
        if (!pass) {
          failed = true;
          logs.map(log);
        }
      } else {
        results.push(({shouldPass: test.shouldPass, title: test.title, pass: false}));
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
