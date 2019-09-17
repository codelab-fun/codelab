export const loadCellTests = [
  {
    args: [0, 0],
    memory: [0, 0, 0],
    output: 0,
    imports: {config: {rowSize: 3}}
  },
  {
    args: [0, 0],
    memory: [1, 0, 0],
    output: 1,
    imports: {config: {rowSize: 3}}
  },
  {
    args: [2, 0],
    memory: [1, 0, 1],
    output: 1,
    imports: {config: {rowSize: 3}}
  },
  {
    args: [2, 1],
    memory: [
      1, 0, 1,
      1, 0, 1
    ],
    output: 1,
    imports: {config: {rowSize: 3}}
  },
  {
    args: [2, 1],
    memory: [
      1, 0, 1,
      1, 0, 0
    ],
    output: 0,
    imports: {config: {rowSize: 3}}
  }
];

