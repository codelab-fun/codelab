export const red = '#ff3f00';
export const defaultRowSize = 5;

export function colorMatchesExpected(a, i, c, test) {
  return test.actualMemory[i] === test.expectedMemory[i] ? '#ddd' : red;
}

export function outputCoordinates(config) {
  return [
    {
      y: -1,
      x: config.args[0],
      color: 'yellow',
      text: config.args[0]
    },

    {
      x: -1,
      y: config.args[1],
      color: 'yellow',
      text: config.args[1]
    },

    {
      x: config.args[0],
      y: config.args[1],
      color: 'lime',
      text: config.output
    }
  ];
}
