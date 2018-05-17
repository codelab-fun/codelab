function testThings(findConsoleLog, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `console.log('123')`,
      test(func, args) {
        return '' === func(this.title, args);
      }
    },
    {
      title: `lolconsole.log();`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `console.lol();`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `// don't use console.log();`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `'console.log()';`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `'hi'; console.log(123); 'bye';`,
      test(func, args) {

        return `'hi';
'bye';` === func(this.title, args);
      }
    },
    {
      title: `console
      .log()`,
      test(func, args) {
        return `` === func(this.title, args);
      }
    },
    {
      title: `"console.log(123)";`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `\`
       console.log(1234)\`;`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `' \\' console.log(123)';`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `/* \` 
       */ console.log(123); \`
        \` + '';`,
      test(func, args) {
        return  !func(this.title, args).includes('console.log');
      }
    },
    {
      title: `hello(console.log);`,
      test(func, args) {
        return this.title === func(this.title, args);
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
        results.push(({title: test.title, pass: pass}));
        if (!pass) {
          failed = true;
          logs.map(log);
        }
      } else {
        results.push(({title: test.title, pass: false}));
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
