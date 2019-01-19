import { Component, OnInit } from '@angular/core';

interface TableItem {
  color: string;
  index: number;
}

interface ColorTableHash {
  [key: string]: number;
}

@Component({
  selector: 'kirjs-color-indexing',
  templateUrl: './color-indexing.component.html',
  styleUrls: ['./color-indexing.component.css']
})
export class ColorIndexingComponent implements OnInit {
  noIndexing = [
    ['#ff0000', '#ff0000', '#ff0000'],
    ['#fff000', '#ff0000', '#fff000'],
    ['#ff0000', '#ff0000', '#ff0000']
  ];

  colorTable: TableItem[];
  hash: ColorTableHash;

  constructor() {
    this.generate();
  }

  index() {
    const index = this.noIndexing.reduce((colors, row) => {
      return row.reduce((colors, cell) => {
        colors[cell] = true;
        return colors;
      }, colors);
    }, {});
    return Object.keys(index).map((color, index) => ({ color, index }));
  }

  generate() {
    this.colorTable = this.index();
    this.hash = this.colorTable.reduce(
      (hash: ColorTableHash, value: TableItem): ColorTableHash => {
        hash[value.color] = value.index;
        return hash;
      },
      {}
    );
  }

  ngOnInit() {}
}
