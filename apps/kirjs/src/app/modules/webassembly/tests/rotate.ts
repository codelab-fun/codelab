const rowSize = 5;
const longFowSize = 4;
const yellow = {
  color: 'yellow',
  text: 'Y'
};

const lime = {
  color: 'lime',
  text: 'G'
};

const red = {
  color: 'red',
  text: 'R'
};

export const rotate = [
  {
    args: [0, rowSize],
    imports: { config: { rowSize } },
    output: 0,
    viz: {
      rowSize,
      extras: [
        {
          ...lime,
          x: 0,
          y: 0
        },
        {
          ...yellow,
          x: 0,
          y: 1
        }
      ]
    }
  },
  {
    args: [rowSize, rowSize],
    imports: { config: { rowSize } },
    output: 0,
    viz: {
      rowSize,
      extras: [
        {
          ...red,
          x: rowSize,
          y: 0
        },
        {
          ...lime,
          x: 0,
          y: 0
        },
        {
          ...lime,
          x: rowSize - 2,
          y: 0
        },
        {
          ...lime,
          x: rowSize - 1,
          y: 0
        },
        {
          ...yellow,
          x: rowSize - 1,
          y: 1
        }
      ]
    }
  },
  {
    args: [-1, rowSize],
    imports: { config: { rowSize } },
    output: 4,
    viz: {
      rowSize,
      extras: [
        {
          ...red,
          x: -1,
          y: 0
        },
        {
          ...lime,
          x: 0,
          y: 0
        },
        {
          ...lime,
          x: 1,
          y: 0
        },
        {
          ...lime,
          x: rowSize - 1,
          y: 0
        },
        {
          ...yellow,
          x: 0,
          y: 1
        }
      ]
    }
  },

  {
    args: [longFowSize, longFowSize],
    imports: { config: { rowSize: longFowSize } },
    output: 0,
    viz: {
      rowSize: longFowSize,
      extras: [
        {
          ...red,
          x: longFowSize,
          y: 0
        },
        {
          ...lime,
          x: 0,
          y: 0
        },
        {
          ...lime,
          x: longFowSize - 2,
          y: 0
        },
        {
          ...lime,
          x: longFowSize - 1,
          y: 0
        },
        {
          ...yellow,
          x: longFowSize - 1,
          y: 1
        }
      ]
    }
  }
];
