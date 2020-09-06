export const getCellScoreTests = [
  {
    args: [1],
    memory: [0, 0, 1],
    output: 0b001,
    imports: { config: { rowSize: 3, step: 1 } }
  },
  {
    args: [2],
    memory: [1, 0, 0],
    output: 0b001,
    imports: { config: { rowSize: 3, step: 1 } }
  },
  {
    args: [1],
    memory: [1, 1, 0],
    output: 0b110,
    imports: { config: { rowSize: 3, step: 1 } }
  }
];
