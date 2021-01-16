import { Component } from '@angular/core';
import { strToBin } from './parser/utils';

declare const require;

const littleGif = require('!binary-loader!./pics/little.gif');
const chikinGif = require('!binary-loader!./pics/chikin.gif');

@Component({
  selector: 'kirjs-binary',
  templateUrl: './binary.component.html',
  styleUrls: ['./binary.component.scss']
})
export class BinaryComponent {
  fontSize = 30;

  binaryLittleGif = strToBin(littleGif);
  binaryChikinGif = strToBin(chikinGif);

  code = {
    message: `['01001011', '01001111',
 '01010100', '01001100',
 '01001001', '01001110',
 '00100000', '00111110',
 '00100000', '01001010',
 '01000001', '01010110',
 '01000001'
]






// .map(
//   a => String.fromCharCode(
//   parseInt(a, 2)))
//   .join('');
`,
    simpleBinaryOperations: `let i = 7; // 7 = 1 + 2 + 4
!!(i & 1) // true
!!(i & 2) // true
!!(i & 4) // true

i = i & ~2; // 5 = 1 + 4 (Not 2)

!!(i & 1) // true
!!(i & 2) // false
!!(i & 4) // true

i = i | 2  // 7 = 1 + 2 + 4

!!(i & 1) // true
!!(i & 2) // true
!!(i & 4) // true


`,
    jsonBasic: `{
  "name": "Sarah",
  "test": true,
  "something": 1212
}`,
    jsonOne: `{
  "str": "1",
  "number": 1,
  "bool": true
}`,
    inputFile: '<input id = "" type="file">',
    fileHandlerHighlight: { match: /read/, className: 'highlighted-code' },
    fileHandler: `const input = document.getElementById('file');
input.addEventListener('change', (e) => {
  const reader = new FileReader();

  reader.onloadend = (e) => {
    console.log(e.target.result);
  };

  reader.readAsString(input.files[0]);
});
`,
    fileHandlerBinary: `const input = document.getElementById('file');
input.addEventListener('change', (e) => {
  const reader = new FileReader();

  reader.onloadend = (e) => {
    console.log(e.target.result);
  };

  reader.readAsArrayBuffer(input.files[0]);
});`
  };

  littleGif = littleGif;
  chikinGif = chikinGif;

  binaryParserHeaderMatch = /parent-header/;
  binaryParserHeaderHelpers = [
    `new Parser();`,
    `new Parser()
      .string('gif', {length: 3})
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16('width')
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
    `,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
      .bit3('resolution')
      .bit1('paletteSorted')
      .bit3('paletteSize')
      .uint8('background')
      .uint8('ratio')
    `
  ];

  reactBitmask = `// Don't change these two values. They're used by React Dev Tools.
var NoEffect = /*              */0;
var PerformedWork = /*         */1;

// You can change the rest (and add more).
var Placement = /*             */2;
var Update = /*                */4;
var PlacementAndUpdate = /*    */6;
var Deletion = /*              */8;
var ContentReset = /*          */16;
var Callback = /*              */32;
var DidCapture = /*            */64;
var Ref = /*                   */128;
var Snapshot = /*              */256;
var Passive = /*               */512;

// Passive & Update & Callback & Ref & Snapshot
var LifecycleEffectMask = /*   */932;

// Union of all host effects
var HostEffectMask = /*        */1023;

var Incomplete = /*            */1024;
var ShouldCapture = /*         */2048;`;

  binaryParserPaletteMatch = /parent-palette/;
  binaryParserPaletteHelpers = [
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
      .bit3('resolution')
      .bit1('paletteSorted')
      .bit3('paletteSize')
      .uint8('background')
      .uint8('ratio')`,

    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
      .bit3('resolution')
      .bit1('paletteSorted')
      .bit3('paletteSize')
      .uint8('background')
      .uint8('ratio')
      .array('palette', {
        type: new Parser().bit24('color'),
        length: 4
        }
      )`,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
      .bit3('resolution')
      .bit1('paletteSorted')
      .bit3('paletteSize')
      .uint8('background')
      .uint8('ratio')
      .array('palette', {
        type: new Parser().bit24('color'),
        length: (result) =>
            2 ** (result.paletteSize + 1)
        }
      )`,
    `new Parser()
      .string('gif', {length: 3})
      .string('version', {length: 3})
      .uint16le('width')
      .uint16le('height')
      .bit1('globalPalette')
      .bit3('resolution')
      .bit1('paletteSorted')
      .bit3('paletteSize')
      .uint8('background')
      .uint8('ratio')
      .array('palette', {
        type: new Parser()
          .uint8('r')
          .uint8('g')
          .uint8('b'),
        length: (result) =>
            2 ** (result.paletteSize + 1)
        }
      )`
  ];

