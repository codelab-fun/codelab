export const rotateTests = [
  {
    args: [0],
    imports: {config: {rowSize: 10}},
    output: 0
  },
  {
    args: [-1],
    imports: {config: {rowSize: 10}},
    output: 9
  },
  {
    args: [11],
    imports: {config: {rowSize: 10}},
    output: 1
  },

];
