function testThings(findDebugger, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `debugger`,
      test(func, args) {
        return '' === func(this.title, args);
      }
    },
    {
      title: `debuggerStart();`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `//debugger
console.log('hi');`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `'debugger';`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `'hi'; debugger; 'bye';`,
      test(func, args) {
        return (
          `'hi';
'bye';` === func(this.title, args)
        );
      }
    },
    {
      title: `'Fake //'; debugger; `,
      test(func, args) {
        return `'Fake //';` === func(this.title, args);
      }
    },
    {
      title: `"debugger";`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `\`
       debugger\`;`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `' \\' debugger';`,
      test(func, args) {
        return this.title === func(this.title, args);
      }
    },
    {
      title: `/* \` 
       */ debugger; \`
        \` + '';`,
      test(func, args) {
        return !func(this.title, args).includes('debugger');
      }
    },
    {
      title: `function hello(){ debugger; }`,
      test(func, args) {
        return `function hello() {}` === func(this.title, args);
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
        args.log = value => {
          logs.push(value);
        };
        let pass = test.test(findDebugger, args);
        results.push({ title: test.title, pass: pass });
        if (!pass) {
          failed = true;
          logs.map(log);
        }
      } else {
        results.push({ title: test.title, pass: false });
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
