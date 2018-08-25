import { Component, ViewChild, ViewChildren } from '@angular/core';

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


    `"01001001011101000010000001101001011100110010000001100011011011110110110101101101011011110110111000100000011010110110111001101111011101110110110001100101011001000110011101100101001000000111010001101000011000010111010000100000011000010110110001101100001000000111010001101000011001010010000001101001011011100110011001101111011011010110000101110100011010010110111101101110001000000111001101110100011011110111001001100101011001000010000001101001011011100010000001101111011101010111001000100000011000110110111101101101011100000111010101110100011001010111001001110011001000000110100101110011001000000111001001100101011100000111001001100101011100110110010101101110011101000110010101100100001000000110000101110011001000000110000100100000011000100111010101101110011000110110100000100000011011110110011000100000001100010111001100100000011000010110111001100100001000000011000001110011"


    `,

    `\`       Marius cute doggie

    \``,


  ];
  currentCommand = 0;

  post(code: string, type: string = 'output') {
    this.output.push({code: code, type});
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
    this.iframe.nativeElement.contentWindow.console.log = function () {
      Array.from(arguments).map(a => that.post(a, 'log'));
    };
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
}
