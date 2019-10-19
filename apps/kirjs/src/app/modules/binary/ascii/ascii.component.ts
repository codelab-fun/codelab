import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

function encode(from: number, to: number, encoding: string) {
  return new TextDecoder(encoding)
    .decode(new Uint8Array(to - from).map((a, i) => i + from).buffer as any)
    .split('')
    .map((value, i) => ({
      key: i + from,
      value
    }));
}

const layouts = {};

@Component({
  selector: 'kirjs-ascii',
  templateUrl: './ascii.component.html',
  styleUrls: ['./ascii.component.css']
})
export class AsciiComponent implements OnChanges {
  @Input() param: string;

  encodings = [
    {
      key: 'ascii',
      value: encode(33, 128, 'ascii')
    },
    {
      key: 'ascii - Page 2',
      value: encode(128, 255, 'ascii')
    },
    {
      key: 'windows-1251',
      value: encode(128, 255, 'windows-1251')
    },
    {
      key: 'KOI8-R',
      value: encode(128, 255, 'KOI8-R')
    },
    {
      key: 'utf-8',
      value: encode(1000, 1255, 'utf-16')
    }
  ];

  encoding = this.encodings[0];

  constructor() {
    // d = new TextDecoder('windows-125').decode(new Uint8Array(255).map((a,i)=>i).buffer)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('param' in changes) {
      this.encoding = this.encodings.find(a => a.key === this.param);
    }
  }
}
