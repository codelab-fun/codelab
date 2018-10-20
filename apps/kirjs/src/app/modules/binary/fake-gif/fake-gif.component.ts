import { Component, Input, OnInit } from '@angular/core';

import { lzw } from './gif';
import { BinaryParser } from '../parser/binary-parser';
import { BinaryReaderResult } from '../parser/readers/abstract-reader';


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
  showMeta = true;
  @Input() binary: string;

  gif: string;
  parser: BinaryParser;
  private s: BinaryReaderResult;

  constructor() {
  }


  upload(file) {
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const result = new Uint8Array(e.target.result);
      const binaries = Array.from(result).map(a => a.toString(2)).map(a => (a as any).padStart(8, 0));
      this.binary = binaries.join('');
    };

    reader.readAsArrayBuffer(file.files[0]);
  }


  ngOnInit() {
    const palette = new BinaryParser()
      .array('palette', {
        parser: new BinaryParser().uInt24('color', {
          type: 'color',
        }),
        length(data) {
          const paletteSize = data._parent[0].value.find(a => a.name === 'palette-size').value;
          const size = parseInt(paletteSize, 2);
          return (2 ** (size + 1));
        }
      });

    const header = new BinaryParser()
      .string('headerConst', {length: 6, description: 'this is always GIF87a or GIF89a depending on the version'})
      .uInt16('width')
      .uInt16('height')
      .bit1('globalPallette')
      .bit3('resolution')
      .bit1('palette-sorted')
      .bit3('palette-size')
      .uInt8('background')
      .bit8('Ratio');

    const controlExtension = new BinaryParser()
      .choice('', {});


    const netscapeParser = new BinaryParser()
      .uInt8('length')
      .uInt8('TBD')
      .uInt16('loops')
      .uInt8('zero');

    const xmpParser = new BinaryParser()
      .string('data', {
        readUntil: '00000000'
      })
      .hex('end', {length: 4});

    const commentParser = new BinaryParser()
      .string('comment', {readUntil: '00000000'})
      .hex('end', {length: 2});

    const extensionParser = new BinaryParser()
      .hex('0b', {length: 2})
      .string('type', {length: 8})
      .string('code', {length: 3})
      .choice('data', {
        parser: function (data) {
          const marker = (Object as any).values(data).find(a => a.name === 'type').value;

          const parsers = {
            'NETSCAPE': netscapeParser,
            'XMP Data': xmpParser
          };

          if (parsers[marker]) {
            return parsers[marker];
          }

          debugger;

        }
      });

    const body = new BinaryParser()
      .string('marker', {length: 1})
      .choice('extension', {
        parser(data) {
          const marker = (Object as any).values(data).find(a => a.name === 'marker').value;
          const parsers = {
            '!': new BinaryParser()
              .hex('subtype', {length: 2})
              .choice('extension', {
                parser(data: any) {
                  const marker = (Object as any).values(data).find(a => a.name === 'subtype').value;

                  const parsers = {
                    'f9': new BinaryParser().bit('graphicControl', {length: 48}),
                    'ff': extensionParser,
                    'fe': commentParser
                  };

                  if (parsers[marker]) {
                    return parsers[marker];
                  }

                  debugger;
                }
              }),
            ';': new BinaryParser(),
            ',': new BinaryParser()
              .uInt16('left')
              .uInt16('top')
              .uInt16('w')
              .uInt16('h')
              .bit1('localPallette')
              .bit1('Interlacing')
              .bit1('localPalletteSorted')
              .bit2('ignored')
              .bit3('localPalletteSize')
              .uInt8('colorDepth')
              .uInt8('blockSize')
              .bit('MC', {
                length: (fields) => {
                  return (Object as any).values(fields).find(a => a.name === 'blockSize').value * 8;
                },
                converter(bits) {
                  return lzw(2, bits.match(/.{8}/g).map(a => parseInt(a, 2)), 4);
                }
              })
              .bit8('leftOver')
          };

          if (parsers[marker]) {
            return parsers[marker];
          }

          debugger;
        }
      });


    const gif = new BinaryParser()
      .block('header', header)
      .block('palette', palette)
      .array('extenstions', {parser: body, length: 200});
    this.parser = new BinaryParser().block('gif', gif);
  }

  updateBinary(binary) {
    this.binary = binary;
  }
}





