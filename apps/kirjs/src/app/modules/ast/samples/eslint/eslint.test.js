function testThings(findDebugger, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `describe('test', ()=>{
  fit('test', ()=>{
    expect(true).toBe(true);
  })      
})`,
      test(func, args) {
        let result = func(this.title, args);
        return result && result.includes && !result.includes('fit');
      }
    },
    {
      title: `describe('test', ()=>{
  fit('fits?', ()=>{    
    let fit = true;
    expect(fit).toBe(true);    
  })      
})`,
      test(func, args) {
        let result = func(this.title, args);
        return (
          result &&
          result.includes &&
          !result.includes('fit(') &&
          result.includes('let fit')
        );
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
