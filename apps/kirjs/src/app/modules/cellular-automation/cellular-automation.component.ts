import { Component } from '@angular/core';

function inPlace(rule) {
  const map = (256 + rule)
    .toString(2)
    .substr(1)
    .split('')
    .map(Number)
    .reduce((a, v, i) => {
      a[(15 - i).toString(2).substr(1)] = v;
      return a;
    }, {});

  function transformRow(row) {
    const result = [];
    for (let i = 0; i < row.length; i++) {
      const a1 = row[(row.length + i - 1) % row.length].toString();
      const a2 = row[i].toString();
      const a3 = row[(i + 1) % row.length].toString();
      result[i] = [map[a1 + a2 + a3]];
    }
    return result;
  }

  return function(grid) {
    return grid.map(transformRow);
  };
}

function transform2d(rule) {
  const survive = rule.survive.reduce((a, v) => {
    a[v] = true;
    return a;
  }, {});
  const born = rule.born.reduce((a, v) => {
    a[v] = true;
    return a;
  }, {});

  return function(grid) {
    return grid.map((row, y) => {
      return row.map((cell, x) => {
        const px = (row.length + x - 1) % row.length;
        const nx = (x + 1) % row.length;
        const py = (grid.length + y - 1) % grid.length;
        const ny = (y + 1) % grid.length;

        const score =
          grid[py][px] +
          grid[py][x] +
          grid[py][nx] +
          grid[y][px] +
          grid[y][nx] +
          grid[ny][px] +
          grid[ny][x] +
          grid[ny][nx];

        if ((cell === 0 && born[score]) || (cell === 1 && survive[score])) {
          return 1;
        }

        return 0;
      });
    });
  };
}

function appendTransform(rule) {
  const transform = inPlace(rule);
  return function(grid) {
    const lastRow = grid[grid.length - 1];
    grid.push(transform([lastRow])[0]);
    return grid;
  };
}

const rand = Math.floor(Math.random() * 255);

const randomRules = new Array(8).fill(0).reduce(
  (a, v, i) => {
    if (Math.random() < 0.3) {
      a.survive.push(i);
    }
    if (Math.random() < 0.3) {
      a.born.push(i);
    }
    return a;
  },
  { survive: [], born: [] }
);

const gameOfLifeRules = { survive: [2, 3], born: [3] };
const gameOfLife = transform2d(gameOfLifeRules);
const randomPattern = new Array(30)
  .fill(0)
  .map(() => new Array(60).fill(0).map(() => (Math.random() < 0.3 ? 1 : 0)));
const randomPatternSparce = new Array(30)
  .fill(0)
  .map(() => new Array(60).fill(0).map(() => (Math.random() < 0.04 ? 1 : 0)));

const labyrynthRules = { survive: [0, 1, 2, 3], born: [1] };

const labRules4 = { survive: [0, 1, 2, 3, 4], born: [1] };
const labRules5 = { survive: [0, 1, 2, 3, 4, 5], born: [1] };
const labRules6 = { survive: [0, 1, 2, 3, 4, 5, 6], born: [1] };

@Component({
  selector: 'kirjs-cellular-automation',
  templateUrl: './cellular-automation.component.html',
  styleUrls: ['./cellular-automation.component.css']
})
export class CellularAutomationComponent {
  examples = {
    intro: {
      inverse(pattern) {
        return pattern.map(line => line.map(cell => (cell + 1) % 2));
      },
      rand,
      inPlace16: inPlace(16),
      inPlace90: inPlace(90),
      twoD18: appendTransform(18),
      twoD30: appendTransform(30),
      twoD90: appendTransform(90),
      twoD110: appendTransform(110),
      twoDRand: appendTransform(rand),

      pattern: [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0]
      ]
    },
    life: {
      randomRules,
      random: transform2d(randomRules),
      gameOfLifeRules,
      gameOfLife,
      labyrynthRules: labyrynthRules,
      labyrynth: transform2d(labyrynthRules),
      labRules4,
      labyrynth4: transform2d(labRules4),
      labRules5,
      labyrynth5: transform2d(labRules5),
      labRules6,
      labyrynth6: transform2d(labRules6),
      pattern: {
        randomPattern,
        randomPatternSparce,
        stillLife: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
        oscilator: [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        oscilatorClock: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
          [0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],

        glider: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],

        copperhead: [
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      }
    }
  };
}
