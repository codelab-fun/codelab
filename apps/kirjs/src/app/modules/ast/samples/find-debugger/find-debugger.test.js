function testThings(findDebugger, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `debugger`,
      shouldPass: true,
      test(func, args) {
        return !!func(this.title, args);
      }
    },
    {
      title: `debuggerStart()`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `//debugger
console.log('hi');`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `'debugger'`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `'hi'; debugger; 'bye'`,
      shouldPass: true,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `'Fake //'; debugger; `,
      shouldPass: true,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `"debugger"`,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `\`
       debugger\``,
      shouldPass: false,
      test(func, args) {
        return !func(this.title, args);
      }
    },
    {
      title: `' \\' debugger'`,
      test(func, args) {
        return !func(this.title, args);
      },
      shouldPass: false
    },
    {
      title: `/* \` 
       */ debugger; \`
        \` + ''`,
      test(func, args) {
        return func(this.title, args);
      }
    },
    {
      title: `function hello(){ debugger; }
      
      
      class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
`,
      test(func, args) {
        return func(this.title, args);
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
        results.push({
          shouldPass: test.shouldPass,
          title: test.title,
          pass: pass
        });
        if (!pass) {
          failed = true;
          logs.map(log);
        }
      } else {
        results.push({
          shouldPass: test.shouldPass,
          title: test.title,
          pass: false
        });
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
