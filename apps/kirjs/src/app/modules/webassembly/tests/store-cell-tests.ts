import { memoryRepViz } from './load-cell';

export const storeCellTests = [
  {
    args: [1, 1],
    imports: { config: { rowSize: 3, step: 0 } },
    memory: [0, 1, 0],
    expectedMemory: [0, 1, 0],
    viz: memoryRepViz
  },
  {
    args: [1, 0],
    imports: { config: { rowSize: 3, step: 0 } },
    memory: [0, 1, 0],
    expectedMemory: [0, 0, 0],
    viz: memoryRepViz
  }
];
