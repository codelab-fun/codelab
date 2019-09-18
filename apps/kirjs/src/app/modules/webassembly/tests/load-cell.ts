import { outputCoordinates } from './common';

const rowSize = 3;
export const loadCellTests = [
  {
    args: [0, 0],
    memory: [0, 0, 0],
    output: 0,
    imports: {config: {rowSize}}
  },
  {
    args: [0, 0],
    memory: [1, 0, 0],
    output: 1,
    imports: {config: {rowSize}}
  },
  {
    args: [2, 0],
    memory: [1, 0, 1],
    output: 1,
    imports: {config: {rowSize}}
  },
  {
    args: [2, 1],
    memory: [
      1, 0, 1,
      1, 0, 1
    ],
    viz: {
      rowSize,
      extras: outputCoordinates,
      memory: c => c.memory,
      color: '#ddd',
    },
    output: 1,
    imports: {config: {rowSize}}
  },
  {
    args: [2, 1],
    memory: [
      1, 0, 1,
      1, 0, 0
    ],
    output: 0,

    imports: {config: {rowSize}}
  }
];

