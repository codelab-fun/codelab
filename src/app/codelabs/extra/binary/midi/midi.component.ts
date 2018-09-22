import { Component, OnInit } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { BinaryReaderResult } from '../parser/readers/abstract-reader';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { StringParser } from '../parser/parsers/string-parser';

@Component({
  selector: 'slides-midi',
  templateUrl: './midi.component.html',
  styleUrls: ['./midi.component.css']
})
export class MidiComponent implements OnInit {
  showMeta = true;
  private binary: string;
  private parser: BinaryParser;
  private s: BinaryReaderResult;

  constructor() {
  }

  ngOnInit() {
    this.binary = localStorage.getItem('midi');


    const header = new BinaryParser()
      .string('headerConst', {length: 4})
      .uInt32('6')
      .uInt16('Single multi-channel track')
      .uInt16('Number of tracs')
      .uInt16('Time-code-based time');

    const timeSignatureParser = new BinaryParser()
      .uInt8('upper')
      .uInt8('lower')
      .uInt8('clocks')
      .uInt8('something');

    const metaParser = new BinaryParser()
      .uInt8('subtype')
      .uInt8('length')
      .choice('value', {
        parser(data) {
          const type = (Object as any).values(data).find(l => l.name === 'subtype').rawValue;
          const length = (Object as any).values(data).find(l => l.name === 'length').value;
          const parsers = {
            '00000011': new StringParser({length}),
            '00000010': new StringParser({length}),
            '01011000': timeSignatureParser,
            // tempo
            '01010001': new BinaryParser().uInt24('value'),
            '00101111': theEnd
          };

          if (parsers[type]) {
            return parsers[type];
          }

          debugger;
        }
      });

    const noteSwitch = new BinaryParser()
      .uInt8('note number')
      .uInt8('velocity');

    const theEnd = new BinaryParser()
      .uInt8('00');


    const instrumentChannel = new BinaryParser().uInt8('instrument');
    const track = new BinaryParser()
      .firstBit('delta')
      .uInt8('type')
      .choice('typeData', {
        parser: (data) => {
          const type = (Object as any).values(data).find(l => l.name === 'type').rawValue;
          const parsers = {
            '11111111': metaParser,
            '11000000': instrumentChannel,
            '10010000': noteSwitch,
            '10000000': noteSwitch,
          };

          if (parsers[type]) {
            return parsers[type];
          }

          debugger;
        }
      });

    const tracks = new BinaryParser()
      .string('headerConst', {length: 4})
      .uInt32('tracklen')
      .array('tracks', {parser: track, length: 12});


    this.parser = new BinaryParser()
      .block('header', header)
      .block('block', tracks);
    this.s = this.parser.readOrdered(new StringBinaryReader(this.binary));
  }

  upload(file) {
    const reader = new FileReader();

    reader.onloadend = (e: ProgressEvent) => {
      const result = new Uint8Array((e.target as any).result);
      const binaries = Array.from(result).map(a => a.toString(2)).map(a => (a as any).padStart(8, 0));
      this.binary = binaries.join('');
      localStorage.setItem('midi', this.binary);
    };

    reader.readAsArrayBuffer(file.files[0]);
  }

}
