import { Component } from '@angular/core';
import { FakeGifComponent } from './fake-gif/fake-gif.component';
import { MidiComponent } from './midi/midi.component';
import { AsciiComponent } from './ascii/ascii.component';
import { BindecComponent } from './bindec/bindec.component';
import { MessageComponent } from './message/message.component';
import { JsonComponent } from './json/json.component';
import { CompareComponent } from './compare/compare.component';
import { HtmlPostComponent } from './html-post/html-post.component';

declare const require;

const littleGif = require('!binary-loader!./pics/little.gif');
const chikinGif = require('!binary-loader!./pics/chikin.gif');

function strToBin(str) {
  return str.split('').map(a => a.charCodeAt(0)).map(a => a.toString(2).padStart(8, 0)).join('');
}

@Component({
  selector: 'slides-binary',
  templateUrl: './binary.component.html',
  styleUrls: ['./binary.component.scss']
})
export class BinaryComponent {
  fontSize = 30;

  binaryLittleGif = strToBin(littleGif);
  binaryChikinGif = strToBin(chikinGif);

  code = {
    inputFile: '<input id = "" type="file">',
    fileHandler: `document.getElementById('file').addEventListener('change', (e)=>{
      const reader = new FileReader();

      reader.onloadend = (e) => {
        file = e.target.result;
        console.log(file);
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    }`
  };

  littleGif = littleGif;
  chikinGif = chikinGif;

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

  setLittleGifBinary(value: string) {
    this.littleGif = value;
    this.binaryLittleGif = strToBin(value);

  }
}
