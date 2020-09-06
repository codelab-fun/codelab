import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { gifParser } from './gif-parser';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';

interface Chunk {
  name: string;
  size: number;
  value: string;
  start?: number;
}

@Component({
  selector: 'kirjs-fake-gif',
  templateUrl: './fake-gif.component.html',
  styleUrls: ['./fake-gif.component.css']
})
export class FakeGifComponent implements AfterViewInit {
  t: { [key: string]: string };
  @Input()
  spacing = false;
  showMeta = true;
  @Input() binary: string;
  @Input() highlightedMap: Record<string, boolean> = {};
  @Input() highlightGroups = false;
  @Input() preview = true;
  @Input() filterClassName = /./;
  @Input() mini = false;
  @Input() showPopups = false;
  @Output() binaryUpdate = new EventEmitter();
  gif: string;
  parser: BinaryParser;

  @ViewChild('translations', { static: false }) translation;

  constructor() {}

  upload(file) {
    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      const result = new Uint8Array(e.target.result);
      const binaries = Array.from(result)
        .map(a => a.toString(2))
        .map(a => (a as any).padStart(8, 0));
      this.binary = binaries.join('');
    };

    reader.readAsArrayBuffer(file.files[0]);
  }

  update(chunk, value) {
    const len = chunk.end - chunk.start;
    value = value.padEnd(len, 0).slice(0, len);
    this.binary =
      this.binary.slice(0, chunk.start) + value + this.binary.substr(chunk.end);
    this.binaryUpdate.emit(this.binary);
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.t = extractMessages(this.translation);
      this.parser = new BinaryParser().block('gif', gifParser(this.t));
    });
  }

  updateChunk({ chunk, value }) {
    this.update(chunk, value);
  }
}
