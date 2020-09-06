function testThings(findDebugger, callback, args) {
  const log = args.log;
  const tests = [
    {
      title: `// Line 3
describe('test', ()=>{
it('test', ()=>{
    expect(true).toBe(true);
  })      
})`,
      test(func, args) {
        let result = func(this.title, 3, args);
        return result && result.includes && result.includes('fit');
      }
    },

    {
      title: `// Line 22
describe('test', ()=>{
  it('test', ()=>{
    expect(true).toBe(true);
  })      
})`,
      test(func, args) {
        let result = func(this.title, 1, args);
        return result && result.includes && !result.includes('fit');
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
