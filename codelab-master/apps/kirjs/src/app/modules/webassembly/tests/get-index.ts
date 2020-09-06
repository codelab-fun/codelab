import { outputCoordinates } from './common';

const rowSize = 5;

const viz = {
  rowSize,
  text: (a, i) => i,
  extras: outputCoordinates
};
export const getIndex = [
  {
    args: [0, 0],
    imports: { config: { rowSize: rowSize } },
    output: 0,
    viz
  },
  {
    args: [1, 0],
    imports: { config: { rowSize: rowSize } },
    output: 1,
    viz
  },
  {
    args: [0, 1],
    imports: { config: { rowSize: rowSize } },
    output: rowSize,
    viz
  },
  {
    args: [0, 1],
    imports: { config: { rowSize: 4 } },
    output: 4,
    viz
  },
  {
    args: [3, 3],
    imports: { config: { rowSize: 4 } },
    output: 15,
    viz
  }
];
