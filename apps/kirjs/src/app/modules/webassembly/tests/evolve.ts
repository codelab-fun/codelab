export const evolveTests = [
  {
    args: [1],
    memory: [0, 0, 0, 0, 0, 0],
    table: ['enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable'],
    expectedMemory: [0, 0, 0, 1, 1, 1],
    imports: {config: {step: 1, rowSize: 3}}
  },
  {
    args: [2],
    memory: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    table: ['enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable'],
    expectedMemory: [0, 0, 0, 1, 1, 1, 1, 1, 1],
    imports: {config: {step: 1, rowSize: 3}}
  },

];

