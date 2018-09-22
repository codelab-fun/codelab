import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FakeGifComponent } from './fake-gif/fake-gif.component';
import { MidiComponent } from './midi/midi.component';
import { AsciiComponent } from './ascii/ascii.component';
import { BindecComponent } from './bindec/bindec.component';
import { MessageComponent } from './message/message.component';


@Component({
  selector: 'slides-binary',
  templateUrl: './binary.component.html',
  styleUrls: ['./binary.component.css']
})
export class BinaryComponent {
  fontSize = 40;
  output = [];
  input = '';
  inputHeight = 50;
  @ViewChild('iframe') iframe;
  @ViewChild('inp') inputEl;
  @ViewChildren('outputBlock') blocks;

  typeInQueue = [];
  commands = [
    `\`
        @kirjs
        Binary ❤️ JavaScript

    \``,
    `explain('message', 'basic')`,
    `explain('message', 'bytes')`,
    `explain('bindec')`,
    `parseInt('01001110', 2)`,
    `explain('message', 'uint8')`,
    `explain('ascii')`,
    `explain('message', 'string')`,
    `explain('gif')`,

    `// Let's read a gif file:
     const reader = new FileReader();

    reader.onloadend = (e) => {
      console.log(e.target.result.toString());
      
    };

    reader.readAsArrayBuffer(file.files[0]).toString();
    
    `, `\`010010010111010000100000011010010111001100100000011000110110111101101101011011010110111101101110001\``
    ,

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


    `// How to read binary data?
`,


  ];
  currentCommand = 0;


  trackByFn(a, i) {
    return i;
  };

  post(code: any, type: string = 'output') {
    if (code.dynamicComponent) {
      this.output.push({code: code.dynamicComponent, param: code.param, type: 'dynamic'});
    } else {
      this.output.push({code: code, type});
    }
  }

  evalCode(code: string) {
    return this.iframe.nativeElement.contentWindow.eval(code);
  }

  ngOnInit() {
    const addChar = () => {
      if (this.typeInQueue.length > 0) {
        const next = this.typeInQueue.shift();
        if (next === 'execute') {
          this.execute(this.input);
        } else {
          this.input += next;
        }

      }
      window.setTimeout(() => addChar(), Math.random() * 1);
    };

    addChar();

    this.inputEl.nativeElement.focus();
  }

  calcInputHeight() {
    this.inputHeight = Math.max(50, this.inputEl.nativeElement.scrollHeight);
  }

  next() {
    this.typeIn(this.commands[this.currentCommand]);
    this.currentCommand++;
  }

  ngAfterViewInit() {
    const that = this;
    this.iframe.nativeElement.contentWindow.explain = (component: string, param: string) => this.explain(component, param);

    this.iframe.nativeElement.contentWindow.console.log = function () {
      Array.from(arguments).map(a => that.post(a, 'log'));
    };

    this.next();
  }

  execute(code: string) {
    if (code.trim() === '') {
      return;
    }

    if (!/['"`]/.test(code[0])) {
      this.post(code);
    }

    try {

      this.post(this.evalCode(code), 'result')
    } catch (e) {
      this.post(e.message, 'error');
    }

    requestAnimationFrame(() => {
      this.blocks.last.nativeElement.scrollIntoView()
    });

    this.input = '';
  }


  typeIn(code) {
    this.typeInQueue = this.typeInQueue.concat(code.split(''));
    this.typeInQueue.push('execute')
  }


  private explain(s: string, param: string) {
    const map = {
      gif: FakeGifComponent,
      message: MessageComponent,
      bindec: BindecComponent,
      midi: MidiComponent,
      ascii: AsciiComponent,
    };

    return {
      dynamicComponent: map[s],
      param
    };
  }
}
