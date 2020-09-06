const rowSize = 2;

export const memoryRepViz = {
  rowSize: rowSize * 4,
  text: (a, i, c, test) => {
    return i % 4 === 0 ? test.memory[i / 4] : '';
  },
  color: (a, i, o, test) => {
    const c = (test.args[1] * rowSize + test.args[0]) * 4;
    if (i >= c && i < c + 4) {
      return 'lime';
    }
    return Math.floor((i / 4) % 2) === 0 ? '#ddd' : '#999';
  }
};

export const loadCellTests = [
  {
    args: [0, 0],
    memory: [0, 0, 0],
    output: 0,
    imports: { config: { rowSize } },
    viz: memoryRepViz
  },
  {
    args: [0, 0],
    memory: [1, 0, 0],
    output: 1,
    imports: { config: { rowSize } },
    viz: memoryRepViz
  },
  {
    args: [1, 0],
    memory: [1, 1, 0, 0],
    output: 1,
    imports: { config: { rowSize } },
    viz: memoryRepViz
  },
  {
    args: [0, 1],
    memory: [1, 0, 1, 0],
    viz: memoryRepViz,
    output: 1,
    imports: { config: { rowSize } }
  },
  {
    args: [1, 1],
    memory: [1, 0, 0, 0],
    output: 0,
    viz: memoryRepViz,
    imports: { config: { rowSize } }
  }
];