  //
  // `file.byteLength`,
  // `String.fromCharCode(...new Uint8Array(file))`,
  //   // `// Let's test how many arguments we can apply
  //   // String.fromCharCode(...Array.from(new Array(100)))`,
  //   // `String.fromCharCode(...Array.from(new Array(10000)))`,
  //   // `String.fromCharCode(...Array.from(new Array(100000)))`,
  //   // `String.fromCharCode(...Array.from(new Array(1000000)))`,
  //   // `String.fromCharCode(...Array.from(new Array(125307)))`,
  //   // `
  //   // // read more:
  //   https://stackoverflow.com/questions/22747068/is-there-a-max-number-of-arguments-javascript-functions-can-accept
  //   // String.fromCharCode(...Array.from(new Array(125306)))`,
  // `String.fromCharCode(...new Uint8Array(file))`,
  // `Array.from(new Uint8Array(file)).map(a=>a.toString(2).padStart(8, 0)).join('')`,

  // <input id="file" type="file">
  //   document.getElementById('file').addEventListener('change', (e)=>{
  //   const reader = new FileReader();
  //
  //   reader.onloadend = (e) => {
  //     file = e.target.result;
  //     console.log(file);
  //   };
  //
  //   reader.readAsArrayBuffer(e.target.files[0]);
  // })

  // gif = {
  //   width: "4",
  //   height: "4",
  //   image: [
  //     '#f00', '#f00', '#f00', '#f00',
  //     '#f90', '#f0f', '#f00', '#f00',
  //     '#f90', '#f0f', '#f00', '#f00',
  //     '#f90', '#f0f', '#f00', '#f00',
  //   ]
  // }

  commands = [
    `\`





        @kirjs
        Binary ❤️ JavaScript




    \``,
    `<input id="file" type="file">`,
    `
    document.getElementById('file').addEventListener('change', (e)=>{
      const reader = new FileReader();

      reader.onloadend = (e) => {
        file = e.target.result;
        console.log(file);
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    })`,

    `file.byteLength`,
    `String.fromCharCode(...new Uint8Array(file))`,
    // `// Let's test how many arguments we can apply
    //  String.fromCharCode(...Array.from(new Array(100)))`,
    // `String.fromCharCode(...Array.from(new Array(10000)))`,
    // `String.fromCharCode(...Array.from(new Array(100000)))`,
    // `String.fromCharCode(...Array.from(new Array(1000000)))`,
    // `String.fromCharCode(...Array.from(new Array(125307)))`,
    // `
    // // read more: https://stackoverflow.com/questions/22747068/is-there-a-max-number-of-arguments-javascript-functions-can-accept
    // String.fromCharCode(...Array.from(new Array(125306)))`,
    `String.fromCharCode(...new Uint8Array(file))`,
    `Array.from(new Uint8Array(file)).map(a=>a.toString(2).padStart(8, 0)).join('')`,

    `explain('message', 'basic')`,
    `explain('message', 'bytes')`,
    `explain('bindec', 'uint8')`,
    `parseInt('01010101', 2)`,
    `explain('bindec', 'int8')`,
    `explain('message', 'uint8')`,
    `explain('ascii')`,
    `explain('message', 'string')`,

    `explain('compare')`,
    `explain('json')`,
    `explain('gif')`,
    `
     // Let's reinvent gif with JSON:


     gif = {
        width: "4",
        height: "4",
        image: [
        '#f00', '#f00', '#f00', '#f00',
        '#f90', '#f0f', '#f00', '#f00',
        '#f90', '#f0f', '#f00', '#f00',
        '#f90', '#f0f', '#f00', '#f00',
        ]
     }

    `,
    `
     // Let's index the colors


     gif = {
        width: "4",
        height: "4",
        colors: ['#f00', '#f90',  '#f0f'],
        image: [
          0, 0, 0, 0,
          1, 2, 0, 0,
          1, 2, 0, 0,
          1, 0 ,2 , 0
        ]
     }

    `,
    `JSON.stringify(gif)`,
    `JSON.stringify(gif).length`,

    `"010010010111010000100000011010010111001100100000011000110110111101101101011011010110111101101110001"


    `,

    `explain('gif')`,

    `// How to read binary data?`
  ];
  private evaledMessage: string;

  evalMessage() {
    this.evaledMessage = eval(this.code.message);
  }

  setLittleGifBinary(value: string) {
    this.littleGif = value;
    this.binaryLittleGif = strToBin(value);
  }
}
