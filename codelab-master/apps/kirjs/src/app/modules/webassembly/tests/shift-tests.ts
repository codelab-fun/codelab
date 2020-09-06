const viz = {
  type: 'shift'
};

export const shiftTests = [
  {
    args: [0, 0, 0],
    output: 0,
    viz
  },
  {
    args: [0, 0, 1],
    output: 0b1,
    viz
  },
  {
    args: [0, 1, 0],
    output: 0b10,
    viz
  },
  {
    args: [1, 0, 0],
    output: 0b100,
    viz
  },
  {
    args: [1, 1, 1],
    output: 0b111,
    viz
  }
];
