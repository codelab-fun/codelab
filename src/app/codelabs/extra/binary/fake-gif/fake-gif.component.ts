import { Component, OnInit } from '@angular/core';

import { lzw } from '../display-dynamic.component/gif';
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
  binary = [
    '01000111', '01001001', '01000110', '00111000', '00111001', '01100001', '00000010', '00000000', '00000010',
    '00000000', '11110001', '00000000', '00000000', '11010111', '01010110', '00000000', '11110110', '10111001',
    '00000000', '01101100', '01001111', '10001111', '00111000', '10011110', '10001111', '00100001', '11111001',
    '00000100', '00000000', '00000000', '00000000', '00000000', '00000000', '00101100', '00000000', '00000000',
    '00000000', '00000000', '00000010', '00000000', '00000010', '00000000', '00000000', '00000010', '00000011',
    '01000100', '00100110', '00000101', '00000000', '00111011'
  ].join('');

  private gif: string;
  private parser: BinaryParser;
  private s: BinaryReaderResult;

  constructor() {
  }


  upload(file) {
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const result = new Uint8Array(e.target.result);
      const binaries = Array.from(result).map(a => a.toString(2)).map(a => (a as any).padStart(8, 0));
      this.binary = binaries.join('');
      this.binaryToGif(this.binary);
    };

    reader.readAsArrayBuffer(file.files[0]);
  }

  binaryToGif(binary: string) {
    const binaries = binary.match(/.{8}/g);
    const recombined = new Uint8Array(binaries.map(a => parseInt(a, 2)));
    const b64encoded = btoa(Array.from(recombined).map(a => String.fromCharCode(a)).join(''));

    this.gif = 'data:image/gif;base64,' + b64encoded;
  }


  ngOnInit() {
    const palette = new BinaryParser()
      .choice('palette', {
        parser(data) {
          const palette = data._parent[0].value.find(a => a.name === 'palette').value;
          const size = parseInt(palette, 2);
          const length = (2 ** (size + 1));
          return new BinaryParser().array('palette3', {
              parser: new BinaryParser().uInt24('color', {
                type: 'color'
              }),
              length
            }
          );
        }
      });
    const header = new BinaryParser()
      .string('headerConst', {length: 6})
      .uInt16('width')
      .uInt16('height')
      .bit1('globalPallette')
      .bit3('color-resolution')
      .bit1('palette-sorted')
      .bit3('palette')
      .bit8('background')
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

    this.parser = new BinaryParser()
      .block('header', header)
      .block('palette', palette)
      .array('extenstions', {parser: body, length: 200});

    this.binaryToGif(this.binary);
  }

  updateBinary(binary) {
    this.binaryToGif(binary);
  }
}




