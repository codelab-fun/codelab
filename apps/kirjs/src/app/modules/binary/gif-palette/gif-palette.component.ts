import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface Chunk {
  name: string;
  size: number;
  value: string;
  start?: number;
}


@Component({
  selector: 'slides-gif-palette',
  templateUrl: './gif-palette.component.html',
  styleUrls: ['./gif-palette.component.css']
})
export class GifPaletteComponent implements OnInit {

  @Output() change = new EventEmitter<string>()

  colors: number[][];

  private _value = '';

  get value() {
    return this._value;
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.colors = Array.from(val.match(/.{24}/g))
      .map(a => Array.from(a.match(/.{8}/g)).map(str => parseInt(str, 2)))
  }

  serialize() {
    this._value = this.colors.map(c => c.map(p => ((+p).toString(2) as any).padStart(8, 0).slice(0, 8)).join('')).join('');
  }

  ngOnInit() {
  }

}
