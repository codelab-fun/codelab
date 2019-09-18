export const evolveRowTests = [
  {
    args: [],
    memory: [0, 0, 0, 0, 0, 0],
    table: ['enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable'],
    expectedMemory: [0, 0, 0, 1, 1, 1],
    imports: {config: {step: 1, rowSize: 3}}
  },
  {
    args: [2],
    memory: [1, 1, 1, 1, 1, 1],
    table: ['disable', 'disable', 'disable', 'disable', 'disable', 'disable', 'disable', 'disable'],
    expectedMemory: [1, 1, 1, 0, 0, 0],
    imports: {config: {step: 1, rowSize: 3}}
  },
];

