import { Component, Input, OnChanges, ViewChild } from '@angular/core';

export interface Figure {
  type?: 'rect' | 'circle';
  x: number;
  y: number;
  color: string;
  text?: string;
}

export interface GridConfig {
  values: number[];
  rowSize: number;
  showIndex?: boolean;
  extras?: Figure[] | any;
}

const fakeMemory = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
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
];

interface DrawCellConfig extends Figure {
  context: any;
  size: number;
}

function drawCell({
  context,
  size,
  x,
  y,
  color,
  text,
  type = 'rect'
}: DrawCellConfig) {
  const gridShift = size;
  context.fillStyle = color;
  const x1 = gridShift + x * size;
  const y1 = gridShift + y * size;

  if (type === 'rect') {
    context.fillRect(x1, y1, size - 1, size - 1);
  }
  if (type === 'circle') {
    context.arc(x1, y1, size, 0, Math.PI * 2, 0);
  }

  if (text !== undefined) {
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '20px "Helvetica Neue", sans-serif';
    context.fillText(text, x1 + size / 2, y1 + size / 2);
  }
}

function resolveFuncOrValueForItem(
  funcOfValue: any,
  item,
  index,
  vizConfig,
  test,
  defaultValue
) {
  if (!funcOfValue) {
    return defaultValue;
  }

  if (typeof funcOfValue === 'function') {
    return funcOfValue(item, index, vizConfig, test);
  }

  return funcOfValue;
}

function resolveFuncOrValue(funcOfValue: any, vizConfig, defaultValue) {
  if (!funcOfValue) {
    return defaultValue;
  }

  if (Array.isArray(funcOfValue)) {
    return funcOfValue;
  }

  if (typeof funcOfValue === 'function') {
    return funcOfValue(vizConfig);
  }
}

@Component({
  selector: 'slides-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnChanges {
  @ViewChild('canvas', { static: true }) canvas;
  @Input() test: any;

  async ngOnChanges(changes) {
    const size = 40;
    const canvas = this.canvas.nativeElement;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const config = this.test.viz;
    const memory = resolveFuncOrValue(config.memory, this.test, fakeMemory);
    for (let i = 0; i < memory.length; i++) {
      const x = i % config.rowSize;
      const y = Math.floor(i / config.rowSize);

      const color = resolveFuncOrValueForItem(
        config.color,
        memory[i],
        i,
        config,
        this.test,
        '#ddd'
      );
      const text = resolveFuncOrValueForItem(
        config.text,
        memory[i],
        i,
        config,
        this.test,
        ''
      );

      drawCell({ context, size, x, y, color, text });
    }

    const extras = resolveFuncOrValue(config.extras, this.test, []);

    for (const s of extras) {
      drawCell({ context, size, ...s });
    }
  }
}
