import { Component, OnInit } from '@angular/core';

function toByte(message) {
  return Array.from(message.match(/.{8}/gi)).map(bin => ({
    className: 'basic',
    bin
  }));
}

const transforms = {
  basic: toByte,
  bytes: toByte,
  boolean(message) {
    return message.split('').map(bin => {
      return {
        className: 'basic',
        bin,
        human: (!!Number(bin)).toString()
      }
    })
  },
  uint16(message) {
    return Array.from(message.match(/.{16}/gi)).map(bin => ({
      className: 'basic',
      bin,
      human: parseInt(bin as string, 2)
    }))
  },
  uint17(message) {
    return Array.from(message.match(/.{17}/gi)).map(bin => ({
      className: 'basic',
      bin,
      human: parseInt(bin as string, 2)
    }))
  },
  uint32(message) {
    return Array.from(message.match(/.{32}/gi)).map(bin => ({
      className: 'basic',
      bin,
      human: parseInt(bin as string, 2)
    }))
  },
  hex(message) {
    return Array.from(message.match(/.{8}/gi)).map((bin: string) => ({
      className: 'basic',
      bin,
      human: parseInt(bin, 2).toString(16)
    }))
  },
  uint8(message) {
    return Array.from(message.match(/.{8}/gi)).map(bin => ({
      className: 'basic',
      bin,
      human: parseInt(bin as string, 2)
    }))
  },
  int8(message) {
    return Array.from(message.match(/.{8}/gi)).map((bin) => {
      const sign = (!!(Number(bin) & 128)) ? 1 : -1;
      return {
        className: 'basic',
        bin,
        human: sign * (Number(bin) & 127)
      };
    })
  },
  string(message) {
    return Array.from(message.match(/.{8}/gi)).map((bin: string) => ({
      className: 'basic',
      bin,
      human: String.fromCharCode(parseInt(bin, 2))
    }))
  },
};

@Component({
  selector: 'slides-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message = '0100111001100101011101100110010101110010001000000110011101101111011011100110111001100001001000000110011' +
    '101101001011101100110010100100000011110010110111101110101001000000111010101110000001000000100111001100101011101' +
    '100110010101110010001000000110011101101111011011100110111001100001001000000110110001100101011101000010000001111' +
    '00101101111011101010010000001100100011011110111011101101110';

  mode = 1;
  display = 'boolean';

  blocks = transforms[this.display](this.message);

  constructor() {
  }

  set param(value: string) {
    this.setDisplay(value);
  }

  setDisplay(value: string) {
    this.display = value;
    this.blocks = transforms[this.display](this.message);
  }

  ngOnInit() {
  }

}
