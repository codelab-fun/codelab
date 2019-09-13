export const calcNextStateTests = [
  {
    args: [1],
    memory: [1, 1, 1],
    output: 0b1111,
    imports: {config: {rowSize: 3, step: 1}}
  },
  {
    args: [1],
    memory: [1, 1, 0],
    output: 0b110,
    imports: {config: {rowSize: 3, step: 1}}
  },
  {
    args: [1],
    output: 0b10,
    imports: {config: {rowSize: 3, step: 1}},
  },
  {
    args: [1],
    output: 0b100,
    imports: {config: {rowSize: 3, step: 1}},
  },
  {
    args: [1],
    output: 0b111,
    imports: {config: {rowSize: 3, step: 1}},
  },
];

