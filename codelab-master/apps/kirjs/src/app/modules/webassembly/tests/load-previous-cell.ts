export const loadPreviousCellTests = [
  {
    args: [0],
    memory: [0, 0, 0],
    output: 0,
    imports: { config: { step: 1, rowSize: 3 } }
  },
  {
    args: [0],
    memory: [1, 0, 0],
    output: 1,
    imports: { config: { step: 1, rowSize: 3 } }
  },
  {
    args: [2],
    memory: [1, 0, 1],
    output: 1,
    imports: { config: { step: 1, rowSize: 3 } }
  },
  {
    args: [2],
    memory: [1, 0, 1, 1, 0, 1],
    output: 1,
    imports: { config: { step: 2, rowSize: 3 } }
  },
  {
    args: [2],
    memory: [1, 0, 1, 1, 0, 0],
    output: 0,
    imports: { config: { step: 2, rowSize: 3 } }
  }
];
