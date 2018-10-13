import { Component } from '@angular/core';
import { FakeGifComponent } from './fake-gif/fake-gif.component';
import { MidiComponent } from './midi/midi.component';
import { AsciiComponent } from './ascii/ascii.component';
import { BindecComponent } from './bindec/bindec.component';
import { MessageComponent } from './message/message.component';
import { JsonComponent } from './json/json.component';
import { CompareComponent } from './compare/compare.component';
import { HtmlPostComponent } from './html-post/html-post.component';

@Component({
  selector: 'slides-binary',
  templateUrl: './binary.component.html',
  styleUrls: ['./binary.component.css']
})
export class BinaryComponent {

  binaryLittleGif = [
    '01000111', '01001001', '01000110', '00111000', '00111001', '01100001', '00000010', '00000000', '00000010',
    '00000000', '11110001', '00000000', '00000000', '11010111', '01010110', '00000000', '11110110', '10111001',
    '00000000', '01101100', '01001111', '10001111', '00111000', '10011110', '10001111', '00100001', '11111001',
    '00000100', '00000000', '00000000', '00000000', '00000000', '00000000', '00101100', '00000000', '00000000',
    '00000000', '00000000', '00000010', '00000000', '00000010', '00000000', '00000000', '00000010', '00000011',
    '01000100', '00100110', '00000101', '00000000', '00111011'
  ].join('');

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

//<input id="file" type="file">
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
    `parseInt('01001110', 2)`,
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

    `, `
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


    `// How to read binary data?`,


  ];
  componentMap = {
    gif: FakeGifComponent,
    message: MessageComponent,
    bindec: BindecComponent,
    midi: MidiComponent,
    ascii: AsciiComponent,
    json: JsonComponent,
    compare: CompareComponent,
    html: HtmlPostComponent
  };
}
