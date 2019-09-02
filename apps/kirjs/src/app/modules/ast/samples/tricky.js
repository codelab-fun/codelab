debugger;
debuggerStart();
//debugger
console.log('hi');
console.log('debugger');
`'hi'; debugger; 'bye'`;
let x = 'Fake //';
('debugger');
`
       debugger\`
       ' \\' debugger'
       `;
/* \`
 */
debugger;
`
    \` + ''`;
function hello() {
  debugger;
}

console.log(
  1,
  function hello() {
    console.log(function hi() {
      console.log(123);
    });
  },
  3,
  4,
  5,
  6
);

call(1, 2, 3, 4, 5, 5);
describe('test', () => {
  fit('test', () => {
    expect(true).toBe(true);
  });
});

describe('test', () => {
  fit('fits?', () => {
    let fit = true;
    expect(fit).toBe(true);
  });
});
