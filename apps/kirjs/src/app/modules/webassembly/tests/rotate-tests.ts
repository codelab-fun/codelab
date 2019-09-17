export const rotateTests = [
  {
    args: [0, 5],
    imports: {config: {rowSize: 5}},
    output: 0
  },
  {
    args: [-1, 5],
    imports: {config: {rowSize: 5}},
    output: 4
  },
  {
    args: [6, 5],
    imports: {config: {rowSize: 5}},
    output: 1
  },
  {
    args: [11, 10],
    imports: {config: {rowSize: 10}},
    output: 1
  },
];
