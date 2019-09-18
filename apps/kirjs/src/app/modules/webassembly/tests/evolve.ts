import { colorMatchesExpected, defaultRowSize } from './common';

const viz = {
  rowSize: defaultRowSize,
  text: a => a,
  memory: (test) => test.actualMemory,
  color: colorMatchesExpected,
};

export const evolveTests = [
  {
    args: [1],
    memory: [
      0, 0, 0, 1, 0
    ],
    table: ['enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable'],
    expectedMemory: [
      0, 0, 0, 1, 0,
      1, 1, 1, 1, 1
    ],
    imports: {config: {step: 1, rowSize: defaultRowSize}},
    viz
  },
  {
    args: [2],
    memory: [
      0, 0, 0, 1, 1
    ],
    table: ['enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable', 'enable'],
    expectedMemory: [
      0, 0, 0, 1, 1,
      1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
    ],
    imports: {config: {step: 2, rowSize: defaultRowSize}},
    viz
  },

];

