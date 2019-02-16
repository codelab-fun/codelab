export class Highlights {
  history = [];
  historyIndex = 0;

  constructor(public highlights = []) {}

  redo() {
    if (this.historyIndex < this.history.length) {
      this.historyIndex++;
      const change = this.history[this.historyIndex];
      this.highlights[change.point[0]][change.point[1]] = change.newValue;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const change = this.history[this.historyIndex];
      this.highlights[change.point[0]][change.point[1]] = change.oldValue;
    }
  }

  toggle([x, y], type) {
    this.highlights[x] = this.highlights[x] || [];
    this.highlights[x][y] = this.highlights[x][y] || [];
    const oldValue = [...this.highlights[x][y]];
    let newValue;
    if (this.highlights[x][y].includes(type)) {
      newValue = this.highlights[x][y] = this.highlights[x][y].filter(
        a => a !== type
      );
    } else {
      this.highlights[x][y].push(type);
      newValue = this.highlights[x][y];
    }

    this.history = this.history.slice(0, this.historyIndex);
    this.history.push({
      point: [x, y],
      oldValue,
      newValue
    });

    this.historyIndex++;

    return this;
  }

  get([x, y]) {
    return (
      (this.highlights[x] &&
        this.highlights[x][y] &&
        this.highlights[x][y].join(' ')) ||
      ''
    );
  }

  clear(point?) {
    const [x, y] = point;
    if (point) {
      this.highlights[x] = this.highlights[x] || [];
      this.highlights[x][y] = [];
    } else {
      this.highlights = [];
    }
  }
}
