import { Component, Input, OnInit } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { gifParser } from './gif-parser';


interface Chunk {
  name: string;
  size: number;
  value: string;
  start?: number;
}


@Component({
  selector: 'slides-fake-gif',
  templateUrl: './fake-gif.component.html',
  styleUrls: ['./fake-gif.component.css']
})
export class FakeGifComponent implements OnInit {
  @Input()
  spacing = false;
  showMeta = true;
  @Input() binary: string;
  @Input() highlightedMap: Record<string, boolean> = {};
  @Input() highlightGroups = false;
  @Input() preview = true;
  @Input() filterClassName = /./;
  @Input() mini = false;

  gif: string;
  parser: BinaryParser;

  constructor() {
  }

  upload(file) {
    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      const result = new Uint8Array(e.target.result);
      const binaries = Array.from(result).map(a => a.toString(2)).map(a => (a as any).padStart(8, 0));
      this.binary = binaries.join('');
    };

    reader.readAsArrayBuffer(file.files[0]);
  }


  ngOnInit() {
    this.parser = new BinaryParser().block('gif', gifParser);
  }

  updateBinary(binary) {
    this.binary = binary;
  }
}





