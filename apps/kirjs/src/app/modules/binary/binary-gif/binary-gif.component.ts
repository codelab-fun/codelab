import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirjs-binary-gif',
  templateUrl: './binary-gif.component.html',
  styleUrls: ['./binary-gif.component.css']
})
export class BinaryGifComponent {
  gif: string;

  @Input()
  set binary(binary: string) {
    const binaries = binary.match(/.{8}/g);
    const recombined = new Uint8Array(binaries.map(a => parseInt(a, 2)));
    const b64encoded = btoa(
      Array.from(recombined)
        .map(a => String.fromCharCode(a))
        .join('')
    );
    this.gif = 'data:image/gif;base64,' + b64encoded;
  }
}
